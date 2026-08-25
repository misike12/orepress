<template>
  <div class="oreui-btn-wrapper" :class="{ 'has-tip': !!tip }">
    <component
      :is="href ? 'a' : 'button'"
      :href="href"
      :target="target"
      class="oreui-btn"
      :class="[
        `variant-${variant}`,
        `size-${size}`,
        { 'is-disabled': disabled || isCountingDown }
      ]"
      :disabled="disabled || isCountingDown"
      @click="handleClick"
    >
      <img
        v-if="icon && iconPosition === 'left'"
        :src="iconSrc"
        class="oreui-btn-icon left"
        alt=""
      />
      <span class="oreui-btn-text">{{ displayLabel }}</span>
      <img
        v-if="icon && iconPosition === 'right'"
        :src="iconSrc"
        class="oreui-btn-icon right"
        alt=""
      />
    </component>
    <div v-if="tip" class="oreui-btn-tooltip">{{ tip }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import { playSound } from '../composables/useSound'

interface Props {
  variant?: 'normal' | 'green' | 'red' | 'disabled'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'auto' | 'full'
  text?: string
  href?: string
  target?: string
  disabled?: boolean
  countdown?: number
  tip?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  sound?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'normal',
  size: 'auto',
  text: '',
  href: '',
  target: '',
  disabled: false,
  countdown: 0,
  tip: '',
  icon: '',
  iconPosition: 'left',
  sound: true
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'countdown-finish'): void
}>()

const remaining = ref(props.countdown)
let countdownTimer: ReturnType<typeof setInterval> | null = null

if (props.countdown > 0) {
  countdownTimer = setInterval(() => {
    remaining.value--
    if (remaining.value <= 0) {
      if (countdownTimer) clearInterval(countdownTimer)
      emit('countdown-finish')
    }
  }, 1000)
}

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})

const isCountingDown = computed(() => remaining.value > 0)

const displayLabel = computed(() => {
  if (isCountingDown.value) {
    return `${props.text || 'Wait'} (${remaining.value}s)`
  }
  return props.text || ''
})

const iconSrc = computed(() => {
  if (!props.icon) return ''
  return props.icon.startsWith('/') || props.icon.startsWith('http')
    ? props.icon
    : `/${props.icon}.png`
})

function handleClick(e: MouseEvent) {
  if (props.disabled || isCountingDown.value) {
    e.preventDefault()
    return
  }

  if (props.sound) {
    if (props.variant === 'green') {
      playSound('button')
    } else {
      playSound('click')
    }
  }

  emit('click', e)
}
</script>

<style scoped>
.oreui-btn-wrapper {
  display: inline-block;
  position: relative;
}

.oreui-btn-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  pointer-events: none;
}

.oreui-btn-icon.left {
  margin-right: 6px;
}

.oreui-btn-icon.right {
  margin-left: 6px;
}

.oreui-btn-tooltip {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #1F1F1F;
  border: 1px solid #58585A;
  color: #FFFFFF;
  font-family: var(--font-noto-bold);
  font-size: 12px;
  padding: 4px 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s ease;
  pointer-events: none;
  z-index: 10;
}

.oreui-btn-wrapper:hover .oreui-btn-tooltip {
  opacity: 1;
  visibility: visible;
}
</style>
