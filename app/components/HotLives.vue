<template>
  <section class="hot inner">
    <div class="hot-title">
      <span class="hot-live"><img src="/assets/hot-live.png" alt=""></span>
      <a href="/liveType.html" class="more">查看更多</a>
    </div>
    <ul class="hot-content">
      <li v-for="(live, idx) in hotLives" :key="idx">
        <a :href="live.href">
          <div class="mask"></div>
          <img class="fm live-cover" :src="live.cover" :alt="live.title">
          <div class="live-mask"></div>
          <i class="btn-open"></i>
          <div class="top-tag">
            <span class="com"><i>{{ live.tag }}</i></span>
            <div class="living">
              <img src="/assets/living.gif" alt="live">
              <span>Live</span>
            </div>
          </div>
          <h5 class="bottom-title">
            <span class="name">{{ live.anchor }}</span>
            <span class="num">
              <img src="/assets/icon-hot-white.png" alt="">
              <span>{{ live.viewers }}</span>
            </span>
          </h5>
        </a>
        <div class="card-info">
          <h4 class="ellipsis">{{ live.title }}</h4>
          <div class="card-meta">
            <span>{{ live.anchor }}</span>
            <strong>{{ live.viewers }}</strong>
          </div>
        </div>
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
  width: 1200px;
  margin: 0 auto;
}
.hot {
  margin-top: 42px;
  position: relative;
}
.hot-title {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hot-live {
  vertical-align: middle;
}
.hot-live img {
  width: 183px;
  margin-top: 2px;
}
.hot-title .more {
  margin-top: 12px;
  color: #777;
  font-size: 14px;
  font-weight: 400;
  background: url('/assets/icon-more.png') no-repeat right;
  padding-right: 13px;
  background-position: right center;
  background-size: 10px auto;
  cursor: pointer;
  text-decoration: none;
  float: right;
}
.hot-title .more:hover {
  color: #ffc71c;
  background: url('/assets/icon-more-hover.png') no-repeat right;
  background-position: right center;
  background-size: 10px auto;
}
.hot-content {
  list-style: none;
  font-size: 0;
  padding: 0;
  margin: 0;
}
.hot-content li {
  height: 236px;
  width: 285px;
  margin: 0 20px 20px 0;
  background-color: #fff;
  display: inline-block;
  border-radius: 18px;
  vertical-align: top;
  overflow: hidden;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.08);
  transition: transform 0.22s, box-shadow 0.22s;
}
.hot-content li:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 54px rgba(15, 23, 42, 0.16);
}
.hot-content li:nth-child(4n) {
  margin-right: 0;
}
.hot-content li a {
  cursor: pointer;
  width: 100%;
  height: 160px;
  position: relative;
  transition: color 0.2s ease-out;
  float: left;
  display: block;
}
.hot-content li a .mask {
  position: absolute;
  width: 100%;
  height: 160px;
  border-radius: 18px 18px 0 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0.6) 100%);
  z-index: 2;
}
.hot-content li a > img {
  display: block;
  width: 100%;
  height: 160px;
  border-radius: 18px 18px 0 0;
  object-fit: cover;
}
.hot-content li a .live-mask {
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
.hot-content li a:hover .live-mask {
  opacity: 0.4;
}
.hot-content li a .btn-open {
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
.hot-content li a:hover .btn-open {
  opacity: 1;
  transform: scale(1);
}
.top-tag {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  padding: 0;
  z-index: 5;
  pointer-events: none;
}
.top-tag::after {
  display: block;
  height: 0;
  clear: both;
  content: "";
  visibility: hidden;
}
.top-tag .com,
.top-tag .hots,
.top-tag .tag {
  float: left;
  width: 42px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
  color: #fff;
  position: relative;
}
.top-tag .com {
  background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
}
.top-tag .hots {
  background: linear-gradient(135deg, #fb7185 0%, #ef4444 100%);
}
.top-tag .tag {
  background: #f5a623;
  color: #111827;
}
.top-tag .com::after,
.top-tag .hots::after,
.top-tag .tag::after {
  content: "";
  position: absolute;
  top: 0;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 28px solid #218aff;
  border-right: 10px solid transparent;
}
.top-tag .hots::after {
  border-top-color: #f53923;
}
.top-tag .tag::after {
  border-top-color: #f5a623;
}
.top-tag .com i,
.top-tag .hots i,
.top-tag .tag i {
  position: relative;
  z-index: 1;
  display: block;
  font-size: 14px;
  font-style: normal;
  line-height: 28px;
  text-align: center;
  white-space: nowrap;
}
.living {
  float: right;
  height: 18px;
  padding: 0 4px;
  margin-right: 8px;
  line-height: 18px;
  font-size: 0;
  background: rgba(239, 68, 68, 0.92);
  border-radius: 999px;
}
.living img {
  width: 10px;
  height: 10px;
  margin-right: 4px;
  vertical-align: middle;
}
.living span {
  position: static;
  font-size: 12px;
  color: #fff;
  border-radius: 0;
  border-right: 0;
  vertical-align: top;
}
.bottom-title {
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
.bottom-title .name {
  display: block;
}
.bottom-title .num {
  float: right;
}
.bottom-title .num img {
  width: 14px;
  float: left;
  padding-top: 3px;
  padding-right: 2px;
}
.bottom-title .num span {
  display: block;
}
.hot-content li .ellipsis {
  background: #fff;
  height: 40px;
  line-height: 40px;
  font-weight: 400;
  padding: 0 14px;
  font-size: 14px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media screen and (max-width: 1400px) {
  .inner {
    width: 960px;
  }
  .hot {
    margin-top: 36px;
  }
  .hot-content li {
    height: 196px;
    width: 228px;
    margin: 0 16px 56px 0;
  }
  .hot-content li a {
    height: 128px;
  }
  .hot-content li a .mask {
    height: 100%;
  }
  .hot-content li a > img {
    height: 100%;
  }
}
</style>
