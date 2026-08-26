<template>
  <div
    class="oreui-checkbox"
    :class="{ 'is-checked': innerValue, 'is-disabled': disabled }"
    @click="toggle"
  >
    <div class="oreui-checkbox-box">
      <img
        v-if="innerValue"
        src="/check_white.png"
        class="oreui-checkbox-mark"
        alt="Checked"
      />
    </div>
    <span v-if="label || $slots.default" class="oreui-checkbox-label">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { playSound } from '../composables/useSound'

interface Props {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  sound?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  label: '',
  disabled: false,
  sound: true
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

function toggle() {
  if (props.disabled) return
  const next = !innerValue.value
  innerValue.value = next
  if (props.sound) {
    playSound('click')
  }
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style scoped>
.oreui-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  font-family: var(--font-noto-bold);
  font-size: 14px;
  margin: 6px 0;
}

.oreui-checkbox-box {
  background-color: #8C8D90;
  border: 2px solid #1E1E1F;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.2), inset -2px -2px rgba(255, 255, 255, 0.1);
  height: 22px;
  width: 22px;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.1s ease;
}

.oreui-checkbox:hover:not(.is-disabled) .oreui-checkbox-box {
  background-color: #B1B2B5;
}

.oreui-checkbox:active:not(.is-disabled) .oreui-checkbox-box {
  background-color: #58585A;
}

.oreui-checkbox.is-checked .oreui-checkbox-box {
  background-color: #3C8527;
}

.oreui-checkbox.is-checked:hover:not(.is-disabled) .oreui-checkbox-box {
  background-color: #2A641C;
}

.oreui-checkbox.is-checked:active:not(.is-disabled) .oreui-checkbox-box {
  background-color: #1D4D13;
}

.oreui-checkbox.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.oreui-checkbox.is-disabled .oreui-checkbox-box {
  background-color: #D0D1D4;
  border-color: #8C8D90;
}

.oreui-checkbox-mark {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.oreui-checkbox-label {
  color: var(--vp-c-text-1);
}
</style>
