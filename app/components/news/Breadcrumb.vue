<template>
  <div class="news-breadcrumb">
    <span>当前位置：</span>
    <a href="/" @click.prevent="appNavigate('/')">首页</a>
    <span class="sep">-</span>
    <span>{{ current }}</span>
  </div>
</template>

<script setup>
defineProps({
  current: { type: String, default: '新闻' }
})
const { appNavigate } = useAppNavigate()
</script>
