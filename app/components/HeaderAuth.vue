<template>
  <DesktopOnly tag="div" class="header-auth">
    <template v-if="!isLoggedIn">
      <button type="button" class="header-auth__login" @click="$emit('login', 'login')">{{ t('auth.login') }}</button>
      <button type="button" class="header-auth__register" @click="$emit('login', 'register')">{{ t('auth.register') }}</button>
    </template>
    <UserAvatarWithMenu v-else :count="count" @logout="$emit('logout')" />
  </DesktopOnly>
</template>

<script setup>
const { t } = useI18n()

defineProps({
  isLoggedIn: { type: Boolean, default: false },
  count: { type: Number, default: 0 }
})
defineEmits(['login', 'logout'])
</script>

<style scoped>
.header-auth {
  @apply ml-auto flex items-center gap-2.5;
}
.header-auth__login,
.header-auth__register {
  @apply appearance-none h-[34px] px-3.5 border border-slate-200/[0.9] rounded-full bg-white/[0.72] text-[#111827] text-sm font-bold cursor-pointer transition-all duration-200;
}
.header-auth__login:hover,
.header-auth__register:hover {
  @apply border-[rgba(255,194,28,0.8)] bg-[#fff7d6];
}
.header-auth__login::before {
  @apply content-[''] inline-block w-2 h-2 mr-1.5 bg-green-500 rounded-full align-[1px] shadow-[0_0_0_5px_rgba(34,197,94,0.12)];
}
</style>
