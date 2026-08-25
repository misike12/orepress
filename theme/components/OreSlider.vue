<template>
  <div class="oreui-slider-container" :class="{ 'is-disabled': disabled }">
    <span v-if="label" class="oreui-slider-label">{{ label }}</span>
    <div
      ref="trackRef"
      class="oreui-slider-track"
      @mousedown="startDrag"
      @click="handleClick"
    >
      <div
        class="oreui-slider-progress"
        :style="{ width: `${percentage}%` }"
      ></div>

      <!-- Segment marks if steps provided -->
      <template v-if="step && stepCount > 1 && stepCount < 20">
        <div
          v-for="idx in stepCount - 1"
          :key="idx"
          class="oreui-slider-segment"
          :style="{ left: `${(idx / (stepCount - 1)) * 100}%` }"
        ></div>
      </template>

      <div
        class="oreui-slider-thumb"
        :style="{ left: `${percentage}%` }"
      ></div>
    </div>
    <span v-if="showValue" class="oreui-slider-value">
      {{ displayValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import { playSound } from '../composables/useSound'

interface Props {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  label?: string
  unit?: string
  showValue?: boolean
  disabled?: boolean
  sound?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 50,
  min: 0,
  max: 100,
  step: 1,
  label: '',
  unit: '',
  showValue: true,
  disabled: false,
  sound: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const trackRef = ref<HTMLElement | null>(null)
let isDragging = false

const stepCount = computed(() => {
  if (!props.step) return 0
  return Math.floor((props.max - props.min) / props.step) + 1
})

const percentage = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return 0
  const clamped = Math.max(props.min, Math.min(props.max, props.modelValue))
  return ((clamped - props.min) / range) * 100
})

const displayValue = computed(() => {
  return `${props.modelValue}${props.unit}`
})

function updateFromMouse(e: MouseEvent) {
  if (!trackRef.value || props.disabled) return
  const rect = trackRef.value.getBoundingClientRect()
  const offsetX = Math.max(0, Math.min(rect.width, e.clientX - rect.left))
  const ratio = offsetX / rect.width
  let rawVal = props.min + ratio * (props.max - props.min)

  if (props.step > 0) {
    rawVal = Math.round(rawVal / props.step) * props.step
  }

  const finalVal = Math.max(props.min, Math.min(props.max, Number(rawVal.toFixed(2))))
  if (finalVal !== props.modelValue) {
    if (props.sound && Math.abs(finalVal - props.modelValue) >= props.step) {
      playSound('click')
    }
    emit('update:modelValue', finalVal)
    emit('change', finalVal)
  }
}

function handleClick(e: MouseEvent) {
  updateFromMouse(e)
}

function startDrag(e: MouseEvent) {
  if (props.disabled) return
  isDragging = true
  updateFromMouse(e)
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

function onDrag(e: MouseEvent) {
  if (!isDragging) return
  updateFromMouse(e)
}

function stopDrag() {
  if (isDragging) {
    isDragging = false
    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('mouseup', stopDrag)
  }
}

onUnmounted(() => {
  stopDrag()
})
</script>

<style scoped>
.oreui-slider-container {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  max-width: 400px;
  margin: 10px 0;
  font-family: var(--font-noto-bold);
  user-select: none;
}

.oreui-slider-container.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.oreui-slider-label {
  font-size: 14px;
  min-width: 60px;
  color: var(--vp-c-text-1);
}

.oreui-slider-track {
  background-color: #8C8D90;
  border: 2px solid #1E1E1F;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.4), inset -2px -2px rgba(255, 255, 255, 0.2);
  cursor: pointer;
  height: 8px;
  position: relative;
  flex: 1;
}

.oreui-slider-progress {
  background-color: #3C8527;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.4), inset -2px -2px rgba(255, 255, 255, 0.2);
}

.oreui-slider-thumb {
  background-color: #D0D1D4;
  border: 2px solid #1E1E1F;
  box-shadow: inset 0 -4px #58585A, inset 2px 2px rgba(255, 255, 255, 0.6), inset -2px -6px rgba(255, 255, 255, 0.4);
  height: 24px;
  width: 24px;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;
}

.oreui-slider-thumb:hover,
.oreui-slider-track:hover .oreui-slider-thumb {
  background-color: #B1B2B5;
}

.oreui-slider-segment {
  background-color: #1E1E1F;
  height: 8px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  z-index: 1;
}

.oreui-slider-value {
  font-family: var(--font-mono);
  font-size: 13px;
  min-width: 45px;
  text-align: right;
  color: var(--vp-c-text-2);
}
</style>
