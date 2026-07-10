<template>
  <header class="header-wrapper" :class="{ active: isScrolled || forceSolid, 'header-wrapper--static': !floating }">
    <div class="header-inner clearfix">
      <MobileOnly tag="div" class="mobile-header">
        <div class="mobile-header__top">
          <button
            v-if="back"
            type="button"
            class="mobile-header__back"
            aria-label="返回"
            @click="goBack"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <img class="mobile-header__logo" src="/assets/logo2.png" alt="857直播">
          <a class="mobile-header__download" href="/download" target="_blank" rel="noopener noreferrer">{{ t('nav.downloadApp') }}</a>
        </div>
        <nav v-if="!back" class="mobile-header__tabs" aria-label="首页分类">
          <NuxtLink to="/liveType.html" class="active">{{ t('nav.all') }}</NuxtLink>
          <NuxtLink to="/liveType.html?tab=足球">{{ t('nav.football') }}</NuxtLink>
          <NuxtLink to="/liveType.html?tab=篮球">{{ t('nav.basketball') }}</NuxtLink>
          <NuxtLink to="/liveType.html?tab=分析">{{ t('nav.analysis') }}</NuxtLink>
        </nav>
      </MobileOnly>
      <DesktopOnly tag="div" class="header-left">
        <div class="header-logo-box">
          <img class="header-logo" src="/assets/logo.png" alt="857直播">
          <img class="header-logo-active" src="/assets/logo2.png" alt="857直播">
        </div>
        <nav class="header-menu">
          <ul>
            <li class="home-menu" :class="{ active: activeMenu === 'home' }" @click="scrollToHomeSection('#living-room')"><span>{{ t('nav.home') }}</span></li>
            <li class="live-menu" :class="{ active: activeMenu === 'live' }" @click="goLiveType"><span>{{ t('nav.allLive') }}</span></li>
            <li class="match-menu" :class="{ active: activeMenu === 'schedule' }" @click="goMatch"><span>{{ t('nav.schedule') }}</span></li>
            <li class="download-menu">
              <span>
                <a href="/download" target="_blank" rel="noopener noreferrer">
                  {{ t('nav.downloadApp') }}
                  <img class="hot" src="/assets/hot.png" alt="hot">
                </a>
              </span>
              <div class="submenu download-submenu">
                <div class="submenu-box download-submenu-box">
                  <img src="/assets/code.png" alt="857直播">
                  <p>用手机浏览器扫一扫</p>
                  <p>精彩马上呈现</p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </DesktopOnly>
      <DesktopOnly tag="div" class="header-right">
        <div v-if="!isLoggedIn" class="no-login">
          <button type="button" class="header-btn header-login" @click="openLogin('login')">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <span>{{ t('auth.login') }}</span>
          </button>
          <button type="button" class="header-btn header-register" @click="openLogin('register')">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <span>{{ t('auth.register') }}</span>
          </button>
        </div>
        <div v-else class="had-login">
          <div class="header-subscribe">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span>{{ t('nav.appointment') }}</span>
            <div class="submenu subscribe-submenu">
              <div class="submenu-box subscribe-submenu-box">
                <div class="concern-empty">
                  <svg class="concern-empty__img" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <p class="concern-empty__text">你的预约列表空空如也~</p>
                </div>
                <a class="concern-empty__footer" href="/match.html">查看全部</a>
              </div>
            </div>
          </div>
          <div class="header-concern">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>{{ t('nav.follow') }}</span>
            <div class="submenu concern-submenu">
              <div class="submenu-box concern-submenu-box">
                <div class="concern-empty">
                  <svg class="concern-empty__img" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                  <p class="concern-empty__text">你的关注列表空空如也~</p>
                </div>
                <a class="concern-empty__footer" href="/user.html">查看全部</a>
              </div>
            </div>
          </div>
          <div class="header-avatar">
            <UserAvatarWithMenu :count="msgCount" menu-align="center" @logout="logout" />
          </div>
        </div>
      </DesktopOnly>
    </div>
  </header>
</template>

<script setup>
const { t } = useI18n()
const props = defineProps({
  isLoggedIn: { type: Boolean, default: false },
  activeMenu: { type: String, default: 'home' },
  forceSolid: { type: Boolean, default: false },
  back: { type: Boolean, default: false },
  floating: { type: Boolean, default: false }
})
const emit = defineEmits(['login', 'logout'])

const isScrolled = ref(false)
const msgCount = ref(4)
const router = useRouter()
const route = useRoute()

onMounted(() => {
  isScrolled.value = window.scrollY > 50
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

function openLogin(type) {
  emit('login', type)
}
function logout() {
  emit('logout')
}

function scrollToSection(selector) {
  const el = document.querySelector(selector)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

async function scrollToHomeSection(selector) {
  if (route.path !== '/') {
    await router.push({ path: '/', hash: selector })
    await nextTick()
    window.setTimeout(() => scrollToSection(selector), 60)
    return
  }
  scrollToSection(selector)
}

function goLiveType() {
  router.push('/liveType.html')
}

function goMatch() {
  router.push('/match.html')
}

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.clearfix::after, .float-clear::after {
  @apply block h-0 clear-both content-[''] invisible;
}
.ellipsis {
  @apply overflow-hidden whitespace-nowrap text-ellipsis;
}
.icon-svg {
  @apply w-4 h-4 inline-block align-middle mr-1;
}

.header-wrapper {
  @apply fixed top-0 left-0 w-full h-[72px] z-[100] bg-white border-b border-[rgba(229,231,235,0.85)] shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-[18px] transition-[background,box-shadow,border-color] duration-300 text-[#111827];
}
.header-wrapper--static {
  @apply relative;
}
.header-wrapper.active {
  @apply bg-white border-[rgba(229,231,235,0.85)] shadow-[0_16px_40px_rgba(15,23,42,0.08)] text-[#111827];
}
.header-wrapper .header-menu li a {
  @apply text-black;
}
.header-wrapper .header-right {
  @apply text-[#333];
}
.header-wrapper .header-right .icon-svg {
  @apply text-[#f8c21b];
}
.header-inner {
  @apply w-[1200px] mx-auto h-full p-0;
}
.header-left {
  @apply float-left h-full flex items-center;
}
.mobile-header {
  @apply hidden;
}
.header-logo-box {
  @apply float-left flex items-center h-full w-[160px] mr-[58px];
}
.header-logo-box img {
  @apply w-[160px] h-auto inline;
}
.header-logo-box img.header-logo {
  @apply hidden;
}
.header-logo-box img.header-logo-active {
  @apply inline;
}
.header-menu {
  @apply float-left h-full flex items-center;
}
.header-menu ul {
  @apply list-none text-[0];
}
.header-menu li {
  @apply inline-block h-9 leading-9 px-[18px] mx-2 text-base font-semibold cursor-pointer transition-all duration-200 rounded-full relative;
}
.header-menu li:hover,
.header-menu li.active {
  @apply text-[#111827] bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] shadow-[0_8px_18px_rgba(248,194,27,0.28)];
}
.header-menu li a {
  @apply text-black no-underline;
}
.header-menu li.download-menu {
  @apply pr-[18px];
}
.header-menu li.download-menu a {
  @apply relative;
}
.header-menu li.download-menu img.hot {
  @apply absolute -top-[12px] -right-[32px] w-[29px] h-auto;
}

.submenu {
  @apply hidden absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-[102];
}
.header-menu li.download-menu:hover .submenu,
.header-subscribe:hover .submenu,
.header-concern:hover .submenu,
.header-avatar:hover .submenu {
  @apply block;
}
.submenu-box {
  @apply bg-white/[0.96] border border-gray-200/[0.9] rounded-[14px] shadow-[0_22px_60px_rgba(15,23,42,0.14)] p-[15px] text-[#333];
}
.download-submenu-box {
  @apply w-[140px] text-center;
}
.download-submenu-box img {
  @apply w-[100px] h-[100px] mb-1.5;
}
.download-submenu-box p {
  @apply text-xs text-[#666] leading-[1.6];
}

.header-right {
  @apply float-right h-full flex items-center text-base text-white transition-colors duration-300;
}
.no-login {
  @apply flex items-center gap-2.5;
}
.header-btn {
  @apply inline-flex items-center gap-1.5 h-9 px-4 border border-slate-900/[0.2] rounded-full bg-transparent text-slate-900 text-sm font-semibold cursor-pointer transition-all duration-200;
}
.header-btn:hover {
  @apply border-amber-400 text-amber-400 -translate-y-px;
}
.header-btn .icon-svg {
  @apply w-4 h-4 shrink-0 basis-4;
}
.header-login {
  @apply bg-slate-900/[0.06] border-slate-900/[0.2];
}
.header-login:hover {
  @apply bg-slate-900/[0.1] border-amber-400 text-amber-500;
}
.header-register {
  @apply bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_100%)] border-transparent text-white shadow-[0_4px_12px_rgba(251,191,36,0.25)];
}
.header-register:hover {
  @apply text-white shadow-[0_6px_18px_rgba(251,191,36,0.4)] -translate-y-px;
}
.header-wrapper .header-btn {
  @apply text-slate-900 border-slate-900/[0.2];
}
.header-wrapper .header-login {
  @apply bg-slate-900/[0.06];
}
.header-wrapper .header-login:hover {
  @apply bg-slate-900/[0.1] border-amber-400 text-amber-500;
}
.header-wrapper .header-register {
  @apply text-white border-transparent;
}

.had-login {
  @apply flex items-center h-full;
}
.header-subscribe,
.header-concern,
.header-avatar {
  @apply relative h-full flex items-center cursor-pointer px-3;
}
.header-subscribe i,
.header-concern i {
  @apply mr-1;
}
.subscribe-none,
.concern-none {
  @apply text-center py-5 px-[30px] text-sm text-[#999];
}
.subscribe-none img,
.concern-none img {
  @apply w-[60px] h-[60px] block mx-auto mb-2.5;
}
.subscribe-submenu::before {
  @apply content-[''] absolute top-[2px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white;
}
.subscribe-submenu-box {
  @apply relative w-[360px] p-0 overflow-hidden border-0;
}
.concern-submenu {
  @apply left-auto right-0 -translate-x-0;
}
.concern-submenu::before {
  @apply content-[''] absolute top-[2px] right-10 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white;
}
.concern-submenu-box {
  @apply relative w-[360px] p-0 overflow-hidden border-0;
}
.concern-empty {
  @apply flex flex-col items-center justify-center py-10 px-6;
}
.concern-empty__img {
  @apply w-[140px] h-[120px] mb-4;
}
.concern-empty__text {
  @apply text-sm text-[#666];
}
.concern-empty__footer {
  @apply block w-full py-3 text-center text-sm text-[#333] bg-[#f8f9fa] border-t border-gray-100 no-underline hover:bg-[#f1f3f5];
}

.avatar-wrap {
  @apply relative;
}
.header-avatar img.avatar {
  @apply w-[34px] h-[34px] rounded-full object-cover;
}
.newMsg {
  @apply absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-white z-10;
}
.avatar-submenu .submenu-box {
  @apply w-auto p-0 bg-transparent border-0 shadow-none;
}

@media screen and (max-width: 1200px) {
  .header-inner {
    @apply w-full;
  }
}

@media (max-width: 768px) {
  .header-wrapper,
  .header-wrapper.active {
    @apply h-auto bg-white border-b border-gray-200/[0.9] shadow-none backdrop-blur-none text-[#111827];
  }

  .header-inner {
    @apply p-0;
  }

  .header-left,
  .header-right {
    @apply hidden;
  }

  .mobile-header {
    @apply block;
  }

  .mobile-header__top {
    @apply h-[68px] px-4 bg-white flex items-center justify-between;
  }

  .mobile-header__logo {
    @apply w-[158px] h-auto block;
  }

  .mobile-header__download {
    @apply min-w-[108px] h-[42px] px-4 rounded-md bg-[#ffc61a] text-white no-underline text-base font-extrabold inline-flex items-center justify-center;
  }

  .mobile-header__back {
    @apply appearance-none border-0 bg-transparent p-0 mr-3 text-[#111827] cursor-pointer inline-flex items-center justify-center;
  }

  .mobile-header__back svg {
    @apply w-7 h-7 block;
  }

  .mobile-header__tabs {
    @apply h-[74px] px-4 bg-white flex items-center gap-9 overflow-x-auto;
  }

  .mobile-header__tabs a {
    @apply relative shrink-0 text-[#111827] no-underline text-[22px] font-extrabold leading-none;
  }

  .mobile-header__tabs a.active::after {
    @apply content-[''] absolute left-1/2 -bottom-[14px] w-3 h-1.5 -ml-1.5 rounded-full bg-[#ffc61a];
  }
}
</style>
