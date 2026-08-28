<template>
  <div class="oreui-tooltip-wrapper">
    <div
      class="oreui-tooltip-trigger"
      @mouseenter="show"
      @mouseleave="hide"
      @focus="show"
      @blur="hide"
    >
      <slot />
    </div>

    <transition name="oreui-tooltip-fade">
      <div
        v-if="isVisible"
        class="oreui-tooltip-box"
        :class="[`position-${position}`]"
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
import { ref } from 'vue'

interface Props {
  title?: string
  content?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  title: '',
  content: '',
  position: 'top'
})

const isVisible = ref(false)

function show() {
  isVisible.value = true
}

function hide() {
  isVisible.value = false
}
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
