<template>
  <div class="oreui-btn-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.oreui-btn-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
}
</style>
