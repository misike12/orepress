<template>
  <div class="oreui-dropdown" :class="{ 'is-disabled': disabled }">
    <div
      class="oreui-dropdown-label"
      @click="toggleOpen"
    >
      <span>{{ selectedLabel }}</span>
      <img
        :src="withBase('/arrowDown.png')"
        class="oreui-dropdown-arrow"
        :class="{ 'is-open': isOpen }"
        alt="▼"
      />
    </div>

    <div v-if="isOpen" class="oreui-dropdown-menu">
      <div
        v-for="opt in normalizedOptions"
        :key="opt.value"
        class="oreui-dropdown-option"
        :class="{ 'is-selected': opt.value === innerValue }"
        @click="selectOption(opt.value)"
      >
        <span>{{ opt.label }}</span>
        <img
          v-if="opt.value === innerValue"
          :src="withBase('/check_white.png')"
          class="oreui-dropdown-check"
          alt="✓"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { withBase } from 'vitepress'
import { playSound } from '../composables/useSound'

interface OptionItem {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  options?: (string | OptionItem)[]
  disabled?: boolean
  sound?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  disabled: false,
  sound: true
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const innerValue = ref<string | number>(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && val !== innerValue.value) {
      innerValue.value = val
    }
  }
)

const isOpen = ref(false)

const normalizedOptions = computed<OptionItem[]>(() => {
  return props.options.map((opt) => {
    if (typeof opt === 'string') {
      return { label: opt, value: opt }
    }
    return opt
  })
})

const selectedLabel = computed(() => {
  const match = normalizedOptions.value.find((opt) => opt.value === innerValue.value)
  return match ? match.label : (normalizedOptions.value[0]?.label || 'Select an option...')
})

function toggleOpen(e: MouseEvent) {
  e.stopPropagation()
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (props.sound) {
    playSound(isOpen.value ? 'drawer_open' : 'drawer_close')
  }
}

function selectOption(val: string | number) {
  if (props.sound) {
    playSound('click')
  }
  innerValue.value = val
  isOpen.value = false
  emit('update:modelValue', val)
  emit('change', val)
}

function handleOutsideClick() {
  if (isOpen.value) {
    isOpen.value = false
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('click', handleOutsideClick)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', handleOutsideClick)
  }
})
</script>

<style scoped>
.oreui-dropdown {
  position: relative;
  width: 100%;
  max-width: 320px;
  margin: 8px 0;
  font-family: var(--font-noto-bold);
  user-select: none;
}

.oreui-dropdown.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.oreui-dropdown-label {
  align-items: center;
  background-color: #D0D1D4;
  border: 2px solid #1E1E1F;
  box-shadow: inset 0 -4px #58585A, inset 3px 3px rgba(255, 255, 255, 0.6), inset -3px -7px rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
  color: #000000;
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 14px;
  transition: background-color 0.1s ease;
}

.oreui-dropdown-label:hover {
  background-color: #B1B2B5;
}

.oreui-dropdown-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.oreui-dropdown-arrow.is-open {
  transform: rotate(180deg);
}

.oreui-dropdown-menu {
  background-color: #58585A;
  border: 2px solid #1E1E1F;
  box-shadow: inset 2px 0 #8C8D90, inset -2px 0 #8C8D90, inset 0 2px #8C8D90, inset 0 -2px #8C8D90;
  color: #FFFFFF;
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  z-index: 100;
  box-sizing: border-box;
}

.oreui-dropdown-option {
  align-items: center;
  box-shadow: inset 0 1px #8C8D90, inset 0 -1px #8C8D90;
  cursor: pointer;
  display: flex;
  height: 38px;
  justify-content: space-between;
  padding: 0 12px;
  font-size: 14px;
}

.oreui-dropdown-option:hover {
  background-color: #48494A;
}

.oreui-dropdown-option.is-selected {
  background-color: #3C8527;
}

.oreui-dropdown-check {
  width: 16px;
  height: 16px;
  object-fit: contain;
}
</style>
