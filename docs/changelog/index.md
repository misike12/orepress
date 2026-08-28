# Changelog

<OreBanner type="info">
Version history and release notes for the OreUI VitePress Theme.
</OreBanner>

---

## <OreBadge type="release">Release</OreBadge> v1.1.1.A (2026-08-28)

### 🎨 Bedrock Navbar & Sidebar Redesign
- **Light Bedrock appbar navbar**: The navbar is now a light `#E6E8EB` bedrock appbar with bevel-divided menu buttons, Minecraft tuning and dark rounded dropdown panels on every page (previously only the home page looked right).
- **Icon contrast fixed**: Social, search, appearance and hamburger icons are now dark `#3C3C3C` so they read clearly on the light appbar.
- **Clean sidebar list panel**: Removed the default vertical divider lines, indicator bars and per-row bevels that caused "random lines"; group headings are gold Minecraft Seven and the active page is a solid green `#3C8527` pressed rectangle.
- **Minecraft theme switch**: The light/dark toggle is now a real Minecraft switch (green/gray track + beveled sliding knob) with the sun/moon icon centered on the knob.
- **Pixel-art mute button**: Replaced the `🔊`/`🔇` emojis with a crisp pixel-art speaker + red mute-cross icon.

### 🐛 Bug Fixes
- **`OreSlider` sound spam throttled**: Sound effects now play at most every 50ms while dragging, eliminating the machine-gun audio spam.

### 🧹 Maintenance
- Version bumped to `1.1.1.A` (letter subversion sequence).

---

## <OreBadge type="release">Release</OreBadge> v1.1.1 (2026-08-28)

### 🐛 Bug Fixes & Quality Improvements
- **`OreButton` `variant="disabled"` now actually disables**: Added proper disabled styling and click/sound guards; the button can no longer be activated.
- **`OreButton` countdown timer is now reactive**: Timer starts on mount, resets correctly when the `countdown` prop changes, and is cleaned up on prop change/unmount.
- **`OreRadioGroup` / `OreRadio` disabled state is reactive**: `disabled` is now injected as a `computed`, so child radios update instantly when the group's disabled state toggles.
- **`OreFeatures` internal links fixed**: Links now use `withBase()` so they resolve correctly when the site is deployed under a sub-path (`/orepress/`).
- **`OreModal` consistent close events**: Confirming now also emits the `close` event, matching the cancel/backdrop paths.
- **`OreInput` type consistency**: `update:modelValue` emit type aligned with the `string | number` modelValue prop.
- **`OreTabs` disabled guard**: Programmatic `selectTab` calls no longer bypass disabled tabs.
- **`OreSlider` dead logic removed**: Redundant internal condition cleaned up.
- **`OreTooltip` & animation cleanup**: Dead transform transition removed; duplicate `thinFlash`/`thickFlash` keyframes consolidated.
- **`usePop` timer cleanup**: Auto-removal timers are properly cancelled when toasts are dismissed manually.

### 🧹 Maintenance
- **`vue-tsc` type checking**: Added `typecheck` script (`vue-tsc --noEmit`) and updated CI to use it — proper type checking for all `.vue` files.
- **CI workflow cleanup**: Removed duplicate push + PR triggers, added npm dependency caching.
- **Removed dead assets**: Deleted 53 unused duplicate images and 8 unused sound files from the package; empty `utils/` directory removed.
- **Removed demo components from the public export API** (still globally registered for the docs).
- **Docs config**: Replaced CommonJS `__dirname` with ESM-safe `fileURLToPath`; removed unnecessary `await` in the docs theme.

---

## <OreBadge type="release">Release</OreBadge> v1.1.0 (2026-08-26)

### 🚀 New Components & Major Enhancements
- **Category Tabs (`OreTabs`)**: Bedrock style segmented category navigation with 3D bevels, active indicator, icons, and drawer click sound feedback.
- **Collapsible Drawers (`OreAccordion`)**: Expandable settings drawer panels with rotating indicator arrow and drawer sound effects.
- **Minecraft XP Bar & Progress Indicators (`OreProgress`)**: Authentic pulsing neon green Minecraft XP Bar (with level badges), segmented boss health bars, and striped progress bars.
- **Item Tooltip Box (`OreTooltip`)**: Authentic Minecraft double-bordered violet gradient item tooltip box with multi-position support.
- **Container Cards (`OreCard`)**: Minecraft window cards with titlebar, subtitle, icons, tag slots, and 3D bevel borders.
- **Keyboard Hotkey Badges (`OreKbd`)**: Bedrock style keyboard key indicators (`[ESC]`, `[E]`, `[F3]`).
- **Radio Buttons (`OreRadio` & `OreRadioGroup`)**: Authentic single selection group with square dot indicators and click audio.
- **Expanded Button Variants (`OreButton`)**:
  - Added `purple` (Creative/Marketplace), `blue` (Info), `gold` (Warning), `dark` (Dark Stone), `ghost` (Flat) variants.
  - Added `loading` state with animated Bedrock spinner.
  - Added `enchanted` Minecraft shimmer foil glint overlay.
  - Added `size="icon"` square button dimensions.
- **Form Controls & Slider Engine**: Complete pointer drag support, internal state fallback, step clamping, and reactive sound synchronization.
- **Minecraft Formatting Colors**: Added utility CSS classes for all 16 Minecraft color codes (`.mc-color-gold`, `.mc-color-aqua`, etc.).
- **Global Theme Registration**: All new components registered globally and exported from theme index.

---

## <OreBadge type="release">Release</OreBadge> v1.0.0 (2026-08-25)

### ✨ Features & Architecture
- **Full Theme Implementation**: Complete port of Spectrollay OreUI & Minecraft Bedrock design language to VitePress.
- **Authentic Minecraft Typography**: Embedded `Minecraft Ten`, `Minecraft Seven`, `Minecraft Five`, and `Noto Sans`.
- **Complete Interactive Component Library**:
  - `OreButton`: Multi-size, multi-color, self-healing countdown timer, and hover tooltip.
  - `OreCheckbox`: 3D tactile square checkbox.
  - `OreSwitch`: Dual-state sliding switch with spring-bounce feedback.
  - `OreSlider`: Continuous and stepped/segmented slider controls.
  - `OreDropdown`: 3D dropdown select menu with checkmark icons.
  - `OreInput`: Dark inset text inputs with fluorescent `#6CC349` green caret.
  - `OreBanner` & `OrePop`: Global announcement banners and bottom-up stacking toast alerts.
  - `OreModal`: Authentic Minecraft modal dialog with titlebar and backdrop blur.
  - `OreShowBlock`: Shimmering cards with double diagonal light sweep on hover.
  - `OreList`: 4-level Bedrock geometric list bullets.
- **Embedded Web Audio System**: Base64 in-memory audio decoding preventing browser download manager interceptions.
- **Navbar Sound Control**: One-click audio mute/unmute toggle in navigation toolbar.
