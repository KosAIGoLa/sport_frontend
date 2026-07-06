<template>
  <div class="match-page">
    <header class="match-header">
      <div class="match-header-inner">
        <MobileOnly tag="div" class="match-mobile-head">
          <div class="match-mobile-top">
            <img class="match-mobile-logo" src="/assets/logo-mobile-wap.png" alt="857直播">
            <a class="match-mobile-download" href="/download" target="_blank" rel="noopener noreferrer">下载APP</a>
          </div>
          <nav class="match-mobile-tabs" aria-label="赛程分类">
            <NuxtLink :class="{ active: matchTab === '全部' }" to="/match.html">全部</NuxtLink>
            <NuxtLink :class="{ active: matchTab === '足球' }" to="/match.html?tab=足球">足球</NuxtLink>
            <NuxtLink :class="{ active: matchTab === '篮球' }" to="/match.html?tab=篮球">篮球</NuxtLink>
            <NuxtLink :class="{ active: matchTab === '分析' }" to="/match.html?tab=分析">分析</NuxtLink>
          </nav>
        </MobileOnly>
        <DesktopOnly tag="a" class="match-logo" href="/">
          <img src="/assets/logo2.png" alt="857直播">
        </DesktopOnly>
        <DesktopOnly tag="nav" class="match-nav">
          <NuxtLink to="/">首页</NuxtLink>
          <NuxtLink to="/liveType.html">全部直播</NuxtLink>
          <NuxtLink class="active" to="/match.html">赛程</NuxtLink>
          <a class="download" href="/download" target="_blank" rel="noopener noreferrer">
            <span>
              下载APP
              <img src="/assets/hot.png" alt="hot">
            </span>
          </a>
        </DesktopOnly>
        <DesktopOnly tag="div" class="match-auth">
          <button type="button" class="login-btn" @click="openLogin('login')">登录</button>
          <button type="button" @click="openLogin('register')">注册</button>
        </DesktopOnly>
      </div>
    </header>

    <main class="match-wrapper">
      <MobileOnly tag="div" class="match-mobile-day-title">今天</MobileOnly>
      <section class="date-list">
        <button
          v-for="(day, index) in days"
          :key="day.date"
          type="button"
          class="date-item"
          :class="{ active: activeDay === index }"
          @click="activeDay = index"
        >
          <span class="day">{{ day.day }}</span>
          <span class="date">{{ day.date }}</span>
        </button>
      </section>

      <section class="match-box">
        <div v-if="activeDay !== 0" class="match-none">
          <img src="https://sta.ncctrials.com/857web/assets/857/img/none2.png" alt="">
          <span>列表空空如也~</span>
        </div>

        <div v-else class="match-data">
          <article
            v-for="match in matches"
            :key="match.id"
            class="match-card"
            role="link"
            tabindex="0"
            @click="openMatchDetail(match)"
            @keydown.enter.prevent="openMatchDetail(match)"
          >
            <div class="left">
              <div class="info">
                <div class="name ellipsis">{{ match.league }}</div>
                <div class="time">{{ match.time }}</div>
              </div>
              <MobileOnly tag="button" class="mobile-bell" type="button" aria-label="预约提醒" @click.stop>
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
                <span>{{ match.status || '未开始' }}</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>

    <SiteFooter />

    <LoginModal
      v-model:visible="loginVisible"
      :type="loginType"
      @success="loginVisible = false"
    />
    <MobileStickyBar active-tab="schedule" hide-ad @follow="followVisible = true" @login="openLogin" />
    <MobileFollowPanel :visible="followVisible" @login="openLogin" />
  </div>
</template>

<script setup>
definePageMeta({
  path: '/match.html'
})

const route = useRoute()
const activeDay = ref(0)
const loginVisible = ref(false)
const loginType = ref('login')
const followVisible = ref(false)

const matchTab = computed(() => {
  const tab = typeof route.query.tab === 'string' ? route.query.tab : ''
  return ['足球', '篮球', '分析'].includes(tab) ? tab : '全部'
})

const days = [
  { day: '今天', date: '07.05' },
  { day: '周一', date: '07.06' },
  { day: '周二', date: '07.07' },
  { day: '周三', date: '07.08' },
  { day: '周四', date: '07.09' },
  { day: '周五', date: '07.10' },
  { day: '周六', date: '07.11' }
]

const matches = [
  {
    id: 1383744,
    roomId: 374391,
    league: '哈萨克超',
    time: '07-05 10:00',
    status: '开始',
    host: '阿克托比',
    hostLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1gzq8pzdweg.png',
    guest: '斯咸迪苏',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1gtn24pfqwj.png',
    anchors: [
      { name: '知夏', avatar: 'https://sta.ncctrials.com/file/head/20260505/ec8e8b84c119776b0cd89ee656926636_ss300.png' },
      { name: '乌曹指导', avatar: 'https://sta.ncctrials.com/file/head/20250614/9515f60d53b3b58f43675544979f0264_ss300.png' }
    ]
  },
  {
    id: 1383746,
    roomId: 238362,
    league: '哈萨克超',
    time: '07-05 10:00',
    status: '开始',
    host: '阿迪拿奥',
    hostLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1hxb3x0nwt10.png',
    guest: '卡斯比阿克套',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1gtn24pfq6n.png',
    anchors: [
      { name: '司马老贼', avatar: 'https://sta.ncctrials.com/file/head/20240222/23a0fd3943d7d814ba5f46a3c316dd25_ss300.png' },
      { name: '伊布', avatar: 'https://sta.ncctrials.com/file/head/20230902/b6105a741b54f02e02fc3b707e0e45f9_ss300.jpg' }
    ]
  },
  {
    id: 1384090,
    roomId: 534857,
    league: '挪甲',
    time: '07-05 10:00',
    status: '开始',
    host: '奥德',
    hostLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1hw70bzw2q11.png',
    guest: '海于格松',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1gxmbm1nc6q.png',
    anchors: [
      { name: '百万', avatar: 'https://sta.ncctrials.com/file/head/20231118/c51b26949b0c3e6c6cb61ddf5a5e2111_ss300.png' },
      { name: '姜子牙', avatar: 'https://sta.ncctrials.com/file/head/20251130/4315af97f12b13d2ee3f763315a17740_ss300.jpeg' }
    ]
  },
  {
    id: 1384555,
    roomId: 525429,
    league: '世欧预',
    time: '07-05 10:00',
    status: '开始',
    host: '英国',
    hostLogo: 'https://sta.ncctrials.com/file/imgs/team/basketball/20190124184431.jpg',
    guest: '冰岛',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/basketball/20190124184126.jpg',
    anchors: [
      { name: '王天一🏀', avatar: 'https://sta.ncctrials.com/file/head/20230901/97e6bfa51f68ee8ce0fd8d6b4483a9bc_ss300.jpg' },
      { name: '老牛', avatar: 'https://sta.ncctrials.com/file/head/20250202/6c32fa89e909e2d3f5f20a6134b96fac_ss300.jpg' }
    ]
  },
  {
    id: 1384056,
    roomId: 506605,
    league: '瑞典超',
    time: '07-05 10:30',
    status: '开始',
    host: '埃尔夫斯堡',
    hostLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1h8wtxnzmc2g.png',
    guest: '哈马比',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1h6wfe05rw26.png',
    anchors: [
      { name: '八💥佰', avatar: 'https://sta.ncctrials.com/file/head/20221206/e67279aa3ea0f7aeae85a95bdb43a044_ss300.png' },
      { name: '评述员阿虎', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a_ss300.jpg' },
      { name: '斯姐開啵(粵語)', avatar: 'https://sta.ncctrials.com/file/head/20260512/fddd0451d3076ea69588a8e6a7e108ee_ss300.jpg' }
    ]
  },
  {
    id: 1015951,
    roomId: 491355,
    league: '一起来聊球',
    time: '07-05 11:00',
    status: '未开始',
    host: '一起来聊球',
    hostLogo: 'https://sta.ncctrials.com/file/common/20250212/d4699c881388a67425b6a1a5136492cd.png',
    guest: '一起来聊球',
    guestLogo: 'https://sta.ncctrials.com/file/common/20250212/abdf720aded751ab5735082b4259ae7b.png',
    anchors: [
      { name: '👊车太勤👊', avatar: 'https://sta.ncctrials.com/file/head/20221025/fd6967ccf7f83828c033c6b7a9358733_ss300.jpeg' },
      { name: '老万', avatar: 'https://sta.ncctrials.com/file/head/20260319/7f701db3b907fedaf92a5c66ddd00125_ss300.jpg' },
      { name: '🐶百威', avatar: 'https://sta.ncctrials.com/file/head/20250226/56ff34ac96b47c7d86ec21c47bea2e16_ss300.png' }
    ]
  },
  {
    id: 1383748,
    roomId: 765648,
    league: '哈萨克超',
    time: '07-05 11:00',
    status: '未开始',
    host: '卡萨尔',
    hostLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1gs99xcwg62a.png',
    guest: '伊特什',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1kk34hckxwj.png',
    anchors: [
      { name: '大帝', avatar: 'https://sta.ncctrials.com/file/head/20251112/7c61f9874371fec5fd7b73df63fb23e5_ss300.png' },
      { name: '小团团', avatar: 'https://sta.ncctrials.com/file/head/20231113/3c4adfe97fee0340ed5a3f6f9894569c_ss300.jpg' },
      { name: '奥巴（粤语）', avatar: 'https://sta.ncctrials.com/file/head/20240809/e3c7f4be827023a392a0a817adbb105b_ss300.jpg' }
    ]
  },
  {
    id: 1383751,
    roomId: 896956,
    league: '哈萨克超',
    time: '07-05 11:00',
    status: '未开始',
    host: '奥达巴斯',
    hostLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1gt31y86jpw.png',
    guest: '乌利塔哲兹卡兹甘',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1gvszh7ysf19.png',
    anchors: [
      { name: '都教授', avatar: 'https://sta.ncctrials.com/file/head/20201128/2aac51efa098872b4ddb9c1c32d9bce5' },
      { name: '蓝狐', avatar: 'https://sta.ncctrials.com/file/head/20260228/1d35c871f0eae83d76dc1c6c7e30e174_ss300.jpg' },
      { name: '阿达（粤语）', avatar: 'https://sta.ncctrials.com/file/head/20251206/5ff5cbdf2b867159acc5b37d939792c5_ss300.jpg' }
    ]
  },
  {
    id: 1384080,
    roomId: 551893,
    league: '欧青U19',
    time: '07-05 11:00',
    status: '未开始',
    host: '乌克兰U19',
    hostLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1gw4ahja8g2k.png',
    guest: '意大利U19',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/football/165750299841.png',
    anchors: [
      { name: '美娜(公子留步)', avatar: 'https://sta.ncctrials.com/file/head/20260514/f92949eef6fd1834d3820229ea7f1bdf_ss300.jpg' },
      { name: '大熊', avatar: 'https://sta.ncctrials.com/file/head/20240224/100ce75e32ce79c21e3baa33db3c9220_ss300.jpg' }
    ]
  },
  {
    id: 1384081,
    roomId: 774913,
    league: '欧青U19',
    time: '07-05 11:00',
    status: '未开始',
    host: '塞尔维亚U19',
    hostLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1h4320ns6a2y.png',
    guest: '克罗地亚U19',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/football/165750042421.png',
    anchors: [
      { name: '金州-拉文', avatar: 'https://sta.ncctrials.com/file/head/20251018/c2a03d3cebf1d8f5d993114d84419224_ss300.jpg' },
      { name: '阿祖讲波（粤）', avatar: 'https://sta.ncctrials.com/file/head/20250430/f7e6567c08609ff8b15ac7632414746a_ss300.jpg' }
    ]
  },
  {
    id: 1384084,
    roomId: 346346,
    league: '芬甲',
    time: '07-05 11:30',
    status: '未开始',
    host: 'MP米克力',
    hostLogo: 'https://sta.ncctrials.com/file/imgs/team/football/1hxdga205x10.png',
    guest: '哈卡',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/football/165724420689.png',
    anchors: [
      { name: '茶茶爱看球', avatar: 'https://sta.ncctrials.com/file/head/20230409/07e5fa23d5829784c70851c16bc1a1a8_ss300.png' },
      { name: '🖖朴一单', avatar: 'https://sta.ncctrials.com/file/head/20260610/7c4d0b2cdfab47b10e687c7cff4cf0fa_ss300.png' }
    ]
  },
  {
    id: 1134913,
    roomId: 1573951,
    league: '世欧预',
    time: '07-05 11:30',
    status: '未开始',
    host: '格鲁吉亚',
    hostLogo: 'https://sta.ncctrials.com/file/common/20260701/eed4b069cc772240169e73a420ddf885.png',
    guest: '西班牙',
    guestLogo: 'https://sta.ncctrials.com/file/imgs/team/basketball/200799113540.gif',
    anchors: [
      { name: '美希', avatar: 'https://sta.ncctrials.com/file/head/20240223/270feb46d85f988c314b337d3e7131e5_ss300.jpg' },
      { name: '杰森聊球', avatar: 'https://sta.ncctrials.com/file/head/20250325/75941b180a8d0f1ca5ef69cee9186680_ss300.jpeg' },
      { name: '小新（粵語）', avatar: 'https://sta.ncctrials.com/file/head/20240316/7f93ace06b551d5bcc8d261b6c464eeb_ss300.jpg' }
    ]
  }
]

function openLogin(type) {
  followVisible.value = false
  loginType.value = type
  loginVisible.value = true
}

function openMatchDetail(match) {
  navigateTo(`/room/${match.roomId || 990645}?scheduleId=${match.id}`)
}

</script>

<style scoped>
.match-page {
  @apply min-h-screen bg-[radial-gradient(circle_at_12%_0%,rgba(255,199,28,0.16),transparent_28%),radial-gradient(circle_at_88%_14%,rgba(33,138,255,0.14),transparent_30%),linear-gradient(180deg,#f8fafc_0%,#eef3f9_52%,#f8fafc_100%)] text-[#111827] font-sans;
}
.ellipsis {
  @apply overflow-hidden whitespace-nowrap text-ellipsis;
}
.match-header {
  @apply sticky z-[100] top-0 w-full h-[72px] bg-white/[0.86] border-b border-slate-200/[0.9] shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-[18px];
}
.match-header-inner {
  @apply w-[1200px] h-full mx-auto flex items-center;
}
.match-logo {
  @apply flex items-center w-[160px] mr-[58px];
}
.match-mobile-head {
  @apply hidden;
}
.match-mobile-day-title {
  @apply hidden;
}
.match-logo img {
  @apply w-[160px] block;
}
.match-nav {
  @apply flex items-center gap-4 h-full text-base font-[650];
}
.match-nav a {
  @apply relative h-9 px-[18px] leading-9 text-[#111827] no-underline rounded-full whitespace-nowrap transition-all duration-200;
}
.match-nav a.active,
.match-nav a:hover {
  @apply text-[#111827] bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] shadow-[0_8px_18px_rgba(248,194,27,0.28)];
}
.match-nav a.download {
  @apply text-amber-500;
}
.match-nav a.download:hover {
  @apply bg-[#fff7d6];
}
.match-nav a.download span {
  @apply relative;
}
.match-nav a.download img {
  @apply absolute -top-[12px] -right-[32px] w-[29px] h-auto;
}
.match-auth {
  @apply ml-auto flex items-center gap-2.5;
}
.match-auth button {
  @apply appearance-none h-[34px] border border-slate-200/[0.9] rounded-full bg-white/[0.72] px-3.5 text-[#111827] text-sm font-bold cursor-pointer transition-all duration-200;
}
.match-auth button:hover {
  @apply border-[rgba(255,194,28,0.8)] bg-[#fff7d6];
}
.match-auth .login-btn::before {
  @apply content-[''] inline-block w-2 h-2 mr-1.5 bg-green-500 rounded-full align-[1px] shadow-[0_0_0_5px_rgba(34,197,94,0.12)];
}
.match-wrapper {
  @apply w-[1200px] min-h-[calc(100vh-312px)] mx-auto pt-[42px] pb-16;
}
.match-wrapper::before {
  @apply content-['赛程中心'] block mb-2 text-slate-900 text-[30px] font-[850] tracking-[-0.4px];
}
.match-wrapper::after {
  @apply content-['实时赛事安排，快速预约你关注的比赛'] block -mt-0.5 mb-5 text-slate-500 text-sm;
}
.date-list {
  @apply h-24 mb-6 p-2.5 bg-white/[0.88] border border-white/[0.92] rounded-[24px] shadow-[0_22px_60px_rgba(15,23,42,0.1)] backdrop-blur-[14px] grid grid-cols-7 gap-2;
}
.date-item {
  @apply relative appearance-none border-0 rounded-[18px] bg-transparent text-slate-500 cursor-pointer text-lg leading-none transition-all duration-[0.22s];
}
.date-item:hover {
  @apply bg-slate-50;
}
.date-item .day,
.date-item .date {
  @apply block;
}
.date-item .day {
  @apply mb-2.5 text-lg font-[750];
}
.date-item .date {
  @apply text-sm;
}
.date-item.active {
  @apply bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] text-[#111827] shadow-[0_12px_26px_rgba(248,194,27,0.28)];
}
.match-box {
  @apply relative;
}
.match-card {
  @apply min-h-[138px] mb-3.5 bg-white/[0.92] border border-slate-200/[0.82] rounded-[22px] flex items-center overflow-hidden shadow-[0_14px_36px_rgba(15,23,42,0.08)] transition-[transform,box-shadow,border-color] duration-[0.22s];
}
.match-card:hover {
  @apply -translate-y-1 border-[rgba(255,194,28,0.55)] shadow-[0_24px_54px_rgba(15,23,42,0.14)];
}
.match-card .left {
  @apply w-[430px] h-full min-h-[138px] flex items-center border-r border-slate-200/[0.9];
}
.info {
  @apply w-[140px] pl-[34px];
}
.info .name {
  @apply max-w-[95px] mb-3 text-slate-900 text-base font-extrabold;
}
.info .time {
  @apply inline-flex h-[26px] items-center px-2.5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold;
}
.team {
  @apply w-[245px] flex items-center justify-between gap-2.5;
}
.team-row {
  @apply h-10 flex items-center text-[#111827] text-base font-[650] min-w-0;
}
.team-row--host {
  @apply justify-end flex-1;
}
.team-row--guest {
  @apply justify-start flex-1;
}
.team-vs {
  @apply shrink-0 text-red-500 text-xl font-black;
}
.match-cover {
  @apply w-[34px] h-[34px] mr-3 object-contain shrink-0 drop-shadow-[0_6px_10px_rgba(15,23,42,0.12)];
}
.team-row span {
  @apply max-w-[140px];
}
.match-card .right {
  @apply flex-1 min-w-0 h-full min-h-[138px] flex items-center;
}
.anchor-list {
  @apply flex-1 min-w-0 h-full flex items-center pl-[30px];
}
.avatar-list {
  @apply flex items-center gap-[22px] min-w-0;
}
.avatar-box {
  @apply relative w-[86px] text-center text-slate-700 text-[13px] font-[650];
}
.avatar-box .avatar {
  @apply block w-14 h-14 mx-auto mb-[7px] border-[3px] border-white rounded-full object-cover shadow-[0_10px_24px_rgba(15,23,42,0.12)];
}
.avatar-box .anchor-name {
  @apply w-[86px] h-5 leading-5;
}
.avatar-box .live {
  @apply absolute top-10 left-[52px] w-7 h-[13px] object-contain;
}
.avatar-arrow {
  @apply w-[18px] h-7 border-0 bg-transparent opacity-0 shrink-0;
}
.living-box {
  @apply w-[132px] h-9 mr-9 rounded-full bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] shadow-[0_10px_24px_rgba(248,194,27,0.26)] flex items-center justify-center text-[#111827] text-sm font-extrabold shrink-0;
}
.living-box img {
  @apply w-[11px] h-3 mr-1.5 object-contain;
}
.living-box--pending {
  @apply w-auto bg-none bg-transparent text-[#9a9a9a] shadow-none rounded-none;
}
.match-none {
  @apply h-[380px] bg-white/[0.92] border border-slate-200/[0.82] rounded-[24px] shadow-[0_14px_36px_rgba(15,23,42,0.08)] flex flex-col items-center justify-center text-slate-400 text-sm;
}
.match-none img {
  @apply w-[150px] h-auto mb-4;
}

@media screen and (max-width: 1400px) {
  .match-header-inner,
  .match-wrapper {
    @apply w-[960px];
  }
  .match-card .left {
    @apply w-[390px];
  }
  .info {
    @apply w-[128px] pl-6;
  }
  .avatar-list {
    @apply gap-3;
  }
  .living-box {
    @apply mr-6;
  }
}

@media (max-width: 768px) {
  .match-page {
    @apply bg-[linear-gradient(180deg,rgba(255,198,26,0.1)_0%,rgba(255,198,26,0)_120px),#f8fafc];
  }
  .match-header {
    @apply h-auto bg-transparent border-b-0 shadow-none backdrop-blur-none;
  }
  .match-header-inner {
    @apply w-full p-0;
  }
  .match-mobile-head {
    @apply w-full block;
  }
  .match-mobile-top {
    @apply h-[68px] px-4 bg-[rgba(32,33,36,0.9)] backdrop-blur-[10px] flex items-center justify-between;
  }
  .match-mobile-logo {
    @apply w-[158px] h-auto block;
  }
  .match-mobile-tabs {
    @apply h-[74px] px-4 bg-[rgba(255,198,26,0.92)] backdrop-blur-[10px] flex items-center gap-[38px] overflow-x-auto;
  }
  .match-mobile-tabs a {
    @apply relative shrink-0 text-white no-underline text-[22px] font-extrabold leading-none;
  }
  .match-mobile-tabs a.active::after {
    @apply content-[''] absolute left-1/2 -bottom-[14px] w-3 h-1.5 -ml-1.5 rounded-full bg-white;
  }
  .match-mobile-download {
    @apply min-w-[108px] h-[42px] px-4 rounded-md bg-[#ffc61a] text-white no-underline text-base font-extrabold inline-flex items-center justify-center;
  }
  .match-logo,
  .match-nav,
  .match-auth {
    @apply hidden;
  }
  .match-wrapper {
    @apply w-full min-h-0 py-4 px-3.5 pb-28;
  }
  .match-wrapper::before,
  .match-wrapper::after {
    @apply hidden;
  }
  .match-mobile-day-title {
    @apply block mb-3 text-[#111827] text-2xl font-extrabold;
  }
  .date-list {
    @apply flex gap-2.5 m-0 mb-3.5 p-0 pb-0.5 overflow-x-auto bg-transparent border-0 rounded-none shadow-none h-auto;
  }
  .date-item {
    @apply min-w-[68px] h-16 p-2.5 px-3 rounded-2xl bg-white/[0.9] shadow-[0_8px_24px_rgba(15,23,42,0.08)] flex flex-col items-center justify-center shrink-0;
  }
  .date-item .day {
    @apply mb-1.5 text-sm font-extrabold;
  }
  .date-item .date {
    @apply text-xs;
  }
  .date-item.active {
    @apply shadow-[0_10px_26px_rgba(248,194,27,0.28)];
  }
  .match-box {
    @apply bg-transparent p-0;
  }
  .match-data {
    @apply bg-transparent rounded-none;
  }
  .match-card {
    @apply relative mb-3 p-4 px-3.5 border border-slate-200/[0.9] rounded-[20px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] block bg-white/[0.96] cursor-pointer [-webkit-tap-highlight-color:transparent];
  }
  .match-card:last-child {
    @apply mb-0;
  }
  .match-card:hover {
    @apply transform-none border-slate-200/[0.9] shadow-[0_12px_30px_rgba(15,23,42,0.08)];
  }
  .match-card .left {
    @apply w-full min-h-0 h-auto mb-3.5 block border-r-0;
  }
  .info {
    @apply w-full pl-0 mb-3.5 flex items-center justify-start gap-2.5;
  }
  .info .name {
    @apply max-w-none mb-0 text-[#8c8c8c] text-sm font-semibold;
  }
  .info .time {
    @apply h-auto p-0 bg-transparent text-[#8c8c8c] text-sm font-medium;
  }
  .mobile-bell {
    @apply absolute left-3.5 top-14 w-[22px] h-[22px] p-0 border-0 bg-transparent text-[#111827] inline-flex items-center justify-center opacity-90;
  }
  .mobile-bell svg {
    @apply w-5 h-5 fill-none stroke-current stroke-2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .team {
    @apply w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2.5 pl-7 pr-[72px];
  }
  .team-row {
    @apply h-auto inline-flex items-center text-[17px] font-extrabold leading-[1.35] min-w-0;
  }
  .team-row--host {
    @apply justify-end;
  }
  .team-row--guest {
    @apply justify-start;
  }
  .team-row span {
    @apply max-w-full overflow-hidden whitespace-nowrap text-ellipsis;
  }
  .team-vs {
    @apply text-[#ff2020] text-lg font-black;
  }
  .match-cover {
    @apply w-6 h-6 mr-2;
  }
  .match-card .right {
    @apply w-full min-h-0 h-auto block flex-none;
  }
  .anchor-list {
    @apply flex-none pl-0 w-full h-auto flex items-center justify-center;
  }
  .avatar-arrow {
    @apply hidden;
  }
  .avatar-list {
    @apply min-w-0 gap-3.5 overflow-x-auto pb-0.5 justify-center w-full max-w-full;
  }
  .avatar-box {
    @apply w-[62px] shrink-0 text-[11px] text-[#8c8c8c];
  }
  .avatar-box .avatar {
    @apply w-[50px] h-[50px] mb-1 border-0 shadow-none;
  }
  .avatar-box .anchor-name {
    @apply w-[62px] h-[18px] leading-[18px];
  }
  .avatar-box .live {
    @apply top-[34px] left-5 w-5 h-2.5;
  }
  .living-box {
    @apply absolute top-3.5 right-3.5 w-auto min-w-[72px] h-7 m-0 px-[9px] rounded-full text-xs shrink-0 shadow-none;
  }
  .living-box img {
    @apply w-[9px] h-[9px] mr-1;
  }
  .living-box--pending {
    @apply bg-none bg-transparent text-[#9a9a9a] min-w-0 p-0;
  }
  .living-box--pending img {
    @apply hidden;
  }
  .match-none {
    @apply h-[280px] p-0 border-0 bg-white/[0.96] rounded-[20px] shadow-[0_12px_30px_rgba(15,23,42,0.08)];
  }
  .match-none img {
    @apply w-[120px];
  }
}
</style>
