<template>
  <span class="oreui-badge" :class="`badge-${type}`">
    <span v-if="dot" class="sb-status-dot" :class="type"></span>
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  type?: 'release' | 'dev' | 'internal' | 'legacy'
  text?: string
  dot?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'release',
  text: '',
  dot: true
})
</script>

<style scoped>
.oreui-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-noto-bold);
  border: 1px solid transparent;
}
</style>
