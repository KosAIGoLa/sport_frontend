<template>
  <header class="page-header">
    <div class="page-header__inner">
      <MobileOnly tag="div" class="page-header__mobile-head">
        <div class="page-header__mobile-top">
          <img class="page-header__mobile-logo" src="/assets/logos/logo-mobile-wap.png" alt="857直播">
          <a class="page-header__mobile-download" href="/download" target="_blank" rel="noopener noreferrer">{{ t('nav.downloadApp') }}</a>
        </div>
        <nav class="page-header__mobile-tabs" :aria-label="mobileAriaLabel || undefined">
          <a
            v-for="tab in mobileTabs"
            :key="tab.key"
            :class="{ active: activeMobileTab === tab.key }"
            :href="tab.href"
            @click.prevent="navigateTo(tab.href)"
          >
            {{ tab.label }}
          </a>
        </nav>
      </MobileOnly>

      <DesktopOnly tag="div" class="page-header__logo-wrap">
        <a class="page-header__logo" href="/" @click.prevent="goHome">
          <img src="/assets/logos/logo2.png" alt="857直播">
        </a>
      </DesktopOnly>

      <DesktopOnly tag="div" class="page-header__nav">
        <NavMenu :active="navActive" />
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
const route = useRoute()

/** catalog 的 match 与顶栏 schedule 对齐 */
const navActive = computed(() => {
  if (props.page === 'match') return 'schedule'
  if (props.page === 'live' || props.page === 'home') return props.page
  return ''
})

async function goHome() {
  if (route.path === '/') return
  await navigateTo('/')
}

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
.page-header__logo-wrap {
  @apply mr-[58px];
}
.page-header__logo {
  @apply flex items-center;
}
.page-header__logo img {
  @apply w-[160px] h-auto block;
}
.page-header__mobile-head {
  @apply hidden;
}
.page-header__nav {
  @apply h-full flex items-center;
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
    @apply h-[60px] px-4 bg-[rgba(32,33,36,0.9)] backdrop-blur-[10px] flex items-center justify-between;
  }
  .page-header__mobile-logo {
    @apply w-[136px] h-auto block;
  }
  .page-header__mobile-download {
    @apply min-w-[96px] h-[36px] px-3 rounded-md bg-[#ffc61a] text-white no-underline text-[14px] font-extrabold inline-flex items-center justify-center;
  }
  .page-header__mobile-tabs {
    @apply h-[58px] px-4 bg-[rgba(255,198,26,0.92)] backdrop-blur-[10px] flex items-center gap-6 overflow-x-auto;
  }
  .page-header__mobile-tabs a {
    @apply relative shrink-0 text-white no-underline text-[16px] font-bold leading-none;
  }
  .page-header__mobile-tabs a.active::after {
    @apply content-[''] absolute left-1/2 -bottom-[10px] w-2.5 h-1 -ml-1.5 rounded-full bg-white;
  }
  .page-header__logo-wrap,
  .page-header__nav,
  .header-auth {
    @apply hidden;
  }
}
</style>
