<template>
  <div class="oreui-switch-wrapper" :class="{ 'is-disabled': disabled }">
    <div
      class="oreui-switch"
      :class="{
        'is-on': innerValue,
        'is-disabled': disabled,
        'bounce-left': bounceLeft,
        'bounce-right': bounceRight
      }"
      @click="toggle"
    >
      <img
        :src="withBase('/switch_on.png')"
        class="oreui-switch-icon-left"
        alt="ON"
      />
      <img
        :src="withBase('/switch_off.png')"
        class="oreui-switch-icon-right"
        alt="OFF"
      />
      <div class="oreui-switch-slider"></div>
    </div>
    <span v-if="label || $slots.default" class="oreui-switch-label" @click="toggle">
      <slot>{{ label }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { withBase } from 'vitepress'
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

const bounceLeft = ref(false)
const bounceRight = ref(false)
let bounceTimer: ReturnType<typeof setTimeout> | null = null

function toggle() {
  if (props.disabled) return
  const next = !innerValue.value
  innerValue.value = next

  if (bounceTimer) {
    clearTimeout(bounceTimer)
  }

  if (next) {
    bounceRight.value = true
    bounceLeft.value = false
    bounceTimer = setTimeout(() => {
      bounceRight.value = false
    }, 350)
  } else {
    bounceLeft.value = true
    bounceRight.value = false
    bounceTimer = setTimeout(() => {
      bounceLeft.value = false
    }, 350)
  }

  if (props.sound) {
    playSound('button')
  }

  emit('update:modelValue', next)
  emit('change', next)
}

onUnmounted(() => {
  if (bounceTimer) {
    clearTimeout(bounceTimer)
  }
})
</script>

<style scoped>
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
  opacity: 0.6;
}

.oreui-switch {
  cursor: pointer;
  height: 24px;
  width: 58px;
  position: relative;
  border: 2px solid #1E1E1F;
  background: linear-gradient(to right, #3C8527 50%, #8C8D90 50%);
  background-clip: padding-box;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.2), inset -2px -2px rgba(255, 255, 255, 0.1);
  box-sizing: content-box;
}

.oreui-switch.is-disabled {
  background: #D0D1D4;
  border-color: #8C8D90;
  cursor: not-allowed;
}

.oreui-switch-icon-left {
  position: absolute;
  left: 6px;
  top: 4px;
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.oreui-switch-icon-right {
  position: absolute;
  right: 6px;
  top: 4px;
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.oreui-switch-slider {
  background-color: #D0D1D4;
  border: 2px solid #1E1E1F;
  box-shadow: inset 0 -4px #58585A, inset 2px 2px rgba(255, 255, 255, 0.6), inset -2px -6px rgba(255, 255, 255, 0.4);
  height: 28px;
  width: 28px;
  position: absolute;
  top: -4px;
  left: -2px;
  transition: left 125ms cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: 1;
}

.oreui-switch.is-on .oreui-switch-slider {
  left: 28px;
}

.oreui-switch:hover:not(.is-disabled) .oreui-switch-slider {
  background-color: #B1B2B5;
  box-shadow: inset 0 -4px #58585A, inset 2px 2px rgba(255, 255, 255, 0.8), inset -2px -6px rgba(255, 255, 255, 0.6);
}

.oreui-switch-label {
  cursor: pointer;
  font-size: 14px;
  color: var(--vp-c-text-1);
}

.oreui-switch.bounce-left {
  animation: bounce_right 175ms ease-in-out 2;
}

.oreui-switch.bounce-right {
  animation: bounce_left 175ms ease-in-out 2;
}
</style>
