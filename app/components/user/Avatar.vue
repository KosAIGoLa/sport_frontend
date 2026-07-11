<template>
  <div class="user-avatar">
    <img class="user-avatar__img" src="https://uc2.qiecdn.com/avatar.php?uid=28030520&size=middle&force=1" alt="avatar" @error="e => e.target.src = '/assets/avatars/frog-avatar.png'">
    <span v-if="count > 0" class="user-avatar__badge">{{ count }}</span>
  </div>
</template>

<script setup>
defineProps({
  count: { type: Number, default: 0 }
})
</script>

<style scoped>
/* 顶栏登录后头像：对齐原站 40x40 圆头，避免被个人中心样式污染 */
.user-avatar {
  @apply relative inline-flex items-center justify-center w-10 h-10 shrink-0;
}
.user-avatar__img {
  @apply block w-10 h-10 rounded-full object-cover;
}
.user-avatar__badge {
  @apply absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#f50d2e] text-white text-[10px] font-bold leading-none flex items-center justify-center z-10;
}
</style>
