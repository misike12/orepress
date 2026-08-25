<template>
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%; align-items: center;">
    <OreButtonGroup>
      <OreButton variant="green" text="Button Sound" @click="play('button')" />
      <OreButton variant="normal" text="Click Sound" @click="play('click')" />
      <OreButton variant="normal" text="Drawer Open" @click="play('drawer_open')" />
      <OreButton variant="normal" text="Drawer Close" @click="play('drawer_close')" />
    </OreButtonGroup>

    <OreButtonGroup>
      <OreButton variant="normal" text="Toast Chime" @click="play('toast')" />
      <OreButton variant="normal" text="Pop Sound" @click="play('pop')" />
      <OreButton variant="green" text="XP Fanfare" @click="play('xp')" />
    </OreButtonGroup>

    <div style="margin-top: 8px; display: flex; align-items: center; gap: 14px;">
      <OreSwitch v-model="isMutedToggle" label="Mute Audio (Mute)" @change="handleMuteChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OreButton from './OreButton.vue'
import OreButtonGroup from './OreButtonGroup.vue'
import OreSwitch from './OreSwitch.vue'
import { playSound, SoundType, isSoundMuted, toggleMute } from '../composables/useSound'

const isMutedToggle = ref(isSoundMuted.value)

function play(type: SoundType) {
  playSound(type)
}

function handleMuteChange() {
  toggleMute()
}
</script>
