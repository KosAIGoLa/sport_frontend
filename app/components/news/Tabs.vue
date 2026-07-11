<template>
  <div class="news-tabs">
    <a
      v-for="tab in tabs"
      :key="tab.key"
      href="javascript:;"
      :class="{ active: modelValue === tab.key }"
      @click.prevent="$emit('update:modelValue', tab.key)"
    >
      {{ tab.label }}
    </a>
  </div>
</template>

<script setup>
defineProps({
  tabs: {
    type: Array,
    default: () => [
      { key: 'live', label: '直播' },
      { key: 'news', label: '新闻' },
      { key: 'notice', label: '公告' },
      { key: 'activity', label: '活动' }
    ]
  },
  modelValue: { type: String, default: 'news' }
})
defineEmits(['update:modelValue'])
</script>
