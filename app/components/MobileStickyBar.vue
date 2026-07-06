<template>
  <div class="block md:hidden">
    <button
      v-if="adVisible && !props.hideAd"
      type="button"
      class="fixed left-0 right-0 bottom-[92px] z-[35] h-[66px] px-4 border-0 bg-[rgba(17,17,17,0.5)] text-white flex items-center gap-3 text-left"
      @click="adVisible = false"
    >
      <span class="text-lg leading-none text-white/80">×</span>
      <img class="w-[112px] h-auto shrink-0 basis-auto" src="/assets/logo-mobile-wap.png" alt="857直播">
      <div class="flex min-w-0 flex-1 flex-col gap-0.5">
        <strong class="text-sm font-extrabold">857直播</strong>
        <span class="text-[11px] text-white/80 whitespace-nowrap overflow-hidden text-ellipsis">高清无广告 体育直播</span>
      </div>
      <span class="h-9 px-3.5 rounded-md bg-[#ffc61a] text-[#111827] inline-flex items-center justify-center text-sm font-extrabold shrink-0 basis-auto">下载APP</span>
    </button>

    <nav class="fixed left-0 right-0 bottom-0 z-[36] h-[92px] bg-white border-t border-[rgba(226,232,240,0.95)] grid grid-cols-4 pb-[env(safe-area-inset-bottom)]" aria-label="底部导航">
      <component
        v-for="item in tabs"
        :key="item.label"
        :is="item.href ? NuxtLink : 'button'"
        :to="item.href || undefined"
        :type="item.href ? undefined : 'button'"
        class="border-0 bg-transparent flex flex-col items-center justify-center gap-2 text-gray-800 no-underline text-base font-bold leading-none active:text-gray-900"
        :class="{ 'text-gray-900': currentActiveTab === item.key }"
        @click="handleTabClick(item)"
      >
        <span
          class="relative w-[58px] h-[38px] inline-flex items-center justify-center before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-transparent before:transition-colors before:duration-200 active:before:bg-[#fff4d6]"
          :class="{ 'before:bg-[#ffc61a]': currentActiveTab === item.key }"
        >
          <svg
            class="w-[30px] h-[30px] fill-none stroke-current stroke-[1.9] relative z-[1] active:text-[#f4b400]"
            :class="{ 'text-white': currentActiveTab === item.key }"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path :d="item.path" />
          </svg>
        </span>
        <span>{{ item.label }}</span>
      </component>
    </nav>
    <div v-if="noticeVisible" class="fixed inset-0 z-[80] bg-black/45 flex items-center justify-center px-6" @click.self="confirmNotice">
      <div class="w-full max-w-[335px] rounded-[4px] bg-white px-8 pt-6 pb-9 text-center shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
        <h2 class="m-0 mb-5 text-[32px] font-extrabold leading-none text-[#333]">公告</h2>
        <div class="mb-3 text-[21px] font-bold text-[#333]">备用网址</div>
        <a class="mx-auto mb-3 flex h-[54px] items-center justify-center rounded-[4px] bg-[#f7f7ff] text-[22px] font-medium text-blue-600 underline" href="https://857zbw8.live" target="_blank" rel="noopener noreferrer">857zbw8.live</a>
        <a class="mx-auto mb-4 flex h-[54px] items-center justify-center rounded-[4px] bg-[#f7f7ff] text-[22px] font-medium text-blue-600 underline" href="https://857zbw9.live" target="_blank" rel="noopener noreferrer">857zbw9.live</a>
        <p class="m-0 mb-4 text-[16px] font-medium leading-6 text-[#333]">请提前点击上面链接进去收藏网页</p>
        <button type="button" class="h-[52px] w-[208px] rounded-[7px] border-0 bg-[#ffc61a] text-[23px] font-extrabold text-white" @click="confirmNotice">我知道了</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { NuxtLink } from '#components'
const props = defineProps({
  isLoggedIn: { type: Boolean, default: false },
  activeTab: { type: String, default: 'live' },
  hideAd: { type: Boolean, default: false }
})

const emit = defineEmits(['login', 'follow'])

const adVisible = ref(true)
const transientActiveTab = ref('')
const noticeVisible = ref(false)

const tabs = [
  { key: 'live', label: '直播', href: null, action: 'notice', path: 'M12 3.2 3 9.4v10.1c0 .8.6 1.5 1.5 1.5h15c.8 0 1.5-.6 1.5-1.5V9.4l-9-6.2Zm0 2.5 6.5 4.5v8.8H5.5v-8.8L12 5.7Z' },
  { key: 'schedule', label: '赛程', href: '/match.html', path: 'M7 2v2H5.8A2.8 2.8 0 0 0 3 6.8v11.4A2.8 2.8 0 0 0 5.8 21h12.4a2.8 2.8 0 0 0 2.8-2.8V6.8A2.8 2.8 0 0 0 18.2 4H17V2h-2v2H9V2H7Zm11.2 7H5.8v9.2h12.4V9Z' },
  { key: 'follow', label: '关注', href: null, action: 'concern', path: 'M12 20.6 4.9 13.8A4.7 4.7 0 0 1 11.7 7L12 7.3l.3-.3a4.7 4.7 0 0 1 6.8 6.8L12 20.6Zm0-2.8 5.7-5.4a2.7 2.7 0 1 0-3.9-3.7L12 10.6l-1.8-1.9a2.7 2.7 0 1 0-3.9 3.7l5.7 5.4Z' },
  { key: 'profile', label: '我的', href: null, action: 'profile', path: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4.1 0-7.5 2.2-7.5 5v1.5h15V19c0-2.8-3.4-5-7.5-5Z' }
]

function confirmNotice() {
  noticeVisible.value = false
  navigateTo('/')
}

function handleTabClick(item) {
  transientActiveTab.value = item.key
  if (item.action === 'notice') {
    sessionStorage.setItem('show-live-notice', '1')
    navigateTo('/')
    return
  }
  if (item.href || props.isLoggedIn) return
  if (item.action === 'concern') {
    emit('follow')
    return
  }
  if (item.action === 'profile') {
    emit('login', 'login')
  }
}

onMounted(() => {
  if (sessionStorage.getItem('show-live-notice') === '1') {
    sessionStorage.removeItem('show-live-notice')
    noticeVisible.value = true
  }
})

const currentActiveTab = computed(() => transientActiveTab.value || props.activeTab)
</script>

