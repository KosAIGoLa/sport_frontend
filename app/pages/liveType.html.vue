<template>
  <div class="live-type-page">
    <header class="live-header">
      <div class="live-header-inner">
        <a class="live-logo" href="/">
          <img src="/assets/logo2.png" alt="857直播">
        </a>
        <nav class="live-nav">
          <a href="/">首页</a>
          <a class="active" href="/liveType.html">全部直播</a>
          <a href="/match.html">赛程</a>
          <a class="download" href="/download" target="_blank" rel="noopener noreferrer">
            下载APP
            <img src="/assets/hot.png" alt="hot">
          </a>
        </nav>
        <div class="live-auth">
          <button type="button" class="login-btn" @click="openLogin('login')">登录</button>
          <button type="button" @click="openLogin('register')">注册</button>
        </div>
      </div>
    </header>
    <main class="live-type-main">
      <LiveCategory title-image="/assets/hot-live.png" title-alt="全部直播" more-link="/liveType.html" :lives="allLives" show-filter :categories="['全部', '足球', '篮球', '分析']" />
    </main>
    <footer class="live-footer">
      <div class="live-footer-inner">
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
      @success="isLoggedIn = true"
    />
  </div>
</template>

<script setup>
definePageMeta({
  path: '/liveType.html'
})

const tipVisible = ref(false)
const tipTitle = ref('')
const tipContent = ref('')

const isLoggedIn = ref(false)
const loginVisible = ref(false)
const loginType = ref('login')

function openLogin(type) {
  loginType.value = type
  loginVisible.value = true
}

const allLives = [
  { title: '爱沙甲 潭美卡VS哈留足球学院', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240222/23a0fd3943d7d814ba5f46a3c316dd25.png', anchor: '司马老贼', viewers: '5.20w', tag: '足球' },
  { title: '哈萨克超 卡萨尔vs伊特什', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20251112/7c61f9874371fec5fd7b73df63fb23e5.jpg', anchor: '大帝', viewers: '8.52w', tag: '足球' },
  { title: '英超 曼城 VS 阿森纳', cover: 'https://sta.ncctrials.com/file/common/20260705/da243db7abd0bf0d3660c1766abf1908_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a.jpg', anchor: '评述员阿虎', viewers: '11.10w', tag: '足球' },
  { title: 'NBA 湖人 VS 勇士', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240224/100ce75e32ce79c21e3baa33db3c9220.jpg', anchor: '篮球小王', viewers: '3.80w', tag: '篮球' },
  { title: 'CBA 广东 VS 辽宁', cover: 'https://sta.ncctrials.com/file/common/20260627/f41c9604ab224cf5c9daeaff94356933_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a.jpg', anchor: '阿虎', viewers: '2.50w', tag: '篮球' },
  { title: '老万每日赛事分析', cover: 'https://sta.ncctrials.com/file/common/20230217/7045823059a1d115eda50c8c616609da_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20221025/fd6967ccf7f83828c033c6b7a9358733.jpeg', anchor: '老万', viewers: '6.31w', tag: '分析' },
  { title: '临场解盘：瑞典超焦点战', cover: 'https://sta.ncctrials.com/file/common/20250805/b38bb3088a743ba2aef1ea3df0e3a24d_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20201128/2aac51efa098872b4ddb9c1c32d9bce5', anchor: '都教授', viewers: '4.10w', tag: '分析' },
  { title: '盘口变化深度解读', cover: 'https://sta.ncctrials.com/file/common/20260509/cbed26223a5f4dedba17eab9339d2c4c_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20251116/468aac5f8b85b1e54a7809040714b36d.jpg', anchor: '老仙儿', viewers: '3.20w', tag: '分析' },
  { title: '今日足篮大势分析', cover: 'https://sta.ncctrials.com/file/common/20230903/2e26b7c3627616ee952f2c64268762d8_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20230902/b6105a741b54f02e02fc3b707e0e45f9.jpg', anchor: '伊布', viewers: '1.80w', tag: '分析' },
  { title: '粉丝连麦互动分析', cover: 'https://sta.ncctrials.com/file/common/20260617/05cbb9832bf92bb680f116b1627b38fd_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20260505/ec8e8b84c119776b0cd89ee656926636.png', anchor: '蓝狐', viewers: '0.90w', tag: '分析' }
]

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
.live-type-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 12% 0%, rgba(255, 199, 28, 0.18), transparent 28%),
    radial-gradient(circle at 86% 12%, rgba(33, 138, 255, 0.14), transparent 30%),
    linear-gradient(180deg, #f8fafc 0%, #eef3f9 52%, #f8fafc 100%);
  color: #111827;
}

.live-header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 72px;
  background: rgba(255, 255, 255, 0.86);
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(18px);
}

.live-header-inner {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.live-logo {
  display: flex;
  align-items: center;
  margin-right: 58px;
}

.live-logo img {
  width: 160px;
  height: auto;
  display: block;
}

.live-nav {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 16px;
  font-weight: 650;
}

.live-nav a {
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

.live-nav a:hover,
.live-nav a.active {
  color: #111827;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  box-shadow: 0 8px 18px rgba(248, 194, 27, 0.28);
}

.live-nav a.download {
  color: #f59e0b;
}

.live-nav a.download img {
  position: absolute;
  top: -7px;
  right: -23px;
  width: 29px;
  height: auto;
}

.live-auth {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

.live-auth button {
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

.live-auth button:hover {
  border-color: rgba(255, 194, 28, 0.8);
  background: #fff7d6;
}

.live-auth .login-btn::before {
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

.live-type-main {
  position: relative;
  padding: 42px 0 72px;
}

.live-type-main::before {
  content: '全部直播';
  display: block;
  width: 1200px;
  margin: 0 auto 8px;
  color: #0f172a;
  font-size: 30px;
  font-weight: 850;
  letter-spacing: -0.4px;
}

.live-type-main::after {
  content: '精选赛事直播间，热门主播实时开播';
  display: block;
  width: 1200px;
  margin: -2px auto 4px;
  color: #64748b;
  font-size: 14px;
}

.live-footer {
  background: linear-gradient(135deg, #111827 0%, #25284d 100%);
}

.live-footer-inner {
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

.live-footer p {
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
  .live-header-inner,
  .live-type-main::before,
  .live-type-main::after,
  .live-footer-inner {
    width: 960px;
  }
}
</style>
