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
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
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
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
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

const offset = ref(0)
const stepSize = computed(() => props.step ?? props.visibleCount)

const slideCount = computed(() => props.items.length + 1)

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

defineExpose({ reset, scrollPrev, scrollNext })
</script>

<style scoped>
.carousel {
  position: relative;
}
.carousel-viewport {
  overflow: hidden;
}
.carousel-track {
  display: flex;
  transition: transform 0.3s ease;
}
.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: #fff;
  color: #0f172a;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.12);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}
.carousel-btn svg {
  width: 20px;
  height: 20px;
}
.carousel-btn:hover {
  background: #f59e0b;
  color: #fff;
}
.carousel-btn.disabled {
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%) scale(0.9);
}
.carousel-prev {
  left: 12px;
}
.carousel-next {
  right: 12px;
}
</style>
