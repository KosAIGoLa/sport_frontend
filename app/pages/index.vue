<template>
  <div class="index-wrapper">
    <main>
      <HeroSection id="living-room" />
      <AnchorNotice />
      <LazyAppointmentList id="schedule" />
      <LazyHotLives />
      <LazyHotAnchors />
      <LazyLiveCategory
        id="football-live"
        title-image="/assets/brand/football-live.png"
        :title-alt="t('page.footballLive')"
        :lives="FOOTBALL_LIVES"
      />
      <LazyLiveCategory
        id="all-live"
        title-image="/assets/brand/hot-live.png"
        :title-alt="t('page.allLive')"
        more-link="/liveType.html"
        :lives="ALL_LIVES"
      />
    </main>
  </div>
</template>

<script setup>
import { FOOTBALL_LIVES, ALL_LIVES } from '~/data/lives'

definePageMeta({
  layout: 'default',
  activeMenu: 'home',
  /** 首页顶栏 fixed 悬浮，hero 背景可铺到顶栏下方 */
  floatingHeader: true,
  rightFix: true,
  mobileBar: true,
  mobileBarActive: 'live',
  layoutClass: 'index-layout',
  viewTransition: 'always'
})

const { t } = useI18n()
useHead(() => ({
  title: t('page.titleHome')
}))
</script>

<style src="~/assets/css/pages/home.css"></style>
