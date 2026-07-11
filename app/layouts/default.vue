<template>
  <div class="layout-default" :class="layoutClass">
    <SiteHeader
      v-if="meta.siteHeader !== false"
      :is-logged-in="isLoggedIn"
      :active-menu="meta.activeMenu ?? undefined"
      :force-solid="!!meta.forceSolid"
      :back="!!meta.back"
      :floating="!!meta.floatingHeader"
      @login="openLoginFromLayout"
      @logout="handleLogout"
    />

    <slot />

    <ClientOnly v-if="meta.rightFix">
      <LazyRightFix :is-logged-in="isLoggedIn" @login="openLoginFromLayout" />
    </ClientOnly>

    <SiteFooter v-if="meta.footer !== false" />

    <LazyMobileStickyBar
      v-if="meta.mobileBar"
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
 * 默认布局：SiteHeader + 页面内容 + SiteFooter + LoginModal + MobileFollowPanel
 * 通过 definePageMeta 控制变体：
 * - siteHeader / footer / forceSolid / back / activeMenu
 * - floatingHeader：true 时顶栏 fixed 悬浮（首页 hero 用）
 * - rightFix / mobileBar / mobileBarActive / mobileBarHideAd
 * - layoutClass：页面根 class
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
</script>
