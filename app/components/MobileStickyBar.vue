<template>
  <div class="mobile-sticky">
    <button
      v-if="adVisible && !props.hideAd"
      type="button"
      class="mobile-ad"
      @click="adVisible = false"
    >
      <span class="mobile-ad__close">×</span>
      <img class="mobile-ad__logo" src="/assets/logo-mobile-wap.png" alt="857直播">
      <div class="mobile-ad__copy">
        <strong>857直播</strong>
        <span>高清无广告 体育直播</span>
      </div>
      <span class="mobile-ad__action">下载APP</span>
    </button>

    <nav class="mobile-tabbar" aria-label="底部导航">
      <component
        v-for="item in tabs"
        :key="item.label"
        :is="item.href ? 'a' : 'button'"
        :href="item.href || undefined"
        :type="item.href ? undefined : 'button'"
        class="mobile-tabbar__item"
        :class="{ active: currentActiveTab === item.key }"
        @click="handleTabClick(item)"
      >
        <span class="mobile-tabbar__icon-wrap">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path :d="item.path" />
          </svg>
        </span>
        <span>{{ item.label }}</span>
      </component>
    </nav>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoggedIn: { type: Boolean, default: false },
  activeTab: { type: String, default: 'live' },
  hideAd: { type: Boolean, default: false }
})

const emit = defineEmits(['login', 'follow'])

const adVisible = ref(true)
const transientActiveTab = ref('')

const tabs = [
  { key: 'live', label: '直播', href: '/', path: 'M12 3.2 3 9.4v10.1c0 .8.6 1.5 1.5 1.5h15c.8 0 1.5-.6 1.5-1.5V9.4l-9-6.2Zm0 2.5 6.5 4.5v8.8H5.5v-8.8L12 5.7Z' },
  { key: 'schedule', label: '赛程', href: '/match.html', path: 'M7 2v2H5.8A2.8 2.8 0 0 0 3 6.8v11.4A2.8 2.8 0 0 0 5.8 21h12.4a2.8 2.8 0 0 0 2.8-2.8V6.8A2.8 2.8 0 0 0 18.2 4H17V2h-2v2H9V2H7Zm11.2 7H5.8v9.2h12.4V9Z' },
  { key: 'follow', label: '关注', href: null, action: 'concern', path: 'M12 20.6 4.9 13.8A4.7 4.7 0 0 1 11.7 7L12 7.3l.3-.3a4.7 4.7 0 0 1 6.8 6.8L12 20.6Zm0-2.8 5.7-5.4a2.7 2.7 0 1 0-3.9-3.7L12 10.6l-1.8-1.9a2.7 2.7 0 1 0-3.9 3.7l5.7 5.4Z' },
  { key: 'profile', label: '我的', href: null, action: 'profile', path: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.1 0-7.5 2.2-7.5 5v1.5h15V19c0-2.8-3.4-5-7.5-5Z' }
]

function handleTabClick(item) {
  transientActiveTab.value = item.key
  if (item.href || props.isLoggedIn) return
  if (item.action === 'concern') {
    emit('follow')
    return
  }
  if (item.action === 'profile') {
    emit('login', 'login')
  }
}

const currentActiveTab = computed(() => transientActiveTab.value || props.activeTab)
</script>

<style scoped>
.mobile-sticky {
  display: none;
}

@media (max-width: 768px) {
  .mobile-sticky {
    display: block;
  }

  .mobile-ad {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 92px;
    z-index: 35;
    height: 66px;
    padding: 0 16px;
    border: 0;
    background: rgba(17, 17, 17, 0.92);
    color: #fff;
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
  }

  .mobile-ad__close {
    font-size: 18px;
    line-height: 1;
    color: rgba(255, 255, 255, 0.82);
  }

  .mobile-ad__logo {
    width: 112px;
    height: auto;
    flex: 0 0 auto;
  }

  .mobile-ad__copy {
    display: flex;
    min-width: 0;
    flex: 1;
    flex-direction: column;
    gap: 2px;
  }

  .mobile-ad__copy strong {
    font-size: 14px;
    font-weight: 800;
  }

  .mobile-ad__copy span {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.82);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mobile-ad__action {
    height: 36px;
    padding: 0 14px;
    border-radius: 6px;
    background: #ffc61a;
    color: #111827;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 800;
    flex: 0 0 auto;
  }

  .mobile-tabbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 36;
    height: 92px;
    background: rgba(255, 255, 255, 0.98);
    border-top: 1px solid rgba(226, 232, 240, 0.95);
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding-bottom: env(safe-area-inset-bottom, 0);
  }

  .mobile-tabbar__item {
    border: 0;
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #1f2937;
    text-decoration: none;
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
  }

  .mobile-tabbar__item svg {
    width: 30px;
    height: 30px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.9;
    position: relative;
    z-index: 1;
  }

  .mobile-tabbar__icon-wrap {
    position: relative;
    width: 58px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .mobile-tabbar__icon-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 999px;
    background: transparent;
    transition: background 0.2s ease;
  }

  .mobile-tabbar__item.active {
    color: #111827;
    font-weight: 700;
  }

  .mobile-tabbar__item.active .mobile-tabbar__icon-wrap::before {
    background: rgba(244, 180, 0, 0.22);
  }

  .mobile-tabbar__item.active svg {
    color: #f4b400;
  }
}
</style>
