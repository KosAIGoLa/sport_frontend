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
        :is="item.href ? 'a' : 'button'"
        :href="item.href || undefined"
        :type="item.href ? undefined : 'button'"
        class="border-0 bg-transparent flex flex-col items-center justify-center gap-2 text-gray-800 no-underline text-base font-bold leading-none"
        :class="{ 'text-gray-900': currentActiveTab === item.key }"
        @click="handleTabClick(item)"
      >
        <span
          class="relative w-[58px] h-[38px] inline-flex items-center justify-center before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-transparent before:transition-colors before:duration-200"
          :class="{ 'before:bg-[#fff4d6]': currentActiveTab === item.key }"
        >
          <svg
            class="w-[30px] h-[30px] fill-none stroke-current stroke-[1.9] relative z-[1]"
            :class="{ 'text-[#f4b400]': currentActiveTab === item.key }"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
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

