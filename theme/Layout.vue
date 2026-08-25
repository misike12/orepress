<template>
  <DefaultTheme.Layout>
    <!-- Insert Sound Toggle in Navbar -->
    <template #nav-bar-content-after>
      <div class="oreui-nav-tools">
        <OreSoundToggle />
      </div>
    </template>

    <!-- Global Toast / Pop Notifications -->
    <template #layout-bottom>
      <OrePop />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import OreSoundToggle from './components/OreSoundToggle.vue'
import OrePop from './components/OrePop.vue'
import { preloadSounds, playSound } from './composables/useSound'

onMounted(() => {
  preloadSounds()

  // Global listener for sound effects on standard links/buttons if desired
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest('a, .VPSidebarItem, .VPNavBarMenuLink')
    if (target) {
      playSound('click')
    }
  })
})
</script>

<style scoped>
.oreui-nav-tools {
  display: flex;
  align-items: center;
  margin-left: 12px;
}
</style>
