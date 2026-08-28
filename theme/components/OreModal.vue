<template>
  <teleport to="body">
    <transition name="modal-fade">
      <div v-if="modelValue" class="oreui-modal-overlay" @click="handleBackdropClick">
        <div class="oreui-modal-box" @click.stop ref="modalBox">
          <!-- Modal Header -->
          <div class="oreui-modal-title-area">
            <div class="oreui-modal-title">
              <slot name="title">{{ title }}</slot>
            </div>
            <button
              v-if="showClose"
              type="button"
              class="oreui-modal-close-btn"
              @click="close"
            >
              <img :src="withBase('/cross_white.png')" class="oreui-modal-close-icon" alt="Close" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="oreui-modal-body">
            <slot />
          </div>

          <!-- Modal Footer / Buttons -->
          <div v-if="$slots.footer || showDefaultFooter" class="oreui-modal-footer">
            <slot name="footer">
              <OreButton
                variant="green"
                :text="confirmText"
                @click="handleConfirm"
                type="button"
              />
              <OreButton
                variant="normal"
                :text="cancelText"
                @click="close"
                type="button"
              />
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { withBase } from 'vitepress'
import { playSound } from '../composables/useSound'
import OreButton from './OreButton.vue'

interface Props {
  modelValue?: boolean
  title?: string
  confirmText?: string
  cancelText?: string
  showClose?: boolean
  showDefaultFooter?: boolean
  closeOnBackdrop?: boolean
  sound?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: 'Notice',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  showClose: true,
  showDefaultFooter: true,
  closeOnBackdrop: true,
  sound: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
  (e: 'close'): void
}>()

const modalBox = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

function close() {
  if (props.sound) {
    playSound('drawer_close')
  }
  emit('update:modelValue', false)
  emit('cancel')
  emit('close')
  restoreFocus()
}

function handleConfirm() {
  if (props.sound) {
    playSound('button')
  }
  emit('confirm')
  emit('update:modelValue', false)
  emit('close')
  restoreFocus()
}

function handleBackdropClick() {
  if (props.closeOnBackdrop) {
    close()
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    close()
    return
  }

  if (e.key === 'Tab' && modalBox.value) {
    trapFocus(e, modalBox.value)
  }
}

function trapFocus(e: KeyboardEvent, container: HTMLElement) {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  if (e.shiftKey && document.activeElement === firstElement) {
    e.preventDefault()
    lastElement?.focus()
  } else if (!e.shiftKey && document.activeElement === lastElement) {
    e.preventDefault()
    firstElement?.focus()
  }
}

function saveFocus() {
  previouslyFocused = document.activeElement as HTMLElement
}

function restoreFocus() {
  previouslyFocused?.focus()
  previouslyFocused = null
}

onMounted(() => {
  saveFocus()
  nextTick(() => {
    const firstFocusable = modalBox.value?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    firstFocusable?.focus()
  })

  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
.oreui-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  padding: 16px;
}

.oreui-modal-box {
  background-color: #313233;
  border: 2px solid #1E1E1F;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  width: 100%;
  max-width: 480px;
  color: #FFFFFF;
  font-family: var(--font-noto-bold);
  box-sizing: border-box;
}

.oreui-modal-title-area {
  background-color: #48494A;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.2), inset -2px -2px rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  position: relative;
  border-bottom: 2px solid #1E1E1F;
}

.oreui-modal-title {
  font-family: var(--font-mc-seven);
  font-size: 17px;
  text-align: center;
}

.oreui-modal-close-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.1s ease;
}

.oreui-modal-close-btn:hover {
  background-color: #58585A;
}

.oreui-modal-close-icon {
  width: 16px;
  height: 16px;
}

.oreui-modal-body {
  padding: 20px;
  font-family: var(--font-noto);
  font-size: 14px;
  line-height: 1.6;
  max-height: 60vh;
  overflow-y: auto;
}

.oreui-modal-footer {
  background-color: #48494A;
  border-top: 2px solid #5A5B5C;
  border-bottom: 2px solid #333334;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
