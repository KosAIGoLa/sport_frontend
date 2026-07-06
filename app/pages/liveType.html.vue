<template>
  <div class="live-type-page">
    <header class="live-header">
      <div class="live-header-inner">
        <MobileOnly tag="div" class="live-mobile-head">
          <div class="live-mobile-top">
            <img class="live-mobile-logo" src="/assets/logo-mobile-wap.png" alt="857直播">
            <a class="live-mobile-download" href="/download" target="_blank" rel="noopener noreferrer">下载APP</a>
          </div>
          <nav class="live-mobile-tabs" aria-label="直播分类">
            <NuxtLink :class="{ active: mobileTab === '全部' }" to="/liveType.html">全部</NuxtLink>
            <NuxtLink :class="{ active: mobileTab === '足球' }" to="/liveType.html?tab=足球">足球</NuxtLink>
            <NuxtLink :class="{ active: mobileTab === '篮球' }" to="/liveType.html?tab=篮球">篮球</NuxtLink>
            <NuxtLink :class="{ active: mobileTab === '分析' }" to="/liveType.html?tab=分析">分析</NuxtLink>
          </nav>
        </MobileOnly>
        <DesktopOnly tag="a" class="live-logo" href="/">
          <img src="/assets/logo2.png" alt="857直播">
        </DesktopOnly>
        <DesktopOnly tag="nav" class="live-nav">
          <NuxtLink to="/">首页</NuxtLink>
          <NuxtLink class="active" to="/liveType.html">全部直播</NuxtLink>
          <NuxtLink to="/match.html">赛程</NuxtLink>
          <a class="download" href="/download" target="_blank" rel="noopener noreferrer">
            <span>
              下载APP
              <img src="/assets/hot.png" alt="hot">
            </span>
          </a>
        </DesktopOnly>
        <DesktopOnly tag="div" class="live-auth">
          <button type="button" class="login-btn" @click="openLogin('login')">登录</button>
          <button type="button" @click="openLogin('register')">注册</button>
        </DesktopOnly>
      </div>
    </header>
    <main class="live-type-main">
      <LiveCategory
        title-image="/assets/hot-live.png"
        title-alt="全部直播"
        more-link="/liveType.html"
        :lives="allLives"
        :show-filter="!isMobileView"
        :categories="['全部', '足球', '篮球', '分析']"
        :initial-category="initialCategory"
      />
    </main>
    <SiteFooter />
    <LoginModal
      v-model:visible="loginVisible"
      :type="loginType"
      @success="isLoggedIn = true"
    />
    <MobileStickyBar :is-logged-in="isLoggedIn" active-tab="live" @login="openLogin" @follow="followVisible = true" />
    <MobileFollowPanel :visible="followVisible" @login="openLogin" />
  </div>
</template>

<script setup>
definePageMeta({
  path: '/liveType.html'
})

const isLoggedIn = ref(false)
const loginVisible = ref(false)
const loginType = ref('login')
const followVisible = ref(false)
const route = useRoute()
const isMobileView = ref(false)

const mobileTab = computed(() => {
  const tab = typeof route.query.tab === 'string' ? route.query.tab : ''
  return ['足球', '篮球', '分析'].includes(tab) ? tab : '全部'
})

const initialCategory = computed(() => {
  const tab = typeof route.query.tab === 'string' ? route.query.tab : ''
  return ['足球', '篮球', '分析'].includes(tab) ? tab : '全部'
})

onMounted(() => {
  const updateViewport = () => {
    isMobileView.value = window.innerWidth <= 768
  }
  updateViewport()
  window.addEventListener('resize', updateViewport, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('resize', updateViewport))
})

function openLogin(type) {
  followVisible.value = false
  loginType.value = type
  loginVisible.value = true
}

const allLives = [
  { title: '爱沙甲 潭美卡VS哈留足球学院', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240222/23a0fd3943d7d814ba5f46a3c316dd25.png', anchor: '司马老贼', viewers: '5.20w', tag: '足球' },
  { title: '哈萨克超 卡萨尔vs伊特什', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20251112/7c61f9874371fec5fd7b73df63fb23e5.jpg', anchor: '大帝', viewers: '8.52w', tag: '足球' },
  { title: '英超 曼城 VS 阿森纳', cover: 'https://sta.ncctrials.com/file/common/20260705/da243db7abd0bf0d3660c1766abf1908_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a.jpg', anchor: '评述员阿虎', viewers: '11.10w', tag: '足球' },
  { title: 'NBA 湖人 VS 勇士', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240224/100ce75e32ce79c21e3baa33db3c9220.jpg', anchor: '篮球小王', viewers: '3.80w', tag: '篮球' },
  { title: 'CBA 广东 VS 辽宁', cover: 'https://sta.ncctrials.com/file/common/20260627/f41c9604ab224cf5c9daeaff94356933_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a.jpg', anchor: '阿虎', viewers: '2.50w', tag: '篮球' },
  { title: '老万每日赛事分析', cover: 'https://sta.ncctrials.com/file/common/20230217/7045823059a1d115eda50c8c616609da_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20221025/fd6967ccf7f83828c033c6b7a9358733.jpeg', anchor: '老万', viewers: '6.31w', tag: '分析' },
  { title: '临场解盘：瑞典超焦点战', cover: 'https://sta.ncctrials.com/file/common/20250805/b38bb3088a743ba2aef1ea3df0e3a24d_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20201128/2aac51efa098872b4ddb9c1c32d9bce5', anchor: '都教授', viewers: '4.10w', tag: '分析' },
  { title: '盘口变化深度解读', cover: 'https://sta.ncctrials.com/file/common/20260509/cbed26223a5f4dedba17eab9339d2c4c_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20251116/468aac5f8b85b1e54a7809040714b36d.jpg', anchor: '老仙儿', viewers: '3.20w', tag: '分析' },
  { title: '今日足篮大势分析', cover: 'https://sta.ncctrials.com/file/common/20230903/2e26b7c3627616ee952f2c64268762d8_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20230902/b6105a741b54f02e02fc3b707e0e45f9.jpg', anchor: '伊布', viewers: '1.80w', tag: '分析' },
  { title: '粉丝连麦互动分析', cover: 'https://sta.ncctrials.com/file/common/20260617/05cbb9832bf92bb680f116b1627b38fd_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20260505/ec8e8b84c119776b0cd89ee656926636.png', anchor: '蓝狐', viewers: '0.90w', tag: '分析' }
]

</script>

<style scoped>
.live-type-page {
  @apply min-h-screen text-[#111827];
  background: radial-gradient(circle at 12% 0%, rgba(255, 199, 28, 0.18), transparent 28%), radial-gradient(circle at 86% 12%, rgba(33, 138, 255, 0.14), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #eef3f9 52%, #f8fafc 100%);
}

.live-header {
  @apply sticky top-0 z-[100] h-[72px] bg-white/[0.86] border-b border-slate-200/[0.9] shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-[18px];
}

.live-header-inner {
  @apply w-[1200px] h-full mx-auto flex items-center;
}

.live-logo {
  @apply flex items-center mr-[58px];
}

.live-mobile-head {
  @apply hidden;
}

.live-logo img {
  @apply w-[160px] h-auto block;
}

.live-nav {
  @apply h-full flex items-center gap-4 text-base font-[650];
}

.live-nav a {
  @apply relative h-9 px-[18px] leading-9 text-[#111827] no-underline rounded-full whitespace-nowrap transition-all duration-200;
}

.live-nav a:hover,
.live-nav a.active {
  @apply text-[#111827] bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] shadow-[0_8px_18px_rgba(248,194,27,0.28)];
}

.live-nav a.download {
  @apply text-amber-500;
}

.live-nav a.download span {
  @apply relative;
}
.live-nav a.download img {
  @apply absolute -top-[12px] -right-[32px] w-[29px] h-auto;
}

.live-auth {
  @apply ml-auto flex items-center gap-2.5;
}

.live-auth button {
  @apply appearance-none h-[34px] border border-slate-200/[0.9] rounded-full bg-white/[0.72] px-3.5 text-[#111827] text-sm font-bold cursor-pointer transition-all duration-200;
}

.live-auth button:hover {
  @apply border-[rgba(255,194,28,0.8)] bg-[#fff7d6];
}

.live-auth .login-btn::before {
  @apply content-[''] inline-block w-2 h-2 mr-1.5 bg-green-500 rounded-full align-[1px] shadow-[0_0_0_5px_rgba(34,197,94,0.12)];
}

.live-type-main {
  @apply relative py-[42px] px-0 pb-[72px];
}

.live-type-main::before {
  @apply content-['全部直播'] block w-[1200px] mx-auto mb-2 text-slate-900 text-[30px] font-[850] tracking-[-0.4px];
}

.live-type-main::after {
  @apply content-['精选赛事直播间，热门主播实时开播'] block w-[1200px] -mt-0.5 mx-auto mb-1 text-slate-500 text-sm;
}

@media screen and (max-width: 1400px) {
  .live-header-inner,
  .live-type-main::before,
  .live-type-main::after {
    @apply w-[960px];
  }
}

@media (max-width: 768px) {
  .live-type-page {
    @apply bg-[#f5f5f5];
  }

  .live-header {
    @apply h-auto bg-transparent border-b-0 shadow-none backdrop-blur-none;
  }

  .live-header-inner {
    @apply w-full p-0;
  }

  .live-mobile-head {
    @apply block w-full;
  }

  .live-mobile-top {
    @apply h-[68px] px-4 bg-[rgba(32,33,36,0.9)] backdrop-blur-[10px] flex items-center justify-between;
  }

  .live-mobile-logo {
    @apply w-[158px] h-auto block;
  }

  .live-mobile-download {
    @apply min-w-[108px] h-[42px] px-4 rounded-md bg-[#ffc61a] text-white no-underline text-base font-extrabold inline-flex items-center justify-center;
  }

  .live-mobile-tabs {
    @apply h-[74px] px-4 bg-[rgba(255,198,26,0.92)] backdrop-blur-[10px] flex items-center gap-[38px] overflow-x-auto;
  }

  .live-mobile-tabs a {
    @apply relative shrink-0 text-white no-underline text-[22px] font-extrabold leading-none;
  }

  .live-mobile-tabs a.active::after {
    @apply content-[''] absolute left-1/2 -bottom-[14px] w-3 h-1.5 -ml-1.5 rounded-full bg-white;
  }

  .live-logo,
  .live-nav,
  .live-auth,
  .live-type-main::before,
  .live-type-main::after {
    @apply hidden;
  }

  .live-type-main {
    @apply py-5 px-0 pb-[152px];
  }
}
</style>
