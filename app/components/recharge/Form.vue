<template>
  <div class="recharge-content">
    <h1 class="recharge-title">鹅肝充值</h1>

    <div class="recharge-section">
      <div class="recharge-account">
        <span class="recharge-label">充值账户：</span>
        <span class="recharge-account__box">
          <span class="recharge-account__name">{{ accountName }}</span>
          <span class="recharge-account__balance">（鹅肝余额{{ balance }}）</span>
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
              v-model.number="customAmountLocal"
              type="number"
              min="0"
              placeholder="0"
              @focus="selectedAmount = 0"
            >
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
      <button type="button" class="recharge-submit" @click="handleSubmit">立即充值</button>
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
</template>

<script setup>
const props = defineProps({
  accountName: { type: String, default: '企鹅玩家Kc2hl9' },
  balance: { type: [String, Number], default: '0.00' },
  amountOptions: { type: Array, required: true },
  paymentMethods: { type: Array, required: true }
})

const selectedAmount = ref(6)
const customAmountLocal = ref(null)
const selectedMethod = ref('wechat')

const customAmount = computed(() => customAmountLocal.value)
const payableAmount = computed(() => customAmountLocal.value || selectedAmount.value)

function selectAmount(value) {
  selectedAmount.value = value
  customAmountLocal.value = null
}

function handleSubmit() {
  const method = props.paymentMethods.find(m => m.key === selectedMethod.value)
  alert(`确认使用${method?.label || ''}支付 ${payableAmount.value} 元`)
}
</script>
