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
        {
          'is-disabled': disabled || isCountingDown || loading,
          'mc-enchanted-foil': enchanted,
          'is-loading': loading
        }
      ]"
      :disabled="disabled || isCountingDown || loading"
      @click="handleClick"
    >
      <!-- Loading spinner -->
      <span v-if="loading" class="oreui-btn-spinner"></span>

      <!-- Left Icon -->
      <img
        v-if="icon && iconPosition === 'left' && !loading"
        :src="iconSrc"
        class="oreui-btn-icon left"
        alt=""
      />

      <span class="oreui-btn-text">
        <slot>{{ displayLabel }}</slot>
      </span>

      <!-- Right Icon -->
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
  variant?:
    | 'normal'
    | 'green'
    | 'red'
    | 'purple'
    | 'creative'
    | 'blue'
    | 'info'
    | 'gold'
    | 'yellow'
    | 'dark'
    | 'ghost'
    | 'disabled'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'auto' | 'full' | 'icon' | 'icon-sm'
  text?: string
  href?: string
  target?: string
  disabled?: boolean
  loading?: boolean
  enchanted?: boolean
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
  loading: false,
  enchanted: false,
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
  if (props.disabled || isCountingDown.value || props.loading) {
    e.preventDefault()
    return
  }

  if (props.sound) {
    if (props.variant === 'green' || props.variant === 'purple' || props.variant === 'creative') {
      playSound('button')
    } else if (props.enchanted) {
      playSound('xp')
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
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #100C1C;
  border: 2px solid #5000FF;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  color: #FFFFFF;
  font-family: var(--font-noto-bold);
  font-size: 12px;
  padding: 4px 8px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease;
  pointer-events: none;
  z-index: 100;
}

.oreui-btn-wrapper:hover .oreui-btn-tooltip {
  opacity: 1;
  visibility: visible;
}
</style>
