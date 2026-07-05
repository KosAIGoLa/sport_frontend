<template>
  <div class="download-page">
    <header class="download-header">
      <a class="download-logo" href="/">
        <img src="/assets/logo2.png" alt="857直播">
      </a>
    </header>
    <main class="download-main">
      <div class="download-card">
        <img class="download-qr" src="/assets/code.png" alt="扫码下载">
        <h1>下载 857 直播 APP</h1>
        <p class="download-desc">请使用手机浏览器扫描上方二维码，或前往官方应用商店下载。</p>
        <div class="download-tips">
          <p><strong>安全提示：</strong></p>
          <ul>
            <li>请勿通过非官方渠道下载安装包，谨防木马与钓鱼软件。</li>
            <li>安装前请核对应用名称、开发者签名与版本号。</li>
            <li>如遇到诱导添加私人账号、转账充值等请求，请立即举报。</li>
          </ul>
        </div>
        <a class="download-back" href="/">返回首页</a>
      </div>
    </main>
  </div>
</template>

<script setup>
useHead({
  title: '下载 857 直播 APP'
})
</script>

<style scoped>
.download-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 12% 0%, rgba(255, 199, 28, 0.18), transparent 28%),
    radial-gradient(circle at 86% 12%, rgba(33, 138, 255, 0.14), transparent 30%),
    linear-gradient(180deg, #f8fafc 0%, #eef3f9 52%, #f8fafc 100%);
  color: #111827;
}

.download-header {
  padding: 24px 0;
  text-align: center;
}

.download-logo {
  display: inline-block;
}

.download-logo img {
  width: 160px;
  height: auto;
}

.download-main {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px 80px;
}

.download-card {
  width: 420px;
  max-width: 100%;
  padding: 40px 32px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.12);
  text-align: center;
  backdrop-filter: blur(14px);
}

.download-qr {
  width: 140px;
  height: 140px;
  margin-bottom: 24px;
  border-radius: 12px;
}

.download-card h1 {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 800;
}

.download-desc {
  margin: 0 0 24px;
  color: #64748b;
  font-size: 14px;
  line-height: 1.6;
}

.download-tips {
  text-align: left;
  padding: 18px 20px;
  background: #fffbeb;
  border: 1px solid rgba(251, 191, 36, 0.25);
  border-radius: 14px;
  margin-bottom: 24px;
}

.download-tips p {
  margin: 0 0 8px;
  color: #92400e;
  font-size: 14px;
  font-weight: 700;
}

.download-tips ul {
  margin: 0;
  padding-left: 18px;
  color: #a16207;
  font-size: 13px;
  line-height: 1.8;
}

.download-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 28px;
  border-radius: 999px;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  color: #111827;
  font-size: 15px;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.2s;
}

.download-back:hover {
  transform: translateY(-2px);
}
</style>
