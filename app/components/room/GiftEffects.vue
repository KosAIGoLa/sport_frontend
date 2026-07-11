<template>
  <div class="gift-effects">
    <div
      v-for="gift in gifts"
      :key="gift.id"
      class="gift-fly"
      :class="{ coin: gift.icon === 'coin' }"
      :style="{
        left: gift.left + 'px',
        animationDuration: gift.duration + 's',
        transform: 'scale(' + gift.scale + ')'
      }"
    >
      <img :src="gift.icon === 'coin' ? '/assets/icons/icon-code.png' : '/assets/ui/gift.png'" alt="">
      <span class="gift-glow">{{ gift.text }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  gifts: { type: Array, default: () => [] }
})
</script>
