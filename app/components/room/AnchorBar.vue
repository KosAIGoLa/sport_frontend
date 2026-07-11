<template>
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
      <button
        type="button"
        :class="['follow-btn', { 'follow-btn--active': isFollowed }]"
        :disabled="isFollowed"
        @click="$emit('follow')"
      >
        {{ isFollowed ? t('page.followed') : t('page.follow') }}
      </button>
    </div>
  </DesktopOnly>
</template>

<script setup>
defineProps({
  roomInfo: { type: Object, required: true },
  roomId: { type: [String, Number], required: true },
  isFollowed: { type: Boolean, default: false }
})
defineEmits(['follow'])
const { t } = useI18n()
</script>
