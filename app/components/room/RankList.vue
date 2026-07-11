<template>
  <div class="rank-list">
    <div class="rank-header">
      <span>🏆 {{ t('page.rankTitle') }}</span>
      <small>{{ t('page.liveRank') }}</small>
    </div>
    <div
      v-for="user in users"
      :key="user.rank"
      class="rank-row"
      :class="{ top: user.rank <= 3 }"
    >
      <div class="rank-no" :class="{ medal: user.rank <= 3 }">
        <template v-if="user.rank === 1">👑</template>
        <template v-else-if="user.rank === 2">🥈</template>
        <template v-else-if="user.rank === 3">🥉</template>
        <template v-else>{{ user.rank }}</template>
      </div>
      <img class="rank-avatar" :src="user.avatar" alt="">
      <div class="rank-info">
        <div class="rank-name">
          <span>{{ user.name }}</span>
          <span class="rank-lv" :class="`lv-${user.lv}`">{{ t('page.level') }}{{ user.lv }}</span>
        </div>
        <div class="rank-meta">{{ t('page.activeToday') }}</div>
      </div>
      <div class="rank-score">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-1.97 4.8-4.8 4.8z"/></svg>
        {{ user.score }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: { type: Array, default: () => [] }
})
const { t } = useI18n()
</script>
