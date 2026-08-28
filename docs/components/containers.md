# Containers & Interactive Panels

OreUI provides a comprehensive set of containers, navigation tabs, collapsible drawers, progress bars, tooltips, and cards inspired by Minecraft Bedrock Edition.

---

## 🗂️ Bedrock Category Tabs

Features 3D raised tabs, active state indicators, icon support, and authentic drawer click sound effects:

<OreDisplay title="Category Tabs">
  <div style="width: 100%;">
    <OreTabs
      model-value="video"
      :tabs="[
        { label: 'Video Settings', value: 'video', icon: 'fullScreen' },
        { label: 'Audio Engine', value: 'audio', icon: 'Messages' },
        { label: 'Controls', value: 'controls', icon: 'None' },
        { label: 'Marketplace', value: 'market', badge: 'NEW' }
      ]"
    />
  </div>
</OreDisplay>

```vue
<template>
  <OreTabs
    v-model="activeCategory"
    :tabs="[
      { label: 'Video Settings', value: 'video', icon: 'fullScreen' },
      { label: 'Audio Engine', value: 'audio' },
      { label: 'Marketplace', value: 'market', badge: 'NEW' }
    ]"
  />
</template>
```

---

## 📂 Collapsible Accordion Drawers

Collapsible settings drawers with rotating chevron indicators and drawer open/close sound feedback:

<OreDisplay title="Expandable Drawers">
  <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 520px;">
    <OreAccordion title="Ray Tracing & Graphics Pipeline" badge="Experimental" default-open>
      <p style="margin: 0;">Configure DirectX Raytracing (DXR) shaders, atmospheric bloom, and volumetric lighting.</p>
    </OreAccordion>
    <OreAccordion title="Multiplayer World Permissions">
      <p style="margin: 0;">Manage Operator privileges, teleport commands, and whitelist restrictions.</p>
    </OreAccordion>
  </div>
</OreDisplay>

```vue
<template>
  <OreAccordion title="Ray Tracing & Graphics Pipeline" badge="Experimental" default-open>
    <p>Configure DirectX Raytracing shaders and volumetric lighting.</p>
  </OreAccordion>
</template>
```

---

## 📊 Minecraft XP Bar & Progress Indicators

Includes the authentic pulsing neon green Minecraft XP Bar (with XP level display) and segmented Bedrock linear progress bars:

<OreDisplay title="Progress Indicators">
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 480px;">
    <OreProgress variant="xp" :value="68" :xp-level="42" :height="12" />
    <OreProgress variant="red" label="Ender Dragon Health" :value="80" :segments="10" show-value :height="14" />
    <OreProgress variant="blue" label="Downloading Resource Pack..." :value="45" show-value striped />
  </div>
</OreDisplay>

```vue
<template>
  <!-- Authentic Minecraft XP Bar with Level Badge -->
  <OreProgress variant="xp" :value="68" :xp-level="42" :height="12" />

  <!-- Segmented Boss Health Bar -->
  <OreProgress variant="red" label="Ender Dragon Health" :value="80" :segments="10" show-value />

  <!-- Linear Progress Bar -->
  <OreProgress variant="blue" label="Downloading Resource Pack..." :value="45" show-value striped />
</template>
```

---

## 💬 Minecraft Item Tooltips

Replicates the authentic Minecraft double-bordered violet gradient item tooltip box:

<OreDisplay title="Minecraft Tooltips">
  <div style="display: flex; gap: 16px; flex-wrap: wrap;">
    <OreTooltip title="Netherite Sword" content="Sharpness V, Unbreaking III, Mending">
      <OreButton variant="purple" enchanted text="Hover for Item Tooltip" />
    </OreTooltip>
    <OreTooltip title="Server Status" content="Online: 1,420 / 2,000 Players">
      <OreButton variant="green" text="Hover for Server Info" />
    </OreTooltip>
  </div>
</OreDisplay>

```vue
<template>
  <OreTooltip title="Netherite Sword" content="Sharpness V, Unbreaking III, Mending">
    <OreButton variant="purple" enchanted text="Hover for Item Tooltip" />
  </OreTooltip>
</template>
```

---

## 🪟 OreUI Cards & Window Panels

Container card with header title bar, icon, action slot, and 3D bevel frames:

<OreDisplay title="OreUI Container Cards">
  <div style="width: 100%; max-width: 480px;">
    <OreCard title="World Settings" subtitle="Survival World • Hard Difficulty" icon="None" hoverable>
      <p style="margin: 0 0 12px 0;">Seed: <strong>-48910284019284</strong></p>
      <div style="display: flex; gap: 8px; margin-bottom: 14px;">
        <OreTag color="green">Cheats Enabled</OreTag>
        <OreTag color="blue">Texture V2</OreTag>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 8px;">
        <OreButton variant="normal" size="sm" text="Edit" />
        <OreButton variant="green" size="sm" text="Play World" />
      </div>
    </OreCard>
  </div>
</OreDisplay>

```vue
<template>
  <OreCard title="World Settings" subtitle="Survival World" icon="None" hoverable>
    <p>Seed: <strong>-48910284019284</strong></p>
    <div style="display: flex; justify-content: flex-end; gap: 8px;">
      <OreButton variant="green" size="sm" text="Play World" />
    </div>
  </OreCard>
</template>
```

---

## ⌨️ Keyboard Key Badges (Kbd)

Bedrock hotkey indicators for keyboard bindings and controller shortcuts:

<OreDisplay title="Keyboard Shortcuts">
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <div>Press <OreKbd>ESC</OreKbd> to open Game Menu</div>
    <div>Press <OreKbd>E</OreKbd> to open Inventory</div>
    <div>Press <OreKbd>F3</OreKbd> + <OreKbd>H</OreKbd> to toggle Advanced Tooltips</div>
    <div>Press <OreKbd>SPACE</OreKbd> to Jump / Ascend</div>
  </div>
</OreDisplay>

```vue
<template>
  <p>Press <OreKbd>ESC</OreKbd> to pause the game.</p>
  <p>Press <OreKbd>F3</OreKbd> + <OreKbd>H</OreKbd> for Advanced Tooltips.</p>
</template>
```

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

---

## 🗄️ OreContainer Panels

Grid panels that group settings content. The `dark` variant caps the panel with a bottom divider shade, while `light` raises it with a specular top highlight:

<OreDisplay title="Container Variants">
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 520px;">
    <OreContainer>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: var(--font-noto-bold);">World Seed</span>
        <span style="color: #D0D1D4;">-48910284019284</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-family: var(--font-noto-bold);">Gamemode</span>
        <span style="color: #D0D1D4;">Survival</span>
      </div>
    </OreContainer>
    <OreContainer variant="light">
      <span style="font-family: var(--font-noto-bold);">Light Weight Variant</span>
      <span style="color: #D0D1D4;">Use this for raised, focused content blocks.</span>
    </OreContainer>
  </div>
</OreDisplay>

```vue
<template>
  <!-- Dark panel (default) -->
  <OreContainer>
    <p>Dark, recessed content panel.</p>
  </OreContainer>

  <!-- Light raised panel -->
  <OreContainer variant="light">
    <p>Light, raised content panel.</p>
  </OreContainer>
</template>
```

---

## ➖ Divider

A two-pixel Minecraft rule separating stacked content — dark top pixel and light bottom pixel:

<OreDisplay title="Dividers">
  <div style="width: 100%; max-width: 520px;">
    <p style="margin: 0 0 4px 0;">Ray Tracing</p>
    <OreDivider />
    <p style="margin: 4px 0;">Render Distance</p>
    <OreDivider />
    <p style="margin: 4px 0 0 0;">Performance Mode</p>
  </div>
</OreDisplay>

```vue
<template>
  <p>Ray Tracing</p>
  <OreDivider />
  <p>Render Distance</p>
  <OreDivider />
  <p>Performance Mode</p>
</template>
```

---

## 🧭 OreNavbar Screen Title Bar

A Bedrock-style screen title bar with a left action slot, centered title, and a right action slot:

<OreDisplay title="Navbar">
  <div style="width: 100%; max-width: 640px;">
    <OreNavbar title="World Settings">
      <template #start>
        <OreIconButton icon="arrowLeft_white" tip="Back" variant="dark" />
      </template>
      <template #actions>
        <OreIconButton icon="question" tip="Help" variant="dark" />
        <OreIconButton icon="Menu" tip="Options" variant="dark" />
      </template>
    </OreNavbar>
  </div>
</OreDisplay>

```vue
<template>
  <OreNavbar title="World Settings">
    <template #start>
      <OreIconButton icon="arrowLeft_white" tip="Back" variant="dark" />
    </template>
    <template #actions>
      <OreIconButton icon="question" tip="Help" variant="dark" />
      <OreIconButton icon="Menu" tip="Options" variant="dark" />
    </template>
  </OreNavbar>
</template>
```

---

## 🎚️ OreScrollbar Scrollable Panel

A scroll container with Minecraft-styled draggable thumb tracks, arrow/Page/Home/End keyboard support and automatic track visibility:

<OreDisplay title="Scrollbar Panel">
  <div style="width: 100%; max-width: 520px;">
    <OreScrollbar height="180px">
      <OreContainer>
        <p style="margin: 0;" v-for="index in 8" :key="index">
          Server Rule {{ index }} — Do not grief, steal, or build within 100 blocks of spawn.
        </p>
      </OreContainer>
    </OreScrollbar>
  </div>
</OreDisplay>

```vue
<template>
  <OreScrollbar height="180px">
    <OreContainer>
      <p v-for="index in 8" :key="index">Server Rule {{ index }} ...</p>
    </OreContainer>
  </OreScrollbar>
</template>
```
