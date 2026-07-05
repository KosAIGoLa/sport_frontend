<template>
  <div class="liveType-wrapper">
    <div class="section-head">
      <img class="section-title" :src="titleImage" :alt="titleAlt">
      <a class="section-more" :href="moreLink">
        <span>查看更多</span>
        <img src="/assets/more.png" alt="">
      </a>
    </div>
    <div v-if="showFilter" class="category-tabs">
      <button
        v-for="cat in categoryList"
        :key="cat"
        type="button"
        :class="{ active: activeCategory === cat }"
        @click="activeCategory = cat"
      >{{ cat }}</button>
    </div>
    <div class="category">
      <ul class="category-list">
        <li v-for="(live, idx) in filteredLives" :key="idx">
          <a :href="live.href || '/room/506605?scheduleId=undefined'">
            <div class="live-item">
              <img class="fm live-cover" :src="live.cover" :alt="live.title">
              <div class="live-mask"></div>
              <i class="btn-open"></i>
              <div class="top-tag">
                <span v-if="live.tag" :class="tagClass(live.tag)"><i>{{ live.tag }}</i></span>
                <div class="living">
                  <img src="/assets/living.gif" alt="live">
                  <span>Live</span>
                </div>
              </div>
            </div>
            <h4 class="ellipsis">{{ live.title }}</h4>
            <h6>
              <span class="name">
                <img class="head" :src="live.avatar" alt="">
                {{ live.anchor }}
              </span>
              <span class="num">{{ live.viewers }}</span>
            </h6>
            <div class="card-action">立即观看</div>
          </a>
        </li>
      </ul>
      <div v-if="footballLives.length === 0" class="noData">
        <div class="noData-card">
          <div class="noData-img">
            <img src="/assets/none.png" alt="">
          </div>
          <div class="noData-text">列表空空如也~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  titleImage: { type: String, default: '/assets/football-live.png' },
  titleAlt: { type: String, default: '足球直播' },
  moreLink: { type: String, default: '/liveType.html' },
  lives: { type: Array, default: () => [] },
  showFilter: { type: Boolean, default: false },
  categories: { type: Array, default: () => ['全部', '足球', '篮球', '电竞', '聊球'] }
})

const activeCategory = ref('全部')

const categoryList = computed(() => {
  const fromData = ['全部', ...new Set(props.lives.map(item => item.tag).filter(Boolean))]
  return props.categories.filter(c => c === '全部' || fromData.includes(c))
})

const footballLives = props.lives.length ? props.lives : [
  { title: '欧青U19 乌克兰U19 VS 意大利U19', cover: 'https://sta.ncctrials.com/file/common/20260627/f41c9604ab224cf5c9daeaff94356933_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20240224/100ce75e32ce79c21e3baa33db3c9220.jpg', anchor: '大熊', viewers: '5.35w', tag: '' },
  { title: '哈萨超 奥达巴斯 VS 乌利塔哲...', cover: 'https://sta.ncctrials.com/file/common/20260303/774b2c98662ad80b7ac079e3662dc605_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20260228/1d35c871f0eae83d76dc1c6c7e30e174.jpg', anchor: '蓝狐', viewers: '5.16w', tag: '推荐' },
  { title: '哈萨克超：奥达巴斯vs乌雷套', cover: 'https://sta.ncctrials.com/file/common/20250805/b38bb3088a743ba2aef1ea3df0e3a24d_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20201128/2aac51efa098872b4ddb9c1c32d9bce5', anchor: '都教授', viewers: '8.28w', tag: '推荐' },
  { title: '【粤语】欧青U19 塞尔维亚U1...', cover: 'https://sta.ncctrials.com/file/common/20250505/b81f3e7b51f21db55760ca678cf672ef_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20250430/f7e6567c08609ff8b15ac7632414746a.jpg', anchor: '阿祖讲波（粤）', viewers: '5.23w', tag: '' },
  { title: '俄乙B 沃洛格达迪纳摩VS恩尼...', cover: 'https://sta.ncctrials.com/file/common/20260509/cbed26223a5f4dedba17eab9339d2c4c_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20251116/468aac5f8b85b1e54a7809040714b36d.jpg', anchor: '老仙儿', viewers: '5.11w', tag: '' },
  { title: '哈萨克超 卡萨尔 VS 伊特什', cover: 'https://sta.ncctrials.com/file/common/20260628/22ab415fae30a1b5eb8947547e7c7608_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20231113/3c4adfe97fee0340ed5a3f6f9894569c.jpg', anchor: '小团团', viewers: '5.18w', tag: '' },
  { title: '哈萨克超 卡萨尔VS伊特什', cover: 'https://sta.ncctrials.com/file/common/20251112/0ad9a7fd9d4860c0380a068d29e284db_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20251112/7c61f9874371fec5fd7b73df63fb23e5.jpg', anchor: '大帝', viewers: '8.50w', tag: '推荐' },
  { title: '🔥爱沙甲 潭美卡VS哈留足球...', cover: 'https://sta.ncctrials.com/file/common/20230903/2e26b7c3627616ee952f2c64268762d8_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20230902/b6105a741b54f02e02fc3b707e0e45f9.jpg', anchor: '伊布', viewers: '5.17w', tag: '' },
  { title: '哈萨克超 阿克托比vs斯咸迪苏', cover: 'https://sta.ncctrials.com/file/common/20260617/05cbb9832bf92bb680f116b1627b38fd_wh320.png', avatar: 'https://sta.ncctrials.com/file/head/20260505/ec8e8b84c119776b0cd89ee656926636.png', anchor: '知夏', viewers: '5.18w', tag: '' },
  { title: '瑞典超 埃尔夫斯堡VS哈马比', cover: 'https://sta.ncctrials.com/file/common/20260705/da243db7abd0bf0d3660c1766abf1908_wh320.jpg', avatar: 'https://sta.ncctrials.com/file/head/20250529/71a82e62c66638d535883ddada1b9d7a.jpg', anchor: '评述员阿虎', viewers: '11.10w', tag: '推荐' }
]

const sourceLives = computed(() => props.lives.length ? props.lives : footballLives)

const filteredLives = computed(() => {
  if (!props.showFilter || activeCategory.value === '全部') return sourceLives.value
  return sourceLives.value.filter(item => item.tag === activeCategory.value)
})

function tagClass(tag) {
  if (tag === '热门') return 'hots'
  if (tag === '推荐') return 'com'
  return 'tag'
}

</script>

<style scoped>
.liveType-wrapper {
  width: 1200px;
  margin: 0 auto;
  padding-top: 36px;
  padding-bottom: 44px;
}

.section-head {
  height: 42px;
  line-height: 42px;
}
.section-head::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}

.section-title {
  float: left;
  width: 132px;
  height: 32px;
  margin-top: 5px;
  display: block;
}

.section-more {
  float: right;
  display: inline-flex;
  align-items: center;
  height: 42px;
  color: #64748b;
  text-decoration: none;
  font-size: 16px;
}

.section-more img {
  width: 12px;
  height: 12px;
  margin-left: 4px;
  opacity: 0.8;
}

.category-tabs {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}

.category-tabs button {
  height: 32px;
  padding: 0 16px;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  background: #fff;
  color: #64748b;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.category-tabs button:hover {
  border-color: #fbbf24;
  color: #f59e0b;
}

.category-tabs button.active {
  border-color: #fbbf24;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  color: #fff;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.25);
}

.category {
  margin-top: 18px;
  position: relative;
}

.category-list {
  list-style: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.category-list li {
  margin: 0 17.5px 18px 0;
  vertical-align: top;
  position: relative;
  width: 226px;
  height: 224px;
  background: #fff;
  border-radius: 18px;
  cursor: pointer;
  display: inline-block;
  float: left;
  overflow: hidden;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
  transition: transform 0.22s, box-shadow 0.22s;
}

.category-list li:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 54px rgba(15, 23, 42, 0.16);
}

.category-list li:nth-child(5n) {
  margin-right: 0;
}

.category-list li a {
  display: block;
  text-decoration: none;
  color: #333;
}

.live-item {
  position: relative;
  height: 127px;
  width: 100%;
  border-radius: 18px 18px 0 0;
  overflow: hidden;
}

.live-item .fm {
  display: block;
  height: 127px;
  width: 100%;
  border-radius: 18px 18px 0 0;
  object-fit: cover;
}

.live-item .btn-open {
  opacity: 0;
  position: absolute;
  top: 36%;
  left: 50%;
  width: 44px;
  height: 44px;
  margin: -25px 0 0 -25px;
  background: url('/assets/icon-open@2x.png') no-repeat;
  background-size: 44px auto;
  transform: scale(2);
  transition: all 0.25s ease-out;
  z-index: 3;
}

.category-list li:hover .btn-open {
  opacity: 1;
  transform: scale(1);
}

.live-mask {
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
  z-index: 2;
}

.category-list li:hover .live-mask {
  opacity: 0.4;
}

.top-tag {
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 4;
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

.ellipsis {
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

h6 {
  margin: 0;
  padding: 0 12px;
  color: #777;
  line-height: 29px;
  font-weight: 500;
  font-size: 12px;
}

h6::after {
  display: block;
  height: 0;
  clear: both;
  content: "";
  visibility: hidden;
}

h6 .name {
  max-width: 70%;
  overflow: hidden;
  font-size: 12px;
  float: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

h6 .name .head {
  width: 20px;
  height: 22px;
  border-radius: 50%;
  float: left;
  padding-top: 2px;
  margin-right: 4px;
  object-fit: cover;
}

h6 .num {
  background: url('/assets/icon-hot-gray.png') no-repeat 0;
  padding-left: 15px;
  background-size: 12px auto;
  font-size: 12px;
  float: right;
  color: #ef4444;
  font-weight: 800;
}
.card-action {
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
.category-list li:hover .card-action {
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  color: #111827;
}

.noData {
  text-align: center;
  position: relative;
  padding-top: 230px;
  height: 730px;
  border-radius: 4px;
}

.noData .noData-img {
  width: 300px;
  margin: 0 auto;
}

.noData .noData-img img {
  width: 100%;
}

.noData .noData-text {
  height: 22px;
  line-height: 22px;
  font-size: 16px;
  color: #b5b5b5;
  margin-top: 18px;
  user-select: none;
}
</style>
