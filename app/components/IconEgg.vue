<template>
  <svg viewBox="0 0 200 250" fill="none" xmlns="http://www.w3.org/2000/svg" :class="iconClass">
    <ellipse cx="100" cy="125" rx="70" ry="95" fill="#F4E8C1" stroke="#D4B88A" stroke-width="12"/>
    <ellipse cx="70" cy="95" rx="25" ry="45" fill="#FFF8E1" opacity="0.7"/>
    <ellipse cx="100" cy="205" rx="45" ry="15" fill="#E8D9B0" opacity="0.4"/>
  </svg>
</template>

<script setup>
defineProps({
  iconClass: { type: String, default: '' }
})
</script>
