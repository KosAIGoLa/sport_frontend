<template>
  <div class="user-menu" :class="`user-menu--tail-${tailAlign}`">
    <div class="user-menu__top">
      <img class="user-menu__avatar" src="/assets/frog-avatar.png" alt="avatar">
      <div class="user-menu__info">
        <div class="user-menu__row">
          <span class="user-menu__name">企鹅玩家Kc2hl9</span>
          <button type="button" class="user-menu__logout" @click="$emit('logout')">退出</button>
        </div>
        <div class="user-menu__badges">
          <span v-for="i in 5" :key="i" class="user-menu__badge"></span>
        </div>
        <div class="user-menu__level">
          <span class="user-menu__lv">LV.1</span>
          <div class="user-menu__progress"><span style="width: 0%"></span></div>
          <span class="user-menu__percent">0%</span>
        </div>
      </div>
    </div>

    <div class="user-menu__wealth">
      <div class="user-menu__wealth-title">我的财富：</div>
      <div class="user-menu__wealth-row">
        <div class="user-menu__asset">
          <span class="user-menu__coin"></span>
          <span>0.00</span>
        </div>
        <div class="user-menu__asset">
          <span class="user-menu__fire"></span>
          <span>0</span>
        </div>
        <button type="button" class="user-menu__recharge">充值</button>
      </div>
    </div>

    <div class="user-menu__actions">
      <NuxtLink to="/user.html" class="user-menu__action">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
        <span>个人中心</span>
      </NuxtLink>
      <NuxtLink to="/user.html" class="user-menu__action">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <span>我的关注</span>
      </NuxtLink>
      <NuxtLink to="/user.html" class="user-menu__action user-menu__action--active">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        <span>我的消息</span>
      </NuxtLink>
      <NuxtLink to="/user.html" class="user-menu__action">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
        <span>申请直播</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tailAlign: { type: String, default: 'right' }
})
defineEmits(['logout'])
</script>

<style scoped>
.user-menu {
  @apply relative w-[280px] bg-white rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-4 text-[#333] select-none;
}
.user-menu::before {
  @apply content-[''] absolute -top-2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white;
}
.user-menu--tail-right::before {
  @apply right-5;
}
.user-menu--tail-center::before {
  @apply left-1/2 -translate-x-1/2;
}
.user-menu__top {
  @apply flex gap-3 pb-3 border-b border-gray-100;
}
.user-menu__avatar {
  @apply w-[56px] h-[56px] rounded-full object-cover shrink-0;
}
.user-menu__info {
  @apply flex-1 min-w-0;
}
.user-menu__row {
  @apply flex items-center justify-between mb-2;
}
.user-menu__name {
  @apply text-base font-bold truncate;
}
.user-menu__logout {
  @apply text-xs text-gray-400 bg-transparent border-0 cursor-pointer hover:text-[#f8c21b];
}
.user-menu__badges {
  @apply flex gap-1 mb-2;
}
.user-menu__badge {
  @apply w-6 h-6 rounded-full bg-gray-200;
}
.user-menu__level {
  @apply flex items-center gap-2 text-xs;
}
.user-menu__lv {
  @apply px-1.5 py-0.5 rounded-full bg-[#f8c21b] text-white font-bold;
}
.user-menu__progress {
  @apply flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden;
}
.user-menu__progress span {
  @apply block h-full bg-[#f8c21b] rounded-full;
}
.user-menu__percent {
  @apply text-gray-400 w-8 text-right;
}
.user-menu__wealth {
  @apply py-3 border-b border-gray-100;
}
.user-menu__wealth-title {
  @apply text-sm text-gray-500 mb-2;
}
.user-menu__wealth-row {
  @apply flex items-center justify-between;
}
.user-menu__asset {
  @apply flex items-center gap-1.5 text-sm font-semibold;
}
.user-menu__coin {
  @apply w-4 h-4 rounded-full bg-red-500;
}
.user-menu__fire {
  @apply w-4 h-4 rounded-full bg-orange-500;
}
.user-menu__recharge {
  @apply h-7 px-4 rounded-full bg-red-500 text-white text-xs font-bold border-0 cursor-pointer;
}
.user-menu__actions {
  @apply grid grid-cols-4 gap-1 pt-3;
}
.user-menu__action {
  @apply flex flex-col items-center gap-1 text-xs text-gray-500 no-underline cursor-pointer;
}
.user-menu__action:hover,
.user-menu__action--active {
  @apply text-red-500;
}
.user-menu__action svg {
  @apply w-5 h-5;
}
</style>
