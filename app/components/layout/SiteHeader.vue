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
          <a
            class="mobile-header__logo-link"
            href="/"
            @click.prevent="appNavigate('/')"
          >
            <img class="mobile-header__logo" src="/assets/logos/logo2.png" alt="857直播">
          </a>
          <a
            class="mobile-header__download"
            href="/download"
            @click.prevent="appNavigate('/download')"
          >{{ t('nav.downloadApp') }}</a>
        </div>
        <nav v-if="!back" class="mobile-header__tabs" :aria-label="mobileCategoryAria">
          <a
            v-for="tab in mobileCategoryTabs"
            :key="tab.key"
            :href="tab.href"
            :class="{ active: mobileCategoryTab === tab.key }"
            @click.prevent="goMobileCategory(tab.href)"
          >{{ tab.label }}</a>
        </nav>
      </MobileOnly>
      <DesktopOnly tag="div" class="header-left">
        <div class="header-logo-box">
          <img class="header-logo" src="/assets/logos/logo.png" alt="857直播">
          <img class="header-logo-active" src="/assets/logos/logo2.png" alt="857直播">
        </div>
        <NavMenu :active="activeMenu" />
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
            <IconFollow icon-class="icon-svg" />
            <span>{{ t('nav.follow') }}</span>
            <div class="submenu subscribe-submenu">
              <div class="submenu-box subscribe-submenu-box">
                <template v-if="followItems.length">
                  <div class="concern-list">
                    <a
                      v-for="item in followItems"
                      :key="item.id"
                      :href="item.link"
                      class="concern-item"
                      @click.prevent="appNavigate(item.link)"
                    >
                      <div class="concern-item__title">{{ item.title }}</div>
                      <div class="concern-item__meta">
                        <span class="concern-item__meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          已播 {{ item.days }} 天
                        </span>
                        <span class="concern-item__meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          {{ item.author }}
                        </span>
                        <span class="concern-item__meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 0-7 4-7 11v8l7-3 7 3v-8C19 6 12 2 12 2z"/><path d="M12 14l2-2-2-2"/></svg>
                          {{ item.heat }}
                        </span>
                      </div>
                    </a>
                  </div>
                </template>
                <template v-else>
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
                </template>
                <a class="concern-empty__footer" href="/user.html?menu=follow" @click.prevent="appNavigate('/user.html?menu=follow')">查看全部</a>
              </div>
            </div>
          </div>
          <div class="header-concern">
            <IconHistory icon-class="icon-svg" />
            <span>{{ t('nav.history') }}</span>
            <div class="submenu concern-submenu">
              <div class="submenu-box concern-submenu-box">
                <template v-if="historyItems.length">
                  <div class="concern-list">
                    <a
                      v-for="item in historyItems"
                      :key="item.id"
                      :href="item.link"
                      class="concern-item"
                      @click.prevent="appNavigate(item.link)"
                    >
                      <div class="concern-item__title">{{ item.title }}</div>
                      <div class="concern-item__meta">
                        <span class="concern-item__meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><polygon points="10 9 16 12 10 15 10 9"/></svg>
                          {{ item.timeAgo }}
                        </span>
                        <span class="concern-item__meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                          {{ item.author }}
                        </span>
                        <span class="concern-item__meta-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                          {{ item.heat }}
                        </span>
                      </div>
                    </a>
                  </div>
                </template>
                <template v-else>
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
                    <p class="concern-empty__text">你的历史列表空空如也~</p>
                  </div>
                </template>
                <a class="concern-empty__footer" href="/user.html?menu=history" @click.prevent="appNavigate('/user.html?menu=history')">查看全部</a>
              </div>
            </div>
          </div>
          <div class="header-avatar">
            <UserAvatarWithMenu :count="msgCount" menu-align="right" @logout="logout" />
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
  activeMenu: { type: String, default: '' },
  forceSolid: { type: Boolean, default: false },
  back: { type: Boolean, default: false },
  floating: { type: Boolean, default: false },
  /** 移动分类条基准路径，默认全部直播 */
  mobileCategoryBase: { type: String, default: '/liveType.html' },
  /** 移动分类当前 tab：全部 | 足球 | 篮球 | 分析 */
  mobileCategoryTab: { type: String, default: '全部' }
})
const emit = defineEmits(['login', 'logout'])

const isScrolled = ref(false)
const msgCount = ref(4)
const router = useRouter()
const route = useRoute()

const mobileCategoryAria = computed(() => (
  props.mobileCategoryBase.includes('match') ? '赛程分类' : '直播分类'
))

const mobileCategoryTabs = computed(() => {
  const base = props.mobileCategoryBase || '/liveType.html'
  return [
    { key: '全部', label: t('nav.all'), href: base },
    { key: '足球', label: t('nav.football'), href: `${base}?tab=足球` },
    { key: '篮球', label: t('nav.basketball'), href: `${base}?tab=篮球` },
    { key: '分析', label: t('nav.analysis'), href: `${base}?tab=分析` }
  ]
})

const { appNavigate, sameAppPath } = useAppNavigate()

async function goMobileCategory(href) {
  if (sameAppPath(href)) return
  await appNavigate(href)
}

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

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    appNavigate('/')
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
/* 非悬浮：进入文档流，页面内容不再需要为顶栏预留 padding */
.header-wrapper--static {
  @apply relative top-auto left-auto w-full;
}
.header-wrapper.active {
  @apply bg-white border-[rgba(229,231,235,0.85)] shadow-[0_16px_40px_rgba(15,23,42,0.08)] text-[#111827];
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
  @apply float-left h-full flex items-center gap-2;
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

.submenu {
  @apply hidden absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-[102];
}
.header-subscribe:hover .submenu,
.header-concern:hover .submenu,
.header-avatar:hover .submenu {
  @apply block;
}
.submenu-box {
  @apply bg-white/[0.96] border border-gray-200/[0.9] rounded-[14px] shadow-[0_22px_60px_rgba(15,23,42,0.14)] p-[15px] text-[#333];
}

.header-right {
  @apply float-right h-full flex items-center text-base text-white transition-colors duration-300;
}
.no-login {
  @apply flex items-center gap-2;
}
.header-btn {
  @apply appearance-none inline-flex items-center gap-1.5 h-9 px-4 rounded-full border border-slate-200 bg-white text-[#374151] text-sm font-semibold cursor-pointer transition-all duration-200 shadow-none;
}
.header-btn .icon-svg,
.header-wrapper .header-right .header-btn .icon-svg {
  @apply w-4 h-4 shrink-0 basis-4 mr-0 text-[#9ca3af];
}
.header-login,
.header-register {
  @apply border-slate-200 bg-white text-[#374151];
}
.header-login:hover,
.header-register:hover {
  @apply border-[rgba(243,182,31,0.55)] bg-[#fffbeb] text-[#6b5a1e];
}
.header-login:hover .icon-svg,
.header-register:hover .icon-svg,
.header-wrapper .header-right .header-login:hover .icon-svg,
.header-wrapper .header-right .header-register:hover .icon-svg {
  @apply text-[#d4a017];
}

.had-login {
  @apply flex items-center h-full;
}
.header-subscribe,
.header-concern {
  @apply relative h-full flex items-center cursor-pointer px-3;
}
/* 登录后大头：固定 40x40 容器，右对齐下拉，避免 flex 撑开变形 */
.header-avatar {
  @apply relative h-full w-10 flex items-center justify-center cursor-pointer ml-1 shrink-0;
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
/* 四边 border 三角：贴住下拉弹窗顶部（三边写法会悬空） */
.subscribe-submenu::before {
  content: '';
  display: block;
  position: absolute;
  top: -6px;
  left: 50%;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-bottom-color: #fff;
}
.subscribe-submenu-box {
  @apply relative w-[360px] p-0 overflow-hidden border-0;
}
.concern-submenu {
  @apply left-auto right-0 -translate-x-0;
}
.concern-submenu::before {
  content: '';
  display: block;
  position: absolute;
  top: -6px;
  right: 40px;
  left: auto;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  border: 8px solid transparent;
  border-bottom-color: #fff;
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
.concern-list {
  @apply py-2;
}
.concern-item {
  @apply block px-5 py-3 no-underline border-b border-gray-100 last:border-b-0 hover:bg-[#f8f9fa] transition-colors;
}
.concern-item__title {
  @apply text-sm text-[#333] font-medium truncate mb-2;
}
.concern-item__meta {
  @apply flex items-center gap-4 text-xs text-[#999];
}
.concern-item__meta-item {
  @apply flex items-center gap-1;
}
.concern-item__meta-item svg {
  @apply w-3.5 h-3.5;
}

.avatar-wrap {
  @apply relative;
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
    @apply h-[60px] px-4 bg-white flex items-center justify-between;
  }

  .mobile-header__logo-link {
    @apply inline-flex items-center;
  }

  .mobile-header__logo {
    @apply w-[136px] h-auto block;
  }

  .mobile-header__download {
    @apply min-w-[96px] h-[36px] px-3 rounded-md bg-[#f3b61f] text-white no-underline text-[14px] font-extrabold inline-flex items-center justify-center;
  }

  .mobile-header__back {
    @apply appearance-none border-0 bg-transparent p-0 mr-3 text-[#111827] cursor-pointer inline-flex items-center justify-center;
  }

  .mobile-header__back svg {
    @apply w-6 h-6 block;
  }

  .mobile-header__tabs {
    @apply h-[58px] px-4 bg-white flex items-center gap-6 overflow-x-auto;
  }

  .mobile-header__tabs a {
    @apply relative shrink-0 text-[#111827] no-underline text-[16px] font-bold leading-none;
  }

  .mobile-header__tabs a.active::after {
    @apply content-[''] absolute left-1/2 -bottom-[10px] w-2.5 h-1 -ml-1.5 rounded-full bg-[#f3b61f];
  }
}
</style>
