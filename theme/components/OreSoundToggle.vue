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
      viewBox="0 0 16 16"
      width="18"
      height="18"
      aria-hidden="true"
      shape-rendering="crispEdges"
    >
      <rect class="speaker-body" x="1" y="4" width="5" height="8" />
      <g v-if="!isSoundMuted" class="sound-waves">
        <rect x="7" y="6" width="1" height="1" />
        <rect x="8" y="7" width="1" height="2" />
        <rect x="7" y="9" width="1" height="1" />
        <rect x="9" y="4" width="1" height="2" />
        <rect x="10" y="6" width="1" height="1" />
        <rect x="11" y="7" width="1" height="2" />
        <rect x="10" y="9" width="1" height="1" />
        <rect x="9" y="10" width="1" height="2" />
      </g>
      <g v-else class="mute-cross">
        <rect x="8" y="6" width="1" height="1" />
        <rect x="9" y="7" width="1" height="1" />
        <rect x="10" y="8" width="1" height="1" />
        <rect x="11" y="9" width="1" height="1" />
        <rect x="12" y="10" width="1" height="1" />
        <rect x="12" y="6" width="1" height="1" />
        <rect x="11" y="7" width="1" height="1" />
        <rect x="9" y="9" width="1" height="1" />
        <rect x="8" y="10" width="1" height="1" />
      </g>
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
  background-color: transparent;
  border: none;
  box-shadow: inset 2px 0 0 #FFFFFF, inset -2px 0 0 #A1A3A5;
  color: #3C3C3C;
  width: 32px;
  height: 32px;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.1s ease, box-shadow 0.1s ease;
}

.oreui-sound-toggle .sound-icon {
  display: block;
  fill: currentColor;
}

.oreui-sound-toggle:hover {
  background-color: #F4F6F9;
  color: #1E1E1F;
}

.oreui-sound-toggle:active {
  background-color: #D0D1D4;
  box-shadow:
    inset 2px 0 0 #FFFFFF,
    inset -2px 0 0 #A1A3A5,
    inset 0 2px 0 #B1B2B5,
    inset 0 -2px 0 #FFFFFF;
}

.oreui-sound-toggle.muted .mute-cross {
  fill: #CA3636;
}

.oreui-sound-toggle.muted:hover .mute-cross {
  fill: #A32626;
}
</style>