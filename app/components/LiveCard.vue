<template>
  <component :is="tag" class="live-card" :class="variantClass" :href="live.href">
    <div class="live-card__cover">
      <img class="live-card__img" :src="live.cover" :alt="live.title">
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

const tagClass = computed(() => {
  const t = props.live.tag
  if (t === '热门') return 'live-card__tag--hot'
  if (t === '推荐') return 'live-card__tag--recommend'
  return 'live-card__tag--normal'
})
</script>

<style scoped>
.live-card {
  display: block;
  text-decoration: none;
  color: #333;
}

/* Cover area */
.live-card__cover {
  position: relative;
  overflow: hidden;
  border-radius: 18px 18px 0 0;
}
.live-card--category .live-card__cover {
  height: 127px;
}
.live-card--hot .live-card__cover {
  border-radius: 18px 18px 0 0;
  height: 160px;
}
.live-card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 18px 18px 0 0;
}
.live-card__gradient-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 18px 18px 0 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0.6) 100%);
  z-index: 2;
}
.live-card__hover-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-out;
  opacity: 0;
  background: #000;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  z-index: 3;
}
.live-card:hover .live-card__hover-mask {
  opacity: 0.4;
}
.live-card__play {
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 44px;
  height: 44px;
  margin: -25px 0 0 -25px;
  background: url('/assets/icon-open@2x.png') no-repeat;
  background-size: 44px auto;
  transform: scale(2);
  transition: all 0.25s ease-out;
  z-index: 4;
}
.live-card:hover .live-card__play {
  opacity: 1;
  transform: scale(1);
}

/* Tags */
.live-card__tags {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
}
.live-card__tags::after {
  display: block;
  height: 0;
  clear: both;
  content: "";
  visibility: hidden;
}
.live-card__tag {
  float: left;
  width: 42px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 0;
  position: relative;
}
.live-card__tag i {
  position: relative;
  z-index: 1;
  display: block;
  font-size: 14px;
  font-style: normal;
  line-height: 28px;
  text-align: center;
  white-space: nowrap;
}
.live-card__tag::after {
  content: "";
  position: absolute;
  top: 0;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 28px solid transparent;
  border-right: 10px solid transparent;
}
.live-card__tag--recommend {
  background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
  color: #fff;
}
.live-card__tag--recommend::after {
  border-top-color: #218aff;
}
.live-card__tag--hot {
  background: linear-gradient(135deg, #fb7185 0%, #ef4444 100%);
  color: #fff;
}
.live-card__tag--hot::after {
  border-top-color: #f53923;
}
.live-card__tag--normal {
  background: #f5a623;
  color: #111827;
}
.live-card__tag--normal::after {
  border-top-color: #f5a623;
}
.live-card__living {
  float: right;
  height: 18px;
  padding: 0 4px;
  margin-right: 8px;
  line-height: 18px;
  font-size: 0;
  background: rgba(239, 68, 68, 0.92);
  border-radius: 999px;
}
.live-card__living img {
  width: 10px;
  height: 10px;
  margin-right: 4px;
  vertical-align: middle;
}
.live-card__living span {
  position: static;
  font-size: 12px;
  color: #fff;
  border-radius: 0;
  border-right: 0;
  vertical-align: top;
}

/* Hot variant */
.live-card__bottom-title {
  font-weight: 400;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 28px;
  line-height: 20px;
  font-size: 14px;
  color: #fff;
  padding: 0 14px 8px;
  letter-spacing: 1px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0.8) 100%);
  z-index: 5;
}
.live-card__anchor-name {
  display: block;
}
.live-card__viewers {
  float: right;
}
.live-card__viewers img {
  width: 14px;
  float: left;
  padding-top: 3px;
  padding-right: 2px;
}
.live-card__viewers span {
  display: block;
}
.live-card__info {
  background: #fff;
  padding: 0 14px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.live-card__info .live-card__title {
  background: transparent;
  height: 40px;
  line-height: 40px;
  padding: 0;
  font-size: 14px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.live-card__info-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: #64748b;
  padding-bottom: 10px;
}
.live-card__info-meta strong {
  color: #ef4444;
  font-weight: 700;
}

/* Category variant */
.live-card__body {
  background: #fff;
}
.live-card__title {
  margin: 0;
  height: 35px;
  padding: 9px 12px 4px;
  line-height: 20px;
  background: #fff;
  font-weight: 400;
  font-size: 15px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.live-card__meta {
  margin: 0;
  padding: 0 12px;
  color: #777;
  line-height: 29px;
  font-weight: 500;
  font-size: 12px;
}
.live-card__meta::after {
  display: block;
  height: 0;
  clear: both;
  content: "";
  visibility: hidden;
}
.live-card__anchor {
  max-width: 70%;
  overflow: hidden;
  font-size: 12px;
  float: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.live-card__avatar {
  width: 20px;
  height: 22px;
  border-radius: 50%;
  float: left;
  padding-top: 2px;
  margin-right: 4px;
  object-fit: cover;
}
.live-card__viewers-count {
  background: url('/assets/icon-hot-gray.png') no-repeat 0;
  padding-left: 15px;
  background-size: 12px auto;
  font-size: 12px;
  float: right;
  color: #ef4444;
  font-weight: 800;
}
.live-card__action {
  margin: 2px 12px 0;
  height: 28px;
  border-radius: 999px;
  background: #f8fafc;
  color: #334155;
  font-size: 12px;
  font-weight: 800;
  line-height: 28px;
  text-align: center;
  transition: all 0.22s;
}
.live-card:hover .live-card__action {
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  color: #111827;
}
</style>
