<template>
  <section class="living-room">
    <div class="video-inner inner">
      <div class="video-box">
        <div class="hero-status">
          <span class="live-dot"></span> 正在热播
        </div>
        <div class="hero-meta">
          <div>
            <span class="meta-label">赛事直播</span>
            <strong>{{ rooms[currentRoom].title }}</strong>
          </div>
          <span class="meta-count">{{ rooms[currentRoom].viewers }}观看</span>
        </div>
        <div class="video-player">
          <div id="hero-xgplayer" class="xgplayer-container"></div>
          <div class="video-mask"></div>
          <div v-if="isLoading" class="loading" id="videoLoading">
            <img class="imgRotate" src="/assets/loading.png" alt="">
            <img class="loading-logo" src="/assets/loading-logo.png" alt="">
            <p>加载中...</p>
          </div>
        </div>
        <div class="inLiveRoom">进入直播间</div>
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

const rooms = [
  { title: '🔥世欧预  丹麦  VS  乌克兰', cover: '/assets/covers/hot1.png', poster: '/assets/covers/main-poster-bright.png', anchor: '初六', viewers: '5.39w' },
  { title: '瑞典超 埃尔夫斯堡VS哈马比', cover: '/assets/covers/hot2.jpg', poster: '/assets/covers/hot2.jpg', anchor: '评述员阿虎', viewers: '9.63w' },
  { title: '拉脱超：格洛比纳vs图库姆斯', cover: '/assets/covers/cover3.png', poster: '/assets/covers/cover3.png', anchor: '都教授', viewers: '8.38w' },
  { title: '〖瑞典超〗埃尔夫斯堡 ▲ 哈马比', cover: '/assets/covers/cover1.jpg', poster: '/assets/covers/cover1.jpg', anchor: '八💥佰', viewers: '11.54w' },
  { title: '世亚预 叙利亚 VS 伊朗', cover: '/assets/covers/hot5.jpg', poster: '/assets/covers/hot5.jpg', anchor: '高圆圆', viewers: '8.57w' }
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
</script>

<style scoped>
.living-room {
  height: 620px;
  background:
    linear-gradient(180deg, rgba(7, 10, 28, 0.32) 0%, rgba(7, 10, 28, 0.72) 100%),
    url('/assets/banner.jpg') center/cover no-repeat;
  position: relative;
  overflow: hidden;
}
.living-room::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 18%, rgba(255, 199, 28, 0.28), transparent 26%),
    radial-gradient(circle at 82% 28%, rgba(33, 138, 255, 0.2), transparent 30%);
  pointer-events: none;
}
.inner {
  width: 1200px;
  margin: 0 auto;
}
.video-inner {
  height: 620px;
  padding-top: 92px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}
.video-box {
  width: 1015px;
  height: 507px;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-right: 0;
  border-radius: 24px 0 0 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.42);
}
.video-player {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;
}
.hero-status {
  position: absolute;
  top: 22px;
  left: 24px;
  z-index: 12;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.48);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  backdrop-filter: blur(12px);
}
.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.16);
}
.hero-meta {
  position: absolute;
  right: 24px;
  bottom: 84px;
  left: 24px;
  z-index: 12;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  color: #fff;
  pointer-events: none;
}
.hero-meta strong {
  display: block;
  max-width: 600px;
  margin-top: 8px;
  font-size: 22px;
  line-height: 1.3;
  letter-spacing: 0.2px;
  text-shadow: 0 4px 18px rgba(0, 0, 0, 0.36);
}
.meta-label,
.meta-count {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.9);
  font-size: 12px;
  font-weight: 700;
  backdrop-filter: blur(10px);
}
.meta-count {
  white-space: nowrap;
}
.xgplayer-container {
  width: 100%;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
}

.xgplayer-container video {
  object-fit: cover;
  filter: brightness(1.2) contrast(1.1);
}
.video-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.12) 42%, rgba(0, 0, 0, 0.56) 100%);
  z-index: 2;
  pointer-events: none;
  transition: background 0.3s;
}
.video-box:hover .video-mask {
  background: rgba(0, 0, 0, 0.3);
}
.play-btn {
  width: 70px;
  height: 70px;
  cursor: pointer;
  transition: transform 0.3s;
}
.play-btn:hover {
  transform: scale(1.1);
}
.play-btn img {
  width: 100%;
  height: 100%;
}
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  z-index: 5;
}
.loading .imgRotate {
  width: 50px;
  height: 50px;
  animation: rotate 1.5s linear infinite;
}
.loading-logo {
  width: 60px;
  margin-top: 10px;
}
.loading p {
  margin-top: 10px;
  font-size: 14px;
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.inLiveRoom {
  position: absolute;
  left: 50%;
  top: 44%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(255, 255, 255, 0.36);
  color: #111827;
  height: 60px;
  line-height: 60px;
  padding: 0 30px;
  border-radius: 999px;
  background: linear-gradient(135deg, #fff2a8 0%, #ffc21c 100%);
  box-shadow: 0 18px 42px rgba(248, 194, 27, 0.36);
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 13;
}
.inLiveRoom::after {
  content: '>';
  margin-left: 10px;
  font-size: 18px;
  font-weight: 800;
}
.inLiveRoom:hover {
  background: #f8c21b;
  color: #fff;
}

.live-title {
  display: none;
  position: absolute;
  left: 10px;
  bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #fff;
  z-index: 10;
  max-width: 60%;
}
.live-title .live-cover {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
  border: 2px solid rgba(255,255,255,0.3);
}
.live-title .info h4 {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.live-title .info p {
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  margin: 0;
}

.video-list {
  width: 185px;
  height: 507px;
  overflow: hidden;
  border-radius: 0 24px 24px 0;
}
.room-list {
  list-style: none;
  height: 100%;
  overflow-y: auto;
  padding: 10px 8px;
  background: rgba(7, 10, 28, 0.86);
  backdrop-filter: blur(14px);
}
.room-list::-webkit-scrollbar {
  width: 4px;
}
.room-list::-webkit-scrollbar-track {
  background: transparent;
}
.room-list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}
.room-list li {
  padding: 0 0 10px;
  position: relative;
}
.room-list li a {
  display: block;
  width: 169px;
  height: 98px;
  position: relative;
  border-radius: 14px;
  overflow: hidden;
}
.room-list li a img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}
.room-list li .room-title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 18px 8px 7px;
  font-size: 12px;
  color: #fff;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  z-index: 2;
}
.room-list li.active a::after,
.room-list li a:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid #f8c21b;
  border-radius: 6px;
  box-sizing: border-box;
  z-index: 3;
}
.room-list li.active .left-arrow {
  position: absolute;
  top: 36px;
  left: -6px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid #f8c21b;
  z-index: 4;
}

@media screen and (max-width: 1400px) {
  .inner {
    width: 960px;
  }
  .living-room {
    height: 528px;
    background-image: url('/assets/banner-528.jpg');
  }
  .video-inner {
    height: 528px;
    padding-top: 74px;
  }
  .video-box {
    width: 810px;
    height: 454px;
  }
  .video-list {
    width: 150px;
    height: 454px;
  }
  .room-list {
    width: 150px;
    padding: 10px 8px;
  }
  .room-list li a {
    width: 132px;
    height: 80px;
  }
  .room-list li .room-title {
    font-size: 11px;
  }
  .room-list li.active .left-arrow {
    top: 31px;
  }
  .play-btn {
    width: 56px;
    height: 56px;
  }
  .live-title .live-cover {
    width: 40px;
    height: 40px;
  }
  .live-title .info h4 {
    font-size: 13px;
  }
  .hero-meta strong {
    font-size: 18px;
    max-width: 420px;
  }
  .hero-meta {
    bottom: 72px;
  }
  .inLiveRoom {
    top: 42%;
  }
}

@media (max-width: 768px) {
  .living-room {
    height: auto;
    background: #f5f5f5;
    padding: 180px 0 0;
  }

  .living-room::before,
  .video-list,
  .hero-status,
  .hero-meta,
  .inLiveRoom,
  .live-title,
  .video-mask,
  .loading {
    display: none;
  }

  .inner,
  .video-inner {
    width: 100%;
    height: auto;
    padding: 0;
    display: block;
  }

  .video-box {
    width: auto;
    height: auto;
    margin: 0 16px;
    border: 0;
    border-radius: 14px;
    box-shadow: none;
    background: transparent;
  }

  .video-player {
    aspect-ratio: 16 / 9;
    border-radius: 14px;
    overflow: hidden;
    background: #000;
  }

  .xgplayer-container {
    border-radius: 14px;
  }
}
</style>
