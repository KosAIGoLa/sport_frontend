<template>
  <div class="user-avatar">
    <img class="user-avatar__img" src="https://uc2.qiecdn.com/avatar.php?uid=28030520&size=middle&force=1" alt="avatar" @error="e => e.target.src = '/assets/frog-avatar.png'">
    <span v-if="count > 0" class="user-avatar__badge">{{ count }}</span>
  </div>
</template>

<script setup>
defineProps({
  count: { type: Number, default: 0 }
})
</script>

<style scoped>
.user-avatar {
  @apply relative inline-block;
}
.user-avatar__img {
  @apply w-[48px] h-[48px] rounded-full object-cover ring-2 ring-white shadow-sm;
}
.user-avatar__badge {
  @apply absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white z-10;
}
</style>
