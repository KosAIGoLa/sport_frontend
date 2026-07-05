<template>
  <section class="anchor inner">
    <div class="title-block">
      <img src="/assets/hot-zb.png" alt="热门主播">
    </div>
    <div class="anchor-swiper-container">
      <div class="swiper-wrapper" :style="{ transform: `translateX(${-offset}px)` }">
        <div v-for="(anchor, idx) in anchors" :key="idx" class="swiper-slide person">
          <a href="javascript:;">
            <img class="avatar" :src="anchor.avatar" :alt="anchor.name">
            <p class="ellipsis">{{ anchor.name }}</p>
          </a>
        </div>
      </div>
      <button class="swiper-btn prev" @click="prev">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
      </button>
      <button class="swiper-btn next" @click="next">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
      </button>
    </div>
  </section>
</template>

<script setup>
const anchors = [
  { name: '阿信聊球', avatar: '/assets/anchors/anchor2.jpg' },
  { name: '高圆圆', avatar: '/assets/anchors/anchor3.jpg' },
  { name: '金爷（粤语）', avatar: '/assets/anchors/anchor4.jpg' },
  { name: '小鹿姐', avatar: '/assets/anchors/anchor5' },
  { name: '八💥佰', avatar: '/assets/anchors/anchor6.png' },
  { name: '稳哥', avatar: '/assets/anchors/anchor7.jpg' },
  { name: '迪哥聊球', avatar: '/assets/anchors/anchor8.jpeg' },
  { name: '评述员阿虎', avatar: '/assets/anchors/anchor9.jpg' },
  { name: '老李', avatar: '/assets/anchors/anchor1.png' },
  { name: '碧咸（粤語）', avatar: '/assets/anchors/anchor10.png' }
]

const offset = ref(0)
const visibleCount = 7
const slideWidth = 178

function prev() {
  offset.value = Math.max(0, offset.value - visibleCount * slideWidth)
}
function next() {
  const max = Math.max(0, (anchors.length - visibleCount) * slideWidth)
  offset.value = Math.min(max, offset.value + visibleCount * slideWidth)
}
</script>

<style scoped>
.inner {
  width: 1200px;
  margin: 0 auto;
}
.anchor {
  position: relative;
  margin-top: 48px;
  background: rgba(255, 255, 255, 0.9);
  height: 196px;
  border: 1px solid rgba(255, 255, 255, 0.92);
  border-radius: 24px;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(14px);
}
.title-block {
  position: absolute;
  z-index: 10;
  width: 100%;
  top: -31px;
  text-align: center;
  pointer-events: none;
}
.title-block img {
  width: 100%;
  height: auto;
  display: block;
}
.anchor-swiper-container {
  margin: 0 auto;
  border: 0;
  height: 196px;
  width: 1100px;
  padding: 48px 0 38px;
  overflow: hidden;
  position: relative;
}
.swiper-wrapper {
  display: flex;
  transition: transform 0.3s ease;
}
.swiper-slide.person {
  flex: 0 0 auto;
  width: 138px;
  height: 106px;
  padding: 0 20px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
.swiper-slide.person a {
  display: block;
  text-decoration: none;
  color: #333;
}
.swiper-slide.person .avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 5px;
  display: block;
  border: 3px solid #fff;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
  transition: all 0.2s;
}
.swiper-slide.person a:hover .avatar {
  border-color: #ffc21c;
  transform: scale(1.05);
}
.swiper-slide.person .ellipsis {
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.swiper-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  border: none;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 999px;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.12);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  padding: 0;
}
.swiper-btn svg {
  width: 30px;
  height: 30px;
  color: #979797;
}
.swiper-btn:hover svg {
  color: #f8c21b;
}
.swiper-btn.prev {
  left: 0;
}
.swiper-btn.next {
  right: 0;
}

@media screen and (max-width: 1400px) {
  .inner {
    width: 1200px;
  }
  .anchor {
    margin-top: 58px;
    height: 196px;
  }
  .title-block {
    top: -31px;
  }
  .anchor-swiper-container {
    width: 1100px;
  }
  .swiper-slide.person {
    width: 138px;
    padding: 0 20px;
  }
  .swiper-slide.person .avatar {
    width: 80px;
    height: 80px;
  }
}
</style>
