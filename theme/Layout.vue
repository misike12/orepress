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

  // Native Global listener for sound effects on all VitePress interactive elements
  if (typeof document !== 'undefined') {
    document.addEventListener('click', (e) => {
      const el = e.target as HTMLElement | null
      if (!el) return

      // Green primary buttons / Next page button -> primary button sound
      if (el.closest('.pager-link.next, .VPButton.brand, .variant-green, .variant-purple')) {
        playSound('button')
        return
      }

      // Generic links, prev page, sidebar, navbar, copy buttons -> click sound
      if (
        el.closest(
          '.pager-link.prev, .VPButton.alt, .VPSidebarItem, .VPNavBarMenuLink, .VPMenuLink, .outline-link, .edit-link-button, .copy, .DocSearch-Button, .VPNavBarSearchButton'
        )
      ) {
        playSound('click')
      }
    })
  }
})
</script>

<style scoped>
.oreui-nav-tools {
  display: flex;
  align-items: center;
  margin-left: 12px;
}
</style>
