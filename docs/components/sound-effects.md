# Sound Effects System

OreUI features an authentic Minecraft interaction audio engine powered by Web Audio API and in-memory Base64 decoding.

---

## 🔊 Interactive Sound Sandbox

Click the buttons below to test each audio effect:

<OreDisplay title="Sound Sandbox">
  <SoundSandboxDemo />
</OreDisplay>

---

## 🛠️ Sound API Reference

You can import sound helper functions directly in your Vue 3 or TypeScript files:

```ts
import { playSound, isSoundMuted, toggleMute, setVolume } from 'vitepress-theme-oreui'

// Play default click sound
playSound('click')

// Play confirmation button sound
playSound('button')

// Play drawer open/close sounds
playSound('drawer_open')
playSound('drawer_close')

// Play toast sound
playSound('toast')

// Play XP fanfare sound
playSound('xp')

// Adjust global volume (0.0 to 1.0)
setVolume(0.8)

// Toggle mute state
toggleMute()
```

---

## ⚙️ Key Technical Highlights

1. **Embedded In-Memory Audio**: Audio is embedded directly as Base64 Data URIs, completely preventing download managers (IDM, FDM, EagleGet) from intercepting browser HTTP requests.
2. **GainNode Volume Control**: High-fidelity, smooth gain manipulation without introducing latency or clipping.
3. **Automatic Fallback**: Automatic graceful fallback to standard in-memory Audio elements if Web Audio contexts are restricted.
