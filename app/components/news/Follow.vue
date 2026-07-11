<template>
  <div class="news-follow">
    <div class="news-follow__divider">
      <span></span>
      <span>关注我们</span>
      <span></span>
    </div>
    <div class="news-follow__qr-list">
      <div v-for="item in items" :key="item.label" class="news-follow__qr-item">
        <div class="news-follow__qr"></div>
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [
      { label: '手机APP下载' },
      { label: '官方微博' },
      { label: '微信公众号' }
    ]
  }
})
</script>
