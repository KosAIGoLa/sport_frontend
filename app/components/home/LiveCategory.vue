<template>
  <div class="liveType-wrapper">
    <div class="section-head">
      <img class="section-title" :src="titleImage" :alt="titleAlt">
      <a class="section-more" :href="moreLink" @click.prevent="appNavigate(moreLink)">
        <span>{{ t('page.viewMore') }}</span>
        <img src="/assets/ui/more.png" alt="">
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
            <img src="/assets/ui/none.png" alt="">
          </div>
          <div class="noData-text">{{ t('common.empty') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const { appNavigate } = useAppNavigate()
const props = defineProps({
  titleImage: { type: String, default: '/assets/brand/football-live.png' },
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
  // 保证每张卡有独立 roomId，避免重复 view-transition-name 导致整页 VT 失效
  const roomId = live.roomId || live.id || (510000 + idx)
  const scheduleId = live.scheduleId || live.id || (1000000 + idx)
  if (live.href) {
    return { ...live, roomId: live.roomId || roomId }
  }
  return {
    ...live,
    roomId,
    href: `/room/${roomId}?scheduleId=${scheduleId}`
  }
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
  @apply flex items-center justify-between gap-4 min-h-[42px];
}

.section-title {
  @apply w-[132px] h-8 block shrink-0;
}

.section-more {
  @apply inline-flex items-center h-[42px] shrink-0 text-slate-500 no-underline text-sm whitespace-nowrap;
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
  @apply list-none p-0 m-0 grid grid-cols-5 gap-[18px];
}

.category-list li {
  @apply m-0 relative w-full min-w-0 h-[224px] bg-white rounded-[18px] cursor-pointer overflow-hidden shadow-[0_14px_34px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-[0.22s];
}

.category-list li:hover {
  @apply -translate-y-1.5 shadow-[0_24px_54px_rgba(15,23,42,0.16)];
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

@media screen and (max-width: 1400px) {
  .liveType-wrapper {
    @apply w-[960px];
  }

  .category-list {
    @apply grid-cols-4 gap-4;
  }
}

@media screen and (max-width: 1100px) {
  .liveType-wrapper {
    @apply w-[min(960px,calc(100%-24px))];
  }

  .category-list {
    @apply grid-cols-3;
  }
}

@media (max-width: 768px) {
  .liveType-wrapper {
    @apply w-full pt-6 px-4 pb-0;
  }

  .section-head {
    @apply min-h-0;
  }

  .section-title {
    @apply w-[116px] h-auto m-0;
  }

  .section-more {
    @apply h-auto text-[13px];
  }

  .category-tabs {
    @apply overflow-x-auto whitespace-nowrap;
  }

  .category-list {
    @apply grid grid-cols-2 gap-3.5;
  }

  .category-list li {
    @apply w-auto h-auto m-0 rounded-[14px] shadow-[0_10px_24px_rgba(15,23,42,0.08)];
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
