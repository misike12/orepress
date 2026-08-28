<template>
  <div class="oreui-tooltip-wrapper" ref="wrapperRef">
    <div
      class="oreui-tooltip-trigger"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <slot />
    </div>

    <transition name="oreui-tooltip-fade">
      <div
        v-if="isVisible"
        class="oreui-tooltip-box"
        :class="[`position-${position}`]"
        ref="tooltipRef"
      >
        <div class="oreui-tooltip-inner">
          <div v-if="title" class="oreui-tooltip-title">{{ title }}</div>
          <div v-if="content || $slots.content" class="oreui-tooltip-content">
            <slot name="content">{{ content }}</slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick } from 'vue'

interface Props {
  title?: string
  content?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  content: '',
  position: 'top',
  delay: 150
})

const isVisible = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
let showTimer: ReturnType<typeof setTimeout> | null = null
let hideTimer: ReturnType<typeof setTimeout> | null = null

function clearTimers() {
  if (showTimer) {
    clearTimeout(showTimer)
    showTimer = null
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
}

function show() {
  clearTimers()
  showTimer = setTimeout(() => {
    isVisible.value = true
    nextTick(() => {
      adjustPosition()
    })
  }, props.delay)
}

function hide() {
  clearTimers()
  hideTimer = setTimeout(() => {
    isVisible.value = false
  }, props.delay)
}

function handleMouseEnter() {
  show()
}

function handleMouseLeave() {
  hide()
}

function handleFocus() {
  show()
}

function handleBlur() {
  hide()
}

function adjustPosition() {
  if (!wrapperRef.value || !tooltipRef.value) return

  const wrapper = wrapperRef.value
  const tooltip = tooltipRef.value
  const rect = wrapper.getBoundingClientRect()
  const tooltipRect = tooltip.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let position = props.position

  // Check if tooltip would overflow viewport
  if (position === 'top' && rect.top - tooltipRect.height - 8 < 0) {
    position = 'bottom'
  } else if (position === 'bottom' && rect.bottom + tooltipRect.height + 8 > viewportHeight) {
    position = 'top'
  } else if (position === 'left' && rect.left - tooltipRect.width - 8 < 0) {
    position = 'right'
  } else if (position === 'right' && rect.right + tooltipRect.width + 8 > viewportWidth) {
    position = 'left'
  }

  // Apply the adjusted position
  tooltip.className = 'oreui-tooltip-box ' + `position-${position}`
}

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<style scoped>
.oreui-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.oreui-tooltip-trigger {
  display: inline-flex;
}

.oreui-tooltip-box {
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  white-space: nowrap;
}

.oreui-tooltip-box.position-top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.oreui-tooltip-box.position-bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.oreui-tooltip-box.position-left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

.oreui-tooltip-box.position-right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}

/* Authentic Minecraft Item Tooltip Box */
.oreui-tooltip-inner {
  background: linear-gradient(180deg, rgba(16, 0, 16, 0.95) 0%, rgba(24, 0, 24, 0.95) 100%);
  border: 2px solid #28007F;
  box-shadow:
    inset 0 0 0 2px #5000FF,
    0 4px 12px rgba(0, 0, 0, 0.8);
  padding: 6px 10px;
  color: #FFFFFF;
  font-family: var(--font-noto-bold);
  font-size: 13px;
  line-height: 1.4;
}

.oreui-tooltip-title {
  color: #55FFFF;
  font-family: var(--font-mc-seven);
  font-size: 14px;
  margin-bottom: 2px;
}

.oreui-tooltip-content {
  color: #AAAAAA;
  font-size: 12px;
  font-family: var(--font-noto);
}

.oreui-tooltip-fade-enter-active,
.oreui-tooltip-fade-leave-active {
  transition: opacity 0.15s ease;
}

.oreui-tooltip-fade-enter-from,
.oreui-tooltip-fade-leave-to {
  opacity: 0;
}
</style>
