# Getting Started

This guide walks you through using the **OreUI Theme** in your VitePress projects.

---

## 📦 Installation

Install the theme and required dependencies in your VitePress project root:

```bash
npm install vitepress-theme-oreui vue vitepress
```

---

## 🛠️ Theme Setup

Import and export the theme in your `.vitepress/theme/index.ts`:

```ts
// .vitepress/theme/index.ts
import OreUITheme from 'vitepress-theme-oreui'

export default OreUITheme
```

Configure your site in `.vitepress/config.ts`:

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'My Minecraft Site',
  description: 'Powered by OreUI VitePress Theme',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/buttons' }
    ],
    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'Button', link: '/components/buttons' },
          { text: 'Controls', link: '/components/controls' }
        ]
      }
    ]
  }
})
```

---

## 📝 Using Components in Markdown

All OreUI components are globally registered. You can use them directly in any `.md` file:

```markdown
# Welcome to my Minecraft Site

<OreBanner type="info">This is an OreUI callout banner!</OreBanner>

<OreButtonGroup>
  <OreButton variant="green" text="Join Server" />
  <OreButton variant="normal" text="View Whitelist" />
</OreButtonGroup>

<OreSwitch :model-value="true" label="Auto-connect Voice Channel" />
```

### Live Preview:

<OreBanner type="info">This is an OreUI callout banner!</OreBanner>

<OreButtonGroup>
  <OreButton variant="green" text="Join Server" />
  <OreButton variant="normal" text="View Whitelist" />
</OreButtonGroup>

<OreSwitch :model-value="true" label="Auto-connect Voice Channel" />

---

## 🎵 Audio Feedback System

All sounds are preloaded and cached in memory using Base64 Data URIs, meaning zero network latency and no download manager popups.

You can trigger sound effects anywhere in your Vue/TS code:

```ts
import { playSound } from 'vitepress-theme-oreui'

// Play button click sound
playSound('click')

// Play green primary button sound
playSound('button')

// Play XP fanfare sound
playSound('xp')
```
