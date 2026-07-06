<template>
  <component :is="tag" class="hidden md:block">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: 'div'
  }
})
</script>
