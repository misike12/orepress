# Form Controls

Includes Checkbox, Dual-state Sliding Switch, Continuous/Segmented Slider, Dropdown Select, and Text Inputs.

---

## 🔘 Checkbox

<OreDisplay title="Checkbox Controls">
  <div style="display: flex; flex-direction: column; gap: 8px;">
    <OreCheckbox :model-value="true" label="Checked Option" />
    <OreCheckbox :model-value="false" label="Unchecked Option" />
    <OreCheckbox :model-value="true" disabled label="Disabled Checked" />
    <OreCheckbox :model-value="false" disabled label="Disabled Unchecked" />
  </div>
</OreDisplay>

```vue
<template>
  <OreCheckbox v-model="isChecked" label="Enable Multi-Sample Anti-Aliasing (MSAA)" />
</template>
```

---

## 🎚️ Switch Toggle

Features the classic Bedrock gradient track with jelly bounce feedback animation on state change:

<OreDisplay title="Switch Toggles">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <OreSwitch :model-value="true" label="High-Resolution Texture Pack" />
    <OreSwitch :model-value="false" label="Real-time Ray Tracing (RTX)" />
    <OreSwitch :model-value="true" disabled label="Server Administrator Lock" />
  </div>
</OreDisplay>

```vue
<template>
  <OreSwitch v-model="isShaderOn" label="Real-time Ray Tracing (RTX)" />
</template>
```

---

## 🎛️ Slider

Supports continuous smooth adjustment and discrete step segments:

<OreDisplay title="Slider Controls">
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%; max-width: 450px;">
    <OreSlider :model-value="80" label="Master Volume" unit="%" />
    <OreSlider :model-value="3" :min="1" :max="5" :step="1" label="Render Distance" unit=" Chunks" />
    <OreSlider :model-value="60" disabled label="Locked FOV" unit="°" />
  </div>
</OreDisplay>

```vue
<template>
  <!-- Continuous Slider -->
  <OreSlider v-model="volume" label="Master Volume" unit="%" />

  <!-- Discrete Segmented Slider -->
  <OreSlider v-model="renderChunks" :min="1" :max="5" :step="1" label="Render Distance" unit=" Chunks" />
</template>
```

---

## 📋 Dropdown Select

Features a 3D bevel trigger and dark options dropdown with checkmark indicators:

<OreDisplay title="Dropdown Select">
  <div style="width: 100%; max-width: 320px;">
    <OreDropdown
      model-value="survival"
      :options="[
        { label: 'Survival Mode', value: 'survival' },
        { label: 'Creative Mode', value: 'creative' },
        { label: 'Adventure Mode', value: 'adventure' },
        { label: 'Spectator Mode', value: 'spectator' }
      ]"
    />
  </div>
</OreDisplay>

```vue
<template>
  <OreDropdown
    v-model="gameMode"
    :options="[
      { label: 'Survival Mode', value: 'survival' },
      { label: 'Creative Mode', value: 'creative' },
      { label: 'Adventure Mode', value: 'adventure' }
    ]"
  />
</template>
```

---

## ⌨️ Input Fields

Features dark inset shading and bright `#6CC349` fluorescent green caret cursor:

<OreDisplay title="Text Input & Textarea">
  <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 400px;">
    <OreInput placeholder="Enter server IP or hostname..." />
    <OreInput type="password" placeholder="Enter server password..." />
    <OreInput textarea :rows="3" placeholder="Enter server MOTD broadcast..." />
  </div>
</OreDisplay>

```vue
<template>
  <OreInput v-model="serverAddress" placeholder="Enter server IP or hostname..." />
  <OreInput v-model="serverNotice" textarea :rows="3" placeholder="Enter server broadcast..." />
</template>
```
