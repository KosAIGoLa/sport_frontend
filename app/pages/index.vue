<template>
  <div class="index-wrapper">
    <SiteHeader
      :is-logged-in="isLoggedIn"
      @login="openLogin"
      @logout="isLoggedIn = false"
    />
    <main>
      <HeroSection id="living-room" />
      <AppointmentList id="schedule" />
      <HotLives />
      <HotAnchors />
      <LiveCategory id="football-live" title-image="/assets/football-live.png" :title-alt="t('page.footballLive')" :lives="footballLives" />
      <LiveCategory id="all-live" title-image="/assets/hot-live.png" :title-alt="t('page.allLive')" more-link="/liveType.html" :lives="allLives" />
    </main>
    <RightFix :is-logged-in="isLoggedIn" @login="openLogin" />
    <SiteFooter />
    <MobileStickyBar
      :is-logged-in="isLoggedIn"
      @login="openLogin"
    />
    <LoginModal
      v-model:visible="loginVisible"
      :type="loginType"
      @success="isLoggedIn = true"
    />
  </div>
</template>

<script setup>
const { t, locale } = useI18n()
useHead(() => ({
  title: t('page.titleHome')
}))
const isLoggedIn = ref(false)
const loginVisible = ref(false)
const loginType = ref('login')

const footballLives = [
  { title: '欧青U19 乌克兰U19 VS 意大利U19', cover: 'https://sta.ncctrials.com/file/common/20260627/f41c9604ab224cf5c9daeaff94356933_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240224/100ce75e32ce79c21e3baa33db3c9220.jpg', anchor: '大熊', viewers: '5.35w', tag: '' },
  { title: '哈萨超 奥达巴斯 VS 乌利塔哲', cover: 'https://sta.ncctrials.com/file/common/20260303/774b2c98662ad80b7ac079e3662dc605_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20260228/1d35c871f0eae83d76dc1c6c7e30e174.jpg', anchor: '蓝狐', viewers: '5.16w', tag: '推荐' },
  { title: '哈萨克超：奥达巴斯vs乌雷套', cover: 'https://sta.ncctrials.com/file/common/20250805/b38bb3088a743ba2aef1ea3df0e3a24d_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20201128/2aac51efa098872b4ddb9c1c32d9bce5', anchor: '都教授', viewers: '8.28w', tag: '推荐' },
  { title: '瑞典超 埃尔夫斯堡VS哈马比', cover: 'https://sta.ncctrials.com/file/common/20260705/da243db7abd0bf0d3660c1766abf1908_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a.jpg', anchor: '评述员阿虎', viewers: '11.10w', tag: '推荐' },
  { title: '爱沙甲 潭美卡VS哈留足球学院', cover: 'https://sta.ncctrials.com/file/common/20230903/2e26b7c3627616ee952f2c64268762d8_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20230902/b6105a741b54f02e02fc3b707e0e45f9.jpg', anchor: '伊布', viewers: '5.17w', tag: '' }
]

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

function openLogin(type) {
  loginType.value = type
  loginVisible.value = true
}
</script>

<style>
html {
  @apply scroll-smooth;
}
body {
  @apply m-0 p-0 font-sans text-[#111827] antialiased;
  background: radial-gradient(circle at 12% 8%, rgba(255, 199, 28, 0.16), transparent 28%), radial-gradient(circle at 88% 18%, rgba(33, 138, 255, 0.14), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #eef3f9 42%, #f8fafc 100%);
  text-rendering: optimizeLegibility;
}
* {
  @apply box-border;
}
a {
  @apply text-inherit;
}
ul,
ol,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply m-0 p-0;
}
.index-wrapper {
  @apply min-h-screen overflow-x-hidden pb-8;
}
main {
  @apply pt-0;
}
::selection {
  @apply bg-[rgba(255,199,28,0.35)];
}

@media (max-width: 768px) {
  body {
    @apply bg-[#f5f5f5];
  }

  .index-wrapper {
    @apply pb-[152px];
  }
}
</style>
