<template>
  <div class="news-example">
    <div class="news-example__title">{{ title }}</div>
    <div class="news-example__time">{{ time }}</div>
    <div class="news-example__vs">
      <div class="news-example__option red">
        <strong>{{ left.name }}</strong>
        <span>倍数{{ left.odds }}</span>
      </div>
      <div class="news-example__center">
        <span>VS</span>
        <small>{{ participants }}人参与</small>
      </div>
      <div class="news-example__option blue">
        <strong>{{ right.name }}</strong>
        <span>倍数{{ right.odds }}</span>
      </div>
    </div>
    <div class="news-example__bar">
      <span class="left">{{ left.votes }}</span>
      <span class="right">{{ right.votes }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, default: '全场比赛最后谁能拿到MVP？' },
  time: { type: String, default: '05:33' },
  participants: { type: String, default: '200万' },
  left: {
    type: Object,
    default: () => ({ name: '二宝', odds: '0.3', votes: '98万' })
  },
  right: {
    type: Object,
    default: () => ({ name: '陈一嘉', odds: '6.3', votes: '102万' })
  }
})
</script>
