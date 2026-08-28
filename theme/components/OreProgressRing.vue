<template>
  <span
    class="oreui-progress-ring"
    role="progressbar"
    :aria-valuemin="'0'"
    :aria-valuemax="String(computedMax)"
    :aria-valuenow="String(clampedValue)"
    :style="ringStyle"
  >
    <svg class="oreui-progress-ring-svg" viewBox="0 0 32 32" aria-hidden="true">
      <rect
        v-for="(position, index) in cellPositions"
        :key="`t-${index}`"
        class="oreui-ring-track"
        :x="position.x - stroke / 2"
        :y="position.y - stroke / 2"
        :width="stroke"
        :height="stroke"
      />
      <rect
        v-for="(position, index) in activePositions"
        :key="`a-${index}`"
        class="oreui-ring-active"
        :x="position.x - stroke / 2"
        :y="position.y - stroke / 2"
        :width="stroke"
        :height="stroke"
      />
    </svg>
    <span v-if="$slots.default" class="oreui-progress-ring-label">
      <slot />
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: number
  max?: number
  size?: number | string
  stroke?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100,
  size: 36,
  stroke: 3,
  color: ''
})

const CELLS = 24

const cellPositions = computed(() => {
  return Array.from({ length: CELLS }, (_, index) => {
    const angle = ((-90 + (index * 360) / CELLS) * Math.PI) / 180
    return {
      x: 16 + 13 * Math.cos(angle),
      y: 16 + 13 * Math.sin(angle)
    }
  })
})

const computedMax = computed(() => {
  return Number.isFinite(props.max) && props.max > 0 ? props.max : 100
})

const clampedValue = computed(() => {
  return Math.min(
    computedMax.value,
    Math.max(0, Number.isFinite(props.value) ? props.value : 0)
  )
})

const activeCount = computed(() => {
  const ratio = clampedValue.value / computedMax.value
  const raw = Math.round(ratio * CELLS)
  if (ratio > 0 && raw === 0) return 1
  return Math.min(CELLS, Math.max(0, raw))
})

const activePositions = computed(() => cellPositions.value.slice(0, activeCount.value))

const ringStyle = computed(() => {
  const size =
    typeof props.size === 'number' ? `${props.size}px` : props.size
  return {
    width: size,
    height: size,
    color: props.color || undefined
  }
})
</script>

<style scoped>
.oreui-progress-ring {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  line-height: 1;
  vertical-align: -0.125em;
}

.oreui-progress-ring-svg {
  display: block;
  width: 100%;
  height: 100%;
}

.oreui-ring-track {
  fill: rgba(255, 255, 255, 0.14);
}

.oreui-ring-active {
  fill: currentColor;
}

.oreui-progress-ring-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: inherit;
  font-family: var(--font-noto-bold);
  font-size: calc(1em / 3.2);
  text-align: center;
  line-height: 1.2;
  pointer-events: none;
}
</style>