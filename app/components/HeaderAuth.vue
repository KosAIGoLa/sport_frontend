<template>
  <DesktopOnly tag="div" class="header-auth">
    <template v-if="!isLoggedIn">
      <button type="button" class="header-auth__login" @click="$emit('login', 'login')">{{ t('auth.login') }}</button>
      <button type="button" class="header-auth__register" @click="$emit('login', 'register')">{{ t('auth.register') }}</button>
    </template>
    <template v-else>
      <div class="header-auth__subscribe">
        <svg class="header-auth__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span>{{ t('nav.appointment') }}</span>
        <div class="header-auth__submenu">
          <div class="header-auth__box">
            <div class="header-auth__empty">
              <svg class="header-auth__empty-img" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="80" cy="85" rx="55" ry="60" fill="#cbd5e1"/>
                <ellipse cx="80" cy="95" rx="30" ry="38" fill="white"/>
                <circle cx="62" cy="70" r="5" fill="#334155"/>
                <circle cx="98" cy="70" r="5" fill="#334155"/>
                <path d="M75 82 L85 82 L80 92 Z" fill="#f59e0b"/>
                <path d="M58 76 Q52 88 58 100" stroke="#60a5fa" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M102 76 Q108 88 102 100" stroke="#60a5fa" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M25 85 Q12 105 25 120" stroke="#cbd5e1" stroke-width="12" fill="none" stroke-linecap="round"/>
                <path d="M135 85 Q148 105 135 120" stroke="#cbd5e1" stroke-width="12" fill="none" stroke-linecap="round"/>
                <path d="M50 40 Q60 30 70 40" stroke="#94a3b8" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M90 40 Q100 30 110 40" stroke="#94a3b8" stroke-width="3" fill="none" stroke-linecap="round"/>
              </svg>
              <p class="header-auth__empty-text">你的预约列表空空如也~</p>
            </div>
            <a class="header-auth__empty-footer" href="/match.html">查看全部</a>
          </div>
        </div>
      </div>
      <div class="header-auth__concern">
        <svg class="header-auth__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        <span>{{ t('nav.follow') }}</span>
        <div class="header-auth__submenu header-auth__submenu--right">
          <div class="header-auth__box">
            <div class="header-auth__empty">
              <svg class="header-auth__empty-img" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="80" cy="85" rx="55" ry="60" fill="#cbd5e1"/>
                <ellipse cx="80" cy="95" rx="30" ry="38" fill="white"/>
                <circle cx="62" cy="70" r="5" fill="#334155"/>
                <circle cx="98" cy="70" r="5" fill="#334155"/>
                <path d="M75 82 L85 82 L80 92 Z" fill="#f59e0b"/>
                <path d="M58 76 Q52 88 58 100" stroke="#60a5fa" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M102 76 Q108 88 102 100" stroke="#60a5fa" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M25 85 Q12 105 25 120" stroke="#cbd5e1" stroke-width="12" fill="none" stroke-linecap="round"/>
                <path d="M135 85 Q148 105 135 120" stroke="#cbd5e1" stroke-width="12" fill="none" stroke-linecap="round"/>
                <path d="M50 40 Q60 30 70 40" stroke="#94a3b8" stroke-width="3" fill="none" stroke-linecap="round"/>
                <path d="M90 40 Q100 30 110 40" stroke="#94a3b8" stroke-width="3" fill="none" stroke-linecap="round"/>
              </svg>
              <p class="header-auth__empty-text">你的关注列表空空如也~</p>
            </div>
            <a class="header-auth__empty-footer" href="/user.html">查看全部</a>
          </div>
        </div>
      </div>
      <UserAvatarWithMenu :count="count" @logout="$emit('logout')" />
    </template>
  </DesktopOnly>
</template>

<script setup>
const { t } = useI18n()

defineProps({
  isLoggedIn: { type: Boolean, default: false },
  count: { type: Number, default: 0 }
})
defineEmits(['login', 'logout'])
</script>

<style scoped>
.header-auth {
  @apply ml-auto h-full flex items-center gap-2.5;
}
.header-auth__login,
.header-auth__register {
  @apply appearance-none h-[34px] px-3.5 border border-slate-200/[0.9] rounded-full bg-white/[0.72] text-[#111827] text-sm font-bold cursor-pointer transition-all duration-200;
}
.header-auth__login:hover,
.header-auth__register:hover {
  @apply border-[rgba(255,194,28,0.8)] bg-[#fff7d6];
}
.header-auth__login::before {
  @apply content-[''] inline-block w-2 h-2 mr-1.5 bg-green-500 rounded-full align-[1px] shadow-[0_0_0_5px_rgba(34,197,94,0.12)];
}
.header-auth__subscribe,
.header-auth__concern {
  @apply relative h-full flex items-center gap-1 cursor-pointer text-sm font-bold text-[#333] px-2;
}
.header-auth__icon {
  @apply w-4 h-4 text-[#f8c21b];
}
.header-auth__submenu {
  @apply hidden absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-[102];
}
.header-auth__submenu--right {
  @apply left-auto right-0 -translate-x-0;
}
.header-auth__subscribe:hover .header-auth__submenu,
.header-auth__concern:hover .header-auth__submenu {
  @apply block;
}
.header-auth__submenu::before {
  @apply content-[''] absolute top-[2px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white;
}
.header-auth__submenu--right::before {
  @apply left-auto right-10 -translate-x-0;
}
.header-auth__box {
  @apply relative w-[360px] p-0 overflow-hidden bg-white/[0.96] border-0 rounded-[14px] shadow-[0_22px_60px_rgba(15,23,42,0.14)] text-[#333];
}
.header-auth__empty {
  @apply flex flex-col items-center justify-center py-10 px-6;
}
.header-auth__empty-img {
  @apply w-[140px] h-[120px] mb-4;
}
.header-auth__empty-text {
  @apply text-sm text-[#666];
}
.header-auth__empty-footer {
  @apply block w-full py-3 text-center text-sm text-[#333] bg-[#f8f9fa] border-t border-gray-100 no-underline hover:bg-[#f1f3f5];
}
</style>
