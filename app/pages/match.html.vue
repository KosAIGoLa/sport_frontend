<template>
  <div
    class="match-page"
    :style="{ '--match-title': `'${t('page.matchCenterTitle')}'`, '--match-subtitle': `'${t('page.matchCenterSubtitle')}'` }"
  >
    <main class="match-wrapper">
      <MobileOnly tag="div" class="match-mobile-day-title">{{ mobileDayTitle }}</MobileOnly>
      <MatchDateList v-model="activeDay" :days="days" />
      <MatchList
        :matches="displayMatches"
        :empty="isListEmpty"
        @open="openMatchDetail"
      />
    </main>
  </div>
</template>

<script setup>
import { MATCH_LIST, filterMatchesByCategory } from '~/data/match'

definePageMeta({
  path: '/match.html',
  layout: 'catalog',
  catalogPage: 'match',
  activeMenu: 'schedule',
  mobileBarActive: 'schedule',
  mobileBarHideAd: true,
  mobileAriaLabel: '赛程分类',
  headerCount: 4,
  layoutClass: 'match-layout',
  viewTransition: 'always'
})

const { t } = useI18n()
const route = useRoute()
const { appNavigate } = useAppNavigate()

useHead(() => ({
  title: t('page.titleSchedule')
}))

const activeDay = ref(0)

/** 与顶栏 mobile tabs 同步：?tab=足球|篮球|分析 */
const activeCategory = computed(() => {
  const tab = typeof route.query.tab === 'string' ? route.query.tab : ''
  return ['足球', '篮球', '分析'].includes(tab) ? tab : '全部'
})

const days = computed(() => [
  { day: t('page.today'), date: '07.05' },
  { day: t('page.mon'), date: '07.06' },
  { day: t('page.tue'), date: '07.07' },
  { day: t('page.wed'), date: '07.08' },
  { day: t('page.thu'), date: '07.09' },
  { day: t('page.fri'), date: '07.10' },
  { day: t('page.sat'), date: '07.11' }
])

const mobileDayTitle = computed(() => {
  const day = days.value[activeDay.value]
  const cat = activeCategory.value === '全部' ? '' : ` · ${activeCategory.value}`
  return `${day?.day || t('page.today')}${cat}`
})

/** 今日 + 分类过滤；其它日期 mock 为空 */
const displayMatches = computed(() => {
  if (activeDay.value !== 0) return []
  return filterMatchesByCategory(MATCH_LIST, activeCategory.value)
})

const isListEmpty = computed(() => displayMatches.value.length === 0)

/** 切换顶部分类时滚回列表顶部，避免还停在旧位置 */
watch(activeCategory, () => {
  if (!import.meta.client) return
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

async function openMatchDetail(match) {
  await appNavigate(`/room/${match.roomId || 990645}?scheduleId=${match.id}`)
}
</script>

<style src="~/assets/css/pages/match.css"></style>
