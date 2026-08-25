# Button

<OreBanner type="neutral">
Buttons allow users to navigate or trigger actions. Upon clicking, the button mechanically depresses with a 3D tactile displacement and changes its specular highlight.
</OreBanner>

---

## 🎮 Color Variants

<OreDisplay title="Color Variants">
  <OreButtonGroup>
    <OreButton variant="normal" text="Normal (Gray)" />
    <OreButton variant="green" text="Primary (Green)" />
    <OreButton variant="red" text="Destructive (Red)" />
    <OreButton variant="disabled" text="Disabled State" />
  </OreButtonGroup>
</OreDisplay>

```vue
<template>
  <OreButtonGroup>
    <OreButton variant="normal" text="Normal (Gray)" />
    <OreButton variant="green" text="Primary (Green)" />
    <OreButton variant="red" text="Destructive (Red)" />
    <OreButton variant="disabled" text="Disabled State" />
  </OreButtonGroup>
</template>
```

---

## 📐 Size Specifications

OreUI provides `xs`, `sm`, `md`, `lg`, `auto`, and `full` width specifications:

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
      href="https://github.com/Spectrollay-OreUI/OreUI"
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

## 📋 Component Props

| Prop | Description | Type | Values | Default |
| :--- | :--- | :--- | :--- | :--- |
| `variant` | Color scheme variant | `string` | `'normal' \| 'green' \| 'red' \| 'disabled'` | `'normal'` |
| `size` | Width dimension | `string` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'auto' \| 'full'` | `'auto'` |
| `text` | Button label text | `string` | - | `''` |
| `countdown` | Countdown seconds | `number` | - | `0` |
| `tip` | Hover tooltip text | `string` | - | `''` |
| `icon` | Built-in icon name | `string` | - | `''` |
| `iconPosition` | Icon placement | `string` | `'left' \| 'right'` | `'left'` |
| `href` | Anchor link URL (renders as `<a>`) | `string` | - | `''` |
| `sound` | Whether to play sound on click | `boolean` | - | `true` |
