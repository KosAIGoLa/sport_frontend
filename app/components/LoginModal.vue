<template>
  <div v-if="visible" class="header-modal" @click.self="close">
    <div class="login-window header-window" :class="{ register: mode === 'register' }">
      <div class="modal-glow modal-glow-1"></div>
      <div class="modal-glow modal-glow-2"></div>
      <div class="modal-top-deco"></div>
      <img class="close" src="/assets/close.png" alt="" @click="close">
      <div class="window-inner">
        <button type="button" class="mobile-back" @click="close" aria-label="返回">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" /></svg>
        </button>
        <div class="modal-header">
          <div class="modal-tabs">
            <button type="button" :class="{ active: mode === 'login' }" @click="mode = 'login'">登录</button>
            <button type="button" :class="{ active: mode === 'register' }" @click="mode = 'register'">注册</button>
          </div>
          <div class="modal-accent">{{ mode === 'login' ? '欢迎回来，请登录您的账号' : '创建账号，开启精彩直播之旅' }}</div>
        </div>
        <div class="type-content">
          <div class="phone-box">
            <div class="phone-input-wrapper">
              <FormInput
                v-model="phone"
                type="tel"
                placeholder="请输入手机号码"
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
                  <li class="country-code-item" @click="selectCode('+86')"><span class="left">中国大陆</span><span class="right">+86</span></li>
                  <li class="country-code-item" @click="selectCode('+852')"><span class="left">中国香港</span><span class="right">+852</span></li>
                  <li class="country-code-item" @click="selectCode('+853')"><span class="left">中国澳门</span><span class="right">+853</span></li>
                  <li class="country-code-item" @click="selectCode('+886')"><span class="left">中国台湾</span><span class="right">+886</span></li>
                </ul>
              </div>
            </div>
            <div class="error-tip" v-if="phoneError">{{ phoneError }}</div>
          </div>
          <div class="verify-box" v-if="mode === 'register'">
            <FormInput
              v-model="verifyCode"
              type="tel"
              placeholder="获取并输入验证码"
              maxlength="4"
              icon="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              compact
            >
              <template #suffix>
                <div class="btn-verify" @click="getVerify">{{ counting ? count + 's' : '获取验证码' }}</div>
              </template>
            </FormInput>
            <div class="error-tip"></div>
          </div>
          <div class="nickname-box" v-if="mode === 'register'">
            <FormInput
              type="text"
              placeholder="请输入用户名"
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
              placeholder="请输入6-16位登录密码"
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
              placeholder="请输入图片上的验证码"
              maxlength="5"
              icon="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
              compact
            />
            <div class="error-tip"></div>
          </div>
          <div class="agreement" v-if="mode === 'register'">
            <div class="agreement-row">
              <span class="gou" :class="{ active: agreed }" @click="agreed = !agreed"></span>
              <span>我已阅读并同意</span>
              <span class="highlight">《用户服务协议》</span>
            </div>
            <div class="error-tip" v-if="agreeError">{{ agreeError }}</div>
          </div>
          <div class="agreement" v-else>
            <div class="agreement-row">
              <span class="gou" :class="{ active: agreed }" @click="agreed = !agreed"></span>
              <span>登录即代表你已同意</span>
              <span class="highlight">《用户服务协议》</span>
              <span class="forget">忘记密码</span>
            </div>
          </div>
          <div class="bottom">
            <div class="submit" :class="{ active: canSubmit }" @click="submit">{{ mode === 'register' ? '立即注册' : '立即登录' }}</div>
            <div class="bottom-hint">
              <span v-if="mode === 'login'">还没有账号？<span class="login-jump" @click="mode = 'register'">去注册</span></span>
              <span v-else>已有账号？<span class="login-jump" @click="mode = 'login'">去登录</span></span>
            </div>
            <div v-if="mode === 'login'" class="mobile-bottom-actions">
              <button type="button" class="mobile-link-btn">忘记密码</button>
              <button type="button" class="mobile-link-btn mobile-link-btn--primary" @click="mode = 'register'">快速注册</button>
            </div>
          </div>
          <SocialLogin label="其他登录方式" :compact="mode === 'register'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
    phoneError.value = '请输入手机号'
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
  if (!phone.value) phoneError.value = '请输入手机号'
  if (!password.value) passwordError.value = '请输入密码'
  if (mode.value === 'register' && !agreed.value) agreeError.value = '请仔细阅读并勾选协议'
  if (canSubmit.value) {
    emit('success')
    close()
  }
}
</script>

<style scoped>
.header-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(12px);
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.25s ease;
}

.mobile-back {
  display: none;
}
.login-window {
  position: relative;
  width: 420px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  animation: slideUp 0.35s ease;
}
.login-window.register .window-inner {
  padding: 28px 36px 34px;
}
.login-window.register .modal-header {
  margin-bottom: 22px;
}
.login-window.register .error-tip {
  min-height: 16px;
  margin: 4px 0 6px;
}
.login-window.register .agreement {
  margin-top: 10px;
}
.login-window.register .bottom {
  margin-top: 18px;
}
.login-window.register .submit {
  height: 44px;
  line-height: 44px;
}
.modal-top-deco {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 50%, #f59e0b 100%);
  background-size: 200% 100%;
  animation: shimmer 3s linear infinite;
  z-index: 1;
}
.modal-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.18;
  pointer-events: none;
  z-index: 0;
}
.modal-glow-1 {
  width: 180px;
  height: 180px;
  top: -60px;
  right: -50px;
  background: #fbbf24;
}
.modal-glow-2 {
  width: 140px;
  height: 140px;
  bottom: -40px;
  left: -40px;
  background: #60a5fa;
}
.close {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  opacity: 0.55;
  z-index: 10;
  transition: opacity 0.2s, transform 0.2s;
}
.close:hover {
  opacity: 1;
  transform: rotate(90deg);
}
.window-inner {
  position: relative;
  z-index: 2;
  padding: 38px 40px 42px;
}
.modal-header {
  margin-bottom: 32px;
}
.modal-tabs {
  display: flex;
  align-items: center;
  gap: 28px;
  border-bottom: 2px solid #f1f5f9;
}
.modal-tabs button {
  position: relative;
  border: 0;
  background: transparent;
  padding: 0 4px 14px;
  color: #94a3b8;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-tabs button.active {
  color: #0f172a;
}
.modal-tabs button.active::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%);
}
.modal-accent {
  margin-top: 18px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.5;
}
.phone-input-wrapper {
  position: relative;
}
.country-code-box {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  margin-right: 10px;
  padding-right: 10px;
  border-right: 1px solid #e2e8f0;
  font-size: 14px;
  color: #0f172a;
  font-weight: 600;
  white-space: nowrap;
}
.triangle {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #f59e0b;
  margin-left: 5px;
}
.country-code-list {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  width: 100%;
  max-height: 205px;
  z-index: 103;
  background: #fff;
  overflow-y: auto;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  padding: 8px 0;
}
.country-code-list ul {
  font-size: 14px;
  cursor: pointer;
  list-style: none;
  margin: 0;
  padding: 0;
}
.country-code-list li {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  transition: background 0.15s;
}
.country-code-list li:hover {
  background: #f8fafc;
}
.country-code-title {
  cursor: default;
  background: #fff;
  font-weight: 700;
  color: #64748b;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.eye {
  cursor: pointer;
  width: 20px;
  height: 20px;
  color: #94a3b8;
  transition: color 0.2s;
}
.eye:hover {
  color: #f59e0b;
}
.eye svg {
  width: 100%;
  height: 100%;
}
.error-tip {
  width: 100%;
  min-height: 20px;
  font-size: 12px;
  color: #ef4444;
  margin: 6px 0 8px;
  line-height: 1.4;
}
.btn-verify {
  height: 34px;
  padding: 0 12px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  line-height: 34px;
  background: #fff;
  border: 1px solid #fbbf24;
  border-radius: 8px;
  cursor: pointer;
  color: #f59e0b;
  transition: all 0.2s;
  white-space: nowrap;
}
.btn-verify:hover {
  background: #f59e0b;
  color: #fff;
}
.agreement {
  font-size: 13px;
  line-height: 20px;
  margin-top: 18px;
}
.agreement-row {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
  flex-wrap: wrap;
}
.forget {
  margin-left: auto;
}
.gou {
  width: 18px;
  height: 18px;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
}
.gou.active {
  background: #f59e0b;
  border-color: #f59e0b;
}
.gou.active::after {
  content: '';
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) translate(-1px, -1px);
}
.highlight {
  color: #f59e0b;
  cursor: pointer;
  font-weight: 600;
}
.forget {
  font-size: 13px;
  color: #64748b;
  cursor: pointer;
  transition: color 0.2s;
}
.forget:hover {
  color: #f59e0b;
}
.bottom {
  margin-top: 28px;
}
.bottom-hint {
  margin-top: 16px;
  text-align: center;
  font-size: 13px;
  color: #64748b;
}
.login-jump {
  cursor: pointer;
  color: #f59e0b;
  font-weight: 700;
  margin-left: 4px;
  transition: color 0.2s;
}
.login-jump:hover {
  color: #d97706;
}
.submit {
  width: 100%;
  height: 50px;
  background: #e2e8f0;
  border-radius: 12px;
  text-align: center;
  line-height: 50px;
  font-size: 16px;
  font-weight: 700;
  color: #94a3b8;
  cursor: not-allowed;
  transition: all 0.2s;
}
.submit.active {
  color: #fff;
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.35);
}
.submit.active:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(251, 191, 36, 0.45);
}

.mobile-bottom-actions {
  display: none;
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
    inset: 0;
    background: #fff;
    backdrop-filter: none;
    align-items: stretch;
    justify-content: stretch;
  }

  .login-window {
    width: 100%;
    min-height: 100vh;
    border-radius: 0;
    box-shadow: none;
    animation: none;
    overflow: auto;
  }

  .modal-glow,
  .modal-glow-1,
  .modal-glow-2,
  .modal-top-deco,
  .modal-tabs,
  .modal-accent,
  :deep(.social-login) {
    display: none;
  }

  .close {
    display: none;
  }

  .window-inner {
    padding: 20px 24px 52px;
  }

  .mobile-back {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-bottom: 44px;
    border: 0;
    background: transparent;
    color: #111;
    padding: 0;
  }

  .mobile-back svg {
    width: 28px;
    height: 28px;
    stroke: currentColor;
    stroke-width: 2.2;
    fill: none;
  }

  .modal-header {
    margin-bottom: 24px;
  }

  .modal-header::before {
    content: '登录';
    display: block;
    font-size: 30px;
    font-weight: 800;
    color: #222;
    margin-bottom: 18px;
  }

  .phone-box,
  .password-box {
    margin-bottom: 22px;
  }

  :deep(.form-input) {
    height: 54px;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ececec;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
  }

  :deep(.form-input.focused) {
    border-color: transparent;
    border-bottom-color: #ececec;
    background: transparent;
    box-shadow: none;
  }

  :deep(.form-input-icon) {
    display: none;
  }

  :deep(.form-input input) {
    font-size: 15px;
    color: #222;
  }

  :deep(.form-input input::placeholder) {
    color: #9a9a9a;
  }

  .type-content {
    padding-top: 0;
  }

  .agreement {
    margin: 4px 0 30px;
  }

  .agreement-row {
    align-items: center;
    color: #9a9a9a;
    font-size: 11px;
    gap: 6px;
  }

  .agreement-row .gou {
    display: none;
  }

  .agreement-row .highlight {
    color: #f5b719;
  }

  .agreement-row .forget {
    display: none;
  }

  .submit {
    height: 58px;
    line-height: 58px;
    border-radius: 999px;
    background: #eef1f7;
    color: #b8c2cf;
    box-shadow: none;
    font-size: 17px;
    font-weight: 800;
  }

  .submit.active {
    background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
    color: #111827;
  }

  .bottom {
    margin-top: 0;
  }

  .bottom-hint {
    display: none;
  }

  .mobile-bottom-actions {
    margin-top: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mobile-link-btn {
    border: 0;
    background: transparent;
    padding: 0;
    color: #333;
    font-size: 14px;
    font-weight: 500;
  }

  .mobile-link-btn--primary {
    font-weight: 700;
  }
}
</style>
