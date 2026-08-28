<template>
  <DefaultTheme.Layout>
    <!-- Global Toast / Pop Notifications -->
    <template #layout-bottom>
      <OrePop />
    </template>
  </DefaultTheme.Layout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import OrePop from './components/OrePop.vue'
import { preloadSounds, playSound } from './composables/useSound'

function handleGlobalClick(e: MouseEvent) {
  const el = e.target as HTMLElement | null
  if (!el) return

  // Skip if element already has sound handling (OreUI components)
  if (el.closest('.oreui-btn, .ore-switch, .oreui-tab-item, .oreui-accordion-header, .oreui-dropdown-label, .oreui-slider-track, .oreui-toggles button, .oreui-modal-close-btn, .oreui-show-block')) {
    return
  }

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
}

onMounted(() => {
  preloadSounds()

  // Native Global listener for sound effects on all VitePress interactive elements
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleGlobalClick)
  }
})

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleGlobalClick)
  }
})
</script>
