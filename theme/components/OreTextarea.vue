<template>
  <div
    class="oreui-textarea"
    :class="{
      'is-disabled': disabled,
      'is-invalid': isInvalid
    }"
    :aria-invalid="isInvalid ? 'true' : 'false'"
  >
    <label class="oreui-textarea-label">
      <span v-if="label || $slots.label" class="oreui-textarea-label-text">
        <slot name="label">{{ label }}</slot>
      </span>

      <span class="oreui-textarea-control">
        <textarea
          class="oreui-textarea-input"
          :value="innerValue"
          :placeholder="placeholder"
          :name="name"
          :disabled="disabled"
          :readonly="readonly"
          :required="required"
          :rows="rows"
          :maxlength="maxLength >= 0 ? maxLength : undefined"
          :minlength="minLength >= 0 ? minLength : undefined"
          :spellcheck="spellCheck"
          :style="{ resize }"
          @input="handleInput"
          @change="handleChange"
          @focus="emit('focus', $event)"
          @blur="emit('blur', $event)"
        ></textarea>
      </span>
    </label>

    <div v-if="description" class="oreui-textarea-description">{{ description }}</div>
    <div v-if="errorMessage" class="oreui-textarea-error" aria-live="polite">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Props {
  modelValue?: string
  label?: string
  description?: string
  error?: string
  placeholder?: string
  name?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  rows?: number
  maxLength?: number
  minLength?: number
  spellCheck?: boolean
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  description: '',
  error: '',
  placeholder: '',
  name: '',
  disabled: false,
  readonly: false,
  required: false,
  rows: 3,
  maxLength: -1,
  minLength: -1,
  spellCheck: true,
  resize: 'vertical'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const innerValue = ref(props.modelValue)

const currentValue = computed(() => innerValue.value)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined && val !== innerValue.value) {
      innerValue.value = val
    }
  }
)

const errorMessage = computed(() => {
  if (props.error) return props.error
  const value = currentValue.value
  if (props.required && value.length === 0) {
    return 'This field is required.'
  }
  if (props.minLength >= 0 && value.length < props.minLength) {
    return `Must be at least ${props.minLength} characters long.`
  }
  if (props.maxLength >= 0 && value.length > props.maxLength) {
    return `Must be at most ${props.maxLength} characters long.`
  }
  return ''
})

const isInvalid = computed(() => errorMessage.value.length > 0)

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  innerValue.value = target.value
  emit('update:modelValue', target.value)
}

function handleChange(e: Event) {
  emit('change', e)
}
</script>

<style scoped>
.oreui-textarea {
  display: inline-grid;
  box-sizing: border-box;
  width: min(100%, 520px);
  color: #FFFFFF;
  font-family: var(--font-noto);
  text-align: start;
}

.oreui-textarea-label {
  display: grid;
  cursor: text;
}

.oreui-textarea-label-text {
  font-family: var(--font-noto-bold);
  font-size: 14px;
  line-height: 20px;
}

.oreui-textarea-control {
  display: grid;
  box-sizing: border-box;
  min-height: 76px;
  margin-top: 2px;
  padding: 2px;
  background: #313233;
  border: 2px solid #1E1E1F;
  box-shadow: inset 0 4px #242425;
}

.oreui-textarea-input {
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 64px;
  margin: 0;
  padding: 6px 8px;
  border: 0;
  outline: 0;
  color: #FFFFFF;
  background: transparent;
  font-family: var(--font-noto);
  font-size: 14px;
  line-height: 20px;
  caret-color: #6CC349;
}

.oreui-textarea-input::placeholder {
  color: #8D8D90;
  opacity: 1;
}

.oreui-textarea-input:focus-visible {
  outline: 2px solid #FFFFFF;
  outline-offset: -2px;
}

.oreui-textarea-description {
  margin-top: 4px;
  color: #8D8D90;
  font-size: 12px;
  line-height: 16px;
}

.oreui-textarea-error {
  margin-top: 4px;
  color: #F46D6D;
  font-size: 12px;
  line-height: 16px;
}

.oreui-textarea.is-invalid .oreui-textarea-control {
  border-color: #CA3636;
}

.oreui-textarea.is-disabled {
  opacity: 0.6;
}

.oreui-textarea.is-disabled .oreui-textarea-label {
  cursor: not-allowed;
}

.oreui-textarea.is-disabled .oreui-textarea-input {
  cursor: not-allowed;
}
</style>