<template>
  <component :is="tag" class="only-mobile">
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
