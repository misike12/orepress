<template>
  <div
    class="oreui-card"
    :class="[
      `variant-${variant}`,
      { 'is-hoverable': hoverable }
    ]"
  >
    <!-- Card Header -->
    <div v-if="title || $slots.header || $slots.extra" class="oreui-card-header">
      <div class="oreui-card-header-left">
        <img
          v-if="icon && icon !== 'None'"
          :src="computedIcon"
          class="oreui-card-icon"
          alt=""
        />
        <slot name="header">
          <div class="oreui-card-title-group">
            <span class="oreui-card-title">{{ title }}</span>
            <span v-if="subtitle" class="oreui-card-subtitle">{{ subtitle }}</span>
          </div>
        </slot>
      </div>

      <div v-if="$slots.extra" class="oreui-card-header-extra">
        <slot name="extra" />
      </div>
    </div>

    <!-- Card Body -->
    <div class="oreui-card-body">
      <slot />
    </div>

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="oreui-card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

interface Props {
  title?: string
  subtitle?: string
  icon?: string
  variant?: 'normal' | 'dark' | 'sunken' | 'green'
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  subtitle: '',
  icon: '',
  variant: 'normal',
  hoverable: false
})

const computedIcon = computed(() => {
  if (!props.icon || props.icon === 'None') return ''
  if (props.icon.startsWith('http://') || props.icon.startsWith('https://')) {
    return props.icon
  }
  const rawPath = props.icon.startsWith('/') ? props.icon : `/${props.icon}.png`
  return withBase(rawPath)
})
</script>

<style scoped>
.oreui-card {
  background-color: #313233;
  border: 2px solid #1E1E1F;
  box-shadow:
    inset 0 2px rgba(255, 255, 255, 0.1),
    0 4px 10px rgba(0, 0, 0, 0.4);
  margin: 14px 0;
  font-family: var(--font-noto);
  overflow: hidden;
  transition: all 0.15s ease;
}

.oreui-card.is-hoverable:hover {
  border-color: #8C8D90;
  transform: translateY(-2px);
  box-shadow:
    inset 0 2px rgba(255, 255, 255, 0.2),
    0 6px 16px rgba(0, 0, 0, 0.6);
}

.oreui-card.variant-dark {
  background-color: #1E1E1F;
  border-color: #313233;
}

.oreui-card.variant-sunken {
  background-color: #242526;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.5);
}

.oreui-card.variant-green {
  border-color: #3C8527;
  background-color: #1A2E16;
}

.oreui-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background-color: #48494A;
  border-bottom: 2px solid #1E1E1F;
  box-shadow: inset 0 2px rgba(255, 255, 255, 0.15);
}

.oreui-card-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.oreui-card-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.oreui-card-title-group {
  display: flex;
  flex-direction: column;
}

.oreui-card-title {
  font-family: var(--font-mc-seven);
  font-size: 15px;
  color: #FFFFFF;
}

.oreui-card-subtitle {
  font-size: 12px;
  color: #B1B2B5;
}

.oreui-card-header-extra {
  display: flex;
  align-items: center;
  gap: 8px;
}

.oreui-card-body {
  padding: 16px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.oreui-card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px 14px;
  background-color: #28292A;
  border-top: 2px solid #1E1E1F;
}
</style>
