<template>
  <div class="oreui-switch-wrapper" :class="{ 'is-disabled': disabled }">
    <div
      class="ore-switch"
      :checked="innerValue ? '' : undefined"
      :disabled="disabled ? '' : undefined"
      :color="color === 'primary' ? undefined : color"
      :variant="variant === 'default' ? undefined : variant"
      :pressed="pressed ? '' : undefined"
      role="switch"
      :aria-checked="innerValue"
      :aria-disabled="disabled"
      :tabindex="disabled ? -1 : 0"
      @click="toggle"
      @keydown="onKeydown"
      @keyup="onKeyup"
      @blur="onPointerUp"
      @pointerdown="onPointerDown"
    >
      <span class="ore-switch-control" aria-hidden="true">
        <span class="ore-switch-status"></span>
        <span class="ore-switch-button"></span>
      </span>
    </div>
    <span v-if="label || $slots.default" class="oreui-switch-label" @click="toggle">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { playSound } from '../composables/useSound'

type OreSwitchColor =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'dungeons'
  | 'gold'
  | 'legends'
  | 'realms'
type OreSwitchVariant = 'default' | 'icons'

interface Props {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  sound?: boolean
  color?: OreSwitchColor
  variant?: OreSwitchVariant
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  disabled: false,
  sound: true,
  color: 'primary',
  variant: 'icons'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && val !== innerValue.value) {
      innerValue.value = val
    }
  }
)

const pressed = ref(false)

function toggle() {
  if (props.disabled) return
  const next = !innerValue.value
  innerValue.value = next

  if (props.sound) {
    playSound('button')
  }

  emit('update:modelValue', next)
  emit('change', next)
}

function onKeydown(event: KeyboardEvent) {
  if (props.disabled) return
  if (event.key === ' ') {
    event.preventDefault()
    pressed.value = true
  } else if (event.key === 'Enter') {
    event.preventDefault()
    toggle()
  }
}

function onKeyup(event: KeyboardEvent) {
  if (props.disabled) return
  if (event.key === ' ') {
    event.preventDefault()
    onPointerUp()
    toggle()
  }
}

function onPointerDown(event: PointerEvent) {
  if (props.disabled || event.button !== 0) return
  pressed.value = true
  window.addEventListener('pointerup', onPointerUp, { once: true })
  window.addEventListener('pointercancel', onPointerUp, { once: true })
}

function onPointerUp() {
  pressed.value = false
}
</script>

<style scoped>
.ore-switch {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 30px;
  color: #1e1e1f;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.ore-switch .ore-switch-control {
  display: flex;
  align-items: flex-end;
  width: 56px;
  height: 30px;
}

.ore-switch .ore-switch-status {
  position: relative;
  z-index: 0;
  flex: none;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  background:
    linear-gradient(#8c8d90, #8c8d90) left 4px / 22px 18px no-repeat,
    linear-gradient(#a3a4a6, #a3a4a6) left 2px / 24px 22px no-repeat,
    #1e1e1f;
}

.ore-switch .ore-switch-button {
  position: relative;
  z-index: 1;
  flex: none;
  box-sizing: border-box;
  width: 30px;
  height: 30px;
  background:
    linear-gradient(#d0d1d4, #d0d1d4) center 4px / 22px 18px no-repeat,
    linear-gradient(#58585a, #58585a) center 24px / 26px 4px no-repeat,
    linear-gradient(#e3e3e5, #e3e3e5) center 2px / 26px 22px no-repeat,
    #1e1e1f;
  box-shadow: 0 0 0 2px transparent;
  order: -1;
}

.ore-switch[checked] .ore-switch-button {
  order: 0;
}

.ore-switch[checked] .ore-switch-status {
  background:
    linear-gradient(#3c8527, #3c8527) right 4px / 22px 18px no-repeat,
    linear-gradient(#639d52, #639d52) right 2px / 24px 22px no-repeat,
    #1e1e1f;
}

.ore-switch[checked][color='secondary'] .ore-switch-status {
  background:
    linear-gradient(#d0d1d4, #d0d1d4) right 4px / 22px 18px no-repeat,
    linear-gradient(#e3e3e5, #e3e3e5) right 2px / 24px 22px no-repeat,
    #1e1e1f;
}

.ore-switch[checked][color='destructive'] .ore-switch-status {
  background:
    linear-gradient(#ca3636, #ca3636) right 4px / 22px 18px no-repeat,
    linear-gradient(#cf4a4a, #cf4a4a) right 2px / 24px 22px no-repeat,
    #1e1e1f;
}

.ore-switch[checked][color='dungeons'] .ore-switch-status {
  background:
    linear-gradient(#ffa41f, #ffa41f) right 4px / 22px 18px no-repeat,
    linear-gradient(#ffd953, #ffd953) right 2px / 24px 22px no-repeat,
    #1e1e1f;
}

.ore-switch[checked][color='legends'] .ore-switch-status {
  background:
    linear-gradient(#acf2ff, #acf2ff) right 4px / 22px 18px no-repeat,
    linear-gradient(#c4f5fe, #c4f5fe) right 2px / 24px 22px no-repeat,
    #1e1e1f;
}

.ore-switch[checked][color='realms'] .ore-switch-status {
  background:
    linear-gradient(#7345e5, #7345e5) right 4px / 22px 18px no-repeat,
    linear-gradient(#8557f8, #8557f8) right 2px / 24px 22px no-repeat,
    #1e1e1f;
}

.ore-switch[checked][color='gold'] .ore-switch-status {
  background:
    linear-gradient(#ffc42b, #ffc42b) right 4px / 22px 18px no-repeat,
    linear-gradient(#ffd953, #ffd953) right 2px / 24px 22px no-repeat,
    #1e1e1f;
}

@media (hover: hover) and (pointer: fine) {
  .ore-switch:hover:not([disabled]) .ore-switch-button {
    background:
      linear-gradient(#f4f6f9, #f4f6f9) center 4px / 22px 18px no-repeat,
      linear-gradient(#58585a, #58585a) center 24px / 26px 4px no-repeat,
      linear-gradient(#fbfbfd, #fbfbfd) center 2px / 26px 22px no-repeat,
      #1e1e1f;
  }
}

.ore-switch:active:not([disabled]) .ore-switch-button,
.ore-switch[pressed]:not([disabled]) .ore-switch-button {
  background:
    linear-gradient(#b1b2b5, #b1b2b5) center 4px / 22px 18px no-repeat,
    linear-gradient(#58585a, #58585a) center 24px / 26px 4px no-repeat,
    linear-gradient(#d0d1d3, #d0d1d3) center 2px / 26px 22px no-repeat,
    #1e1e1f;
}

.ore-switch:focus-visible {
  border-radius: 0;
  outline: 2px solid #ffffff;
  outline-offset: 0;
}

.ore-switch:focus-visible .ore-switch-button {
  background:
    linear-gradient(#d0d1d4, #d0d1d4) center 4px / 22px 18px no-repeat,
    linear-gradient(#58585a, #58585a) center 24px / 26px 4px no-repeat,
    linear-gradient(#ecedee, #ecedee) center 2px / 26px 22px no-repeat,
    #1e1e1f;
  box-shadow: 0 0 0 2px #ffffff;
}

.ore-switch[variant='icons'] .ore-switch-status::after {
  position: absolute;
  top: 5px;
  left: 4px;
  width: 16px;
  height: 16px;
  background: #242425;
  content: '';
  -webkit-mask: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20fill%3D%22none%22%20viewBox%3D%220%200%208%208%22%3E%3Cpath%20fill%3D%22currentColor%22%20fill-rule%3D%22evenodd%22%20d%3D%22M2%201h4v1H2zm4%201h1v4H6zM2%202v4H1V2zm0%204v1h4V6z%22/%3E%3C/svg%3E')
    center / contain no-repeat;
  mask: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20fill%3D%22none%22%20viewBox%3D%220%200%208%208%22%3E%3Cpath%20fill%3D%22currentColor%22%20fill-rule%3D%22evenodd%22%20d%3D%22M2%201h4v1H2zm4%201h1v4H6zM2%202v4H1V2zm0%204v1h4V6z%22/%3E%3C/svg%3E')
    center / contain no-repeat;
}

.ore-switch[checked][variant='icons'] .ore-switch-status::after {
  left: 6px;
  background: #ffffff;
  -webkit-mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20fill%3D%22none%22%20viewBox%3D%220%200%208%208%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M3.5%201h1v6h-1z%22/%3E%3C/svg%3E');
  mask-image: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20fill%3D%22none%22%20viewBox%3D%220%200%208%208%22%3E%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M3.5%201h1v6h-1z%22/%3E%3C/svg%3E');
}

.ore-switch[checked][variant='icons'][color='secondary'] .ore-switch-status::after,
.ore-switch[checked][variant='icons'][color='dungeons'] .ore-switch-status::after,
.ore-switch[checked][variant='icons'][color='legends'] .ore-switch-status::after,
.ore-switch[checked][variant='icons'][color='gold'] .ore-switch-status::after {
  background: #1e1e1f;
}

.ore-switch[disabled] {
  cursor: not-allowed;
}

.ore-switch[disabled] .ore-switch-status {
  background:
    linear-gradient(#d0d1d4, #d0d1d4) left 4px / 22px 18px no-repeat,
    linear-gradient(#d0d1d4, #d0d1d4) left 2px / 24px 22px no-repeat,
    #8c8d90;
}

.ore-switch[disabled] .ore-switch-button {
  background:
    linear-gradient(#d0d1d4, #d0d1d4) center 4px / 22px 18px no-repeat,
    linear-gradient(#b1b2b5, #b1b2b5) center 24px / 26px 4px no-repeat,
    linear-gradient(#d0d1d4, #d0d1d4) center 2px / 26px 22px no-repeat,
    #8c8d90;
  box-shadow: none;
}

.oreui-switch-wrapper {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  user-select: none;
  font-family: var(--font-noto-bold);
  margin: 6px 0;
}

.oreui-switch-wrapper.is-disabled {
  cursor: not-allowed;
}

.oreui-switch-wrapper.is-disabled .oreui-switch-label {
  color: var(--vp-c-text-3);
}

.oreui-switch-label {
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-1);
}
</style>