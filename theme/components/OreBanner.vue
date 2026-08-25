<template>
  <div class="oreui-banner" :class="`banner-${type}`">
    <div class="oreui-banner-content">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  type?: 'neutral' | 'info' | 'important'
  text?: string
}

withDefaults(defineProps<Props>(), {
  type: 'neutral',
  text: ''
})
</script>

<style scoped>
.oreui-banner {
  display: flex;
  align-items: center;
  margin: 14px 0;
  padding: 12px 18px;
  box-sizing: border-box;
  font-family: var(--font-noto-bold);
  font-size: 14px;
  line-height: 1.5;
  border-left: 6px solid #1E1E1F;
}

.oreui-banner.banner-neutral {
  background-color: rgba(30, 30, 31, 0.85);
  border-left-color: #8C8D90;
  color: #FFFFFF;
}

.oreui-banner.banner-info {
  background-color: rgba(46, 107, 229, 0.2);
  border-left-color: #2E6BE5;
  color: #FFFFFF;
}

.oreui-banner.banner-important {
  background-color: rgba(255, 232, 102, 0.2);
  border-left-color: #FFE866;
  color: #FFE866;
  font-weight: bold;
}

.oreui-banner-content {
  width: 100%;
}
</style>
