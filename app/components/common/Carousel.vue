<template>
  <div class="carousel" :class="containerClass">
    <button
      v-if="showNav"
      type="button"
      class="carousel-btn carousel-prev"
      :class="{ disabled: offset <= 0 }"
      @click="scrollPrev"
    >
      <slot name="prev-icon">
        <Icon path="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </slot>
    </button>
    <button
      v-if="showNav"
      type="button"
      class="carousel-btn carousel-next"
      :class="{ disabled: offset >= maxOffset }"
      @click="scrollNext"
    >
      <slot name="next-icon">
        <Icon path="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
      </slot>
    </button>
    <div class="carousel-viewport" :class="wrapperClass">
      <div class="carousel-track" :style="trackStyle">
        <div
          v-for="(item, idx) in items"
          :key="itemKey(item, idx)"
          class="carousel-slide"
          :class="slideClass"
          :style="slideStyle"
        >
          <slot name="slide" :item="item" :index="idx" />
        </div>
        <slot name="after" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, default: () => [] },
  slideWidth: { type: Number, default: 200 },
  visibleCount: { type: Number, default: 4 },
  step: { type: Number, default: null },
  showNav: { type: Boolean, default: true },
  containerClass: { type: String, default: '' },
  wrapperClass: { type: String, default: '' },
  slideClass: { type: String, default: '' },
  gap: { type: Number, default: 0 },
  keyProp: { type: String, default: '' }
})

const emit = defineEmits(['prev', 'next'])
const slots = useSlots()

const offset = ref(0)
const stepSize = computed(() => props.step ?? props.visibleCount)

const hasAfterSlot = computed(() => !!slots.after)
const slideCount = computed(() => props.items.length + (hasAfterSlot.value ? 1 : 0))

const maxOffset = computed(() => {
  return Math.max(0, props.slideWidth * (slideCount.value - props.visibleCount))
})

const trackStyle = computed(() => ({
  transform: `translateX(${-offset.value}px)`,
  gap: props.gap ? `${props.gap}px` : undefined
}))

const slideStyle = computed(() => ({
  flex: '0 0 auto',
  width: `${props.slideWidth}px`
}))

function itemKey(item, idx) {
  if (props.keyProp && item[props.keyProp]) return item[props.keyProp]
  return idx
}

function scrollPrev() {
  offset.value = Math.max(0, offset.value - stepSize.value * props.slideWidth)
  emit('prev', offset.value)
}

function scrollNext() {
  offset.value = Math.min(maxOffset.value, offset.value + stepSize.value * props.slideWidth)
  emit('next', offset.value)
}

function reset() {
  offset.value = 0
}

defineExpose({ reset, scrollPrev, scrollNext, offset, maxOffset })
</script>

<style scoped>
.anchor {
  margin: 10px;
}
.carousel {
  @apply relative;
}
.carousel-viewport {
  @apply overflow-hidden flex items-center justify-center;
}
.carousel-track {
  @apply flex transition-transform duration-300 ease-in-out;
}
.carousel-btn {
  @apply absolute top-1/2 transform -translate-y-1/2 z-10 w-[34px] h-[34px] border-0 rounded-full bg-white text-slate-900 shadow-[0_4px_14px_rgba(15,23,42,0.12)] cursor-pointer inline-flex items-center justify-center transition-all duration-200 p-0;
}
.carousel-btn svg {
  @apply w-5 h-5;
}
.carousel-btn:hover {
  @apply bg-amber-500 text-white;
}
.carousel-btn.disabled {
  @apply opacity-0 pointer-events-none transform -translate-y-1/2 scale-90;
}
.carousel-prev {
  @apply left-3;
}
.carousel-next {
  @apply right-3;
}
</style>
