<template>
  <header class="header-wrapper" :class="{ active: isScrolled || forceSolid }">
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
            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
            <span>{{ t('nav.appointment') }}</span>
            <div class="submenu subscribe-submenu">
              <div class="submenu-box">
                <div class="subscribe-none">
                  <img src="/assets/none.png" alt="">
                  <span>{{ t('common.empty') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="header-concern">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>{{ t('nav.follow') }}</span>
            <div class="submenu concern-submenu">
              <div class="submenu-box">
                <div class="concern-none">
                  <img src="/assets/none.png" alt="">
                  <span>{{ t('common.empty') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="header-avatar">
            <img class="special-avatar avatar" src="/assets/avatar.png" alt="avatar">
            <div class="newMsg"></div>
            <div class="submenu avatar-submenu">
              <div class="submenu-box">
                <div class="top float-clear">
                  <div class="top-up float-clear">
                    <img class="avatar" src="/assets/avatar.png" alt="">
                    <span class="nickname ellipsis">DH0ZGW</span>
                    <div class="identity">主播</div>
                    <div class="btn-logout" @click="logout">{{ t('auth.logout') }}</div>
                  </div>
                  <div class="top-down">
                    <progress class="grow-progress" value="1" max="200"></progress>
                    <div class="grow-box">
                      <span class="text">经验值</span>
                      <span class="cur-grow">1</span>
                      <span>/</span>
                      <span class="max-grow">200</span>
                    </div>
                    <div class="grow-tip">
                      <span>还差</span>
                      <span class="diff-grow">199</span>
                      <span>经验到下一等级</span>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <div class="bottom-btn ucenter">
                    <div class="icon home-icon"></div>
                    <span>个人中心</span>
                    <div class="msg-num singular"></div>
                  </div>
                  <div class="bottom-btn concern">
                    <div class="icon concern-icon"></div>
                    <span>我的关注</span>
                  </div>
                  <div class="bottom-btn subscribe">
                    <div class="icon subscribe-icon"></div>
                    <span>我的预约</span>
                  </div>
                </div>
                <div class="anchor-center">
                  <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                  <span>主播中心</span>
                </div>
              </div>
            </div>
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
  back: { type: Boolean, default: false }
})
const emit = defineEmits(['login', 'logout'])

const isScrolled = ref(false)
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

.header-avatar img.avatar {
  @apply w-[34px] h-[34px] rounded-full object-cover;
}
.avatar-submenu .submenu-box {
  @apply w-[220px] p-0;
}
.avatar-submenu .top {
  @apply p-[15px] border-b border-[#f0f0f0];
}
.avatar-submenu .top-up {
  @apply relative mb-2.5;
}
.avatar-submenu .top-up img.avatar {
  @apply w-12 h-12 float-left mr-2.5;
}
.avatar-submenu .nickname {
  @apply block text-sm text-[#333] max-w-[80px];
}
.avatar-submenu .identity {
  @apply inline-block text-xs text-white bg-[#f8c21b] py-0.5 px-1.5 rounded-[3px] mt-1;
}
.avatar-submenu .btn-logout {
  @apply float-right text-xs text-[#999] cursor-pointer mt-1.5;
}
.avatar-submenu .btn-logout:hover {
  @apply text-[#f8c21b];
}
.grow-progress {
  @apply w-full h-1 mb-1.5 rounded-sm;
}
.grow-box {
  @apply text-xs text-[#999] mb-1;
}
.grow-tip {
  @apply text-xs text-[#f8c21b];
}
.avatar-submenu .bottom {
  @apply py-2.5 px-[15px] border-b border-[#f0f0f0];
}
.bottom-btn {
  @apply flex items-center py-2 text-[13px] text-[#555] cursor-pointer;
}
.bottom-btn:hover {
  @apply text-[#f8c21b];
}
.bottom-btn .icon {
  @apply w-[18px] h-[18px] mr-2.5 bg-contain bg-no-repeat bg-center;
}
.home-icon {
  @apply bg-[url('/assets/icon-home.png')];
}
.concern-icon {
  @apply bg-[url('/assets/icon-concern.png')];
}
.subscribe-icon {
  @apply bg-[url('/assets/icon-subscribe.png')];
}
.bottom-btn:hover .home-icon {
  @apply bg-[url('/assets/icon-home-active.png')];
}
.bottom-btn:hover .concern-icon {
  @apply bg-[url('/assets/icon-concern-active.png')];
}
.bottom-btn:hover .subscribe-icon {
  @apply bg-[url('/assets/icon-subscribe-active.png')];
}
.anchor-center {
  @apply py-3 px-[15px] text-[13px] text-white bg-[#f8c21b] text-center cursor-pointer rounded-b-md flex items-center justify-center;
}
.anchor-center svg {
  @apply mr-1.5;
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
