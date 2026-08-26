<template>
  <div class="oreui-input-container" :class="{ 'is-disabled': disabled }">
    <input
      v-if="!textarea"
      :type="type"
      :value="innerValue"
      :placeholder="placeholder"
      :disabled="disabled"
      class="oreui-input"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <textarea
      v-else
      :value="innerValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      class="oreui-input oreui-textarea"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    ></textarea>
    <slot name="suffix" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  textarea?: boolean
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  disabled: false,
  textarea: false,
  rows: 3
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const innerValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && val !== innerValue.value) {
      innerValue.value = val
    }
  }
)

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement
  innerValue.value = target.value
  emit('update:modelValue', target.value)
}

function handleFocus(e: FocusEvent) {
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  emit('blur', e)
}
</script>

<style scoped>
.oreui-input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin: 8px 0;
}

.oreui-input-container.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.oreui-input {
  background-color: #313233;
  border: 2px solid #1E1E1F;
  box-shadow: inset 0 4px #242425;
  box-sizing: border-box;
  caret-color: #6CC349;
  color: #FFFFFF;
  font-family: var(--font-noto-bold);
  font-size: 14px;
  height: 40px;
  outline: none;
  padding: 8px 12px;
  width: 100%;
  transition: border-color 0.15s ease;
}

.oreui-textarea {
  height: auto;
  resize: vertical;
  line-height: 1.5;
}

.oreui-input:focus {
  border-color: #FFFFFF;
}

.oreui-input::placeholder {
  color: #8D8D90;
}
</style>
