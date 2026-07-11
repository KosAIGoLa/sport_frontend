<template>
  <div class="wealth-panel">
    <div class="wealth-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        :class="{ active: activeTab === tab.key }"
        @click="$emit('update:activeTab', tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="wealth-filter">
      <select :value="month" class="wealth-month-select" @change="$emit('update:month', $event.target.value)">
        <option value="本月">本月</option>
        <option value="上月">上月</option>
        <option value="最近三个月">最近三个月</option>
      </select>
    </div>
    <div class="wealth-table-wrap">
      <table class="wealth-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="empty-row">
            <td :colspan="columns.length">{{ emptyText }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tabs: { type: Array, required: true },
  activeTab: { type: String, required: true },
  month: { type: String, default: '本月' },
  columns: { type: Array, required: true },
  emptyText: { type: String, default: '--暂无消费记录--' }
})
defineEmits(['update:activeTab', 'update:month'])
</script>
