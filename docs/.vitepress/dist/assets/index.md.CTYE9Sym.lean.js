import{_ as r,r as t,o as i,c,d as s,a as e}from"./chunks/framework.CJ137FEY.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"page"},"headers":[],"relativePath":"index.md","filePath":"index.md"}'),d={name:"index.md"};function l(u,n,m,h,p,f){const a=t("OreHero"),o=t("OreFeatures");return i(),c("div",null,[s(a,{title:"OREUI VITEPRESS",tagline:"A high-fidelity Minecraft Bedrock & OreUI design theme for VitePress."}),s(o),n[0]||(n[0]=e("div",{class:"home-showcase-section"},[e("div",{class:"home-container"},[e("div",{class:"oreui-title-area"},[e("h2",{style:{margin:"0","font-family":"var(--font-mc-ten)","font-size":"2rem"}},"Interactive Component Showcase")]),e("pre",null,[e("code",null,`<OreBanner type="info">
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
`)])])],-1))])}const w=r(d,[["render",l],["__scopeId","data-v-b120d79a"]]);export{g as __pageData,w as default};
