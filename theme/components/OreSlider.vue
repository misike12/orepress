<template>
  <div class="oreui-slider-container" :class="{ 'is-disabled': disabled }">
    <span v-if="label" class="oreui-slider-label">{{ label }}</span>
    <div
      ref="trackRef"
      class="oreui-slider-track"
      :class="{ 'is-dragging': isDragging }"
      @pointerdown="handlePointerDown"
    >
      <div
        class="oreui-slider-progress"
        :style="{ width: `${percentage}%` }"
      ></div>

      <!-- Segment marks if steps provided -->
      <template v-if="step && stepCount > 1 && stepCount < 30">
        <div
          v-for="idx in stepCount - 1"
          :key="idx"
          class="oreui-slider-segment"
          :style="{ left: `${(idx / (stepCount - 1)) * 100}%` }"
        ></div>
      </template>

      <div
        class="oreui-slider-thumb"
        :class="{ 'is-active': isDragging }"
        :style="{ left: `${percentage}%` }"
      ></div>
    </div>
    <span v-if="showValue" class="oreui-slider-value">
      {{ displayValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onUnmounted } from 'vue'
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

const innerValue = ref<number>(props.modelValue)

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== undefined && newVal !== innerValue.value) {
      innerValue.value = newVal
    }
  }
)

const trackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

const stepCount = computed(() => {
  if (!props.step || props.step <= 0) return 0
  return Math.floor((props.max - props.min) / props.step) + 1
})

const percentage = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return 0
  const clamped = Math.max(props.min, Math.min(props.max, innerValue.value))
  return ((clamped - props.min) / range) * 100
})

const displayValue = computed(() => {
  return `${innerValue.value}${props.unit}`
})

function calculateValue(clientX: number): number {
  if (!trackRef.value || props.disabled) return innerValue.value
  const rect = trackRef.value.getBoundingClientRect()
  if (rect.width <= 0) return innerValue.value

  const offsetX = Math.max(0, Math.min(rect.width, clientX - rect.left))
  const ratio = offsetX / rect.width
  let rawVal = props.min + ratio * (props.max - props.min)

  if (props.step && props.step > 0) {
    const steps = Math.round((rawVal - props.min) / props.step)
    rawVal = props.min + steps * props.step
  }

  const stepStr = props.step.toString()
  const precision = stepStr.includes('.') ? stepStr.split('.')[1].length : 0
  const rounded = Number(rawVal.toFixed(Math.max(precision, 0)))

  return Math.max(props.min, Math.min(props.max, rounded))
}

function updateFromEvent(e: PointerEvent | MouseEvent) {
  if (props.disabled) return
  const finalVal = calculateValue(e.clientX)
  if (finalVal !== innerValue.value) {
    innerValue.value = finalVal
    if (props.sound) {
      playSound('click')
    }
    emit('update:modelValue', finalVal)
    emit('change', finalVal)
  }
}

function handlePointerDown(e: PointerEvent) {
  if (props.disabled) return
  isDragging.value = true
  updateFromEvent(e)

  if (typeof window !== 'undefined') {
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  updateFromEvent(e)
}

function onPointerUp(e: PointerEvent) {
  if (isDragging.value) {
    isDragging.value = false
    if (typeof window !== 'undefined') {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
  }
}

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    window.removeEventListener('pointercancel', onPointerUp)
  }
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
  touch-action: none;
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
  touch-action: none;
}

.oreui-slider-progress {
  background-color: #3C8527;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.4), inset -2px -2px rgba(255, 255, 255, 0.2);
  pointer-events: none;
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
  transition: background-color 0.1s ease;
  touch-action: none;
}

.oreui-slider-thumb:hover,
.oreui-slider-track:hover .oreui-slider-thumb,
.oreui-slider-thumb.is-active {
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
  pointer-events: none;
}

.oreui-slider-value {
  font-family: var(--font-mono);
  font-size: 13px;
  min-width: 45px;
  text-align: right;
  color: var(--vp-c-text-2);
}
</style>
