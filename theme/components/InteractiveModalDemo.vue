<template>
  <div>
    <OreButton
      variant="green"
      text="Open OreUI Modal Dialog"
      @click="isOpen = true"
    />

    <OreModal
      v-model="isOpen"
      title="Minecraft Modal Dialog"
      confirm-text="Confirm"
      cancel-text="Dismiss"
      @confirm="onConfirm"
    >
      <div style="margin-bottom: 12px;">
        This is a modal dialog styled with authentic Minecraft textures, shadows, and mechanical press feel.
      </div>
      <OreInput placeholder="Enter command or arguments..." />
    </OreModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OreButton from './OreButton.vue'
import OreModal from './OreModal.vue'
import OreInput from './OreInput.vue'
import { showPop } from '../composables/usePop'

const isOpen = ref(false)

function onConfirm() {
  showPop('Command sent to server successfully!', '', 'success')
}
</script>
