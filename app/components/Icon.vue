<template>
  <svg
    :viewBox.attr="viewBox"
    :width.attr="size"
    :height.attr="size"
    :fill.attr="fill"
    :class="iconClass"
    aria-hidden="true"
  >
    <path :d.attr="path" />
  </svg>
</template>

<script setup>
const props = defineProps({
  path: { type: String, required: true },
  size: { type: [String, Number], default: 24 },
  fill: { type: String, default: 'currentColor' },
  viewBox: { type: String, default: '0 0 24 24' },
  iconClass: { type: String, default: '' }
})
</script>
