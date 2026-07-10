<template>
  <div class="empty-state">
    <img :src="image" alt="">
    <span>{{ text }}</span>
    <button v-if="buttonText" type="button" class="empty-state__btn" @click="$emit('buttonClick')">{{ buttonText }}</button>
  </div>
</template>

<script setup>
defineProps({
  image: { type: String, required: true },
  text: { type: String, required: true },
  buttonText: { type: String, default: '' }
})
defineEmits(['buttonClick'])
</script>

<style scoped>
.empty-state {
  @apply min-h-[350px] flex flex-col items-center justify-center gap-4;
}
.empty-state img {
  @apply w-[120px] h-auto object-contain;
}
.empty-state span {
  @apply text-sm text-[#999];
}
.empty-state__btn {
  @apply px-8 py-2 rounded-full border border-[#ff4d4f] text-[#ff4d4f] text-sm bg-white cursor-pointer hover:bg-[#fff5f5] transition-colors;
}
</style>
