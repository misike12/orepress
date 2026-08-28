<template>
  <OreButton
    class="oreui-icon-button"
    :variant="variant"
    size="icon"
    :icon="icon"
    :tip="tip"
    :disabled="disabled"
    :loading="loading"
    :sound="sound"
    :href="href"
    :target="target"
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
  icon?: string
  tip?: string
  disabled?: boolean
  loading?: boolean
  href?: string
  target?: string
  sound?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'normal',
  icon: '',
  tip: '',
  disabled: false,
  loading: false,
  href: '',
  target: '',
  sound: true
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