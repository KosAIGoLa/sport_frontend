<template>
  <div
    class="live-type-page"
    :style="{ '--live-title': `'${t('page.liveCenterTitle')}'`, '--live-subtitle': `'${t('page.liveCenterSubtitle')}'` }"
  >
    <main class="live-type-main">
      <LiveCategory
        title-image="/assets/brand/hot-live.png"
        :title-alt="t('page.allLive')"
        more-link="/liveType.html"
        :lives="ALL_LIVES"
        :show-filter="!isMobileView"
        :categories="[t('nav.all'), t('nav.football'), t('nav.basketball'), t('nav.analysis')]"
        :initial-category="initialCategory"
      />
    </main>
  </div>
</template>

<script setup>
import { ALL_LIVES } from '~/data/lives'

definePageMeta({
  path: '/liveType.html',
  layout: 'catalog',
  catalogPage: 'live',
  activeMenu: 'live',
  mobileBarActive: 'live',
  mobileAriaLabel: '直播分类',
  headerCount: 4,
  layoutClass: 'live-type-layout',
  // 确保本页进出都启用 View Transition
  viewTransition: 'always'
})

const { t } = useI18n()
useHead(() => ({
  title: t('page.titleLive')
}))

const route = useRoute()
const isMobileView = ref(false)

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
</script>

<style src="~/assets/css/pages/live-type.css"></style>
