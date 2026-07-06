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
  if (typeof href !== 'string' || !href.startsWith('/')) return
  navigateTo(href)
}
</script>

<style scoped>
.inner {
  @apply w-[1200px] mx-auto;
}
.appoinment-list {
  @apply relative mt-7 z-[3];
}
.appoinment-swiper-container {
  @apply w-full h-[150px] bg-white/[0.88] rounded-[22px] border border-white/[0.9] shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur-[16px] relative list-none p-0 overflow-hidden;
}
:deep(.carousel-btn) {
  @apply w-[34px] h-[34px] rounded-full bg-white text-slate-900 shadow-[0_4px_14px_rgba(15,23,42,0.12)];
}
:deep(.carousel-btn) svg {
  @apply w-5 h-5;
}
:deep(.carousel-prev) {
  @apply left-3;
}
:deep(.carousel-next) {
  @apply right-3;
}
:deep(.carousel-btn:hover) {
  @apply bg-amber-500 text-white transform -translate-y-1/2 scale-[1.08] shadow-[0_6px_18px_rgba(251,191,36,0.35)];
}
:deep(.carousel-btn.disabled) {
  @apply opacity-0 pointer-events-none transform -translate-y-1/2 scale-90;
}
:deep(.carousel-slide.game) {
  @apply h-full relative text-center text-sm border-r border-slate-200/[0.9] font-normal px-[22px] pt-[18px] pb-5 transition-all duration-200 text-inherit no-underline cursor-pointer;
}
:deep(.carousel-slide.game):hover {
  @apply bg-[rgba(255,248,221,0.72)] -translate-y-0.5;
}
.title {
  @apply flex items-center justify-between text-slate-500 text-xs mb-[18px] min-h-[38px] leading-[17px] relative;
}
.league-info {
  @apply inline-flex items-center gap-1;
}
.league-info .icon {
  @apply w-3 h-3;
}
.match-time {
  @apply text-slate-900 font-bold;
}
.match-time span {
  @apply text-slate-500 font-medium;
}
.match-status {
  @apply absolute left-0 -bottom-[18px] h-5 px-2 rounded-full bg-green-500/[0.12] text-green-600 text-[11px] leading-5 font-bold;
}
.box {
  @apply flex items-center justify-between;
}
.battle-team {
  @apply w-[150px] overflow-hidden flex flex-col gap-2.5;
}
.battle-team p {
  @apply flex items-center text-left;
}
.battle-team p .logo {
  @apply w-[26px] h-[26px] shrink-0 basis-[26px] object-contain;
}
.battle-team p .ellipsis {
  @apply w-[112px] ml-1.5 text-sm font-[650] h-6 leading-6 overflow-hidden whitespace-nowrap text-ellipsis text-left;
}
.appoinment {
  @apply border-0 p-0 inline-block w-[52px] h-[25px] leading-[25px] bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] rounded-full shadow-[0_8px_18px_rgba(255,199,28,0.24)] text-black text-xs cursor-pointer no-underline;
}
.appoinment.use {
  @apply bg-[#e5e5e5];
}
.appoinment .already-appoinment {
  @apply hidden;
}
.appoinment .no-appoinment {
  @apply inline;
}
.appoinment.use .already-appoinment {
  @apply inline;
}
.appoinment.use .no-appoinment {
  @apply hidden;
}
:deep(.carousel-slide.more-match) {
  @apply h-full relative text-center text-sm text-[#777];
}
:deep(.carousel-slide.more-match) a {
  @apply flex flex-col items-center justify-center h-full no-underline text-[#777];
}
:deep(.carousel-slide.more-match) a img {
  @apply w-[29px] h-[26px] mx-auto mb-1;
}
:deep(.carousel-slide.more-match) a .match-text {
  @apply mt-1 text-xs;
}

@media screen and (max-width: 1400px) {
  .inner {
    @apply w-[960px];
  }
}

@media (max-width: 768px) {
  .inner {
    @apply w-full;
  }

  .appoinment-list {
    @apply mt-3.5 px-4;
  }

  .appoinment-swiper-container {
    @apply h-auto p-0 bg-transparent border-0 rounded-none shadow-none backdrop-blur-none overflow-x-auto;
  }

  :deep(.carousel-track) {
    @apply gap-3;
  }

  :deep(.carousel-btn) {
    @apply hidden;
  }

  :deep(.carousel-slide.game),
  :deep(.carousel-slide.more-match) {
    @apply min-w-[268px] h-[122px] p-3.5 border-0 rounded-[14px] bg-white shadow-[0_8px_20px_rgba(15,23,42,0.08)];
  }

  .title {
    @apply mb-3.5;
  }

  .battle-team {
    @apply w-[150px];
  }
}
</style>
