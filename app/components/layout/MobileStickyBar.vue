<template>
  <div class="mobile-sticky-bar md:hidden">
    <button
      v-if="adVisible && !props.hideAd"
      type="button"
      class="mobile-sticky-bar__ad"
      @click="adVisible = false"
    >
      <span class="mobile-sticky-bar__ad-close">×</span>
      <img class="mobile-sticky-bar__ad-logo" src="/assets/logos/logo-mobile-wap.png" alt="857直播">
      <div class="mobile-sticky-bar__ad-copy">
        <strong>857直播</strong>
        <span>{{ t('common.liveStream') }}</span>
      </div>
      <span class="mobile-sticky-bar__ad-btn">{{ t('nav.downloadApp') }}</span>
    </button>

    <MobileTabBar :active="currentActiveTab" @select="handleTabClick" />

    <div
      v-if="noticeVisible"
      class="mobile-sticky-bar__notice"
      @click.self="confirmNotice"
    >
      <div class="mobile-sticky-bar__notice-card">
        <h2>{{ t('notice.title') }}</h2>
        <div class="mobile-sticky-bar__notice-sub">{{ t('notice.backupUrl') }}</div>
        <a href="https://857zbw8.live" target="_blank" rel="noopener noreferrer">857zbw8.live</a>
        <a href="https://857zbw9.live" target="_blank" rel="noopener noreferrer">857zbw9.live</a>
        <p>{{ t('notice.bookmarkTip') }}</p>
        <button type="button" @click="confirmNotice">{{ t('notice.ok') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoggedIn: { type: Boolean, default: false },
  /** live | schedule | follow | profile（兼容旧值 home → live） */
  activeTab: { type: String, default: 'live' },
  hideAd: { type: Boolean, default: false }
})

const { t } = useI18n()
const emit = defineEmits(['login', 'follow'])
const route = useRoute()
const nuxtApp = useNuxtApp()
const { appNavigate, sameAppPath } = useAppNavigate()

const adVisible = ref(true)
const noticeVisible = ref(false)

const currentActiveTab = computed(() => {
  const path = route.path || ''
  if (path.startsWith('/match')) return 'schedule'
  if (path.startsWith('/user')) {
    return route.query.menu === 'follow' ? 'follow' : 'profile'
  }
  if (path.startsWith('/liveType') || path === '/' || path === '/index.html') return 'live'
  const prop = props.activeTab === 'home' ? 'live' : props.activeTab
  return prop || 'live'
})

function isHomePath(path = route.path) {
  return path === '/' || path === '/index.html'
}

/** 公告弹层延后到 VT 结束后再开，避免打断 startViewTransition */
function showNoticeAfterTransition() {
  sessionStorage.removeItem('show-live-notice')
  const open = () => { noticeVisible.value = true }
  if (!import.meta.client) {
    open()
    return
  }
  // page:finish 对应 Nuxt VT finish；再 rAF 一帧确保截图已完成
  let opened = false
  const safeOpen = () => {
    if (opened) return
    opened = true
    requestAnimationFrame(open)
  }
  if (typeof nuxtApp.hookOnce === 'function') {
    nuxtApp.hookOnce('page:finish', safeOpen)
  } else {
    const stop = nuxtApp.hook('page:finish', () => {
      stop()
      safeOpen()
    })
  }
  // 已 finish / 未触发 hook 时的兜底
  setTimeout(safeOpen, 450)
}

function confirmNotice() {
  noticeVisible.value = false
  if (!isHomePath()) {
    appNavigate('/')
  }
}

async function handleTabClick(item) {
  // 「直播」：首页弹公告；其它页先 SPA 跳转首页（走 View Transition）再弹
  if (item.action === 'notice') {
    if (isHomePath()) {
      noticeVisible.value = true
      return
    }
    sessionStorage.setItem('show-live-notice', '1')
    await appNavigate('/')
    return
  }

  // 「赛程」等带 href 的 tab
  if (item.href) {
    if (sameAppPath(item.href)) return
    await appNavigate(item.href)
    return
  }

  if (item.action === 'concern') {
    if (props.isLoggedIn) {
      const target = '/user.html?menu=follow'
      if (sameAppPath(target)) return
      await appNavigate(target)
      return
    }
    emit('follow')
    return
  }

  if (item.action === 'profile') {
    if (props.isLoggedIn) {
      if (sameAppPath('/user.html')) return
      await appNavigate('/user.html')
      return
    }
    emit('login', 'login')
  }
}

onMounted(() => {
  if (sessionStorage.getItem('show-live-notice') === '1') {
    showNoticeAfterTransition()
  }
})
</script>

<style scoped>
.mobile-sticky-bar {
  font-family: Inter, 'PingFang SC', tahoma, arial, 'Microsoft Yahei', 'Hiragino Sans GB', sans-serif;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

.mobile-sticky-bar__ad {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 76px;
  z-index: 35;
  height: 56px;
  padding: 0 16px;
  border: 0;
  background: rgba(17, 17, 17, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
}

.mobile-sticky-bar__ad-close {
  font-size: 18px;
  line-height: 1;
  color: rgba(255, 255, 255, 0.8);
}

.mobile-sticky-bar__ad-logo {
  width: 98px;
  height: auto;
  flex-shrink: 0;
}

.mobile-sticky-bar__ad-copy {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 2px;
}

.mobile-sticky-bar__ad-copy strong {
  font-size: 13px;
  font-weight: 800;
  line-height: 1.2;
}

.mobile-sticky-bar__ad-copy span {
  font-size: 11px;
  font-weight: 500;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.8);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-sticky-bar__ad-btn {
  height: 32px;
  padding: 0 12px;
  border-radius: 6px;
  background: #f3b61f;
  color: #111827;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 800;
  flex-shrink: 0;
}

.mobile-sticky-bar__notice {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
}

.mobile-sticky-bar__notice-card {
  width: 100%;
  max-width: 335px;
  border-radius: 8px;
  background: #fff;
  padding: 24px 28px 32px;
  text-align: center;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
  font-family: inherit;
}

.mobile-sticky-bar__notice-card h2 {
  margin: 0 0 16px;
  font-size: 24px;
  font-weight: 800;
  line-height: 1;
  color: #333;
}

.mobile-sticky-bar__notice-sub {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 700;
  color: #333;
}

.mobile-sticky-bar__notice-card a {
  margin: 0 auto 12px;
  display: flex;
  height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #f7f7ff;
  padding: 0 12px;
  font-size: 18px;
  font-weight: 500;
  color: #2563eb;
  text-decoration: underline;
}

.mobile-sticky-bar__notice-card p {
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  color: #333;
}

.mobile-sticky-bar__notice-card button {
  height: 46px;
  width: 176px;
  border: 0;
  border-radius: 7px;
  background: #f3b61f;
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
}
</style>
