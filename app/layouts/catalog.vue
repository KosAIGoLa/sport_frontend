<template>
  <div class="layout-catalog" :class="layoutClass">
    <!-- 与首页共用同一套顶栏，避免导览列样式/交互/View Transition 不一致 -->
    <SiteHeader
      :is-logged-in="isLoggedIn"
      :active-menu="headerActiveMenu"
      :force-solid="true"
      :floating="false"
      :mobile-category-base="mobileCategoryBase"
      :mobile-category-tab="activeMobileTab"
      @login="openLoginFromLayout"
      @logout="handleLogout"
    />

    <slot />

    <SiteFooter v-if="meta.footer !== false" />

    <LazyMobileStickyBar
      v-if="meta.mobileBar !== false"
      :is-logged-in="isLoggedIn"
      :active-tab="meta.mobileBarActive || 'live'"
      :hide-ad="!!meta.mobileBarHideAd"
      @login="openLoginFromLayout"
      @follow="followVisible = true"
    />

    <ClientOnly>
      <LazyMobileFollowPanel
        :visible="followVisible"
        @login="openLoginFromLayout"
        @close="followVisible = false"
      />
      <LazyLoginModal
        v-if="loginVisible"
        v-model:visible="loginVisible"
        :type="loginType"
        @success="handleLogin"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
/**
 * 分类页布局（直播分类 / 赛程）：SiteHeader + 内容 + Footer + MobileStickyBar
 * definePageMeta:
 * - catalogPage: 'live' | 'match' | 'home'
 * - mobileAriaLabel / mobileBarActive / mobileBarHideAd / headerCount
 * - layoutClass
 */
const route = useRoute()
const meta = computed(() => route.meta || {})
const layoutClass = computed(() => meta.value.layoutClass || '')
const followVisible = ref(false)

const {
  isLoggedIn,
  loginVisible,
  loginType,
  openLogin,
  handleLogin,
  handleLogout
} = useLoginModal()

function openLoginFromLayout(mode) {
  followVisible.value = false
  openLogin(mode)
}

/** 桌面顶栏高亮：live → 全部直播，match → 赛程 */
const headerActiveMenu = computed(() => {
  const page = meta.value.catalogPage
  if (page === 'match') return 'schedule'
  if (page === 'live' || page === 'home') return page === 'home' ? 'home' : 'live'
  return 'live'
})

/** 移动分类条基准路径：赛程页用 match，其余用 liveType */
const mobileCategoryBase = computed(() => (
  meta.value.catalogPage === 'match' ? '/match.html' : '/liveType.html'
))

const activeMobileTab = computed(() => {
  if (meta.value.activeMobileTab) return meta.value.activeMobileTab
  const tab = typeof route.query.tab === 'string' ? route.query.tab : ''
  return ['足球', '篮球', '分析'].includes(tab) ? tab : '全部'
})
</script>
