<template>
  <div class="recharge-page">
    <main class="recharge-main">
      <RechargeSidebar v-model="activeMenu" />
      <RechargeForm
        :amount-options="RECHARGE_AMOUNT_OPTIONS"
        :payment-methods="RECHARGE_PAYMENT_METHODS"
      />
    </main>
  </div>
</template>

<script setup>
import { RECHARGE_AMOUNT_OPTIONS, RECHARGE_PAYMENT_METHODS } from '~/data/recharge'

definePageMeta({
  path: '/recharge.html',
  layout: 'default',
  siteHeader: true,
  forceSolid: false,
  mobileBar: false,
  layoutClass: 'recharge-layout'
})

const { t } = useI18n()
useHead(() => ({
  title: t('page.titleRecharge')
}))

const activeMenu = ref('liver')
</script>

<style src="~/assets/css/pages/recharge.css"></style>
