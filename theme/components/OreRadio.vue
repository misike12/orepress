<template>
  <label
    class="oreui-radio"
    :class="{
      'is-checked': isChecked,
      'is-disabled': isDisabled
    }"
    @click="handleClick"
  >
    <div class="oreui-radio-circle">
      <div v-if="isChecked" class="oreui-radio-dot"></div>
    </div>
    <span v-if="label || $slots.default" class="oreui-radio-label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { playSound } from '../composables/useSound'

interface Props {
  modelValue?: string | number | boolean
  value?: string | number | boolean
  label?: string
  disabled?: boolean
  sound?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  value: true,
  label: '',
  disabled: false,
  sound: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | boolean): void
  (e: 'change', val: string | number | boolean): void
}>()

// Inject from parent OreRadioGroup if available
const radioGroup = inject<{
  modelValue: { value: string | number | boolean }
  changeValue: (val: string | number | boolean) => void
  disabled?: { value: boolean } | boolean
} | null>('oreRadioGroup', null)

const isChecked = computed(() => {
  if (radioGroup) {
    return radioGroup.modelValue.value === props.value
  }
  return props.modelValue === props.value
})

const isDisabled = computed(() => {
  const groupDisabled = radioGroup?.disabled
    ? typeof radioGroup.disabled === 'object' && radioGroup.disabled !== null
      ? radioGroup.disabled.value
      : (radioGroup.disabled as boolean)
    : false
  return props.disabled || groupDisabled
})

function handleClick(e: MouseEvent) {
  if (isDisabled.value) return
  if (props.sound) {
    playSound('click')
  }
  if (radioGroup) {
    radioGroup.changeValue(props.value)
  }
  emit('update:modelValue', props.value)
  emit('change', props.value)
}
</script>

<style scoped>
.oreui-radio {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  font-family: var(--font-noto-bold);
  font-size: 14px;
  margin: 6px 0;
}

.oreui-radio.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.oreui-radio-circle {
  background-color: #8C8D90;
  border: 2px solid #1E1E1F;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.4), inset -2px -2px rgba(255, 255, 255, 0.2);
  height: 22px;
  width: 22px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.1s ease;
}

.oreui-radio:hover:not(.is-disabled) .oreui-radio-circle {
  background-color: #B1B2B5;
}

.oreui-radio.is-checked .oreui-radio-circle {
  background-color: #313233;
}

.oreui-radio-dot {
  width: 10px;
  height: 10px;
  background-color: #3C8527;
  border: 1px solid #1E1E1F;
  box-shadow: inset 1px 1px rgba(255, 255, 255, 0.6);
}

.oreui-radio.is-checked:hover:not(.is-disabled) .oreui-radio-dot {
  background-color: #4CAF50;
}

.oreui-radio-label {
  color: var(--vp-c-text-1);
}
</style>
