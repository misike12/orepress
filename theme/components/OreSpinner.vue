<template>
  <span
    class="oreui-spinner"
    :style="{ width: sizeStyle, height: sizeStyle }"
    role="status"
    aria-label="Loading"
  >
    <svg viewBox="0 0 278 8" aria-hidden="true" :style="{ color: props.color || undefined }">
      <path fill="currentColor" fill-rule="evenodd" :d="SPINNER_PATH" />
    </svg>
  </span>
</template>

<script setup lang="ts">
interface Props {
  size?: number | string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: ''
})

const sizeStyle = computed(() =>
  typeof props.size === 'number' ? `${props.size}px` : props.size
)

import { computed } from 'vue'

const SPINNER_PATH =
  "M5.5.5v1H3.503v-1zm1.003 2v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zM5.5 6.5v1H3.503v-1zM23.5.5v1h-1v-1zm1.003 2v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zm-1.003 1v1h-3v-1zM42.503 2.5v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zm-4.003 0v1h-1v-1zm0 1v1h3v-1zM61.503 2.5v3h-1v-3zm-6.006 2v1h-1v-1zm1.003 2v-1h-1v1zm0 0h3v1h-3zm4.003 0v-1h-1v1zM79.503 3.5v2h-1v-2zm-6.006 0v2h-1v-2zm1.003 3v-1h-1v1zm0 0h3v1h-3zm4.003 0v-1h-1v1zM91.497 2.5v3h-1v-3zm6.006 2v1h-1v-1zm-5.003 2v-1h-1v1zm0 0h3v1h-3zm4.003 0v-1h-1v1zM110.497 2.5v-1h-1v1h-1v3h1v-3zm.003 3v1h-1v-1zm0 1v1h3v-1zm4.003 0v-1h-1v1zM129.5.5v1h-1v-1zm-1.003 2v-1h-1v1h-1v3h1v-3zm.003 4v-1h-1v1zm0 0h3v1h-3zM148.5.5v1h-2v-1zm-2.003 2v-1h-1v1h-1v3h1v-3zm.003 4v-1h-1v1zm0 0h2v1h-2zM167.5.5v1h-3v-1zm-3.003 2v-1h-1v1h-1v3h1v-3zm.003 4v-1h-1v1zm0 0h1v1h-1zM185.5.5v1h-3v-1zm-3.003 2v-1h-1v1h-1v3h1v-3zm4.006 0v-1h-1v1zm-4.003 3v1h-1v-1zM203.5.5v1h-3v-1zm-3.003 2v-1h-1v1h-1v3h1v-3zm4.006 0v-1h-1v1zm0 0h1v1h-1zM221.5.5v1h-3v-1zm-3.003 2v-1h-1v1h-1v2h1v-2zm4.006 0v-1h-1v1zm0 0h1v2h-1zM239.5.5v1h-3v-1zm-3.003 2v-1h-1v1h-1v1h1v-1zm4.006 0v-1h-1v1zm0 0h1v3h-1zM257.5.5v1h-3v-1zm-3.003 2v-1h-1v1zm4.006 0v-1h-1v1zm0 0v3h1v-3zm0 3v1h-1v-1zM275.5.5v1h-3v-1zm1.003 2v-1h-1v1zm0 3v-3h1v3zm0 0h-1v1h1zm-1.004 1v1h-1v-1z"
</script>

<style scoped>
.oreui-spinner {
  display: inline-block;
  overflow: hidden;
  box-sizing: border-box;
  line-height: 1;
  vertical-align: -0.125em;
}

.oreui-spinner svg {
  display: block;
  width: 3475%;
  max-width: none;
  height: 100%;
  animation: oreui-spinner-sweep 800ms steps(15, jump-end) infinite;
}

@keyframes oreui-spinner-sweep {
  to {
    transform: translateX(-97.122302%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .oreui-spinner svg {
    animation: none;
  }
}
</style>