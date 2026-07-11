<template>
  <div v-if="visible" class="mobile-follow-panel">
    <header class="mobile-follow-panel__header">
      <div class="mobile-follow-panel__top">
        <img class="mobile-follow-panel__logo" src="/assets/logos/logo-mobile-wap.png" alt="857直播">
        <a class="mobile-follow-panel__download" href="/download" @click.prevent="appNavigate('/download')">{{ t('nav.downloadApp') }}</a>
      </div>
      <nav class="mobile-follow-panel__tabs" aria-label="关注预约">
        <button type="button" :class="{ active: activeTab === 'follow' }" @click="activeTab = 'follow'">{{ t('nav.follow') }}</button>
        <button type="button" :class="{ active: activeTab === 'appointment' }" @click="activeTab = 'appointment'">{{ t('nav.appointment') }}</button>
      </nav>
    </header>

    <main class="mobile-follow-panel__body" :class="{ 'mobile-follow-panel__body--appointment': activeTab === 'appointment' }">
      <img class="mobile-follow-panel__empty" src="/assets/ui/none.png" alt="">
      <p>{{ t('auth.loginToFollow') }}</p>
      <button type="button" class="mobile-follow-panel__login" @click="$emit('login', 'login')">{{ t('auth.login') }}</button>
    </main>

    <!-- 与全站底栏同一组件，避免关注页字号/黄底样式漂移 -->
    <MobileTabBar
      :active="footerActive"
      :fixed="false"
      @select="handleFooterSelect"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  visible: { type: Boolean, default: false }
})

const { t } = useI18n()
const { appNavigate, sameAppPath } = useAppNavigate()
const emit = defineEmits(['login', 'close'])

const activeTab = ref('follow')
/** 打开关注浮层时底栏高亮「关注」 */
const footerActive = ref('follow')

watch(() => props.visible, (v) => {
  if (v) {
    activeTab.value = 'follow'
    footerActive.value = 'follow'
  }
})

async function handleFooterSelect(item) {
  footerActive.value = item.key

  if (item.key === 'follow') {
    // 已在关注面板，保持打开
    activeTab.value = 'follow'
    return
  }

  if (item.key === 'live' || item.action === 'notice') {
    emit('close')
    sessionStorage.setItem('show-live-notice', '1')
    await appNavigate('/')
    return
  }

  if (item.href || item.key === 'schedule') {
    const target = item.href || '/match.html'
    emit('close')
    if (sameAppPath(target)) return
    await appNavigate(target)
    return
  }

  if (item.key === 'profile' || item.action === 'profile') {
    emit('login', 'login')
  }
}
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
    background: #f8fafc;
    display: flex;
    flex-direction: column;
  }

  .mobile-follow-panel__top {
    height: 68px;
    padding: 0 16px;
    background: #202124;
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
    background: #f3b61f;
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 800;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-follow-panel__tabs {
    height: 58px;
    padding: 0 24px;
    background: #f3b61f;
    display: flex;
    align-items: center;
    gap: 36px;
  }

  .mobile-follow-panel__tabs button {
    position: relative;
    border: 0;
    background: transparent;
    color: #fff;
    font-size: 18px;
    font-weight: 800;
    padding: 0;
    cursor: pointer;
  }

  .mobile-follow-panel__tabs button.active::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -12px;
    width: 12px;
    height: 4px;
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
    padding: 0 24px 24px;
    min-height: 0;
  }

  .mobile-follow-panel__body--appointment {
    justify-content: flex-end;
    padding-bottom: 32px;
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
    cursor: pointer;
  }
}
</style>
