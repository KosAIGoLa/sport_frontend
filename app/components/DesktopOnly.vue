<template>
  <component :is="tag" class="only-desktop">
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
