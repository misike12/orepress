# Typography

OreUI comes equipped with the authentic typography scale used in Minecraft Bedrock Edition, featuring pixel fonts for titles and clean Noto Sans for documentation reading.

---

## 🔤 Font Hierarchy Overview

<div class="oreui-frame">
  <div style="font-family: var(--font-mc-ten); font-size: 28px; color: #FFFFFF; margin-bottom: 8px;">
    Minecraft Ten - 28px Hero & Title Font
  </div>
  <div style="font-family: var(--font-mc-seven); font-size: 22px; color: #6CC349; margin-bottom: 8px;">
    Minecraft Seven - 22px Section Headers & Card Titles
  </div>
  <div style="font-family: var(--font-mc-five-bold); font-size: 16px; color: #FFE866; margin-bottom: 8px;">
    Minecraft Five Bold - 16px Badges, Tags & Micro Headers
  </div>
  <div style="font-family: var(--font-noto-bold); font-size: 15px; color: #D0D1D4; line-height: 1.6;">
    Noto Sans Bold - 15px Interactive Buttons, Form Labels, and UI Components.
  </div>
</div>

---

## 📏 CSS Variables & Guidelines

You can use the predefined CSS variables in your custom styles:

| CSS Variable | Font Family | Typical Usage |
| :--- | :--- | :--- |
| `var(--font-mc-ten)` | `Minecraft Ten` | Page H1 headings, Logo branding, Hero main titles |
| `var(--font-mc-seven)` | `Minecraft Seven` | H2/H3 section titles, Card headers, Sidebar titles |
| `var(--font-mc-five)` | `Minecraft Five` | Status badges, Version numbers, Small tags |
| `var(--font-noto-bold)` | `Noto Sans Bold` | Buttons, Input labels, Navigation links |
| `var(--font-noto)` | `Noto Sans` | Explanatory paragraphs, Body documentation |
| `var(--font-mono)` | `Cascadia Code / Consolas` | Inline code, Code blocks, Values |

---

## 💻 Markdown Heading Previews

# Heading Level 1 (Minecraft Ten)
## Heading Level 2 (Minecraft Seven)
### Heading Level 3 (Minecraft Seven)
#### Heading Level 4 (Minecraft Five Bold)

> 💡 **Note**: Markdown headings in VitePress documents are automatically styled with the proper font family.
