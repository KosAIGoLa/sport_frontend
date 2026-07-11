<template>
  <div class="download-page">
    <header class="download-header">
      <a class="download-logo" href="/" @click.prevent="appNavigate('/')">
        <img src="/assets/logos/logo-mobile-wap.png" alt="857直播">
      </a>
    </header>
    <main class="download-main">
      <DownloadCard />
    </main>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'blank',
  layoutClass: 'download-layout'
})

const { t } = useI18n()
const { appNavigate } = useAppNavigate()
useHead(() => ({
  title: t('page.titleDownload')
}))
</script>

<style src="~/assets/css/pages/download.css"></style>
