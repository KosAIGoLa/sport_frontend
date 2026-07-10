<template>
  <div class="recharge-page">
    <SiteHeader :is-logged-in="isLoggedIn" @login="openLogin" @logout="handleLogout" />
    <main class="recharge-main">
      <aside class="recharge-sidebar">
        <div class="recharge-sidebar__item active">鹅肝充值</div>
      </aside>
      <div class="recharge-content">
        <h1 class="recharge-title">鹅肝充值</h1>
        <div class="recharge-section">
          <div class="recharge-account">
            <span class="recharge-label">充值账户：</span>
            <span class="recharge-account__box">
              <span class="recharge-account__name">企鹅玩家Kc2hl9</span>
              <span class="recharge-account__balance">（鹅肝余额0.00）</span>
            </span>
            <span class="recharge-account__tip">或者为 <a href="javascript:;">其它账户充值</a></span>
          </div>
        </div>

        <div class="recharge-section">
          <div class="recharge-row">
            <span class="recharge-label">充值金额：</span>
            <div class="recharge-options">
              <div
                v-for="item in amountOptions"
                :key="item.value"
                class="recharge-option"
                :class="{ 'recharge-option--active': selectedAmount === item.value && !customAmount }"
                @click="selectAmount(item.value)"
              >
                <span v-if="item.bonus" class="recharge-option__tag">赠送{{ item.bonus }}鹅肝</span>
                <div class="recharge-option__amount">{{ item.value }}<small>鹅肝</small></div>
                <div class="recharge-option__price">{{ item.price }}元</div>
              </div>
              <div class="recharge-option recharge-option--custom" :class="{ 'recharge-option--active': customAmount }">
                <input
                  v-model.number="customAmount"
                  type="number"
                  min="0"
                  placeholder="0"
                  @focus="selectedAmount = 0"
                />
                <span class="recharge-option__unit">鹅肝</span>
              </div>
            </div>
          </div>
        </div>

        <div class="recharge-section">
          <div class="recharge-row">
            <span class="recharge-label">充值方式：</span>
            <div class="recharge-methods">
              <div
                v-for="method in paymentMethods"
                :key="method.key"
                class="recharge-method"
                :class="{ 'recharge-method--active': selectedMethod === method.key }"
                @click="selectedMethod = method.key"
              >
                <svg class="recharge-method__icon" viewBox="0 0 32 32" fill="none" v-html="method.icon" />
                <span>{{ method.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="recharge-section">
          <div class="recharge-payable">
            <span class="recharge-label">应付金额：</span>
            <span class="recharge-payable__amount">{{ payableAmount }}</span>
            <span class="recharge-payable__unit">元</span>
          </div>
        </div>

        <div class="recharge-section">
          <button type="button" class="recharge-submit" @click="handleRecharge">立即充值</button>
        </div>

        <div class="recharge-reward">
          <svg class="recharge-reward__icon" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="18" width="36" height="24" rx="3" fill="#ffd666"/>
            <rect x="6" y="18" width="36" height="8" rx="3" fill="#ffec99"/>
            <rect x="21" y="14" width="6" height="28" fill="#ff9c6e"/>
            <path d="M18 14c-4 0-8-4-8-8s4-6 8-4c4 3 4 8 0 12z" fill="#ff9c6e"/>
            <path d="M30 14c4 0 8-4 8-8s-4-6-8-4c-4 3-4 8 0 12z" fill="#ff9c6e"/>
            <circle cx="24" cy="26" r="4" fill="#fff" opacity="0.6"/>
          </svg>
          <div class="recharge-reward__text">
            <div><span class="recharge-reward__badge">!</span> 充值奖励 每次充值均可获得</div>
            <div class="recharge-reward__desc">每次充值将赠送同等数量经验（例如充100元获得100经验）</div>
          </div>
        </div>
      </div>
    </main>
    <SiteFooter />
    <LoginModal v-if="loginVisible" @close="loginVisible = false" @success="handleLogin" />
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'

const { isLoggedIn, login, logout } = useAuth()
const loginVisible = ref(false)

const amountOptions = [
  { value: 6, price: 6, bonus: 0 },
  { value: 30, price: 30, bonus: 0 },
  { value: 10000, price: 10000, bonus: 300 },
  { value: 20000, price: 20000, bonus: 600 },
  { value: 30000, price: 30000, bonus: 900 },
  { value: 50000, price: 50000, bonus: 2500 }
]

const selectedAmount = ref(6)
const customAmount = ref(null)
const selectedMethod = ref('wechat')

const paymentMethods = [
  {
    key: 'wechat',
    label: '微信支付',
    icon: '<circle cx="16" cy="16" r="14" fill="#22c55e"/><path d="M9 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-9.7 4.5c0 2.5 2.4 4.5 5.2 4.5 2.9 0 5.2-2 5.2-4.5" stroke="white" stroke-width="2.2" stroke-linecap="round" fill="none"/>'
  },
  {
    key: 'alipay',
    label: '支付宝',
    icon: '<circle cx="16" cy="16" r="14" fill="#1677ff"/><text x="16" y="21" text-anchor="middle" fill="white" font-size="13" font-weight="bold">支</text>'
  },
  {
    key: 'unionpay',
    label: '银联支付',
    icon: '<rect x="3" y="8" width="26" height="16" rx="2" fill="#c41e3a"/><rect x="3" y="14" width="26" height="4" fill="#00558c"/><rect x="3" y="18" width="26" height="6" rx="2" fill="#0a6b30"/><text x="16" y="15" text-anchor="middle" fill="white" font-size="6" font-weight="bold" letter-spacing="0.5">UnionPay</text>'
  }
]

const payableAmount = computed(() => {
  return customAmount.value || selectedAmount.value
})

function selectAmount(value) {
  selectedAmount.value = value
  customAmount.value = null
}

function openLogin() {
  loginVisible.value = true
}

function handleLogin() {
  login()
  loginVisible.value = false
}

function handleLogout() {
  logout()
}

function handleRecharge() {
  alert(`确认使用${paymentMethods.find(m => m.key === selectedMethod.value).label}支付 ${payableAmount.value} 元`)
}
</script>

<style scoped>
.recharge-page {
  @apply min-h-screen bg-[#f8f9fc];
  background-image: radial-gradient(circle at 8% 0%, rgba(255, 77, 79, 0.04), transparent 30%), radial-gradient(circle at 92% 0%, rgba(22, 119, 255, 0.04), transparent 30%);
}
.recharge-main {
  @apply w-[1200px] mx-auto mt-6 mb-12 flex gap-6;
}
.recharge-sidebar {
  @apply w-[180px] bg-white rounded-xl shadow-sm overflow-hidden shrink-0;
}
.recharge-sidebar__item {
  @apply h-12 px-5 flex items-center text-sm text-[#555] font-medium cursor-pointer border-l-4 border-transparent transition-colors;
}
.recharge-sidebar__item.active,
.recharge-sidebar__item:hover {
  @apply bg-[#fff5f5] text-[#ff4d4f] border-[#ff4d4f];
}
.recharge-content {
  @apply flex-1 bg-white rounded-xl shadow-sm p-8;
}
.recharge-title {
  @apply text-2xl font-extrabold text-[#111827] mb-2;
}
.recharge-section {
  @apply py-6 border-b border-gray-100;
}
.recharge-section:first-of-type {
  @apply pt-0;
}
.recharge-section:last-of-type {
  @apply border-b-0 pb-0;
}
.recharge-label {
  @apply inline-block text-sm text-[#666] font-medium w-20 shrink-0;
}
.recharge-account {
  @apply flex items-center flex-wrap gap-3;
}
.recharge-account__box {
  @apply h-9 px-3 flex items-center gap-2 border border-gray-200 rounded-lg text-sm bg-[#fafafa];
}
.recharge-account__name {
  @apply text-[#333];
}
.recharge-account__balance {
  @apply text-[#999];
}
.recharge-account__tip {
  @apply text-sm text-[#999];
}
.recharge-account__tip a {
  @apply text-[#ff4d4f] no-underline hover:underline;
}
.recharge-row {
  @apply flex items-start gap-4;
}
.recharge-options {
  @apply flex flex-wrap gap-3;
}
.recharge-option {
  @apply relative w-[120px] h-[78px] border border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all hover:border-[#ff4d4f] hover:shadow-[0_4px_12px_rgba(255,77,79,0.08)];
}
.recharge-option--active {
  @apply border-[#ff4d4f] bg-[#fff5f5] shadow-[0_4px_12px_rgba(255,77,79,0.12)];
}
.recharge-option--active::before {
  @apply content-[''] absolute right-2 top-2 w-3.5 h-3.5 rounded-full bg-[#ff4d4f];
}
.recharge-option--active::after {
  @apply content-[''] absolute right-[11px] top-[11px] w-1.5 h-2.5 border-r-2 border-b-2 border-white rotate-45;
}
.recharge-option__tag {
  @apply absolute -top-px -right-px px-1.5 py-0.5 text-[10px] text-white bg-[#ff4d4f] rounded-bl-lg rounded-tr-lg;
}
.recharge-option__amount {
  @apply text-xl font-extrabold text-[#333];
}
.recharge-option__amount small {
  @apply text-xs font-medium text-[#666] ml-0.5;
}
.recharge-option__price {
  @apply text-xs text-[#999] mt-1 font-medium;
}
.recharge-option--custom {
  @apply flex-row gap-2 px-3;
}
.recharge-option--custom input {
  @apply w-20 h-8 text-right text-sm font-bold border border-gray-200 rounded-lg px-2 outline-none focus:border-[#ff4d4f] focus:shadow-[0_0_0_3px_rgba(255,77,79,0.1)];
}
.recharge-option--custom.recharge-option--active input {
  @apply border-[#ff4d4f];
}
.recharge-option__unit {
  @apply text-sm text-[#333];
}
.recharge-methods {
  @apply flex gap-3;
}
.recharge-method {
  @apply h-11 px-4 flex items-center gap-2.5 border border-gray-200 rounded-xl text-sm text-[#333] cursor-pointer transition-all hover:border-[#ff4d4f] hover:bg-[#fff5f5];
}
.recharge-method--active {
  @apply border-[#ff4d4f] bg-[#fff5f5] font-semibold;
}
.recharge-method__icon {
  @apply w-6 h-6;
}
.recharge-payable {
  @apply flex items-baseline gap-1;
}
.recharge-payable__amount {
  @apply text-3xl text-[#ff4d4f] font-extrabold tracking-tight;
}
.recharge-payable__unit {
  @apply text-sm text-[#333] font-medium;
}
.recharge-submit {
  @apply h-12 px-10 rounded-xl bg-[#ff4d4f] text-white text-base font-bold border-0 cursor-pointer shadow-[0_8px_20px_rgba(255,77,79,0.3)] hover:bg-[#ff7875] hover:shadow-[0_10px_24px_rgba(255,77,79,0.38)] transition-all;
}
.recharge-reward {
  @apply mt-6 p-5 flex items-center gap-4 bg-[#fff8e8] border border-[#ffe4a1] rounded-xl;
}
.recharge-reward__icon {
  @apply w-12 h-12 shrink-0 drop-shadow-[0_4px_8px_rgba(212,160,23,0.2)];
}
.recharge-reward__text {
  @apply text-sm text-[#d4a017] font-medium;
}
.recharge-reward__badge {
  @apply inline-flex w-4 h-4 items-center justify-center rounded-full bg-[#d4a017] text-white text-xs font-bold mr-1;
}
.recharge-reward__desc {
  @apply mt-1 text-xs text-[#b8860b];
}
@media (max-width: 768px) {
  .recharge-main {
    @apply w-full mt-4 px-4 flex-col;
  }
  .recharge-sidebar {
    @apply w-full;
  }
  .recharge-content {
    @apply p-4;
  }
  .recharge-row {
    @apply flex-col gap-2;
  }
  .recharge-options {
    @apply w-full;
  }
  .recharge-option {
    @apply flex-1 min-w-[100px];
  }
}
</style>
