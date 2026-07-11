<template>
  <div class="download-card">
    <img class="download-qr" src="/assets/ui/code.png" :alt="t('page.downloadTitle')">
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
    <a class="download-back" href="/" @click.prevent="appNavigate('/')">{{ t('page.backToHome') }}</a>
  </div>
</template>

<script setup>
const { t } = useI18n()
const { appNavigate } = useAppNavigate()
</script>
