<template>
  <div class="match-page">
    <header class="match-header">
      <div class="match-header-inner">
        <a class="match-logo" href="/">
          <img src="/assets/logo2.png" alt="857直播">
        </a>
        <nav class="match-nav">
          <a href="/">首页</a>
          <a href="/liveType.html">全部直播</a>
          <a class="active" href="/match.html">赛程</a>
          <a class="download" href="/download" target="_blank" rel="noopener noreferrer">
            下载APP
            <img src="/assets/hot.png" alt="hot">
          </a>
        </nav>
        <div class="match-auth">
          <button type="button" class="login-btn" @click="openLogin('login')">登录</button>
          <button type="button" @click="openLogin('register')">注册</button>
        </div>
      </div>
    </header>

    <main class="match-wrapper">
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
          <article v-for="match in matches" :key="match.id" class="match-card">
            <div class="left">
              <div class="info">
                <div class="name ellipsis">{{ match.league }}</div>
                <div class="time">{{ match.time }}</div>
              </div>
              <div class="team">
                <div class="team-row">
                  <img class="match-cover" :src="match.hostLogo" alt="">
                  <span class="ellipsis">{{ match.host }}</span>
                </div>
                <div class="team-row">
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
              <div class="living-box">
                <img src="https://sta.ncctrials.com/857web/assets/857/img/triangle.png" alt="">
                <span>直播中...</span>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>

    <footer class="match-footer">
      <div class="match-footer-inner">
        <img class="footer-logo" src="/assets/logo-footer.png" alt="857直播">
        <div class="footer-links">
          <a href="javascript:;" @click="openTip('guide')">新手主播教程</a>
          <a href="javascript:;" @click="openTip('faq')">直播常见问题</a>
          <a href="javascript:;" @click="openTip('agreement')">用户协议说明</a>
        </div>
        <p>Copyright © 2020 , All rights reserved.</p>
      </div>
    </footer>

    <div v-if="tipVisible" class="footer-tip-mask" @click="tipVisible = false">
      <div class="footer-tip" @click.stop>
        <div class="footer-tip-head">{{ tipTitle }}</div>
        <div class="footer-tip-body">{{ tipContent }}</div>
        <button type="button" class="footer-tip-close" @click="tipVisible = false">知道了</button>
      </div>
    </div>

    <LoginModal
      v-model:visible="loginVisible"
      :type="loginType"
      @success="loginVisible = false"
    />
  </div>
</template>

<script setup>
definePageMeta({
  path: '/match.html'
})

const activeDay = ref(0)
const loginVisible = ref(false)
const loginType = ref('login')

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
    league: '哈萨克超',
    time: '07-05 10:00',
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
    league: '哈萨克超',
    time: '07-05 10:00',
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
    league: '挪甲',
    time: '07-05 10:00',
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
    league: '世欧预',
    time: '07-05 10:00',
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
    league: '瑞典超',
    time: '07-05 10:30',
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
    league: '一起来聊球',
    time: '07-05 11:00',
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
    league: '哈萨克超',
    time: '07-05 11:00',
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
    league: '哈萨克超',
    time: '07-05 11:00',
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
    league: '欧青U19',
    time: '07-05 11:00',
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
    league: '欧青U19',
    time: '07-05 11:00',
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
    league: '芬甲',
    time: '07-05 11:30',
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
    league: '世欧预',
    time: '07-05 11:30',
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
  loginType.value = type
  loginVisible.value = true
}

const tipVisible = ref(false)
const tipTitle = ref('')
const tipContent = ref('')

const tipMap = {
  guide: {
    title: '新手主播教程',
    content: '1. 注册并实名认证后申请主播权限。\n2. 准备清晰摄像头、稳定网络与安静环境。\n3. 开播前填写标题、分类与封面。\n4. 开播后保持互动，遵守平台规范。'
  },
  faq: {
    title: '直播常见问题',
    content: 'Q: 开播卡顿怎么办？\nA: 请降低分辨率或切换网络。\n\nQ: 无法观看直播？\nA: 建议更换浏览器或刷新页面。\n\nQ: 如何预约比赛？\nA: 在赛程页点击「预约」按钮即可。'
  },
  agreement: {
    title: '用户协议说明',
    content: '用户使用本平台服务需遵守相关法律法规，禁止传播违法违规内容。主播内容版权归平台与主播共有，违规行为将受到警告、封禁或法律追责。'
  }
}

function openTip(key) {
  const item = tipMap[key]
  if (item) {
    tipTitle.value = item.title
    tipContent.value = item.content
    tipVisible.value = true
  }
}
</script>

<style scoped>
.match-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 12% 0%, rgba(255, 199, 28, 0.16), transparent 28%),
    radial-gradient(circle at 88% 14%, rgba(33, 138, 255, 0.14), transparent 30%),
    linear-gradient(180deg, #f8fafc 0%, #eef3f9 52%, #f8fafc 100%);
  color: #111827;
  font-family: Inter, PingFang SC, tahoma, arial, 'Microsoft Yahei', 'Hiragino Sans GB', sans-serif;
}

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.match-header {
  position: sticky;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 72px;
  background: rgba(255, 255, 255, 0.86);
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(18px);
}

.match-header-inner {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.match-logo {
  display: flex;
  align-items: center;
  width: 160px;
  margin-right: 58px;
}

.match-logo img {
  width: 160px;
  display: block;
}

.match-nav {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 100%;
  font-size: 16px;
  font-weight: 650;
}

.match-nav a {
  position: relative;
  height: 36px;
  padding: 0 18px;
  line-height: 36px;
  color: #111827;
  text-decoration: none;
  border-radius: 999px;
  white-space: nowrap;
  transition: all 0.2s;
}

.match-nav a.active,
.match-nav a:hover {
  color: #111827;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  box-shadow: 0 8px 18px rgba(248, 194, 27, 0.28);
}

.match-nav a.download {
  color: #f59e0b;
}

.match-nav a.download:hover {
  background: #fff7d6;
}

.match-nav a.download img {
  position: absolute;
  top: -7px;
  right: -27px;
  width: 29px;
  height: 19px;
}

.match-auth {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.match-auth button {
  appearance: none;
  height: 34px;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  padding: 0 14px;
  color: #111827;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.match-auth button:hover {
  border-color: rgba(255, 194, 28, 0.8);
  background: #fff7d6;
}

.match-auth .login-btn::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 6px;
  background: #22c55e;
  border-radius: 50%;
  vertical-align: 1px;
  box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.12);
}

.match-wrapper {
  width: 1200px;
  min-height: calc(100vh - 312px);
  margin: 0 auto;
  padding-top: 42px;
  padding-bottom: 64px;
}

.match-wrapper::before {
  content: '赛程中心';
  display: block;
  margin-bottom: 8px;
  color: #0f172a;
  font-size: 30px;
  font-weight: 850;
  letter-spacing: -0.4px;
}

.match-wrapper::after {
  content: '实时赛事安排，快速预约你关注的比赛';
  display: block;
  margin: -2px 0 20px;
  color: #64748b;
  font-size: 14px;
}

.date-list {
  height: 96px;
  margin-bottom: 24px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.92);
  border-radius: 24px;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(14px);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}

.date-item {
  position: relative;
  appearance: none;
  border: 0;
  border-radius: 18px;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  transition: all 0.22s;
}

.date-item:hover {
  background: #f8fafc;
}

.date-item .day,
.date-item .date {
  display: block;
}

.date-item .day {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 750;
}

.date-item .date {
  font-size: 14px;
}

.date-item.active {
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  color: #111827;
  box-shadow: 0 12px 26px rgba(248, 194, 27, 0.28);
}

.match-box {
  position: relative;
}

.match-card {
  min-height: 138px;
  margin-bottom: 14px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(226, 232, 240, 0.82);
  border-radius: 22px;
  display: flex;
  align-items: center;
  overflow: hidden;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
  transition: transform 0.22s, box-shadow 0.22s, border-color 0.22s;
}

.match-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 194, 28, 0.55);
  box-shadow: 0 24px 54px rgba(15, 23, 42, 0.14);
}

.match-card .left {
  width: 430px;
  height: 100%;
  min-height: 138px;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(226, 232, 240, 0.9);
}

.info {
  width: 140px;
  padding-left: 34px;
}

.info .name {
  max-width: 95px;
  margin-bottom: 12px;
  color: #0f172a;
  font-size: 16px;
  font-weight: 800;
}

.info .time {
  display: inline-flex;
  height: 26px;
  align-items: center;
  padding: 0 10px;
  border-radius: 999px;
  background: #f1f5f9;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
}

.team {
  width: 245px;
}

.team-row {
  height: 40px;
  display: flex;
  align-items: center;
  color: #111827;
  font-size: 16px;
  font-weight: 650;
}

.team-row + .team-row {
  margin-top: 10px;
}

.match-cover {
  width: 34px;
  height: 34px;
  margin-right: 12px;
  object-fit: contain;
  flex: 0 0 auto;
  filter: drop-shadow(0 6px 10px rgba(15, 23, 42, 0.12));
}

.team-row span {
  max-width: 180px;
}

.match-card .right {
  flex: 1;
  min-width: 0;
  height: 100%;
  min-height: 138px;
  display: flex;
  align-items: center;
}

.anchor-list {
  flex: 1;
  min-width: 0;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 30px;
}

.avatar-list {
  display: flex;
  align-items: center;
  gap: 22px;
  min-width: 0;
}

.avatar-box {
  position: relative;
  width: 86px;
  text-align: center;
  color: #334155;
  font-size: 13px;
  font-weight: 650;
}

.avatar-box .avatar {
  display: block;
  width: 56px;
  height: 56px;
  margin: 0 auto 7px;
  border: 3px solid #fff;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
}

.avatar-box .anchor-name {
  width: 86px;
  height: 20px;
  line-height: 20px;
}

.avatar-box .live {
  position: absolute;
  top: 40px;
  left: 52px;
  width: 28px;
  height: 13px;
  object-fit: contain;
}

.avatar-arrow {
  width: 18px;
  height: 28px;
  border: 0;
  background: transparent;
  opacity: 0;
  flex: 0 0 auto;
}

.living-box {
  width: 132px;
  height: 36px;
  margin-right: 36px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  box-shadow: 0 10px 24px rgba(248, 194, 27, 0.26);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #111827;
  font-size: 14px;
  font-weight: 800;
  flex: 0 0 auto;
}

.living-box img {
  width: 11px;
  height: 12px;
  margin-right: 6px;
  object-fit: contain;
}

.match-none {
  height: 380px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(226, 232, 240, 0.82);
  border-radius: 24px;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 14px;
}

.match-none img {
  width: 150px;
  height: auto;
  margin-bottom: 16px;
}

.match-footer {
  background: linear-gradient(135deg, #111827 0%, #25284d 100%);
}

.match-footer-inner {
  width: 1200px;
  height: 240px;
  margin: 0 auto;
  text-align: center;
  padding-top: 25px;
}

.footer-logo {
  width: 52px;
  height: 52px;
  display: block;
  margin: 0 auto 34px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 68px;
  margin-bottom: 17px;
}

.footer-links a {
  color: #c7d2fe;
  font-size: 16px;
  text-decoration: none;
}

.footer-links a:hover {
  color: #ffc21c;
}

.match-footer p {
  margin: 0;
  color: #818cf8;
  font-size: 14px;
}

.footer-tip-mask {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-tip {
  width: 460px;
  max-width: calc(100vw - 40px);
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.22);
  padding: 28px 32px 24px;
  color: #111827;
  animation: tipFade 0.22s ease-out;
}

@keyframes tipFade {
  from { opacity: 0; transform: translateY(20px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.footer-tip-head {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 14px;
  color: #0f172a;
}

.footer-tip-body {
  font-size: 15px;
  line-height: 1.8;
  color: #334155;
  white-space: pre-line;
  margin-bottom: 22px;
}

.footer-tip-close {
  width: 100%;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  color: #111827;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(248, 194, 27, 0.28);
}

@media screen and (max-width: 1400px) {
  .match-header-inner,
  .match-wrapper,
  .match-footer-inner {
    width: 960px;
  }

  .match-card .left {
    width: 390px;
  }

  .info {
    width: 128px;
    padding-left: 24px;
  }

  .avatar-list {
    gap: 12px;
  }

  .living-box {
    margin-right: 24px;
  }
}
</style>
