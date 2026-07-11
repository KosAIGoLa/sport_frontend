<template>
  <div class="contribute-panel">
    <div class="contribute-tabs">
      <button type="button" :class="{ active: tab === 'published' }" @click="$emit('update:tab', 'published')">已发布</button>
      <span class="contribute-divider">|</span>
      <button type="button" :class="{ active: tab === 'unpublished' }" @click="$emit('update:tab', 'unpublished')">未发布</button>
    </div>
    <EmptyState
      image="/assets/ui/appointment-penguin.png"
      text="您还没有上传视频，点击立即前往！"
      button-text="上传视频"
      @button-click="$emit('upload')"
    />
  </div>
</template>

<script setup>
defineProps({
  tab: { type: String, default: 'published' }
})
defineEmits(['update:tab', 'upload'])
</script>
