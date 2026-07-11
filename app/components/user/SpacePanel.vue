<template>
  <div class="space-panel">
    <div class="space-header">
      <img class="space-avatar" :src="avatar" alt="avatar">
      <div class="space-header__info">
        <h2 class="space-name">{{ nickname }}</h2>
        <div class="space-stats">
          <span>视频：<em>{{ stats.videos }}</em></span>
          <span>播放数：<em>{{ stats.plays }}</em></span>
          <span>粉丝：<em>{{ stats.fans }}</em></span>
          <a class="space-share" href="javascript:;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A3 3 0 1 0 12 6a3 3 0 1 0-6 5v1"/><path d="M12 6v13"/><path d="M18 14v3"/></svg>
            分享
          </a>
        </div>
      </div>
    </div>
    <div class="space-tabs">
      <button type="button" :class="{ active: sort === 'latest' }" @click="$emit('update:sort', 'latest')">最新</button>
      <button type="button" :class="{ active: sort === 'hottest' }" @click="$emit('update:sort', 'hottest')">最热</button>
    </div>
    <div class="space-body">
      <div class="space-empty">
        <img src="/assets/ui/appointment-penguin.png" alt="empty">
        <span>--暂无视频--</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nickname: { type: String, default: '企鹅玩家Kc2hI9' },
  avatar: { type: String, default: '/assets/avatars/frog-avatar.png' },
  stats: { type: Object, default: () => ({ videos: 0, plays: 0, fans: 0 }) },
  sort: { type: String, default: 'latest' }
})
defineEmits(['update:sort'])
</script>
