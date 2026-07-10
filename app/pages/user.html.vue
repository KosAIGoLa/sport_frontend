<template>
  <div class="user-center-page">
    <SiteHeader
      :is-logged-in="isLoggedIn"
      force-solid
      @login="openLogin"
      @logout="handleLogout"
    />

    <main class="user-center-wrapper">
      <aside class="user-sidebar">
        <nav class="user-menu">
          <a
            v-for="item in menu"
            :key="item.key"
            href="javascript:;"
            :class="{ active: activeMenu === item.key }"
            @click.prevent="activeMenu = item.key"
          >
            <svg class="menu-icon" viewBox="0 0 24 24" fill="currentColor">
              <path :d="item.path" />
            </svg>
            <span>{{ item.label }}</span>
          </a>
        </nav>
        <button type="button" class="apply-live-sidebar-btn">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
          </svg>
          申请直播
        </button>
      </aside>

      <section class="user-content">
        <div class="user-profile-card">
          <div class="user-profile-left">
            <img class="user-avatar" src="/assets/frog-avatar.png" alt="avatar">
            <div class="user-info">
              <div class="user-name-row">
                <h1 class="user-name">企鹅玩家Kc2hI9</h1>
                <svg class="edit-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
              </div>
              <div class="user-level-row">
                <span class="level-badge">LV1</span>
                <div class="level-track">
                  <div class="level-fill" style="width: 0.5%"></div>
                </div>
                <a class="level-rule" href="javascript:;">查看等级规则</a>
              </div>
              <div class="user-assets-row">
                <span class="asset">
                  <i class="asset-dot liver"></i>
                  鹅肝：0.00
                </span>
                <span class="asset">
                  <i class="asset-dot egg"></i>
                  鹅蛋：0
                </span>
                <button class="recharge-btn" type="button">充值</button>
              </div>
              <div class="user-links-row">
                <a href="javascript:;">上传视频</a>
                <span class="sep">|</span>
                <a href="javascript:;">我的视频空间</a>
              </div>
            </div>
          </div>
          <button class="go-live-btn" type="button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
            </svg>
            我要直播
          </button>
        </div>

        <div v-if="activeMenu === 'profile'" class="profile-panel">
          <div class="user-tabs">
            <button
              v-for="tab in tabs"
              :key="tab"
              type="button"
              :class="{ active: activeTab === tab }"
              @click="activeTab = tab"
            >
              {{ tab }}
            </button>
          </div>

          <div class="user-cards-grid">
            <div class="info-card">
              <div class="info-card-icon phone">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <div class="info-card-body">
                <div class="info-card-title-row">
                  <h3>未绑定手机</h3>
                  <a href="javascript:;" class="action-link">立即绑定</a>
                </div>
                <p>绑定手机后可以享受到手机相关的安全及提醒服务</p>
              </div>
            </div>
            <div class="info-card">
              <div class="info-card-icon idcard">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
                </svg>
              </div>
              <div class="info-card-body">
                <div class="info-card-title-row">
                  <h3>实名认证</h3>
                  <a href="javascript:;" class="action-link">立即认证</a>
                </div>
                <p>尚未实名认证，无法申请直播间</p>
              </div>
            </div>
          </div>

          <div class="vip-banner">
            <div class="vip-banner-text">
              <h2>五大贵族 尊享特权</h2>
              <span class="vip-tag">企鹅贵族</span>
            </div>
            <button class="vip-btn" type="button">查看贵族特权</button>
          </div>
        </div>

        <div v-else-if="activeMenu === 'message'" class="message-panel">
          <div v-for="msg in messages" :key="msg.date" class="message-item">
            <div class="message-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
              </svg>
            </div>
            <div class="message-body">
              <div class="message-header">
                <span class="message-title">{{ msg.title }}</span>
                <span class="message-date">{{ msg.date }}</span>
              </div>
              <p class="message-content">{{ msg.content }}</p>
            </div>
          </div>
        </div>

        <div v-else-if="activeMenu === 'wealth'" class="wealth-panel">
          <div class="wealth-tabs">
            <button
              v-for="tab in wealthTabs"
              :key="tab"
              type="button"
              :class="{ active: activeWealthTab === tab }"
              @click="activeWealthTab = tab"
            >
              {{ tab }}
            </button>
          </div>
          <div class="wealth-filter">
            <select v-model="wealthMonth" class="wealth-month-select">
              <option value="本月">本月</option>
              <option value="上月">上月</option>
              <option value="最近三个月">最近三个月</option>
            </select>
          </div>
          <div class="wealth-table-wrap">
            <table class="wealth-table">
              <thead>
                <tr>
                  <th>消费时间</th>
                  <th>主播</th>
                  <th>礼物</th>
                  <th>单价（鹅肝）</th>
                  <th>数量</th>
                </tr>
              </thead>
              <tbody>
                <tr class="empty-row">
                  <td colspan="5">--暂无消费记录--</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="activeMenu === 'order'" class="order-panel">
          <div class="order-table-wrap">
            <table class="order-table">
              <thead>
                <tr>
                  <th>下单时间</th>
                  <th>订单编号</th>
                  <th>商品名称</th>
                  <th>方式</th>
                  <th>价格</th>
                  <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr class="empty-row">
                  <td colspan="6">--暂无消费记录--</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="activeMenu === 'appointment'" class="appointment-panel">
          <EmptyState image="/assets/appointment-penguin.png" text="你还没有预约任何比赛" />
        </div>

        <div v-else-if="activeMenu === 'guess'" class="guess-panel">
          <div class="guess-header">
            <h3>投注记录</h3>
            <button type="button" class="complaint-btn">投诉</button>
          </div>
          <div class="guess-table-wrap">
            <table class="guess-table">
              <thead>
                <tr>
                  <th>投注时间</th>
                  <th>趣猜主题</th>
                  <th>出题主播</th>
                  <th>投注选项</th>
                  <th>投注金额</th>
                  <th>盈亏</th>
                </tr>
              </thead>
              <tbody>
                <tr class="empty-row">
                  <td colspan="6">--暂无投注记录--</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="activeMenu === 'medal'" class="medal-panel">
          <div class="medal-tabs">
            <button type="button" :class="{ active: medalMainTab === 'limited' }" @click="medalMainTab = 'limited'">限时活动</button>
            <button type="button" :class="{ active: medalMainTab === 'site' }" @click="medalMainTab = 'site'">全站活动</button>
            <a class="medal-rule" href="javascript:;">佩戴规则</a>
          </div>
          <div class="medal-filters">
            <button
              v-for="filter in medalFilters"
              :key="filter"
              type="button"
              :class="{ active: activeMedalFilter === filter }"
              @click="activeMedalFilter = filter"
            >
              {{ filter }}
            </button>
          </div>
          <div class="medal-grid">
            <div v-for="item in medals" :key="item.name" class="medal-card">
              <div class="medal-icon">
                <svg viewBox="0 0 64 80" fill="none">
                  <path d="M32 4L6 14v24c0 18 11 34 26 38 15-4 26-20 26-38V14L32 4z" fill="#d1d5db" stroke="#9ca3af" stroke-width="2"/>
                  <circle cx="32" cy="32" r="12" fill="#e5e7eb" stroke="#9ca3af" stroke-width="2"/>
                </svg>
                <span class="medal-icon-label">{{ item.name }}</span>
              </div>
              <a class="medal-guide" href="javascript:;">解锁攻略</a>
            </div>
          </div>
        </div>

        <div v-else-if="activeMenu === 'contribute'" class="contribute-panel">
          <div class="contribute-tabs">
            <button type="button" :class="{ active: contributeTab === 'published' }" @click="contributeTab = 'published'">已发布</button>
            <span class="contribute-divider">|</span>
            <button type="button" :class="{ active: contributeTab === 'unpublished' }" @click="contributeTab = 'unpublished'">未发布</button>
          </div>
          <EmptyState image="/assets/appointment-penguin.png" text="您还没有上传视频，点击立即前往！" button-text="上传视频" />
        </div>

        <div v-else-if="activeMenu === 'room'" class="room-panel">
          <div class="room-table-wrap">
            <table class="room-table">
              <thead>
                <tr>
                  <th>房间名</th>
                  <th>主播</th>
                  <th>最近开播</th>
                  <th>最近访问</th>
                  <th>管理</th>
                </tr>
              </thead>
              <tbody>
                <tr class="empty-row">
                  <td colspan="5">--还没有管理的房间--</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="activeMenu === 'realname'" class="realname-panel">
          <div class="info-card">
            <div class="info-card-icon idcard">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
            <div class="info-card-body">
              <div class="info-card-title-row">
                <h3>实名认证</h3>
                <a href="javascript:;" class="action-link">立即认证</a>
              </div>
              <p>尚未实名认证，无法申请直播间</p>
            </div>
          </div>
        </div>

        <div v-else class="empty-panel">
          <img src="/assets/none.png" alt="">
          <span>--暂无数据--</span>
        </div>
      </section>
    </main>

    <SiteFooter />
    <LoginModal v-model:visible="loginVisible" :type="loginType" @success="isLoggedIn = true" />
  </div>
</template>

<script setup>
const { t } = useI18n()
useHead(() => ({
  title: t('page.titleUserCenter')
}))

const router = useRouter()
const isLoggedIn = ref(true)
const loginVisible = ref(false)
const loginType = ref('login')
const activeMenu = ref('profile')
const activeTab = ref('基本资料')
const activeWealthTab = ref('鹅肝消费记录')
const wealthMonth = ref('本月')
const medalMainTab = ref('limited')
const activeMedalFilter = ref('NBA球队热度榜')
const contributeTab = ref('published')
const medalFilters = ['NBA球队热度榜', 'NBA死忠粉丝榜', '首充活动', '锦旗', '2019春节活动', '商城专卖']
const medals = [
  { name: '76人' },
  { name: '湖人' },
  { name: '掘金' },
  { name: '开拓者' },
  { name: '快船' },
  { name: '马刺' },
  { name: '鹈鹕' },
  { name: '小牛' }
]

const menu = [
  { key: 'profile', label: '我的资料', path: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
  { key: 'message', label: '我的消息', path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
  { key: 'wealth', label: '我的财富', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' },
  { key: 'follow', label: '我的关注', path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
  { key: 'order', label: '视频订单', path: 'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z' },
  { key: 'history', label: '观看历史', path: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z' },
  { key: 'appointment', label: '赛事预约', path: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z' },
  { key: 'guess', label: '我的趣猜', path: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.38 4.94A5.005 5.005 0 0012 19.94 5.005 5.005 0 0016.62 12.94C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM7 10.82c-.85-.25-1.51-.99-1.51-1.93V7h2v3.82zm11-1.93c0 .94-.66 1.68-1.51 1.93V7h2v1.89z' },
  { key: 'medal', label: '我的奖牌', path: 'M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z' },
  { key: 'contribute', label: '我的投稿', path: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z' },
  { key: 'collection', label: '视频收藏', path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' },
  { key: 'room', label: '房间管理', path: 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z' },
  { key: 'realname', label: '实名认证', path: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z' }
]

const tabs = ['基本资料', '修改头像', '修改昵称', '实名认证', '绑定手机']
const wealthTabs = ['鹅肝消费记录', '鹅蛋记录', '装备包使用记录', '门票消费', '卡券明细']

const messages = [
  {
    title: '官方公告',
    date: '2026-04-30',
    content: '反诈中心提示您：临近假期，出行要提高反诈意识，接到自称航空公司客服拨打的关于退票或理赔电话，务必通过官方渠道确认。购买各类商品及演唱会门票，要通过官方平台。购买体育彩票要到线下实体店，任何通过网络销售的体育彩票都是非法彩票。凡是让您点击陌生链接、下载陌生APP或索要银行卡密码、短信验证码的，都是诈骗。'
  },
  {
    title: '官方公告',
    date: '2026-04-17',
    content: '官方提示：电信网络诈骗手法千变万化，各种套路层出不穷，请您牢记：陌生来电不轻信、未知链接不点击、个人信息不遗漏、转账汇款多核实。祝您生活愉快！'
  }
]

function openLogin(type) {
  loginType.value = type
  loginVisible.value = true
}

function handleLogout() {
  isLoggedIn.value = false
  router.push('/')
}
</script>

<style scoped>
.user-center-page {
  @apply min-h-screen bg-[#f5f5f5] pt-[72px];
}
.user-center-wrapper {
  @apply w-[1200px] mx-auto py-8 flex gap-5;
}
.user-sidebar {
  @apply w-[180px] shrink-0 bg-white rounded-xl shadow-sm overflow-hidden;
}
.user-menu a {
  @apply flex items-center gap-3 px-5 py-4 text-[#666] text-sm font-medium transition-colors relative hover:text-[#f84c4c];
}
.user-menu a.active {
  @apply text-[#f84c4c] bg-[#fff5f5];
}
.user-menu a.active::before {
  @apply content-[''] absolute left-0 top-0 bottom-0 w-1 bg-[#f84c4c];
}
.apply-live-sidebar-btn {
  @apply mx-5 mt-4 mb-5 w-[calc(100%-40px)] flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#ff4d4f] text-white text-sm font-medium border-0 cursor-pointer hover:bg-[#ff7875] transition-colors;
}
.apply-live-sidebar-btn svg {
  @apply w-4 h-4;
}
.menu-icon {
  @apply w-5 h-5;
}
.user-content {
  @apply flex-1 min-w-0;
}
.user-profile-card {
  @apply bg-white rounded-xl shadow-sm p-6 flex items-start justify-between mb-5;
}
.user-profile-left {
  @apply flex gap-5;
}
.user-avatar {
  @apply w-[88px] h-[88px] rounded-lg object-cover;
}
.user-info {
  @apply flex flex-col gap-3 pt-1;
}
.user-name-row {
  @apply flex items-center gap-2;
}
.user-name {
  @apply text-xl font-bold text-[#333];
}
.edit-icon {
  @apply w-4 h-4 text-[#999] cursor-pointer hover:text-[#f84c4c];
}
.user-level-row {
  @apply flex items-center gap-3 text-xs;
}
.level-badge {
  @apply px-2 py-0.5 rounded-full bg-[#52c41a] text-white font-bold;
}
.level-track {
  @apply w-[200px] h-2 bg-[#eee] rounded-full overflow-hidden;
}
.level-fill {
  @apply h-full bg-[#52c41a] rounded-full;
}
.level-rule {
  @apply text-[#999] hover:text-[#f84c4c];
}
.user-assets-row {
  @apply flex items-center gap-4 text-sm text-[#333];
}
.asset {
  @apply flex items-center gap-1.5;
}
.asset-dot {
  @apply w-4 h-4 rounded-full;
}
.asset-dot.liver {
  @apply bg-[#ff4d4f];
}
.asset-dot.egg {
  @apply bg-[#ff7a45];
}
.recharge-btn {
  @apply px-4 py-1 rounded-full bg-[#ff4d4f] text-white text-xs font-semibold hover:bg-[#ff7875] transition-colors;
}
.user-links-row {
  @apply flex items-center gap-2 text-xs text-[#999];
}
.user-links-row a {
  @apply hover:text-[#f84c4c];
}
.go-live-btn {
  @apply inline-flex items-center gap-1.5 px-5 py-2 border border-[#ff4d4f] rounded-full text-[#ff4d4f] text-sm font-semibold hover:bg-[#fff5f5] transition-colors;
}
.go-live-btn svg {
  @apply w-4 h-4;
}
.user-tabs {
  @apply bg-white rounded-xl shadow-sm px-6 mb-5 flex items-center border-b border-[#f0f0f0];
}
.user-tabs button {
  @apply relative px-4 py-4 text-sm text-[#666] font-medium hover:text-[#333] transition-colors;
}
.user-tabs button.active {
  @apply text-[#ff4d4f];
}
.user-tabs button.active::after {
  @apply content-[''] absolute left-0 right-0 bottom-0 h-0.5 bg-[#ff4d4f];
}
.user-cards-grid {
  @apply grid grid-cols-2 gap-5 mb-5;
}
.info-card {
  @apply bg-white rounded-xl shadow-sm p-5 flex gap-4;
}
.info-card-icon {
  @apply w-12 h-12 rounded-full bg-[#f5f5f5] flex items-center justify-center shrink-0 text-[#999];
}
.info-card-icon svg {
  @apply w-6 h-6;
}
.info-card-title-row {
  @apply flex items-center gap-3 mb-2;
}
.info-card-title-row h3 {
  @apply text-base font-bold text-[#333];
}
.action-link {
  @apply text-sm text-[#ff4d4f] hover:underline;
}
.info-card-body p {
  @apply text-xs text-[#999] leading-relaxed;
}
.vip-banner {
  @apply relative h-[120px] rounded-xl overflow-hidden flex items-center justify-between px-8;
  background: linear-gradient(90deg, #1a1a2e 0%, #2d1b4e 100%);
}
.vip-banner::before {
  @apply content-[''] absolute inset-0 pointer-events-none;
  background: url('/assets/banner.jpg') center/cover no-repeat;
  opacity: 0.35;
}
.vip-banner-text {
  @apply relative z-10;
}
.vip-banner-text h2 {
  @apply text-xl font-bold text-white tracking-wider mb-1;
}
.vip-tag {
  @apply inline-block px-2 py-0.5 rounded bg-[#ffd700] text-[#5a3d00] text-xs font-bold;
}
.vip-btn {
  @apply relative z-10 px-5 py-2 rounded-full bg-[#c9a96e] text-white text-sm font-semibold hover:bg-[#b89760] transition-colors;
}
.message-panel {
  @apply bg-white rounded-xl shadow-sm p-6;
}
.message-item {
  @apply flex gap-4 pb-5 mb-5 border-b border-[#f0f0f0] last:mb-0 last:pb-0 last:border-0;
}
.message-icon {
  @apply w-10 h-10 rounded-full bg-[#fff5f5] text-[#ff7a45] flex items-center justify-center shrink-0;
}
.message-icon svg {
  @apply w-5 h-5;
}
.message-header {
  @apply flex items-center justify-between mb-2;
}
.message-title {
  @apply text-base font-bold text-[#333];
}
.message-date {
  @apply text-xs text-[#999];
}
.message-content {
  @apply text-sm text-[#666] leading-relaxed;
}
.empty-panel {
  @apply bg-white rounded-xl shadow-sm p-10 flex flex-col items-center justify-center text-sm text-[#999];
}
.empty-panel img {
  @apply w-[80px] h-[80px] mb-4;
}
.appointment-panel {
  @apply bg-white rounded-xl shadow-sm p-10 min-h-[400px] flex flex-col items-center justify-center;
}
.guess-panel {
  @apply bg-white rounded-xl shadow-sm p-6;
}
.guess-header {
  @apply flex items-center justify-between mb-5;
}
.guess-header h3 {
  @apply text-base font-bold text-[#333];
}
.complaint-btn {
  @apply inline-flex items-center gap-1 px-3 py-1.5 border border-[#e5e7eb] rounded text-sm text-[#666] bg-white cursor-pointer hover:border-[#ff4d4f] hover:text-[#ff4d4f] transition-colors;
}
.complaint-btn::before {
  @apply content-['i'] w-4 h-4 rounded-full border border-current flex items-center justify-center text-xs;
}
.guess-table-wrap {
  @apply overflow-x-auto rounded border border-[#f0f0f0];
}
.guess-table {
  @apply w-full text-sm text-left border-collapse;
}
.guess-table thead th {
  @apply bg-[#f8f9fa] text-[#666] font-medium py-3 px-4 border-b border-[#f0f0f0] whitespace-nowrap text-center;
}
.guess-table tbody td {
  @apply py-6 px-4 text-[#666] border-b border-[#f0f0f0];
}
.guess-table .empty-row td {
  @apply text-center text-[#999] py-8;
}
.medal-panel {
  @apply bg-white rounded-xl shadow-sm p-6;
}
.medal-tabs {
  @apply flex items-center gap-6 border-b border-[#f0f0f0] mb-4 relative;
}
.medal-tabs button {
  @apply relative pb-3 text-sm text-[#666] font-medium hover:text-[#333] transition-colors;
}
.medal-tabs button.active {
  @apply text-[#ff4d4f];
}
.medal-tabs button.active::after {
  @apply content-[''] absolute left-0 right-0 bottom-0 h-0.5 bg-[#ff4d4f];
}
.medal-rule {
  @apply ml-auto text-xs text-[#999] hover:text-[#ff4d4f];
}
.medal-filters {
  @apply flex flex-wrap items-center gap-3 mb-5;
}
.medal-filters button {
  @apply px-4 py-1.5 rounded-full text-xs text-[#666] bg-white border border-[#e5e7eb] cursor-pointer hover:border-[#ff4d4f] hover:text-[#ff4d4f] transition-colors;
}
.medal-filters button.active {
  @apply text-white bg-[#ff4d4f] border-[#ff4d4f];
}
.medal-grid {
  @apply grid grid-cols-4 gap-4;
}
.medal-card {
  @apply border border-[#f0f0f0] rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow;
}
.medal-icon {
  @apply relative w-16 h-20 flex items-center justify-center text-gray-400;
}
.medal-icon svg {
  @apply w-full h-full;
}
.medal-icon-label {
  @apply absolute bottom-[18px] left-1/2 -translate-x-1/2 text-[10px] text-white font-medium;
}
.medal-guide {
  @apply text-xs text-[#ff4d4f] hover:underline;
}
.contribute-panel {
  @apply bg-white rounded-xl shadow-sm p-6;
}
.contribute-tabs {
  @apply flex items-center gap-3 border-b border-[#f0f0f0] pb-3 mb-6;
}
.contribute-tabs button {
  @apply text-sm text-[#666] bg-transparent border-0 cursor-pointer hover:text-[#ff4d4f] transition-colors;
}
.contribute-tabs button.active {
  @apply text-[#ff4d4f] font-medium;
}
.contribute-divider {
  @apply text-[#ddd] text-xs;
}
.room-panel {
  @apply bg-white rounded-xl shadow-sm p-6 min-h-[400px];
}
.room-table-wrap {
  @apply overflow-x-auto rounded border border-[#f0f0f0];
}
.room-table {
  @apply w-full text-sm text-left border-collapse;
}
.room-table thead th {
  @apply bg-[#f8f9fa] text-[#666] font-medium py-3 px-4 border-b border-[#f0f0f0] whitespace-nowrap text-center;
}
.room-table tbody td {
  @apply py-6 px-4 text-[#666] border-b border-[#f0f0f0];
}
.room-table .empty-row td {
  @apply text-center text-[#999] py-8;
}
.realname-panel {
  @apply bg-white rounded-xl shadow-sm p-6;
}
.wealth-panel {
  @apply bg-white rounded-xl shadow-sm p-6;
}
.wealth-tabs {
  @apply flex items-center flex-wrap gap-6 border-b border-[#f0f0f0] mb-5;
}
.wealth-tabs button {
  @apply relative pb-3 text-sm text-[#666] font-medium hover:text-[#333] transition-colors;
}
.wealth-tabs button.active {
  @apply text-[#ff4d4f];
}
.wealth-tabs button.active::after {
  @apply content-[''] absolute left-0 right-0 bottom-0 h-0.5 bg-[#ff4d4f];
}
.wealth-filter {
  @apply mb-4;
}
.wealth-month-select {
  @apply h-9 px-3 rounded border border-[#e5e7eb] bg-white text-sm text-[#333] outline-none;
}
.wealth-table-wrap {
  @apply overflow-x-auto rounded border border-[#f0f0f0];
}
.wealth-table {
  @apply w-full text-sm text-left border-collapse;
}
.wealth-table thead th {
  @apply bg-[#f8f9fa] text-[#666] font-medium py-3 px-4 border-b border-[#f0f0f0] whitespace-nowrap;
}
.wealth-table tbody td {
  @apply py-6 px-4 text-[#666] border-b border-[#f0f0f0];
}
.wealth-table .empty-row td {
  @apply text-center text-[#999];
}
.order-panel {
  @apply bg-white rounded-xl shadow-sm p-6;
}
.order-table-wrap {
  @apply overflow-x-auto rounded border border-[#f0f0f0];
}
.order-table {
  @apply w-full text-sm text-left border-collapse;
}
.order-table thead th {
  @apply bg-[#f8f9fa] text-[#666] font-medium py-3 px-4 border-b border-[#f0f0f0] whitespace-nowrap;
}
.order-table tbody td {
  @apply py-6 px-4 text-[#666] border-b border-[#f0f0f0];
}
.order-table .empty-row td {
  @apply text-center text-[#999];
}

@media (max-width: 1200px) {
  .user-center-wrapper {
    @apply w-full px-4;
  }
}

@media (max-width: 768px) {
  .user-center-page {
    @apply pt-0;
  }
  .user-center-wrapper {
    @apply flex-col py-4;
  }
  .user-sidebar {
    @apply w-full;
  }
  .user-menu {
    @apply flex overflow-x-auto;
  }
  .user-menu a {
    @apply whitespace-nowrap;
  }
  .user-menu a.active::before {
    @apply top-auto bottom-0 w-full h-0.5;
  }
  .user-profile-card {
    @apply flex-col gap-4;
  }
  .user-profile-left {
    @apply flex-col items-center text-center;
  }
  .user-info {
    @apply items-center;
  }
  .user-level-row {
    @apply flex-wrap justify-center;
  }
  .user-cards-grid {
    @apply grid-cols-1;
  }
}
</style>
