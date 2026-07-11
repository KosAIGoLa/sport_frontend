<template>
  <section class="date-list">
    <button
      v-for="(day, index) in days"
      :key="day.date"
      type="button"
      class="date-item"
      :class="{ active: modelValue === index }"
      @click="$emit('update:modelValue', index)"
    >
      <span class="day">{{ day.day }}</span>
      <span class="date">{{ day.date }}</span>
    </button>
  </section>
</template>

<script setup>
defineProps({
  days: { type: Array, required: true },
  modelValue: { type: Number, default: 0 }
})
defineEmits(['update:modelValue'])
</script>
