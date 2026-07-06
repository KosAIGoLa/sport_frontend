<template>
  <section class="hot inner">
    <div class="hot-title">
      <span class="hot-live"><img src="/assets/hot-live.png" alt=""></span>
      <a href="/liveType.html" class="more">查看更多</a>
    </div>
    <ul class="hot-content">
      <li v-for="(live, idx) in hotLives" :key="idx">
        <LiveCard variant="hot" :live="live" />
      </li>
    </ul>
  </section>
</template>

<script setup>
const hotLives = [
  { title: '🔥世欧预  丹麦  VS  乌克兰', cover: '/assets/covers/hot1.png', anchor: '初六', viewers: '5.39w', tag: '推荐', href: '/room/3150351?scheduleId=undefined' },
  { title: '瑞典超 埃尔夫斯堡VS哈马比', cover: '/assets/covers/hot2.jpg', anchor: '评述员阿虎', viewers: '9.63w', tag: '推荐', href: '/room/506605?scheduleId=undefined' },
  { title: '世欧预 英国 - 冰岛', cover: '/assets/covers/cover5.jpg', anchor: '老牛', viewers: '5.34w', tag: '推荐', href: '/room/5611355?scheduleId=undefined' },
  { title: '世欧预 英国VS冰岛', cover: '/assets/covers/cover6.png', anchor: '王天一🏀', viewers: '5.72w', tag: '推荐', href: '/room/525429?scheduleId=undefined' },
  { title: '哈萨克超 阿迪拿奥VS卡斯比阿克套', cover: '/assets/covers/cover7.png', anchor: '司马老贼', viewers: '5.24w', tag: '推荐', href: '/room/238362?scheduleId=undefined' },
  { title: '拉脱超：格洛比纳vs图库姆斯', cover: '/assets/covers/cover3.png', anchor: '都教授', viewers: '8.38w', tag: '推荐', href: '/room/896956?scheduleId=undefined' },
  { title: '（粵）瑞典超 埃尔夫斯堡 VS 哈马比', cover: '/assets/covers/cover4.png', anchor: '斯姐開啵(粵語)', viewers: '9.42w', tag: '推荐', href: '/room/724913?scheduleId=undefined' },
  { title: '〖瑞典超〗埃尔夫斯堡 ▲ 哈马比', cover: '/assets/covers/cover1.jpg', anchor: '八💥佰', viewers: '11.54w', tag: '推荐', href: '/room/308116?scheduleId=undefined' },
  { title: '【粤】世欧预 丹麦vs乌克兰', cover: '/assets/covers/main-poster-bright.png', anchor: '小新（粵語）', viewers: '5.34w', tag: '推荐', href: '/room/1573951?scheduleId=undefined' },
  { title: '一起来聊球', cover: '/assets/covers/main-poster.png', anchor: '🐶百威', viewers: '6.14w', tag: '推荐', href: '/room/239803?scheduleId=undefined' },
  { title: '一起来聊球', cover: '/assets/covers/cover2.jpg', anchor: '咖球皇帝', viewers: '6.26w', tag: '推荐', href: '/room/287671?scheduleId=undefined' },
  { title: '世亚预 叙利亚 VS 伊朗', cover: '/assets/covers/hot5.jpg', anchor: '锤哥聊球', viewers: '5.28w', tag: '推荐', href: '/room/672354?scheduleId=undefined' },
  { title: '世亚预 叙利亚 VS 伊朗', cover: '/assets/covers/cover3.png', anchor: '高圆圆', viewers: '8.57w', tag: '推荐', href: '/room/5435118?scheduleId=undefined' },
  { title: '一起来聊球', cover: '/assets/covers/cover4.png', anchor: '👊车太勤👊', viewers: '6.33w', tag: '推荐', href: '/room/491355?scheduleId=undefined' },
  { title: '世欧预 丹麦vs乌克兰', cover: '/assets/covers/cover5.jpg', anchor: '四川袍哥', viewers: '5.24w', tag: '推荐', href: '/room/568588?scheduleId=undefined' },
  { title: '拉脱超 格洛比纳 vs 图库姆斯', cover: '/assets/covers/cover6.png', anchor: '帮主', viewers: '5.23w', tag: '推荐', href: '/room/710088?scheduleId=undefined' },
  { title: '哈萨克超 阿克托比vs斯咸迪苏', cover: '/assets/covers/cover7.png', anchor: '知夏', viewers: '5.20w', tag: '推荐', href: '/room/433829?scheduleId=undefined' },
  { title: '🔥哈萨克超 阿特劳VS卡斯比阿克套🔥', cover: '/assets/covers/hot2.jpg', anchor: '伊布', viewers: '5.19w', tag: '热门', href: '/room/552917?scheduleId=undefined' },
  { title: '哈萨克超 阿克托比VS斯咸迪苏', cover: '/assets/covers/hot1.png', anchor: '乌曹指导', viewers: '5.18w', tag: '推荐', href: '/room/374391?scheduleId=undefined' },
  { title: '拉脱超 格洛比纳 VS 图库姆斯', cover: '/assets/covers/cover1.jpg', anchor: '一姐（粤语）', viewers: '5.17w', tag: '推荐', href: '/room/697889?scheduleId=undefined' },
  { title: '欧青U19 乌克兰U19 VS 意大利U19', cover: '/assets/covers/cover2.jpg', anchor: '大熊', viewers: '5.12w', tag: '推荐', href: '/room/551893?scheduleId=undefined' },
  { title: '哈萨克超 卡萨尔 VS 伊特什', cover: '/assets/covers/cover3.png', anchor: '小团团', viewers: '5.03w', tag: '推荐', href: '/room/572879?scheduleId=undefined' },
  { title: '挪甲：奥德 VS 海于格松', cover: '/assets/covers/cover4.png', anchor: '百万', viewers: '3.71w', tag: '推荐', href: '/room/534857?scheduleId=undefined' },
  { title: '挪甲 奥德 VS 海于格松', cover: '/assets/covers/cover5.jpg', anchor: '姜子牙', viewers: '3.43w', tag: '推荐', href: '/room/641755?scheduleId=undefined' },
  { title: '欧青U19 塞尔维亚U19 VS 克罗地亚U19', cover: '/assets/covers/cover6.png', anchor: '金州-拉文', viewers: '3.00w', tag: '推荐', href: '/room/774913?scheduleId=undefined' },
  { title: '清源直播间', cover: '/assets/covers/main-poster.png', anchor: '卫星小伟', viewers: '1287', tag: '推荐', href: '/room/160590?scheduleId=undefined' },
  { title: '清源直播间', cover: '/assets/covers/main-poster-bright.png', anchor: '卫星小牛', viewers: '1225', tag: '推荐', href: '/room/149340?scheduleId=undefined' },
  { title: '清源直播间', cover: '/assets/covers/hot5.jpg', anchor: '卫星小雪', viewers: '1183', tag: '推荐', href: '/room/184581?scheduleId=undefined' }
]
</script>

<style scoped>
.inner {
  @apply w-[1200px] mx-auto;
}
.hot {
  @apply mt-[42px] relative;
}
.hot-title {
  @apply mb-[18px] flex items-center justify-between;
}
.hot-live {
  @apply align-middle;
}
.hot-live img {
  @apply w-[183px] mt-0.5;
}
.hot-title .more {
  @apply mt-3 text-[#777] text-sm font-normal bg-[url('/assets/icon-more.png')_no-repeat_right_center] pr-[13px] bg-[length:10px_auto] cursor-pointer no-underline float-right;
}
.hot-title .more:hover {
  @apply text-[#ffc71c] bg-[url('/assets/icon-more-hover.png')_no-repeat_right_center] bg-[length:10px_auto];
}
.hot-content {
  @apply list-none text-[0] p-0 m-0;
}
.hot-content li {
  @apply h-[236px] w-[285px] mr-5 mb-5 bg-white inline-block rounded-[18px] align-top overflow-hidden shadow-[0_14px_36px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-[0.22s];
}
.hot-content li:hover {
  @apply -translate-y-1.5 shadow-[0_24px_54px_rgba(15,23,42,0.16)];
}
.hot-content li:nth-child(4n) {
  @apply mr-0;
}
.hot-content li :deep(.live-card) {
  @apply rounded-[18px] overflow-hidden h-full;
}

@media screen and (max-width: 1400px) {
  .inner {
    @apply w-[960px];
  }
  .hot {
    @apply mt-9;
  }
  .hot-content li {
    @apply h-[196px] w-[228px] mr-4 mb-14;
  }
}

@media (max-width: 768px) {
  .inner {
    @apply w-full;
  }

  .hot {
    @apply mt-6 px-4;
  }

  .hot-title {
    @apply mb-3.5;
  }

  .hot-live img {
    @apply w-[146px];
  }

  .hot-title .more {
    @apply hidden;
  }

  .hot-content {
    @apply grid grid-cols-2 gap-3.5;
  }

  .hot-content li,
  .hot-content li:nth-child(4n) {
    @apply w-auto h-auto m-0 rounded-[14px] shadow-[0_10px_24px_rgba(15,23,42,0.08)];
  }

  .hot-content li:hover {
    @apply transform-none shadow-[0_10px_24px_rgba(15,23,42,0.08)];
  }

  .hot-content li :deep(.live-card__cover) {
    @apply rounded-t-[14px] h-[122px];
  }

  .hot-content li :deep(.live-card__img) {
    @apply rounded-t-[14px];
  }

  .hot-content li :deep(.live-card__info) {
    @apply p-2.5 pb-3 bg-white;
  }

  .hot-content li :deep(.live-card__title) {
    @apply text-[13px] leading-[1.4] line-clamp-2 whitespace-normal;
  }

  .hot-content li :deep(.live-card__info-meta) {
    @apply mt-1.5 text-xs;
  }
}
</style>
