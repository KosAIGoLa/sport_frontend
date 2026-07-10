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
