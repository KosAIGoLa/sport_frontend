<template>
  <div v-show="visible" class="right-fix">
    <div class="icon-team">
      <a class="backTop" href="#living-room" @click.prevent="scrollToTop">
        <img class="icon" src="/assets/icon-top.png" alt="">
        <div class="text">返回顶部</div>
      </a>
      <a class="code">
        <img class="icon" src="/assets/icon-code.png" alt="">
        <div class="text">下载APP</div>
        <div class="sao-code">
          <p>扫码下载 857直播</p>
          <img src="/assets/code.png" alt="logo">
        </div>
      </a>
      <a class="feedback">
        <img class="icon" src="/assets/icon-feedback.png" alt="">
        <div class="text">意见反馈</div>
      </a>
    </div>
  </div>
</template>

<script setup>
const visible = ref(false)

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

<style scoped>
.right-fix {
  position: fixed;
  right: 17px;
  bottom: 227px;
  z-index: 99;
  transition: 0.3s;
}
.icon-team a {
  display: block;
  text-align: center;
  margin-bottom: 10px;
  background: #fff;
  border: 1px solid #dadada;
  border-radius: 8px;
  color: #999;
  padding: 0 10px;
  font-size: 0;
  text-decoration: none;
  position: relative;
}
.icon-team a .icon {
  width: 20px;
  height: 20px;
  margin-top: 8px;
  margin-bottom: 8px;
}
.icon-team a .text {
  margin-bottom: 8px;
  font-size: 12px;
  vertical-align: middle;
}
.icon-team a:hover {
  color: #f8c21b;
  border-color: #f8c21b;
}
.icon-team a.code:hover .sao-code {
  display: block;
}
.sao-code {
  display: none;
  position: fixed;
  bottom: 238px;
  right: 100px;
  width: 140px;
  padding: 10px 20px;
  background: #fff;
  box-shadow: 0 3px 10px 0 rgba(43, 58, 73, 0.1);
  border-radius: 6px;
  text-align: center;
}
.sao-code img {
  margin: 0 auto;
  width: 100px;
  height: 100px;
}
.sao-code p {
  margin-bottom: 10px;
  font-size: 12px;
  color: #333;
}
</style>
