<template>
  <div class="oreui-toggles" role="tablist">
    <button
      v-for="option in normalizedOptions"
      :key="String(option.value)"
      type="button"
      role="tab"
      :class="{
        'is-active': currentValue === option.value,
        'is-disabled': option.disabled
      }"
      :aria-selected="currentValue === option.value"
      :disabled="option.disabled"
      @click="select(option.value)"
    >
      <span>{{ option.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { playSound } from '../composables/useSound'

interface ToggleOption {
  label: string
  value: string | number
  disabled?: boolean
}

interface Props {
  modelValue?: string | number
  options?: (string | ToggleOption)[]
  sound?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  sound: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const normalizedOptions = computed<ToggleOption[]>(() => {
  return props.options.map((option) => {
    if (typeof option === 'string') {
      return { label: option, value: option }
    }
    return option
  })
})

const currentValue = ref<string | number>(
  props.modelValue || normalizedOptions.value[0]?.value || ''
)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && val !== currentValue.value) {
      currentValue.value = val
    }
  }
)

function select(value: string | number) {
  if (currentValue.value === value) return
  const target = normalizedOptions.value.find((option) => option.value === value)
  if (target?.disabled) return
  if (props.sound) {
    playSound('click')
  }
  currentValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.oreui-toggles {
  display: inline-flex;
  align-items: flex-end;
  gap: 2px;
  background-color: #1E1E1F;
  border: 2px solid #1E1E1F;
  padding: 2px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
  font-family: var(--font-noto-bold);
  user-select: none;
}

.oreui-toggles button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 46px;
  height: 30px;
  padding: 2px 12px 3px;
  border: 2px solid #1E1E1F;
  color: #D0D1D4;
  background-color: #58585A;
  box-shadow:
    inset 0 -3px #3A3A3C,
    inset 2px 2px rgba(255, 255, 255, 0.3),
    inset -2px -4px rgba(255, 255, 255, 0.15);
  font-family: var(--font-noto-bold);
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
  outline: none;
  transition: all 0.1s ease;
}

.oreui-toggles button > span {
  display: inline-block;
  line-height: 1;
}

.oreui-toggles button:hover:not(.is-disabled):not(.is-active) {
  background-color: #707174;
  color: #FFFFFF;
  box-shadow:
    inset 0 -3px #4A4A4C,
    inset 2px 2px rgba(255, 255, 255, 0.5),
    inset -2px -4px rgba(255, 255, 255, 0.25);
}

.oreui-toggles button.is-active {
  background-color: #3C8527;
  color: #FFFFFF;
  box-shadow:
    inset 0 -3px #1F5213,
    inset 2px 2px rgba(255, 255, 255, 0.4),
    inset -2px -4px rgba(255, 255, 255, 0.2);
}

.oreui-toggles button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.oreui-toggles button:focus-visible {
  outline: 2px dashed #FFFFFF;
  outline-offset: 2px;
}
</style>