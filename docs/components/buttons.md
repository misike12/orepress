# Button

<OreBanner type="neutral">
Buttons allow users to navigate or trigger actions. Upon clicking, the button mechanically depresses with a 3D tactile displacement, updates specular highlights, and plays authentic Minecraft interaction audio.
</OreBanner>

---

## 🎮 Color Variants

OreUI supports the full spectrum of Minecraft Bedrock edition button palettes:

<OreDisplay title="Color Variants">
  <OreButtonGroup>
    <OreButton variant="normal" text="Normal (Gray)" />
    <OreButton variant="green" text="Primary (Green)" />
    <OreButton variant="purple" text="Creative (Purple)" />
    <OreButton variant="blue" text="Info (Blue)" />
    <OreButton variant="gold" text="Gold (Warning)" />
    <OreButton variant="red" text="Destructive (Red)" />
    <OreButton variant="dark" text="Dark Stone" />
    <OreButton variant="ghost" text="Ghost Flat" />
    <OreButton variant="disabled" text="Disabled State" />
  </OreButtonGroup>
</OreDisplay>

```vue
<template>
  <OreButtonGroup>
    <OreButton variant="normal" text="Normal (Gray)" />
    <OreButton variant="green" text="Primary (Green)" />
    <OreButton variant="purple" text="Creative (Purple)" />
    <OreButton variant="blue" text="Info (Blue)" />
    <OreButton variant="gold" text="Gold (Warning)" />
    <OreButton variant="red" text="Destructive (Red)" />
    <OreButton variant="dark" text="Dark Stone" />
    <OreButton variant="ghost" text="Ghost Flat" />
  </OreButtonGroup>
</template>
```

---

## ✨ Special States & Effects

### Enchanted Shimmer Foil & Loading State
Add Minecraft enchanted foil shimmer with `enchanted` or a smooth animated spinner with `loading`:

<OreDisplay title="Special Button States">
  <OreButtonGroup>
    <OreButton variant="purple" enchanted text="✨ Enchanted Diamond Sword" />
    <OreButton variant="green" loading text="Connecting to Realm..." />
    <OreButton variant="normal" loading text="Loading Data..." />
    <OreButton variant="normal" size="icon" icon="Refresh" tip="Refresh Realm" />
    <OreButton variant="green" size="icon" icon="check_white" tip="Save Changes" />
  </OreButtonGroup>
</OreDisplay>

```vue
<template>
  <!-- Enchanted Shimmer Foil Effect -->
  <OreButton variant="purple" enchanted text="✨ Enchanted Diamond Sword" />

  <!-- Loading State -->
  <OreButton variant="green" loading text="Connecting to Realm..." />

  <!-- Square Icon Buttons -->
  <OreButton variant="normal" size="icon" icon="Refresh" tip="Refresh Realm" />
  <OreButton variant="green" size="icon" icon="check_white" tip="Save Changes" />
</template>
```

---

## 📐 Size Specifications

OreUI provides `xs`, `sm`, `md`, `lg`, `auto`, `full`, `icon`, and `icon-sm` specifications:

<OreDisplay title="Button Sizes">
  <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 360px;">
    <OreButton variant="normal" size="xs" text="XS Size" />
    <OreButton variant="normal" size="sm" text="SM Size" />
    <OreButton variant="normal" size="md" text="MD Size" />
    <OreButton variant="normal" size="lg" text="LG Size" />
    <OreButton variant="green" size="full" text="Full Width 100%" />
  </div>
</OreDisplay>

```vue
<template>
  <OreButton variant="normal" size="xs" text="XS Size" />
  <OreButton variant="normal" size="sm" text="SM Size" />
  <OreButton variant="normal" size="md" text="MD Size" />
  <OreButton variant="normal" size="lg" text="LG Size" />
  <OreButton variant="green" size="full" text="Full Width 100%" />
</template>
```

---

## ⏱️ Self-Healing Countdown

Ideal for terms acceptance, critical confirmations, or action cooldowns. The button automatically disables during the countdown, shows remaining seconds, and restores interaction once finished:

<OreDisplay title="Countdown Mode">
  <OreButtonGroup>
    <OreButton
      variant="green"
      text="I Have Read and Agree"
      :countdown="10"
    />
  </OreButtonGroup>
</OreDisplay>

```vue
<template>
  <OreButton
    variant="green"
    text="I Have Read and Agree"
    :countdown="10"
    @countdown-finish="handleFinish"
  />
</template>
```

---

## 💬 Tooltips & Icons

<OreDisplay title="Tooltips & Icons">
  <OreButtonGroup>
    <OreButton
      variant="normal"
      text="Hover for Tooltip"
      tip="This is an authentic OreUI dark tooltip bubble!"
    />
    <OreButton
      variant="green"
      text="Back"
      icon="arrowLeft_white"
      icon-position="left"
    />
    <OreButton
      variant="normal"
      text="External Link"
      icon="ExternalLink_white"
      icon-position="right"
      href="https://github.com/misike12/orepress"
      target="_blank"
    />
  </OreButtonGroup>
</OreDisplay>

```vue
<template>
  <OreButton
    variant="normal"
    text="Hover for Tooltip"
    tip="This is an authentic OreUI dark tooltip bubble!"
  />
  <OreButton
    variant="green"
    text="Back"
    icon="arrowLeft_white"
    icon-position="left"
  />
</template>
```

---

## 🔳 Icon Buttons

Square icon-only buttons for toolbar actions, nav bars and modal headers. They reuse the full button palette, loading, tooltip and sound behavior:

<OreDisplay title="Icon Buttons">
  <OreButtonGroup>
    <OreIconButton icon="Menu" tip="Settings Menu" />
    <OreIconButton icon="Refresh" tip="Reload World" />
    <OreIconButton icon="search" tip="Search Server" />
    <OreIconButton icon="question" tip="Help" variant="dark" />
    <OreIconButton icon="cross" tip="Close" variant="red" />
    <OreIconButton icon="check" tip="Confirm" variant="green" />
  </OreButtonGroup>
</OreDisplay>

```vue
<template>
  <OreButtonGroup>
    <OreIconButton icon="Menu" tip="Settings Menu" />
    <OreIconButton icon="Refresh" tip="Reload World" />
    <OreIconButton icon="cross" tip="Close" variant="red" />
    <OreIconButton icon="check" tip="Confirm" variant="green" />
  </OreButtonGroup>
</template>
```

---

## 📋 Component Props

| Prop | Description | Type | Values | Default |
| :--- | :--- | :--- | :--- | :--- |
| `variant` | Color scheme variant | `string` | `'normal' \| 'green' \| 'purple' \| 'blue' \| 'gold' \| 'red' \| 'dark' \| 'ghost' \| 'disabled'` | `'normal'` |
| `size` | Width dimension | `string` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'auto' \| 'full' \| 'icon' \| 'icon-sm'` | `'auto'` |
| `text` | Button label text | `string` | - | `''` |
| `loading` | Whether button is in loading state | `boolean` | - | `false` |
| `enchanted` | Whether to show Minecraft enchanted foil shimmer | `boolean` | - | `false` |
| `countdown` | Countdown seconds | `number` | - | `0` |
| `tip` | Hover tooltip text | `string` | - | `''` |
| `icon` | Built-in icon name | `string` | - | `''` |
| `iconPosition` | Icon placement | `string` | `'left' \| 'right'` | `'left'` |
| `href` | Anchor link URL (renders as `<a>`) | `string` | - | `''` |
| `sound` | Whether to play sound on click | `boolean` | - | `true` |
