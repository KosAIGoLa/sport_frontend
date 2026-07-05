<template>
  <section class="appoinment-list inner">
    <div class="appoinment-swiper-container">
      <button
        type="button"
        class="swiper-nav swiper-prev"
        :class="{ disabled: offset <= 0 }"
        @click="scrollPrev"
      >
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <button
        type="button"
        class="swiper-nav swiper-next"
        :class="{ disabled: offset >= maxOffset }"
        @click="scrollNext"
      >
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
      </button>
      <div class="swiper-wrapper" :style="{ transform: `translateX(${-offset}px)` }">
        <div
          v-for="(game, idx) in games"
          :key="idx"
          class="swiper-slide game"
          @click="goRoom(game.href)"
        >
          <div class="title">
            <div class="fl">
              <img :src="game.leagueIcon" class="icon" alt="">
              <span>{{ game.league }}</span>
            </div>
            <div class="fr match-time">
              <span>{{ game.date }}</span>
              {{ game.time }}
            </div>
            <div class="match-status">即将开始</div>
          </div>
          <div class="box">
            <div class="battle-team fl">
              <p>
                <img class="logo match-cover" :src="game.team1Icon" alt="">
                <span class="ellipsis">{{ game.team1 }}</span>
              </p>
              <p>
                <img class="logo match-cover" :src="game.team2Icon" alt="">
                <span class="ellipsis">{{ game.team2 }}</span>
              </p>
            </div>
            <button type="button" class="appoinment" :class="{ use: game.appointed }" @click.stop="game.appointed = !game.appointed">
              <span class="already-appoinment">已预约</span>
              <span class="no-appoinment">预约</span>
            </button>
          </div>
        </div>
        <div class="swiper-slide more-match">
          <a href="/match.html">
            <img src="/assets/more.png" alt="">
            <p class="match-text">更多赛程</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const games = ref([
  { league: '一起来聊球', leagueIcon: '/assets/league1.png', date: '今天', time: '09:00', team1: '一起来聊球', team1Icon: '/assets/teams/team1.png', team2: '一起来聊球', team2Icon: '/assets/teams/team2.png', appointed: true, href: '/room/506605?scheduleId=undefined' },
  { league: '拉脱超', leagueIcon: '/assets/league2', date: '今天', time: '09:00', team1: '格洛比纳', team1Icon: '/assets/teams/team1.png', team2: '图库姆斯', team2Icon: '/assets/teams/team2.png', appointed: false, href: '/room/506605?scheduleId=undefined' },
  { league: '世欧预', leagueIcon: '/assets/league2', date: '今天', time: '09:00', team1: '丹麦', team1Icon: '/assets/teams/team3.png', team2: '乌克兰', team2Icon: '/assets/teams/team4.png', appointed: false, href: '/room/506605?scheduleId=undefined' },
  { league: '世亚预', leagueIcon: '/assets/league2', date: '今天', time: '09:30', team1: '叙利亚', team1Icon: '/assets/teams/team5.png', team2: '伊朗', team2Icon: '/assets/teams/team6.png', appointed: false, href: '/room/506605?scheduleId=undefined' },
  { league: '哈萨克超', leagueIcon: '/assets/league2', date: '今天', time: '10:00', team1: '阿克托比', team1Icon: '/assets/teams/team3.png', team2: '斯咸迪苏', team2Icon: '/assets/teams/team4.png', appointed: false, href: '/room/506605?scheduleId=undefined' },
  { league: '哈萨克超', leagueIcon: '/assets/league2', date: '今天', time: '10:00', team1: '阿迪拿奥', team1Icon: '/assets/teams/team5.png', team2: '卡斯比阿克套', team2Icon: '/assets/teams/team6.png', appointed: false, href: '/room/506605?scheduleId=undefined' },
  { league: '挪甲', leagueIcon: '/assets/league2', date: '今天', time: '10:00', team1: '奥德', team1Icon: '/assets/teams/team1.png', team2: '海于格松', team2Icon: '/assets/teams/team2.png', appointed: false, href: '/room/506605?scheduleId=undefined' }
])

const offset = ref(0)
const slideWidth = 252
const visibleSlides = 4

const maxOffset = computed(() => {
  const totalSlides = games.value.length + 1
  return Math.max(0, slideWidth * (totalSlides - visibleSlides))
})

function scrollPrev() {
  offset.value = Math.max(0, offset.value - slideWidth)
}

function scrollNext() {
  offset.value = Math.min(maxOffset.value, offset.value + slideWidth)
}

function goRoom(href) {
  window.location.href = href
}
</script>

<style scoped>
.inner {
  width: 1200px;
  margin: 0 auto;
}
.appoinment-list {
  position: relative;
  margin-top: 28px;
  z-index: 3;
}
.appoinment-swiper-container {
  width: 100%;
  height: 150px;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(16px);
  position: relative;
  list-style: none;
  padding: 0;
  overflow: hidden;
}
.swiper-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #0f172a;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.swiper-nav svg {
  width: 20px;
  height: 20px;
}
.swiper-prev {
  left: 12px;
}
.swiper-next {
  right: 12px;
}
.swiper-nav:hover {
  background: #f59e0b;
  color: #fff;
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 6px 18px rgba(251, 191, 36, 0.35);
}
.swiper-nav.disabled {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%) scale(0.9);
}
.swiper-wrapper {
  height: 100%;
  display: flex;
  transition: transform 0.3s ease;
}
.swiper-slide.game {
  flex: 0 0 auto;
  width: 252px;
  height: 100%;
  position: relative;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid rgba(226, 232, 240, 0.9);
  font-weight: 400;
  padding: 18px 22px 20px;
  transition: background 0.2s, transform 0.2s;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}
.swiper-slide.game:hover {
  background: rgba(255, 248, 221, 0.72);
  transform: translateY(-2px);
}
.title {
  color: #64748b;
  font-size: 12px;
  margin: 0 0 18px;
  min-height: 38px;
  line-height: 17px;
  position: relative;
}
.title::after {
  display: block;
  height: 0;
  clear: both;
  content: "";
  visibility: hidden;
}
.title .fl {
  float: left;
}
.title .fl .icon {
  width: 12px;
  height: 12px;
  vertical-align: middle;
}
.title .fl span {
  display: inline-block;
  vertical-align: middle;
  margin-left: 4px;
}
.title .fr {
  float: right;
}
.match-time {
  color: #0f172a;
  font-weight: 700;
}
.match-time span {
  color: #64748b;
  font-weight: 500;
}
.match-status {
  position: absolute;
  left: 0;
  bottom: -18px;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
  font-size: 11px;
  line-height: 20px;
  font-weight: 700;
}
.box::after {
  display: block;
  height: 0;
  clear: both;
  content: "";
  visibility: hidden;
}
.battle-team {
  width: 150px;
  overflow: hidden;
  display: inline-block;
  float: left;
}
.battle-team p {
  float: left;
  padding-bottom: 10px;
  text-align: left;
}
.battle-team p .logo {
  width: 26px;
  height: 26px;
  vertical-align: middle;
  float: left;
  object-fit: contain;
}
.battle-team p .ellipsis {
  display: inline-block;
  width: 112px;
  margin: 0 0 0 6px;
  font-size: 14px;
  font-weight: 650;
  height: 24px;
  line-height: 24px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}
.appoinment {
  border: 0;
  padding: 0;
  display: inline-block;
  margin-top: 24px;
  width: 52px;
  height: 25px;
  line-height: 25px;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  border-radius: 999px;
  box-shadow: 0 8px 18px rgba(255, 199, 28, 0.24);
  color: #000;
  font-size: 12px;
  cursor: pointer;
  text-decoration: none;
}
.appoinment.use {
  background: #e5e5e5;
}
.appoinment .already-appoinment {
  display: none;
}
.appoinment .no-appoinment {
  display: inline;
}
.appoinment.use .already-appoinment {
  display: inline;
}
.appoinment.use .no-appoinment {
  display: none;
}
.swiper-slide.more-match {
  flex: 0 0 auto;
  width: 252px;
  height: 100%;
  position: relative;
  text-align: center;
  font-size: 14px;
  color: #777;
}
.swiper-slide.more-match a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-decoration: none;
  color: #777;
}
.swiper-slide.more-match a img {
  width: 29px;
  height: 26px;
  margin: 0 auto 4px;
}
.swiper-slide.more-match a .match-text {
  margin-top: 4px;
  font-size: 12px;
}

@media screen and (max-width: 1400px) {
  .inner {
    width: 960px;
  }
}
</style>
