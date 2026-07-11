<template>
  <aside class="recharge-sidebar">
    <div
      v-for="item in items"
      :key="item.key"
      class="recharge-sidebar__item"
      :class="{ active: modelValue === item.key }"
      @click="$emit('update:modelValue', item.key)"
    >
      {{ item.label }}
    </div>
  </aside>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [{ key: 'liver', label: '鹅肝充值' }]
  },
  modelValue: { type: String, default: 'liver' }
})
defineEmits(['update:modelValue'])
</script>
