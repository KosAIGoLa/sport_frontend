<template>
  <aside :class="['chat-room', `mobile-panel-${activeMobilePanel}`]">
    <MobileOnly tag="div" class="mobile-room-tabs">
      <div class="mobile-room-tabs__list">
        <button :class="{ active: activeMobilePanel === 'chat' }" type="button" @click="setPanel('chat')">
          {{ t('page.chat') }}
        </button>
        <button :class="{ active: activeMobilePanel === 'rank' }" type="button" @click="setPanel('rank')">
          {{ t('page.rank') }}
        </button>
        <button :class="{ active: activeMobilePanel === 'schedule' }" type="button" @click="setPanel('schedule')">
          {{ t('page.schedule') }}
        </button>
      </div>
      <button
        type="button"
        class="mobile-room-tabs__follow"
        :class="{ 'mobile-room-tabs__follow--active': isFollowed }"
        :disabled="isFollowed"
        @click="$emit('follow')"
      >
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.1 21.35l-1.1-1.02C5.14 14.9 2 12.06 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.56-3.14 6.4-8.9 11.83l-1 .92z"/></svg>
        {{ isFollowed ? t('page.followed') : t('nav.follow') }}
      </button>
    </MobileOnly>

    <div class="notice">
      <div class="notice-badge">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        {{ t('page.notice') }}
      </div>
      <span>硬核实力认证 老万值得你信赖 深度干货分析解盘，对临场数据变化极为敏锐，熟悉机构与盘口。</span>
    </div>

    <DesktopOnly tag="div" class="chat-tabs">
      <button :class="{ active: activeChatTab === 'chat' }" type="button" @click="activeChatTab = 'chat'">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        {{ t('page.chatRoom') }}
      </button>
      <button :class="{ active: activeChatTab === 'rank' }" type="button" @click="activeChatTab = 'rank'">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 21H2V9h5.5v12zm7.25-18h-5.5v18h5.5V3zM22 11h-5.5v10H22V11z"/></svg>
        {{ t('page.rank') }}
      </button>
    </DesktopOnly>

    <RoomImChat
      v-show="activeChatTab === 'chat'"
      ref="imChatRef"
      :messages="messages"
      :self-avatar="selfAvatar"
      @open-red-packet="$emit('open-red-packet', $event)"
    />

    <RoomRankList v-show="activeChatTab === 'rank'" :users="rankUsers" />

    <RoomMobileSchedule :schedules="schedules" />

    <div class="chat-toolbar">
      <button type="button" class="tool-btn">
        <img src="/assets/ui/face.png" alt="">
      </button>
      <button type="button" class="tool-btn">
        <img src="/assets/icons/icon-concern.png" alt="">
      </button>
      <button type="button" class="tool-btn announcement-btn" @click="$emit('send-announcement')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
      </button>
      <button type="button" class="tool-btn activity-btn" @click="$emit('send-activity')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
      </button>
      <button type="button" class="tool-btn redpacket-btn" @click="$emit('send-red-packet')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.18 9.54 1.85 8.35 2.29 7.11 2.75 6.25 3.88 6.05 5.2 6.02 5.43 6 5.66 6 6H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-13 5c-1.11 0-2-.89-2-2s.89-2 2-2 2 .89 2 2-.89 2-2 2zm6 7c-2.21 0-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.21-1.79 4-4 4z"/></svg>
      </button>
      <button type="button" class="tool-btn image-btn" @click="$emit('send-image')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
      </button>
      <button type="button" class="tool-btn">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
      </button>
    </div>

    <div class="chat-send">
      <div class="send-input-wrap">
        <span v-if="!isLoggedIn" class="send-login">{{ t('page.loginToChat') }}</span>
        <input type="text" :placeholder="isLoggedIn ? t('page.chatPlaceholderActive') : t('page.chatPlaceholder')">
      </div>
      <button type="button" class="send-btn">
        <img class="send-gift-icon" src="/assets/ui/gift.png" alt="">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        <span class="send-btn__label">{{ t('page.send') }}</span>
      </button>
    </div>

    <button type="button" class="gift-test-btn" @click="$emit('send-gift')">
      <img src="/assets/ui/gift.png" alt="">
      {{ t('page.testGiftEffect') }}
    </button>
  </aside>
</template>

<script setup>
const props = defineProps({
  messages: { type: Array, default: () => [] },
  rankUsers: { type: Array, default: () => [] },
  schedules: { type: Array, default: () => [] },
  selfAvatar: { type: String, default: '' },
  isLoggedIn: { type: Boolean, default: false },
  isFollowed: { type: Boolean, default: false },
  activeMobilePanel: { type: String, default: 'chat' }
})

const emit = defineEmits([
  'follow',
  'update:activeMobilePanel',
  'open-red-packet',
  'send-announcement',
  'send-activity',
  'send-red-packet',
  'send-image',
  'send-gift'
])

const { t } = useI18n()
const activeChatTab = ref('chat')
const imChatRef = ref(null)

function setPanel(panel) {
  emit('update:activeMobilePanel', panel)
  if (panel === 'chat') activeChatTab.value = 'chat'
  if (panel === 'rank') activeChatTab.value = 'rank'
}

function scrollToBottom() {
  imChatRef.value?.scrollToBottom()
}

defineExpose({ scrollToBottom })
</script>
