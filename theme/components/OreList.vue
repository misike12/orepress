<template>
  <div class="oreui-list-item" :data-level="level">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  level?: 1 | 2 | 3 | 4 | '1' | '2' | '3' | '4'
}

withDefaults(defineProps<Props>(), {
  level: 1
})
</script>

<style scoped>
.oreui-list-item {
  display: block;
  margin: 6px 0;
  position: relative;
  font-family: var(--font-noto);
}

.oreui-list-item[data-level="1"] {
  padding-left: 20px;
}
.oreui-list-item[data-level="1"]::before {
  content: "";
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background-color: #FFFFFF;
}

.oreui-list-item[data-level="2"] {
  padding-left: 36px;
}
.oreui-list-item[data-level="2"]::before {
  content: "";
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 6px;
  height: 6px;
  background-color: #FFFFFF;
}

.oreui-list-item[data-level="3"] {
  padding-left: 52px;
}
.oreui-list-item[data-level="3"]::before {
  content: "";
  position: absolute;
  left: 36px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  background-color: transparent;
}

.oreui-list-item[data-level="4"] {
  padding-left: 68px;
}
.oreui-list-item[data-level="4"]::before {
  content: "";
  position: absolute;
  left: 52px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 6px;
  height: 6px;
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  background-color: transparent;
}
</style>
