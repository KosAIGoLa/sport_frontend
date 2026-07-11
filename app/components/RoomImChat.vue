<template>
  <div ref="listRef" class="chat-list">
    <div class="chat-topic"><span class="topic-dot"></span>{{ t('page.liveInteraction') }}</div>
    <div
      v-for="(item, idx) in messages"
      :key="item.id ?? idx"
      class="chat-msg"
      :class="{ self: item.self, [`chat-lv-${item.lv}`]: item.lv }"
    >
      <img class="msg-avatar" :src="item.self ? selfAvatar : defaultAvatar" alt="">
      <div class="msg-content">
        <div class="msg-head">
          <span class="msg-name">{{ item.name }}</span>
          <span v-if="item.name?.includes('助理') || item.assistant" class="assistant-badge">{{ t('page.assistant') }}</span>
          <span class="msg-lv" :class="`lv-${item.lv}`">{{ item.name?.includes('助理') || item.assistant ? t('page.assistant') : t('page.level') + item.lv }}</span>
          <span class="msg-time">{{ item.time || t('page.justNow') }}</span>
        </div>

        <div v-if="item.type === 'announcement'" class="announcement-card">
          <strong>{{ item.title || t('page.adminNotice') }}</strong>
          <span>{{ item.text }}</span>
        </div>
        <a v-else-if="item.type === 'activity'" class="activity-card" :href="safeLink(item.link)" target="_blank" rel="noopener noreferrer">
          <strong>{{ item.title || t('page.activity') }}</strong>
          <span>{{ item.text }}</span>
          <small>{{ item.linkText || t('page.participate') }} →</small>
        </a>
        <button v-else-if="item.type === 'redpacket'" type="button" class="redpacket-card" :class="{ opened: item.opened }" @click="emit('open-red-packet', item)">
          <strong>{{ item.text }}</strong>
          <span>{{ item.opened ? t('page.opened') : t('page.grabRedPacket') }}</span>
        </button>
        <div v-else-if="item.type === 'entry'" class="entry-card" :class="`entry-lv-${item.lv}`">
          <span>{{ entryIcon(item.lv) }}</span><strong>{{ item.name }} {{ item.text }}</strong>
        </div>
        <div v-else-if="item.type === 'image'" class="msg-image-card">
          <img :src="item.image" alt=""><span v-if="item.text">{{ item.text }}</span>
        </div>
        <div v-else class="msg-bubble">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  messages: { type: Array, default: () => [] },
  selfAvatar: { type: String, default: '' },
  defaultAvatar: { type: String, default: '/assets/avatar.png' }
})
const emit = defineEmits(['open-red-packet'])
const { t } = useI18n()
const listRef = ref(null)

function scrollToBottom() {
  nextTick(() => {
    if (listRef.value) listRef.value.scrollTop = listRef.value.scrollHeight
  })
}

function safeLink(link) {
  try {
    const url = new URL(link)
    return ['http:', 'https:'].includes(url.protocol) ? link : '#'
  } catch { return '#' }
}

function entryIcon(level) {
  return ({ 1: '🌱', 2: '🌟', 3: '💎', 4: '🚀', 5: '👑', 6: '💜', 7: '🌹', 8: '🔥' })[level] || '✨'
}

watch(() => props.messages.length, scrollToBottom)
defineExpose({ scrollToBottom })
</script>

<style scoped>
.chat-list { @apply flex-1 px-4 py-3 overflow-y-auto overflow-x-hidden bg-slate-50 scroll-smooth; }
.chat-topic { @apply inline-flex items-center gap-2 px-3.5 py-2 mb-3 rounded-full bg-[linear-gradient(135deg,#fef3c7_0%,#fde68a_100%)] text-[#92400e] text-[13px] font-bold; }
.topic-dot { @apply w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_0_5px_rgba(245,158,11,0.18)]; }
.chat-msg { @apply flex gap-2.5 mb-4 max-w-[82%]; }
.chat-msg.self { @apply flex-row-reverse ml-auto; }
.msg-avatar { @apply w-9 h-9 rounded-full object-cover border-2 border-white shadow-[0_6px_14px_rgba(15,23,42,0.1)] shrink-0 mt-1; }
.msg-content { @apply flex-1 min-w-0 flex flex-col; }
.self .msg-content { @apply items-end; }
.msg-head { @apply flex items-center gap-2 mb-1; }
.self .msg-head { @apply flex-row-reverse; }
.msg-name { @apply text-slate-900 text-[13px] font-bold; }
.msg-time { @apply text-slate-400 text-[11px]; }
.msg-lv,.assistant-badge { @apply h-[16px] px-1.5 rounded-full text-[10px] font-bold leading-4 whitespace-nowrap; }
.assistant-badge { @apply bg-violet-600 text-white; }
.msg-bubble { @apply inline-block px-3.5 py-2.5 rounded-2xl rounded-bl bg-white text-slate-700 text-sm leading-relaxed shadow-[0_4px_12px_rgba(15,23,42,0.06)] break-words; }
.self .msg-bubble { @apply rounded-bl-2xl rounded-br bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_100%)] text-white; }
.announcement-card,.activity-card { @apply flex flex-col gap-1 max-w-[280px] px-4 py-3 rounded-[14px] text-[13px]; }
.announcement-card { @apply bg-blue-50 border border-blue-200 text-blue-900; }
.activity-card { @apply bg-yellow-100 border border-yellow-300 text-yellow-900 no-underline; }
.redpacket-card { @apply flex flex-col items-start max-w-[240px] px-4 py-3 border-0 rounded-[14px] bg-[linear-gradient(135deg,#ef4444_0%,#dc2626_100%)] text-white cursor-pointer; }
.redpacket-card span { @apply text-[11px] text-white/80; }
.redpacket-card.opened { @apply opacity-60; }
.entry-card { @apply inline-flex items-center gap-2 px-4 py-2.5 rounded-[18px] bg-white border border-slate-200 text-slate-700 text-[13px]; }
.msg-image-card { @apply inline-flex flex-col max-w-[240px] p-1.5 rounded-2xl bg-white shadow-sm overflow-hidden; }
.msg-image-card img { @apply w-full max-h-[200px] object-cover rounded-xl; }
.msg-image-card span { @apply px-2.5 py-2 text-[13px] text-slate-700; }
.lv-1 { @apply bg-slate-500 text-white; } .lv-2 { @apply bg-green-500 text-white; }
.lv-3 { @apply bg-teal-500 text-white; } .lv-4 { @apply bg-blue-500 text-white; }
.lv-5 { @apply bg-sky-500 text-white; } .lv-6 { @apply bg-violet-500 text-white; }
.lv-7 { @apply bg-pink-500 text-white; } .lv-8 { @apply bg-indigo-600 text-white; }
</style>
