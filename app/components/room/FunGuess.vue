<template>
  <DesktopOnly tag="div" class="fun-guess-section">
    <div class="fun-guess-header">
      <div class="fun-guess-title">
        <span class="fun-guess-icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/></svg>
        </span>
        趣猜
      </div>
      <div class="fun-guess-actions">
        <a class="fun-guess-actions__btn" href="/user.html?menu=guess" @click.prevent="appNavigate('/user.html?menu=guess')">记录</a>
        <a class="fun-guess-actions__btn" href="/news.html" @click.prevent="appNavigate('/news.html')">规则</a>
      </div>
    </div>
    <div class="fun-guess-empty">
      <img class="fun-guess-empty__img" src="/assets/ui/appointment-penguin.png" alt="">
      <p>暂无趣猜</p>
    </div>
  </DesktopOnly>
</template>

<script setup>
const { appNavigate } = useAppNavigate()
</script>
