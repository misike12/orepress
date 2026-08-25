# Color System (Tokens)

OreUI provides a curated, semantic color palette faithfully matching the Minecraft Bedrock design system.

---

## 🟢 Semantic Accent Colors

<div class="color-grid">
  <div class="color-chip" style="background-color: #3C8527; color: #fff;">
    <div class="chip-name">Primary / Green 50</div>
    <div class="chip-hex">#3C8527</div>
  </div>
  <div class="color-chip" style="background-color: #6CC349; color: #000;">
    <div class="chip-name">Primary Tint / Green 30</div>
    <div class="chip-hex">#6CC349</div>
  </div>
  <div class="color-chip" style="background-color: #CA3636; color: #fff;">
    <div class="chip-name">Destructive / Red 50</div>
    <div class="chip-hex">#CA3636</div>
  </div>
  <div class="color-chip" style="background-color: #2E6BE5; color: #fff;">
    <div class="chip-name">Informative / Blue 20</div>
    <div class="chip-hex">#2E6BE5</div>
  </div>
  <div class="color-chip" style="background-color: #FFE866; color: #000;">
    <div class="chip-name">Notice / Yellow 10</div>
    <div class="chip-hex">#FFE866</div>
  </div>
  <div class="color-chip" style="background-color: #7345E5; color: #fff;">
    <div class="chip-name">Realms / Purple 50</div>
    <div class="chip-hex">#7345E5</div>
  </div>
</div>

---

## ⚪ Neutral Grayscale Scale

<div class="color-grid">
  <div class="color-chip" style="background-color: #D0D1D4; color: #000;">
    <div class="chip-name">Gray 30 (Secondary Button)</div>
    <div class="chip-hex">#D0D1D4</div>
  </div>
  <div class="color-chip" style="background-color: #8D8D90; color: #000;">
    <div class="chip-name">Gray 50 (Slider Track)</div>
    <div class="chip-hex">#8D8D90</div>
  </div>
  <div class="color-chip" style="background-color: #58585A; color: #fff;">
    <div class="chip-name">Gray 60 (Shadow & Divider)</div>
    <div class="chip-hex">#58585A</div>
  </div>
  <div class="color-chip" style="background-color: #48494A; color: #fff;">
    <div class="chip-name">Gray 70 (Dialog Header)</div>
    <div class="chip-hex">#48494A</div>
  </div>
  <div class="color-chip" style="background-color: #313233; color: #fff;">
    <div class="chip-name">Gray 80 (Main Background)</div>
    <div class="chip-hex">#313233</div>
  </div>
  <div class="color-chip" style="background-color: #1E1E1F; color: #fff;">
    <div class="chip-name">Gray 100 (Border & Inset)</div>
    <div class="chip-hex">#1E1E1F</div>
  </div>
</div>

---

## 🏷️ Color Tags

<div style="display: flex; gap: 8px; flex-wrap: wrap; margin: 16px 0;">
  <OreTag color="green">Green Tag</OreTag>
  <OreTag color="blue">Blue Tag</OreTag>
  <OreTag color="yellow">Yellow Tag</OreTag>
  <OreTag color="red">Red Tag</OreTag>
  <OreTag color="black">Black Tag</OreTag>
</div>

<style scoped>
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin: 16px 0 28px 0;
}

.color-chip {
  padding: 16px 12px;
  border: 2px solid #1E1E1F;
  box-shadow: inset 0 -3px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 80px;
  box-sizing: border-box;
}

.chip-name {
  font-family: var(--font-noto-bold);
  font-size: 13px;
}

.chip-hex {
  font-family: var(--font-mono);
  font-size: 12px;
  opacity: 0.9;
}
</style>
