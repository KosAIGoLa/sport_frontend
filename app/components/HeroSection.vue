<template>
  <section class="living-room">
    <div class="video-inner inner">
      <div class="video-box">
        <div class="hero-status">
          <span class="live-dot"></span> {{ t('common.liveNow') }}
        </div>
        <div class="hero-meta">
          <div>
            <span class="meta-label">{{ t('common.liveStream') }}</span>
            <strong>{{ rooms[currentRoom].title }}</strong>
          </div>
          <span class="meta-count">{{ rooms[currentRoom].viewers }}{{ t('common.watching') }}</span>
        </div>
        <div class="video-player">
          <div id="hero-xgplayer" class="xgplayer-container"></div>
          <div class="video-mask"></div>
          <div v-if="isLoading" class="loading" id="videoLoading">
            <img class="imgRotate" src="/assets/loading.png" alt="">
            <img class="loading-logo" src="/assets/loading-logo.png" alt="">
            <p>{{ t('common.loading') }}</p>
          </div>
        </div>
        <div class="inLiveRoom" role="button" tabindex="0" @click="goRoom" @keydown.enter.prevent="goRoom">{{ t('common.enterLiveRoom') }}</div>
        <div class="live-title" aria-hidden="true">
          <img class="live-cover" :src="rooms[currentRoom].cover" alt="">
          <div class="info">
            <h4>{{ rooms[currentRoom].title }}</h4>
            <p>{{ rooms[currentRoom].anchor }} · {{ rooms[currentRoom].viewers }}</p>
          </div>
        </div>
      </div>
      <div class="video-list">
        <ul class="room-list">
          <li v-for="(room, idx) in rooms" :key="idx" :class="{ active: currentRoom === idx }" @click="currentRoom = idx">
            <a href="javascript:;">
              <img :src="room.cover" :alt="room.title">
              <div class="room-title">{{ room.title }}</div>
              <div class="left-arrow"></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import Player from 'xgplayer'
import 'xgplayer/dist/index.min.css'

const { t } = useI18n()

const rooms = [
  { title: '🔥世欧预  丹麦  VS  乌克兰', cover: '/assets/covers/hot1.png', poster: '/assets/covers/main-poster-bright.png', anchor: '初六', viewers: '5.39w', roomId: '3150351' },
  { title: '瑞典超 埃尔夫斯堡VS哈马比', cover: '/assets/covers/hot2.jpg', poster: '/assets/covers/hot2.jpg', anchor: '评述员阿虎', viewers: '9.63w', roomId: '506605' },
  { title: '拉脱超：格洛比纳vs图库姆斯', cover: '/assets/covers/cover3.png', poster: '/assets/covers/cover3.png', anchor: '都教授', viewers: '8.38w', roomId: '896956' },
  { title: '〖瑞典超〗埃尔夫斯堡 ▲ 哈马比', cover: '/assets/covers/cover1.jpg', poster: '/assets/covers/cover1.jpg', anchor: '八💥佰', viewers: '11.54w', roomId: '308116' },
  { title: '世亚预 叙利亚 VS 伊朗', cover: '/assets/covers/hot5.jpg', poster: '/assets/covers/hot5.jpg', anchor: '高圆圆', viewers: '8.57w', roomId: '5435118' }
]
const currentRoom = ref(0)
const isLoading = ref(false)

let player = null

function initPlayer() {
  if (player) {
    player.destroy()
    player = null
  }
  isLoading.value = true
  player = new Player({
    id: 'hero-xgplayer',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: rooms[currentRoom.value].poster,
    width: '100%',
    height: '100%',
    autoplay: false,
    playsinline: true,
    cssFullscreen: true,
    fluid: false,
    fitVideoSize: 'cover',
    lang: 'zh-cn',
    controls: true,
    controlsMode: 'bottom'
  })
  player.on('play', () => {
    isLoading.value = false
  })
  player.on('canplay', () => {
    isLoading.value = false
  })
  setTimeout(() => {
    isLoading.value = false
  }, 1200)
}

onMounted(() => {
  initPlayer()
})

watch(currentRoom, () => {
  initPlayer()
})

function goRoom() {
  const roomId = rooms[currentRoom.value]?.roomId
  if (!roomId) return
  navigateTo(`/room/${roomId}`)
}
</script>

<style scoped>
.living-room {
  @apply h-[620px] bg-[linear-gradient(180deg,rgba(7,10,28,0.32)_0%,rgba(7,10,28,0.72)_100%),url('/assets/banner.jpg')_center/cover_no-repeat] relative overflow-hidden;
}
.living-room::before {
  @apply content-[''] absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,199,28,0.28),transparent_26%),radial-gradient(circle_at_82%_28%,rgba(33,138,255,0.2),transparent_30%)] pointer-events-none;
}
.inner {
  @apply w-[1200px] mx-auto;
}
.video-inner {
  @apply h-[620px] pt-[92px] flex justify-center relative z-[1];
}
.video-box {
  @apply w-[1015px] h-[507px] bg-black border border-white/[0.16] border-r-0 rounded-l-3xl relative overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.42)];
}
.video-player {
  @apply w-full h-full relative bg-black;
}
.hero-status {
  @apply absolute top-[22px] left-6 z-[12] inline-flex items-center gap-2 h-[34px] px-3.5 border border-white/[0.22] rounded-full bg-[rgba(15,23,42,0.48)] text-white text-[13px] font-bold backdrop-blur-[12px];
}
.live-dot {
  @apply w-2 h-2 rounded-full bg-green-500 shadow-[0_0_0_6px_rgba(34,197,94,0.16)];
}
.hero-meta {
  @apply absolute right-6 bottom-[84px] left-6 z-[12] flex items-end justify-between gap-6 text-white pointer-events-none;
}
.hero-meta strong {
  @apply block max-w-[600px] mt-2 text-[22px] leading-[1.3] tracking-[0.2px] drop-shadow-[0_4px_18px_rgba(0,0,0,0.36)];
}
.meta-label,
.meta-count {
  @apply inline-flex items-center h-[30px] px-3 rounded-full bg-white/[0.14] text-white/[0.9] text-xs font-bold backdrop-blur-[10px];
}
.meta-count {
  @apply whitespace-nowrap;
}
.xgplayer-container {
  @apply w-full h-full rounded-[18px] overflow-hidden;
}
.xgplayer-container video {
  @apply object-cover brightness-[1.2] contrast-[1.1];
}
.video-mask {
  @apply absolute top-0 left-0 w-full h-full bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.56)_100%)] z-[2] pointer-events-none transition-colors duration-300;
}
.video-box:hover .video-mask {
  @apply bg-black/[0.3];
}
.play-btn {
  @apply w-[70px] h-[70px] cursor-pointer transition-transform duration-300;
}
.play-btn:hover {
  @apply scale-110;
}
.play-btn img {
  @apply w-full h-full;
}
.loading {
  @apply absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/[0.7] text-white z-[5];
}
.loading .imgRotate {
  @apply w-[50px] h-[50px] animate-[rotate_1.5s_linear_infinite];
}
.loading-logo {
  @apply w-[60px] mt-2.5;
}
.loading p {
  @apply mt-2.5 text-sm;
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.inLiveRoom {
  @apply absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 border border-white/[0.36] text-[#111827] h-[60px] leading-[60px] px-[30px] rounded-full bg-[linear-gradient(135deg,#fff2a8_0%,#ffc21c_100%)] shadow-[0_18px_42px_rgba(248,194,27,0.36)] text-xl font-semibold cursor-pointer transition-all duration-200 z-[13];
}
.inLiveRoom::after {
  @apply content-['>'] ml-2.5 text-lg font-extrabold;
}
.inLiveRoom:hover {
  @apply bg-[#f8c21b] text-white;
}
.live-title {
  @apply absolute left-2.5 bottom-2.5 flex items-center gap-2.5 text-white z-10 max-w-[60%];
}
.live-title .live-cover {
  @apply w-12 h-12 rounded-md object-cover border-2 border-white/[0.3];
}
.live-title .info h4 {
  @apply text-sm font-medium m-0 mb-1 overflow-hidden whitespace-nowrap text-ellipsis;
}
.live-title .info p {
  @apply text-xs text-white/[0.8] m-0;
}
.video-list {
  @apply w-[185px] h-[507px] overflow-hidden rounded-r-3xl;
}
.room-list {
  @apply list-none h-full overflow-y-auto p-2 px-2 bg-[rgba(7,10,28,0.86)] backdrop-blur-[14px];
}
.room-list::-webkit-scrollbar {
  @apply w-1;
}
.room-list::-webkit-scrollbar-track {
  @apply bg-transparent;
}
.room-list::-webkit-scrollbar-thumb {
  @apply bg-white/[0.3] rounded-sm;
}
.room-list li {
  @apply pb-2.5 relative;
}
.room-list li a {
  @apply block w-[169px] h-[98px] relative rounded-[14px] overflow-hidden;
}
.room-list li a img {
  @apply block w-full h-full object-cover rounded-md;
}
.room-list li .room-title {
  @apply absolute bottom-0 left-0 w-full px-2 pt-[18px] pb-[7px] text-xs text-white bg-[linear-gradient(to_top,rgba(0,0,0,0.7),transparent)] overflow-hidden whitespace-nowrap text-ellipsis z-[2];
}
.room-list li.active a::after,
.room-list li a:hover::after {
  @apply content-[''] absolute top-0 left-0 w-full h-full border-2 border-[#f8c21b] rounded-md box-border z-[3];
}
.room-list li.active .left-arrow {
  @apply absolute top-9 -left-1.5 w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-[#f8c21b] z-[4];
}

@media screen and (max-width: 1400px) {
  .inner {
    @apply w-[960px];
  }
  .living-room {
    @apply h-[528px] bg-[url('/assets/banner-528.jpg')] bg-cover;
  }
  .video-inner {
    @apply h-[528px] pt-[74px];
  }
  .video-box {
    @apply w-[810px] h-[454px];
  }
  .video-list {
    @apply w-[150px] h-[454px];
  }
  .room-list {
    @apply w-[150px] p-2 px-2;
  }
  .room-list li a {
    @apply w-[132px] h-20;
  }
  .room-list li .room-title {
    @apply text-[11px];
  }
  .room-list li.active .left-arrow {
    @apply top-[31px];
  }
  .play-btn {
    @apply w-14 h-14;
  }
  .live-title .live-cover {
    @apply w-10 h-10;
  }
  .live-title .info h4 {
    @apply text-[13px];
  }
  .hero-meta strong {
    @apply text-lg max-w-[420px];
  }
  .hero-meta {
    @apply bottom-[72px];
  }
  .inLiveRoom {
    @apply top-[42%];
  }
}

@media (max-width: 768px) {
  .living-room {
    @apply h-auto bg-[#f5f5f5] pt-[180px];
  }
  .living-room::before,
  .video-list,
  .hero-status,
  .hero-meta,
  .inLiveRoom,
  .live-title,
  .video-mask,
  .loading {
    @apply hidden;
  }
  .inner,
  .video-inner {
    @apply w-full h-auto p-0 block;
  }
  .video-box {
    @apply w-auto h-auto mx-4 border-0 rounded-[14px] shadow-none bg-transparent;
  }
  .video-player {
    @apply aspect-[16/9] rounded-[14px] overflow-hidden bg-black;
  }
  .xgplayer-container {
    @apply rounded-[14px];
  }
}
</style>
