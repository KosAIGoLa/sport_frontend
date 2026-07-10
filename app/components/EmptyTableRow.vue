<template>
  <tr class="empty-row">
    <td :colspan="colspan">{{ text }}</td>
  </tr>
</template>

<script setup>
defineProps({
  colspan: { type: Number, required: true },
  text: { type: String, required: true }
})
</script>

<style scoped>
.empty-row td {
  @apply py-8 px-4 text-[#999];
  text-align: center;
  vertical-align: middle;
}
</style>
