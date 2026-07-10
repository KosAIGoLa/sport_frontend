<template>
  <div class="news-page">
    <SiteHeader
      :is-logged-in="isLoggedIn"
      force-solid
      @login="openLogin"
      @logout="onLogout"
    />

    <main class="news-wrapper">
      <div class="news-tabs">
        <a href="javascript:;">直播</a>
        <a href="javascript:;" class="active">新闻</a>
        <a href="javascript:;">公告</a>
        <a href="javascript:;">活动</a>
      </div>

      <div class="news-breadcrumb">
        <span>当前位置：</span>
        <a href="/">首页</a>
        <span class="sep">-</span>
        <span>新闻</span>
      </div>

      <article class="news-article">
        <h1 class="news-title">企鹅趣猜玩法介绍！尽情期待......</h1>
        <div class="news-date">2020-07-01</div>

        <div class="news-body">
          <h3>一、基础说明</h3>
          <p>企鹅趣猜是指主播发起一道竞答题目并设置题目和选项，观众可以在两个选项之间竞答，当主播确认了竞答结果后，胜利的一方将会分摊失败的一方的鹅蛋（如下图）。</p>

          <div class="news-example">
            <div class="news-example__title">全场比赛最后谁能拿到MVP？</div>
            <div class="news-example__time">05:33</div>
            <div class="news-example__vs">
              <div class="news-example__option red">
                <strong>二宝</strong>
                <span>倍数0.3</span>
              </div>
              <div class="news-example__center">
                <span>VS</span>
                <small>200万人参与</small>
              </div>
              <div class="news-example__option blue">
                <strong>陈一嘉</strong>
                <span>倍数6.3</span>
              </div>
            </div>
            <div class="news-example__bar">
              <span class="left">98万</span>
              <span class="right">102万</span>
            </div>
          </div>

          <p>点击你要支持的选项，选择或输入投注金额后点击提交即可。</p>
          <p>趣猜功能权限需添加白名单后才可使用，新老主播可根据自己的直播内容，联系相关频道的运营人员进行申请开通。</p>
          <p>每场趣猜题目结束后，会从获胜用户奖池中扣除6%鹅蛋作为给出题主播奖励。</p>
          <p>若奖金金额分配后出现小数，小数后金额四舍五入（如三个人分100鹅蛋，每个33.3，四舍五入后每人发放33鹅蛋）。</p>
          <p>趣猜每次单场单笔投注鹅蛋量最小为10鹅蛋，最大为100万鹅蛋。</p>

          <h3>二、争议处理</h3>
          <p>若出现不可抗力导致题目关闭，均被判为流局，所有用户的鹅蛋将全额返还。</p>
          <p>若主播忘记结算，题目将在12小时后自动判为流局，所有用户的鹅蛋将全额返还，主播不可投注自己出的趣猜题目。</p>
          <p>特殊情况：如果在结算时，有一个或两个选项没有任何人投注，则本题目会判为流局。</p>
          <p>若主播结算错误，用户或主播请第一时间联系客服申诉并提供相关截图。官方会根据直播录像、竞答结果等多方渠道进行核实。确认情况属实，会进行重审或补发鹅蛋，并对主播进行口头教导。</p>
          <p>鹅蛋不可以兑换现金，不可以线下交易，不涉及博彩，禁止其他一切形式的具有倒卖嫌疑的交易。一旦发现违规，将进行账号永封、解约等处理。</p>

          <h3>三、声明</h3>
          <p>趣猜系统旨在提升用户观看直播体验，仅供娱乐交流使用，用户所获奖励不可反向兑换成现金或有价值商品；</p>
          <p>请通过官方渠道获取鹅蛋，禁止一切线下交易、币商收购等不正当行为，官方将对各类以盈利为目的的交易行为进行严厉打击。因非正当渠道获取鹅蛋而无法参与趣猜的，用户需自行承担不利后果。</p>
          <p>任何影响互动公平性的操作，官方有权取消用户参与主播趣猜资格，并对鹅蛋进行收回。情节严重的，平台有权向违规用户索赔，并追究相关法律责任。</p>
          <p>本活动最终解释权归企鹅体育所有。若有发现违规趣猜，欢迎用户举报。</p>

          <div class="news-contact">
            关于主播结算错误的反馈与投诉，请联系官方客服 QQ：800161087
          </div>
        </div>
      </article>

      <div class="news-follow">
        <div class="news-follow__divider">
          <span></span>
          <span>关注我们</span>
          <span></span>
        </div>
        <div class="news-follow__qr-list">
          <div class="news-follow__qr-item">
            <div class="news-follow__qr"></div>
            <span>手机APP下载</span>
          </div>
          <div class="news-follow__qr-item">
            <div class="news-follow__qr"></div>
            <span>官方微博</span>
          </div>
          <div class="news-follow__qr-item">
            <div class="news-follow__qr"></div>
            <span>微信公众号</span>
          </div>
        </div>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<script setup>
const { isLoggedIn } = useAuth()
const loginVisible = ref(false)
const loginType = ref('login')

function openLogin(type = 'login') {
  loginType.value = type
  loginVisible.value = true
}

function onLogout() {
  // noop
}
</script>

<style scoped>
.news-page {
  @apply min-h-screen bg-[#f5f5f5];
}
.news-wrapper {
  @apply w-[min(1200px,calc(100%-24px))] mx-auto py-5 pb-12;
}
.news-tabs {
  @apply flex items-center gap-6 h-12 bg-white rounded-lg px-6 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)];
}
.news-tabs a {
  @apply text-[#333] text-base no-underline transition-colors;
}
.news-tabs a:hover,
.news-tabs a.active {
  @apply text-[#ff5a1f];
}
.news-breadcrumb {
  @apply flex items-center gap-1 text-sm text-[#999] mb-4 px-1;
}
.news-breadcrumb a {
  @apply text-[#666] no-underline hover:text-[#ff5a1f];
}
.news-breadcrumb .sep {
  @apply mx-1;
}
.news-article {
  @apply bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-8 py-8;
}
.news-title {
  @apply text-2xl font-bold text-[#333] text-center mb-2;
}
.news-date {
  @apply text-sm text-[#999] text-center mb-8;
}
.news-body h3 {
  @apply text-base font-bold text-[#333] mt-6 mb-3;
}
.news-body p {
  @apply text-sm text-[#555] leading-7 mb-3;
}
.news-example {
  @apply max-w-[520px] mx-auto my-6 p-4 rounded-lg border border-slate-100 bg-[#fafafa] text-center;
}
.news-example__title {
  @apply text-base font-bold text-[#666] mb-2;
}
.news-example__time {
  @apply text-xs text-[#999] mb-3;
}
.news-example__vs {
  @apply flex items-center justify-center gap-3 mb-3;
}
.news-example__option {
  @apply w-32 h-20 rounded-lg text-white flex flex-col items-center justify-center;
}
.news-example__option.red {
  @apply bg-[linear-gradient(135deg,#ff7e7e_0%,#ff5a5a_100%)];
}
.news-example__option.blue {
  @apply bg-[linear-gradient(135deg,#5a8bff_0%,#7ea8ff_100%)];
}
.news-example__option strong {
  @apply text-base font-bold;
}
.news-example__option span {
  @apply text-xs;
}
.news-example__center {
  @apply flex flex-col items-center text-[#999];
}
.news-example__center span {
  @apply text-sm font-bold;
}
.news-example__center small {
  @apply text-xs;
}
.news-example__bar {
  @apply h-7 flex rounded-full overflow-hidden text-xs text-white;
}
.news-example__bar .left {
  @apply w-1/2 bg-[#ff5a5a] flex items-center justify-start pl-3;
}
.news-example__bar .right {
  @apply w-1/2 bg-[#5a8bff] flex items-center justify-end pr-3;
}
.news-contact {
  @apply text-sm text-[#666] mt-8 py-4 border-t border-slate-100;
}
.news-follow {
  @apply mt-10 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] px-8 py-8;
}
.news-follow__divider {
  @apply flex items-center justify-center gap-3 text-sm text-[#333] mb-8;
}
.news-follow__divider span:first-child,
.news-follow__divider span:last-child {
  @apply flex-1 h-px bg-slate-200;
  background-image: radial-gradient(circle, #ccc 1px, transparent 1px);
  background-size: 8px 1px;
  background-repeat: repeat-x;
}
.news-follow__qr-list {
  @apply flex items-start justify-center gap-16;
}
.news-follow__qr-item {
  @apply flex flex-col items-center gap-2 text-sm text-[#666];
}
.news-follow__qr {
  @apply w-28 h-28 bg-slate-100 rounded border border-slate-200;
}
</style>
