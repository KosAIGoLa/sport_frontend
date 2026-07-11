<template>
  <article
    class="match-card"
    role="link"
    tabindex="0"
    @click="$emit('open', match)"
    @keydown.enter.prevent="$emit('open', match)"
  >
    <div class="left">
      <div class="info">
        <div class="name ellipsis">{{ match.league }}</div>
        <div class="time">{{ match.time }}</div>
      </div>
      <MobileOnly tag="button" class="mobile-bell" type="button" :aria-label="t('page.bookingReminder')" @click.stop>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a5 5 0 0 0-5 5v2.3c0 .7-.2 1.4-.6 2L5 14.6V16h14v-1.4l-1.4-2.3c-.4-.6-.6-1.3-.6-2V8a5 5 0 0 0-5-5Zm0 18a2.5 2.5 0 0 0 2.4-2h-4.8A2.5 2.5 0 0 0 12 21Z" /></svg>
      </MobileOnly>
      <div class="team">
        <div class="team-row team-row--host">
          <img class="match-cover" :src="match.hostLogo" alt="">
          <span class="ellipsis">{{ match.host }}</span>
        </div>
        <div class="team-vs">VS</div>
        <div class="team-row team-row--guest">
          <img class="match-cover" :src="match.guestLogo" alt="">
          <span class="ellipsis">{{ match.guest }}</span>
        </div>
      </div>
    </div>

    <div class="right">
      <div class="anchor-list">
        <button type="button" class="avatar-arrow" aria-label="上一组"></button>
        <div class="avatar-list">
          <div v-for="anchor in match.anchors" :key="anchor.name" class="avatar-box">
            <img class="avatar" :src="anchor.avatar" :alt="anchor.name">
            <div class="anchor-name ellipsis">{{ anchor.name }}</div>
            <img class="live" src="https://sta.ncctrials.com/857web/assets/857/img/live.png" alt="">
          </div>
        </div>
        <button type="button" class="avatar-arrow next" aria-label="下一组"></button>
      </div>
      <div class="living-box" :class="{ 'living-box--pending': match.status !== '开始' }">
        <img v-if="match.status === '开始'" src="https://sta.ncctrials.com/857web/assets/857/img/triangle.png" alt="">
        <span>{{ statusText }}</span>
      </div>
    </div>

    <!-- 左下角分类角标：足球 / 篮球 / 分析 -->
    <span
      v-if="categoryLabel"
      class="match-card__category"
      :class="`match-card__category--${categoryKey}`"
    >
      <svg class="match-card__category-icon" viewBox="0 0 24 24" aria-hidden="true">
        <!-- 足球 -->
        <path
          v-if="categoryKey === 'football'"
          fill="currentColor"
          d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3.7 3.3 1.5 2.6-1.2.7-2.1-1.6.5-1.9 1.3.2Zm-7.4 0 1.3-.2.5 1.9-2.1 1.6-1.2-.7 1.5-2.6ZM5.1 10.2l1.1-.4 1.3 1.9-.5 2.2-1.6.5A8 8 0 0 1 5.1 10.2Zm3.4 7.3-1.1-2.1 1.4-.4 1.7 1.5-.4 1.6a8 8 0 0 1-1.6-.6Zm7 0a8 8 0 0 1-1.6.6l-.4-1.6 1.7-1.5 1.4.4-1.1 2.1Zm3.4-7.3a8 8 0 0 1-.3 3.9l-1.6-.5-.5-2.2 1.3-1.9 1.1.4ZM12 8.2l1.9 1.4-.7 2.2H10.8l-.7-2.2L12 8.2Z"
        />
        <!-- 篮球 -->
        <path
          v-else-if="categoryKey === 'basketball'"
          fill="currentColor"
          d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2c1.4 0 2.7.4 3.8 1-1.2 1.1-2 2.7-2.2 4.5H10.4C10.2 7.7 9.4 6.1 8.2 5 9.3 4.4 10.6 4 12 4Zm-5.4 2.2c1.4 1.2 2.3 3 2.6 5H4.3a8 8 0 0 1 2.3-5Zm10.8 0a8 8 0 0 1 2.3 5h-4.9c.3-2 1.2-3.8 2.6-5ZM4.1 13h4.9c-.2 1.9-1 3.6-2.2 4.8A8 8 0 0 1 4.1 13Zm6.3 0h3.2c.2 2 1 3.8 2.2 5.1A8 8 0 0 1 12 20a8 8 0 0 1-3.6-1c1.2-1.2 2-3 2.2-5Zm5.5 0h4c-.3 2.1-1.3 4-2.9 5.3-1-1.1-1.7-2.7-1.9-4.4 0-.3 0-.6.1-.9Z"
        />
        <!-- 分析：图表 -->
        <path
          v-else
          fill="currentColor"
          d="M4 19h16v2H2V3h2v16Zm3.5-1H6v-6h1.5v6Zm4 0H10V8h1.5v10Zm4 0H14v-4h1.5v4Zm4 0H18V5h1.5v13Z"
        />
      </svg>
      <span class="match-card__category-text">{{ categoryLabel }}</span>
    </span>
  </article>
</template>

<script setup>
const props = defineProps({
  match: { type: Object, required: true }
})
defineEmits(['open'])

const { t } = useI18n()
const statusText = computed(() =>
  props.match.status === '开始' ? t('page.statusStarted') : t('page.statusNotStarted')
)

/** 归一化分类 key，用于样式与展示 */
const categoryKey = computed(() => {
  const raw = String(props.match.category || '').trim()
  if (raw === '篮球' || raw === 'basketball') return 'basketball'
  if (raw === '分析' || raw === 'analysis') return 'analysis'
  if (raw === '足球' || raw === 'football' || raw) return 'football'
  return ''
})

const categoryLabel = computed(() => {
  if (categoryKey.value === 'basketball') return '篮球'
  if (categoryKey.value === 'analysis') return '分析'
  if (categoryKey.value === 'football') return '足球'
  return ''
})
</script>
