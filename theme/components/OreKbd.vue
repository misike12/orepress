<template>
  <kbd class="oreui-kbd">
    <slot>{{ keyName }}</slot>
  </kbd>
</template>

<script setup lang="ts">
interface Props {
  keyName?: string
}

withDefaults(defineProps<Props>(), {
  keyName: ''
})
</script>

<style scoped>
.oreui-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  background-color: #1E1E1F;
  border: 1px solid #58585A;
  border-bottom: 2px solid #3A3A3C;
  box-shadow: inset 0 1px rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  min-width: 18px;
  border-radius: 3px;
  margin: 0 2px;
  vertical-align: baseline;
}
</style>
