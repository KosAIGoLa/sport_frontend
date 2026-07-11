<template>
  <div class="follow-panel">
    <div class="follow-list">
      <div v-for="item in list" :key="item.id" class="follow-card">
        <div class="follow-card__header">
          <img class="follow-card__avatar" :src="item.avatar" :alt="item.name" @error="e => e.target.src = '/assets/avatars/avatar.png'">
          <div class="follow-card__info">
            <div class="follow-card__name">{{ item.name }}</div>
            <div class="follow-card__status">直播间（<span class="living">开播中</span>）</div>
          </div>
        </div>
        <div class="follow-card__body">
          <a :href="item.liveLink" class="follow-card__live" @click.prevent="appNavigate(item.liveLink)">
            <img class="follow-card__cover-image" :src="item.cover" :alt="item.title" @error="e => e.target.src = '/assets/banners/banner-528.jpg'">
            <span class="follow-card__badge">
              <span class="follow-card__badge-dot"></span>
              <span class="follow-card__badge-text">正在直播</span>
            </span>
            <span class="follow-card__live-meta">
              <span class="follow-card__live-viewers">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                {{ item.viewers }}
              </span>
            </span>
            <div class="follow-card__live-body">
              <div class="follow-card__live-title">{{ item.title }}</div>
              <div class="follow-card__live-footer">
                <img class="follow-card__live-avatar" :src="item.avatar" :alt="item.name" @error="e => e.target.src = '/assets/avatars/avatar.png'">
                <div class="follow-card__live-footer-meta">
                  <span class="follow-card__live-footer-name">{{ item.name }}</span>
                  <span class="follow-card__live-footer-subline">{{ item.tag }} · 直播回放</span>
                </div>
              </div>
            </div>
          </a>
          <div class="follow-card__video">
            <div class="follow-card__video-cover">
              <div class="follow-card__video-placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                <span>暂未上传</span>
              </div>
            </div>
            <div class="follow-card__video-body">
              <div class="follow-card__video-title">视频内容</div>
              <div class="follow-card__video-footer">
                <img class="follow-card__video-avatar" :src="item.avatar" :alt="item.name" @error="e => e.target.src = '/assets/avatars/avatar.png'">
                <div class="follow-card__video-footer-meta">
                  <span class="follow-card__video-footer-name">{{ item.name }}</span>
                  <span class="follow-card__video-footer-subline">暂未上传视频</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  list: { type: Array, default: () => [] }
})
const { appNavigate } = useAppNavigate()
</script>
