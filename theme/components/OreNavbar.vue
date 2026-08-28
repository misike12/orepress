<template>
  <header class="oreui-navbar">
    <div class="oreui-navbar-start">
      <slot name="start" />
    </div>

    <div v-if="title || $slots.title || $slots.default" class="oreui-navbar-title">
      <slot name="title">
        <slot>{{ title }}</slot>
      </slot>
    </div>

    <div class="oreui-navbar-actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: ''
})
</script>

<style scoped>
.oreui-navbar {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-height: 44px;
  padding: 0 6px 4px;
  gap: 8px;
  color: #FFFFFF;
  background: linear-gradient(
    to bottom,
    #48494A 0 calc(100% - 4px),
    #313233 calc(100% - 4px) 100%
  );
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.45);
  font-family: var(--font-noto-bold);
  user-select: none;
}

.oreui-navbar-start {
  display: flex;
  grid-column: 1;
  align-items: center;
  justify-self: start;
  min-width: 0;
}

.oreui-navbar-title {
  grid-column: 2;
  min-width: 0;
  overflow: hidden;
  color: #FFFFFF;
  font-family: var(--font-mc-seven);
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  text-overflow: ellipsis;
  text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
  transform: translateY(1px);
  white-space: nowrap;
}

.oreui-navbar-actions {
  display: flex;
  grid-column: 3;
  align-items: center;
  justify-self: end;
  gap: 4px;
  min-width: 0;
}

.oreui-navbar-actions :deep(.oreui-btn) {
  margin: 0;
}

.oreui-navbar-start :deep(.oreui-btn) {
  margin: 0;
}

.oreui-navbar-start :deep(.oreui-btn),
.oreui-navbar-actions :deep(.oreui-btn) {
  width: 36px;
  height: 36px;
}
</style>