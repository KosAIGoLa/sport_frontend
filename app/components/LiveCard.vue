<template>
  <component :is="tag" class="live-card" :class="variantClass" :href="live.href">
    <div class="live-card__cover">
      <img class="live-card__img" :src="live.cover" :alt="live.title" :style="coverTransitionStyle">
      <div v-if="variant === 'hot'" class="live-card__gradient-mask"></div>
      <div class="live-card__hover-mask"></div>
      <i class="live-card__play"></i>
      <div class="live-card__tags">
        <span v-if="live.tag" class="live-card__tag" :class="tagClass">
          <i>{{ live.tag }}</i>
        </span>
        <div class="live-card__living">
          <img src="/assets/living.gif" alt="live">
          <span>Live</span>
        </div>
      </div>
      <div v-if="variant === 'hot'" class="live-card__bottom-title">
        <span class="live-card__anchor-name">{{ live.anchor }}</span>
        <span class="live-card__viewers">
          <img src="/assets/icon-hot-white.png" alt="">
          <span>{{ live.viewers }}</span>
        </span>
      </div>
    </div>
    <div v-if="variant === 'category'" class="live-card__body">
      <h4 class="live-card__title ellipsis">{{ live.title }}</h4>
      <h6 class="live-card__meta">
        <span class="live-card__anchor">
          <img class="live-card__avatar" :src="live.avatar" alt="">
          {{ live.anchor }}
        </span>
        <span class="live-card__viewers-count">{{ live.viewers }}</span>
      </h6>
      <div class="live-card__action">立即观看</div>
    </div>
    <div v-if="variant === 'hot'" class="live-card__info">
      <h4 class="live-card__title ellipsis">{{ live.title }}</h4>
      <div class="live-card__info-meta">
        <span>{{ live.anchor }}</span>
        <strong>{{ live.viewers }}</strong>
      </div>
    </div>
  </component>
</template>

<script setup>
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
  variant: { type: String, default: 'category' },
  tag: { type: String, default: 'a' }
})

const variantClass = computed(() => `live-card--${props.variant}`)

const roomId = computed(() => {
  const match = props.live.href?.match(/\/room\/(\d+)/)
  return match ? match[1] : ''
})

const coverTransitionStyle = computed(() => {
  return roomId.value ? { 'view-transition-name': `room-cover-${roomId.value}` } : {}
})

const tagClass = computed(() => {
  const t = props.live.tag
  if (t === '热门') return 'live-card__tag--hot'
  if (t === '推荐') return 'live-card__tag--recommend'
  return 'live-card__tag--normal'
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
  @apply block w-full h-full object-cover rounded-t-[18px];
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
  @apply opacity-0 absolute top-1/2 left-1/2 w-[44px] h-[44px] -mt-[25px] -ml-[25px] bg-[url('/assets/icon-open@2x.png')_no-repeat] bg-[length:44px_auto] scale-[2] transition-all duration-300 ease-out z-[4];
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
  @apply relative z-[1] block text-sm not-italic leading-7 text-center whitespace-nowrap;
}
.live-card__tag::after {
  @apply content-[''] absolute top-0 -right-2.5 w-0 h-0 border-t-[28px] border-r-[10px] border-transparent;
}
.live-card__tag--recommend {
  @apply bg-[linear-gradient(135deg,#38bdf8_0%,#2563eb_100%)] text-white;
}
.live-card__tag--recommend::after {
  @apply border-t-[#218aff];
}
.live-card__tag--hot {
  @apply bg-[linear-gradient(135deg,#fb7185_0%,#ef4444_100%)] text-white;
}
.live-card__tag--hot::after {
  @apply border-t-[#f53923];
}
.live-card__tag--normal {
  @apply bg-[#f5a623] text-[#111827];
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
.live-card__info .live-card__title {
  @apply bg-transparent h-10 leading-10 p-0 text-sm rounded-none;
}
.live-card__info-meta {
  @apply flex items-center justify-between text-xs text-slate-500 pb-2.5;
}
.live-card__info-meta strong {
  @apply text-red-500 font-bold;
}

.live-card__body {
  @apply bg-white;
}
.live-card__title {
  @apply m-0 h-[35px] py-2 px-3 pb-1 leading-5 bg-white font-normal text-[15px] rounded-b-[5px] text-black overflow-hidden whitespace-nowrap text-ellipsis;
}
.live-card__meta {
  @apply m-0 px-3 text-[#777] leading-[29px] font-medium text-xs;
}
.live-card__meta::after {
  @apply block h-0 clear-both content-[''] invisible;
}
.live-card__anchor {
  @apply max-w-[70%] overflow-hidden text-xs float-left text-ellipsis whitespace-nowrap;
}
.live-card__avatar {
  @apply w-5 h-[22px] rounded-full float-left pt-0.5 mr-1 object-cover;
}
.live-card__viewers-count {
  @apply bg-[url('/assets/icon-hot-gray.png')_no-repeat_0] pl-[15px] bg-[length:12px_auto] text-xs float-right text-red-500 font-extrabold;
}
.live-card__action {
  @apply mx-3 mt-0.5 h-7 rounded-full bg-slate-50 text-slate-700 text-xs font-extrabold leading-7 text-center transition-all duration-[0.22s];
}
.live-card:hover .live-card__action {
  @apply bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] text-[#111827];
}
</style>
