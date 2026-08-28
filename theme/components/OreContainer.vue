<template>
  <section class="oreui-container" :class="`variant-${variant}`">
    <slot />
  </section>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'dark' | 'light'
}

withDefaults(defineProps<Props>(), {
  variant: 'dark'
})
</script>

<style scoped>
.oreui-container {
  display: grid;
  box-sizing: border-box;
  width: 100%;
  padding: 16px 22px;
  gap: 16px;
  color: #FFFFFF;
  font-family: var(--font-noto);
}

.oreui-container.variant-dark {
  border-bottom: 2px solid #313233;
  background-color: #242425;
}

.oreui-container.variant-light {
  border-top: 2px solid #58585A;
  border-bottom: 2px solid #1E1E1F;
  background-color: #48494A;
}
</style>