<template>
  <div class="oreui-progress-container">
    <div v-if="label || showValue || xpLevel !== undefined" class="oreui-progress-header">
      <span v-if="label" class="oreui-progress-label">{{ label }}</span>
      <span v-if="xpLevel !== undefined" class="oreui-progress-xp-level">{{ xpLevel }}</span>
      <span v-if="showValue" class="oreui-progress-value">{{ displayPercentage }}%</span>
    </div>

    <div
      class="oreui-progress-track"
      :class="[`variant-${variant}`, { 'is-striped': striped, 'is-animated': animated }]"
      :style="{ height: `${height}px` }"
    >
      <div
        class="oreui-progress-fill"
        :class="[`variant-${variant}`, { 'is-striped': striped, 'is-animated': animated }]"
        :style="{ width: `${clampedPercent}%` }"
      ></div>

      <!-- Segment markers -->
      <template v-if="segments > 1 && segments <= 20">
        <div
          v-for="idx in segments - 1"
          :key="idx"
          class="oreui-progress-segment"
          :style="{ left: `${(idx / segments) * 100}%` }"
        ></div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value?: number
  min?: number
  max?: number
  variant?: 'xp' | 'green' | 'blue' | 'red' | 'gold' | 'normal'
  label?: string
  xpLevel?: number | string
  showValue?: boolean
  segments?: number
  height?: number
  striped?: boolean
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  min: 0,
  max: 100,
  variant: 'green',
  label: '',
  xpLevel: undefined,
  showValue: false,
  segments: 0,
  height: 10,
  striped: false,
  animated: false
})

const clampedPercent = computed(() => {
  const range = props.max - props.min
  if (range <= 0) return 0
  const clamped = Math.max(props.min, Math.min(props.max, props.value))
  return Math.round(((clamped - props.min) / range) * 100)
})

const displayPercentage = computed(() => {
  return clampedPercent.value
})
</script>

<style scoped>
.oreui-progress-container {
  width: 100%;
  margin: 10px 0;
  font-family: var(--font-noto-bold);
  user-select: none;
}

.oreui-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 6px;
  color: var(--vp-c-text-1);
}

.oreui-progress-xp-level {
  font-family: var(--font-mc-ten);
  font-size: 18px;
  color: #55FF55;
  text-shadow: 2px 2px #000000;
  margin: 0 auto;
}

.oreui-progress-value {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.oreui-progress-track {
  background-color: #1E1E1F;
  border: 2px solid #1E1E1F;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.6);
  position: relative;
  overflow: hidden;
  width: 100%;
}

.oreui-progress-fill {
  height: 100%;
  transition: width 0.3s ease;
  position: absolute;
  left: 0;
  top: 0;
}

/* Green (Normal) */
.oreui-progress-fill.variant-green,
.oreui-progress-fill.variant-normal {
  background-color: #3C8527;
  box-shadow: inset 0 2px rgba(255, 255, 255, 0.4), inset 0 -2px rgba(0, 0, 0, 0.3);
}

/* Minecraft XP Bar */
.oreui-progress-fill.variant-xp {
  background: linear-gradient(to right, #247514, #55FF55);
  box-shadow: 0 0 6px #55FF55, inset 0 2px rgba(255, 255, 255, 0.7);
}

/* Blue (Mana / Shields) */
.oreui-progress-fill.variant-blue {
  background-color: #2E6BE5;
  box-shadow: inset 0 2px rgba(255, 255, 255, 0.4), inset 0 -2px rgba(0, 0, 0, 0.3);
}

/* Red (Boss Health / Danger) */
.oreui-progress-fill.variant-red {
  background-color: #D42B2B;
  box-shadow: inset 0 2px rgba(255, 255, 255, 0.4), inset 0 -2px rgba(0, 0, 0, 0.3);
}

/* Gold (Milestone) */
.oreui-progress-fill.variant-gold {
  background-color: #FFAA00;
  box-shadow: inset 0 2px rgba(255, 255, 255, 0.5), inset 0 -2px rgba(0, 0, 0, 0.3);
}

/* Segment Marks */
.oreui-progress-segment {
  background-color: #1E1E1F;
  width: 2px;
  height: 100%;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  z-index: 2;
}

/* Striped / Animated */
.oreui-progress-fill.is-striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 20px 20px;
}
</style>
