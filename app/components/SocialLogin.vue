<template>
  <div class="social-login" :class="{ compact }">
    <div class="social-divider"><span>{{ label }}</span></div>
    <div class="social-buttons">
      <button type="button" class="social-btn wechat" @click="emit('wechat')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.41C7.36 15.89 8.15 16 9 16c.18 0 .35 0 .53-.02C9.28 15.4 9.13 14.71 9.13 14c0-3.31 3.13-6 7-6 .56 0 1.1.06 1.62.17C16.95 5.9 13.66 4 9.5 4zm-2.5 5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 5c-3.04 0-5.5 2.06-5.5 4.6 0 2.54 2.46 4.6 5.5 4.6.71 0 1.39-.11 2.02-.31L20.5 23l-.59-1.99C20.95 19.78 22 18.5 22 17c0-2.54-2.46-4.6-5.5-4.6zm-2.5 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/></svg>
        微信
      </button>
      <button type="button" class="social-btn qq" @click="emit('qq')">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5c-1.46 0-2.79-.55-3.78-1.44.17-.85.62-1.65 1.27-2.25-.38-.07-.74-.21-1.07-.42-.31 1.08-.04 2.23.72 3.05-.86.52-1.92.82-3.05.82-.34 0-.67-.03-1-.09.72 1.28 2.08 2.16 3.64 2.16.85 0 1.65-.25 2.33-.69.34.06.69.09 1.04.09 2.21 0 4-1.79 4-4 0-.18-.02-.35-.05-.52.67-.36 1.22-.91 1.55-1.58-.6.27-1.25.42-1.93.42-.23 0-.45-.02-.67-.06.33-.59.52-1.27.52-2 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 .73.19 1.41.52 2-.22.04-.44.06-.67.06z"/></svg>
        QQ
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '其他登录方式' },
  compact: { type: Boolean, default: false }
})
const emit = defineEmits(['wechat', 'qq'])
</script>

<style scoped>
.social-login {
  margin-top: 28px;
}
.social-login.compact {
  margin-top: 18px;
}
.social-login.compact .social-btn {
  height: 38px;
}
.social-login.compact .social-divider {
  margin-bottom: 10px;
}
.social-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #cbd5e1;
  font-size: 12px;
  margin-bottom: 16px;
}
.social-divider::before,
.social-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #f1f5f9;
}
.social-buttons {
  display: flex;
  gap: 12px;
}
.social-btn {
  flex: 1;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  color: #475569;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}
.social-btn svg {
  width: 20px;
  height: 20px;
}
.social-btn.wechat:hover {
  border-color: #07c160;
  color: #07c160;
}
.social-btn.qq:hover {
  border-color: #12b7f5;
  color: #12b7f5;
}
</style>
