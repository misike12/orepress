<template>
  <span class="oreui-tag" :class="`tag-${color}`">
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup lang="ts">
interface Props {
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'black'
  text?: string
}

withDefaults(defineProps<Props>(), {
  color: 'green',
  text: ''
})
</script>

<style scoped>
.oreui-tag {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-noto-bold);
  font-size: 12px;
  padding: 2px 6px;
  margin: 0 4px;
  font-weight: 700;
  color: #000000;
  line-height: 1.2;
}

.oreui-tag.tag-green { background-color: #6CC349; }
.oreui-tag.tag-blue { background-color: #8CB3FF; }
.oreui-tag.tag-yellow { background-color: #FFE866; }
.oreui-tag.tag-red { background-color: #F46D6D; }
.oreui-tag.tag-black { background-color: #1E1E1F; color: #FFFFFF; }
</style>
