<template>
  <div class="liveType-wrapper">
    <div class="section-head">
      <img class="section-title" :src="titleImage" :alt="titleAlt">
      <a class="section-more" :href="moreLink">
        <span>{{ t('page.viewMore') }}</span>
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
          <div class="noData-text">{{ t('common.empty') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
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
  @apply w-[1200px] mx-auto pt-9 pb-11;
}

.section-head {
  @apply h-[42px] leading-[42px];
}
.section-head::after {
  @apply content-[''] block h-0 clear-both invisible;
}

.section-title {
  @apply float-left w-[132px] h-8 mt-[5px] block;
}

.section-more {
  @apply float-right inline-flex items-center h-[42px] text-slate-500 no-underline text-base;
}

.section-more img {
  @apply w-3 h-3 ml-1 opacity-80;
}

.category-tabs {
  @apply flex items-center gap-2.5 mt-3.5;
}

.category-tabs button {
  @apply h-8 px-4 border border-slate-200 rounded-full bg-white text-slate-500 text-[13px] font-semibold cursor-pointer transition-all duration-200;
}

.category-tabs button:hover {
  @apply border-amber-400 text-amber-500;
}

.category-tabs button.active {
  @apply border-amber-400 bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_100%)] text-white shadow-[0_4px_12px_rgba(251,191,36,0.25)];
}

.category {
  @apply mt-[18px] relative;
}

.category-list {
  @apply list-none overflow-hidden p-0 m-0;
}

.category-list li {
  @apply m-0 mr-[17.5px] mb-[18px] align-top relative w-[226px] h-[224px] bg-white rounded-[18px] cursor-pointer inline-block float-left overflow-hidden shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-[0.22s];
}

.category-list li:hover {
  @apply -translate-y-1.5 shadow-[0_24px_54px_rgba(15,23,42,0.16)];
}

.category-list li:nth-child(5n) {
  @apply mr-0;
}

.category-list li :deep(.live-card) {
  @apply rounded-[18px] overflow-hidden h-full;
}

.noData {
  @apply text-center relative pt-[230px] h-[730px] rounded;
}

.noData .noData-img {
  @apply w-[300px] mx-auto;
}

.noData .noData-img img {
  @apply w-full;
}

.noData .noData-text {
  @apply h-[22px] leading-[22px] text-base text-[#b5b5b5] mt-[18px] select-none;
}

@media (max-width: 768px) {
  .liveType-wrapper {
    @apply w-full pt-6 px-4 pb-0;
  }

  .section-head {
    @apply h-auto leading-none flex items-center justify-between;
  }

  .section-title {
    @apply float-none w-[116px] h-auto m-0;
  }

  .section-more {
    @apply float-none h-auto text-[13px];
  }

  .category-tabs {
    @apply overflow-x-auto whitespace-nowrap;
  }

  .category-list {
    @apply grid grid-cols-2 gap-3.5;
  }

  .category-list li,
  .category-list li:nth-child(5n) {
    @apply w-auto h-auto m-0 float-none rounded-[14px] shadow-[0_10px_24px_rgba(15,23,42,0.08)];
  }

  .category-list li:hover {
    @apply transform-none shadow-[0_10px_24px_rgba(15,23,42,0.08)];
  }

  .category-list li :deep(.live-card__cover) {
    @apply h-[122px] rounded-t-[14px];
  }

  .category-list li :deep(.live-card__img) {
    @apply rounded-t-[14px];
  }

  .category-list li :deep(.live-card__body) {
    @apply p-2.5 pb-3;
  }

  .category-list li :deep(.live-card__title) {
    @apply text-[13px] leading-[1.4];
  }

  .category-list li :deep(.live-card__meta) {
    @apply mt-2 text-[11px];
  }

  .category-list li :deep(.live-card__action) {
    @apply h-8 leading-8 mt-2.5 text-xs;
  }
}
</style>
