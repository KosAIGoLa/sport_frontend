<template>
  <div class="room-page">
    <SiteHeader
      :is-logged-in="isLoggedIn"
      active-menu=""
      force-solid
      back
      @login="openLogin"
      @logout="isLoggedIn = false"
    />
    <main class="room-main">
      <section class="room-shell">
        <div class="room-left">
          <DesktopOnly tag="div" class="anchor-bar">
            <div class="anchor-profile">
              <img class="anchor-avatar" :src="roomInfo.avatar" alt="">
              <div class="anchor-copy">
                <h1>{{ roomInfo.name }}</h1>
                <p>
                  <span>{{ roomInfo.anchor }}</span>
                  <span>{{ t('page.roomNumber') }}:{{ roomId }}</span>
                  <em>{{ roomInfo.hot }}</em>
                  <a href="/download/" target="_blank" rel="noopener noreferrer">{{ t('page.castToTV') }}</a>
                </p>
              </div>
            </div>
            <div class="anchor-actions">
              <button type="button">{{ t('page.follow') }}</button>
              <img class="code-icon" src="/assets/icon-code.png" alt="">
              <span class="down-arrow"></span>
            </div>
          </DesktopOnly>

          <div class="match-player">
            <div class="video-stage">
              <div class="video-player-wrap" :style="{ 'view-transition-name': transitionName }">
                <div id="xgplayer-container" class="xgplayer-container"></div>
                <div class="video-live-badge">
                  <span class="live-pulse"></span>
                  {{ t('page.liveNow') }}
                </div>
                <div class="video-meta">
                  <span class="video-tag">{{ t('page.sportsLive') }}</span>
                  <h2>瑞典超 埃尔夫斯堡-哈马比 主黄</h2>
                  <p>实时比分 <strong>2-0</strong></p>
                </div>
                <div v-if="isMuted" class="unmute-btn" role="button" tabindex="0" @click.stop="unmuteVideo" @keydown.enter.prevent.stop="unmuteVideo">{{ t('common.unmute') }}</div>
              </div>
            </div>
            <DesktopOnly tag="div" class="score-board">
              <div class="score-row title-row">
                <span>23:30</span>
                <strong>瑞典超 埃尔夫斯堡-哈马比 主黄</strong>
                <b>2-0</b>
                <em>{{ t('page.sportsLive') }}</em>
              </div>
              <div v-for="(row, idx) in scoreRows" :key="idx" class="score-row">
                <span>{{ row.time }}</span>
                <i>{{ row.status }}</i>
                <strong>{{ row.home }}</strong>
                <b>{{ row.score }}</b>
                <strong>{{ row.away }}</strong>
                <small>{{ row.half }}</small>
                <button type="button">{{ liveStatusText(row.live) }}</button>
              </div>
            </DesktopOnly>
            <DesktopOnly tag="div" class="player-ad">
              <span class="ad-badge">{{ t('page.recommended') }}</span>
              <span class="ad-text">浏览器输入66chat8.cc下载66APP，添加主播助理66号：C99999，备注老万领取每日电子波胆进V</span>
            </DesktopOnly>
            <DesktopOnly tag="div" class="coin-bar">
              <div class="coin-count">
                <strong>0</strong>
                <span>{{ t('page.myCoins') }}</span>
              </div>
              <div class="coin-icons">
                <button type="button" class="coin-btn"><img src="/assets/icon-code.png" alt=""></button>
                <button type="button" class="coin-btn gift-btn" @click="sendGift">
                  <img src="/assets/gift.png" alt="">
                </button>
                <button type="button" class="coin-btn"><img src="/assets/face.png" alt=""></button>
              </div>
              <a href="javascript:;">{{ t('page.howToGetCoins') }}</a>
            </DesktopOnly>
          </div>
        </div>

        <aside :class="['chat-room', `mobile-panel-${activeMobilePanel}`]">
          <MobileOnly tag="div" class="mobile-room-tabs">
            <div class="mobile-room-tabs__list">
              <button :class="{ active: activeMobilePanel === 'chat' }" type="button" @click="setMobilePanel('chat')">{{ t('page.chat') }}</button>
              <button :class="{ active: activeMobilePanel === 'rank' }" type="button" @click="setMobilePanel('rank')">{{ t('page.rank') }}</button>
              <button :class="{ active: activeMobilePanel === 'schedule' }" type="button" @click="setMobilePanel('schedule')">{{ t('page.schedule') }}</button>
            </div>
            <button type="button" class="mobile-room-tabs__follow" @click="followVisible = true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.1 21.35l-1.1-1.02C5.14 14.9 2 12.06 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.56-3.14 6.4-8.9 11.83l-1 .92z"/></svg>
              {{ t('nav.follow') }}
            </button>
          </MobileOnly>
          <div class="notice">
            <div class="notice-badge">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              {{ t('page.notice') }}
            </div>
            <span>硬核实力认证 老万值得你信赖 深度干货分析解盘，对临场数据变化极为敏锐，熟悉机构与盘口。</span>
          </div>
          <DesktopOnly tag="div" class="chat-tabs">
            <button :class="{ active: activeChatTab === 'chat' }" type="button" @click="activeChatTab = 'chat'">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
              {{ t('page.chatRoom') }}
            </button>
            <button :class="{ active: activeChatTab === 'rank' }" type="button" @click="activeChatTab = 'rank'">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"/></svg>
              {{ t('page.rank') }}
            </button>
          </DesktopOnly>
          <div v-show="activeChatTab === 'chat'" ref="chatListRef" class="chat-list">
            <div class="chat-topic">
              <span class="topic-dot"></span>
              {{ t('page.liveInteraction') }}
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
                  <span v-if="item.name.includes('助理') || item.assistant" class="assistant-badge">{{ t('page.assistant') }}</span>
                  <span class="msg-lv" :class="`lv-${item.lv}`">{{ item.name.includes('助理') || item.assistant ? t('page.assistant') : t('page.level') + item.lv }}</span>
                  <span class="msg-time">{{ item.time || t('page.justNow') }}</span>
                </div>
                <div v-if="item.type === 'announcement'" class="announcement-card">
                  <div class="announcement-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                  </div>
                  <div class="announcement-info">
                    <div class="announcement-title">{{ item.title || t('page.adminNotice') }}</div>
                    <div class="announcement-text">{{ item.text }}</div>
                  </div>
                </div>
                <a v-else-if="item.type === 'activity'" class="activity-card" :href="safeLink(item.link)" target="_blank" rel="noopener noreferrer">
                  <div class="activity-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
                  </div>
                  <div class="activity-info">
                    <div class="activity-title">{{ item.title || t('page.activity') }}</div>
                    <div class="activity-text">{{ item.text }}</div>
                    <div class="activity-link">{{ item.linkText || t('page.participate') }} →</div>
                  </div>
                </a>
                <div v-else-if="item.type === 'redpacket'" class="redpacket-card" :class="{ opened: item.opened }" @click="openRedPacket(item)">
                  <div class="redpacket-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.18 9.54 1.85 8.35 2.29 7.11 2.75 6.25 3.88 6.05 5.2 6.02 5.43 6 5.66 6 6H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-13 5c-1.11 0-2-.89-2-2s.89-2 2-2 2 .89 2 2-.89 2-2 2zm6 7c-2.21 0-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.21-1.79 4-4 4z"/></svg>
                  </div>
                  <div class="redpacket-info">
                    <div class="redpacket-title">{{ item.text }}</div>
                    <div class="redpacket-label">{{ item.opened ? t('page.opened') : t('page.grabRedPacket') }}</div>
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
              <span>🏆 {{ t('page.rankTitle') }}</span>
              <small>{{ t('page.liveRank') }}</small>
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
                  <span class="rank-lv" :class="`lv-${user.lv}`">{{ t('page.level') }}{{ user.lv }}</span>
                </div>
                <div class="rank-meta">{{ t('page.activeToday') }}</div>
              </div>
              <div class="rank-score">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-1.97 4.8-4.8 4.8z"/></svg>
                {{ user.score }}
              </div>
            </div>
          </div>
          <MobileOnly tag="div" class="mobile-schedule-panel">
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
              <button type="button" class="mobile-schedule-card__btn">{{ t('page.book') }}</button>
            </div>
          </MobileOnly>
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
              <span class="send-login">{{ t('page.loginToChat') }}</span>
              <input type="text" :placeholder="t('page.chatPlaceholder')">
            </div>
            <button type="button" class="send-btn">
              <img class="send-gift-icon" src="/assets/gift.png" alt="">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              <span class="send-btn__label">{{ t('page.send') }}</span>
            </button>
          </div>
          <button type="button" class="gift-test-btn" @click="sendGift">
            <img src="/assets/gift.png" alt="">
            {{ t('page.testGiftEffect') }}
          </button>
        </aside>
      </section>

      <DesktopOnly tag="section" class="schedule-section">
        <h2>{{ t('page.anchorSchedule') }}</h2>
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
                <span>{{ scheduleStatusText(game.date) }}</span>
              </div>
            </div>
            <button type="button" class="schedule-btn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V8h14v10c0 .55-.45 1-1 1zM7 10h5v5H7z"/></svg>
              {{ t('page.book') }}
            </button>
          </div>
          <button class="schedule-next" type="button"></button>
        </div>
      </DesktopOnly>

      <DesktopOnly tag="section" class="video-section">
        <h2>{{ t('page.videoRecommend') }}</h2>
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
      </DesktopOnly>
    </main>

    <SiteFooter />
    <LoginModal
      v-model:visible="loginVisible"
      :type="loginType"
      @success="isLoggedIn = true"
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
import Player, { Events } from 'xgplayer'
const { t } = useI18n()
import 'xgplayer/dist/index.min.css'

const route = useRoute()
const roomId = computed(() => route.params.id || '990645')
const transitionName = computed(() => {
  const prefix = route.query.vt === 'anchor' ? 'anchor-cover' : 'room-cover'
  return `${prefix}-${roomId.value}`
})
const pageTitle = computed(() => `${t('page.titleRoom')} ${roomId.value}`)
useHead(() => ({
  title: pageTitle.value
}))
const isLoggedIn = ref(false)
const loginVisible = ref(false)
const loginType = ref('login')
const followVisible = ref(false)
const isMuted = ref(true)

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
  chatMessages.value.forEach(item => {
    if (item.lv) {
      stats[item.lv] = (stats[item.lv] || 0) + 1
    }
  })
  return Object.entries(stats)
    .map(([lv, count]) => ({ lv: Number(lv), count }))
    .sort((a, b) => b.lv - a.lv)
})

const chatListRef = ref(null)

function scrollChatToBottom() {
  nextTick(() => {
    const list = chatListRef.value
    if (list) list.scrollTop = list.scrollHeight
  })
}

function pushChatMessage(message) {
  chatMessages.value.push(message)
  scrollChatToBottom()
}

function spawnGiftEffects({ count, delay, minDuration, durationRange, minScale, scaleRange, leftMin, leftMax, text, icon }) {
  const baseId = Date.now()
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const id = baseId + i + Math.random()
      const left = leftMin + Math.random() * (leftMax - leftMin)
      const duration = minDuration + Math.random() * durationRange
      const scale = minScale + Math.random() * scaleRange
      giftEffects.value.push({ id, left, duration, scale, text, icon })
      setTimeout(() => {
        giftEffects.value = giftEffects.value.filter(g => g.id !== id)
      }, duration * 1000)
    }, i * delay)
  }
}

function sendGift() {
  spawnGiftEffects({
    count: 5 + Math.floor(Math.random() * 4),
    delay: 120,
    minDuration: 2.2,
    durationRange: 1.2,
    minScale: 0.8,
    scaleRange: 0.5,
    leftMin: 80,
    leftMax: window.innerWidth - 240,
    text: '送了一个礼物'
  })
}

function sendRedPacket() {
  pushChatMessage({
    lv: 8,
    name: '💖精彩💖',
    text: '主播红包',
    type: 'redpacket',
    opened: false,
    time: t('page.justNow')
  })
}

function sendAnnouncement() {
  pushChatMessage({
    lv: 8,
    name: '群管理',
    title: '群管公告',
    text: '请大家文明发言，禁止发布广告和违规内容',
    type: 'announcement',
    time: t('page.justNow')
  })
}

function sendActivity() {
  pushChatMessage({
    lv: 8,
    name: '活动助手',
    title: '充值返现活动',
    text: '今日充值满100送20，限时活动先到先得',
    link: 'https://example.com/activity',
    linkText: '立即参与',
    type: 'activity',
    time: t('page.justNow')
  })
}

function sendImage() {
  pushChatMessage({
    lv: 3,
    name: '琳子',
    text: '分享了一张图片',
    image: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg',
    type: 'image',
    time: t('page.justNow')
  })
}

function entryIcon(lv) {
  const map = { 1: '🌱', 2: '🌟', 3: '💎', 4: '🚀', 5: '👑', 6: '💜', 7: '🌹', 8: '🔥' }
  return map[lv] || '✨'
}

function liveStatusText(status) {
  if (status === '直播') return t('page.live')
  if (status === '动画') return t('page.animation')
  return status
}

function scheduleStatusText(date) {
  return date === '今天' ? t('page.startingSoon') : t('page.waitingToLive')
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
  spawnGiftEffects({
    count: 6,
    delay: 100,
    minDuration: 1.8,
    durationRange: 0.8,
    minScale: 0.7,
    scaleRange: 0.4,
    leftMin: 100,
    leftMax: window.innerWidth - 280,
    text: '+金币',
    icon: 'coin'
  })
}

function unmuteVideo() {
  if (!player) return
  player.muted = false
  if (player.paused) player.play()
}

let player = null
onMounted(() => {
  if (route.query.vt) {
    const query = { ...route.query }
    delete query.vt
    const queryString = Object.keys(query).length ? '?' + new URLSearchParams(query).toString() : ''
    window.history.replaceState(null, '', route.path + queryString)
  }
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
  player.muted = true
  player.on(Events.VOLUME_CHANGE, () => {
    isMuted.value = player.muted
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

const chatMessages = ref([
  { lv: 3, name: '琳子', text: '哦，都是在群里分享的' },
  { lv: 2, name: '大果头', text: '初盘英格兰怎么看' },
  { lv: 3, name: '琳子', text: '这是没有说明' },
  { lv: 3, name: '琳子', text: '不是呀我说的是直播间没说中途有什么***什么时候去' },
  { lv: 2, name: '大果头', text: '英格兰呢' },
  { lv: 3, name: '我', text: '我觉得英格兰这场稳了，主场优势很大', self: true },
  { lv: 8, name: '💖精彩💖', text: '主播红包', type: 'redpacket', opened: false, time: t('page.justNow') },
  { lv: 2, name: '大果头', text: '墨西哥怎么看' },
  { lv: 8, name: '群管理', title: '群管公告', text: '请大家文明发言，禁止发布广告和违规内容', type: 'announcement', time: t('page.justNow') },
  { lv: 8, name: '活动助手', title: '充值返现活动', text: '今日充值满100送20，限时活动先到先得', link: 'https://example.com/activity', linkText: '立即参与', type: 'activity', time: t('page.justNow') },
  { lv: 3, name: '琳子', text: '瞌睡来了 😂' },
  { lv: 5, name: '帅帅🔥C99999', text: '领取包赔、体育链接、添加66号：C99999🔥' },
  { lv: 2, name: '大果头', text: '墨西哥几比几' },
  { lv: 3, name: '我', text: '墨西哥应该能赢一球', self: true },
  { lv: 3, name: '琳子', text: '睡了拜拜' },
  { lv: 5, name: t('page.assistant'), text: '欢迎来到直播间，有问题随时咨询我哦', assistant: true },
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
])

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
  @apply min-h-screen text-[#333] pt-[72px] bg-[linear-gradient(to_bottom,#25284d_0,#25284d_748px,#eef0f5_748px)];
}
.room-main {
  @apply w-[1200px] mx-auto py-3.5 pb-11;
}
.room-shell {
  @apply grid grid-cols-[860px_330px] gap-2.5 mb-12;
}
.room-left,
.chat-room {
  @apply overflow-hidden bg-white rounded;
}
.anchor-bar {
  @apply h-[100px] px-6 py-[18px] flex items-center justify-between shadow-[0_2px_8px_rgba(0,0,0,0.08)];
}
.anchor-profile {
  @apply flex items-center min-w-0;
}
.anchor-avatar {
  @apply w-[60px] h-[60px] mr-4 rounded-full object-cover;
}
.anchor-copy {
  @apply min-w-0;
}
.anchor-copy h1 {
  @apply m-0 mb-3 text-[#222] text-xl font-bold leading-6 truncate;
}
.anchor-copy p {
  @apply m-0 text-[#777] text-sm truncate flex items-center gap-3.5;
}
.anchor-copy span,
.anchor-copy em,
.anchor-copy a {
  @apply mr-0;
}
.anchor-copy em {
  @apply pl-[18px] not-italic bg-[url('/assets/icon-hot-gray.png')] bg-no-repeat bg-left bg-[length:12px_auto];
}
.anchor-copy a {
  @apply text-[#777] no-underline;
}
.anchor-actions {
  @apply flex items-center gap-6;
}
.anchor-actions button {
  @apply w-[74px] h-10 border-0 rounded-[20px] text-white bg-[#ffc400] text-base cursor-pointer;
}
.code-icon {
  @apply w-[26px] h-[26px] opacity-[0.62];
}
.down-arrow {
  @apply w-[14px] h-[14px] border-r-2 border-b-2 border-[#aaa] rotate-45;
}
.match-player {
  @apply bg-white rounded-3xl overflow-hidden shadow-[0_22px_60px_rgba(15,23,42,0.12)];
}
.video-stage {
  @apply relative h-[484px] bg-slate-900 overflow-hidden rounded-t-3xl;
}
.video-player-wrap {
  @apply relative w-full h-full isolate;
}
.xgplayer-container {
  @apply w-full h-full bg-slate-900;
}
.xgplayer-container :deep(.xgplayer) {
  @apply bg-transparent;
}
.xgplayer-container :deep(.xgplayer-controls) {
  @apply bg-[linear-gradient(180deg,transparent_0%,rgba(15,23,42,0.82)_100%)];
}
.video-live-badge {
  @apply absolute top-[18px] left-[18px] z-[4] inline-flex items-center gap-2 h-[30px] px-3.5 rounded-full bg-[rgba(239,68,68,0.92)] text-white text-[13px] font-extrabold shadow-[0_8px_22px_rgba(239,68,68,0.26)] pointer-events-none;
}
.live-pulse {
  @apply w-2 h-2 rounded-full bg-white shadow-[0_0_0_6px_rgba(239,68,68,0.28)] animate-[pulse_1.6s_ease-out_infinite];
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.48); }
  70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
  100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
}
.video-meta {
  @apply absolute bottom-[62px] left-0 right-0 z-[3] px-[22px] py-[18px] text-white pointer-events-none;
}
.video-tag {
  @apply inline-flex h-[26px] items-center px-2.5 rounded-full bg-white/[0.18] text-white text-xs font-bold mb-2.5 backdrop-blur-[10px];
}
.video-meta h2 {
  @apply m-0 mb-1.5 text-[22px] font-extrabold drop-shadow-[0_4px_18px_rgba(0,0,0,0.36)];
}
.video-meta p {
  @apply m-0 text-sm text-white/[0.85];
}
.video-meta p strong {
  @apply text-[#ffc21c] text-lg ml-1.5;
}
.unmute-btn {
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/[0.36] text-white h-[44px] leading-[44px] px-5 rounded-full bg-white/[0.16] shadow-[0_12px_28px_rgba(0,0,0,0.24)] text-base font-semibold cursor-pointer transition-all duration-200 z-[15] backdrop-blur-[10px];
}
.unmute-btn:hover {
  @apply bg-white text-[#111827];
}
.score-board {
  @apply h-auto max-h-[220px] overflow-y-auto bg-slate-50 border-t border-slate-200/[0.9];
}
.score-board::-webkit-scrollbar {
  @apply w-1;
}
.score-board::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.score-board::-webkit-scrollbar-thumb {
  @apply bg-slate-400/[0.4] rounded-sm;
}
.score-row {
  @apply h-12 grid grid-cols-[80px_52px_1fr_72px_1fr_70px_54px] items-center px-[18px] border-b border-slate-200/[0.85] text-slate-500 text-sm transition-colors duration-200;
}
.score-row:hover {
  @apply bg-white/[0.85];
}
.score-row span,
.score-row i {
  @apply text-amber-500 not-italic font-bold;
}
.score-row strong {
  @apply overflow-hidden text-[#334155] font-[650] whitespace-nowrap text-ellipsis;
}

.score-row b {
  @apply text-red-500 text-xl text-center font-extrabold;
}
.score-row button {
  @apply w-11 h-[26px] border-0 rounded-full text-white bg-[linear-gradient(135deg,#4ade80_0%,#22c55e_100%)] text-xs font-extrabold cursor-pointer shadow-[0_6px_14px_rgba(34,197,94,0.22)];
}
.title-row {
  @apply text-white bg-[linear-gradient(135deg,#111827_0%,#25284d_100%)] grid-cols-[86px_1fr_70px_110px] sticky top-0 z-[1];
}
.title-row strong,
.title-row b,
.title-row em {
  @apply text-white not-italic font-bold;
}
.title-row b {
  @apply text-[#ffc21c] text-[22px];
}
.player-ad {
  @apply h-9 flex items-center gap-2.5 px-4 overflow-hidden text-[#7c2d12] bg-[linear-gradient(135deg,#fffbeb_0%,#fef3c7_100%)] text-[13px] leading-[1.4] border-t border-slate-200/[0.9];
}
.ad-badge {
  @apply shrink-0 h-5 px-2 rounded-full bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] text-[#111827] text-[11px] font-extrabold leading-5;
}
.ad-text {
  @apply overflow-hidden whitespace-nowrap text-ellipsis;
}
.coin-bar {
  @apply h-16 flex items-center bg-white border-t border-slate-200/[0.9];
}
.coin-count {
  @apply w-[170px] h-16 pl-[22px] flex flex-col justify-center border-r border-slate-200/[0.9];
}
.coin-count strong {
  @apply block text-2xl leading-7 font-extrabold text-slate-900;
}
.coin-count span {
  @apply text-slate-500 text-[13px] font-medium;
}
.coin-icons {
  @apply flex-1 flex items-center justify-center gap-[18px];
}
.coin-btn {
  @apply w-11 h-11 border-0 rounded-full bg-slate-100 inline-flex items-center justify-center cursor-pointer transition-[background,transform] duration-200;
}
.coin-btn:hover {
  @apply bg-slate-200 -translate-y-0.5;
}
.coin-btn img {
  @apply w-6 h-6 object-contain;
}
.coin-bar a {
  @apply w-[150px] text-slate-500 text-sm font-semibold no-underline transition-colors duration-200;
}
.coin-bar a:hover {
  @apply text-amber-500;
}
.chat-room {
  @apply h-[666px] flex flex-col bg-white/[0.92] border border-white/[0.9] rounded-3xl shadow-[0_22px_60px_rgba(15,23,42,0.12)] overflow-hidden backdrop-blur-[14px];
}
.mobile-room-tabs,
.mobile-schedule-panel {
  @apply hidden;
}
.notice {
  @apply px-4 py-3.5 text-slate-600 border-b border-slate-200/[0.9] text-[13px] leading-[1.6] bg-[linear-gradient(135deg,#fffbeb_0%,#fff_100%)];
}
.notice-badge {
  @apply inline-flex items-center gap-1.5 h-[26px] px-2.5 mb-2 rounded-full bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] text-[#111827] text-xs font-extrabold;
}
.notice-badge svg {
  @apply w-3.5 h-3.5;
}
.notice span {
  @apply block pl-0.5;
}
.level-info {
  @apply px-4 py-2.5 bg-white border-b border-slate-200/[0.9];
}
.level-info-title {
  @apply text-slate-500 text-[11px] font-bold mb-2 uppercase tracking-[0.5px];
}
.level-info-list {
  @apply flex flex-wrap gap-2;
}
.level-info-item {
  @apply h-[22px] px-2.5 rounded-full inline-flex items-center justify-center text-[11px] font-extrabold text-white;
}
.chat-tabs {
  @apply h-[46px] flex border-b border-slate-200/[0.9] bg-white;
}
.chat-tabs button {
  @apply relative flex-1 inline-flex items-center justify-center gap-2 border-0 bg-transparent text-slate-500 text-sm font-[650] cursor-pointer transition-colors duration-200;
}
.chat-tabs button svg {
  @apply w-4 h-4;
}
.chat-tabs button:hover {
  @apply text-slate-700;
}
.chat-tabs .active {
  @apply text-[#111827];
}
.chat-tabs .active::after {
  @apply content-[''] absolute left-1/2 bottom-0 w-[56px] h-[3px] rounded-full bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] -translate-x-1/2;
}
.chat-list {
  @apply flex-1 px-4 py-3 overflow-y-auto overflow-x-hidden bg-slate-50 scroll-smooth;
}
.chat-list::-webkit-scrollbar {
  @apply w-1;
}
.chat-list::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.chat-list::-webkit-scrollbar-thumb {
  @apply bg-slate-400/[0.4] rounded-sm;
}

.rank-list {
  @apply flex-1 px-3.5 py-3 pb-2 overflow-y-auto overflow-x-hidden bg-slate-50 scroll-smooth;
}
.rank-list::-webkit-scrollbar {
  @apply w-1;
}
.rank-list::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.rank-list::-webkit-scrollbar-thumb {
  @apply bg-slate-400/[0.4] rounded-sm;
}
.rank-header {
  @apply flex items-center justify-between mb-3 px-1 text-slate-900 text-sm font-extrabold;
}
.rank-header small {
  @apply text-slate-400 text-[11px] font-semibold;
}
.rank-row {
  @apply flex items-center px-3 py-2.5 mb-2 rounded-[14px] bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-[transform,box-shadow] duration-200;
}
.rank-row:hover {
  @apply -translate-y-0.5 shadow-[0_6px_16px_rgba(15,23,42,0.08)];
}
.rank-row.top {
  @apply bg-[linear-gradient(135deg,#fff_0%,#fffbeb_100%)] border border-[rgba(251,191,36,0.25)];
}
.rank-row.top:nth-child(2) {
  @apply bg-[linear-gradient(135deg,#fff_0%,#f8fafc_100%)] border-[rgba(148,163,184,0.25)];
}
.rank-row.top:nth-child(3) {
  @apply bg-[linear-gradient(135deg,#fff_0%,#fff7ed_100%)] border-[rgba(251,146,60,0.25)];
}
.rank-no {
  @apply w-7 shrink-0 text-center text-slate-500 text-[13px] font-bold;
}
.rank-no.medal {
  @apply w-7 h-7 shrink-0 basis-7 rounded-full text-white bg-[linear-gradient(135deg,#ffd700_0%,#ffb800_100%)] text-sm font-extrabold leading-7 shadow-[0_4px_10px_rgba(255,184,0,0.26)];
}
.rank-row:nth-child(2) .rank-no.medal {
  @apply bg-[linear-gradient(135deg,#cbd5e1_0%,#94a3b8_100%)] shadow-[0_4px_10px_rgba(148,163,184,0.26)];
}
.rank-row:nth-child(3) .rank-no.medal {
  @apply bg-[linear-gradient(135deg,#fdba74_0%,#c67a3e_100%)] shadow-[0_4px_10px_rgba(198,122,62,0.26)];
}
.rank-avatar {
  @apply w-[42px] h-[42px] mx-3 shrink-0 rounded-full object-cover border-2 border-white shadow-[0_6px_14px_rgba(15,23,42,0.1)];
}
.rank-row.top .rank-avatar {
  @apply border-amber-100 shadow-[0_6px_16px_rgba(251,191,36,0.18)];
}
.rank-info {
  @apply flex-1 min-w-0 flex flex-col gap-1;
}
.rank-name {
  @apply flex items-center gap-2 min-w-0;
}
.rank-name span:first-child {
  @apply min-w-0 overflow-hidden whitespace-nowrap text-ellipsis text-slate-900 text-sm font-bold;
}
.rank-meta {
  @apply text-slate-400 text-[11px] font-medium;
}
.rank-score {
  @apply shrink-0 inline-flex items-center gap-1 text-amber-500 text-[13px] font-extrabold;
}
.rank-score svg {
  @apply w-4 h-4 shrink-0;
}
.rank-lv {
  @apply h-4 px-1.5 rounded-full text-[10px] font-extrabold leading-4 whitespace-nowrap;
}
.chat-topic {
  @apply inline-flex items-center gap-2 px-3.5 py-2 mb-3 rounded-full bg-[linear-gradient(135deg,#fef3c7_0%,#fde68a_100%)] text-[#92400e] text-[13px] font-bold;
}
.topic-dot {
  @apply w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_0_5px_rgba(245,158,11,0.18)];
}
.chat-msg {
  @apply flex gap-2.5 mb-4 max-w-[82%];
}
.chat-msg.self {
  @apply flex-row-reverse ml-auto;
}
.msg-avatar {
  @apply w-9 h-9 rounded-full object-cover border-2 border-white shadow-[0_6px_14px_rgba(15,23,42,0.1)] shrink-0 mt-1;
}
.chat-msg.self .msg-avatar {
  @apply border-amber-500;
}
.msg-content {
  @apply flex-1 min-w-0 flex flex-col;
}
.chat-msg.self .msg-content {
  @apply items-end;
}
.msg-head {
  @apply flex items-center gap-2 mb-1;
}
.chat-msg.self .msg-head {
  @apply flex-row-reverse;
}
.msg-name {
  @apply text-slate-900 text-[13px] font-bold;
}
.assistant-badge {
  @apply h-[18px] px-2 rounded-full bg-[linear-gradient(135deg,#c084fc_0%,#9333ea_100%)] text-white text-[10px] font-extrabold leading-[18px] text-center whitespace-nowrap;
}
.msg-time {
  @apply text-slate-400 text-[11px] font-medium;
}
.msg-lv {
  @apply h-[15px] px-1.5 rounded-full text-[#facc15] text-[10px] font-extrabold leading-[15px] text-center whitespace-nowrap;
}
.msg-bubble {
  @apply inline-block px-3.5 py-2.5 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.06)] relative;
}
.msg-bubble::before {
  @apply content-[''] absolute top-3.5 w-0 h-0 border-solid;
}
.chat-msg:not(.self) .msg-bubble::before {
  @apply left-[-6px] border-[6px_8px_6px_0] border-transparent border-r-white;
}
.chat-msg.self .msg-bubble {
  @apply bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_100%)] rounded-br;
}
.chat-msg.self .msg-bubble::before {
  @apply right-[-6px] border-[6px_0_6px_8px] border-transparent border-l-amber-400;
}
.chat-msg:not(.self) .msg-bubble {
  @apply rounded-bl;
}

.msg-image-card {
  @apply inline-flex flex-col max-w-[240px] p-1.5 rounded-2xl bg-white shadow-[0_4px_12px_rgba(15,23,42,0.06)] overflow-hidden;
}
.msg-image-card img {
  @apply w-full max-h-[200px] object-cover rounded-xl block;
}
.msg-image-text {
  @apply px-2.5 pt-2 pb-1 text-slate-700 text-[13px] leading-[1.5] break-words;
}
.chat-msg.self .msg-image-card {
  @apply bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_100%)] rounded-br;
}
.chat-msg.self .msg-image-text {
  @apply text-white;
}
.chat-msg:not(.self) .msg-image-card {
  @apply rounded-bl;
}
.msg-text {
  @apply text-slate-700 text-sm leading-[1.55] break-words;
}
.chat-msg.self .msg-text {
  @apply text-white;
}
.chat-msg:not(.self).chat-lv-1 .msg-text { @apply text-slate-600; }
.chat-msg:not(.self).chat-lv-2 .msg-text { @apply text-green-800; }
.chat-msg:not(.self).chat-lv-3 .msg-text { @apply text-teal-700; }
.chat-msg:not(.self).chat-lv-4 .msg-text { @apply text-blue-800; }
.chat-msg:not(.self).chat-lv-5 .msg-text { @apply text-sky-700; }
.chat-msg:not(.self).chat-lv-6 .msg-text { @apply text-violet-800; }
.chat-msg:not(.self).chat-lv-7 .msg-text { @apply text-rose-800; }
.chat-msg:not(.self).chat-lv-8 .msg-text { @apply text-indigo-800; }
.chat-msg.self .msg-name {
  @apply text-orange-700;
}
.redpacket-card {
  @apply inline-flex items-center gap-3 px-4 py-3 rounded-[14px] bg-[linear-gradient(135deg,#ef4444_0%,#dc2626_100%)] text-white shadow-[0_8px_22px_rgba(239,68,68,0.28)] cursor-pointer transition-[transform,opacity] duration-200 max-w-[240px];
}
.redpacket-card:hover {
  @apply -translate-y-0.5;
}
.redpacket-card.opened {
  @apply opacity-[0.72] cursor-default;
}
.chat-msg.self .redpacket-card {
  @apply rounded-br;
}
.chat-msg:not(.self) .redpacket-card {
  @apply rounded-bl;
}
.redpacket-icon {
  @apply w-10 h-10 shrink-0 rounded-full bg-white/[0.18] inline-flex items-center justify-center;
}
.redpacket-icon svg {
  @apply w-6 h-6 text-white;
}
.redpacket-info {
  @apply flex-1 min-w-0;
}
.redpacket-title {
  @apply text-sm font-extrabold mb-0.5 overflow-hidden whitespace-nowrap text-ellipsis;
}
.redpacket-label {
  @apply text-[11px] text-white/[0.82] font-medium;
}
.entry-card {
  @apply inline-flex items-center gap-2 px-4 py-2.5 rounded-[18px] bg-white border border-slate-200/[0.9] shadow-[0_4px_12px_rgba(15,23,42,0.06)];
}
.entry-icon {
  @apply text-base;
}
.entry-text {
  @apply text-slate-700 text-[13px] font-bold;
}

.entry-lv-1 { @apply border-slate-400 bg-[linear-gradient(135deg,#f8fafc_0%,#f1f5f9_100%)] shadow-[0_4px_12px_rgba(148,163,184,0.15)]; }
.entry-lv-2 { @apply border-green-400 bg-[linear-gradient(135deg,#f0fdf4_0%,#ecfdf5_100%)] shadow-[0_4px_12px_rgba(74,222,128,0.18)]; }
.entry-lv-3 { @apply border-teal-400 bg-[linear-gradient(135deg,#f0fdfa_0%,#ecfdf9_100%)] shadow-[0_4px_12px_rgba(45,212,191,0.18)]; }
.entry-lv-4 { @apply border-blue-400 bg-[linear-gradient(135deg,#eff6ff_0%,#eef6ff_100%)] shadow-[0_4px_12px_rgba(96,165,250,0.18)]; }
.entry-lv-5 { @apply border-sky-400 bg-[linear-gradient(135deg,#f0f9ff_0%,#eef8ff_100%)] shadow-[0_4px_12px_rgba(56,189,248,0.18)]; }
.entry-lv-6 { @apply border-violet-400 bg-[linear-gradient(135deg,#f5f3ff_0%,#f4f1ff_100%)] shadow-[0_4px_12px_rgba(167,139,250,0.2)]; }
.entry-lv-7 { @apply border-pink-400 bg-[linear-gradient(135deg,#fdf2f8_0%,#fdf1f7_100%)] shadow-[0_4px_12px_rgba(244,114,182,0.2)]; }
.entry-lv-8 { @apply border-indigo-500 bg-[linear-gradient(135deg,#eef2ff_0%,#ede9ff_100%)] shadow-[0_4px_12px_rgba(99,102,241,0.22)]; }

.entry-lv-1 .entry-text { @apply text-slate-600; }
.entry-lv-2 .entry-text { @apply text-green-800; }
.entry-lv-3 .entry-text { @apply text-teal-700; }
.entry-lv-4 .entry-text { @apply text-blue-800; }
.entry-lv-5 .entry-text { @apply text-sky-700; }
.entry-lv-6 .entry-text { @apply text-violet-800; }
.entry-lv-7 .entry-text { @apply text-rose-800; }
.entry-lv-8 .entry-text { @apply text-indigo-800; }

.announcement-card {
  @apply inline-flex items-start gap-3 px-4 py-3 rounded-[14px] bg-[linear-gradient(135deg,#eff6ff_0%,#dbeafe_100%)] border border-blue-500/[0.18] text-blue-800 shadow-[0_4px_14px_rgba(59,130,246,0.1)] max-w-[280px];
}
.announcement-icon {
  @apply w-9 h-9 shrink-0 rounded-full bg-blue-500/[0.12] inline-flex items-center justify-center;
}
.announcement-icon svg {
  @apply w-5 h-5 text-blue-600;
}
.announcement-info {
  @apply flex-1 min-w-0;
}
.announcement-title {
  @apply text-[13px] font-extrabold mb-1 text-blue-700;
}
.announcement-text {
  @apply text-[13px] leading-[1.5] text-blue-900 break-words;
}
.activity-card {
  @apply inline-flex items-start gap-3 px-4 py-3 rounded-[14px] bg-[linear-gradient(135deg,#fef9c3_0%,#fde047_100%)] border border-yellow-500/[0.25] text-yellow-900 shadow-[0_4px_14px_rgba(234,179,8,0.18)] no-underline cursor-pointer transition-transform duration-200 max-w-[280px];
}
.activity-card:hover {
  @apply -translate-y-0.5;
}
.activity-icon {
  @apply w-9 h-9 shrink-0 rounded-full bg-white/[0.45] inline-flex items-center justify-center;
}
.activity-icon svg {
  @apply w-5 h-5 text-yellow-700;
}
.activity-info {
  @apply flex-1 min-w-0;
}
.activity-title {
  @apply text-[13px] font-extrabold mb-0.5 text-yellow-900;
}
.activity-text {
  @apply text-xs leading-[1.45] text-yellow-800 break-words mb-1.5;
}
.activity-link {
  @apply text-xs font-extrabold text-yellow-800;
}
.lv {
  @apply inline-flex items-center justify-center min-w-[32px] h-[18px] px-1.5 rounded-full text-white text-[11px] font-extrabold not-italic leading-none;
}
.lv-1 { @apply bg-[linear-gradient(135deg,#94a3b8_0%,#64748b_100%)] text-slate-100; }
.lv-2 { @apply bg-[linear-gradient(135deg,#4ade80_0%,#22c55e_100%)] text-green-100; }
.lv-3 { @apply bg-[linear-gradient(135deg,#2dd4bf_0%,#14b8a6_100%)] text-teal-100; }
.lv-4 { @apply bg-[linear-gradient(135deg,#60a5fa_0%,#3b82f6_100%)] text-blue-100; }
.lv-5 { @apply bg-[linear-gradient(135deg,#38bdf8_0%,#0ea5e9_100%)] text-sky-100; }
.lv-6 { @apply bg-[linear-gradient(135deg,#a78bfa_0%,#7c3aed_100%)] text-violet-100; }
.lv-7 { @apply bg-[linear-gradient(135deg,#f472b6_0%,#db2777_100%)] text-pink-100; }
.lv-8 { @apply bg-[linear-gradient(135deg,#6366f1_0%,#4338ca_100%)] text-indigo-100; }

.chat-toolbar {
  @apply h-[42px] flex items-center gap-1.5 px-3 border-t border-slate-200/[0.9] bg-white;
}
.tool-btn {
  @apply w-8 h-8 border-0 rounded-full bg-slate-100 inline-flex items-center justify-center cursor-pointer transition-colors duration-200;
}
.tool-btn:hover {
  @apply bg-slate-200;
}
.tool-btn img,
.tool-btn svg {
  @apply w-[18px] h-[18px] text-slate-500;
}
.tool-btn.announcement-btn:hover {
  @apply bg-blue-100;
}
.tool-btn.announcement-btn:hover svg {
  @apply text-blue-600;
}
.tool-btn.activity-btn:hover {
  @apply bg-yellow-100;
}
.tool-btn.activity-btn:hover svg {
  @apply text-yellow-700;
}
.tool-btn.redpacket-btn:hover {
  @apply bg-red-100;
}
.tool-btn.redpacket-btn:hover svg {
  @apply text-red-600;
}
.tool-btn.image-btn:hover {
  @apply bg-green-50;
}
.tool-btn.image-btn:hover svg {
  @apply text-green-600;
}
.chat-send {
  @apply h-14 flex items-center gap-2.5 px-3 border-t border-slate-200/[0.9] bg-white;
}
.send-input-wrap {
  @apply flex-1 min-w-0 h-10 flex items-center px-3 rounded-full bg-slate-100 border border-transparent transition-[border-color,background] duration-200;
}
.send-input-wrap:focus-within {
  @apply bg-white border-[#ffc21c];
}
.send-login {
  @apply text-[13px] text-amber-500 font-bold cursor-pointer mr-2.5 whitespace-nowrap;
}
.gift-effects {
  @apply fixed inset-0 pointer-events-none z-[1000] overflow-hidden;
}
.gift-fly {
  @apply absolute bottom-[120px] flex flex-col items-center animate-[giftFly_ease-in_forwards];
}
.gift-fly img {
  @apply w-14 h-14 object-contain drop-shadow-[0_8px_24px_rgba(248,194,27,0.4)];
}
.gift-fly.coin img {
  @apply w-11 h-11;
}
.gift-glow {
  @apply mt-2 px-3.5 py-1.5 rounded-full bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] text-[#111827] text-[13px] font-extrabold shadow-[0_8px_24px_rgba(248,194,27,0.28)] whitespace-nowrap;
}
.gift-fly.coin .gift-glow {
  @apply bg-[linear-gradient(135deg,#4ade80_0%,#22c55e_100%)] text-white;
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
  @apply flex-1 h-full border-0 bg-transparent text-sm text-slate-900 outline-none;
}
.chat-send input::placeholder {
  @apply text-slate-400;
}
.send-btn {
  @apply h-10 px-[18px] border-0 rounded-full text-[#111827] text-sm font-extrabold bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] cursor-pointer inline-flex items-center gap-1.5 shadow-[0_8px_18px_rgba(248,194,27,0.28)] transition-transform duration-200;
}
.send-btn:hover {
  @apply -translate-y-px;
}
.send-btn svg {
  @apply w-4 h-4;
}
.send-gift-icon {
  @apply hidden w-7 h-7 object-contain;
}
.gift-test-btn {
  @apply w-full h-[38px] border-0 border-t border-slate-200/[0.9] bg-[linear-gradient(135deg,#fffbeb_0%,#fef3c7_100%)] text-[#92400e] text-[13px] font-extrabold cursor-pointer inline-flex items-center justify-center gap-2 transition-colors duration-200;
}
.gift-test-btn:hover {
  @apply bg-[linear-gradient(135deg,#fef3c7_0%,#fde68a_100%)];
}
.gift-test-btn img {
  @apply w-5 h-5 object-contain;
}
.schedule-section,
.video-section {
  @apply mt-0;
}
.schedule-section h2,
.video-section h2 {
  @apply m-0 mb-[18px] text-[#333] text-[26px] font-medium leading-9;
}
.schedule-row {
  @apply relative grid grid-cols-5 gap-4 mb-12;
}
.schedule-card {
  @apply relative flex flex-col gap-3.5 p-[18px] rounded-[14px] bg-white shadow-[0_4px_14px_rgba(15,23,42,0.06)] transition-[transform,box-shadow] duration-[0.25s];
}
.schedule-card:hover {
  @apply -translate-y-1 shadow-[0_12px_28px_rgba(15,23,42,0.1)];
}
.schedule-date {
  @apply flex items-baseline gap-2;
}
.schedule-date strong {
  @apply inline-flex items-center justify-center h-7 px-2.5 rounded-full bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_100%)] text-white text-[13px] font-extrabold;
}
.schedule-date span {
  @apply text-slate-500 text-sm font-semibold;
}
.schedule-content {
  @apply flex-1 flex flex-col gap-2.5;
}
.schedule-league {
  @apply inline-flex items-center w-fit h-[22px] px-2 rounded bg-slate-100 text-slate-600 text-[11px] font-bold;
}
.schedule-teams {
  @apply flex items-center gap-2 text-slate-900 text-[15px] font-bold;
}
.schedule-team {
  @apply min-w-0 overflow-hidden whitespace-nowrap text-ellipsis flex-1;
}
.schedule-team:first-child {
  @apply text-right;
}
.schedule-vs {
  @apply shrink-0 px-1.5 py-0.5 rounded bg-red-100 text-red-600 text-[11px] font-extrabold;
}
.schedule-status {
  @apply inline-flex items-center gap-1 text-green-500 text-xs font-semibold;
}
.status-dot {
  @apply w-[7px] h-[7px] rounded-full bg-green-500 animate-[livePulse_1.4s_ease-in-out_infinite];
}
.schedule-btn {
  @apply self-start inline-flex items-center justify-center gap-1 h-[34px] px-3.5 border-0 rounded-full text-white bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_100%)] text-[13px] font-bold cursor-pointer transition-[transform,box-shadow] duration-200;
}
.schedule-btn:hover {
  @apply scale-105 shadow-[0_4px_14px_rgba(251,191,36,0.4)];
}
.schedule-btn svg {
  @apply w-4 h-4 shrink-0;
}
.schedule-next {
  @apply absolute -right-[42px] top-[42px] w-[26px] h-[42px] border-0 bg-transparent;
}
.schedule-next::before {
  @apply content-[''] absolute top-[7px] left-1 w-6 h-6 border-t-[3px] border-r-[3px] border-[#999] rotate-45;
}
.video-list {
  @apply grid grid-cols-5 gap-x-[18px] gap-y-5 p-0 m-0 list-none;
}
.video-list li {
  @apply min-w-0;
}
.video-list a {
  @apply block overflow-hidden text-[#333] no-underline bg-white rounded-xl shadow-[0_4px_14px_rgba(15,23,42,0.06)] transition-[transform,box-shadow] duration-[0.25s];
}
.video-list a:hover {
  @apply -translate-y-1.5 shadow-[0_12px_28px_rgba(15,23,42,0.12)];
}
.video-cover {
  @apply relative h-[140px] overflow-hidden bg-[#111] rounded-t-xl;
}
.video-cover > img {
  @apply w-full h-full block object-cover transition-transform duration-[0.35s];
}
.video-list a:hover .video-cover > img {
  @apply scale-[1.08];
}
.video-cover-overlay {
  @apply absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.1)_0%,rgba(15,23,42,0.45)_100%)] opacity-70 transition-opacity duration-[0.25s];
}
.video-list a:hover .video-cover-overlay {
  @apply opacity-90;
}
.play-overlay {
  @apply absolute inset-0 inline-flex items-center justify-center opacity-0 transition-opacity duration-[0.25s];
}
.video-list a:hover .play-overlay {
  @apply opacity-100;
}
.play-overlay svg {
  @apply w-12 h-12 p-3 rounded-full bg-white/[0.92] text-red-500 shadow-[0_4px_16px_rgba(0,0,0,0.2)];
}
.living-badge {
  @apply absolute top-2.5 left-2.5 h-[22px] px-2 inline-flex items-center gap-1 text-white bg-[rgba(239,68,68,0.92)] rounded-full text-xs font-bold leading-none backdrop-blur-[4px];
}
.live-pulse {
  @apply w-[7px] h-[7px] rounded-full bg-white animate-[livePulse_1.4s_ease-in-out_infinite];
}
.viewers-badge {
  @apply absolute bottom-2.5 right-2.5 h-[22px] px-2 inline-flex items-center gap-1 text-white bg-[rgba(15,23,42,0.65)] rounded-full text-[11px] font-semibold leading-none backdrop-blur-[4px];
}
.viewers-badge svg {
  @apply w-[13px] h-[13px] shrink-0;
}
.video-card-body {
  @apply p-3;
}
.video-list h3 {
  @apply m-0 mb-2.5 overflow-hidden text-slate-900 text-sm font-semibold leading-[1.5] whitespace-nowrap text-ellipsis transition-colors duration-200;
}
.video-list a:hover h3 {
  @apply text-red-500;
}
.video-list p {
  @apply m-0 flex items-center gap-1.5 text-slate-500 text-xs;
}
.video-list p img {
  @apply w-[22px] h-[22px] rounded-full object-cover border border-slate-200/[0.9];
}
.video-list p span {
  @apply min-w-0 overflow-hidden whitespace-nowrap text-ellipsis;
}
@keyframes livePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

@media screen and (max-width: 1260px) {
  .room-main {
    @apply w-[1180px];
  }
  .room-shell {
    @apply grid-cols-[840px_330px];
  }
}

@media (max-width: 768px) {
  .room-page {
    @apply pt-[68px] bg-[linear-gradient(180deg,rgba(255,198,26,0.12)_0%,rgba(255,198,26,0.03)_26%,#f8fafc_100%)];
  }
  .room-main {
    @apply w-full pt-3.5 px-4 pb-0;
  }
  .room-shell {
    @apply flex flex-col h-[calc(100vh-82px)] mb-0;
  }
  .room-left,
  .chat-room {
    @apply rounded-[18px];
  }
  .room-left {
    @apply flex-[0_0_auto] overflow-visible bg-transparent shadow-none rounded-none;
  }
  .chat-room {
    @apply relative mt-0 overflow-hidden bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] rounded-b-[18px] flex flex-col flex-[1_1_auto] h-auto min-h-0;
  }
  .mobile-room-tabs {
    @apply flex items-stretch justify-between gap-0 border-b border-slate-200/[0.9] bg-white;
  }
  .mobile-room-tabs__list {
    @apply min-w-0 flex-1 grid grid-cols-3;
  }
  .mobile-room-tabs__list button {
    @apply h-[52px] min-w-0 border-0 bg-transparent text-neutral-500 text-sm font-bold whitespace-nowrap;
  }
  .mobile-room-tabs__list button.active {
    @apply text-amber-500;
  }
  .mobile-room-tabs__follow {
    @apply flex-[0_0_88px] border-0 inline-flex items-center justify-center gap-1.5 bg-[linear-gradient(135deg,#ffd84f_0%,#ffc21c_100%)] text-white text-sm font-extrabold;
  }
  .mobile-room-tabs__follow svg {
    @apply w-[18px] h-[18px];
  }
  .anchor-bar,
  .score-board,
  .player-ad,
  .coin-bar {
    @apply hidden;
  }
  .match-player {
    @apply mt-0 rounded-t-[18px] shadow-[0_12px_30px_rgba(15,23,42,0.08)] overflow-hidden;
  }
  .video-stage {
    @apply h-auto aspect-[16/9] rounded-t-[18px];
  }
  .video-live-badge {
    @apply top-3 left-3 h-7 px-3 text-xs;
  }
  .video-meta {
    @apply bottom-3.5 px-3.5;
  }
  .video-tag {
    @apply h-[22px] text-[10px] mb-1.5;
  }
  .video-meta h2 {
    @apply text-[15px] leading-[1.3];
  }
  .video-meta p {
    @apply text-xs;
  }
  .video-meta p strong {
    @apply text-[15px];
  }
  .unmute-btn {
    @apply h-9 leading-9 px-4 text-sm;
  }
  .notice {
    @apply px-3.5 py-2.5 border-b border-slate-200/[0.86];
  }
  .notice-badge,
  .notice span {
    @apply text-xs leading-[1.5];
  }
  .mobile-schedule-panel {
    @apply hidden;
  }
  .chat-tabs {
    @apply hidden;
  }
  .chat-list,
  .rank-list,
  .mobile-schedule-panel,
  .chat-toolbar,
  .chat-send,
  .gift-test-btn,
  .notice {
    @apply hidden;
  }
  .chat-list,
  .rank-list {
    @apply flex-[1_1_auto] h-auto min-h-[220px] px-3.5 py-3 overflow-y-auto;
  }
  .chat-msg {
    @apply gap-2.5;
  }
  .msg-avatar,
  .rank-avatar {
    @apply w-10 h-10;
  }
  .msg-name,
  .rank-name span {
    @apply text-sm;
  }
  .msg-text,
  .announcement-text,
  .activity-text,
  .entry-text {
    @apply text-sm leading-[1.6];
  }
  .chat-toolbar {
    @apply !hidden;
  }
  .tool-btn {
    @apply w-10 h-10 shrink-0;
  }
  .chat-send {
    @apply flex-[0_0_auto] px-3.5 py-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0))] gap-2.5 items-center bg-white border-t border-slate-200/[0.9] shadow-[0_-6px_16px_rgba(15,23,42,0.05)];
  }
  .send-input-wrap {
    @apply flex-[1_1_auto] min-h-[48px] px-4 rounded-full bg-gray-100;
  }
  .send-login,
  .send-input-wrap input,
  .send-btn {
    @apply text-[15px];
  }
  .send-btn {
    @apply flex-[0_0_48px] w-12 h-12 p-0 rounded-[14px] bg-transparent shadow-none text-[0px] justify-center;
  }
  .send-btn:hover {
    @apply transform-none;
  }
  .send-btn svg {
    @apply hidden;
  }
  .send-gift-icon {
    @apply block w-8 h-8;
  }
  .send-btn__label {
    @apply hidden;
  }
  .gift-test-btn {
    @apply !hidden mx-3.5 mb-3.5 h-11 text-sm;
  }
  .mobile-schedule-panel {
    @apply p-3.5 gap-3 flex-col;
  }
  .mobile-schedule-card {
    @apply grid grid-cols-[68px_minmax(0,1fr)_64px] gap-3 items-center px-3 py-3.5 rounded-2xl bg-slate-50;
  }
  .mobile-schedule-card__time {
    @apply text-center;
  }
  .mobile-schedule-card__time strong {
    @apply block mb-1 text-[#111827] text-sm font-extrabold;
  }
  .mobile-schedule-card__time span,
  .mobile-schedule-card__league {
    @apply text-slate-500 text-xs;
  }
  .mobile-schedule-card__league {
    @apply mb-1.5;
  }
  .mobile-schedule-card__teams {
    @apply text-[#111827] text-sm font-bold leading-[1.5];
  }
  .mobile-schedule-card__teams em {
    @apply mx-1.5 text-amber-500 not-italic font-extrabold;
  }
  .mobile-schedule-card__btn {
    @apply w-16 h-8 border-0 rounded-full bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] text-[#111827] text-[13px] font-extrabold;
  }
  .mobile-panel-chat .notice,
  .mobile-panel-chat .chat-list {
    @apply block;
  }
  .mobile-panel-chat .chat-toolbar,
  .mobile-panel-chat .chat-send {
    @apply flex;
  }
  .mobile-panel-chat .mobile-schedule-panel {
    @apply flex flex-[0_0_auto] order-10 max-h-[160px] overflow-y-auto;
  }
  .mobile-panel-rank .rank-list {
    @apply block;
  }
  .mobile-schedule-panel.only-mobile {
    @apply !hidden;
  }
  .mobile-panel-schedule .mobile-schedule-panel.only-mobile {
    @apply !flex flex-[1_1_auto] overflow-y-auto;
  }
  .schedule-section,
  .video-section {
    @apply mt-6 p-0 bg-transparent shadow-none;
  }
  .schedule-section h2,
  .video-section h2 {
    @apply mb-3.5 text-[22px];
  }
  .schedule-section {
    @apply hidden;
  }
  .video-list {
    @apply grid-cols-2 gap-3.5;
  }
  .video-list li {
    @apply rounded-[14px] overflow-hidden shadow-[0_10px_24px_rgba(15,23,42,0.08)];
  }
  .video-card-body {
    @apply px-2.5 py-2.5 pb-3;
  }
  .video-list h3 {
    @apply text-[13px] whitespace-normal [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical];
  }
}
</style>
