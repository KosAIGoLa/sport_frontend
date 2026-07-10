<template>
  <div v-show="visible" class="fixed right-[17px] bottom-[227px] z-[99] transition-all duration-300 hidden md:block">
    <div class="icon-team">
      <a class="backTop flex flex-col items-center justify-center mb-2.5 bg-white border border-[#dadada] rounded-lg text-[#999] px-2.5 no-underline relative hover:text-[#f8c21b] hover:border-[#f8c21b]" href="#living-room" @click.prevent="scrollToTop">
        <img class="w-5 h-5 mt-2 mb-2" src="/assets/icon-top.png" alt="">
        <div class="mb-2 text-xs align-middle">返回顶部</div>
      </a>
      <a class="code group flex flex-col items-center justify-center mb-2.5 bg-white border border-[#dadada] rounded-lg text-[#999] px-2.5 no-underline relative hover:text-[#f8c21b] hover:border-[#f8c21b]">
        <img class="w-5 h-5 mt-2 mb-2" src="/assets/icon-code.png" alt="">
        <div class="mb-2 text-xs align-middle">下载APP</div>
        <div class="hidden fixed bottom-[238px] right-[100px] w-[140px] px-5 py-2.5 bg-white shadow-[0_3px_10px_0_rgba(43,58,73,0.1)] rounded-md text-center group-hover:block">
          <p class="mb-2.5 text-xs text-[#333]">扫码下载 857直播</p>
          <img class="mx-auto w-[100px] h-[100px]" src="/assets/code.png" alt="logo">
        </div>
      </a>
      <a class="feedback flex flex-col items-center justify-center mb-2.5 bg-white border border-[#dadada] rounded-lg text-[#999] px-2.5 no-underline relative hover:text-[#f8c21b] hover:border-[#f8c21b]" href="javascript:;" @click.prevent="handleFeedback">
        <img class="w-5 h-5 mt-2 mb-2" src="/assets/icon-feedback.png" alt="">
        <div class="mb-2 text-xs align-middle">意见反馈</div>
      </a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isLoggedIn: { type: Boolean, default: false }
})
const emit = defineEmits(['login', 'feedback'])

const visible = ref(false)

function handleFeedback() {
  if (!props.isLoggedIn) {
    emit('login', 'login')
    return
  }
  emit('feedback')
}

onMounted(() => {
  const updateVisible = () => {
    visible.value = window.scrollY > 260
  }
  updateVisible()
  window.addEventListener('scroll', updateVisible, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', updateVisible))
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

