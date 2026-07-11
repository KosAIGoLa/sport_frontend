<template>
  <div class="medal-panel">
    <div class="medal-tabs">
      <button type="button" :class="{ active: mainTab === 'limited' }" @click="$emit('update:mainTab', 'limited')">限时活动</button>
      <button type="button" :class="{ active: mainTab === 'site' }" @click="$emit('update:mainTab', 'site')">全站活动</button>
      <a class="medal-rule" href="javascript:;">佩戴规则</a>
    </div>
    <div class="medal-filters">
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        :class="{ active: activeFilter === filter }"
        @click="$emit('update:activeFilter', filter)"
      >
        {{ filter }}
      </button>
    </div>
    <div class="medal-grid">
      <div v-for="item in medals" :key="item.name" class="medal-card">
        <div class="medal-icon">
          <svg viewBox="0 0 64 80" fill="none">
            <path d="M32 4L6 14v24c0 18 11 34 26 38 15-4 26-20 26-38V14L32 4z" :fill="item.color" stroke="#9ca3af" stroke-width="2"/>
            <circle cx="32" cy="32" r="14" fill="#ffffff" stroke="#9ca3af" stroke-width="1.5"/>
          </svg>
          <span class="medal-icon-emoji">{{ item.icon }}</span>
          <span class="medal-icon-label">{{ item.name }}</span>
        </div>
        <a class="medal-guide" href="javascript:;">解锁攻略</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  mainTab: { type: String, default: 'limited' },
  activeFilter: { type: String, required: true },
  filters: { type: Array, required: true },
  medals: { type: Array, default: () => [] }
})
defineEmits(['update:mainTab', 'update:activeFilter'])
</script>
