# Messages & Modals

Showcases Notification Banners, Pop Toasts, and Minecraft Modal Dialogs.

---

## 📢 Banner Notification Bars

Used for page-wide announcements or highlighted guidelines:

<OreDisplay title="Notification Banners">
  <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
    <OreBanner type="neutral">Neutral Notice: Welcome to the Minecraft OreUI design specification.</OreBanner>
    <OreBanner type="info">Information: A new Bedrock 1.21.0 update is available for download.</OreBanner>
    <OreBanner type="important">Important Warning: Server maintenance scheduled for this Friday at 02:00 UTC!</OreBanner>
  </div>
</OreDisplay>

```vue
<template>
  <OreBanner type="neutral">Neutral Notice: Welcome to the Minecraft OreUI design specification.</OreBanner>
  <OreBanner type="info">Information: A new Bedrock 1.21.0 update is available for download.</OreBanner>
  <OreBanner type="important">Important Warning: Server maintenance scheduled for this Friday at 02:00 UTC!</OreBanner>
</template>
```

---

## 🍞 Pop Toasts

Smoothly animated bottom-up toasts with Web Audio sound feedback:

<OreDisplay title="Trigger Toast Notifications">
  <InteractiveToastDemo />
</OreDisplay>

```vue
<script setup>
import { showPop } from 'vitepress-theme-oreui'

function triggerToast() {
  showPop('World saved to cloud successfully!', 'UUID: 39a0-f8e2', 'success')
}
</script>

<template>
  <OreButton variant="green" text="Trigger Success Toast" @click="triggerToast" />
</template>
```

---

## 🪟 Modal Dialogs

Authentic Minecraft dark gray dialog with header bevels, close button, and backdrop:

<OreDisplay title="Modal Dialog">
  <InteractiveModalDemo />
</OreDisplay>

```vue
<script setup>
import { ref } from 'vue'

const isModalVisible = ref(false)

function handleConfirm() {
  console.log('Action confirmed by user')
}
</script>

<template>
  <OreButton variant="green" text="Open Confirmation Dialog" @click="isModalVisible = true" />

  <OreModal
    v-model="isModalVisible"
    title="Delete World Confirmation"
    confirm-text="Delete World"
    cancel-text="Cancel"
    @confirm="handleConfirm"
  >
    <p>Are you sure you want to permanently delete this world? This action cannot be undone!</p>
  </OreModal>
</template>
```
