<template>
  <button
    type="button"
    class="oreui-sound-toggle"
    :class="{ muted: isSoundMuted }"
    :title="isSoundMuted ? 'Unmute (Enable OreUI sound effects)' : 'Mute (Disable OreUI sound effects)'"
    @click="toggleMute"
  >
    <svg
      class="sound-icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <path class="speaker-body" d="M3 9v6h4l5 5V4L7 9H3z" />
      <g v-if="!isSoundMuted" class="sound-waves">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
        <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      </g>
      <path
        v-else
        class="mute-slash"
        d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
      />
    </svg>
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
  width: 36px;
  height: 36px;
  padding: 0;
  cursor: pointer;
  background-color: #D0D1D4;
  border: 2px solid #A1A3A5;
  border-radius: 0;
  box-shadow:
    inset 0 2px 0 #B1B2B5,
    inset 2px 2px 0 rgba(255, 255, 255, 0.5);
  color: #3C3C3C;
  transition:
    background-color 0.1s ease,
    border-color 0.1s ease,
    color 0.1s ease;
}

.oreui-sound-toggle .sound-icon {
  display: block;
  fill: currentColor;
}

.oreui-sound-toggle:hover {
  background-color: #C9CBCE;
  border-color: #8C8D90;
  color: #1E1E1F;
}

.oreui-sound-toggle:active {
  background-color: #B1B2B5;
  box-shadow:
    inset 0 3px 0 #8C8D90,
    inset 3px 3px 0 rgba(0, 0, 0, 0.25);
  transform: translateY(1px);
}

.oreui-sound-toggle.muted {
  color: #CA3636;
}

.oreui-sound-toggle.muted:hover {
  color: #A32626;
}
</style>