<template>
  <header class="page-header">
    <div class="page-header__inner">
      <MobileOnly tag="div" class="page-header__mobile-head">
        <div class="page-header__mobile-top">
          <img class="page-header__mobile-logo" src="/assets/logo-mobile-wap.png" alt="857直播">
          <a class="page-header__mobile-download" href="/download" target="_blank" rel="noopener noreferrer">{{ t('nav.downloadApp') }}</a>
        </div>
        <nav class="page-header__mobile-tabs" :aria-label="mobileAriaLabel || undefined">
          <NuxtLink
            v-for="tab in mobileTabs"
            :key="tab.key"
            :class="{ active: activeMobileTab === tab.key }"
            :to="tab.href"
          >
            {{ tab.label }}
          </NuxtLink>
        </nav>
      </MobileOnly>

      <DesktopOnly tag="a" class="page-header__logo" href="/">
        <img src="/assets/logo2.png" alt="857直播">
      </DesktopOnly>

      <DesktopOnly tag="nav" class="page-header__nav">
        <NuxtLink :class="{ active: page === 'home' }" to="/">{{ t('nav.home') }}</NuxtLink>
        <NuxtLink :class="{ active: page === 'live' }" to="/liveType.html">{{ t('nav.allLive') }}</NuxtLink>
        <NuxtLink :class="{ active: page === 'match' }" to="/match.html">{{ t('nav.schedule') }}</NuxtLink>
        <a class="download" href="/download" target="_blank" rel="noopener noreferrer">
          <span>
            {{ t('nav.downloadApp') }}
            <img src="/assets/hot.png" alt="hot">
          </span>
        </a>
      </DesktopOnly>

      <HeaderAuth :is-logged-in="isLoggedIn" :count="count" @login="$emit('login', $event)" @logout="$emit('logout')" />
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  page: { type: String, default: 'live' },
  isLoggedIn: { type: Boolean, default: false },
  count: { type: Number, default: 0 },
  activeMobileTab: { type: String, default: '全部' },
  mobileAriaLabel: { type: String, default: '' }
})
defineEmits(['login', 'logout'])

const { t } = useI18n()

const mobileTabs = computed(() => {
  const base = props.page === 'match' ? '/match.html' : '/liveType.html'
  return [
    { key: '全部', label: t('nav.all'), href: base },
    { key: '足球', label: t('nav.football'), href: `${base}?tab=足球` },
    { key: '篮球', label: t('nav.basketball'), href: `${base}?tab=篮球` },
    { key: '分析', label: t('nav.analysis'), href: `${base}?tab=分析` }
  ]
})
</script>

<style scoped>
.page-header {
  @apply relative z-[100] h-[72px] bg-white/[0.86] border-b border-slate-200/[0.9] shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-[18px];
}
.page-header__inner {
  @apply w-[1200px] h-full mx-auto flex items-center;
}
.page-header__logo {
  @apply flex items-center mr-[58px];
}
.page-header__logo img {
  @apply w-[160px] h-auto block;
}
.page-header__mobile-head {
  @apply hidden;
}
.page-header__nav {
  @apply h-full flex items-center gap-4 text-base font-[650];
}
.page-header__nav a {
  @apply relative h-9 px-[18px] leading-9 text-[#111827] no-underline rounded-full whitespace-nowrap transition-all duration-200;
}
.page-header__nav a:hover,
.page-header__nav a.active {
  @apply text-[#111827] bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] shadow-[0_8px_18px_rgba(248,194,27,0.28)];
}
.page-header__nav a.download {
  @apply text-amber-500;
}
.page-header__nav a.download:hover {
  @apply bg-[#fff7d6];
}
.page-header__nav a.download span {
  @apply relative;
}
.page-header__nav a.download img {
  @apply absolute -top-[12px] -right-[32px] w-[29px] h-auto;
}

@media (max-width: 768px) {
  .page-header {
    @apply h-auto bg-transparent border-b-0 shadow-none backdrop-blur-none;
  }
  .page-header__inner {
    @apply w-full p-0;
  }
  .page-header__mobile-head {
    @apply block w-full;
  }
  .page-header__mobile-top {
    @apply h-[68px] px-4 bg-[rgba(32,33,36,0.9)] backdrop-blur-[10px] flex items-center justify-between;
  }
  .page-header__mobile-logo {
    @apply w-[158px] h-auto block;
  }
  .page-header__mobile-download {
    @apply min-w-[108px] h-[42px] px-4 rounded-md bg-[#ffc61a] text-white no-underline text-base font-extrabold inline-flex items-center justify-center;
  }
  .page-header__mobile-tabs {
    @apply h-[74px] px-4 bg-[rgba(255,198,26,0.92)] backdrop-blur-[10px] flex items-center gap-[38px] overflow-x-auto;
  }
  .page-header__mobile-tabs a {
    @apply relative shrink-0 text-white no-underline text-[22px] font-extrabold leading-none;
  }
  .page-header__mobile-tabs a.active::after {
    @apply content-[''] absolute left-1/2 -bottom-[14px] w-3 h-1.5 -ml-1.5 rounded-full bg-white;
  }
  .page-header__logo,
  .page-header__nav,
  .header-auth {
    @apply hidden;
  }
}
</style>
