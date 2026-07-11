<template>
  <article class="news-article">
    <h1 class="news-title">{{ title }}</h1>
    <div class="news-date">{{ date }}</div>
    <div class="news-body">
      <slot />
    </div>
  </article>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  date: { type: String, required: true }
})
</script>
