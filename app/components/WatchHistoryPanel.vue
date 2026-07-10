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
    <EmptyState v-else image="/assets/appointment-penguin.png" text="暂无观看历史" />
  </div>
</template>

<script setup>
import EmptyState from './EmptyState.vue'

defineProps({
  items: { type: Array, default: () => [] },
  onlyLive: { type: Boolean, default: false }
})

defineEmits(['update:onlyLive'])

function onCoverError(event) {
  event.target.src = '/assets/banner-528.jpg'
}

function onAvatarError(event) {
  event.target.src = '/assets/avatar.png'
}
</script>
