<template>
  <div class="history-panel">
    <div class="history-toolbar">
      <label class="history-filter">
        <input :checked="onlyLive" type="checkbox" @change="$emit('update:onlyLive', $event.target.checked)">
        <span>只看直播</span>
      </label>
      <span class="history-count">共 {{ items.length }} 条</span>
    </div>
    <div v-if="items.length" class="history-grid">
      <a
        v-for="item in items"
        :key="item.id"
        :href="item.link"
        class="history-card"
        @click.prevent="appNavigate(item.link)"
      >
        <div class="history-card__cover">
          <img class="history-card__image" :src="item.cover" :alt="item.title" @error="onCoverError">
          <span v-if="item.isLive" class="history-card__badge">
            <span class="history-card__badge-bg"></span>
            <span class="history-card__badge-text">正在直播</span>
          </span>
          <div class="history-card__cover-meta">
            <span class="history-card__cover-author">{{ item.author }}</span>
            <span class="history-card__cover-viewers">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
              {{ item.viewers }}
            </span>
          </div>
        </div>
        <div class="history-card__body">
          <div class="history-card__title">{{ item.title }}</div>
          <div class="history-card__footer">
            <img class="history-card__avatar" :src="item.avatar" :alt="item.author" @error="onAvatarError">
            <div class="history-card__meta">
              <span class="history-card__author">{{ item.author }}</span>
              <span class="history-card__subline">直播回放 · 最近观看</span>
            </div>
          </div>
        </div>
      </a>
    </div>
    <EmptyState v-else image="/assets/ui/appointment-penguin.png" text="暂无观看历史" />
  </div>
</template>

<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  onlyLive: { type: Boolean, default: false }
})

defineEmits(['update:onlyLive'])
const { appNavigate } = useAppNavigate()

function onCoverError(event) {
  event.target.src = '/assets/banners/banner-528.jpg'
}

function onAvatarError(event) {
  event.target.src = '/assets/avatars/avatar.png'
}
</script>

<style scoped>
.history-panel {
  @apply bg-white px-8 pt-6 pb-8;
}
.history-toolbar {
  @apply flex items-center justify-between mb-4;
}
.history-filter {
  @apply flex items-center gap-2 text-[14px] text-[#666] cursor-pointer select-none;
}
.history-filter input {
  @apply w-4 h-4 accent-[#ff4d4f] cursor-pointer;
}
.history-count {
  @apply text-[12px] text-[#9ca3af];
}
.history-grid {
  @apply grid grid-cols-3 gap-5;
}
.history-card {
  @apply block relative w-full min-w-0 bg-white border border-[#efefef] rounded-[12px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)];
}
.history-card__cover {
  @apply relative aspect-video bg-slate-100 overflow-hidden;
}
.history-card__image {
  @apply w-full h-full object-cover;
}
.history-card__cover::after {
  @apply content-[''] absolute left-0 right-0 bottom-0 h-20;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
}
.history-card__badge {
  @apply absolute right-3 top-3 z-10 flex h-7 items-center gap-1.5 rounded-full px-2.5 pointer-events-none;
  background: rgba(15, 23, 42, 0.72);
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.18);
}
.history-card__badge-bg {
  @apply block h-2.5 w-2.5 rounded-full shrink-0;
  background: radial-gradient(circle at 35% 35%, #ffb2aa 0%, #ff6a5d 45%, #ff4d3f 100%);
  box-shadow: 0 0 0 3px rgba(255, 92, 76, 0.18), 0 0 12px rgba(255, 92, 76, 0.45);
  animation: history-live-pulse 1.8s ease-out infinite;
}
.history-card__badge-text {
  @apply relative text-[12px] leading-none text-white font-medium whitespace-nowrap;
}
.history-card__cover-meta {
  @apply absolute left-0 right-0 bottom-0 z-10 flex items-center justify-between px-5 pb-4 text-white;
}
.history-card__cover-author {
  @apply max-w-[240px] truncate text-[13px] font-medium;
}
.history-card__cover-viewers {
  @apply flex shrink-0 items-center gap-1 text-[12px] text-white/90;
}
.history-card__cover-viewers svg {
  @apply h-3.5 w-3.5;
}
.history-card__body {
  @apply px-5 pt-3 pb-4;
}
.history-card__title {
  @apply text-[15px] leading-[23px] font-semibold text-[#2f3440];
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 46px;
}
.history-card__footer {
  @apply flex items-center gap-3 pt-3;
}
.history-card__avatar {
  @apply w-9 h-9 rounded-full object-cover ring-1 ring-[#f1f1f1];
}
.history-card__meta {
  @apply flex min-w-0 flex-1 flex-col;
}
.history-card__author {
  @apply truncate text-[13px] text-[#5b6472];
}
.history-card__subline {
  @apply mt-0.5 text-[11px] text-[#9ca3af];
}

@keyframes history-live-pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 92, 76, 0.28), 0 0 10px rgba(255, 92, 76, 0.35);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 6px rgba(255, 92, 76, 0), 0 0 16px rgba(255, 92, 76, 0.5);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 92, 76, 0), 0 0 10px rgba(255, 92, 76, 0.35);
  }
}

@media (max-width: 768px) {
  .history-panel {
    @apply px-4 pt-4 pb-5 bg-white;
  }
  .history-toolbar {
    @apply mb-3;
  }
  .history-grid {
    @apply grid-cols-1 gap-4;
  }
  .history-card__body {
    @apply px-4 pt-3 pb-4;
  }
}
</style>
