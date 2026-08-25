# Containers & Cards

Features Dynamic Shimmer Cards (ShowBlock), Main Frame Containers, and Page Title Areas.

---

## ✨ OreShowBlock Shimmer Cards

Hovering over a card triggers a double diagonal light beam sweep:

<OreDisplay title="Dynamic Shimmer Cards">
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 520px;">
    <OreShowBlock
      title="Spectrollay Minecraft Repository"
      description="An open-source repository archiving historical Minecraft versions and server builds."
      href="https://github.com/Spectrollay/minecraft_repository"
      target="_blank"
      icon="Github"
    />
    <OreShowBlock
      title="Bedrock Localization Project"
      description="Community initiative dedicated to refining and translating Minecraft Bedrock terminology."
      href="https://github.com/Spectrollay/mclang_cn"
      target="_blank"
      icon="Docs"
    />
  </div>
</OreDisplay>

```vue
<template>
  <OreShowBlock
    title="Spectrollay Minecraft Repository"
    description="An open-source repository archiving historical Minecraft versions."
    href="https://github.com/Spectrollay/minecraft_repository"
    target="_blank"
    icon="Github"
  />
</template>
```

---

## 🖼️ OreUI Frame Container

Uses the classic Minecraft asymmetrical borders (light gray top `#5A5B5C` and dark gray bottom `#333334`):

<div class="oreui-frame">
  <h3 style="margin-top: 0; font-family: var(--font-mc-seven);">Main Content Block</h3>
  <p style="margin: 0; font-family: var(--font-noto); line-height: 1.6; color: #D0D1D4;">
    This is an OreUI Frame container, typically used to encapsulate card groups, settings panels, or data tables.
  </p>
</div>

```html
<div class="oreui-frame">
  <h3>Main Content Block</h3>
  <p>This is an OreUI Frame container.</p>
</div>
```
