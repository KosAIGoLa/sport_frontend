<template>
  <div class="live-type-page" :style="{ '--live-title': `'${t('page.liveCenterTitle')}'`, '--live-subtitle': `'${t('page.liveCenterSubtitle')}'` }">
    <PageHeader page="live" :is-logged-in="isLoggedIn" :count="4" :active-mobile-tab="mobileTab" mobile-aria-label="直播分类" @login="openLogin" @logout="isLoggedIn = false" />
    <main class="live-type-main">
      <LiveCategory
        title-image="/assets/hot-live.png"
        :title-alt="t('page.allLive')"
        more-link="/liveType.html"
        :lives="allLives"
        :show-filter="!isMobileView"
        :categories="[t('nav.all'), t('nav.football'), t('nav.basketball'), t('nav.analysis')]"
        :initial-category="initialCategory"
      />
    </main>
    <SiteFooter />
    <LoginModal
      v-model:visible="loginVisible"
      :type="loginType"
      @success="isLoggedIn = true; loginVisible = false"
    />
    <MobileStickyBar :is-logged-in="isLoggedIn" active-tab="live" @login="openLogin" />
  </div>
</template>

<script setup>
definePageMeta({
  path: '/liveType.html'
})

const { t } = useI18n()
useHead(() => ({
  title: t('page.titleLive')
}))
const isLoggedIn = ref(false)
const loginVisible = ref(false)
const loginType = ref('login')
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
.live-type-main {
  @apply relative py-[42px] px-0 pb-[72px];
}

.live-type-main::before {
  content: var(--live-title);
  @apply block w-[1200px] mx-auto mb-2 text-slate-900 text-[30px] font-[850] tracking-[-0.4px];
}

.live-type-main::after {
  content: var(--live-subtitle);
  @apply block w-[1200px] -mt-0.5 mx-auto mb-1 text-slate-500 text-sm;
}

@media screen and (max-width: 1400px) {
  .live-type-main::before,
  .live-type-main::after {
    @apply w-[960px];
  }
}

@media (max-width: 768px) {
  .live-type-page {
    @apply bg-[#f5f5f5];
  }
  .live-type-main::before,
  .live-type-main::after {
    @apply hidden;
  }
  .live-type-main {
    @apply py-5 px-0 pb-[152px];
  }
}
</style>
