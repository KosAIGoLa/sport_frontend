<template>
  <div class="form-input" :class="{ focused: isFocused }">
    <span v-if="icon" class="form-input-icon">
      <svg viewBox="0 0 24 24" fill="currentColor"><path :d="icon" /></svg>
    </span>
    <slot name="prefix" />
    <input
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
    <slot name="suffix" />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: String, default: '' },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  maxlength: { type: [String, Number], default: undefined },
  icon: { type: String, default: '' },
  compact: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])

const isFocused = ref(false)
</script>

<style scoped>
.form-input {
  position: relative;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 14px;
  height: 52px;
  display: flex;
  align-items: center;
  background: #f8fafc;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}
.form-input.focused {
  border-color: #fbbf24;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.12);
}
.form-input input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: #0f172a;
  background: transparent;
  min-width: 0;
}
.form-input input::placeholder {
  color: #94a3b8;
}
.form-input-icon {
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  margin-right: 10px;
  color: #94a3b8;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}
.form-input.focused .form-input-icon {
  color: #f59e0b;
}
.form-input.compact {
  height: 44px;
}
.form-input.compact .form-input-icon {
  width: 18px;
  height: 18px;
  flex-basis: 18px;
}
</style>
