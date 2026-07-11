<template>
  <svg viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg" :class="iconClass">
    <path d="M45 65 Q35 95 55 125 Q75 150 115 145 Q165 140 185 105 Q190 65 165 45 Q125 30 80 40 Q55 45 45 65Z" fill="#E8B88C" stroke="#D89E6F" stroke-width="18"/>
    <path d="M70 55 Q55 75 68 105 Q85 125 105 118 Q130 115 145 85 Q150 60 125 48" fill="#F0C9A0" opacity="0.85"/>
    <path d="M65 55 Q85 45 115 55 Q145 70 155 95" fill="none" stroke="#FFF4E0" stroke-width="22" opacity="0.65"/>
    <ellipse cx="95" cy="68" rx="28" ry="18" fill="#FFF8E8" opacity="0.5"/>
    <path d="M80 80 Q95 72 115 85" fill="none" stroke="#E0A57A" stroke-width="6" opacity="0.4"/>
    <path d="M70 105 Q90 98 120 112" fill="none" stroke="#E0A57A" stroke-width="5" opacity="0.35"/>
  </svg>
</template>

<script setup>
defineProps({
  iconClass: { type: String, default: '' }
})
</script>
