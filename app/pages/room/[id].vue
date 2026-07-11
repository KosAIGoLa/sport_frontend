<template>
  <div class="room-page">
    <main class="room-main">
      <section class="room-shell">
        <div class="room-left">
          <RoomAnchorBar
            :room-info="roomInfo"
            :room-id="roomId"
            :is-followed="isFollowed"
            @follow="handleFollow"
          />
          <RoomPlayer
            :room-id="roomId"
            :transition-name="transitionName"
            :player-config="roomPlayerConfig"
            :score-rows="scoreRows"
            @open-equipment="equipmentModalVisible = true"
          />
          <RoomFunGuess />
        </div>

        <RoomChatAside
          ref="chatAsideRef"
          v-model:active-mobile-panel="activeMobilePanel"
          :messages="chatMessages"
          :rank-users="rankUsers"
          :schedules="schedules"
          :self-avatar="roomInfo.avatar"
          :is-logged-in="isLoggedIn"
          :is-followed="isFollowed"
          @follow="handleFollow"
          @open-red-packet="openRedPacket"
          @send-announcement="sendAnnouncement"
          @send-activity="sendActivity"
          @send-red-packet="sendRedPacket"
          @send-image="sendImage"
          @send-gift="sendGift"
        />
      </section>

      <RoomScheduleSection :schedules="schedules" />
      <RoomVideoRecommend :lives="recommendedLives" />
    </main>

    <RoomGiftEffects :gifts="giftEffects" />
    <RoomFollowModal
      :visible="followModalVisible"
      :countdown="followCountdown"
      @close="closeFollowModal"
    />
    <RoomEquipmentModal
      :visible="equipmentModalVisible"
      @close="equipmentModalVisible = false"
    />
  </div>
</template>

<script setup>
import {
  ROOM_PROXY_STREAM_URL,
  DEFAULT_ROOM_INFO,
  SCORE_ROWS,
  RANK_USERS,
  ROOM_SCHEDULES,
  RECOMMENDED_LIVES,
  createInitialChatMessages
} from '~/data/room'

definePageMeta({
  layout: 'default',
  forceSolid: true,
  back: true,
  activeMenu: ''
})

const { t } = useI18n()
const route = useRoute()
const { isLoggedIn, openLogin } = useLoginModal()
const { giftEffects, sendGift, openRedPacketCoins } = useRoomGifts()

const roomId = computed(() => route.params.id || '990645')
const transitionName = computed(() => {
  const prefix = route.query.vt === 'anchor' ? 'anchor-cover' : 'room-cover'
  return `${prefix}-${roomId.value}`
})

useHead(() => ({
  title: `${t('page.titleRoom')} ${roomId.value}`
}))

const roomInfo = DEFAULT_ROOM_INFO
const scoreRows = SCORE_ROWS
const rankUsers = RANK_USERS
const schedules = ROOM_SCHEDULES
const recommendedLives = RECOMMENDED_LIVES

const chatMessages = ref(createInitialChatMessages(t))
const chatAsideRef = ref(null)
const activeMobilePanel = ref('chat')
const isFollowed = ref(false)
const followModalVisible = ref(false)
const followCountdown = ref(3)
const equipmentModalVisible = ref(false)
let followTimer = null

function clearFollowTimer() {
  if (followTimer) {
    clearInterval(followTimer)
    followTimer = null
  }
}

function closeFollowModal() {
  clearFollowTimer()
  followModalVisible.value = false
  followCountdown.value = 3
}

function handleFollow() {
  if (!isLoggedIn.value) {
    openLogin('login')
    return
  }
  if (isFollowed.value) return
  isFollowed.value = true
  followCountdown.value = 3
  followModalVisible.value = true
  clearFollowTimer()
  followTimer = setInterval(() => {
    followCountdown.value -= 1
    if (followCountdown.value <= 0) closeFollowModal()
  }, 1000)
}

onUnmounted(clearFollowTimer)

function pushChatMessage(message) {
  chatMessages.value.push(message)
  chatAsideRef.value?.scrollToBottom()
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

function openRedPacket(item) {
  if (item.opened) return
  item.opened = true
  openRedPacketCoins()
}

function createRoomDanmuComments() {
  const baseStyle = {
    color: '#ffffff',
    fontSize: '15px',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 1px 4px rgba(0,0,0,0.8)'
  }
  const messages = [
    `🎙️ ${roomInfo.anchor} 开始讲重点了`,
    `⚽ ${roomInfo.name} 这场节奏很顺`,
    `🔥 当前热度 ${roomInfo.hot}`,
    '👍 画面和声音这一版舒服很多',
    '📣 继续看这波临场变化',
    '🧐 主队这套首发阵容有意思',
    '😤 刚才那球该进了吧',
    '⚡ 防守反击打得很快',
    '⏱️ 裁判这个VAR看得有点久',
    '💪 中场控制力明显上来了',
    '🔄 这换人效果立竿见影',
    '⏰ 最后十分钟估计要搏命了'
  ]
  const comments = []
  const totalRounds = 5
  for (let round = 0; round < totalRounds; round++) {
    messages.forEach((txt, idx) => {
      const globalIdx = round * messages.length + idx
      comments.push({
        id: `${roomId.value}-${globalIdx + 1}`,
        start: globalIdx * 1000 + round * 200,
        duration: 10000 + (idx % 4) * 1500,
        txt,
        style: baseStyle,
        mode: idx % 5 === 2 ? 'top' : idx % 5 === 4 ? 'bottom' : 'scroll'
      })
    })
  }
  return comments
}

const roomPlayerConfig = computed(() => ({
  url: ROOM_PROXY_STREAM_URL,
  poster: '/assets/covers/main-poster-bright.png',
  width: '100%',
  height: '100%',
  autoplay: true,
  autoplayMuted: true,
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
  ignores: ['definition', 'test', 'replay'],
  danmu: {
    comments: createRoomDanmuComments(),
    defaultOpen: true,
    closeDefaultBtn: false,
    panel: false,
    opacity: 1,
    fontSize: 15,
    area: { start: 0.08, end: 0.76 },
    mouseControl: false,
    switchConfig: { position: 'controlsRight', index: 5 }
  }
}))

onMounted(() => {
  if (route.query.vt) {
    const query = { ...route.query }
    delete query.vt
    const queryString = Object.keys(query).length ? '?' + new URLSearchParams(query).toString() : ''
    window.history.replaceState(null, '', route.path + queryString)
  }
})
</script>

<style src="~/assets/css/pages/room.css"></style>
