<template>
  <section class="anchor inner">
    <div class="title-block">
      <img src="/assets/hot-zb.png" alt="热门主播">
    </div>
    <Carousel
      :items="anchors"
      :slide-width="178"
      :visible-count="7"
      :step="7"
      container-class="anchor-carousel"
      wrapper-class="anchor-swiper-container"
      slide-class="person"
    >
      <template #slide="{ item }">
        <a href="javascript:;">
          <img class="avatar" :src="item.avatar" :alt="item.name">
          <p class="ellipsis">{{ item.name }}</p>
        </a>
      </template>
    </Carousel>
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
  position: relative;
}
:deep(.carousel-slide.person) {
  height: 106px;
  padding: 0 20px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
}
:deep(.carousel-slide.person) a {
  display: block;
  text-decoration: none;
  color: #333;
}
:deep(.carousel-slide.person) .avatar {
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
:deep(.carousel-slide.person) a:hover .avatar {
  border-color: #ffc21c;
  transform: scale(1.05);
}
:deep(.carousel-slide.person) .ellipsis {
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
:deep(.carousel-btn) {
  width: 30px;
  height: 30px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 999px;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.12);
}
:deep(.carousel-btn) svg {
  width: 30px;
  height: 30px;
  color: #979797;
}
:deep(.carousel-btn:hover) svg {
  color: #f8c21b;
}
:deep(.carousel-prev) {
  left: 0;
}
:deep(.carousel-next) {
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
  :deep(.carousel-slide.person) {
    padding: 0 20px;
  }
  :deep(.carousel-slide.person) .avatar {
    width: 80px;
    height: 80px;
  }
}
</style>
