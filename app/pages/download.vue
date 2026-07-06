<template>
  <div class="download-page">
    <header class="download-header">
      <a class="download-logo" href="/">
        <img src="/assets/logo-mobile-wap.png" alt="857直播">
      </a>
    </header>
    <main class="download-main">
      <div class="download-card">
        <img class="download-qr" src="/assets/code.png" :alt="t('page.downloadTitle')">
        <h1>{{ t('page.downloadTitle') }}</h1>
        <p class="download-desc">{{ t('page.downloadDesc') }}</p>
        <div class="download-tips">
          <p><strong>{{ t('page.safetyNotice') }}</strong></p>
          <ul>
            <li>{{ t('page.safetyTip1') }}</li>
            <li>{{ t('page.safetyTip2') }}</li>
            <li>{{ t('page.safetyTip3') }}</li>
          </ul>
        </div>
        <a class="download-back" href="/">{{ t('page.backToHome') }}</a>
      </div>
    </main>
  </div>
</template>

<script setup>
const { t } = useI18n()
useHead({
  title: t('page.downloadTitle')
})
</script>

<style scoped>
.download-page {
  @apply min-h-screen text-[#111827];
  background: radial-gradient(circle at 12% 0%, rgba(255, 199, 28, 0.18), transparent 28%), radial-gradient(circle at 86% 12%, rgba(33, 138, 255, 0.14), transparent 30%), linear-gradient(180deg, #f8fafc 0%, #eef3f9 52%, #f8fafc 100%);
}

.download-header {
  @apply py-6 text-center;
}

.download-logo {
  @apply inline-block;
}

.download-logo img {
  @apply w-[160px] h-auto;
}

.download-main {
  @apply flex items-center justify-center py-10 px-5 pb-20;
}

.download-card {
  @apply w-[420px] max-w-full py-10 px-8 bg-white/[0.92] border border-white/[0.9] rounded-[24px] shadow-[0_22px_60px_rgba(15,23,42,0.12)] text-center backdrop-blur-[14px];
}

.download-qr {
  @apply w-[140px] h-[140px] mb-6 rounded-xl;
}

.download-card h1 {
  @apply m-0 mb-3 text-[22px] font-extrabold;
}

.download-desc {
  @apply m-0 mb-6 text-slate-500 text-sm leading-relaxed;
}

.download-tips {
  @apply text-left py-[18px] px-5 bg-amber-50 border border-[rgba(251,191,36,0.25)] rounded-[14px] mb-6;
}

.download-tips p {
  @apply m-0 mb-2 text-amber-800 text-sm font-bold;
}

.download-tips ul {
  @apply m-0 pl-[18px] text-yellow-700 text-[13px] leading-[1.8];
}

.download-back {
  @apply inline-flex items-center justify-center h-11 px-7 rounded-full bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] text-[#111827] text-[15px] font-extrabold no-underline transition-transform duration-200;
}

.download-back:hover {
  @apply -translate-y-0.5;
}

@media (max-width: 768px) {
  .download-page {
    background: linear-gradient(180deg, rgba(255, 198, 26, 0.12) 0%, rgba(255, 198, 26, 0.03) 32%, rgba(248, 250, 252, 0.98) 100%), #f8fafc;
  }

  .download-header {
    @apply h-[68px] px-4 flex items-center justify-center bg-[rgba(32,33,36,0.9)] backdrop-blur-[14px] sticky top-0 z-[20];
  }

  .download-logo img {
    @apply w-[158px];
  }

  .download-main {
    @apply py-6 px-4 pb-10 items-stretch;
  }

  .download-card {
    @apply w-full py-7 px-5 rounded-[20px] shadow-[0_12px_30px_rgba(15,23,42,0.08)];
  }

  .download-qr {
    @apply w-[168px] h-[168px] mb-5;
  }

  .download-card h1 {
    @apply text-[28px] leading-tight;
  }

  .download-desc {
    @apply mb-5 text-base leading-[1.7];
  }

  .download-tips {
    @apply p-4 mb-[22px] rounded-2xl;
  }

  .download-tips p {
    @apply text-[15px];
  }

  .download-tips ul {
    @apply pl-5 text-sm leading-[1.8];
  }

  .download-back {
    @apply w-full h-[50px] text-base;
  }
}
</style>
