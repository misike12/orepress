<template>
  <component
    :is="computedHref ? 'a' : 'div'"
    :href="computedHref || undefined"
    :target="target"
    class="oreui-show-block"
    tabindex="0"
    @click="handleClick"
    @keydown="handleKeydown"
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
import { withBase } from 'vitepress'
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

const computedHref = computed(() => {
  if (!props.href) return ''
  if (
    props.href.startsWith('http://') ||
    props.href.startsWith('https://') ||
    props.href.startsWith('//') ||
    props.href.startsWith('#') ||
    props.href.startsWith('tel:')
  ) {
    return props.href
  }
  return withBase(props.href)
})

const iconSrc = computed(() => {
  if (!props.icon) return ''
  if (props.icon.startsWith('http://') || props.icon.startsWith('https://')) {
    return props.icon
  }
  const rawPath = props.icon.startsWith('/') ? props.icon : `/${props.icon}.png`
  return withBase(rawPath)
})

function handleClick(e: MouseEvent) {
  if (props.sound) {
    playSound('click')
  }
  emit('click', e)
}

function handleKeydown(e: KeyboardEvent) {
  if (props.href && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault()
    handleClick(e as unknown as MouseEvent)
  }
}
</script>

<style scoped>
.oreui-show-block-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}
</style>
