<template>
  <svg
    class="oreui-spinner"
    :width="sizeStyle"
    :height="sizeStyle"
    :style="spinnerStyle"
    viewBox="0 0 32 32"
    role="status"
    aria-label="Loading"
  >
    <circle
      class="oreui-spinner-track"
      cx="16"
      cy="16"
      r="12"
      fill="none"
      :stroke-width="stroke"
    />
    <g class="oreui-spinner-orbit">
      <rect
        v-for="(position, index) in arcPositions"
        :key="index"
        :x="position.x - stroke / 2"
        :y="position.y - stroke / 2"
        :width="stroke"
        :height="stroke"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: number | string
  stroke?: number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  stroke: 3,
  color: ''
})

const CELLS = 32
const ARC = 16

const arcPositions = computed(() => {
  return Array.from({ length: ARC }, (_, index) => {
    const angle = ((-90 + (index * 360) / CELLS) * Math.PI) / 180
    return {
      x: 16 + 12 * Math.cos(angle),
      y: 16 + 12 * Math.sin(angle)
    }
  })
})

const sizeStyle = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size
)

const spinnerStyle = computed(() => ({
  color: props.color || undefined
}))
</script>

<style scoped>
.oreui-spinner {
  display: inline-block;
  box-sizing: border-box;
  line-height: 1;
  vertical-align: -0.125em;
}

.oreui-spinner-track {
  stroke: rgba(255, 255, 255, 0.14);
}

.oreui-spinner-orbit {
  transform-box: fill-box;
  transform-origin: center;
  animation: oreui-spinner-sweep 800ms steps(32, end) infinite;
}

.oreui-spinner-orbit rect {
  fill: currentColor;
}

@keyframes oreui-spinner-sweep {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .oreui-spinner-orbit {
    animation: none;
  }
}
</style>