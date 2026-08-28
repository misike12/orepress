<div align="center">

# ⛏️ VitePress Theme OreUI

**An authentic, immersive VitePress theme inspired by Spectrollay OreUI and the Minecraft Bedrock Edition design language.**

[![npm version](https://img.shields.io/badge/npm-v1.1.1.A-3C8527.svg?style=flat-square&logo=npm)](https://www.npmjs.com/)
[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-10B981.svg?style=flat-square&logo=vitepress)](https://vitepress.dev/)
[![Vue 3](https://img.shields.io/badge/Vue-3.4+-4FC08D.svg?style=flat-square&logo=vuedotjs)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5+-3178C6.svg?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-F59E0B.svg?style=flat-square)](https://opensource.org/licenses/MIT)

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-native-reskin">Native Reskin</a> •
  <a href="#-component-catalog">Component Catalog</a> •
  <a href="#-sound-engine">Sound Engine</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-license">License</a>
</p>

</div>

---

## 🌟 Overview

**`vitepress-theme-oreui`** transforms standard VitePress documentation into an interactive, tactile Minecraft Bedrock UI experience. 

It is designed to work **100% out-of-the-box**: simply register the theme in your VitePress configuration, and every native VitePress element (navbar, sidebar, search, Next/Previous page buttons, callouts, tables, and code blocks) is instantly reskinned into 3D beveled Minecraft interfaces with zero-latency audio feedback.

---

## ✨ Features

- 🎮 **Complete Native Reskin**: All standard VitePress UI components are automatically transformed into authentic 3D Minecraft Bedrock interfaces.
- 🎛️ **18+ Rich Vue 3 Components**: A full suite of interactive UI elements (Buttons, Switches, Sliders, Tabs, Accordions, XP Bars, Tooltips, Cards, Radios, Modals, Toasts, etc.) ready to be used directly in Markdown.
- 🔊 **Zero-Latency Web Audio Engine**: Preloaded Base64 audio decoding for button clicks, switches, drawers, toasts, and XP fanfares. Audio files are decoded in-memory, eliminating network latency and download manager popups.
- 🧱 **Authentic Minecraft Typography**: Includes embedded `Minecraft Ten` (display titles), `Minecraft Seven` (buttons/nav), `Minecraft Five` (metadata), and `Noto Sans Bold` (body text).
- 🎨 **16 Minecraft Formatting Colors**: Pre-configured utility classes for classic Minecraft color codes (`.mc-color-gold`, `.mc-color-aqua`, `.mc-color-green`, etc.).
- ✨ **Enchanted Shimmer Foil**: Authentic Minecraft enchanted glint animation effect for VIP buttons and highlight cards.
- 📱 **Mobile & Touch Friendly**: Seamless pointer and touch event handling for sliders, switches, and drawers.
- ⚡ **Lightweight & Fast**: Built on Vue 3 and Vite with zero heavy third-party dependencies.

---

## 🚀 Quick Start

### 1. Installation

Install the theme via your preferred package manager:

```bash
# npm
npm install vitepress-theme-oreui

# pnpm
pnpm add vitepress-theme-oreui

# yarn
yarn add vitepress-theme-oreui

# bun
bun add vitepress-theme-oreui
```

### 2. Register Theme

In your project's `.vitepress/theme/index.ts` (or `.vitepress/theme/index.js`):

```ts
import OreUITheme from 'vitepress-theme-oreui'

export default {
  ...OreUITheme
}
```

### 3. Start Documenting

Write standard Markdown or drop in any OreUI component directly into your `.md` files:

```markdown
# Welcome to Server Docs

<OreBanner type="info">Server maintenance scheduled for Friday 18:00 UTC.</OreBanner>

<OreButtonGroup>
  <OreButton variant="green" text="Join Server" />
  <OreButton variant="purple" enchanted text="✨ Vote on PMC" />
</OreButtonGroup>

<OreProgress variant="xp" :value="80" :xp-level="50" />
```

---

## 🌲 Native VitePress Reskin (Out-of-the-Box)

When `vitepress-theme-oreui` is enabled, the following native VitePress elements are automatically transformed:

| Component | Default VitePress | OreUI Reskin |
| :--- | :--- | :--- |
| **Next Page Button** | Plain outline box | 🟩 **Green 3D Minecraft Bevel Button** with depressed active state and click sound |
| **Previous Page Button** | Plain outline box | ⬜ **Gray 3D Minecraft Bevel Button** with specular highlight |
| **Navigation Bar** | Standard flat header | 🪨 Dark Bedrock stone topbar with `Minecraft Ten` title and `Minecraft Seven` links |
| **Sidebar** | Plain gray list | 🌲 Dark stone background, gold headers (`#FFE866`), and green active item indicator |
| **Home Buttons (`VPButton`)** | Rounded pill buttons | 🎮 Tactile 3D green (`brand`) and gray (`alt`) Minecraft action buttons |
| **Feature Cards (`VPFeature`)** | Basic cards | 🪟 3D bevel window cards with hover elevation |
| **Callout Banners (`custom-block`)** | Solid border blocks | 🚩 Bedrock announcement banners with 6px thick accent left bar |
| **Tables (`table`)** | Generic HTML table | 📋 Striped dark Minecraft table with distinct `#181a1f` header |
| **Code Blocks** | Standard prism/shiki | 💻 Dark inset frame with square OreUI copy button |

---

## 🎛️ Component Catalog

All components are registered globally and can be used in Markdown without explicit imports.

### 1. Buttons (`<OreButton>`)
```vue
<!-- Color variants -->
<OreButton variant="normal" text="Normal (Gray)" />
<OreButton variant="green" text="Primary (Green)" />
<OreButton variant="purple" text="Creative (Purple)" />
<OreButton variant="blue" text="Info (Blue)" />
<OreButton variant="gold" text="Gold (Warning)" />
<OreButton variant="red" text="Destructive (Red)" />
<OreButton variant="dark" text="Dark Stone" />
<OreButton variant="ghost" text="Ghost Flat" />

<!-- Special states & icons -->
<OreButton variant="purple" enchanted text="✨ Enchanted Sword" />
<OreButton variant="green" loading text="Connecting..." />
<OreButton variant="normal" size="icon" icon="Refresh" tip="Refresh" />
<OreButton variant="green" :countdown="10" text="Accept Rules" />
```

### 2. Category Tabs (`<OreTabs>`)
```vue
<OreTabs
  v-model="selectedCategory"
  :tabs="[
    { label: 'Video Settings', value: 'video', icon: 'fullScreen' },
    { label: 'Audio Engine', value: 'audio', icon: 'Messages' },
    { label: 'Marketplace', value: 'market', badge: 'NEW' }
  ]"
/>
```

### 3. Collapsible Drawers (`<OreAccordion>`)
```vue
<OreAccordion title="Ray Tracing & Graphics Shaders" badge="RTX" default-open>
  <p>Configure DirectX Raytracing shaders and volumetric fog density.</p>
</OreAccordion>
```

### 4. XP Bar & Progress Indicators (`<OreProgress>`)
```vue
<!-- Authentic Minecraft XP Bar with Level Number -->
<OreProgress variant="xp" :value="75" :xp-level="30" :height="12" />

<!-- Multi-segment Health / Boss Bar -->
<OreProgress variant="red" label="Ender Dragon Health" :value="85" :segments="10" show-value />

<!-- Striped Resource Progress -->
<OreProgress variant="blue" label="Resource Pack Download" :value="60" show-value striped />
```

### 5. Item Tooltips (`<OreTooltip>`)
```vue
<OreTooltip title="Netherite Sword" content="Sharpness V, Unbreaking III, Mending">
  <OreButton variant="purple" enchanted text="Hover for Item Tooltip" />
</OreTooltip>
```

### 6. Container Cards (`<OreCard>`)
```vue
<OreCard title="World Properties" subtitle="Survival Mode • Hard Difficulty" icon="None" hoverable>
  <p>Seed: <strong>-48910284019284</strong></p>
  <div style="display: flex; gap: 8px;">
    <OreTag color="green">Cheats: Off</OreTag>
    <OreTag color="blue">Bedrock 1.21</OreTag>
  </div>
</OreCard>
```

### 7. Form Controls
```vue
<!-- Continuous & Discrete Sliders -->
<OreSlider v-model="volume" label="Master Volume" unit="%" />
<OreSlider v-model="chunks" :min="2" :max="16" :step="1" label="Render Distance" unit=" Chunks" />

<!-- Dual-state Spring Switch -->
<OreSwitch v-model="isShaderOn" label="Real-time Ray Tracing" />

<!-- Radio Button Group -->
<OreRadioGroup v-model="difficulty">
  <OreRadio value="peaceful" label="Peaceful" />
  <OreRadio value="easy" label="Easy" />
  <OreRadio value="normal" label="Normal" />
  <OreRadio value="hard" label="Hard" />
</OreRadioGroup>

<!-- 3D Checkbox -->
<OreCheckbox v-model="rememberChoice" label="Don't show this again" />

<!-- Dropdown Select -->
<OreDropdown v-model="mode" :options="['Survival', 'Creative', 'Adventure', 'Spectator']" />

<!-- Keyboard Hotkey Badges -->
<p>Press <OreKbd>ESC</OreKbd> to pause, or <OreKbd>F3</OreKbd> + <OreKbd>H</OreKbd> for tooltips.</p>
```

---

## 🔊 Sound Engine API

The theme includes a standalone, reactive sound engine powered by the Web Audio API.

```ts
import {
  playSound,
  isSoundMuted,
  soundVolume,
  setVolume,
  toggleMute
} from 'vitepress-theme-oreui'

// Trigger audio effects programmatically
playSound('click')        // Standard UI click
playSound('button')       // Primary confirmation green button
playSound('drawer_open')  // Category tab / drawer open
playSound('drawer_close') // Category tab / drawer close
playSound('toast')        // Notification chime
playSound('pop')          // Bubble pop sound
playSound('xp')           // XP fanfare sound

// Control global audio properties
setVolume(0.8)            // Volume between 0.0 and 1.0
toggleMute()              // Toggle mute state
```

---

## 🎨 Minecraft Color Codes & Utilities

You can apply Minecraft text colors anywhere using the utility classes:

```html
<span class="mc-color-gold">Gold Text (§6)</span>
<span class="mc-color-aqua">Aqua Text (§b)</span>
<span class="mc-color-green">Green Text (§a)</span>
<span class="mc-color-red">Red Text (§c)</span>
<span class="mc-color-light-purple">Light Purple Text (§d)</span>
<span class="mc-color-yellow">Yellow Text (§e)</span>
```

### 3D Bevel Utilities
- `.oreui-bevel-raised`: Standard 3D raised button bevel.
- `.oreui-bevel-sunken`: Inset sunken container frame.
- `.oreui-bevel-flat`: Dark clean border outline.
- `.mc-enchanted-foil`: Animated purple holographic glint overlay.

---

## ⚙️ Example Project Configuration

### `.vitepress/config.ts`

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'OreUI Documentation',
  description: 'Minecraft Bedrock UI Theme for VitePress',
  themeConfig: {
    logo: '/logo.png',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/buttons' },
      { text: 'Changelog', link: '/changelog/' }
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Installation', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Buttons', link: '/components/buttons' },
          { text: 'Form Controls', link: '/components/controls' },
          { text: 'Containers & Cards', link: '/components/containers' },
          { text: 'Sound System', link: '/components/sound-effects' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Spectrollay-OreUI/OreUI' }
    ]
  }
})
```

---

## 🛠️ Development & Contributing

```bash
# Clone the repository
git clone https://github.com/your-username/orepress.git
cd orepress

# Install dependencies
npm install

# Run VitePress development server
npm run dev

# Build documentation for production
npm run build

# Preview production build locally
npm run preview
```

Contributions, issues, and feature requests are always welcome! Feel free to check the [issues page](https://github.com/Spectrollay-OreUI/OreUI/issues).

---

## 📜 Credits & Acknowledgements

- **OreUI Design Philosophy**: Inspired by Mojang Studios' *Minecraft: Bedrock Edition* UI.
- **Spectrollay OreUI**: Third-party WebUI implementation reference ([Spectrollay-OreUI/OreUI](https://github.com/Spectrollay-OreUI/OreUI)).
- **VitePress**: Fast, Vue-powered static site generator by the Vue.js team.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ for the Minecraft & Vue.js developer community.</sub>
</div>
