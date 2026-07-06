<template>
  <div class="mt-7" :class="{ 'mt-[18px]': compact }">
    <div
      class="flex items-center gap-3 text-slate-300 text-xs mb-4 before:content-[''] before:flex-1 before:h-px before:bg-slate-100 after:content-[''] after:flex-1 after:h-px after:bg-slate-100"
      :class="{ 'mb-2.5': compact }"
    >
      <span>{{ label }}</span>
    </div>
    <div class="flex gap-3">
      <button
        type="button"
        class="flex-1 h-[42px] inline-flex items-center justify-center gap-2 border border-slate-200 rounded-[10px] bg-white text-slate-600 text-sm font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] hover:border-[#07c160] hover:text-[#07c160]"
        @click="emit('wechat')"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.41C7.36 15.89 8.15 16 9 16c.18 0 .35 0 .53-.02C9.28 15.4 9.13 14.71 9.13 14c0-3.31 3.13-6 7-6 .56 0 1.1.06 1.62.17C16.95 5.9 13.66 4 9.5 4zm-2.5 5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 5c-3.04 0-5.5 2.06-5.5 4.6 0 2.54 2.46 4.6 5.5 4.6.71 0 1.39-.11 2.02-.31L20.5 23l-.59-1.99C20.95 19.78 22 18.5 22 17c0-2.54-2.46-4.6-5.5-4.6zm-2.5 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/></svg>
        微信
      </button>
      <button
        type="button"
        class="flex-1 h-[42px] inline-flex items-center justify-center gap-2 border border-slate-200 rounded-[10px] bg-white text-slate-600 text-sm font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(15,23,42,0.08)] hover:border-[#12b7f5] hover:text-[#12b7f5]"
        @click="emit('qq')"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5c-1.46 0-2.79-.55-3.78-1.44.17-.85.62-1.65 1.27-2.25-.38-.07-.74-.21-1.07-.42-.31 1.08-.04 2.23.72 3.05-.86.52-1.92.82-3.05.82-.34 0-.67-.03-1-.09.72 1.28 2.08 2.16 3.64 2.16.85 0 1.65-.25 2.33-.69.34.06.69.09 1.04.09 2.21 0 4-1.79 4-4 0-.18-.02-.35-.05-.52.67-.36 1.22-.91 1.55-1.58-.6.27-1.25.42-1.93.42-.23 0-.45-.02-.67-.06.33-.59.52-1.27.52-2 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 .73.19 1.41.52 2-.22.04-.44.06-.67.06z"/></svg>
        QQ
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '其他登录方式' },
  compact: { type: Boolean, default: false }
})
const emit = defineEmits(['wechat', 'qq'])
</script>

