<template>
  <div class="oreui-tabs-container">
    <div class="oreui-tabs-nav" role="tablist">
      <button
        v-for="tab in normalizedTabs"
        :key="tab.value"
        type="button"
        role="tab"
        :aria-selected="currentTab === tab.value"
        class="oreui-tab-item"
        :class="{
          'is-active': currentTab === tab.value,
          'is-disabled': tab.disabled
        }"
        :disabled="tab.disabled"
        @click="selectTab(tab.value)"
      >
        <img
          v-if="tab.icon"
          :src="resolveIcon(tab.icon)"
          class="oreui-tab-icon"
          alt=""
        />
        <span>{{ tab.label }}</span>
        <span v-if="tab.badge" class="oreui-tab-badge">{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Active Tab Content Area (if slots provided) -->
    <div v-if="$slots.default" class="oreui-tab-panel">
      <slot :active-tab="currentTab" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import { playSound } from '../composables/useSound'

interface TabOption {
  label: string
  value: string | number
  icon?: string
  badge?: string | number
  disabled?: boolean
}

interface Props {
  modelValue?: string | number
  tabs?: (string | TabOption)[]
  sound?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  tabs: () => [],
  sound: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number): void
  (e: 'change', val: string | number): void
}>()

const normalizedTabs = computed<TabOption[]>(() => {
  return props.tabs.map((t) => {
    if (typeof t === 'string') {
      return { label: t, value: t }
    }
    return t
  })
})

const currentTab = ref<string | number>(
  props.modelValue || normalizedTabs.value[0]?.value || ''
)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && val !== currentTab.value) {
      currentTab.value = val
    }
  }
)

function resolveIcon(icon: string) {
  if (!icon) return ''
  if (icon.startsWith('http://') || icon.startsWith('https://')) {
    return icon
  }
  const rawPath = icon.startsWith('/') ? icon : `/${icon}.png`
  return withBase(rawPath)
}

function selectTab(val: string | number) {
  if (currentTab.value === val) return
  currentTab.value = val
  if (props.sound) {
    playSound('drawer_open')
  }
  emit('update:modelValue', val)
  emit('change', val)
}
</script>

<style scoped>
.oreui-tabs-container {
  width: 100%;
  margin: 12px 0;
  font-family: var(--font-noto-bold);
  user-select: none;
}

.oreui-tabs-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  background-color: #1E1E1F;
  border: 2px solid #313233;
  padding: 6px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
}

.oreui-tab-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #58585A;
  border: 2px solid #1E1E1F;
  box-shadow:
    inset 0 -3px #3A3A3C,
    inset 2px 2px rgba(255, 255, 255, 0.3),
    inset -2px -4px rgba(255, 255, 255, 0.15);
  color: #D0D1D4;
  font-family: var(--font-noto-bold);
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: all 0.1s ease;
}

.oreui-tab-item:hover:not(.is-disabled):not(.is-active) {
  background-color: #707174;
  color: #FFFFFF;
  box-shadow:
    inset 0 -3px #4A4A4C,
    inset 2px 2px rgba(255, 255, 255, 0.5),
    inset -2px -4px rgba(255, 255, 255, 0.25);
}

.oreui-tab-item.is-active {
  background-color: #3C8527;
  border-color: #1E1E1F;
  color: #FFFFFF;
  box-shadow:
    inset 0 -3px #1F5213,
    inset 2px 2px rgba(255, 255, 255, 0.4),
    inset -2px -4px rgba(255, 255, 255, 0.2);
}

.oreui-tab-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.oreui-tab-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  pointer-events: none;
}

.oreui-tab-badge {
  background-color: #1E1E1F;
  color: #FFE866;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 2px;
}

.oreui-tab-panel {
  border: 2px solid #1E1E1F;
  border-top: none;
  background-color: #242526;
  padding: 16px;
  box-shadow: inset 0 2px rgba(0, 0, 0, 0.3);
}
</style>
