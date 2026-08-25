<template>
  <OreButtonGroup>
    <OreButton variant="green" text="Success Toast" @click="fireSuccess" />
    <OreButton variant="normal" text="Process Toast" @click="fireProcess" />
    <OreButton variant="red" text="Error Toast" @click="fireError" />
    <OreButton variant="normal" text="VIP Toast" @click="fireVip" />
    <OreButton variant="normal" text="Debug Toast" @click="fireDebug" />
  </OreButtonGroup>
</template>

<script setup lang="ts">
import OreButton from './OreButton.vue'
import OreButtonGroup from './OreButtonGroup.vue'
import { showPop } from '../composables/usePop'

function fireSuccess() {
  showPop('World generation finished!', 'Seed: 1982374982', 'success')
}

function fireProcess() {
  showPop('Compiling shader pipeline...', 'Progress: 84%', 'process')
}

function fireError() {
  showPop('Could not connect to host', 'Connection timed out', 'error')
}

function fireVip() {
  showPop('Realms Plus membership unlocked!', 'Valid for: 30 days', 'vip')
}

function fireDebug() {
  showPop('[DEBUG] Render Tick = 60fps', 'VRAM: 1420MB', 'debug_text')
}
</script>
