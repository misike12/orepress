<template>
  <div
    class="oreui-radio-group"
    :class="[
      `direction-${direction}`,
      { 'is-disabled': disabled }
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch } from 'vue'

interface Props {
  modelValue?: string | number | boolean
  direction?: 'horizontal' | 'vertical'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  direction: 'vertical',
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', val: string | number | boolean): void
  (e: 'change', val: string | number | boolean): void
}>()

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) {
      innerValue.value = val
    }
  }
)

function changeValue(val: string | number | boolean) {
  innerValue.value = val
  emit('update:modelValue', val)
  emit('change', val)
}

provide('oreRadioGroup', {
  modelValue: computed(() => innerValue.value),
  changeValue,
  disabled: computed(() => props.disabled)
})
</script>

<style scoped>
.oreui-radio-group {
  display: flex;
  gap: 12px;
}

.oreui-radio-group.direction-vertical {
  flex-direction: column;
}

.oreui-radio-group.direction-horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
