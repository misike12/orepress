<template>
  <teleport to="body">
    <div class="oreui-pop-area">
      <transition-group name="pop-anim">
        <div
          v-for="msg in popMessages"
          :key="msg.id"
          class="oreui-pop-item"
          :class="`status-${msg.status || 'success'}`"
          @click="removePop(msg.id)"
        >
          <div class="oreui-pop-title">{{ msg.text }}</div>
          <div v-if="msg.detail" class="oreui-pop-detail">{{ msg.detail }}</div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { popMessages, removePop } from '../composables/usePop'
</script>

<style scoped>
.oreui-pop-area {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 8px;
  pointer-events: none;
  z-index: 9999;
  width: min(90%, 500px);
}

.oreui-pop-item {
  pointer-events: auto;
  cursor: pointer;
  background-color: #1F1F1F;
  border: 2px solid #1E1E1F;
  box-shadow: inset 0 -3px #111, 0 4px 12px rgba(0, 0, 0, 0.5);
  color: #FFFFFF;
  padding: 10px 24px;
  text-align: center;
  font-family: var(--font-noto-bold);
  font-size: 14px;
  user-select: none;
}

.oreui-pop-item.status-success {
  color: #6CC349;
}

.oreui-pop-item.status-process {
  color: #FFE866;
}

.oreui-pop-item.status-error {
  color: #F46D6D;
}

.oreui-pop-item.status-vip {
  color: #FEE039;
}

.oreui-pop-item.status-debug_text {
  background-color: #FFE866;
  color: #000000;
}

.oreui-pop-detail {
  font-size: 12px;
  color: #B1B2B5;
  margin-top: 2px;
}

/* Transitions */
.pop-anim-enter-active,
.pop-anim-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.pop-anim-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.pop-anim-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
