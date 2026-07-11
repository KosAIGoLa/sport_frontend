<template>
  <div class="user-menu" :class="`user-menu--tail-${tailAlign}`">
    <div class="user-menu__top">
      <img class="user-menu__avatar" src="https://uc2.qiecdn.com/avatar.php?uid=28030520&size=middle&force=1" alt="avatar" @error="e => e.target.src = '/assets/avatars/frog-avatar.png'">
      <div class="user-menu__info">
        <div class="user-menu__row">
          <span class="user-menu__name">企鹅玩家Kc2hl9</span>
          <button type="button" class="user-menu__logout" @click="$emit('logout')">退出</button>
        </div>
        <div class="user-menu__badges">
          <span class="user-menu__badge-label">奖牌</span>
          <span v-for="(medal, idx) in medals" :key="idx" class="user-menu__badge" :class="`user-menu__badge--${medal.type}`">
            <svg v-if="medal.type === 'shield'" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 6v8c0 6 3.5 10 8 12 4.5-2 8-6 8-12V6l-8-4z" :fill="medal.bg" stroke="#9ca3af" stroke-width="1.5"/>
              <text x="12" y="17" text-anchor="middle" fill="white" font-size="8" font-weight="bold">{{ medal.text }}</text>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" :fill="medal.bg" stroke="#9ca3af" stroke-width="1.5"/>
              <text x="12" y="15.5" text-anchor="middle" fill="white" font-size="8" font-weight="bold">{{ medal.text }}</text>
            </svg>
          </span>
        </div>
        <div class="user-menu__level">
          <span class="user-menu__lv">LV.1</span>
          <div class="user-menu__progress"><span style="width: 0%"></span></div>
          <span class="user-menu__percent">0%</span>
        </div>
      </div>
    </div>

    <div class="user-menu__wealth">
      <div class="user-menu__wealth-title">我的财富：</div>
      <div class="user-menu__wealth-row">
        <div class="user-menu__asset">
          <IconLiver icon-class="user-menu__liver" />
          <span>0.00</span>
        </div>
        <div class="user-menu__asset">
          <IconEgg icon-class="user-menu__egg" />
          <span>0</span>
        </div>
        <a class="user-menu__recharge" href="/recharge.html" @click.prevent="appNavigate('/recharge.html')">充值</a>
      </div>
    </div>

    <div class="user-menu__actions">
      <a
        v-for="item in actions"
        :key="item.label"
        :href="item.to"
        class="user-menu__action"
        :class="{ 'user-menu__action--active': item.active }"
        @click.prevent="appNavigate(item.to)"
      >
        <IconFollow v-if="item.iconComponent" icon-class="user-menu__action-icon" />
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="item.icon"/>
        <span>{{ item.label }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import IconFollow from '~/components/icon/IconFollow.vue'
import IconLiver from '~/components/icon/IconLiver.vue'
import IconEgg from '~/components/icon/IconEgg.vue'

const { appNavigate } = useAppNavigate()

const icons = {
  user: `<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>`,
  message: `<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 7l10 7 10-7"/>`,
  camera: `<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>`
}

const actions = [
  { label: '个人中心', icon: icons.user, to: '/user.html?menu=profile', active: false },
  { label: '我的关注', iconComponent: IconFollow, to: '/user.html?menu=follow', active: false },
  { label: '我的消息', icon: icons.message, to: '/user.html?menu=message', active: false },
  { label: '申请直播', icon: icons.camera, to: '/user.html?menu=profile&tab=realname', active: false }
]

const medals = [
  { type: 'circle', text: '76', bg: '#ed1c24' },
  { type: 'circle', text: 'LAL', bg: '#552583' },
  { type: 'shield', text: '最佳', bg: '#6b7280' },
  { type: 'circle', text: 'DEN', bg: '#0e2240' },
  { type: 'shield', text: 'MVP', bg: '#f59e0b' },
  { type: 'circle', text: 'POR', bg: '#e03a3e' }
]

defineProps({
  tailAlign: { type: String, default: 'right' }
})
defineEmits(['logout'])
</script>

<style scoped>
.user-menu {
  @apply relative w-[320px] bg-white rounded-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] p-4 text-[#333] select-none;
}
.user-menu::before {
  @apply content-[''] absolute -top-2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-white;
}
.user-menu--tail-right::before {
  @apply right-5;
}
.user-menu--tail-center::before {
  @apply left-1/2 -translate-x-1/2;
}
.user-menu__top {
  @apply flex gap-3 pb-3 border-b border-gray-100;
}
.user-menu__avatar {
  @apply w-[64px] h-[64px] rounded-full object-cover shrink-0 ring-2 ring-white shadow-md;
}
.user-menu__info {
  @apply flex-1 min-w-0;
}
.user-menu__row {
  @apply flex items-center justify-between mb-2;
}
.user-menu__name {
  @apply text-base font-bold truncate;
}
.user-menu__logout {
  @apply text-xs text-gray-400 bg-transparent border-0 cursor-pointer hover:text-[#f8c21b];
}
.user-menu__badges {
  @apply flex items-center gap-1 mb-2;
}
.user-menu__badge-label {
  @apply text-sm text-gray-600 mr-1;
}
.user-menu__badge {
  @apply w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden;
}
.user-menu__badge--shield {
  @apply h-7 rounded-md bg-transparent;
}
.user-menu__badge svg {
  @apply w-full h-full;
}
.user-menu__level {
  @apply flex items-center gap-2 text-xs;
}
.user-menu__lv {
  @apply px-1.5 py-0.5 rounded-full bg-[#90ee90] text-white font-bold;
}
.user-menu__progress {
  @apply flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden;
}
.user-menu__progress span {
  @apply block h-full bg-[#f8c21b] rounded-full;
}
.user-menu__percent {
  @apply text-gray-400 w-8 text-right;
}
.user-menu__wealth {
  @apply py-3 border-b border-gray-100;
}
.user-menu__wealth-title {
  @apply text-sm text-gray-500 mb-2;
}
.user-menu__wealth-row {
  @apply flex items-center justify-between;
}
.user-menu__asset {
  @apply flex items-center gap-1.5 text-sm font-semibold;
}
.user-menu__liver {
  @apply w-4 h-4;
}
.user-menu__egg {
  @apply w-4 h-4;
}
.user-menu__recharge {
  @apply inline-flex items-center h-7 px-4 rounded-full bg-red-500 text-white text-xs font-bold no-underline cursor-pointer;
}
.user-menu__actions {
  @apply grid grid-cols-4 gap-1 pt-3;
}
.user-menu__action {
  @apply flex flex-col items-center gap-1 text-xs text-gray-500 no-underline cursor-pointer;
}
.user-menu__action:hover,
.user-menu__action--active {
  @apply text-red-500;
}
.user-menu__action svg {
  @apply w-5 h-5;
}
</style>
