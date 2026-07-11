<template>
  <MobileOnly tag="div" class="mobile-schedule-panel only-mobile">
    <div v-for="game in schedules" :key="`mobile-${game.title}`" class="mobile-schedule-card">
      <div class="mobile-schedule-card__time">
        <strong>{{ game.date }}</strong>
        <span>{{ game.time }}</span>
      </div>
      <div class="mobile-schedule-card__main">
        <div class="mobile-schedule-card__league">{{ game.league }}</div>
        <div class="mobile-schedule-card__teams">
          <span>{{ game.home }}</span>
          <em>VS</em>
          <span>{{ game.away }}</span>
        </div>
      </div>
      <button type="button" class="mobile-schedule-card__btn">{{ t('page.book') }}</button>
    </div>
  </MobileOnly>
</template>

<script setup>
defineProps({
  schedules: { type: Array, default: () => [] }
})
const { t } = useI18n()
</script>
