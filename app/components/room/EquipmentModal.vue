<template>
  <div v-if="visible" class="equipment-modal-overlay" @click.self="$emit('close')">
    <div class="equipment-modal">
      <div class="equipment-modal__header">
        <div class="equipment-modal__brand">
          <div class="equipment-modal__icon-box">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 13c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/></svg>
          </div>
          <div class="equipment-modal__title">
            <h3>装备包</h3>
            <p>点击即可免费使用礼物道具</p>
          </div>
        </div>
        <button type="button" class="equipment-modal__close" aria-label="关闭" @click="$emit('close')">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
      <div class="equipment-modal__body">
        <div class="equipment-grid">
          <div v-for="n in 15" :key="n" class="equipment-grid__slot"></div>
        </div>
      </div>
      <div class="equipment-modal__footer">
        <a class="equipment-modal__link" href="javascript:;">如何获取？</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false }
})
defineEmits(['close'])
</script>
