<template>
  <nav class="mobile-tab-bar" :class="{ 'mobile-tab-bar--static': !fixed }" aria-label="底部导航">
    <button
      v-for="item in tabs"
      :key="item.key"
      type="button"
      class="mobile-tab-bar__item"
      :class="{ 'is-active': active === item.key }"
      @click="$emit('select', item)"
    >
      <span class="mobile-tab-bar__icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path :d="item.path" />
        </svg>
      </span>
      <span class="mobile-tab-bar__label">{{ t(item.labelKey) }}</span>
    </button>
  </nav>
</template>

<script setup>
/** 手机底栏 tab 定义（勿 export，script setup 命名导出会在 SSR 报 500） */
const tabs = [
  {
    key: 'live',
    labelKey: 'nav.live',
    action: 'notice',
    path: 'M12 3.2 3 9.4v10.1c0 .8.6 1.5 1.5 1.5h15c.8 0 1.5-.6 1.5-1.5V9.4l-9-6.2Zm0 2.5 6.5 4.5v8.8H5.5v-8.8L12 5.7Z'
  },
  {
    key: 'schedule',
    labelKey: 'nav.schedule',
    href: '/match.html',
    path: 'M7 2v2H5.8A2.8 2.8 0 0 0 3 6.8v11.4A2.8 2.8 0 0 0 5.8 21h12.4a2.8 2.8 0 0 0 2.8-2.8V6.8A2.8 2.8 0 0 0 18.2 4H17V2h-2v2H9V2H7Zm11.2 7H5.8v9.2h12.4V9Z'
  },
  {
    key: 'follow',
    labelKey: 'nav.follow',
    action: 'concern',
    path: 'M12 20.6 4.9 13.8A4.7 4.7 0 0 1 11.7 7L12 7.3l.3-.3a4.7 4.7 0 0 1 6.8 6.8L12 20.6Zm0-2.8 5.7-5.4a2.7 2.7 0 1 0-3.9-3.7L12 10.6l-1.8-1.9a2.7 2.7 0 1 0-3.9 3.7l5.7 5.4Z'
  },
  {
    key: 'profile',
    labelKey: 'nav.profile',
    action: 'profile',
    path: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.1 0-7.5 2.2-7.5 5v1.5h15V19c0-2.8-3.4-5-7.5-5Z'
  }
]

defineProps({
  /** live | schedule | follow | profile */
  active: { type: String, default: 'live' },
  /** false 时相对布局（用于关注浮层底部），true 为 fixed 底栏 */
  fixed: { type: Boolean, default: true }
})

defineEmits(['select'])

const { t } = useI18n()
</script>

<style scoped>
.mobile-tab-bar {
  font-family: Inter, 'PingFang SC', tahoma, arial, 'Microsoft Yahei', 'Hiragino Sans GB', sans-serif;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  font-size: 13px;
  line-height: 1;
  height: 76px;
  padding-bottom: env(safe-area-inset-bottom);
  background: rgba(255, 255, 255, 0.92);
  border-top: 1px solid rgba(226, 232, 240, 0.95);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.mobile-tab-bar--fixed,
.mobile-tab-bar:not(.mobile-tab-bar--static) {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 36;
  /* 固定底栏独立参与 VT，避免并入 root 导致「像没过渡」；
     仅 fixed 实例命名，避免与关注浮层内 static 底栏重名导致 VT 被跳过 */
  view-transition-name: mobile-tab-bar;
}

/* 关注浮层内：贴在面板底部，不 fixed 到视口 */
.mobile-tab-bar--static {
  position: relative;
  left: auto;
  right: auto;
  bottom: auto;
  z-index: 1;
  flex-shrink: 0;
}

.mobile-tab-bar button,
.mobile-tab-bar span {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: normal;
  text-transform: none;
}

.mobile-tab-bar__item {
  appearance: none;
  border: 0;
  background: transparent;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #1f2937;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.mobile-tab-bar__icon {
  width: 50px;
  height: 32px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition: background-color 0.2s ease;
}

.mobile-tab-bar__icon svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  color: #1f2937;
}

.mobile-tab-bar__label {
  font-size: 13px !important;
  font-weight: 700 !important;
  line-height: 1 !important;
  color: #1f2937;
}

.mobile-tab-bar__item.is-active .mobile-tab-bar__icon {
  background: #f3b61f;
}

.mobile-tab-bar__item.is-active .mobile-tab-bar__icon svg {
  color: #fff;
}

.mobile-tab-bar__item.is-active .mobile-tab-bar__label {
  font-size: 13px !important;
  font-weight: 700 !important;
  color: #111827;
}

.mobile-tab-bar__item:active .mobile-tab-bar__icon {
  background: #fff7dc;
}

.mobile-tab-bar__item.is-active:active .mobile-tab-bar__icon {
  background: #f3b61f;
}
</style>
