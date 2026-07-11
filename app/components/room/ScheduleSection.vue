<template>
  <DesktopOnly tag="section" class="schedule-section">
    <h2>{{ t('page.anchorSchedule') }}</h2>
    <div class="schedule-row">
      <div v-for="game in schedules" :key="game.title" class="schedule-card">
        <div class="schedule-date">
          <strong>{{ game.date }}</strong>
          <span>{{ game.time }}</span>
        </div>
        <div class="schedule-content">
          <div class="schedule-league">{{ game.league }}</div>
          <div class="schedule-teams">
            <span class="schedule-team">{{ game.home }}</span>
            <span class="schedule-vs">VS</span>
            <span class="schedule-team">{{ game.away }}</span>
          </div>
          <div class="schedule-status">
            <span class="status-dot"></span>
            <span>{{ scheduleStatusText(game.date) }}</span>
          </div>
        </div>
        <button type="button" class="schedule-btn">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1zM7 10h5v5H7z"/></svg>
          {{ t('page.book') }}
        </button>
      </div>
      <button class="schedule-next" type="button"></button>
    </div>
  </DesktopOnly>
</template>

<script setup>
defineProps({
  schedules: { type: Array, default: () => [] }
})
const { t } = useI18n()

function scheduleStatusText(date) {
  return date === '今天' ? t('page.startingSoon') : t('page.waitingToLive')
}
</script>
