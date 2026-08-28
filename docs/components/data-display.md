# Data Display

Sortable data tables, pixel progress rings, and Minecraft-style loading spinners.

---

## 📊 Sortable Data Table

Bedrock settings-style tables with fixed column widths, sortable headers (two-state arrow indicators), and plain or striped row variants:

<script setup lang="ts">
import { computed, ref } from 'vue'

const players = ref([
  { name: 'Steve', role: 'Builder', level: 42 },
  { name: 'Alex', role: 'Explorer', level: 68 },
  { name: 'Herobrine', role: 'Miner', level: 99 },
  { name: 'Piglin', role: 'Trader', level: 13 }
])

const sortKey = ref('')
const sortDirection = ref('none')

const sortedPlayers = computed(() => {
  if (!sortKey.value || sortDirection.value === 'none') return players.value
  const factor = sortDirection.value === 'ascending' ? 1 : -1
  return [...players.value].sort((a, b) => {
    const av = (a as Record<string, string | number>)[sortKey.value]
    const bv = (b as Record<string, string | number>)[sortKey.value]
    if (typeof av === 'number' && typeof bv === 'number') {
      return (av - bv) * factor
    }
    return String(av).localeCompare(String(bv)) * factor
  })
})

function onSort(detail: { column: string; direction: string }) {
  sortKey.value = detail.direction === 'none' ? '' : detail.column
  sortDirection.value = detail.direction
}
</script>

<OreDisplay title="Sortable Player Table">
  <div style="width: 100%;">
    <OreTable
      :columns="[
        { label: 'Player', key: 'name', width: '40%' },
        { label: 'Role', key: 'role', width: '30%', sortable: false },
        { label: 'Level', key: 'level', width: '30%' }
      ]"
      :rows="sortedPlayers.map((player) => [player.name, player.role, player.level])"
      row-header-column="0"
      variant="striped"
      @sort="onSort"
    />
  </div>
</OreDisplay>

```vue
<script setup>
const sortKey = ref('')
const sortDirection = ref('none')

function onSort({ column, direction }) {
  sortKey.value = direction === 'none' ? '' : column
  sortDirection.value = direction
}
</script>

<template>
  <OreTable
    :columns="[
      { label: 'Player', key: 'name', width: '40%' },
      { label: 'Role', key: 'role', width: '30%', sortable: false },
      { label: 'Level', key: 'level', width: '30%' }
    ]"
    :rows="sortedPlayers"
    variant="striped"
    row-header-column="0"
    @sort="onSort"
  />
</template>
```

---

## ⬜ OreUI Tables (Plain Variant)

<OreDisplay title="Plain World Data Tables">
  <div style="display: flex; flex-direction: column; gap: 16px; width: 100%;">
    <OreTable
      :columns="[
        { label: 'Difficulty', key: 'difficulty', sortable: false, width: '40%' },
        { label: 'Setting', key: 'setting', sortable: false }
      ]"
      :rows="[
        ['Peaceful', 'Hostile mobs do not spawn'],
        ['Easy', 'Mobs spawn with reduced aggression'],
        ['Normal', 'Standard survival balance'],
        ['Hard', 'Mobs deal increased damage']
      ]"
      row-header-column="0"
    />
  </div>
</OreDisplay>

```vue
<template>
  <OreTable
    :columns="[
      { label: 'Difficulty', key: 'difficulty', sortable: false, width: '40%' },
      { label: 'Setting', key: 'setting', sortable: false }
    ]"
    :rows="[
      ['Peaceful', 'Hostile mobs do not spawn'],
      ['Hard', 'Mobs deal increased damage']
    ]"
    row-header-column="0"
  />
</template>
```

---

## 💍 Pixel Progress Ring

Circular progress ring built from individual pixel cells, with a dim track and a compact center label slot:

<OreDisplay title="Progress Rings">
  <div style="display: flex; gap: 28px; align-items: center; flex-wrap: wrap;">
    <span style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <OreProgressRing :value="25" :size="44" />
      <span style="font-size: 12px; color: #D0D1D4;">25%</span>
    </span>
    <span style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <OreProgressRing :value="55" :size="44"><span>55</span></OreProgressRing>
      <span style="font-size: 12px; color: #D0D1D4;">Level 55</span>
    </span>
    <span style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <OreProgressRing :value="80" :size="44" color="#55FF55" />
      <span style="font-size: 12px; color: #D0D1D4;">80%</span>
    </span>
    <span style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <OreProgressRing :value="100" :size="44" />
      <span style="font-size: 12px; color: #D0D1D4;">Complete</span>
    </span>
  </div>
</OreDisplay>

```vue
<template>
  <OreProgressRing :value="25" :size="44" />
  <OreProgressRing :value="55" :size="44" color="#55FF55">
    <span>55</span>
  </OreProgressRing>
  <OreProgressRing :value="100" :size="44" />
</template>
```

---

## 🔄 Minecraft Spinner

A pixelated comet ring that spins in discrete animation steps, matching the Bedrock loading indicator:

<OreDisplay title="Spinners">
  <div style="display: flex; gap: 28px; align-items: center;">
    <OreSpinner :size="24" />
    <OreSpinner :size="32" />
    <OreSpinner :size="40" color="#55FF55" />
    <OreSpinner :size="40" color="#F46D6D" />
    <OreButton variant="green" text="Loading..." loading />
  </div>
</OreDisplay>

```vue
<template>
  <!-- Default size & color -->
  <OreSpinner :size="32" />

  <!-- Tinted pixels -->
  <OreSpinner :size="40" color="#55FF55" />

  <!-- Inside buttons via the loading prop -->
  <OreButton variant="green" text="Loading..." loading />
</template>
```