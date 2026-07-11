<template>
  <DesktopOnly tag="section" class="video-section">
    <h2>{{ t('page.videoRecommend') }}</h2>
    <ul class="recommend-video-list">
      <li v-for="live in lives" :key="live.title">
        <a
          :href="live.href"
          @pointerdown="armCoverVt($event, live.href)"
          @click.prevent="goLive(live.href)"
        >
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
</template>

<script setup>
defineProps({
  lives: { type: Array, default: () => [] }
})
const { t } = useI18n()
const { armRoomCover, extractRoomId, appNavigate } = useAppNavigate()

function armCoverVt(event, href = '') {
  const roomId = extractRoomId(href)
  const img = event.currentTarget?.querySelector?.('.video-cover img')
  armRoomCover(img, roomId)
}

async function goLive(href) {
  await appNavigate(href)
}
</script>
