import { ref } from 'vue'
import { soundDataUris } from './soundData'

export type SoundType = 'click' | 'button' | 'drawer_open' | 'drawer_close' | 'pop' | 'toast' | 'xp' | 'hide'

export const isSoundMuted = ref(false)
export const soundVolume = ref(1.0)

let audioContext: AudioContext | null = null
const soundBuffers: Partial<Record<SoundType, AudioBuffer>> = {}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioContext) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioCtx) {
      audioContext = new AudioCtx()
    }
  }
  return audioContext
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

export function preloadSounds() {
  if (typeof window === 'undefined') return
  const ctx = getAudioContext()
  if (!ctx) return

  Object.entries(soundDataUris).forEach(([key, dataUri]) => {
    const soundKey = key as SoundType
    try {
      const base64Data = dataUri.split(',')[1]
      if (!base64Data) return
      const arrayBuffer = base64ToArrayBuffer(base64Data)
      ctx.decodeAudioData(arrayBuffer).then((decoded) => {
        soundBuffers[soundKey] = decoded
      }).catch(() => {
        // Fallback handled on play
      })
    } catch {
      // Ignore
    }
  })
}

export async function playSound(type: SoundType) {
  if (typeof window === 'undefined' || isSoundMuted.value) return

  const ctx = getAudioContext()
  if (ctx && ctx.state === 'suspended') {
    await ctx.resume().catch(() => {})
  }

  // 1. Try playing from preloaded Web Audio memory buffer (0 latency, 0 network requests)
  if (ctx && soundBuffers[type]) {
    try {
      const source = ctx.createBufferSource()
      source.buffer = soundBuffers[type]!
      const gainNode = ctx.createGain()
      gainNode.gain.value = soundVolume.value
      source.connect(gainNode)
      gainNode.connect(ctx.destination)
      source.start(0)
      return
    } catch {
      // fallback below
    }
  }

  // 2. Decode on demand from base64 if not already decoded
  const dataUri = soundDataUris[type]
  if (ctx && dataUri) {
    try {
      const base64Data = dataUri.split(',')[1]
      const arrayBuffer = base64ToArrayBuffer(base64Data)
      const decoded = await ctx.decodeAudioData(arrayBuffer)
      soundBuffers[type] = decoded
      const source = ctx.createBufferSource()
      source.buffer = decoded
      const gainNode = ctx.createGain()
      gainNode.gain.value = soundVolume.value
      source.connect(gainNode)
      gainNode.connect(ctx.destination)
      source.start(0)
      return
    } catch {
      // fallback to audio element
    }
  }

  // 3. Fallback to in-memory Audio object with Data URI (no network request made)
  if (dataUri) {
    try {
      const audio = new Audio(dataUri)
      audio.volume = soundVolume.value
      audio.play().catch(() => {})
    } catch {
      // Ignore
    }
  }
}

export function toggleMute() {
  isSoundMuted.value = !isSoundMuted.value
  if (!isSoundMuted.value) {
    playSound('click')
  }
}

export function setVolume(vol: number) {
  soundVolume.value = Math.max(0, Math.min(1, vol))
}

export function useSound() {
  return {
    isSoundMuted,
    soundVolume,
    playSound,
    toggleMute,
    setVolume,
    preloadSounds
  }
}
