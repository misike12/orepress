import { ref } from 'vue'
import { playSound } from './useSound'

export interface PopMessage {
  id: number
  text: string
  detail?: string
  status?: 'success' | 'process' | 'error' | 'vip' | 'debug_text'
  duration?: number
  _timer?: ReturnType<typeof setTimeout>
}

export const popMessages = ref<PopMessage[]>([])
let popIdCounter = 0

export function showPop(
  text: string,
  detail = '',
  status: PopMessage['status'] = 'success',
  duration = 3000
) {
  const id = ++popIdCounter
  const newMsg: PopMessage = { id, text, detail, status, duration }
  popMessages.value.push(newMsg)

  if (status === 'error') {
    playSound('pop')
  } else {
    playSound('toast')
  }

  if (duration > 0) {
    newMsg._timer = setTimeout(() => {
      removePop(id)
    }, duration)
  }

  return id
}

export function removePop(id: number) {
  const msg = popMessages.value.find((m) => m.id === id)
  if (msg?._timer) {
    clearTimeout(msg._timer)
    msg._timer = undefined
  }
  popMessages.value = popMessages.value.filter((msg) => msg.id !== id)
}

export function usePop() {
  return {
    popMessages,
    showPop,
    removePop
  }
}
