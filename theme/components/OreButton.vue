<template>
  <div class="oreui-btn-wrapper" :class="{ 'has-tip': !!tip }">
    <component
      :is="computedHref ? 'a' : 'button'"
      :href="computedHref || undefined"
      :target="target"
      :type="computedHref ? undefined : props.type"
      class="oreui-btn"
      :class="[
        `variant-${variant}`,
        `size-${size}`,
        {
          'is-disabled': isDisabled,
          'mc-enchanted-foil': enchanted,
          'is-loading': loading
        }
      ]"
      :disabled="isDisabled"
      @click="handleClick"
    >
      <!-- Loading spinner -->
      <span v-if="loading" class="oreui-btn-spinner"></span>

      <!-- Left Icon -->
      <img
        v-if="iconSrc && iconPosition === 'left' && !loading"
        :src="iconSrc"
        class="oreui-btn-icon left"
        alt=""
      />

      <span class="oreui-btn-text">
        <slot>{{ displayLabel }}</slot>
      </span>

      <!-- Right Icon -->
      <img
        v-if="iconSrc && iconPosition === 'right'"
        :src="iconSrc"
        class="oreui-btn-icon right"
        alt=""
      />
    </component>
    <div v-if="tip" class="oreui-btn-tooltip">{{ tip }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'
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
  type?: 'button' | 'submit' | 'reset'
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
  sound: true,
  type: 'button'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'countdown-finish'): void
}>()

const remaining = ref(props.countdown)
let countdownTimer: ReturnType<typeof setInterval> | null = null

function stopCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
}

function startCountdown() {
  stopCountdown()
  if (props.countdown > 0) {
    remaining.value = props.countdown
    countdownTimer = setInterval(() => {
      remaining.value--
      if (remaining.value <= 0) {
        stopCountdown()
        emit('countdown-finish')
      }
    }, 1000)
  } else {
    remaining.value = 0
  }
}

watch(
  () => props.countdown,
  () => {
    startCountdown()
  }
)

onMounted(() => {
  startCountdown()
})

onUnmounted(() => {
  stopCountdown()
})

const isCountingDown = computed(() => remaining.value > 0)

const isDisabled = computed(
  () =>
    props.disabled ||
    props.loading ||
    props.variant === 'disabled' ||
    isCountingDown.value
)

const displayLabel = computed(() => {
  if (isCountingDown.value) {
    return `${props.text || 'Wait'} (${remaining.value}s)`
  }
  return props.text || ''
})

const computedHref = computed(() => {
  if (!props.href) return ''
  if (
    props.href.startsWith('http://') ||
    props.href.startsWith('https://') ||
    props.href.startsWith('//') ||
    props.href.startsWith('#') ||
    props.href.startsWith('mailto:') ||
    props.href.startsWith('tel:')
  ) {
    return props.href
  }
  return withBase(props.href)
})

const iconSrc = computed(() => {
  if (!props.icon) return ''
  if (props.icon.startsWith('http://') || props.icon.startsWith('https://') || props.icon.startsWith('data:')) {
    return props.icon
  }
  const rawPath = props.icon.startsWith('/') ? props.icon : `/${props.icon}.png`
  return withBase(rawPath)
})

function handleClick(e: MouseEvent) {
  if (isDisabled.value) {
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
  flex: none;
  align-self: center;
}

.oreui-btn-icon.left {
  margin-right: 0;
}

.oreui-btn-icon.right {
  margin-left: 0;
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
