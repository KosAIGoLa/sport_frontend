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
            <a :class="{ active: mobileTab === '推荐' }" href="/">推荐</a>
            <a :class="{ active: mobileTab === '足球' }" href="/liveType.html?tab=足球">足球</a>
            <a :class="{ active: mobileTab === '篮球' }" href="/liveType.html?tab=篮球">篮球</a>
            <a :class="{ active: mobileTab === '分析' }" href="/liveType.html?tab=分析">分析</a>
          </nav>
        </MobileOnly>
        <DesktopOnly tag="a" class="live-logo" href="/">
          <img src="/assets/logo2.png" alt="857直播">
        </DesktopOnly>
        <DesktopOnly tag="nav" class="live-nav">
          <a href="/">首页</a>
          <a class="active" href="/liveType.html">全部直播</a>
          <a href="/match.html">赛程</a>
          <a class="download" href="/download" target="_blank" rel="noopener noreferrer">
            下载APP
            <img src="/assets/hot.png" alt="hot">
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
  return ['足球', '篮球', '分析'].includes(tab) ? tab : '推荐'
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
  min-height: 100vh;
  background:
    radial-gradient(circle at 12% 0%, rgba(255, 199, 28, 0.18), transparent 28%),
    radial-gradient(circle at 86% 12%, rgba(33, 138, 255, 0.14), transparent 30%),
    linear-gradient(180deg, #f8fafc 0%, #eef3f9 52%, #f8fafc 100%);
  color: #111827;
}

.live-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 72px;
  background: rgba(255, 255, 255, 0.86);
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(18px);
}

.live-header-inner {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.live-logo {
  display: flex;
  align-items: center;
  margin-right: 58px;
}

.live-mobile-head {
  display: none;
}

.live-logo img {
  width: 160px;
  height: auto;
  display: block;
}

.live-nav {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  font-weight: 650;
}

.live-nav a {
  position: relative;
  height: 36px;
  padding: 0 18px;
  line-height: 36px;
  color: #111827;
  text-decoration: none;
  border-radius: 999px;
  white-space: nowrap;
  transition: all 0.2s;
}

.live-nav a:hover,
.live-nav a.active {
  color: #111827;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  box-shadow: 0 8px 18px rgba(248, 194, 27, 0.28);
}

.live-nav a.download {
  color: #f59e0b;
}

.live-nav a.download img {
  position: absolute;
  top: -7px;
  right: -23px;
  width: 29px;
  height: auto;
}

.live-auth {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.live-auth button {
  appearance: none;
  height: 34px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  padding: 0 14px;
  color: #111827;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.live-auth button:hover {
  border-color: rgba(255, 194, 28, 0.8);
  background: #fff7d6;
}

.live-auth .login-btn::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 6px;
  background: #22c55e;
  border-radius: 50%;
  vertical-align: 1px;
  box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.12);
}

.live-type-main {
  position: relative;
  padding: 42px 0 72px;
}

.live-type-main::before {
  content: '全部直播';
  display: block;
  width: 1200px;
  margin: 0 auto 8px;
  color: #0f172a;
  font-size: 30px;
  font-weight: 850;
  letter-spacing: -0.4px;
}

.live-type-main::after {
  content: '精选赛事直播间，热门主播实时开播';
  display: block;
  width: 1200px;
  margin: -2px auto 4px;
  color: #64748b;
  font-size: 14px;
}

@media screen and (max-width: 1400px) {
  .live-header-inner,
  .live-type-main::before,
  .live-type-main::after {
    width: 960px;
  }
}

@media (max-width: 768px) {
  .live-type-page {
    background: #f5f5f5;
  }

  .live-header {
    height: auto;
    background: transparent;
    border-bottom: 0;
    box-shadow: none;
    backdrop-filter: none;
  }

  .live-header-inner {
    width: 100%;
    padding: 0;
  }

  .live-mobile-head {
    display: block;
    width: 100%;
  }

  .live-mobile-top {
    height: 68px;
    padding: 0 16px;
    background: rgba(32, 33, 36, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .live-mobile-logo {
    width: 158px;
    height: auto;
    display: block;
  }

  .live-mobile-download {
    min-width: 108px;
    height: 42px;
    padding: 0 16px;
    border-radius: 6px;
    background: #ffc61a;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .live-mobile-tabs {
    height: 74px;
    padding: 0 16px;
    background: rgba(255, 198, 26, 0.92);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 38px;
    overflow-x: auto;
  }

  .live-mobile-tabs a {
    position: relative;
    flex: 0 0 auto;
    color: #fff;
    text-decoration: none;
    font-size: 22px;
    font-weight: 800;
    line-height: 1;
  }

  .live-mobile-tabs a.active::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -14px;
    width: 12px;
    height: 6px;
    margin-left: -6px;
    border-radius: 999px;
    background: #fff;
  }

  .live-logo,
  .live-nav,
  .live-auth,
  .live-type-main::before,
  .live-type-main::after {
    display: none;
  }

  .live-type-main {
    padding: 20px 0 152px;
  }
}
</style>
