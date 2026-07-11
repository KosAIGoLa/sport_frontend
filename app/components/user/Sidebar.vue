<template>
  <aside class="user-sidebar">
    <nav class="user-sidebar-nav">
      <a
        v-for="item in menu"
        :key="item.key"
        href="javascript:;"
        :class="{ active: isActive(item.key) }"
        @click.prevent="$emit('select', item)"
      >
        <svg v-if="item.path" class="menu-icon" viewBox="0 0 24 24" fill="currentColor">
          <path :d="item.path" />
        </svg>
        <component :is="item.component" v-else-if="item.component" icon-class="menu-icon" />
        <span>{{ item.label }}</span>
      </a>
    </nav>
    <button type="button" class="apply-live-sidebar-btn" @click="$emit('apply-live')">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
      </svg>
      申请直播
    </button>
  </aside>
</template>

<script setup>
defineProps({
  menu: { type: Array, required: true },
  isActive: { type: Function, required: true }
})
defineEmits(['select', 'apply-live'])
</script>
