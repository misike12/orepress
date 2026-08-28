<template>
  <div class="oreui-hero-container">
    <div class="oreui-hero-badge-row">
      <OreBadge type="release">v1.1.1.C Release</OreBadge>
      <OreTag color="green">Minecraft Bedrock Style</OreTag>
    </div>

    <div class="oreui-hero-logo-box">
      <img :src="withBase('/logo.png')" class="oreui-hero-logo" alt="OreUI" />
    </div>

    <h1 class="oreui-hero-title">
      {{ title || 'OREUI VITEPRESS' }}
    </h1>

    <p class="oreui-hero-tagline">
      {{ tagline || 'A high-fidelity Minecraft Bedrock & OreUI design theme for VitePress.' }}
    </p>

    <div class="oreui-hero-actions">
      <OreButton
        variant="green"
        size="md"
        text="Get Started"
        href="/guide/getting-started"
      />
      <OreButton
        variant="normal"
        size="md"
        text="Explore Components"
        href="/components/buttons"
      />
      <OreButton
        variant="normal"
        size="sm"
        text="GitHub"
        href="https://github.com/misike12/orepress"
        target="_blank"
        icon="Github"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase } from 'vitepress'
import OreButton from './OreButton.vue'
import OreBadge from './OreBadge.vue'
import OreTag from './OreTag.vue'

interface Props {
  title?: string
  tagline?: string
}

defineProps<Props>()
</script>

<style scoped>
.oreui-hero-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 16px 32px 16px;
  background: radial-gradient(circle at 50% 30%, rgba(60, 133, 39, 0.15) 0%, transparent 70%);
  border-bottom: 2px solid #1E1E1F;
}

.oreui-hero-badge-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.oreui-hero-logo-box {
  margin-bottom: 16px;
}

.oreui-hero-logo {
  width: 96px;
  height: 96px;
  object-fit: contain;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.5));
}

.oreui-hero-title {
  font-family: var(--font-mc-ten);
  font-size: 2.8rem;
  color: #FFFFFF;
  margin: 0 0 12px 0;
  letter-spacing: 1px;
  text-shadow: 2px 2px 0 #000000;
}

.oreui-hero-tagline {
  font-family: var(--font-noto);
  font-size: 1.15rem;
  color: #D0D1D4;
  max-width: 680px;
  margin: 0 0 28px 0;
  line-height: 1.6;
}

.oreui-hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 640px) {
  .oreui-hero-title {
    font-size: 2rem;
  }
  .oreui-hero-tagline {
    font-size: 1rem;
  }
}
</style>
