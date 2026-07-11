<template>
  <nav class="nav-menu" aria-label="主导航">
    <a
      class="nav-menu__item"
      :class="{ 'is-active': active === 'home' }"
      href="/"
      @click.prevent="goHome"
    >
      {{ t('nav.home') }}
    </a>
    <a
      class="nav-menu__item"
      :class="{ 'is-active': active === 'live' }"
      href="/liveType.html"
      @click.prevent="go('/liveType.html')"
    >
      {{ t('nav.allLive') }}
    </a>
    <a
      class="nav-menu__item"
      :class="{ 'is-active': active === 'schedule' }"
      href="/match.html"
      @click.prevent="go('/match.html')"
    >
      {{ t('nav.schedule') }}
    </a>
    <a
      class="nav-menu__item nav-menu__item--download"
      href="/download"
      @click.prevent="go('/download')"
    >
      <span class="nav-menu__download-label">
        {{ t('nav.downloadApp') }}
        <img class="nav-menu__hot" src="/assets/brand/hot.png" alt="hot">
      </span>
      <!-- 使用 div：避免 span 内嵌 p 导致浏览器拆 DOM 使弹窗样式变形 -->
      <div class="nav-menu__submenu" @click.stop>
        <div class="nav-menu__submenu-box">
          <img src="/assets/ui/code.png" alt="857直播">
          <p>用手机浏览器扫一扫</p>
          <p>精彩马上呈现</p>
        </div>
      </div>
    </a>
  </nav>
</template>

<script setup>
defineProps({
  /** home | live | schedule | '' */
  active: { type: String, default: '' }
})

const { t } = useI18n()
const route = useRoute()
const { appNavigate, sameAppPath } = useAppNavigate()

function scrollToSection(selector) {
  const el = document.querySelector(selector)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 80
  window.scrollTo({ top, behavior: 'smooth' })
}

async function go(path) {
  if (sameAppPath(path)) return
  await appNavigate(path)
}

async function goHome() {
  if (route.path === '/') {
    scrollToSection('#living-room')
    return
  }
  await appNavigate('/')
}
</script>

<style scoped>
.nav-menu {
  @apply h-full flex items-center gap-2 text-base font-semibold;
}

.nav-menu__item {
  @apply relative inline-flex items-center justify-center h-9 px-[18px] mx-0.5
    text-[#111827] no-underline rounded-full whitespace-nowrap cursor-pointer
    transition-all duration-200;
}

.nav-menu__item:hover,
.nav-menu__item.is-active {
  @apply text-[#111827] bg-[linear-gradient(135deg,#f7ca4b_0%,#f3b61f_100%)]
    shadow-[0_8px_18px_rgba(243,182,31,0.24)];
}

/* 下载项：与主菜单同形，hover 用浅金底而不是整块实心（保留扫码浮层） */
.nav-menu__item--download {
  @apply text-[#111827] pr-[18px];
}
.nav-menu__item--download:hover {
  @apply bg-[linear-gradient(135deg,#fff3c4_0%,#ffe58a_100%)] shadow-[0_8px_18px_rgba(243,182,31,0.16)];
}
.nav-menu__download-label {
  @apply relative inline-block;
}
.nav-menu__hot {
  @apply absolute -top-0.5 -right-[30px] w-[29px] h-[19px] object-contain pointer-events-none;
}

/* 扫码弹窗：对齐原站尺寸（由内边距撑开，禁止定死窄宽导致文字折行变形） */
.nav-menu__submenu {
  @apply hidden absolute left-1/2 top-full z-[102] -translate-x-1/2 pt-2.5
    text-center cursor-default;
}
.nav-menu__item--download:hover .nav-menu__submenu {
  @apply block;
}
.nav-menu__submenu-box {
  @apply relative px-8 pt-[30px] pb-[22px] text-center bg-white rounded-lg
    text-[#777] text-xs font-normal
    shadow-[0_4px_15px_0_rgba(0,0,0,0.2)];
}
/* 顶部小三角：必须四边都设 border（同原站），底边贴住弹窗；只写三边会悬空约 7px */
.nav-menu__submenu-box::before {
  content: '';
  display: block;
  position: absolute;
  top: -15px;
  left: 50%;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
  transform: translateX(-50%);
  border: 8px solid transparent;
  border-bottom-color: #fff;
}
.nav-menu__submenu-box img {
  @apply block w-[100px] h-[100px] mx-auto mb-1;
}
.nav-menu__submenu-box p {
  @apply m-0 text-xs font-normal leading-none whitespace-nowrap text-[#777];
}
.nav-menu__submenu-box p + p {
  @apply mt-1.5;
}
</style>
