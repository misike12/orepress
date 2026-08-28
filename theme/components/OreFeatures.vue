<template>
  <div class="oreui-features-grid">
    <div
      v-for="(item, idx) in features"
      :key="idx"
      class="oreui-feature-card"
    >
      <div class="feature-icon-box">
        <span class="feature-emoji">{{ item.icon }}</span>
      </div>
      <h3 class="feature-title">{{ item.title }}</h3>
      <p class="feature-details">{{ item.details }}</p>
      <div v-if="item.link" class="feature-link-row">
        <a
          :href="resolveLink(item.link)"
          class="feature-link"
        >Learn More &rarr;</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'

interface FeatureItem {
  icon: string
  title: string
  details: string
  link?: string
}

interface Props {
  features?: FeatureItem[]
}

withDefaults(defineProps<Props>(), {
  features: () => [
    {
      icon: '🎮',
      title: 'Authentic Minecraft Aesthetics',
      details: 'Built with pixel-perfect typography (Minecraft Ten, Seven, Five), 3D mechanical press feedback, and tactile bevel shadows.',
      link: '/guide/typography'
    },
    {
      icon: '🎵',
      title: 'Immersive Web Audio Feedback',
      details: 'Embedded memory-cached audio for clicks, button presses, drawer toggles, toast alerts, and level-up XP fanfare.',
      link: '/components/sound-effects'
    },
    {
      icon: '🧱',
      title: 'Complete OreUI Components',
      details: '3D buttons, countdown buttons, checkboxes, spring-bounce toggles, segmented sliders, dropdowns, modal dialogs, and shimmer cards.',
      link: '/components/buttons'
    },
    {
      icon: '⚡',
      title: 'Powered by VitePress & Vue 3',
      details: 'Lightning-fast client routing, full Markdown component interoperability, dark/light theme support, and responsive layouts.',
      link: '/guide/getting-started'
    }
  ]
})

function resolveLink(link: string): string {
  if (
    link.startsWith('http://') ||
    link.startsWith('https://') ||
    link.startsWith('//') ||
    link.startsWith('#') ||
    link.startsWith('mailto:')
  ) {
    return link
  }
  return withBase(link)
}
</script>

<style scoped>
.oreui-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  padding: 32px 16px;
  max-width: 1152px;
  margin: 0 auto;
}

.oreui-feature-card {
  background-color: #313233;
  border: 2px solid #1E1E1F;
  box-shadow: inset 0 -4px #242425, inset 2px 2px rgba(255, 255, 255, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.oreui-feature-card:hover {
  transform: translateY(-2px);
  background-color: #38393b;
  border-color: #58585A;
}

.feature-icon-box {
  width: 44px;
  height: 44px;
  background-color: #1E1E1F;
  border: 2px solid #58585A;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.feature-emoji {
  font-size: 24px;
}

.feature-title {
  font-family: var(--font-mc-seven);
  font-size: 1.15rem;
  color: #FFFFFF;
  margin: 0 0 8px 0;
}

.feature-details {
  font-family: var(--font-noto);
  font-size: 0.92rem;
  color: #D0D1D4;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.feature-link-row {
  margin-top: 14px;
}

.feature-link {
  font-family: var(--font-noto-bold);
  font-size: 13px;
  color: #6CC349 !important;
  text-decoration: none !important;
  border: none !important;
}

.feature-link:hover {
  color: #A0E081 !important;
}
</style>
