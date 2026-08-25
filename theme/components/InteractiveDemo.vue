<template>
  <div>
    <OreButtonGroup>
      <OreButton variant="green" size="sm" text="Success Toast" @click="showSuccess" />
      <OreButton variant="normal" size="sm" text="Warning Toast" @click="showWarning" />
      <OreButton variant="red" size="sm" text="Error Toast" @click="showError" />
      <OreButton variant="normal" size="sm" text="Open Modal" @click="isModalOpen = true" />
    </OreButtonGroup>

    <OreModal
      v-model="isModalOpen"
      title="Minecraft Confirmation Dialog"
      confirm-text="Confirm"
      cancel-text="Close"
      @confirm="handleModalConfirm"
    >
      <p style="margin: 0;">
        This is an authentic <strong>OreUI Modal Dialog</strong> with ESC key shortcut, backdrop blur, and Minecraft sound effects.
      </p>
      <div style="margin-top: 14px;">
        <OreCheckbox v-model="rememberChoice" label="Don't ask me again" />
      </div>
    </OreModal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OreButton from './OreButton.vue'
import OreButtonGroup from './OreButtonGroup.vue'
import OreModal from './OreModal.vue'
import OreCheckbox from './OreCheckbox.vue'
import { showPop } from '../composables/usePop'

const isModalOpen = ref(false)
const rememberChoice = ref(false)

function showSuccess() {
  showPop('Task completed successfully!', 'Config saved to local storage', 'success')
}

function showWarning() {
  showPop('Unsaved changes detected!', 'Make sure to backup your world', 'process')
}

function showError() {
  showPop('Connection failed!', 'Error code: 0x800401', 'error')
}

function handleModalConfirm() {
  showPop('Action confirmed!', '', 'vip')
}
</script>
