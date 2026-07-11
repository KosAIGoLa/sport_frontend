<template>
  <div v-if="visible" class="follow-modal-overlay" @click.self="$emit('close')">
    <div class="follow-modal">
      <div class="follow-modal__header">
        <span>{{ countdown }}{{ t('page.closeInSeconds') }}</span>
        <button type="button" class="follow-modal__close" aria-label="关闭" @click="$emit('close')">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>
      <div class="follow-modal__body">
        <svg class="follow-modal__icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        <span class="follow-modal__text">{{ t('page.followSuccess') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false },
  countdown: { type: Number, default: 3 }
})
defineEmits(['close'])
const { t } = useI18n()
</script>
