<template>
  <div v-if="visible" class="mobile-follow-panel">
    <header class="mobile-follow-panel__header">
      <div class="mobile-follow-panel__top">
        <img class="mobile-follow-panel__logo" src="/assets/logo-mobile-wap.png" alt="857直播">
        <a class="mobile-follow-panel__download" href="/download" target="_blank" rel="noopener noreferrer">下载APP</a>
      </div>
      <nav class="mobile-follow-panel__tabs" aria-label="关注预约">
        <button type="button" :class="{ active: activeTab === 'follow' }" @click="activeTab = 'follow'">关注</button>
        <button type="button" :class="{ active: activeTab === 'appointment' }" @click="activeTab = 'appointment'">预约</button>
      </nav>
    </header>

    <main class="mobile-follow-panel__body" :class="{ 'mobile-follow-panel__body--appointment': activeTab === 'appointment' }">
      <img class="mobile-follow-panel__empty" src="/assets/none.png" alt="">
      <p>登录账号关注喜欢的主播</p>
      <button type="button" class="mobile-follow-panel__login" @click="$emit('login', 'login')">登录</button>
    </main>

    <nav class="mobile-follow-panel__footer" aria-label="底部导航">
      <a href="/" class="mobile-follow-panel__item" :class="{ 'mobile-follow-panel__item--active': activeFooterTab === 'live' }" @click="activeFooterTab = 'live'">
        <span class="mobile-follow-panel__icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2 3 9.4v10.1c0 .8.6 1.5 1.5 1.5h15c.8 0 1.5-.6 1.5-1.5V9.4l-9-6.2Zm0 2.5 6.5 4.5v8.8H5.5v-8.8L12 5.7Z" /></svg>
        </span>
        <span>直播</span>
      </a>
      <a href="/match.html" class="mobile-follow-panel__item" :class="{ 'mobile-follow-panel__item--active': activeFooterTab === 'schedule' }" @click="activeFooterTab = 'schedule'">
        <span class="mobile-follow-panel__icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v2H5.8A2.8 2.8 0 0 0 3 6.8v11.4A2.8 2.8 0 0 0 5.8 21h12.4a2.8 2.8 0 0 0 2.8-2.8V6.8A2.8 2.8 0 0 0 18.2 4H17V2h-2v2H9V2H7Zm11.2 7H5.8v9.2h12.4V9Z" /></svg>
        </span>
        <span>赛程</span>
      </a>
      <button type="button" class="mobile-follow-panel__item" :class="{ 'mobile-follow-panel__item--active': activeFooterTab === 'follow' }" @click="activeFooterTab = 'follow'">
        <span class="mobile-follow-panel__icon mobile-follow-panel__icon--active">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.6 4.9 13.8A4.7 4.7 0 0 1 11.7 7L12 7.3l.3-.3a4.7 4.7 0 0 1 6.8 6.8L12 20.6Zm0-2.8 5.7-5.4a2.7 2.7 0 1 0-3.9-3.7L12 10.6l-1.8-1.9a2.7 2.7 0 1 0-3.9 3.7l5.7 5.4Z" /></svg>
        </span>
        <span>关注</span>
      </button>
      <button type="button" class="mobile-follow-panel__item" :class="{ 'mobile-follow-panel__item--active': activeFooterTab === 'profile' }" @click="handleProfileClick">
        <span class="mobile-follow-panel__icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.1 0-7.5 2.2-7.5 5v1.5h15V19c0-2.8-3.4-5-7.5-5Z" /></svg>
        </span>
        <span>我的</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false }
})

const emit = defineEmits(['login'])
const activeTab = ref('follow')
const activeFooterTab = ref('follow')

function handleProfileClick() {
  activeFooterTab.value = 'profile'
  emit('login', 'login')
}
</script>

<style scoped>
.mobile-follow-panel {
  @apply hidden;
}

@media (max-width: 768px) {
  .mobile-follow-panel {
    @apply fixed inset-0 z-[120] bg-[#f8fafc] flex flex-col;
  }
  .mobile-follow-panel__top {
    @apply h-[68px] px-4 bg-[#202124] flex items-center justify-between;
  }
  .mobile-follow-panel__logo {
    @apply w-[158px] h-auto block;
  }
  .mobile-follow-panel__download {
    @apply min-w-[108px] h-[42px] px-4 rounded-md bg-[#ffc61a] text-white no-underline text-base font-extrabold inline-flex items-center justify-center;
  }
  .mobile-follow-panel__tabs {
    @apply h-[74px] px-6 bg-[#ffc61a] flex items-center gap-[42px];
  }
  .mobile-follow-panel__tabs button {
    @apply relative border-0 bg-transparent text-white text-[22px] font-extrabold p-0;
  }
  .mobile-follow-panel__tabs button.active::after {
    @apply content-[''] absolute left-1/2 -bottom-[14px] w-3 h-1.5 -ml-1.5 rounded-full bg-white;
  }
  .mobile-follow-panel__body {
    @apply flex-1 flex flex-col items-center justify-center px-6 pb-12;
  }
  .mobile-follow-panel__body--appointment {
    @apply justify-end pb-[98px];
  }
  .mobile-follow-panel__empty {
    @apply w-[168px] opacity-[0.18] mb-[22px];
  }
  .mobile-follow-panel__body p {
    @apply text-[#9a9a9a] text-[15px] m-0 mb-7;
  }
  .mobile-follow-panel__login {
    @apply w-[184px] h-12 border-0 rounded-full bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] text-[#111827] text-[17px] font-extrabold shadow-[0_10px_24px_rgba(248,194,27,0.22)];
  }
  .mobile-follow-panel__footer {
    @apply h-[92px] border-t border-slate-200/[0.95] bg-white grid grid-cols-4 items-center pb-[env(safe-area-inset-bottom,0)];
  }
  .mobile-follow-panel__item {
    @apply border-0 bg-transparent text-[#111827] no-underline flex flex-col items-center justify-center gap-2 text-[15px] font-bold;
  }
  .mobile-follow-panel__icon {
    @apply w-[58px] h-[38px] inline-flex items-center justify-center rounded-full;
  }
  .mobile-follow-panel__icon svg {
    @apply w-[30px] h-[30px] fill-none stroke-current stroke-[1.9];
  }
  .mobile-follow-panel__item--active {
    @apply text-[#111827];
  }
  .mobile-follow-panel__item--active .mobile-follow-panel__icon {
    @apply bg-[#ffc61a] text-white;
  }
}
</style>
