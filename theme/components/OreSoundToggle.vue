<template>
  <button
    type="button"
    class="oreui-sound-toggle"
    :title="isSoundMuted ? 'Unmute (Enable OreUI sound effects)' : 'Mute (Disable OreUI sound effects)'"
    @click="toggleMute"
  >
    <span class="sound-icon">{{ isSoundMuted ? '🔇' : '🔊' }}</span>
  </button>
</template>

<script setup lang="ts">
import { isSoundMuted, toggleMute } from '../composables/useSound'
</script>

<style scoped>
.oreui-sound-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid #58585A;
  color: #FFFFFF;
  font-size: 15px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  padding: 0;
  transition: all 0.15s ease;
}

.oreui-sound-toggle:hover {
  background-color: #48494A;
  border-color: #8C8D90;
}

.sound-icon {
  line-height: 1;
}
</style>
