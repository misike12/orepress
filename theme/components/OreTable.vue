<template>
  <div class="oreui-table" :class="`variant-${variant}`">
    <table>
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="columnKey(column, index)"
            :aria-sort="ariaSort(column, index)"
            :class="{
              'is-sortable': isSortable(column),
              'oreui-table-row-header-column': index === rowHeaderColumn
            }"
            :style="{ width: column.width }"
          >
            <button
              v-if="isSortable(column)"
              type="button"
              class="oreui-table-sort"
              :value="columnKey(column, index)"
              @click="cycleSort(column, index)"
            >
              <slot name="th" :column="column" :column-index="index">
                <span class="oreui-table-sort-label">{{ column.label }}</span>
              </slot>
              <span class="oreui-table-sort-indicator" aria-hidden="true"></span>
            </button>
            <span v-else class="oreui-table-head-label">
              <slot name="th" :column="column" :column-index="index">{{ column.label }}</slot>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td
            v-for="(cell, columnIndex) in row"
            :key="columnIndex"
            :class="{
              'oreui-table-row-header-column': columnIndex === rowHeaderColumn
            }"
          >
            <slot
              name="cell"
              :row="row"
              :row-index="rowIndex"
              :column="columns[columnIndex]"
              :column-index="columnIndex"
              :value="cell"
            >
              {{ cell }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export type OreTableVariant = 'plain' | 'striped'
export type OreTableSortDirection = 'none' | 'ascending' | 'descending'

export interface OreTableColumn {
  label: string
  key?: string
  width?: string
  sortable?: boolean
}

export interface OreTableSortDetail {
  column: string
  direction: OreTableSortDirection
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  columns: OreTableColumn[]
  rows?: (string | number)[][]
  variant?: OreTableVariant
  rowHeaderColumn?: number
}

const props = withDefaults(defineProps<Props>(), {
  rows: () => [],
  variant: 'plain',
  rowHeaderColumn: -1
})

const emit = defineEmits<{
  (e: 'sort', detail: OreTableSortDetail): void
}>()

const activeSort = ref<{ key: string; direction: OreTableSortDirection } | null>(null)

function columnKey(column: OreTableColumn, index: number) {
  return column.key ?? String(index)
}

function isSortable(column: OreTableColumn) {
  return column.sortable !== false
}

function ariaSort(column: OreTableColumn, index: number) {
  const key = columnKey(column, index)
  if (activeSort.value?.key === key) {
    return activeSort.value.direction
  }
  return 'none'
}

function cycleSort(column: OreTableColumn, index: number) {
  const key = columnKey(column, index)
  const current =
    activeSort.value?.key === key ? activeSort.value.direction : 'none'

  const direction: OreTableSortDirection =
    current === 'none'
      ? 'ascending'
      : current === 'ascending'
        ? 'descending'
        : 'none'

  activeSort.value = direction === 'none' ? null : { key, direction }

  emit('sort', { column: key, direction })
}
</script>

<style scoped>
.oreui-table {
  box-sizing: border-box;
  max-width: 100%;
  overflow-x: auto;
  color: #FFFFFF;
  font-family: var(--font-noto);
}

.oreui-table > table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.oreui-table th,
.oreui-table td {
  box-sizing: border-box;
  height: 40px;
  padding: 0 8px;
  overflow: hidden;
  border: 2px solid #1E1E1F;
  background-color: #242425;
  font-size: 13px;
  font-weight: 400;
  line-height: 1;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.oreui-table thead th,
.oreui-table tbody th {
  background-color: #313233;
}

.oreui-table tbody th {
  font-weight: 700;
}

.oreui-table th.oreui-table-row-header-column,
.oreui-table td.oreui-table-row-header-column {
  width: 28%;
  text-align: left;
}

.oreui-table.variant-striped tbody tr:nth-child(even) td {
  background-color: #1E1E1F;
}

.oreui-table th.is-sortable {
  padding: 0;
}

.oreui-table-sort {
  position: relative;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  border: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  cursor: pointer;
  text-align: center;
}

.oreui-table-sort:focus-visible {
  outline: 2px solid #FFFFFF;
  outline-offset: -2px;
}

.oreui-table-sort-indicator {
  position: absolute;
  top: 50%;
  right: 8px;
  width: 9px;
  height: 13px;
  transform: translateY(-50%);
}

.oreui-table-sort-indicator::before,
.oreui-table-sort-indicator::after {
  position: absolute;
  left: 0;
  width: 0;
  height: 0;
  content: "";
}

.oreui-table-sort-indicator::before {
  top: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #58585A;
}

.oreui-table-sort-indicator::after {
  bottom: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #58585A;
}

.oreui-table th[aria-sort="ascending"] .oreui-table-sort-indicator::before {
  border-bottom-color: #FFFFFF;
}

.oreui-table th[aria-sort="descending"] .oreui-table-sort-indicator::after {
  border-top-color: #FFFFFF;
}

.oreui-table .oreui-table-head-label {
  display: block;
  width: 100%;
}

.oreui-table th[aria-sort] .oreui-table-sort-label {
  display: block;
  width: 100%;
}
</style>

<style>
.oreui-table::-webkit-scrollbar {
  width: 12px;
  height: 16px;
}

.oreui-table::-webkit-scrollbar-button {
  display: none;
  width: 0;
  height: 0;
}

.oreui-table::-webkit-scrollbar-track:vertical {
  background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25))
    center / 4px 100% no-repeat;
}

.oreui-table::-webkit-scrollbar-track:horizontal {
  background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25))
    center / 100% 4px no-repeat;
}

.oreui-table::-webkit-scrollbar-thumb {
  min-width: 24px;
  min-height: 24px;
  border-radius: 0;
  border: 2px solid #1E1E1F;
  background:
    linear-gradient(#D0D1D4, #D0D1D4)
      center 4px / calc(100% - 8px) calc(100% - 12px) no-repeat,
    linear-gradient(#8D8D90, #8D8D90)
      center bottom 2px / calc(100% - 4px) 4px no-repeat,
    linear-gradient(#FFFFFF, #FFFFFF)
      center 2px / calc(100% - 4px) calc(100% - 8px) no-repeat,
    #B1B2B5;
}

.oreui-table::-webkit-scrollbar-corner {
  background: transparent;
}
</style>