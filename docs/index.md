---
layout: page
---

<OreHero
  title="OREUI VITEPRESS"
  tagline="A high-fidelity Minecraft Bedrock & OreUI design theme for VitePress."
/>

<OreFeatures />

<div class="home-showcase-section">
  <div class="home-container">
    <div class="oreui-title-area">
      <h2 style="margin: 0; font-family: var(--font-mc-ten); font-size: 2rem;">Interactive Component Showcase</h2>
    </div>

    <OreBanner type="info">
      Try the components below! All buttons and controls are hooked up with authentic Minecraft Web Audio sound effects.
    </OreBanner>

    <div class="showcase-grid">
      <!-- Buttons Card -->
      <div class="showcase-card">
        <h3 class="card-title">🎮 3D Tactile Buttons</h3>
        <p class="card-desc">Multiple sizes, color schemes, self-healing countdown timers, and mechanical down-press depth.</p>
        <OreButtonGroup>
          <OreButton variant="green" text="Primary Action" />
          <OreButton variant="normal" text="Regular Button" />
          <OreButton variant="red" text="Destructive" />
          <OreButton text="Countdown" :countdown="10" />
        </OreButtonGroup>
      </div>

      <!-- Switches & Checkboxes -->
      <div class="showcase-card">
        <h3 class="card-title">🔘 Dynamic Form Controls</h3>
        <p class="card-desc">Dual-state sliding switches with physical jelly bounce feedback, 3D checkboxes, and stepped sliders.</p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <OreSwitch :model-value="true" label="Audio Effects (Sound ON)" />
          <OreCheckbox :model-value="true" label="Remember Preferences" />
          <OreSlider :model-value="75" label="Master Volume" unit="%" />
        </div>
      </div>

      <!-- Interactive Toasts & Modals -->
      <div class="showcase-card">
        <h3 class="card-title">💬 Real-time Messages & Modals</h3>
        <p class="card-desc">Integrated toast notification system and classic Minecraft modal confirmation dialogs.</p>
        <InteractiveDemo />
      </div>

      <!-- Shimmer Cards -->
      <div class="showcase-card">
        <h3 class="card-title">✨ Dynamic Shimmer Cards</h3>
        <p class="card-desc">Multi-layered diagonal light beams sweep across cards on hover. Perfect for entryways and links.</p>
        <OreShowBlock
          title="Minecraft Bedrock UI Guidelines"
          description="Compliant with Mojang Studios & OreUI design systems and accessibility guidelines."
          href="/guide/introduction"
        />
      </div>
    </div>
  </div>
</div>

<style scoped>
.home-showcase-section {
  padding: 40px 16px 60px 16px;
  background-color: var(--vp-c-bg-alt);
}

.home-container {
  max-width: 1152px;
  margin: 0 auto;
}

.showcase-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.showcase-card {
  background-color: #313233;
  border: 2px solid #1E1E1F;
  box-shadow: inset 0 -4px #242425;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-family: var(--font-mc-seven);
  font-size: 1.25rem;
  color: #FFFFFF;
  margin: 0 0 8px 0;
}

.card-desc {
  font-family: var(--font-noto);
  font-size: 0.92rem;
  color: #D0D1D4;
  margin: 0 0 16px 0;
  line-height: 1.5;
}
</style>
