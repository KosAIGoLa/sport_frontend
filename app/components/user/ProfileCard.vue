<template>
  <div class="user-profile-card">
    <div class="user-profile-left">
      <img
        class="user-profile-avatar"
        :src="avatar"
        alt="avatar"
        @error="e => e.target.src = '/assets/avatars/frog-avatar.png'"
      >
      <div class="user-info">
        <div class="user-name-row">
          <h1 class="user-name">{{ nickname }}</h1>
          <svg class="edit-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
        </div>
        <div class="user-level-row">
          <span class="level-badge">LV1</span>
          <div class="level-track">
            <div class="level-fill" style="width: 0.5%"></div>
          </div>
          <a class="level-rule" href="javascript:;">查看等级规则</a>
        </div>
        <div class="user-assets-row">
          <span class="asset">
            <IconLiver icon-class="asset-icon liver" />
            鹅肝：0.00
          </span>
          <span class="asset">
            <IconEgg icon-class="asset-icon egg" />
            鹅蛋：0
          </span>
          <a class="recharge-btn" href="/recharge.html" @click.prevent="appNavigate('/recharge.html')">充值</a>
        </div>
        <div class="user-links-row">
          <a href="javascript:;" @click="$emit('go', 'upload')">上传视频</a>
          <span class="sep">|</span>
          <a href="javascript:;" @click="$emit('go', 'space')">我的视频空间</a>
        </div>
      </div>
    </div>
    <button class="go-live-btn" type="button">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
      我要直播
    </button>
  </div>
</template>

<script setup>
defineProps({
  nickname: { type: String, default: '企鹅玩家Kc2hI9' },
  avatar: { type: String, default: 'https://uc2.qiecdn.com/avatar.php?uid=28030520&size=middle&force=1' }
})
defineEmits(['go'])
const { appNavigate } = useAppNavigate()
</script>
