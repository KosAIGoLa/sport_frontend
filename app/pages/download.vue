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
useHead(() => ({
  title: t('page.titleDownload')
}))
</script>

<style scoped>
.download-page {
  @apply min-h-screen text-[#111827];
  background:
    radial-gradient(circle at 12% 0%, rgba(243, 182, 31, 0.14), transparent 28%),
    radial-gradient(circle at 86% 12%, rgba(59, 130, 246, 0.08), transparent 30%),
    linear-gradient(180deg, var(--app-bg) 0%, var(--app-bg-soft) 52%, var(--app-bg) 100%);
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
  @apply w-[400px] max-w-full py-8 px-7 rounded-[22px] shadow-[0_18px_48px_rgba(15,23,42,0.10)] text-center backdrop-blur-[14px];
  background: var(--app-surface);
  border: 1px solid var(--app-border);
}

.download-qr {
  @apply w-[128px] h-[128px] mb-5 rounded-xl mx-auto block;
}

.download-card h1 {
  @apply m-0 mb-3 text-[20px] font-extrabold;
}

.download-desc {
  @apply m-0 mb-6 text-slate-500 text-sm leading-relaxed;
}

.download-tips {
  @apply text-left py-4 px-4 rounded-[14px] mb-6;
  background: var(--app-accent-soft);
  border: 1px solid rgba(243, 182, 31, 0.22);
}

.download-tips p {
  @apply m-0 mb-2 text-amber-800 text-sm font-bold;
}

.download-tips ul {
  @apply m-0 pl-[18px] text-yellow-700 text-[13px] leading-[1.8];
}

.download-back {
  @apply inline-flex items-center justify-center h-10 px-6 rounded-full text-[#111827] text-[14px] font-extrabold no-underline transition-transform duration-200;
  background: linear-gradient(135deg, #f7ca4b 0%, var(--app-accent) 100%);
}

.download-back:hover {
  @apply -translate-y-0.5;
}

@media (max-width: 768px) {
  .download-page {
    background: linear-gradient(180deg, rgba(243, 182, 31, 0.09) 0%, rgba(243, 182, 31, 0.02) 32%, rgba(246, 248, 252, 0.98) 100%), #f6f8fc;
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
    @apply w-full py-6 px-5 rounded-[18px] shadow-[0_12px_30px_rgba(15,23,42,0.08)];
  }

  .download-qr {
    @apply w-[148px] h-[148px] mb-4;
  }

  .download-card h1 {
    @apply text-[22px] leading-tight;
  }

  .download-desc {
    @apply mb-5 text-[14px] leading-[1.7];
  }

  .download-tips {
    @apply p-4 mb-[22px] rounded-2xl;
  }

  .download-tips p {
    @apply text-[14px];
  }

  .download-tips ul {
    @apply pl-5 text-sm leading-[1.8];
  }

  .download-back {
    @apply w-full h-[46px] text-[15px];
  }
}
</style>
