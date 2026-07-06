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
        <a href="javascript:;" @click="goRoom(item)">
          <img class="avatar" :src="item.avatar" :alt="item.name" :style="{ 'view-transition-name': `anchor-cover-${item.roomId}` }">
          <p class="ellipsis">{{ item.name }}</p>
        </a>
      </template>
    </Carousel>
  </section>
</template>

<script setup>
const anchors = [
  { name: '阿信聊球', avatar: '/assets/anchors/anchor2.jpg', roomId: '374391' },
  { name: '高圆圆', avatar: '/assets/anchors/anchor3.jpg', roomId: '5435118' },
  { name: '金爷（粤语）', avatar: '/assets/anchors/anchor4.jpg', roomId: '765648' },
  { name: '小鹿姐', avatar: '/assets/anchors/anchor5', roomId: '896956' },
  { name: '八💥佰', avatar: '/assets/anchors/anchor6.png', roomId: '308116' },
  { name: '稳哥', avatar: '/assets/anchors/anchor7.jpg', roomId: '551893' },
  { name: '迪哥聊球', avatar: '/assets/anchors/anchor8.jpeg', roomId: '774913' },
  { name: '评述员阿虎', avatar: '/assets/anchors/anchor9.jpg', roomId: '506605' },
  { name: '老李', avatar: '/assets/anchors/anchor1.png', roomId: '346346' },
  { name: '碧咸（粤語）', avatar: '/assets/anchors/anchor10.png', roomId: '1573951' }
]

function goRoom(item) {
  if (!item.roomId) return
  navigateTo(`/room/${item.roomId}?vt=anchor`)
}
</script>

<style scoped>
.inner {
  @apply w-[1200px] mx-auto;
}
.anchor {
  @apply relative mt-12 bg-white/[0.9] h-[240px] border border-white/[0.92] rounded-[24px] shadow-[0_22px_60px_rgba(15,23,42,0.1)] backdrop-blur-[14px];
}
.title-block {
  @apply absolute z-10 w-full -top-[31px] text-center pointer-events-none;
}
.title-block img {
  @apply h-auto block mx-auto max-w-full;
}
:deep(.anchor-swiper-container) {
  @apply mx-auto border-0 h-[240px] w-[1100px] pt-20 px-0 pb-[54px] relative justify-start;
}
:deep(.carousel-slide.person) {
  @apply h-[106px] px-5 text-sm text-center cursor-pointer;
}
:deep(.carousel-slide.person) a {
  @apply block no-underline text-[#333];
}
:deep(.carousel-slide.person) .avatar {
  @apply w-20 h-20 rounded-full object-cover mx-auto mb-[5px] block border-[3px] border-white shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition-all duration-200;
}
:deep(.carousel-slide.person) a:hover .avatar {
  @apply border-[#ffc21c] scale-[1.05];
}
:deep(.carousel-slide.person) .ellipsis {
  @apply text-sm overflow-hidden whitespace-nowrap text-ellipsis;
}
:deep(.carousel-btn) {
  @apply w-[30px] h-[30px] bg-white/[0.8] rounded-full shadow-[0_8px_22px_rgba(15,23,42,0.12)];
}
:deep(.carousel-btn) svg {
  @apply w-[30px] h-[30px] text-[#979797];
}
:deep(.carousel-btn:hover) svg {
  @apply text-[#f8c21b];
}
:deep(.carousel-prev) {
  @apply left-0;
}
:deep(.carousel-next) {
  @apply right-0;
}

@media screen and (max-width: 1400px) {
  .inner {
    @apply w-[1200px];
  }
  .anchor {
    @apply mt-[58px] h-[240px];
  }
  .title-block {
    @apply -top-[31px];
  }
  :deep(.anchor-swiper-container) {
    @apply w-[1100px];
  }
  :deep(.carousel-slide.person) {
    @apply px-5;
  }
  :deep(.carousel-slide.person) .avatar {
    @apply w-20 h-20;
  }
}

@media (max-width: 768px) {
  .anchor {
    @apply hidden;
  }
}
</style>
