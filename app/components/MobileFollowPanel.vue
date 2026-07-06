<template>
  <div v-if="visible" class="mobile-follow-panel">
    <header class="mobile-follow-panel__header">
      <div class="mobile-follow-panel__top">
        <img class="mobile-follow-panel__logo" src="/assets/logo-mobile-wap.png" alt="857直播">
        <a class="mobile-follow-panel__download" href="/download" target="_blank" rel="noopener noreferrer">下载APP</a>
      </div>
      <nav class="mobile-follow-panel__tabs" aria-label="关注预约">
        <button type="button" class="active">关注</button>
        <button type="button">预约</button>
      </nav>
    </header>

    <main class="mobile-follow-panel__body">
      <img class="mobile-follow-panel__empty" src="/assets/none.png" alt="">
      <p>登录账号关注喜欢的主播</p>
      <button type="button" class="mobile-follow-panel__login" @click="$emit('login', 'login')">登录</button>
    </main>

    <nav class="mobile-follow-panel__footer" aria-label="底部导航">
      <a href="/" class="mobile-follow-panel__item">
        <span class="mobile-follow-panel__icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2 3 9.4v10.1c0 .8.6 1.5 1.5 1.5h15c.8 0 1.5-.6 1.5-1.5V9.4l-9-6.2Zm0 2.5 6.5 4.5v8.8H5.5v-8.8L12 5.7Z" /></svg>
        </span>
        <span>直播</span>
      </a>
      <a href="/match.html" class="mobile-follow-panel__item">
        <span class="mobile-follow-panel__icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v2H5.8A2.8 2.8 0 0 0 3 6.8v11.4A2.8 2.8 0 0 0 5.8 21h12.4a2.8 2.8 0 0 0 2.8-2.8V6.8A2.8 2.8 0 0 0 18.2 4H17V2h-2v2H9V2H7Zm11.2 7H5.8v9.2h12.4V9Z" /></svg>
        </span>
        <span>赛程</span>
      </a>
      <button type="button" class="mobile-follow-panel__item mobile-follow-panel__item--active">
        <span class="mobile-follow-panel__icon mobile-follow-panel__icon--active">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.6 4.9 13.8A4.7 4.7 0 0 1 11.7 7L12 7.3l.3-.3a4.7 4.7 0 0 1 6.8 6.8L12 20.6Zm0-2.8 5.7-5.4a2.7 2.7 0 1 0-3.9-3.7L12 10.6l-1.8-1.9a2.7 2.7 0 1 0-3.9 3.7l5.7 5.4Z" /></svg>
        </span>
        <span>关注</span>
      </button>
      <button type="button" class="mobile-follow-panel__item" @click="$emit('login', 'login')">
        <span class="mobile-follow-panel__icon">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.1 0-7.5 2.2-7.5 5v1.5h15V19c0-2.8-3.4-5-7.5-5Z" /></svg>
        </span>
        <span>我的</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false }
})

defineEmits(['login'])
</script>

<style scoped>
.mobile-follow-panel {
  display: none;
}

@media (max-width: 768px) {
  .mobile-follow-panel {
    position: fixed;
    inset: 0;
    z-index: 120;
    background:
      linear-gradient(180deg, rgba(255, 198, 26, 0.08) 0%, rgba(255, 198, 26, 0) 120px),
      #f8fafc;
    display: flex;
    flex-direction: column;
  }

  .mobile-follow-panel__top {
    height: 68px;
    padding: 0 16px;
    background: rgba(32, 33, 36, 0.9);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mobile-follow-panel__logo {
    width: 158px;
    height: auto;
    display: block;
  }

  .mobile-follow-panel__download {
    min-width: 108px;
    height: 42px;
    padding: 0 16px;
    border-radius: 6px;
    background: #ffc61a;
    color: #fff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-follow-panel__tabs {
    height: 74px;
    padding: 0 24px;
    background: rgba(255, 198, 26, 0.92);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    gap: 42px;
  }

  .mobile-follow-panel__tabs button {
    position: relative;
    border: 0;
    background: transparent;
    color: #fff;
    font-size: 22px;
    font-weight: 800;
    padding: 0;
  }

  .mobile-follow-panel__tabs button.active::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -14px;
    width: 12px;
    height: 6px;
    margin-left: -6px;
    border-radius: 999px;
    background: #fff;
  }

  .mobile-follow-panel__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 24px 48px;
  }

  .mobile-follow-panel__empty {
    width: 168px;
    opacity: 0.18;
    margin-bottom: 22px;
  }

  .mobile-follow-panel__body p {
    color: #9a9a9a;
    font-size: 15px;
    margin: 0 0 28px;
  }

  .mobile-follow-panel__login {
    width: 184px;
    height: 48px;
    border: 0;
    border-radius: 999px;
    background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
    color: #111827;
    font-size: 17px;
    font-weight: 800;
    box-shadow: 0 10px 24px rgba(248, 194, 27, 0.22);
  }

  .mobile-follow-panel__footer {
    height: 92px;
    border-top: 1px solid rgba(226, 232, 240, 0.95);
    background: rgba(255, 255, 255, 0.98);
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    align-items: center;
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  .mobile-follow-panel__item {
    border: 0;
    background: transparent;
    color: #111827;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 15px;
    font-weight: 700;
  }

  .mobile-follow-panel__icon {
    width: 58px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
  }

  .mobile-follow-panel__icon svg {
    width: 30px;
    height: 30px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.9;
  }

  .mobile-follow-panel__item--active .mobile-follow-panel__icon {
    background: rgba(244, 180, 0, 0.22);
    color: #f4b400;
  }
}
</style>
