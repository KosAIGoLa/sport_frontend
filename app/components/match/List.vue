<template>
  <section class="match-box">
    <div v-if="empty" class="match-none">
      <img src="https://sta.ncctrials.com/857web/assets/857/img/none2.png" alt="">
      <span>{{ t('common.empty') }}</span>
    </div>
    <div v-else class="match-data">
      <MatchCard
        v-for="match in matches"
        :key="match.id"
        :match="match"
        @open="$emit('open', $event)"
      />
    </div>
  </section>
</template>

<script setup>
defineProps({
  matches: { type: Array, default: () => [] },
  empty: { type: Boolean, default: false }
})
defineEmits(['open'])
const { t } = useI18n()
</script>
