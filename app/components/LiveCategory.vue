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
        <li v-for="(live, idx) in displayLives" :key="idx">
          <LiveCard :live="live" variant="category" />
        </li>
      </ul>
      <div v-if="filteredLives.length === 0" class="noData">
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
  categories: { type: Array, default: () => ['全部', '足球', '篮球', '电竞', '聊球'] },
  initialCategory: { type: String, default: '全部' }
})

const activeCategory = ref(props.initialCategory || '全部')

const lives = computed(() => props.lives || [])

const categoryList = computed(() => {
  const fromData = ['全部', ...new Set(lives.value.map(item => item.tag).filter(Boolean))]
  return props.categories.filter(c => c === '全部' || fromData.includes(c))
})

const filteredLives = computed(() => {
  if (!props.showFilter || activeCategory.value === '全部') return lives.value
  return lives.value.filter(item => item.tag === activeCategory.value)
})

const displayLives = computed(() => filteredLives.value.map((live, idx) => {
  if (live.href) return live
  const roomId = live.roomId || 990645
  const scheduleId = live.id || (1000000 + idx)
  return { ...live, href: `/room/${roomId}?scheduleId=${scheduleId}` }
}))

watch(() => props.initialCategory, (val) => {
  activeCategory.value = val || '全部'
})
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

.category-list li :deep(.live-card) {
  border-radius: 18px;
  overflow: hidden;
  height: 100%;
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

@media (max-width: 768px) {
  .liveType-wrapper {
    width: 100%;
    padding: 24px 16px 0;
  }

  .section-head {
    height: auto;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .section-title {
    float: none;
    width: 116px;
    height: auto;
    margin: 0;
  }

  .section-more {
    float: none;
    height: auto;
    font-size: 13px;
  }

  .category-tabs {
    overflow-x: auto;
    white-space: nowrap;
  }

  .category-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .category-list li,
  .category-list li:nth-child(5n) {
    width: auto;
    height: auto;
    margin: 0;
    float: none;
    border-radius: 14px;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  }

  .category-list li:hover {
    transform: none;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
  }

  .category-list li :deep(.live-card__cover) {
    height: 122px;
    border-radius: 14px 14px 0 0;
  }

  .category-list li :deep(.live-card__img) {
    border-radius: 14px 14px 0 0;
  }

  .category-list li :deep(.live-card__body) {
    padding: 10px 10px 12px;
  }

  .category-list li :deep(.live-card__title) {
    font-size: 13px;
    line-height: 1.4;
  }

  .category-list li :deep(.live-card__meta) {
    margin-top: 8px;
    font-size: 11px;
  }

  .category-list li :deep(.live-card__action) {
    height: 32px;
    line-height: 32px;
    margin-top: 10px;
    font-size: 12px;
  }
}
</style>
