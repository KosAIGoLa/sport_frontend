<template>
  <div v-if="visible" class="header-modal" @click.self="close">
    <div class="login-window header-window" :class="{ register: mode === 'register' }">
      <div class="modal-glow modal-glow-1"></div>
      <div class="modal-glow modal-glow-2"></div>
      <div class="modal-top-deco"></div>
      <img class="close" src="/assets/ui/close.png" alt="" @click="close">
      <div class="window-inner">
        <MobileOnly tag="button" type="button" class="mobile-back" @click="close" :aria-label="t('nav.home')">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
        </MobileOnly>
        <div class="modal-header">
          <DesktopOnly tag="div" class="modal-tabs">
            <button type="button" :class="{ active: mode === 'login' }" @click="mode = 'login'">{{ t('auth.login') }}</button>
            <button type="button" :class="{ active: mode === 'register' }" @click="mode = 'register'">{{ t('auth.register') }}</button>
          </DesktopOnly>
          <DesktopOnly tag="div" class="modal-accent">{{ mode === 'login' ? t('auth.welcomeBack') : t('auth.createAccount') }}</DesktopOnly>
        </div>
        <div class="type-content">
          <div class="phone-box">
            <div class="phone-input-wrapper">
              <FormInput
                v-model="phone"
                type="tel"
                :placeholder="t('auth.phonePlaceholder')"
                maxlength="11"
                icon="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
                :compact="mode === 'register'"
              >
                <template #prefix>
                  <div class="country-code-box" @click="showCountry = !showCountry">
                    <span class="country-code">+86</span>
                    <span class="triangle"></span>
                  </div>
                </template>
              </FormInput>
              <div v-if="showCountry" class="country-code-list">
                <ul>
                  <li class="country-code-title"><h4>热门</h4></li>
                  <li class="country-code-item" @click="selectCode('+86')"><span class="country-name">中国大陆</span><span class="country-dial">+86</span></li>
                  <li class="country-code-item" @click="selectCode('+852')"><span class="country-name">中国香港</span><span class="country-dial">+852</span></li>
                  <li class="country-code-item" @click="selectCode('+853')"><span class="country-name">中国澳门</span><span class="country-dial">+853</span></li>
                  <li class="country-code-item" @click="selectCode('+886')"><span class="country-name">中国台湾</span><span class="country-dial">+886</span></li>
                </ul>
              </div>
            </div>
            <div class="error-tip" v-if="phoneError">{{ phoneError }}</div>
          </div>
          <div class="verify-box" v-if="mode === 'register'">
            <FormInput
              v-model="verifyCode"
              type="tel"
              :placeholder="t('auth.codePlaceholder')"
              maxlength="4"
              icon="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              compact
            >
              <template #suffix>
                <div class="btn-verify" @click="getVerify">{{ counting ? count + 's' : t('auth.getCode') }}</div>
              </template>
            </FormInput>
            <div class="error-tip"></div>
          </div>
          <div class="nickname-box" v-if="mode === 'register'">
            <FormInput
              type="text"
              :placeholder="t('auth.usernamePlaceholder')"
              maxlength="15"
              icon="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              compact
            />
            <div class="error-tip"></div>
          </div>
          <div class="password-box">
            <FormInput
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              :placeholder="t('auth.passwordPlaceholder')"
              maxlength="16"
              icon="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"
              :compact="mode === 'register'"
            >
              <template #suffix>
                <div class="eye" @click="showPassword = !showPassword">
                  <svg v-if="showPassword" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                  <svg v-else viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.1 2.1C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l2.87 2.87L21 19.73 4.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55C13.97 16.44 13.02 16.71 12 16.71c-2.76 0-5-2.24-5-5 0-1.02.27-1.97.71-2.8l-.18-.11z"/></svg>
                </div>
              </template>
            </FormInput>
            <div class="error-tip" v-if="passwordError">{{ passwordError }}</div>
          </div>
          <div class="check-box" v-if="mode === 'register'">
            <FormInput
              type="text"
              :placeholder="t('auth.captchaPlaceholder')"
              maxlength="5"
              icon="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              compact
            />
            <div class="error-tip"></div>
          </div>
          <div class="agreement" v-if="mode === 'register'">
            <div class="agreement-row">
              <span class="gou" :class="{ active: agreed }" @click="agreed = !agreed"></span>
              <span>{{ t('auth.agreeRead') }}</span>
              <span class="highlight">{{ t('auth.userAgreement') }}</span>
            </div>
            <div class="error-tip" v-if="agreeError">{{ agreeError }}</div>
          </div>
          <div class="agreement" v-else>
            <div class="agreement-row">
              <span class="gou" :class="{ active: agreed }" @click="agreed = !agreed"></span>
              <span>{{ t('auth.loginAgree') }}</span>
              <span class="highlight">{{ t('auth.userAgreement') }}</span>
              <span class="forget">{{ t('auth.forgotPassword') }}</span>
            </div>
          </div>
          <div class="bottom">
            <div class="submit" :class="{ active: canSubmit }" @click="submit">{{ mode === 'register' ? t('auth.submitRegister') : t('auth.submitLogin') }}</div>
            <div class="bottom-hint">
              <span v-if="mode === 'login'">{{ t('auth.noAccount') }}<span class="login-jump" @click="mode = 'register'">{{ t('auth.goRegister') }}</span></span>
              <span v-else>{{ t('auth.hasAccount') }}<span class="login-jump" @click="mode = 'login'">{{ t('auth.goLogin') }}</span></span>
            </div>
            <MobileOnly v-if="mode === 'login'" tag="div" class="mobile-bottom-actions">
              <button type="button" class="mobile-link-btn">{{ t('auth.forgotPassword') }}</button>
              <button type="button" class="mobile-link-btn mobile-link-btn--primary" @click="mode = 'register'">{{ t('auth.quickRegister') }}</button>
            </MobileOnly>
          </div>
          <SocialLogin :label="t('auth.otherLogin')" :compact="mode === 'register'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()
const props = defineProps({
  visible: { type: Boolean, default: false },
  type: { type: String, default: 'login' }
})
const emit = defineEmits(['update:visible', 'success'])

const mode = ref(props.type)
watch(() => props.type, (val) => { mode.value = val })
watch(() => props.visible, (val) => { if (val) mode.value = props.type })

const phone = ref('')
const password = ref('')
const verifyCode = ref('')
const showPassword = ref(false)
const agreed = ref(false)
const showCountry = ref(false)
const phoneError = ref('')
const passwordError = ref('')
const agreeError = ref('')
const counting = ref(false)
const count = ref(60)

function close() {
  emit('update:visible', false)
}
function selectCode(code) {
  showCountry.value = false
}
function getVerify() {
  if (counting.value) return
  if (!phone.value) {
    phoneError.value = t('auth.phoneRequired')
    return
  }
  counting.value = true
  count.value = 60
  const timer = setInterval(() => {
    count.value--
    if (count.value <= 0) {
      clearInterval(timer)
      counting.value = false
    }
  }, 1000)
}
const canSubmit = computed(() => {
  return phone.value && password.value && (mode.value === 'login' || agreed.value)
})
function submit() {
  phoneError.value = ''
  passwordError.value = ''
  agreeError.value = ''
  if (!phone.value) phoneError.value = t('auth.phoneRequired')
  if (!password.value) passwordError.value = t('auth.passwordRequired')
  if (mode.value === 'register' && !agreed.value) agreeError.value = t('auth.agreeRequired')
  if (canSubmit.value) {
    emit('success')
    close()
  }
}
</script>

<style scoped>
.header-modal {
  @apply fixed w-full h-full left-0 top-0 bg-[rgba(15,23,42,0.65)] backdrop-blur-[12px] z-[101] flex items-center justify-center animate-[fadeIn_0.25s_ease];
}
.mobile-back {
  @apply hidden;
}
.login-window {
  @apply relative w-[420px] bg-white rounded-[24px] shadow-[0_24px_80px_rgba(0,0,0,0.22)] overflow-hidden animate-[slideUp_0.35s_ease];
}
.login-window.register .window-inner {
  @apply py-7 px-9 pb-[34px];
}
.login-window.register .modal-header {
  @apply mb-[22px];
}
.login-window.register .error-tip {
  @apply min-h-[16px] my-1 mb-1.5;
}
.login-window.register .agreement {
  @apply mt-2.5;
}
.login-window.register .bottom {
  @apply mt-[18px];
}
.login-window.register .submit {
  @apply h-11 leading-[44px];
}
.modal-top-deco {
  @apply absolute top-0 left-0 right-0 h-1.5 bg-[linear-gradient(90deg,#f59e0b_0%,#fbbf24_50%,#f59e0b_100%)] bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite] z-[1];
}
.modal-glow {
  @apply absolute rounded-full blur-[60px] opacity-[0.18] pointer-events-none z-0;
}
.modal-glow-1 {
  @apply w-[180px] h-[180px] -top-[60px] -right-[50px] bg-amber-400;
}
.modal-glow-2 {
  @apply w-[140px] h-[140px] -bottom-[40px] -left-[40px] bg-blue-400;
}
.close {
  @apply absolute top-[18px] right-[18px] w-[18px] h-[18px] cursor-pointer opacity-[0.55] z-10 transition-[opacity,transform] duration-200;
}
.close:hover {
  @apply opacity-100 rotate-90;
}
.window-inner {
  @apply relative z-[2] py-[38px] px-10 pb-[42px];
}
.modal-header {
  @apply mb-8;
}
.modal-tabs {
  @apply flex items-center gap-7 border-b-2 border-slate-100;
}
.modal-tabs button {
  @apply relative border-0 bg-transparent px-1 pb-3.5 text-slate-400 text-xl font-bold cursor-pointer transition-colors duration-200;
}
.modal-tabs button.active {
  @apply text-slate-900;
}
.modal-tabs button.active::after {
  @apply content-[''] absolute left-0 -bottom-0.5 w-full h-[3px] rounded-full bg-[linear-gradient(90deg,#f59e0b_0%,#fbbf24_100%)];
}
.modal-accent {
  @apply mt-[18px] text-slate-500 text-[13px] leading-[1.5];
}
.phone-input-wrapper {
  @apply relative;
}
.country-code-box {
  @apply inline-flex items-center cursor-pointer mr-2.5 pr-2.5 border-r border-slate-200 text-sm text-slate-900 font-semibold whitespace-nowrap;
}
.triangle {
  @apply inline-block w-0 h-0 border-l-4 border-r-4 border-t-[5px] border-l-transparent border-r-transparent border-t-amber-500 ml-[5px];
}
.country-code-list {
  @apply absolute top-[calc(100%+6px)] left-0 w-full max-h-[205px] z-[103] bg-white overflow-y-auto shadow-[0_12px_32px_rgba(15,23,42,0.12)] rounded-xl border border-slate-100 py-2;
}
.country-code-list ul {
  @apply text-sm cursor-pointer list-none m-0 p-0;
}
.country-code-list li {
  @apply h-10 leading-10 px-[18px] flex justify-between transition-colors duration-150;
}
.country-code-list li:hover {
  @apply bg-slate-50;
}
.country-code-title {
  @apply cursor-default bg-white font-bold text-slate-500 text-xs uppercase tracking-[0.5px];
}
.eye {
  @apply cursor-pointer w-5 h-5 text-slate-400 transition-colors duration-200;
}
.eye:hover {
  @apply text-amber-500;
}
.eye svg {
  @apply w-full h-full;
}
.error-tip {
  @apply w-full min-h-[20px] text-xs text-red-500 my-1.5 mb-2 leading-[1.4];
}
.btn-verify {
  @apply h-[34px] px-3 text-xs font-semibold text-center leading-[34px] bg-white border border-amber-400 rounded-lg cursor-pointer text-amber-500 transition-all duration-200 whitespace-nowrap;
}
.btn-verify:hover {
  @apply bg-amber-500 text-white;
}
.agreement {
  @apply text-[13px] leading-5 mt-[18px];
}
.agreement-row {
  @apply flex items-center gap-2 text-slate-600 flex-wrap;
}
.gou {
  @apply w-[18px] h-[18px] border border-slate-300 rounded-[5px] cursor-pointer inline-flex items-center justify-center transition-all duration-200 shrink-0;
}
.gou.active {
  @apply bg-amber-500 border-amber-500;
}
.gou.active::after {
  @apply content-[''] w-[5px] h-[9px] border-white border-0 border-r-2 border-b-2 rotate-45 -translate-x-px -translate-y-px;
}
.highlight {
  @apply text-amber-500 cursor-pointer font-semibold;
}
.forget {
  @apply ml-auto text-[13px] text-slate-500 cursor-pointer transition-colors duration-200;
}
.forget:hover {
  @apply text-amber-500;
}
.bottom {
  @apply mt-7;
}
.bottom-hint {
  @apply mt-4 text-center text-[13px] text-slate-500;
}
.login-jump {
  @apply cursor-pointer text-amber-500 font-bold ml-1 transition-colors duration-200;
}
.login-jump:hover {
  @apply text-amber-600;
}
.submit {
  @apply w-full h-[50px] bg-slate-200 rounded-xl text-center leading-[50px] text-base font-bold text-slate-400 cursor-not-allowed transition-all duration-200;
}
.submit.active {
  @apply text-white bg-[linear-gradient(135deg,#f59e0b_0%,#fbbf24_100%)] cursor-pointer shadow-[0_8px_24px_rgba(251,191,36,0.35)];
}
.submit.active:hover {
  @apply -translate-y-0.5 shadow-[0_12px_30px_rgba(251,191,36,0.45)];
}

.mobile-bottom-actions {
  @apply hidden;
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 768px) {
  .header-modal {
    @apply inset-0 bg-white backdrop-blur-none items-stretch justify-stretch;
  }

  .login-window {
    @apply w-full min-h-screen rounded-none shadow-none animate-none overflow-auto;
  }

  .modal-glow,
  .modal-glow-1,
  .modal-glow-2,
  .modal-top-deco,
  .modal-tabs,
  .modal-accent,
  :deep(.social-login) {
    @apply hidden;
  }

  .close {
    @apply hidden;
  }

  .window-inner {
    @apply py-5 px-6 pb-[52px];
  }

  .mobile-back {
    @apply inline-flex items-center justify-center w-8 h-8 mb-11 border-0 bg-transparent text-[#111] p-0;
  }

  .mobile-back svg {
    @apply w-7 h-7 stroke-current stroke-[2.2] fill-none;
  }

  .modal-header {
    @apply mb-6;
  }

  .modal-header::before {
    @apply content-['登录'] block text-[30px] font-extrabold text-[#222] mb-[18px];
  }

  .phone-box,
  .password-box {
    @apply mb-[22px];
  }

  :deep(.form-input) {
    @apply h-[54px] p-0 border-0 border-b border-[#ececec] rounded-none bg-transparent shadow-none;
  }

  :deep(.form-input.focused) {
    @apply border-transparent border-b-[#ececec] bg-transparent shadow-none;
  }

  :deep(.form-input-icon) {
    @apply hidden;
  }

  :deep(.form-input input) {
    @apply text-[15px] text-[#222] placeholder:text-[#9a9a9a];
  }

  .type-content {
    @apply pt-0;
  }

  .agreement {
    @apply my-1 mb-[30px];
  }

  .agreement-row {
    @apply items-center text-[#9a9a9a] text-[11px] gap-1.5;
  }

  .agreement-row .gou {
    @apply hidden;
  }

  .agreement-row .highlight {
    @apply text-[#f5b719];
  }

  .agreement-row .forget {
    @apply hidden;
  }

  .submit {
    @apply h-[58px] leading-[58px] rounded-full bg-[#eef1f7] text-[#b8c2cf] shadow-none text-[17px] font-extrabold;
  }

  .submit.active {
    @apply bg-[linear-gradient(135deg,#ffe178_0%,#ffc21c_100%)] text-[#111827];
  }

  .bottom {
    @apply mt-0;
  }

  .bottom-hint {
    @apply hidden;
  }

  .mobile-bottom-actions {
    @apply mt-[34px] flex items-center justify-between;
  }

  .mobile-link-btn {
    @apply border-0 bg-transparent p-0 text-[#333] text-sm font-medium;
  }

  .mobile-link-btn--primary {
    @apply font-bold;
  }
}
</style>
