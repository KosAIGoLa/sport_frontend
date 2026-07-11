/** 充值页 mock 配置 */

export const RECHARGE_AMOUNT_OPTIONS = [
  { value: 6, price: 6, bonus: 0 },
  { value: 30, price: 30, bonus: 0 },
  { value: 10000, price: 10000, bonus: 300 },
  { value: 20000, price: 20000, bonus: 600 },
  { value: 30000, price: 30000, bonus: 900 },
  { value: 50000, price: 50000, bonus: 2500 }
]

export const RECHARGE_PAYMENT_METHODS = [
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
