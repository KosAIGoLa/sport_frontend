<template>
  <a
    class="live-card"
    :class="variantClass"
    :href="live.href || '#'"
    @pointerdown="onPointerDown"
    @click.prevent="onClick"
  >
    <div class="live-card__cover">
      <img ref="coverImgRef" class="live-card__img" :src="live.cover" :alt="live.title">
      <div v-if="variant === 'hot'" class="live-card__gradient-mask"></div>
      <div class="live-card__hover-mask"></div>
      <i class="live-card__play"></i>
      <div class="live-card__tags">
        <span v-if="live.tag" class="live-card__tag" :class="tagClass">
          <i>{{ live.tag }}</i>
        </span>
        <div class="live-card__living">
          <img src="/assets/ui/living.gif" alt="live">
          <span>Live</span>
        </div>
      </div>
      <div v-if="variant === 'hot'" class="live-card__bottom-title">
        <span class="live-card__anchor-name">{{ live.anchor }}</span>
        <span class="live-card__viewers">
          <img src="/assets/icons/icon-hot-white.png" alt="">
          <span>{{ live.viewers }}</span>
        </span>
      </div>
      <span v-if="variant === 'hot' && sport" class="live-card__sport-badge">{{ sport }}</span>
    </div>
    <div v-if="variant === 'category'" class="live-card__body">
      <h4 class="live-card__title" :class="{ 'live-card__title--has-flame': hasTitleFlame }">
        <template v-for="(tok, i) in titleTokens" :key="`c-${i}`">
          <span v-if="tok.type === 'flame'" class="live-card__title-flame" aria-hidden="true">
            <svg class="live-card__flame-svg" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient :id="`${flameGradId}-ct-${i}`" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#fde68a" />
                  <stop offset="38%" stop-color="#fb923c" />
                  <stop offset="72%" stop-color="#ef4444" />
                  <stop offset="100%" stop-color="#b91c1c" />
                </linearGradient>
              </defs>
              <path class="live-card__flame-core" :fill="`url(#${flameGradId}-ct-${i})`" d="M12.1 2.2c.4 2.2-.2 3.7-1.4 5.1-1.1 1.3-1.7 2.3-1.5 3.7.2 1.4 1.2 2.4 2.5 2.8-.9-.1-2.1.2-2.8 1.2-.9 1.2-.7 3 .5 4.1 1.3 1.2 3.4 1.5 5 .7 1.9-.9 3.1-2.9 3.1-5.1 0-3.4-2.1-5.4-3.5-7.4C12.9 5.7 12.7 4 12.1 2.2Z" />
              <path class="live-card__flame-inner" fill="#fff7ed" d="M12.2 13.1c-.5 1-.4 1.8.2 2.5.5.6 1.3.8 2 .5-.2.9-.9 1.6-1.9 1.8-1.3.3-2.6-.5-2.9-1.8-.4-1.5.5-2.7 1.6-3.6.3.2.7.4 1 .6Z" />
            </svg>
            <i class="live-card__flame-glow" />
          </span>
          <span v-else class="live-card__title-text">{{ tok.value }}</span>
        </template>
      </h4>
      <div class="live-card__meta">
        <span class="live-card__anchor">
          <img class="live-card__avatar" :src="live.avatar" alt="" loading="lazy">
          <span class="live-card__anchor-text ellipsis">{{ live.anchor }}</span>
        </span>
        <span class="live-card__viewers-count">
          <span class="live-card__flame" aria-hidden="true">
            <svg class="live-card__flame-svg" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient :id="flameGradId" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#fde68a" />
                  <stop offset="38%" stop-color="#fb923c" />
                  <stop offset="72%" stop-color="#ef4444" />
                  <stop offset="100%" stop-color="#b91c1c" />
                </linearGradient>
              </defs>
              <path
                class="live-card__flame-core"
                :fill="`url(#${flameGradId})`"
                d="M12.1 2.2c.4 2.2-.2 3.7-1.4 5.1-1.1 1.3-1.7 2.3-1.5 3.7.2 1.4 1.2 2.4 2.5 2.8-.9-.1-2.1.2-2.8 1.2-.9 1.2-.7 3 .5 4.1 1.3 1.2 3.4 1.5 5 .7 1.9-.9 3.1-2.9 3.1-5.1 0-3.4-2.1-5.4-3.5-7.4C12.9 5.7 12.7 4 12.1 2.2Z"
              />
              <path
                class="live-card__flame-inner"
                fill="#fff7ed"
                d="M12.2 13.1c-.5 1-.4 1.8.2 2.5.5.6 1.3.8 2 .5-.2.9-.9 1.6-1.9 1.8-1.3.3-2.6-.5-2.9-1.8-.4-1.5.5-2.7 1.6-3.6.3.2.7.4 1 .6Z"
              />
            </svg>
            <i class="live-card__flame-glow" />
          </span>
          <span class="live-card__viewers-num">{{ live.viewers }}</span>
        </span>
      </div>
      <div class="live-card__action">{{ t('common.enterLiveRoom') }}</div>
    </div>
    <div v-if="variant === 'hot'" class="live-card__info">
      <h4 class="live-card__title" :class="{ 'live-card__title--has-flame': hasTitleFlame }">
        <template v-for="(tok, i) in titleTokens" :key="`h-${i}`">
          <span v-if="tok.type === 'flame'" class="live-card__title-flame" aria-hidden="true">
            <svg class="live-card__flame-svg" viewBox="0 0 24 24" fill="none">
              <defs>
                <linearGradient :id="`${flameGradId}-ht-${i}`" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#fde68a" />
                  <stop offset="38%" stop-color="#fb923c" />
                  <stop offset="72%" stop-color="#ef4444" />
                  <stop offset="100%" stop-color="#b91c1c" />
                </linearGradient>
              </defs>
              <path class="live-card__flame-core" :fill="`url(#${flameGradId}-ht-${i})`" d="M12.1 2.2c.4 2.2-.2 3.7-1.4 5.1-1.1 1.3-1.7 2.3-1.5 3.7.2 1.4 1.2 2.4 2.5 2.8-.9-.1-2.1.2-2.8 1.2-.9 1.2-.7 3 .5 4.1 1.3 1.2 3.4 1.5 5 .7 1.9-.9 3.1-2.9 3.1-5.1 0-3.4-2.1-5.4-3.5-7.4C12.9 5.7 12.7 4 12.1 2.2Z" />
              <path class="live-card__flame-inner" fill="#fff7ed" d="M12.2 13.1c-.5 1-.4 1.8.2 2.5.5.6 1.3.8 2 .5-.2.9-.9 1.6-1.9 1.8-1.3.3-2.6-.5-2.9-1.8-.4-1.5.5-2.7 1.6-3.6.3.2.7.4 1 .6Z" />
            </svg>
            <i class="live-card__flame-glow" />
          </span>
          <span v-else class="live-card__title-text">{{ tok.value }}</span>
        </template>
      </h4>
      <div class="live-card__info-meta">
        <span>{{ live.anchor }}</span>
        <strong>{{ live.viewers }}</strong>
      </div>
    </div>
  </a>
</template>

<script setup>
const { t } = useI18n()
const { armRoomCover, extractRoomId, appNavigate } = useAppNavigate()

const props = defineProps({
  live: {
    type: Object,
    default: () => ({
      title: '',
      cover: '',
      tag: '',
      anchor: '',
      viewers: '',
      avatar: '',
      href: ''
    })
  },
  variant: { type: String, default: 'category' }
})

const coverImgRef = ref(null)
const variantClass = computed(() => `live-card--${props.variant}`)

const roomId = computed(() => extractRoomId(props.live.href))

/** 每张卡独立 gradient id，避免多实例/SSR 冲突 */
const flameGradId = `flame-grad-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

/** 标题里的 🔥 拆成 token，换成动画火焰；文字走 ellipsis */
const titleTokens = computed(() => {
  const raw = String(props.live.title || '')
  if (!raw) return [{ type: 'text', value: '' }]
  return raw
    .split(/(🔥)/)
    .filter((part) => part !== '')
    .map((part) => (part === '🔥' ? { type: 'flame' } : { type: 'text', value: part }))
})

const hasTitleFlame = computed(() => titleTokens.value.some((tok) => tok.type === 'flame'))

function onPointerDown() {
  armRoomCover(coverImgRef.value, roomId.value)
}

async function onClick() {
  if (!props.live.href) return
  armRoomCover(coverImgRef.value, roomId.value)
  await appNavigate(props.live.href)
}

const tagClass = computed(() => {
  const t = props.live.tag
  if (t === '热门') return 'live-card__tag--hot'
  if (t === '推荐') return 'live-card__tag--recommend'
  if (t === '足球') return 'live-card__tag--football'
  if (t === '篮球') return 'live-card__tag--basketball'
  if (t === '分析') return 'live-card__tag--analysis'
  return 'live-card__tag--normal'
})

const sport = computed(() => {
  if (props.live.sport) return props.live.sport
  const title = (props.live.title || '').toLowerCase()
  const anchor = props.live.anchor || ''
  if (title.includes('篮') || title.includes('nba') || title.includes('cba') || anchor.includes('🏀')) return '篮球'
  if (title.includes('电竞') || title.includes('电')) return '电竞'
  return '足球'
})
</script>

<style scoped>
.live-card {
  @apply block no-underline text-[#333];
}

.live-card__cover {
  @apply relative overflow-hidden rounded-t-[18px];
}
.live-card--category .live-card__cover {
  @apply h-[127px];
}
.live-card--hot .live-card__cover {
  @apply rounded-t-[18px] h-[160px];
}
.live-card__img {
  @apply block w-full h-full object-cover rounded-t-[18px] isolate;
}
.live-card__gradient-mask {
  @apply absolute w-full h-full top-0 left-0 rounded-t-[18px] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0,rgba(0,0,0,0.6)_100%)] z-[2];
}
.live-card__hover-mask {
  @apply absolute top-0 left-0 w-full h-full transition-all duration-300 ease-out opacity-0 bg-black rounded-t-md z-[3];
}
.live-card:hover .live-card__hover-mask {
  @apply opacity-40;
}
.live-card__play {
  @apply opacity-0 absolute top-1/2 left-1/2 w-[44px] h-[44px] -mt-[25px] -ml-[25px] bg-[url('/assets/icons/icon-open@2x.png')_no-repeat] bg-[length:44px_auto] scale-[2] transition-all duration-300 ease-out z-[4];
}
.live-card:hover .live-card__play {
  @apply opacity-100 scale-100;
}

.live-card__tags {
  @apply absolute w-full top-0 left-0 z-[5] pointer-events-none;
}
.live-card__tags::after {
  @apply block h-0 clear-both content-[''] invisible;
}
.live-card__tag {
  @apply float-left w-[42px] h-7 p-0 border-0 rounded-none relative;
}
.live-card__tag i {
  @apply relative z-[1] block text-[13px] font-extrabold not-italic leading-7 text-center whitespace-nowrap tracking-[0.02em];
}
.live-card__tag::after {
  @apply content-[''] absolute top-0 -right-2.5 w-0 h-0 border-t-[28px] border-r-[10px] border-transparent;
}
/* 推荐：蓝白 */
.live-card__tag--recommend {
  @apply bg-[linear-gradient(135deg,#38bdf8_0%,#2563eb_100%)] text-white;
}
.live-card__tag--recommend::after {
  @apply border-t-[#218aff];
}
/* 热门：红白 */
.live-card__tag--hot {
  @apply bg-[linear-gradient(135deg,#fb7185_0%,#ef4444_100%)] text-white;
}
.live-card__tag--hot::after {
  @apply border-t-[#f53923];
}
/* 足球：深绿底 + 白字（对比清晰） */
.live-card__tag--football {
  background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.18);
}
.live-card__tag--football::after {
  border-top-color: #15803d;
}
/* 篮球：深橙底 + 白字 */
.live-card__tag--basketball {
  background: linear-gradient(135deg, #fb923c 0%, #c2410c 100%);
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.18);
}
.live-card__tag--basketball::after {
  border-top-color: #c2410c;
}
/* 分析：靛蓝底 + 白字 */
.live-card__tag--analysis {
  background: linear-gradient(135deg, #60a5fa 0%, #1d4ed8 100%);
  color: #fff;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.18);
}
.live-card__tag--analysis::after {
  border-top-color: #1d4ed8;
}
/* 其它标签兜底 */
.live-card__tag--normal {
  @apply bg-[#f5a623] text-white;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.12);
}
.live-card__tag--normal::after {
  @apply border-t-[#f5a623];
}
.live-card__living {
  @apply float-right h-[18px] px-1 mr-2 bg-red-500/[0.92] rounded-full flex items-center gap-1;
}
.live-card__living img {
  @apply w-[10px] h-[10px];
}
.live-card__living span {
  @apply text-xs text-white;
}

.live-card__bottom-title {
  @apply font-normal absolute bottom-0 w-full h-7 leading-5 text-sm text-white px-3.5 pb-2 tracking-wide bg-[linear-gradient(180deg,rgba(0,0,0,0)_0,rgba(0,0,0,0.8)_100%)] z-[5];
}
.live-card__anchor-name {
  @apply block;
}
.live-card__viewers {
  @apply float-right;
}
.live-card__viewers img {
  @apply w-3.5 float-left pt-[3px] pr-0.5;
}
.live-card__viewers span {
  @apply block;
}
.live-card__info {
  @apply bg-white px-3.5 rounded-b-md;
}
.live-card__info-meta {
  @apply flex items-center justify-between text-xs text-slate-500 pb-2.5;
}
.live-card__info-meta strong {
  @apply text-red-500 font-bold;
}
.live-card__sport-badge {
  @apply absolute bottom-2 right-2 z-[5] px-2 py-0.5 rounded text-xs not-italic text-white bg-black/60 pointer-events-none;
}

.live-card__body {
  @apply bg-white rounded-b-[5px];
}

/* 标题：flex + ellipsis；含 🔥 时替换为火焰特效 */
.live-card__title {
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: #111827;
  font-weight: 500;
  white-space: nowrap;
}
.live-card--category .live-card__title {
  padding: 10px 12px 6px;
  font-size: 15px;
  line-height: 1.35;
}
.live-card--hot .live-card__title {
  height: 36px;
  padding: 0;
  font-size: 14px;
  line-height: 1.35;
  font-weight: 600;
}
.live-card__title-text {
  min-width: 0;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 1.35;
}
.live-card__title-flame {
  position: relative;
  flex: 0 0 auto;
  width: 15px;
  height: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 1px;
}
.live-card__title-flame .live-card__flame-svg {
  width: 15px;
  height: 15px;
  filter: drop-shadow(0 0 2px rgba(251, 146, 60, 0.7));
}
.live-card__title-flame .live-card__flame-glow {
  width: 11px;
  height: 11px;
  margin-left: -5.5px;
  bottom: 0;
}
.live-card__title--has-flame .live-card__title-text {
  /* 火焰旁标题略加重，更像「热门」 */
  font-weight: 650;
}
/* 主播 + 热度：flex 垂直居中，避免 float / 背景图错位 */
.live-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0;
  padding: 0 12px 2px;
  min-height: 28px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}
.live-card__anchor {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  max-width: 68%;
  flex: 1 1 auto;
  color: #6b7280;
  font-size: 12px;
  line-height: 1;
}
.live-card__avatar {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
  background: #f1f5f9;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.06);
}
.live-card__anchor-text {
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1.2;
  transform: translateY(0.5px);
}
.live-card__viewers-count {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  color: #ef4444;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
}
/* 火焰热度特效 */
.live-card__flame {
  position: relative;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.live-card__flame-svg {
  position: relative;
  z-index: 1;
  width: 14px;
  height: 14px;
  display: block;
  transform-origin: 50% 90%;
  animation: live-card-flame-flicker 0.9s ease-in-out infinite;
  filter: drop-shadow(0 0 2px rgba(251, 146, 60, 0.75));
}
.live-card__flame-core {
  transform-origin: 50% 90%;
  animation: live-card-flame-sway 1.2s ease-in-out infinite;
}
.live-card__flame-inner {
  opacity: 0.92;
  transform-origin: 50% 85%;
  animation: live-card-flame-inner 0.75s ease-in-out infinite;
}
.live-card__flame-glow {
  position: absolute;
  left: 50%;
  bottom: 1px;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(251, 146, 60, 0.75) 0%, rgba(239, 68, 68, 0.25) 55%, transparent 72%);
  filter: blur(1.5px);
  pointer-events: none;
  animation: live-card-flame-glow 1s ease-in-out infinite;
}
.live-card:hover .live-card__flame-svg {
  animation-duration: 0.55s;
  filter: drop-shadow(0 0 4px rgba(251, 146, 60, 0.95));
}
.live-card:hover .live-card__viewers-num {
  color: #dc2626;
}
.live-card__viewers-num {
  line-height: 1;
  transform: translateY(0.5px);
  font-variant-numeric: tabular-nums;
  background: linear-gradient(180deg, #f87171 0%, #ef4444 55%, #dc2626 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

@keyframes live-card-flame-flicker {
  0%, 100% {
    transform: scale(1) translateY(0) rotate(0deg);
  }
  25% {
    transform: scale(1.08, 1.02) translateY(-0.4px) rotate(-2deg);
  }
  50% {
    transform: scale(0.96, 1.1) translateY(-0.8px) rotate(1.5deg);
  }
  75% {
    transform: scale(1.05, 1.04) translateY(-0.3px) rotate(-1deg);
  }
}
@keyframes live-card-flame-sway {
  0%, 100% { transform: scaleX(1); }
  50% { transform: scaleX(0.92); }
}
@keyframes live-card-flame-inner {
  0%, 100% {
    opacity: 0.85;
    transform: scale(1) translateY(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.08) translateY(-0.6px);
  }
}
@keyframes live-card-flame-glow {
  0%, 100% {
    opacity: 0.55;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.25);
  }
}

@media (prefers-reduced-motion: reduce) {
  .live-card__flame-svg,
  .live-card__flame-core,
  .live-card__flame-inner,
  .live-card__flame-glow {
    animation: none !important;
  }
}
.live-card__action {
  margin: 6px 12px 10px;
  height: 28px;
  border-radius: 999px;
  background: #f8fafc;
  color: #334155;
  font-size: 12px;
  font-weight: 800;
  line-height: 28px;
  text-align: center;
  transition: all 0.22s ease;
}
.live-card:hover .live-card__action {
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  color: #111827;
}
</style>
