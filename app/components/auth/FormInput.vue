<template>
  <div
    class="relative border border-slate-200 rounded-xl px-3.5 h-[52px] flex items-center bg-slate-50 transition-all duration-200"
    :class="{ 'border-amber-400 bg-white shadow-[0_0_0_3px_rgba(251,191,36,0.12)]': isFocused, 'h-11': compact }"
  >
    <span
      v-if="icon"
      class="w-5 h-5 shrink-0 basis-5 mr-2.5 text-slate-400 inline-flex items-center justify-center transition-colors duration-200"
      :class="{ 'text-amber-500': isFocused, 'w-[18px] h-[18px] basis-[18px]': compact }"
    >
      <svg viewBox="0 0 24 24" fill="currentColor"><path :d="icon" /></svg>
    </span>
    <slot name="prefix" />
    <input
      class="border-none outline-none flex-1 text-sm text-slate-900 bg-transparent min-w-0 placeholder:text-slate-400"
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

