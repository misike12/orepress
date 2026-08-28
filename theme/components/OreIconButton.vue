<template>
  <OreButton
    class="oreui-icon-button"
    :variant="variant"
    :size="size"
    :icon="icon"
    :tip="tip"
    :disabled="disabled"
    :loading="loading"
    :sound="sound"
    :href="href"
    :target="target"
    :enchanted="enchanted"
    :icon-position="iconPosition"
    @click="emit('click', $event)"
  >
    <slot></slot>
  </OreButton>
</template>

<script setup lang="ts">
import OreButton from './OreButton.vue'

interface Props {
  variant?:
    | 'normal'
    | 'green'
    | 'red'
    | 'purple'
    | 'creative'
    | 'blue'
    | 'info'
    | 'gold'
    | 'yellow'
    | 'dark'
    | 'ghost'
    | 'disabled'
  size?: 'icon' | 'icon-sm'
  icon?: string
  tip?: string
  disabled?: boolean
  loading?: boolean
  href?: string
  target?: string
  sound?: boolean
  enchanted?: boolean
  iconPosition?: 'left' | 'right'
}

withDefaults(defineProps<Props>(), {
  variant: 'normal',
  size: 'icon',
  icon: '',
  tip: '',
  disabled: false,
  loading: false,
  href: '',
  target: '',
  sound: true,
  enchanted: false,
  iconPosition: 'left'
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<style scoped>
.oreui-icon-button :deep(.oreui-btn-icon.left),
.oreui-icon-button :deep(.oreui-btn-icon.right) {
  margin: 0;
}

.oreui-icon-button :deep(.oreui-btn-text:empty) {
  display: none;
}
</style>