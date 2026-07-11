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
      <span class="nav-menu__submenu" @click.stop>
        <span class="nav-menu__submenu-box">
          <img src="/assets/ui/code.png" alt="857直播">
          <p>用手机浏览器扫一扫</p>
          <p>精彩马上呈现</p>
        </span>
      </span>
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
  @apply absolute -top-[12px] -right-[32px] w-[29px] h-auto pointer-events-none;
}

.nav-menu__submenu {
  @apply hidden absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-[102];
}
.nav-menu__item--download:hover .nav-menu__submenu {
  @apply block;
}
.nav-menu__submenu-box {
  @apply w-[140px] p-[15px] text-center bg-white/[0.96] border border-gray-200/[0.9]
    rounded-[14px] shadow-[0_22px_60px_rgba(15,23,42,0.14)] text-[#333];
}
.nav-menu__submenu-box img {
  @apply w-[100px] h-[100px] mb-1.5;
}
.nav-menu__submenu-box p {
  @apply text-xs text-[#666] leading-[1.6] m-0;
}
</style>
