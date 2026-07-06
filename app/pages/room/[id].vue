<template>
  <div class="room-page">
    <SiteHeader
      :is-logged-in="isLoggedIn"
      active-menu=""
      force-solid
      @login="openLogin"
      @logout="isLoggedIn = false"
    />
    <main class="room-main">
      <section class="room-shell">
        <div class="room-left">
          <div class="anchor-bar only-desktop">
            <div class="anchor-profile">
              <img class="anchor-avatar" :src="roomInfo.avatar" alt="">
              <div class="anchor-copy">
                <h1>{{ roomInfo.name }}</h1>
                <p>
                  <span>{{ roomInfo.anchor }}</span>
                  <span>房间号:{{ roomId }}</span>
                  <em>{{ roomInfo.hot }}</em>
                  <a href="/download/" target="_blank" rel="noopener noreferrer">下载APP可投屏电视</a>
                </p>
              </div>
            </div>
            <div class="anchor-actions">
              <button type="button">关注</button>
              <img class="code-icon" src="/assets/icon-code.png" alt="">
              <span class="down-arrow"></span>
            </div>
          </div>

          <div class="match-player">
            <div class="video-stage">
              <div class="video-player-wrap">
                <div id="xgplayer-container" class="xgplayer-container"></div>
                <div class="video-live-badge">
                  <span class="live-pulse"></span>
                  正在直播
                </div>
                <div class="video-meta">
                  <span class="video-tag">体育直播</span>
                  <h2>瑞典超 埃尔夫斯堡-哈马比 主黄</h2>
                  <p>实时比分 <strong>2-0</strong></p>
                </div>
              </div>
            </div>
            <div class="score-board only-desktop">
              <div class="score-row title-row">
                <span>23:30</span>
                <strong>瑞典超 埃尔夫斯堡-哈马比 主黄</strong>
                <b>2-0</b>
                <em>体育直播</em>
              </div>
              <div v-for="(row, idx) in scoreRows" :key="idx" class="score-row">
                <span>{{ row.time }}</span>
                <i>{{ row.status }}</i>
                <strong>{{ row.home }}</strong>
                <b>{{ row.score }}</b>
                <strong>{{ row.away }}</strong>
                <small>{{ row.half }}</small>
                <button type="button">{{ row.live }}</button>
              </div>
            </div>
            <div class="player-ad only-desktop">
              <span class="ad-badge">推荐</span>
              <span class="ad-text">浏览器输入66chat8.cc下载66APP，添加主播助理66号：C99999，备注老万领取每日电子波胆进V</span>
            </div>
            <div class="coin-bar only-desktop">
              <div class="coin-count">
                <strong>0</strong>
                <span>我的金币</span>
              </div>
              <div class="coin-icons">
                <button type="button" class="coin-btn"><img src="/assets/icon-code.png" alt=""></button>
                <button type="button" class="coin-btn gift-btn" @click="sendGift">
                  <img src="/assets/gift.png" alt="">
                </button>
                <button type="button" class="coin-btn"><img src="/assets/face.png" alt=""></button>
              </div>
              <a href="javascript:;">如何获取金币?</a>
            </div>
          </div>
        </div>

        <aside :class="['chat-room', `mobile-panel-${activeMobilePanel}`]">
          <div class="mobile-room-tabs only-mobile">
            <div class="mobile-room-tabs__list">
              <button :class="{ active: activeMobilePanel === 'chat' }" type="button" @click="setMobilePanel('chat')">聊天</button>
              <button :class="{ active: activeMobilePanel === 'anchor' }" type="button" @click="setMobilePanel('anchor')">主播</button>
              <button :class="{ active: activeMobilePanel === 'rank' }" type="button" @click="setMobilePanel('rank')">排行榜</button>
              <button :class="{ active: activeMobilePanel === 'schedule' }" type="button" @click="setMobilePanel('schedule')">赛程</button>
            </div>
            <button type="button" class="mobile-room-tabs__follow" @click="followVisible = true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.1 21.35l-1.1-1.02C5.14 14.9 2 12.06 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.56-3.14 6.4-8.9 11.83l-1 .92z"/></svg>
              关注
            </button>
          </div>
          <div class="notice">
            <div class="notice-badge">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              公告
            </div>
            <span>硬核实力认证 老万值得你信赖 深度干货分析解盘，对临场数据变化极为敏锐，熟悉机构与盘口。</span>
          </div>
          <div class="chat-tabs only-desktop">
            <button :class="{ active: activeChatTab === 'chat' }" type="button" @click="activeChatTab = 'chat'">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
              聊天室
            </button>
            <button :class="{ active: activeChatTab === 'rank' }" type="button" @click="activeChatTab = 'rank'">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"/></svg>
              排行榜
            </button>
          </div>
          <div v-show="activeChatTab === 'chat'" class="chat-list">
            <div class="chat-topic">
              <span class="topic-dot"></span>
              24小时主播互动跟单收米
            </div>
            <div
              v-for="(item, idx) in chatMessages"
              :key="idx"
              class="chat-msg"
              :class="{ self: item.self, [`chat-lv-${item.lv}`]: item.lv }"
            >
              <img class="msg-avatar" :src="item.self ? roomInfo.avatar : '/assets/avatar.png'" alt="">
              <div class="msg-content">
                <div class="msg-head">
                  <span class="msg-name">{{ item.name }}</span>
                  <span v-if="item.name.includes('助理') || item.assistant" class="assistant-badge">小助理</span>
                  <span class="msg-lv" :class="`lv-${item.lv}`">{{ item.name.includes('助理') || item.assistant ? '小助理' : `Lv.${item.lv}` }}</span>
                  <span class="msg-time">{{ item.time || '刚刚' }}</span>
                </div>
                <div v-if="item.type === 'announcement'" class="announcement-card">
                  <div class="announcement-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </div>
                  <div class="announcement-info">
                    <div class="announcement-title">{{ item.title || '群管公告' }}</div>
                    <div class="announcement-text">{{ item.text }}</div>
                  </div>
                </div>
                <a v-else-if="item.type === 'activity'" class="activity-card" :href="safeLink(item.link)" target="_blank" rel="noopener noreferrer">
                  <div class="activity-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                  </div>
                  <div class="activity-info">
                    <div class="activity-title">{{ item.title || '活动链接' }}</div>
                    <div class="activity-text">{{ item.text }}</div>
                    <div class="activity-link">{{ item.linkText || '点击参与' }} →</div>
                  </div>
                </a>
                <div v-else-if="item.type === 'redpacket'" class="redpacket-card" :class="{ opened: item.opened }" @click="openRedPacket(item)">
                  <div class="redpacket-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.18 9.54 1.85 8.35 2.29 7.11 2.75 6.25 3.88 6.05 5.2 6.02 5.43 6 5.66 6 6H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-13 5c-1.11 0-2-.89-2-2s.89-2 2-2 2 .89 2 2-.89 2-2 2zm6 7c-2.21 0-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.21-1.79 4-4 4z"/></svg>
                  </div>
                  <div class="redpacket-info">
                    <div class="redpacket-title">{{ item.text }}</div>
                    <div class="redpacket-label">{{ item.opened ? '已领取' : '点击领取红包' }}</div>
                  </div>
                </div>
                <div v-else-if="item.type === 'entry'" class="entry-card" :class="`entry-lv-${item.lv}`">
                  <span class="entry-icon">{{ entryIcon(item.lv) }}</span>
                  <span class="entry-text">{{ item.name }} {{ item.text }}</span>
                </div>
                <div v-else-if="item.type === 'image'" class="msg-image-card">
                  <img :src="item.image" alt="">
                  <div v-if="item.text" class="msg-image-text">{{ item.text }}</div>
                </div>
                <div v-else class="msg-bubble">
                  <div class="msg-text">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="activeChatTab === 'rank'" class="rank-list">
            <div class="rank-header">
              <span>🏆 贡献排行榜</span>
              <small>实时更新</small>
            </div>
            <div v-for="user in rankUsers" :key="user.rank" class="rank-row" :class="{ top: user.rank <= 3 }">
              <div class="rank-no" :class="{ medal: user.rank <= 3 }">
                <template v-if="user.rank === 1">👑</template>
                <template v-else-if="user.rank === 2">🥈</template>
                <template v-else-if="user.rank === 3">🥉</template>
                <template v-else>{{ user.rank }}</template>
              </div>
              <img class="rank-avatar" :src="user.avatar" alt="">
              <div class="rank-info">
                <div class="rank-name">
                  <span>{{ user.name }}</span>
                  <span class="rank-lv" :class="`lv-${user.lv}`">Lv.{{ user.lv }}</span>
                </div>
                <div class="rank-meta">今日活跃</div>
              </div>
              <div class="rank-score">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-1.97 4.8-4.8 4.8z"/></svg>
                {{ user.score }}
              </div>
            </div>
          </div>
          <div class="mobile-anchor-panel only-mobile">
            <div class="mobile-anchor-panel__head">
              <img class="mobile-anchor-panel__avatar" :src="roomInfo.avatar" alt="">
              <div class="mobile-anchor-panel__copy">
                <h3>{{ roomInfo.anchor }}</h3>
                <p>{{ roomInfo.name }}</p>
              </div>
            </div>
            <div class="mobile-anchor-panel__stats">
              <div>
                <strong>{{ roomId }}</strong>
                <span>房间号</span>
              </div>
              <div>
                <strong>{{ roomInfo.hot }}</strong>
                <span>热度</span>
              </div>
              <div>
                <strong>体育直播</strong>
                <span>类型</span>
              </div>
            </div>
            <div class="mobile-anchor-panel__notice">
              <h4>主播简介</h4>
              <p>硬核实力认证，临场数据变化反应快，擅长赛事节奏判断与盘口分析。</p>
            </div>
            <a class="mobile-anchor-panel__download" href="/download/" target="_blank" rel="noopener noreferrer">下载APP可投屏电视</a>
          </div>
          <div class="mobile-schedule-panel only-mobile">
            <div v-for="game in schedules" :key="`mobile-${game.title}`" class="mobile-schedule-card">
              <div class="mobile-schedule-card__time">
                <strong>{{ game.date }}</strong>
                <span>{{ game.time }}</span>
              </div>
              <div class="mobile-schedule-card__main">
                <div class="mobile-schedule-card__league">{{ game.league }}</div>
                <div class="mobile-schedule-card__teams">
                  <span>{{ game.home }}</span>
                  <em>VS</em>
                  <span>{{ game.away }}</span>
                </div>
              </div>
              <button type="button" class="mobile-schedule-card__btn">预约</button>
            </div>
          </div>
          <div class="chat-toolbar">
            <button type="button" class="tool-btn">
              <img src="/assets/face.png" alt="">
            </button>
            <button type="button" class="tool-btn">
              <img src="/assets/icon-concern.png" alt="">
            </button>
            <button type="button" class="tool-btn announcement-btn" @click="sendAnnouncement">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
            </button>
            <button type="button" class="tool-btn activity-btn" @click="sendActivity">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            </button>
            <button type="button" class="tool-btn redpacket-btn" @click="sendRedPacket">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.18 9.54 1.85 8.35 2.29 7.11 2.75 6.25 3.88 6.05 5.2 6.02 5.43 6 5.66 6 6H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-13 5c-1.11 0-2-.89-2-2s.89-2 2-2 2 .89 2 2-.89 2-2 2zm6 7c-2.21 0-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.21-1.79 4-4 4z"/></svg>
            </button>
            <button type="button" class="tool-btn image-btn" @click="sendImage">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
            </button>
            <button type="button" class="tool-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </button>
          </div>
          <div class="chat-send">
            <div class="send-input-wrap">
              <span class="send-login">登录</span>
              <input type="text" placeholder="登录后才可以发送消息哦~~">
            </div>
            <button type="button" class="send-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              发送
            </button>
          </div>
          <button type="button" class="gift-test-btn" @click="sendGift">
            <img src="/assets/gift.png" alt="">
            测试送礼特效
          </button>
        </aside>
      </section>

      <section class="schedule-section only-desktop">
        <h2>主播日程</h2>
        <div class="schedule-row">
          <div v-for="game in schedules" :key="game.title" class="schedule-card">
            <div class="schedule-date">
              <strong>{{ game.date }}</strong>
              <span>{{ game.time }}</span>
            </div>
            <div class="schedule-content">
              <div class="schedule-league">{{ game.league }}</div>
              <div class="schedule-teams">
                <span class="schedule-team">{{ game.home }}</span>
                <span class="schedule-vs">VS</span>
                <span class="schedule-team">{{ game.away }}</span>
              </div>
              <div class="schedule-status">
                <span class="status-dot"></span>
                <span>{{ game.date === '今天' ? '即将开始' : '待开播' }}</span>
              </div>
            </div>
            <button type="button" class="schedule-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1zM7 10h5v5H7z"/></svg>
              预约
            </button>
          </div>
          <button class="schedule-next" type="button"></button>
        </div>
      </section>

      <section class="video-section">
        <h2>视频推荐</h2>
        <ul class="video-list">
          <li v-for="live in recommendedLives" :key="live.title">
            <a :href="live.href">
              <div class="video-cover">
                <img :src="live.cover" :alt="live.title">
                <div class="video-cover-overlay"></div>
                <div class="play-overlay">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div class="living-badge">
                  <span class="live-pulse"></span>
                  <span>Live</span>
                </div>
                <div class="viewers-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  {{ live.viewers }}
                </div>
              </div>
              <div class="video-card-body">
                <h3>{{ live.title }}</h3>
                <p>
                  <img :src="live.avatar" alt="">
                  <span>{{ live.anchor }}</span>
                </p>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </main>

    <SiteFooter />
    <LoginModal
      v-model:visible="loginVisible"
      :type="loginType"
      @success="isLoggedIn = true"
    />
    <MobileStickyBar
      :is-logged-in="isLoggedIn"
      active-tab="live"
      @login="openLogin"
      @follow="followVisible = true"
    />
    <MobileFollowPanel :visible="followVisible" @login="openLogin" />

    <div class="gift-effects">
      <div
        v-for="gift in giftEffects"
        :key="gift.id"
        class="gift-fly"
        :class="{ coin: gift.icon === 'coin' }"
        :style="{
          left: gift.left + 'px',
          animationDuration: gift.duration + 's',
          transform: 'scale(' + gift.scale + ')'
        }"
      >
        <img :src="gift.icon === 'coin' ? '/assets/icon-code.png' : '/assets/gift.png'" alt="">
        <span class="gift-glow">{{ gift.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

const route = useRoute()
const roomId = computed(() => route.params.id || '990645')
const isLoggedIn = ref(false)
const loginVisible = ref(false)
const loginType = ref('login')
const followVisible = ref(false)

function openLogin(type) {
  followVisible.value = false
  loginType.value = type
  loginVisible.value = true
}

function setMobilePanel(panel) {
  activeMobilePanel.value = panel
  if (panel === 'chat') activeChatTab.value = 'chat'
  if (panel === 'rank') activeChatTab.value = 'rank'
}

const roomInfo = {
  name: '一起来聊球',
  anchor: '老万',
  hot: '61464',
  avatar: 'https://sta.ncctrials.com/file/head/20221025/fd6967ccf7f83828c033c6b7a9358733.jpeg'
}

const activeChatTab = ref('chat')
const activeMobilePanel = ref('chat')
const giftEffects = ref([])

const levelStats = computed(() => {
  const stats = {}
  chatMessages.forEach(item => {
    if (item.lv) {
      stats[item.lv] = (stats[item.lv] || 0) + 1
    }
  })
  return Object.entries(stats)
    .map(([lv, count]) => ({ lv: Number(lv), count }))
    .sort((a, b) => b.lv - a.lv)
})

function sendGift() {
  const baseId = Date.now()
  const count = 5 + Math.floor(Math.random() * 4)
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const id = baseId + i + Math.random()
      const left = 80 + Math.random() * (window.innerWidth - 240)
      const duration = 2.2 + Math.random() * 1.2
      const scale = 0.8 + Math.random() * 0.5
      giftEffects.value.push({ id, left, duration, scale, text: '送了一个礼物' })
      setTimeout(() => {
        giftEffects.value = giftEffects.value.filter(g => g.id !== id)
      }, duration * 1000)
    }, i * 120)
  }
}

function sendRedPacket() {
  chatMessages.push({
    lv: 8,
    name: '💖精彩💖',
    text: '主播红包',
    type: 'redpacket',
    opened: false,
    time: '刚刚'
  })
  setTimeout(() => {
    const list = document.querySelector('.chat-list')
    if (list) list.scrollTop = list.scrollHeight
  }, 50)
}

function sendAnnouncement() {
  chatMessages.push({
    lv: 8,
    name: '群管理',
    title: '群管公告',
    text: '请大家文明发言，禁止发布广告和违规内容',
    type: 'announcement',
    time: '刚刚'
  })
  setTimeout(() => {
    const list = document.querySelector('.chat-list')
    if (list) list.scrollTop = list.scrollHeight
  }, 50)
}

function sendActivity() {
  chatMessages.push({
    lv: 8,
    name: '活动助手',
    title: '充值返现活动',
    text: '今日充值满100送20，限时活动先到先得',
    link: 'https://example.com/activity',
    linkText: '立即参与',
    type: 'activity',
    time: '刚刚'
  })
  setTimeout(() => {
    const list = document.querySelector('.chat-list')
    if (list) list.scrollTop = list.scrollHeight
  }, 50)
}

function sendImage() {
  chatMessages.push({
    lv: 3,
    name: '琳子',
    text: '分享了一张图片',
    image: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg',
    type: 'image',
    time: '刚刚'
  })
  setTimeout(() => {
    const list = document.querySelector('.chat-list')
    if (list) list.scrollTop = list.scrollHeight
  }, 50)
}

function entryIcon(lv) {
  const map = { 1: '🌱', 2: '🌟', 3: '💎', 4: '🚀', 5: '👑', 6: '💜', 7: '🌹', 8: '🔥' }
  return map[lv] || '✨'
}

function safeLink(link) {
  if (!link) return 'javascript:;'
  try {
    const url = new URL(link)
    return url.protocol === 'http:' || url.protocol === 'https:' ? link : 'javascript:;'
  } catch {
    return 'javascript:;'
  }
}

function openRedPacket(item) {
  if (item.opened) return
  item.opened = true
  const baseId = Date.now()
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      const id = baseId + i + Math.random()
      const left = 100 + Math.random() * (window.innerWidth - 280)
      const duration = 1.8 + Math.random() * 0.8
      const scale = 0.7 + Math.random() * 0.4
      giftEffects.value.push({ id, left, duration, scale, text: '+金币', icon: 'coin' })
      setTimeout(() => {
        giftEffects.value = giftEffects.value.filter(g => g.id !== id)
      }, duration * 1000)
    }, i * 100)
  }
}

let player = null
onMounted(() => {
  player = new Player({
    id: 'xgplayer-container',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: '/assets/covers/main-poster-bright.png',
    width: '100%',
    height: '100%',
    autoplay: false,
    playsinline: true,
    cssFullscreen: true,
    fluid: false,
    fitVideoSize: 'cover',
    lang: 'zh-cn',
    controls: true,
    controlStyle: 'xgplayer',
    playbackRate: false,
    pip: false,
    screenShot: false,
    rotate: false,
    download: false,
    keyShortcut: 'off',
    ignores: ['definition', 'test', 'volume', 'replay']
  })
})

onUnmounted(() => {
  if (player) {
    player.destroy()
    player = null
  }
})

const scoreRows = [
  { time: '23:30', status: '中', home: '格力夫克女足', score: '2-0', away: '赫尔辛基球队B队女足', half: '1-3', live: '直播' },
  { time: '23:30', status: '中', home: '奥莫尼亚（中）', score: '1-2', away: '贝夏普尔', half: '0-2', live: '动画' },
  { time: '23:45', status: '38’', home: '希奥利艾', score: '0-0', away: '萨尔格里斯', half: '2-2', live: '直播' },
  { time: '00:00', status: '22’', home: '潭美卡', score: '1-1', away: '哈留足球学院', half: '0-1', live: '直播' },
  { time: '00:00', status: '18’', home: '基尔梅斯阿根廷', score: '0-0', away: '埃斯卡拉达', half: '0-1', live: '直播' },
  { time: '00:00', status: '21’', home: '意大利亚诺', score: '0-0', away: '皇家皮拉尔', half: '1-2', live: '动画' },
  { time: '00:00', status: '24’', home: '萨卡兹斯帕斯', score: '1-0', away: '祖文图德尤尼达', half: '0-2', live: '直播' },
  { time: '00:00', status: '19’', home: '阿雷纳斯胜利队', score: '0-0', away: '巴拉圭竞技', half: '0-0', live: '直播' },
  { time: '00:00', status: '14’', home: '波士顿河女足', score: '0-1', away: '海湾女足', half: '0-1', live: '动画' }
]

const chatMessages = [
  { lv: 3, name: '琳子', text: '哦，都是在群里分享的' },
  { lv: 2, name: '大果头', text: '初盘英格兰怎么看' },
  { lv: 3, name: '琳子', text: '这是没有说明' },
  { lv: 3, name: '琳子', text: '不是呀我说的是直播间没说中途有什么***什么时候去' },
  { lv: 2, name: '大果头', text: '英格兰呢' },
  { lv: 3, name: '我', text: '我觉得英格兰这场稳了，主场优势很大', self: true },
  { lv: 8, name: '💖精彩💖', text: '主播红包', type: 'redpacket', opened: false, time: '刚刚' },
  { lv: 2, name: '大果头', text: '墨西哥怎么看' },
  { lv: 8, name: '群管理', title: '群管公告', text: '请大家文明发言，禁止发布广告和违规内容', type: 'announcement', time: '刚刚' },
  { lv: 8, name: '活动助手', title: '充值返现活动', text: '今日充值满100送20，限时活动先到先得', link: 'https://example.com/activity', linkText: '立即参与', type: 'activity', time: '刚刚' },
  { lv: 3, name: '琳子', text: '瞌睡来了 😂' },
  { lv: 5, name: '帅帅🔥C99999', text: '领取包赔、体育链接、添加66号：C99999🔥' },
  { lv: 2, name: '大果头', text: '墨西哥几比几' },
  { lv: 3, name: '我', text: '墨西哥应该能赢一球', self: true },
  { lv: 3, name: '琳子', text: '睡了拜拜' },
  { lv: 5, name: '小助理', text: '欢迎来到直播间，有问题随时咨询我哦', assistant: true },
  { lv: 1, name: '新手小白', text: '第一次来，多多关照' },
  { lv: 6, name: '紫霞仙子', image: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', text: '看看这张图', type: 'image' },
  { lv: 6, name: '紫霞仙子', text: '这场节奏不错，继续跟' },
  { lv: 7, name: '玫瑰骑士', text: '老万分析得太稳了' },
  { lv: 1, name: '游客007', text: '进入直播间', type: 'entry' },
  { lv: 2, name: '大果头', text: '进入直播间', type: 'entry' },
  { lv: 3, name: '琳子', text: '进入直播间', type: 'entry' },
  { lv: 5, name: '帅帅🔥C99999', text: '进入直播间', type: 'entry' },
  { lv: 6, name: '紫霞仙子', text: '进入直播间', type: 'entry' },
  { lv: 7, name: '玫瑰骑士', text: '进入直播间', type: 'entry' },
  { lv: 8, name: '💖精彩💖', text: '进入直播间', type: 'entry' }
]

const rankUsers = [
  { rank: 1, name: '💖精彩💖', lv: 8, score: '13810', avatar: 'https://sta.ncctrials.com/file/head/20221025/fd6967ccf7f83828c033c6b7a9358733.jpeg' },
  { rank: 2, name: '🚫船长☢', lv: 5, score: '11540', avatar: 'https://sta.ncctrials.com/file/head/20240208/4b36b5f6ef44fa066dac6ec92482c763.jpg' },
  { rank: 3, name: '✨星星✨', lv: 2, score: '7168', avatar: 'https://sta.ncctrials.com/file/head/20240224/100ce75e32ce79c21e3baa33db3c9220.jpg' },
  { rank: 4, name: '范巴斯藤2', lv: 4, score: '4240', avatar: '/assets/avatar.png' },
  { rank: 5, name: '🐉小神龙', lv: 5, score: '3475', avatar: 'https://sta.ncctrials.com/file/head/20230902/b6105a741b54f02e02fc3b707e0e45f9.jpg' },
  { rank: 6, name: '球队小神', lv: 4, score: '3062', avatar: 'https://sta.ncctrials.com/file/head/20230902/b6105a741b54f02e02fc3b707e0e45f9.jpg' },
  { rank: 7, name: '朱古力炒蛋', lv: 3, score: '2517', avatar: '/assets/avatar.png' },
  { rank: 8, name: '球场边', lv: 2, score: '1986', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a.jpg' },
  { rank: 9, name: '蓝海', lv: 1, score: '1650', avatar: 'https://sta.ncctrials.com/file/head/20260228/1d35c871f0eae83d76dc1c6c7e30e174.jpg' }
]

const schedules = [
  { title: '一起来聊球1', league: '一起来聊球', date: '今天', time: '19:00', home: '一起来聊球', away: '一起来聊球' },
  { title: '一起来聊球2', league: '一起来聊球', date: '今天', time: '23:00', home: '一起来聊球', away: '一起来聊球' },
  { title: '一起来聊球3', league: '一起来聊球', date: '07-07', time: '19:00', home: '一起来聊球', away: '一起来聊球' },
  { title: '一起来聊球4', league: '一起来聊球', date: '07-07', time: '23:00', home: '一起来聊球', away: '一起来聊球' },
  { title: '一起来聊球5', league: '一起来聊球', date: '07-08', time: '19:00', home: '一起来聊球', away: '一起来聊球' }
]

const recommendedLives = [
  { title: '爱沙甲 潭美卡VS哈留足球学院', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240222/23a0fd3943d7d814ba5f46a3c316dd25.png', anchor: '司马老贼', viewers: '5.20w', href: '/room/238362?scheduleId=undefined' },
  { title: '哈萨克超 卡萨尔vs伊特什', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20251112/7c61f9874371fec5fd7b73df63fb23e5.jpg', anchor: '大帝', viewers: '8.52w', href: '/room/765648?scheduleId=undefined' },
  { title: '欧青U19 乌克兰U19 VS 意大利U19', cover: 'https://sta.ncctrials.com/file/common/20260627/f41c9604ab224cf5c9daeaff94356933_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240224/100ce75e32ce79c21e3baa33db3c9220.jpg', anchor: '大熊', viewers: '5.55w', href: '/room/551893?scheduleId=undefined' },
  { title: '瑞典超 埃尔夫斯堡VS哈马比', cover: 'https://sta.ncctrials.com/file/common/20260705/da243db7abd0bf0d3660c1766abf1908_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a.jpg', anchor: '评述员阿虎', viewers: '11.30w', href: '/room/506605?scheduleId=undefined' },
  { title: '芬甲 MP米克力 VS 哈卡', cover: 'https://sta.ncctrials.com/file/common/20250505/b81f3e7b51f21db55760ca678cf672ef_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20230409/07e5fa23d5829784c70851c16bc1a1a8.png', anchor: '茶茶爱看球', viewers: '5.26w', href: '/room/346346?scheduleId=undefined' },
  { title: '世欧预 格鲁吉亚vs西班牙', cover: 'https://sta.ncctrials.com/file/common/20260509/cbed26223a5f4dedba17eab9339d2c4c_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240316/7f93ace06b551d5bcc8d261b6c464eeb.jpg', anchor: '小新（粵語）', viewers: '5.04w', href: '/room/1573951?scheduleId=undefined' },
  { title: '哈萨克超：奥达巴斯vs乌雷套', cover: 'https://sta.ncctrials.com/file/common/20250805/b38bb3088a743ba2aef1ea3df0e3a24d_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20201128/2aac51efa098872b4ddb9c1c32d9bce5', anchor: '都教授', viewers: '8.29w', href: '/room/896956?scheduleId=undefined' },
  { title: '一起来聊球', cover: 'https://sta.ncctrials.com/file/common/20230217/7045823059a1d115eda50c8c616609da_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20221025/fd6967ccf7f83828c033c6b7a9358733.jpeg', anchor: '车太勤', viewers: '6.31w', href: '/room/491355?scheduleId=undefined' },
  { title: '一起来聊球', cover: 'https://sta.ncctrials.com/file/common/20260404/1d08caafb9db4e9311556c8f5a595760_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240208/4b36b5f6ef44fa066dac6ec92482c763.jpg', anchor: '咖球皇帝', viewers: '6.20w', href: '/room/287671?scheduleId=undefined' },
  { title: '〖瑞典超〗埃尔夫斯堡 ▲ 哈马比', cover: 'https://sta.ncctrials.com/file/common/20260705/45717f0b20b8567fbe1e6e46902e1fc9_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20221206/e67279aa3ea0f7aeae85a95bdb43a044.png', anchor: '八💥佰', viewers: '12.94w', href: '/room/308116?scheduleId=undefined' },
  { title: '智利杯：塞雷那 VS 安托法加斯塔', cover: 'https://sta.ncctrials.com/file/common/20260506/942354ec3d25c234f06c1475986300a9_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20231118/c51b26949b0c3e6c6cb61ddf5a5e2111.png', anchor: '百万', viewers: '3.21w', href: '/room/534857?scheduleId=undefined' },
  { title: '欧青U19 塞尔维亚U19 VS 克罗地亚U19', cover: 'https://sta.ncctrials.com/file/common/20251018/e70adcbbbcec4010594a7993ae47189c_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20251018/c2a03d3cebf1d8f5d993114d84419224.jpg', anchor: '金州-拉文', viewers: '3.18w', href: '/room/774913?scheduleId=undefined' },
  { title: '哈萨克超 卡萨尔 VS 伊特什', cover: 'https://sta.ncctrials.com/file/common/20260628/22ab415fae30a1b5eb8947547e7c7608_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240809/e3c7f4be827023a392a0a817adbb105b.jpg', anchor: '奥巴（粤语）', viewers: '3.15w', href: '/room/572879?scheduleId=undefined' },
  { title: '清源直播间', cover: 'https://sta.ncctrials.com/file/live/room/cover/160590.jpg?t=1783262031', avatar: 'https://sta.ncctrials.com/file/head/20200910/087cb14b5636264a67a93433632899ef', anchor: '卫星小牛', viewers: '1261', href: '/room/160590?scheduleId=undefined' }
]
</script>

<style scoped>
.room-page {
  min-height: 100vh;
  color: #333;
  padding-top: 72px;
  background: linear-gradient(to bottom, #25284d 0, #25284d 748px, #eef0f5 748px);
}

.room-main {
  width: 1200px;
  margin: 0 auto;
  padding: 14px 0 44px;
}

.room-shell {
  display: grid;
  grid-template-columns: 860px 330px;
  gap: 10px;
  margin-bottom: 48px;
}

.room-left,
.chat-room {
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}

.anchor-bar {
  height: 100px;
  padding: 18px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.anchor-profile {
  display: flex;
  align-items: center;
  min-width: 0;
}

.anchor-avatar {
  width: 60px;
  height: 60px;
  margin-right: 16px;
  border-radius: 50%;
  object-fit: cover;
}

.anchor-copy h1 {
  margin: 0 0 12px;
  color: #222;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
}

.anchor-copy p {
  margin: 0;
  color: #777;
  font-size: 14px;
}

.anchor-copy span,
.anchor-copy em,
.anchor-copy a {
  margin-right: 14px;
}

.anchor-copy em {
  padding-left: 18px;
  font-style: normal;
  background: url('/assets/icon-hot-gray.png') no-repeat left center;
  background-size: 12px auto;
}

.anchor-copy a {
  color: #777;
  text-decoration: none;
}

.anchor-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.anchor-actions button {
  width: 74px;
  height: 40px;
  border: 0;
  border-radius: 20px;
  color: #fff;
  background: #ffc400;
  font-size: 16px;
  cursor: pointer;
}

.code-icon {
  width: 26px;
  height: 26px;
  opacity: 0.62;
}

.down-arrow {
  width: 14px;
  height: 14px;
  border-right: 2px solid #aaa;
  border-bottom: 2px solid #aaa;
  transform: rotate(45deg);
}

.match-player {
  background: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.12);
}

.video-stage {
  position: relative;
  height: 484px;
  background: #0f172a;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
}

.video-player-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}

.xgplayer-container {
  width: 100%;
  height: 100%;
  background: #0f172a;
}

.xgplayer-container :deep(.xgplayer) {
  background: transparent !important;
}

.xgplayer-container :deep(.xgplayer-controls) {
  background: linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.82) 100%) !important;
}

.video-live-badge {
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 14px;
  border-radius: 999px;
  background: rgba(239, 68, 68, 0.92);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 8px 22px rgba(239, 68, 68, 0.26);
  pointer-events: none;
}

.live-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.28);
  animation: pulse 1.6s ease-out infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.48); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}

.video-meta {
  position: absolute;
  bottom: 62px;
  left: 0;
  right: 0;
  z-index: 3;
  padding: 18px 22px;
  color: #fff;
  pointer-events: none;
}

.video-tag {
  display: inline-flex;
  height: 26px;
  align-items: center;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 10px;
  backdrop-filter: blur(10px);
}

.video-meta h2 {
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 800;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.36);
}

.video-meta p {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.video-meta p strong {
  color: #ffc21c;
  font-size: 18px;
  margin-left: 6px;
}

.score-board {
  height: auto;
  max-height: 220px;
  overflow-y: auto;
  background: #f8fafc;
  border-top: 1px solid rgba(226, 232, 240, 0.9);
}

.score-board::-webkit-scrollbar {
  width: 4px;
}

.score-board::-webkit-scrollbar-track {
  background: transparent;
}

.score-board::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.4);
  border-radius: 2px;
}

.score-row {
  height: 48px;
  display: grid;
  grid-template-columns: 80px 52px 1fr 72px 1fr 70px 54px;
  align-items: center;
  padding: 0 18px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.85);
  color: #64748b;
  font-size: 14px;
  transition: background 0.2s;
}

.score-row:hover {
  background: rgba(255, 255, 255, 0.85);
}

.score-row span,
.score-row i {
  color: #f59e0b;
  font-style: normal;
  font-weight: 700;
}

.score-row strong {
  overflow: hidden;
  color: #334155;
  font-weight: 650;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.score-row b {
  color: #ef4444;
  font-size: 20px;
  text-align: center;
  font-weight: 800;
}

.score-row button {
  width: 44px;
  height: 26px;
  border: 0;
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(34, 197, 94, 0.22);
}

.title-row {
  color: #fff;
  background: linear-gradient(135deg, #111827 0%, #25284d 100%);
  grid-template-columns: 86px 1fr 70px 110px;
  position: sticky;
  top: 0;
  z-index: 1;
}

.title-row strong,
.title-row b,
.title-row em {
  color: #fff;
  font-style: normal;
  font-weight: 700;
}

.title-row b {
  color: #ffc21c;
  font-size: 22px;
}

.player-ad {
  height: 36px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  overflow: hidden;
  color: #7c2d12;
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  font-size: 13px;
  line-height: 1.4;
  border-top: 1px solid rgba(226, 232, 240, 0.9);
}

.ad-badge {
  flex: 0 0 auto;
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  color: #111827;
  font-size: 11px;
  font-weight: 800;
  line-height: 20px;
}

.ad-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.coin-bar {
  height: 64px;
  display: flex;
  align-items: center;
  background: #fff;
  border-top: 1px solid rgba(226, 232, 240, 0.9);
}

.coin-count {
  width: 170px;
  height: 64px;
  padding-left: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid rgba(226, 232, 240, 0.9);
}

.coin-count strong {
  display: block;
  font-size: 24px;
  line-height: 28px;
  font-weight: 800;
  color: #0f172a;
}

.coin-count span {
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
}

.coin-icons {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.coin-btn {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: #f1f5f9;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}

.coin-btn:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

.coin-btn img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.coin-bar a {
  width: 150px;
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.coin-bar a:hover {
  color: #f59e0b;
}

.chat-room {
  height: 666px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.12);
  overflow: hidden;
  backdrop-filter: blur(14px);
}

.mobile-room-tabs,
.mobile-anchor-panel,
.mobile-schedule-panel {
  display: none;
}

.notice {
  padding: 14px 16px;
  color: #475569;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  font-size: 13px;
  line-height: 1.6;
  background: linear-gradient(135deg, #fffbeb 0%, #fff 100%);
}

.notice-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 26px;
  padding: 0 10px;
  margin-bottom: 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  color: #111827;
  font-size: 12px;
  font-weight: 800;
}

.notice-badge svg {
  width: 14px;
  height: 14px;
}

.notice span {
  display: block;
  padding-left: 2px;
}

.level-info {
  padding: 10px 16px;
  background: #fff;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
}

.level-info-title {
  color: #64748b;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.level-info-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.level-info-item {
  height: 22px;
  padding: 0 10px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 800;
  color: #fff;
}

.chat-tabs {
  height: 46px;
  display: flex;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
  background: #fff;
}

.chat-tabs button {
  position: relative;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  background: transparent;
  color: #64748b;
  font-size: 14px;
  font-weight: 650;
  cursor: pointer;
  transition: color 0.2s;
}

.chat-tabs button svg {
  width: 16px;
  height: 16px;
}

.chat-tabs button:hover {
  color: #334155;
}

.chat-tabs .active {
  color: #111827;
}

.chat-tabs .active::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 0;
  width: 56px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  transform: translateX(-50%);
}

.chat-list {
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f8fafc;
  scroll-behavior: smooth;
}

.chat-list::-webkit-scrollbar {
  width: 4px;
}

.chat-list::-webkit-scrollbar-track {
  background: transparent;
}

.chat-list::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.4);
  border-radius: 2px;
}

.rank-list {
  flex: 1;
  padding: 12px 14px 8px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f8fafc;
  scroll-behavior: smooth;
}

.rank-list::-webkit-scrollbar {
  width: 4px;
}

.rank-list::-webkit-scrollbar-track {
  background: transparent;
}

.rank-list::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.4);
  border-radius: 2px;
}

.rank-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 4px;
  color: #0f172a;
  font-size: 14px;
  font-weight: 800;
}

.rank-header small {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 600;
}

.rank-row {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  transition: transform 0.2s, box-shadow 0.2s;
}

.rank-row:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.08);
}

.rank-row.top {
  background: linear-gradient(135deg, #fff 0%, #fffbeb 100%);
  border: 1px solid rgba(251, 191, 36, 0.25);
}

.rank-row.top:nth-child(2) {
  background: linear-gradient(135deg, #fff 0%, #f8fafc 100%);
  border-color: rgba(148, 163, 184, 0.25);
}

.rank-row.top:nth-child(3) {
  background: linear-gradient(135deg, #fff 0%, #fff7ed 100%);
  border-color: rgba(251, 146, 60, 0.25);
}

.rank-no {
  width: 28px;
  flex: 0 0 28px;
  color: #64748b;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
}

.rank-no.medal {
  width: 28px;
  height: 28px;
  flex-basis: 28px;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, #ffd700 0%, #ffb800 100%);
  font-size: 14px;
  font-weight: 800;
  line-height: 28px;
  box-shadow: 0 4px 10px rgba(255, 184, 0, 0.26);
}

.rank-row:nth-child(2) .rank-no.medal {
  background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
  box-shadow: 0 4px 10px rgba(148, 163, 184, 0.26);
}

.rank-row:nth-child(3) .rank-no.medal {
  background: linear-gradient(135deg, #fdba74 0%, #c67a3e 100%);
  box-shadow: 0 4px 10px rgba(198, 122, 62, 0.26);
}

.rank-avatar {
  width: 42px;
  height: 42px;
  margin: 0 12px;
  flex: 0 0 42px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.1);
}

.rank-row.top .rank-avatar {
  border-color: #fef3c7;
  box-shadow: 0 6px 16px rgba(251, 191, 36, 0.18);
}

.rank-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.rank-name {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.rank-name span:first-child {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #0f172a;
  font-size: 14px;
  font-weight: 700;
}

.rank-meta {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 500;
}

.rank-score {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #f59e0b;
  font-size: 13px;
  font-weight: 800;
}

.rank-score svg {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
}

.rank-lv {
  height: 16px;
  padding: 0 6px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 800;
  line-height: 16px;
  white-space: nowrap;
}

.chat-topic {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  margin-bottom: 12px;
  border-radius: 999px;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  color: #92400e;
  font-size: 13px;
  font-weight: 700;
}

.topic-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f59e0b;
  box-shadow: 0 0 0 5px rgba(245, 158, 11, 0.18);
}

.chat-msg {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  max-width: 82%;
}

.chat-msg.self {
  flex-direction: row-reverse;
  margin-left: auto;
}

.msg-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.1);
  flex: 0 0 36px;
  margin-top: 4px;
}

.chat-msg.self .msg-avatar {
  border-color: #f59e0b;
}

.msg-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.chat-msg.self .msg-content {
  align-items: flex-end;
}

.msg-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 5px;
}

.chat-msg.self .msg-head {
  flex-direction: row-reverse;
}

.msg-name {
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
}

.assistant-badge {
  height: 18px;
  padding: 0 8px;
  border-radius: 999px;
  background: linear-gradient(135deg, #c084fc 0%, #9333ea 100%);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  line-height: 18px;
  text-align: center;
  white-space: nowrap;
}

.msg-time {
  color: #94a3b8;
  font-size: 11px;
  font-weight: 500;
}

.msg-lv {
  height: 15px;
  padding: 0 6px;
  border-radius: 999px;
  color: #facc15;
  font-size: 10px;
  font-weight: 800;
  line-height: 15px;
  text-align: center;
  white-space: nowrap;
}

.msg-bubble {
  display: inline-block;
  padding: 10px 14px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  position: relative;
}

.msg-bubble::before {
  content: '';
  position: absolute;
  top: 14px;
  width: 0;
  height: 0;
  border-style: solid;
}

.chat-msg:not(.self) .msg-bubble::before {
  left: -6px;
  border-width: 6px 8px 6px 0;
  border-color: transparent #fff transparent transparent;
}

.chat-msg.self .msg-bubble {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  border-bottom-right-radius: 4px;
}

.chat-msg.self .msg-bubble::before {
  right: -6px;
  border-width: 6px 0 6px 8px;
  border-color: transparent transparent transparent #fbbf24;
}

.chat-msg:not(.self) .msg-bubble {
  border-bottom-left-radius: 4px;
}

.msg-image-card {
  display: inline-flex;
  flex-direction: column;
  max-width: 240px;
  padding: 6px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
  overflow: hidden;
}

.msg-image-card img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}

.msg-image-text {
  padding: 8px 10px 4px;
  color: #334155;
  font-size: 13px;
  line-height: 1.5;
  word-break: break-word;
}

.chat-msg.self .msg-image-card {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
}

.chat-msg.self .msg-image-text {
  color: #fff;
}

.chat-msg:not(.self) .msg-image-card {
  border-bottom-left-radius: 4px;
}

.chat-msg.self .msg-image-card {
  border-bottom-right-radius: 4px;
}

.msg-text {
  color: #334155;
  font-size: 14px;
  line-height: 1.55;
  word-break: break-word;
}

.chat-msg.self .msg-text {
  color: #fff;
}

.chat-msg:not(.self).chat-lv-1 .msg-text { color: #475569; }
.chat-msg:not(.self).chat-lv-2 .msg-text { color: #166534; }
.chat-msg:not(.self).chat-lv-3 .msg-text { color: #0f766e; }
.chat-msg:not(.self).chat-lv-4 .msg-text { color: #1e40af; }
.chat-msg:not(.self).chat-lv-5 .msg-text { color: #0369a1; }
.chat-msg:not(.self).chat-lv-6 .msg-text { color: #5b21b6; }
.chat-msg:not(.self).chat-lv-7 .msg-text { color: #9f1239; }
.chat-msg:not(.self).chat-lv-8 .msg-text { color: #3730a3; }

.chat-msg.self .msg-name {
  color: #c2410c;
}

.redpacket-card {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: #fff;
  box-shadow: 0 8px 22px rgba(239, 68, 68, 0.28);
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
  max-width: 240px;
}

.redpacket-card:hover {
  transform: translateY(-2px);
}

.redpacket-card.opened {
  opacity: 0.72;
  cursor: default;
}

.chat-msg.self .redpacket-card {
  border-bottom-right-radius: 4px;
}

.chat-msg:not(.self) .redpacket-card {
  border-bottom-left-radius: 4px;
}

.redpacket-icon {
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.redpacket-icon svg {
  width: 24px;
  height: 24px;
  color: #fff;
}

.redpacket-info {
  flex: 1;
  min-width: 0;
}

.redpacket-title {
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.redpacket-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.82);
  font-weight: 500;
}

.entry-card {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
}

.entry-icon {
  font-size: 16px;
}

.entry-text {
  color: #334155;
  font-size: 13px;
  font-weight: 700;
}

.entry-lv-1 { border-color: #94a3b8; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); box-shadow: 0 4px 12px rgba(148, 163, 184, 0.15); }
.entry-lv-2 { border-color: #4ade80; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); box-shadow: 0 4px 12px rgba(74, 222, 128, 0.18); }
.entry-lv-3 { border-color: #2dd4bf; background: linear-gradient(135deg, #f0fdfa 0%, #ecfdf9 100%); box-shadow: 0 4px 12px rgba(45, 212, 191, 0.18); }
.entry-lv-4 { border-color: #60a5fa; background: linear-gradient(135deg, #eff6ff 0%, #eef6ff 100%); box-shadow: 0 4px 12px rgba(96, 165, 250, 0.18); }
.entry-lv-5 { border-color: #38bdf8; background: linear-gradient(135deg, #f0f9ff 0%, #eef8ff 100%); box-shadow: 0 4px 12px rgba(56, 189, 248, 0.18); }
.entry-lv-6 { border-color: #a78bfa; background: linear-gradient(135deg, #f5f3ff 0%, #f4f1ff 100%); box-shadow: 0 4px 12px rgba(167, 139, 250, 0.2); }
.entry-lv-7 { border-color: #f472b6; background: linear-gradient(135deg, #fdf2f8 0%, #fdf1f7 100%); box-shadow: 0 4px 12px rgba(244, 114, 182, 0.2); }
.entry-lv-8 { border-color: #6366f1; background: linear-gradient(135deg, #eef2ff 0%, #ede9ff 100%); box-shadow: 0 4px 12px rgba(99, 102, 241, 0.22); }

.entry-lv-1 .entry-text { color: #475569; }
.entry-lv-2 .entry-text { color: #166534; }
.entry-lv-3 .entry-text { color: #0f766e; }
.entry-lv-4 .entry-text { color: #1e40af; }
.entry-lv-5 .entry-text { color: #0369a1; }
.entry-lv-6 .entry-text { color: #5b21b6; }
.entry-lv-7 .entry-text { color: #9f1239; }
.entry-lv-8 .entry-text { color: #3730a3; }

.announcement-card {
  display: inline-flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 1px solid rgba(59, 130, 246, 0.18);
  color: #1e40af;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.1);
  max-width: 280px;
}

.announcement-icon {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.12);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.announcement-icon svg {
  width: 20px;
  height: 20px;
  color: #2563eb;
}

.announcement-info {
  flex: 1;
  min-width: 0;
}

.announcement-title {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 4px;
  color: #1d4ed8;
}

.announcement-text {
  font-size: 13px;
  line-height: 1.5;
  color: #1e3a8a;
  word-break: break-word;
}

.activity-card {
  display: inline-flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 14px;
  background: linear-gradient(135deg, #fef9c3 0%, #fde047 100%);
  border: 1px solid rgba(234, 179, 8, 0.25);
  color: #713f12;
  box-shadow: 0 4px 14px rgba(234, 179, 8, 0.18);
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s;
  max-width: 280px;
}

.activity-card:hover {
  transform: translateY(-2px);
}

.activity-icon {
  width: 36px;
  height: 36px;
  flex: 0 0 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.activity-icon svg {
  width: 20px;
  height: 20px;
  color: #a16207;
}

.activity-info {
  flex: 1;
  min-width: 0;
}

.activity-title {
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 3px;
  color: #713f12;
}

.activity-text {
  font-size: 12px;
  line-height: 1.45;
  color: #854d0e;
  word-break: break-word;
  margin-bottom: 6px;
}

.activity-link {
  font-size: 12px;
  font-weight: 800;
  color: #92400e;
}

.lv {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 18px;
  padding: 0 6px;
  border-radius: 999px;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  font-style: normal;
  line-height: 1;
}

.lv-1 { background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%); color: #f1f5f9; }
.lv-2 { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); color: #dcfce7; }
.lv-3 { background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%); color: #ccfbf1; }
.lv-4 { background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); color: #dbeafe; }
.lv-5 { background: linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%); color: #e0f2fe; }
.lv-6 { background: linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%); color: #ede9fe; }
.lv-7 { background: linear-gradient(135deg, #f472b6 0%, #db2777 100%); color: #fce7f3; }
.lv-8 { background: linear-gradient(135deg, #6366f1 0%, #4338ca 100%); color: #e0e7ff; }

.chat-toolbar {
  height: 42px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  border-top: 1px solid rgba(226, 232, 240, 0.9);
  background: #fff;
}

.tool-btn {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: #f1f5f9;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.tool-btn:hover {
  background: #e2e8f0;
}

.tool-btn img,
.tool-btn svg {
  width: 18px;
  height: 18px;
  color: #64748b;
}

.tool-btn.announcement-btn:hover {
  background: #dbeafe;
}

.tool-btn.announcement-btn:hover svg {
  color: #2563eb;
}

.tool-btn.activity-btn:hover {
  background: #fef9c3;
}

.tool-btn.activity-btn:hover svg {
  color: #a16207;
}

.tool-btn.redpacket-btn:hover {
  background: #fee2e2;
}

.tool-btn.redpacket-btn:hover svg {
  color: #dc2626;
}

.tool-btn.image-btn:hover {
  background: #ecfdf5;
}

.tool-btn.image-btn:hover svg {
  color: #16a34a;
}

.chat-send {
  height: 56px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
  border-top: 1px solid rgba(226, 232, 240, 0.9);
  background: #fff;
}

.send-input-wrap {
  flex: 1;
  min-width: 0;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 999px;
  background: #f1f5f9;
  border: 1px solid transparent;
  transition: border-color 0.2s, background 0.2s;
}

.send-input-wrap:focus-within {
  background: #fff;
  border-color: #ffc21c;
}

.send-login {
  font-size: 13px;
  color: #f59e0b;
  font-weight: 700;
  cursor: pointer;
  margin-right: 10px;
  white-space: nowrap;
}

.gift-effects {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
}

.gift-fly {
  position: absolute;
  bottom: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: giftFly ease-in forwards;
}

.gift-fly img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  filter: drop-shadow(0 8px 24px rgba(248, 194, 27, 0.4));
}

.gift-fly.coin img {
  width: 44px;
  height: 44px;
}

.gift-glow {
  margin-top: 8px;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  color: #111827;
  font-size: 13px;
  font-weight: 800;
  box-shadow: 0 8px 24px rgba(248, 194, 27, 0.28);
  white-space: nowrap;
}

.gift-fly.coin .gift-glow {
  background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
  color: #fff;
}

@keyframes giftFly {
  0% {
    transform: translateY(0) scale(0.6) rotate(0deg);
    opacity: 0;
  }
  15% {
    transform: translateY(-60px) scale(1) rotate(-8deg);
    opacity: 1;
  }
  40% {
    transform: translateY(-160px) scale(1.05) rotate(6deg);
    opacity: 1;
  }
  70% {
    transform: translateY(-280px) scale(1) rotate(-4deg);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-420px) scale(0.8) rotate(0deg);
    opacity: 0;
  }
}

.chat-send input {
  flex: 1;
  height: 100%;
  border: 0;
  background: transparent;
  font-size: 14px;
  color: #0f172a;
  outline: none;
}

.chat-send input::placeholder {
  color: #94a3b8;
}

.send-btn {
  height: 40px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  color: #111827;
  font-size: 14px;
  font-weight: 800;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 8px 18px rgba(248, 194, 27, 0.28);
  transition: transform 0.2s;
}

.send-btn:hover {
  transform: translateY(-1px);
}

.send-btn svg {
  width: 16px;
  height: 16px;
}

.gift-test-btn {
  width: 100%;
  height: 38px;
  border: 0;
  border-top: 1px solid rgba(226, 232, 240, 0.9);
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  color: #92400e;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s;
}

.gift-test-btn:hover {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
}

.gift-test-btn img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.schedule-section,
.video-section {
  margin-top: 0;
}

.schedule-section h2,
.video-section h2 {
  margin: 0 0 18px;
  color: #333;
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
}

.schedule-row {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 48px;
}

.schedule-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s, box-shadow 0.25s;
}

.schedule-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.1);
}

.schedule-date {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.schedule-date strong {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 800;
}

.schedule-date span {
  color: #64748b;
  font-size: 14px;
  font-weight: 600;
}

.schedule-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.schedule-league {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  height: 22px;
  padding: 0 8px;
  border-radius: 4px;
  background: #f1f5f9;
  color: #475569;
  font-size: 11px;
  font-weight: 700;
}

.schedule-teams {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #0f172a;
  font-size: 15px;
  font-weight: 700;
}

.schedule-team {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}

.schedule-team:first-child {
  text-align: right;
}

.schedule-vs {
  flex: 0 0 auto;
  padding: 2px 6px;
  border-radius: 4px;
  background: #fee2e2;
  color: #dc2626;
  font-size: 11px;
  font-weight: 800;
}

.schedule-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #22c55e;
  font-size: 12px;
  font-weight: 600;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: livePulse 1.4s ease-in-out infinite;
}

.schedule-btn {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 34px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.schedule-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 14px rgba(251, 191, 36, 0.4);
}

.schedule-btn svg {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
}

.schedule-next {
  position: absolute;
  right: -42px;
  top: 42px;
  width: 26px;
  height: 42px;
  border: 0;
  background: transparent;
}

.schedule-next::before {
  content: "";
  position: absolute;
  top: 7px;
  left: 4px;
  width: 24px;
  height: 24px;
  border-top: 3px solid #999;
  border-right: 3px solid #999;
  transform: rotate(45deg);
}

.video-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 18px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.video-list li {
  min-width: 0;
}

.video-list a {
  display: block;
  overflow: hidden;
  color: #333;
  text-decoration: none;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.06);
  transition: transform 0.25s, box-shadow 0.25s;
}

.video-list a:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
}

.video-cover {
  position: relative;
  height: 140px;
  overflow: hidden;
  background: #111;
  border-radius: 12px 12px 0 0;
}

.video-cover > img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.35s;
}

.video-list a:hover .video-cover > img {
  transform: scale(1.08);
}

.video-cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.45) 100%);
  opacity: 0.7;
  transition: opacity 0.25s;
}

.video-list a:hover .video-cover-overlay {
  opacity: 0.9;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s;
}

.video-list a:hover .play-overlay {
  opacity: 1;
}

.play-overlay svg {
  width: 48px;
  height: 48px;
  padding: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: #ef4444;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.living-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 22px;
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #fff;
  background: rgba(239, 68, 68, 0.92);
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  backdrop-filter: blur(4px);
}

.live-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  animation: livePulse 1.4s ease-in-out infinite;
}

.viewers-badge {
  position: absolute;
  bottom: 10px;
  right: 10px;
  height: 22px;
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #fff;
  background: rgba(15, 23, 42, 0.65);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
  backdrop-filter: blur(4px);
}

.viewers-badge svg {
  width: 13px;
  height: 13px;
  flex: 0 0 13px;
}

.video-card-body {
  padding: 12px;
}

.video-list h3 {
  margin: 0 0 10px;
  overflow: hidden;
  color: #0f172a;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: color 0.2s;
}

.video-list a:hover h3 {
  color: #ef4444;
}

.video-list p {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #64748b;
  font-size: 12px;
}

.video-list p img {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(226, 232, 240, 0.9);
}

.video-list p span {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@keyframes livePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

@media screen and (max-width: 1260px) {
  .room-main {
    width: 1180px;
  }

  .room-shell {
    grid-template-columns: 840px 330px;
  }
}

@media (max-width: 768px) {
  .room-page {
    padding-top: 124px;
    background:
      linear-gradient(180deg, rgba(255, 198, 26, 0.12) 0%, rgba(255, 198, 26, 0.03) 26%, #f8fafc 100%);
  }

  .room-main {
    width: 100%;
    padding: 14px 16px 132px;
  }

  .room-shell {
    display: block;
    margin-bottom: 20px;
  }

  .room-left,
  .chat-room {
    border-radius: 18px;
  }

  .room-left {
    overflow: visible;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }

  .chat-room {
    margin-top: 0;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    border-radius: 0 0 18px 18px;
  }

  .mobile-room-tabs {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 0;
    border-bottom: 1px solid rgba(226, 232, 240, 0.9);
    background: #fff;
  }

  .mobile-room-tabs__list {
    min-width: 0;
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .mobile-room-tabs__list button {
    height: 52px;
    min-width: 0;
    border: 0;
    background: transparent;
    color: #737373;
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
  }

  .mobile-room-tabs__list button.active {
    color: #f59e0b;
  }

  .mobile-room-tabs__follow {
    flex: 0 0 88px;
    border: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    background: linear-gradient(135deg, #ffd84f 0%, #ffc21c 100%);
    color: #fff;
    font-size: 14px;
    font-weight: 800;
  }

  .mobile-room-tabs__follow svg {
    width: 18px;
    height: 18px;
  }

  .anchor-bar,
  .score-board,
  .player-ad,
  .coin-bar {
    display: none;
  }

  .match-player {
    margin-top: 0;
    border-radius: 18px 18px 0 0;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
    overflow: hidden;
  }

  .video-stage {
    height: auto;
    aspect-ratio: 16 / 9;
    border-radius: 18px 18px 0 0;
  }

  .video-live-badge {
    top: 12px;
    left: 12px;
    height: 28px;
    padding: 0 12px;
    font-size: 12px;
  }

  .video-meta {
    bottom: 14px;
    padding: 0 14px;
  }

  .video-tag {
    height: 22px;
    font-size: 10px;
    margin-bottom: 6px;
  }

  .video-meta h2 {
    font-size: 15px;
    line-height: 1.3;
  }

  .video-meta p {
    font-size: 12px;
  }

  .video-meta p strong {
    font-size: 15px;
  }

  .notice {
    padding: 10px 14px;
    border-bottom: 1px solid rgba(226, 232, 240, 0.86);
  }

  .notice-badge,
  .notice span {
    font-size: 12px;
    line-height: 1.5;
  }

  .mobile-anchor-panel,
  .mobile-schedule-panel {
    display: none;
  }

  .chat-tabs {
    display: none;
  }

  .chat-list,
  .rank-list,
  .mobile-anchor-panel,
  .mobile-schedule-panel,
  .chat-toolbar,
  .chat-send,
  .gift-test-btn,
  .notice {
    display: none;
  }

  .chat-list,
  .rank-list {
    height: calc(100vh - 360px);
    min-height: 280px;
    padding: 12px 14px;
  }

  .chat-msg {
    gap: 10px;
  }

  .msg-avatar,
  .rank-avatar {
    width: 40px;
    height: 40px;
  }

  .msg-name,
  .rank-name span {
    font-size: 14px;
  }

  .msg-text,
  .announcement-text,
  .activity-text,
  .entry-text {
    font-size: 14px;
    line-height: 1.6;
  }

  .chat-toolbar {
    padding: 10px 14px;
    gap: 10px;
    overflow-x: auto;
    border-top: 1px solid rgba(226, 232, 240, 0.86);
  }

  .tool-btn {
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
  }

  .chat-send {
    padding: 10px 14px 14px;
    gap: 10px;
  }

  .send-input-wrap {
    min-height: 46px;
  }

  .send-login,
  .send-input-wrap input,
  .send-btn {
    font-size: 14px;
  }

  .send-btn {
    height: 46px;
    padding: 0 16px;
  }

  .gift-test-btn {
    margin: 0 14px 14px;
    height: 44px;
    font-size: 14px;
  }

  .mobile-anchor-panel {
    padding: 16px 14px 18px;
  }

  .mobile-anchor-panel__head {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .mobile-anchor-panel__avatar {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    object-fit: cover;
  }

  .mobile-anchor-panel__copy h3 {
    margin: 0 0 4px;
    color: #111827;
    font-size: 18px;
    font-weight: 800;
  }

  .mobile-anchor-panel__copy p {
    margin: 0;
    color: #64748b;
    font-size: 14px;
  }

  .mobile-anchor-panel__stats {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 16px;
  }

  .mobile-anchor-panel__stats div {
    padding: 12px 10px;
    border-radius: 14px;
    background: #f8fafc;
    text-align: center;
  }

  .mobile-anchor-panel__stats strong {
    display: block;
    margin-bottom: 4px;
    color: #111827;
    font-size: 14px;
    font-weight: 800;
    line-height: 1.4;
    word-break: break-word;
  }

  .mobile-anchor-panel__stats span {
    color: #94a3b8;
    font-size: 12px;
  }

  .mobile-anchor-panel__notice {
    padding: 14px;
    border-radius: 16px;
    background: #fffbeb;
    color: #92400e;
  }

  .mobile-anchor-panel__notice h4 {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 800;
  }

  .mobile-anchor-panel__notice p {
    margin: 0;
    font-size: 14px;
    line-height: 1.7;
  }

  .mobile-anchor-panel__download {
    margin-top: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 46px;
    border-radius: 999px;
    background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
    color: #111827;
    font-size: 15px;
    font-weight: 800;
    text-decoration: none;
  }

  .mobile-schedule-panel {
    padding: 14px;
    gap: 12px;
    flex-direction: column;
  }

  .mobile-schedule-card {
    display: grid;
    grid-template-columns: 68px minmax(0, 1fr) 64px;
    gap: 12px;
    align-items: center;
    padding: 14px 12px;
    border-radius: 16px;
    background: #f8fafc;
  }

  .mobile-schedule-card__time {
    text-align: center;
  }

  .mobile-schedule-card__time strong {
    display: block;
    margin-bottom: 4px;
    color: #111827;
    font-size: 14px;
    font-weight: 800;
  }

  .mobile-schedule-card__time span,
  .mobile-schedule-card__league {
    color: #64748b;
    font-size: 12px;
  }

  .mobile-schedule-card__league {
    margin-bottom: 6px;
  }

  .mobile-schedule-card__teams {
    color: #111827;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.5;
  }

  .mobile-schedule-card__teams em {
    margin: 0 6px;
    color: #f59e0b;
    font-style: normal;
    font-weight: 800;
  }

  .mobile-schedule-card__btn {
    width: 64px;
    height: 32px;
    border: 0;
    border-radius: 999px;
    background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
    color: #111827;
    font-size: 13px;
    font-weight: 800;
  }

  .mobile-panel-chat .notice,
  .mobile-panel-chat .chat-list,
  .mobile-panel-chat .gift-test-btn {
    display: block;
  }

  .mobile-panel-chat .chat-toolbar,
  .mobile-panel-chat .chat-send {
    display: flex;
  }

  .mobile-panel-anchor .mobile-anchor-panel {
    display: block;
  }

  .mobile-panel-rank .rank-list {
    display: block;
  }

  .mobile-panel-schedule .mobile-schedule-panel {
    display: flex;
  }

  .schedule-section,
  .video-section {
    margin-top: 24px;
    padding: 0;
    background: transparent;
    box-shadow: none;
  }

  .schedule-section h2,
  .video-section h2 {
    margin-bottom: 14px;
    font-size: 22px;
  }

  .schedule-section {
    display: none;
  }

  .video-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .video-list li {
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  }

  .video-card-body {
    padding: 10px 10px 12px;
  }

  .video-list h3 {
    font-size: 13px;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
