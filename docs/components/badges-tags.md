# Badges, Tags, Lists & Tables

Showcases Version Badges, Status Dots, Color Tags, Bedrock Geometric Lists, and Data Tables.

---

## 🏷️ Badges

<OreDisplay title="Version Badges">
  <div style="display: flex; gap: 12px; flex-wrap: wrap;">
    <OreBadge type="release">Release Version</OreBadge>
    <OreBadge type="dev">Development Build</OreBadge>
    <OreBadge type="internal">Internal Build</OreBadge>
    <OreBadge type="legacy">Legacy Release</OreBadge>
  </div>
</OreDisplay>

```vue
<template>
  <OreBadge type="release">Release Version</OreBadge>
  <OreBadge type="dev">Development Build</OreBadge>
  <OreBadge type="internal">Internal Build</OreBadge>
  <OreBadge type="legacy">Legacy Release</OreBadge>
</template>
```

---

## 🟢 Status Dots

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 16px 0; font-family: var(--font-noto-bold);">
  <div><span class="sb-status-dot release"></span> Online / Stable</div>
  <div><span class="sb-status-dot dev"></span> Building / Dev</div>
  <div><span class="sb-status-dot internal"></span> Internal Testing</div>
  <div><span class="sb-status-dot legacy"></span> Archived</div>
</div>

```html
<span class="sb-status-dot release"></span> Online / Stable
<span class="sb-status-dot dev"></span> Building / Dev
<span class="sb-status-dot internal"></span> Internal Testing
<span class="sb-status-dot legacy"></span> Archived
```

---

## 📐 OreList Geometric Lists

Minecraft Bedrock specific geometric hierarchy bullets:
- **Level 1**: Solid Square
- **Level 2**: Solid 45° Diamond
- **Level 3**: Hollow Square
- **Level 4**: Hollow 45° Diamond

<div class="oreui-frame" style="max-width: 480px;">
  <OreList :level="1">Overworld World Generation Algorithm</OreList>
  <OreList :level="2">Plains & Sunflower Plains Biome Variants</OreList>
  <OreList :level="3">Flower Forest and Dark Forest Variations</OreList>
  <OreList :level="4">Giant Mushroom Generation Rule</OreList>
  <OreList :level="1">Nether Dimension Generation Pipeline</OreList>
  <OreList :level="2">Crimson Forest and Warped Forest Ecosystems</OreList>
</div>

```vue
<template>
  <OreList :level="1">Level 1: Solid Square</OreList>
  <OreList :level="2">Level 2: Solid Diamond</OreList>
  <OreList :level="3">Level 3: Hollow Square</OreList>
  <OreList :level="4">Level 4: Hollow Diamond</OreList>
</template>
```

---

## 📊 OreTable Data Table

<table class="oreui-table">
  <thead>
    <tr>
      <th>Item Name</th>
      <th>Namespace ID</th>
      <th>Max Stack</th>
      <th>Rarity</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Diamond</td>
      <td><code>minecraft:diamond</code></td>
      <td>64</td>
      <td><OreTag color="blue">Rare</OreTag></td>
    </tr>
    <tr>
      <td>Netherite Ingot</td>
      <td><code>minecraft:netherite_ingot</code></td>
      <td>64</td>
      <td><OreTag color="red">Epic</OreTag></td>
    </tr>
    <tr>
      <td>Enchanted Golden Apple</td>
      <td><code>minecraft:enchanted_golden_apple</code></td>
      <td>64</td>
      <td><OreTag color="yellow">Legendary</OreTag></td>
    </tr>
    <tr>
      <td>Emerald</td>
      <td><code>minecraft:emerald</code></td>
      <td>64</td>
      <td><OreTag color="green">Common</OreTag></td>
    </tr>
  </tbody>
</table>
