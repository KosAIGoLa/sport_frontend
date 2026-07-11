<template>
  <DesktopOnly tag="div" class="header-auth">
    <template v-if="!isLoggedIn">
      <button type="button" class="header-auth__login" @click="$emit('login', 'login')">{{ t('auth.login') }}</button>
      <button type="button" class="header-auth__register" @click="$emit('login', 'register')">{{ t('auth.register') }}</button>
    </template>
    <template v-else>
      <div class="header-auth__subscribe">
        <IconFollow icon-class="header-auth__icon" />
        <span>{{ t('nav.follow') }}</span>
        <div class="header-auth__submenu header-auth__submenu--right">
          <div class="header-auth__box">
            <template v-if="followItems.length">
              <div class="header-auth__list">
                <a
                  v-for="item in followItems"
                  :key="item.id"
                  :href="item.link"
                  class="header-auth__follow-item"
                  @click.prevent="appNavigate(item.link)"
                >
                  <div class="header-auth__follow-title">{{ item.title }}</div>
                  <div class="header-auth__follow-meta">
                    <span class="header-auth__follow-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      已播 {{ item.days }} 天
                    </span>
                    <span class="header-auth__follow-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {{ item.author }}
                    </span>
                    <span class="header-auth__follow-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-7 4-7 11v8l7-3 7 3v-8C19 6 12 2 12 2z"/><path d="M12 14l2-2-2-2"/></svg>
                      {{ item.heat }}
                    </span>
                  </div>
                </a>
              </div>
            </template>
            <template v-else>
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
            </template>
            <a class="header-auth__empty-footer" href="/user.html?menu=follow" @click.prevent="appNavigate('/user.html?menu=follow')">查看全部</a>
          </div>
        </div>
      </div>
      <div class="header-auth__concern">
        <IconHistory icon-class="header-auth__icon" />
        <span>{{ t('nav.history') }}</span>
        <div class="header-auth__submenu header-auth__submenu--right">
          <div class="header-auth__box">
            <template v-if="historyItems.length">
              <div class="header-auth__list">
                <a
                  v-for="item in historyItems"
                  :key="item.id"
                  :href="item.link"
                  class="header-auth__follow-item"
                  @click.prevent="appNavigate(item.link)"
                >
                  <div class="header-auth__follow-title">{{ item.title }}</div>
                  <div class="header-auth__follow-meta">
                    <span class="header-auth__follow-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polygon points="10 9 16 12 10 15 10 9"/></svg>
                      {{ item.timeAgo }}
                    </span>
                    <span class="header-auth__follow-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      {{ item.author }}
                    </span>
                    <span class="header-auth__follow-meta-item">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                      {{ item.heat }}
                    </span>
                  </div>
                </a>
              </div>
            </template>
            <template v-else>
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
                <p class="header-auth__empty-text">你的历史列表空空如也~</p>
              </div>
            </template>
            <a class="header-auth__empty-footer" href="/user.html?menu=history" @click.prevent="appNavigate('/user.html?menu=history')">查看全部</a>
          </div>
        </div>
      </div>
      <UserAvatarWithMenu :count="count" @logout="$emit('logout')" />
    </template>
  </DesktopOnly>
</template>

<script setup>
const { t } = useI18n()
const { appNavigate } = useAppNavigate()

const followItems = [
  {
    id: 1,
    title: '【阿祖】U20 德国VS塞尔维亚',
    days: 1,
    author: '阿祖又收了',
    heat: '61996',
    link: '/room/1'
  },
  {
    id: 2,
    title: '乔氏台球002的直播间',
    days: 10,
    author: '乔氏台球002',
    heat: '1105',
    link: '/room/2'
  }
]

const historyItems = [
  {
    id: 1,
    title: '[直播] 【阿祖】U20 法国VS立陶宛',
    timeAgo: '2小时前',
    author: '阿祖又收了',
    heat: '49694',
    link: '/room/1'
  },
  {
    id: 2,
    title: '[直播] 乔氏台球002的直播间',
    timeAgo: '2小时前',
    author: '乔氏台球002',
    heat: '1016',
    link: '/room/2'
  }
]

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
.header-auth__list {
  @apply py-2;
}
.header-auth__follow-item {
  @apply block px-5 py-3 no-underline border-b border-gray-100 last:border-b-0 hover:bg-[#f8f9fa] transition-colors;
}
.header-auth__follow-title {
  @apply text-sm text-[#333] font-medium truncate mb-2;
}
.header-auth__follow-meta {
  @apply flex items-center gap-4 text-xs text-[#999];
}
.header-auth__follow-meta-item {
  @apply flex items-center gap-1;
}
.header-auth__follow-meta-item svg {
  @apply w-3.5 h-3.5;
}
</style>
