<template>
  <section class="appoinment-list inner">
    <Carousel
      :items="games"
      :slide-width="252"
      :visible-count="4"
      :step="1"
      container-class="appoinment-carousel"
      wrapper-class="appoinment-swiper-container"
      slide-class="game"
    >
      <template #slide="{ item }">
        <div class="game-card" @click="goRoom(item.href)">
          <div class="title">
            <div class="league-info">
              <img :src="item.leagueIcon" class="icon" alt="">
              <span>{{ item.league }}</span>
            </div>
            <div class="match-time">
              <span>{{ item.date }}</span>
              {{ item.time }}
            </div>
            <div class="match-status">即将开始</div>
          </div>
          <div class="box">
            <div class="battle-team">
              <p>
                <img class="logo match-cover" :src="item.team1Icon" alt="">
                <span class="ellipsis">{{ item.team1 }}</span>
              </p>
              <p>
                <img class="logo match-cover" :src="item.team2Icon" alt="">
                <span class="ellipsis">{{ item.team2 }}</span>
              </p>
            </div>
            <button type="button" class="appoinment" :class="{ use: item.appointed }" @click.stop="item.appointed = !item.appointed">
              <span class="already-appoinment">已预约</span>
              <span class="no-appoinment">预约</span>
            </button>
          </div>
        </div>
      </template>
      <template #after>
        <div class="carousel-slide more-match">
          <a href="/match.html">
            <img src="/assets/more.png" alt="">
            <p class="match-text">更多赛程</p>
          </a>
        </div>
      </template>
    </Carousel>
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
:deep(.carousel-btn) {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  color: #0f172a;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12);
}
:deep(.carousel-btn) svg {
  width: 20px;
  height: 20px;
}
:deep(.carousel-prev) {
  left: 12px;
}
:deep(.carousel-next) {
  right: 12px;
}
:deep(.carousel-btn:hover) {
  background: #f59e0b;
  color: #fff;
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 6px 18px rgba(251, 191, 36, 0.35);
}
:deep(.carousel-btn.disabled) {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%) scale(0.9);
}
:deep(.carousel-slide.game) {
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
:deep(.carousel-slide.game):hover {
  background: rgba(255, 248, 221, 0.72);
  transform: translateY(-2px);
}
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #64748b;
  font-size: 12px;
  margin: 0 0 18px;
  min-height: 38px;
  line-height: 17px;
  position: relative;
}
.league-info {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.league-info .icon {
  width: 12px;
  height: 12px;
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
.box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.battle-team {
  width: 150px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.battle-team p {
  display: flex;
  align-items: center;
  text-align: left;
}
.battle-team p .logo {
  width: 26px;
  height: 26px;
  flex: 0 0 26px;
  object-fit: contain;
}
.battle-team p .ellipsis {
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
:deep(.carousel-slide.more-match) {
  height: 100%;
  position: relative;
  text-align: center;
  font-size: 14px;
  color: #777;
}
:deep(.carousel-slide.more-match) a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-decoration: none;
  color: #777;
}
:deep(.carousel-slide.more-match) a img {
  width: 29px;
  height: 26px;
  margin: 0 auto 4px;
}
:deep(.carousel-slide.more-match) a .match-text {
  margin-top: 4px;
  font-size: 12px;
}

@media screen and (max-width: 1400px) {
  .inner {
    width: 960px;
  }
}
</style>
