<template>
  <div class="oreui-display-card" :class="{ 'is-fullscreen': isFullscreen }">
    <!-- Action Bar -->
    <div class="oreui-display-header">
      <span class="oreui-display-tag">
        <slot name="title">{{ title || 'Component Preview' }}</slot>
      </span>
      <button
        type="button"
        class="oreui-display-fullscreen-btn"
        :title="isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'"
        @click="toggleFullscreen"
      >
        <img :src="withBase('/fullScreen.png')" class="fullscreen-icon" alt="Fullscreen" />
      </button>
    </div>

    <!-- Preview Canvas Area -->
    <div class="oreui-display-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'vitepress'
import { playSound } from '../composables/useSound'

interface Props {
  title?: string
}

defineProps<Props>()

const isFullscreen = ref(false)

function toggleFullscreen() {
  playSound('click')
  isFullscreen.value = !isFullscreen.value
}
</script>

<style scoped>
.oreui-display-card {
  background-color: #1e1e24;
  border: 2px solid #3e4452;
  margin: 16px 0;
  position: relative;
  box-sizing: border-box;
}

.oreui-display-header {
  background-color: #181a1f;
  border-bottom: 1px solid #3e4452;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.oreui-display-tag {
  font-family: var(--font-mc-seven);
  font-size: 13px;
  color: #6CC349;
  letter-spacing: 0.5px;
}

.oreui-display-fullscreen-btn {
  background-color: #7F7F81;
  border: 1px solid #3e4452;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  transition: background-color 0.15s ease;
}

.oreui-display-fullscreen-btn:hover {
  background-color: #989899;
}

.fullscreen-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.oreui-display-body {
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80px;
  background-color: #282C34;
}

.oreui-display-card.is-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  margin: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.oreui-display-card.is-fullscreen .oreui-display-body {
  flex: 1;
  overflow: auto;
}
</style>
