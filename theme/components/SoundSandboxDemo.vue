<template>
  <div class="sound-sandbox-demo">
    <!-- Sound Action Buttons Group 1 -->
    <OreButtonGroup>
      <OreButton variant="green" text="Button Sound" @click="play('button')" />
      <OreButton variant="normal" text="Click Sound" @click="play('click')" />
      <OreButton variant="normal" text="Drawer Open" @click="play('drawer_open')" />
      <OreButton variant="normal" text="Drawer Close" @click="play('drawer_close')" />
    </OreButtonGroup>

    <!-- Sound Action Buttons Group 2 -->
    <OreButtonGroup>
      <OreButton variant="normal" text="Toast Chime" @click="play('toast')" />
      <OreButton variant="normal" text="Pop Sound" @click="play('pop')" />
      <OreButton variant="green" text="XP Fanfare" @click="play('xp')" />
    </OreButtonGroup>

    <!-- Sound Controls (Volume Slider + Mute Switch) -->
    <div class="sound-controls-panel">
      <OreSlider
        v-model="volumePercent"
        :min="0"
        :max="100"
        :step="1"
        label="Volume"
        unit="%"
        :disabled="isMuted"
        @change="handleVolumeChange"
      />

      <OreSwitch
        v-model="isMuted"
        label="Mute Audio"
        @change="handleMuteChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import OreButton from './OreButton.vue'
import OreButtonGroup from './OreButtonGroup.vue'
import OreSlider from './OreSlider.vue'
import OreSwitch from './OreSwitch.vue'
import {
  playSound,
  SoundType,
  isSoundMuted,
  soundVolume,
  setVolume,
  toggleMute
} from '../composables/useSound'

const volumePercent = ref(Math.round(soundVolume.value * 100))
const isMuted = ref(isSoundMuted.value)

watch(soundVolume, (newVal) => {
  volumePercent.value = Math.round(newVal * 100)
})

watch(isSoundMuted, (newVal) => {
  isMuted.value = newVal
})

function play(type: SoundType) {
  playSound(type)
}

function handleVolumeChange(val: number) {
  setVolume(val / 100)
}

function handleMuteChange(val: boolean) {
  if (val !== isSoundMuted.value) {
    toggleMute()
  }
}
</script>

<style scoped>
.sound-sandbox-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
}

.sound-controls-panel {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 420px;
  padding: 12px 16px;
  background-color: #313233;
  border: 2px solid #1E1E1F;
  box-shadow: inset 2px 2px rgba(255, 255, 255, 0.1), inset -2px -2px rgba(0, 0, 0, 0.3);
}
</style>
