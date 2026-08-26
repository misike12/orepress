<template>
  <div class="oreui-accordion" :class="{ 'is-open': isOpen, 'is-disabled': disabled }">
    <div
      class="oreui-accordion-header"
      @click="toggle"
    >
      <div class="oreui-accordion-title-box">
        <img
          v-if="icon"
          :src="icon.startsWith('/') || icon.startsWith('http') ? icon : `/${icon}.png`"
          class="oreui-accordion-icon"
          alt=""
        />
        <span class="oreui-accordion-title">
          <slot name="title">{{ title }}</slot>
        </span>
        <span v-if="badge" class="oreui-accordion-badge">{{ badge }}</span>
      </div>

      <img
        src="/arrowDown.png"
        class="oreui-accordion-arrow"
        :class="{ 'is-rotated': isOpen }"
        alt="▼"
      />
    </div>

    <div v-show="isOpen" class="oreui-accordion-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { playSound } from '../composables/useSound'

interface Props {
  modelValue?: boolean
  title?: string
  icon?: string
  badge?: string | number
  disabled?: boolean
  sound?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  title: '',
  icon: '',
  badge: '',
  disabled: false,
  sound: true,
  defaultOpen: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'change', val: boolean): void
}>()

const isOpen = ref(props.modelValue !== undefined ? props.modelValue : props.defaultOpen)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && val !== isOpen.value) {
      isOpen.value = val
    }
  }
)

function toggle() {
  if (props.disabled) return
  const next = !isOpen.value
  isOpen.value = next

  if (props.sound) {
    playSound(next ? 'drawer_open' : 'drawer_close')
  }

  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<style scoped>
.oreui-accordion {
  border: 2px solid #1E1E1F;
  margin: 10px 0;
  font-family: var(--font-noto-bold);
  user-select: none;
  background-color: #313233;
}

.oreui-accordion.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.oreui-accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background-color: #58585A;
  border-bottom: 2px solid #1E1E1F;
  box-shadow:
    inset 0 -3px #3A3A3C,
    inset 2px 2px rgba(255, 255, 255, 0.4),
    inset -2px -4px rgba(255, 255, 255, 0.2);
  cursor: pointer;
  color: #FFFFFF;
  transition: background-color 0.1s ease;
}

.oreui-accordion-header:hover {
  background-color: #6C6D70;
}

.oreui-accordion-title-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.oreui-accordion-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.oreui-accordion-title {
  font-size: 15px;
}

.oreui-accordion-badge {
  background-color: #1E1E1F;
  color: #FFE866;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 2px;
}

.oreui-accordion-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.oreui-accordion-arrow.is-rotated {
  transform: rotate(180deg);
}

.oreui-accordion-content {
  padding: 16px;
  background-color: #242526;
  color: var(--vp-c-text-1);
  font-family: var(--font-noto);
  line-height: 1.6;
}
</style>
