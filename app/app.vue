<template>
  <div class="app-root">
    <!-- 语系未就绪：不渲染页面，避免露出 t() key -->
    <div v-if="!isReady" class="locale-boot" aria-busy="true" aria-live="polite">
      <img class="locale-boot__spin" src="/assets/loading.png" alt="">
      <img class="locale-boot__logo" src="/assets/loading-logo.png" alt="">
    </div>
    <NuxtPage v-else />
  </div>
</template>

<script setup>
const { isReady, ready } = useI18n()

// SSR / 首次进入都等默认语系档加载完再渲染页面
await ready

// hydrate 完成后再按浏览器语言软切换，不闪 key
onMounted(() => {
  applyBrowserLocale()
})
</script>

<style>
.app-root {
  min-height: 100%;
}

.locale-boot {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #0b1220;
}

.locale-boot__spin {
  width: 48px;
  height: 48px;
  animation: locale-boot-spin 1.2s linear infinite;
}

.locale-boot__logo {
  width: 64px;
  height: auto;
  opacity: 0.92;
}

@keyframes locale-boot-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
