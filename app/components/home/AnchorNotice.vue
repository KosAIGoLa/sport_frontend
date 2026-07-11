<template>
  <section class="anchor-notice" aria-label="主播公告">
    <div class="anchor-notice__inner">
      <div class="anchor-notice__label">
        <span class="anchor-notice__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 10v4c0 .55.45 1 1 1h3l4.3 3.44c.6.48 1.5.05 1.5-.72V6.28c0-.77-.9-1.2-1.5-.72L7 9H4c-.55 0-1 .45-1 1z"/>
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
        </span>
        <strong>{{ t('page.anchorNotice') }}</strong>
      </div>

      <div
        class="anchor-notice__marquee"
        :class="{ 'is-paused': paused }"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
      >
        <div class="anchor-notice__rail" :style="{ animationDuration: duration }">
          <!-- 复制两份实现无缝循环 -->
          <div
            v-for="copy in 2"
            :key="copy"
            class="anchor-notice__group"
            :aria-hidden="copy === 2 ? 'true' : undefined"
          >
            <span
              v-for="(item, idx) in list"
              :key="`${copy}-${idx}`"
              class="anchor-notice__item"
            >
              <span v-if="item.anchor" class="anchor-notice__name">{{ item.anchor }}</span>
              {{ item.text }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  /** 整段滚动一圈的秒数，内容越多可自行加大 */
  speed: {
    type: Number,
    default: 28
  }
})

const { t } = useI18n()
const paused = ref(false)

const list = computed(() => (
  props.items.length
    ? props.items
    : [
        { anchor: '初六', text: '今晚世欧预焦点战开讲，进房领红包关注不迷路。' },
        { anchor: '评述员阿虎', text: '瑞典超临场分析已更新，关键数据变化第一时间同步。' },
        { anchor: '都教授', text: '拉脱超深度解盘上线，文明发言禁止广告与违规内容。' },
        { anchor: '八💥佰', text: '本场趣猜玩法已开启，参与互动有机会赢鹅蛋奖励。' },
        { anchor: '高圆圆', text: '世亚预叙利亚 vs 伊朗，欢迎加入聊天室一起看球。' }
      ]
))

const duration = computed(() => `${Math.max(12, props.speed)}s`)
</script>

<style scoped>
.anchor-notice {
  @apply relative z-[1] w-full;
}
.anchor-notice__inner {
  @apply w-[1200px] mx-auto h-11 mt-3 mb-1 px-3.5
    flex items-center gap-3
    rounded-xl border border-[rgba(243,182,31,0.28)]
    bg-[linear-gradient(90deg,rgba(255,248,220,0.95)_0%,rgba(255,255,255,0.96)_42%,rgba(255,255,255,0.96)_100%)]
    shadow-[0_8px_22px_rgba(15,23,42,0.05)];
}
.anchor-notice__label {
  @apply shrink-0 inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full
    bg-[linear-gradient(135deg,#f7ca4b_0%,#f3b61f_100%)]
    text-[#3d2e08] text-[13px] font-extrabold
    shadow-[0_4px_10px_rgba(243,182,31,0.28)];
}
.anchor-notice__icon {
  @apply inline-flex items-center justify-center w-4 h-4 text-[#3d2e08];
}
.anchor-notice__icon svg {
  @apply w-4 h-4 block;
}

.anchor-notice__marquee {
  @apply relative flex-1 min-w-0 h-7 overflow-hidden;
  mask-image: linear-gradient(90deg, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%);
  -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 12px, #000 calc(100% - 12px), transparent 100%);
}
.anchor-notice__rail {
  @apply inline-flex w-max h-7 items-center;
  animation-name: anchor-notice-marquee;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.anchor-notice__marquee.is-paused .anchor-notice__rail {
  animation-play-state: paused;
}
.anchor-notice__group {
  @apply inline-flex items-center h-7 shrink-0;
}
.anchor-notice__item {
  @apply inline-flex items-center h-7 px-5 text-[13px] text-slate-700 font-medium whitespace-nowrap;
}
.anchor-notice__item + .anchor-notice__item::before {
  content: '•';
  @apply mr-5 text-[#f3b61f] font-extrabold;
}
.anchor-notice__name {
  @apply mr-1.5 text-[#c48a0a] font-extrabold;
}

@keyframes anchor-notice-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@media screen and (max-width: 1400px) {
  .anchor-notice__inner {
    @apply w-[960px];
  }
}

@media (max-width: 768px) {
  .anchor-notice {
    @apply px-4 mt-0;
  }
  .anchor-notice__inner {
    @apply w-full h-10 mt-3 mb-0 px-2.5 rounded-lg;
  }
  .anchor-notice__label {
    @apply h-6 px-2 text-xs;
  }
  .anchor-notice__icon,
  .anchor-notice__icon svg {
    @apply w-3.5 h-3.5;
  }
  .anchor-notice__marquee,
  .anchor-notice__rail,
  .anchor-notice__group,
  .anchor-notice__item {
    @apply h-6;
  }
  .anchor-notice__item {
    @apply text-xs px-3.5;
  }
  .anchor-notice__item + .anchor-notice__item::before {
    @apply mr-3.5;
  }
}
</style>
