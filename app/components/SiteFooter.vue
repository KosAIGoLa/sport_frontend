<template>
  <footer class="footer-wrapper">
    <div class="inner">
      <div class="logo-footer">
        <img src="/assets/logo-footer.png" alt="857直播">
      </div>
      <div class="guide">
        <div><a href="javascript:;" @click="openTip('guide')">新手主播教程</a></div>
        <div><a href="javascript:;" @click="openTip('faq')">直播常见问题</a></div>
        <div><a href="javascript:;" @click="openTip('agreement')">用户协议说明</a></div>
      </div>
      <div class="desc">
        Copyright © 2020 , All rights reserved.
      </div>
    </div>

    <div v-if="tipVisible" class="footer-tip-mask" @click="tipVisible = false">
      <div class="footer-tip" @click.stop>
        <div class="footer-tip-head">{{ tipTitle }}</div>
        <div class="footer-tip-body">{{ tipContent }}</div>
        <button type="button" class="footer-tip-close" @click="tipVisible = false">知道了</button>
      </div>
    </div>
  </footer>
</template>

<script setup>
const tipVisible = ref(false)
const tipTitle = ref('')
const tipContent = ref('')

const tipMap = {
  guide: {
    title: '新手主播教程',
    content: '1. 注册并实名认证后申请主播权限。\n2. 准备清晰摄像头、稳定网络与安静环境。\n3. 开播前填写标题、分类与封面。\n4. 开播后保持互动，遵守平台规范。'
  },
  faq: {
    title: '直播常见问题',
    content: 'Q: 开播卡顿怎么办？\nA: 请降低分辨率或切换网络。\n\nQ: 无法观看直播？\nA: 建议更换浏览器或刷新页面。\n\nQ: 如何预约比赛？\nA: 在赛程页点击「预约」按钮即可。'
  },
  agreement: {
    title: '用户协议说明',
    content: '用户使用本平台服务需遵守相关法律法规，禁止传播违法违规内容。主播内容版权归平台与主播共有，违规行为将受到警告、封禁或法律追责。'
  }
}

function openTip(key) {
  const item = tipMap[key]
  if (item) {
    tipTitle.value = item.title
    tipContent.value = item.content
    tipVisible.value = true
  }
}
</script>

<style scoped>
footer {
  margin-top: 50px;
  width: 100%;
  background: #25284d;
}
footer .inner {
  width: 1200px;
  margin: auto;
  text-align: center;
  padding: 0 15px;
}
footer .inner .logo-footer {
  height: 84px;
  padding-top: 16px;
  margin: 0 auto;
}
footer .inner .logo-footer img {
  height: 100%;
}
footer .inner .guide {
  padding-top: 47px;
}
footer .inner .guide > div {
  display: inline-block;
  height: 22px;
  margin-right: 65px;
  font-size: 16px;
  line-height: 22px;
}
footer .inner .guide > div a {
  color: #9aa0ff;
  text-decoration: none;
}
footer .inner .guide > div a:hover {
  color: #f8c21b;
}
footer .inner .guide > div:last-child {
  margin-right: 0;
}
footer .inner .desc {
  font-size: 14px;
  margin-top: 14px;
  padding-bottom: 50px;
  color: #6c71b4;
}

.footer-tip-mask {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(2, 6, 23, 0.72);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-tip {
  width: 460px;
  max-width: calc(100vw - 40px);
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.22);
  padding: 28px 32px 24px;
  color: #111827;
  animation: tipFade 0.22s ease-out;
}

@keyframes tipFade {
  from { opacity: 0; transform: translateY(20px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.footer-tip-head {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 14px;
  color: #0f172a;
}

.footer-tip-body {
  font-size: 15px;
  line-height: 1.8;
  color: #334155;
  white-space: pre-line;
  margin-bottom: 22px;
}

.footer-tip-close {
  width: 100%;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  color: #111827;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 8px 22px rgba(248, 194, 27, 0.28);
}

@media screen and (max-width: 1400px) {
  footer .inner {
    width: 100%;
  }
}

@media (max-width: 768px) {
  footer {
    display: none;
  }
}
</style>
