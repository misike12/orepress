<template>
  <component
    :is="href ? 'a' : 'div'"
    :href="href"
    :target="target"
    class="oreui-show-block"
    @click="handleClick"
  >
    <div class="oreui-show-block-title">
      <img v-if="icon" :src="iconSrc" class="oreui-show-block-icon" alt="" />
      <span>{{ title }}</span>
    </div>
    <div v-if="description || $slots.default" class="oreui-show-block-desc">
      <slot>{{ description }}</slot>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { playSound } from '../composables/useSound'

interface Props {
  title?: string
  description?: string
  href?: string
  target?: string
  icon?: string
  sound?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  href: '',
  target: '',
  icon: '',
  sound: true
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const iconSrc = computed(() => {
  if (!props.icon) return ''
  return props.icon.startsWith('/') || props.icon.startsWith('http')
    ? props.icon
    : `/${props.icon}.png`
})

function handleClick(e: MouseEvent) {
  if (props.sound) {
    playSound('click')
  }
  emit('click', e)
}
</script>

<style scoped>
.oreui-show-block-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
</style>
