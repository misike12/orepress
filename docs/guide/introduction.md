# What is OreUI?

<OreBanner type="info">
OreUI is the modern cross-platform UI design system and interaction standard created by Mojang Studios for Minecraft: Bedrock Edition.
</OreBanner>

**Spectrollay Ore UI** ([GitHub Repository](https://github.com/Spectrollay-OreUI/OreUI)) brings this design philosophy to the web, delivering authentic pixel aesthetics, mechanical 3D down-press tactile feedback, immersive sound effects, and full accessibility standards.

---

## 🎨 Core Design Principles

### 1. Tactile 3D Depth
Unlike flat design frameworks, OreUI embraces **Bevel Inset Shadows** and **Specular Highlights**:
- Buttons exhibit a raised, mechanical look in their idle state.
- Upon clicking, the button depresses by `4px` with synchronized padding adjustments for realistic mechanical response.

### 2. Immersive Web Audio Feedback
OreUI includes the official Minecraft Bedrock sound library embedded directly in memory:
- **General buttons & links**: Crisp `click.ogg` wood tick.
- **Primary green actions**: Solid `button.ogg` confirmation.
- **Drawers & dropdowns**: `drawer_open.ogg` and `drawer_close.ogg`.
- **Toasts & Level-up**: `toast.ogg` and `xp.ogg`.

### 3. Tiered Minecraft Typography
- **Minecraft Ten**: Main titles, hero headings, and brand typography.
- **Minecraft Seven**: Section headers (H2/H3), card titles, and modal headers.
- **Minecraft Five**: Status badges, version indicators, and micro tags.
- **Noto Sans**: General readable body paragraphs and documentation text.

---

## 🚀 Why Choose OreUI VitePress Theme?

- **Zero-Config Setup**: Automatically restyles VitePress navigation, sidebars, code blocks, callouts, and footers.
- **Vue 3 Components**: Write `<OreButton>`, `<OreSwitch>`, `<OreModal>`, etc., directly in Markdown.
- **Fully Responsive**: Adapts seamlessly to mobile, tablet, and widescreen layouts.
- **Built-in Sound Manager**: Memory-cached audio with navbar mute/volume controls.

<div style="margin-top: 24px;">
  <OreButton
    variant="green"
    text="Next: Getting Started &rarr;"
    href="/guide/getting-started"
  />
</div>
