<template>
  <div v-if="visible" class="header-modal" @click.self="close">
    <div class="login-window header-window" :class="{ register: mode === 'register' }">
      <div class="modal-glow modal-glow-1"></div>
      <div class="modal-glow modal-glow-2"></div>
      <div class="modal-top-deco"></div>
      <img class="close" src="/assets/close.png" alt="" @click="close">
      <div class="window-inner">
        <div class="modal-header">
          <div class="modal-tabs">
            <button type="button" :class="{ active: mode === 'login' }" @click="mode = 'login'">登录</button>
            <button type="button" :class="{ active: mode === 'register' }" @click="mode = 'register'">注册</button>
          </div>
          <div class="modal-accent">{{ mode === 'login' ? '欢迎回来，请登录您的账号' : '创建账号，开启精彩直播之旅' }}</div>
        </div>
        <div class="type-content">
          <div class="phone-box">
            <div class="input-group">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              </span>
              <div class="country-code-box" @click="showCountry = !showCountry">
                <span class="country-code">+86</span>
                <span class="triangle"></span>
              </div>
              <input class="input-phone" type="tel" placeholder="请输入手机号码" maxlength="11" v-model="phone">
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
            <div class="input-group">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </span>
              <input class="input-verify" type="tel" placeholder="获取并输入验证码" maxlength="4" v-model="verifyCode">
              <div class="btn-verify" @click="getVerify">{{ counting ? count + 's' : '获取验证码' }}</div>
            </div>
            <div class="error-tip"></div>
          </div>
          <div class="nickname-box" v-if="mode === 'register'">
            <div class="input-group">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </span>
              <input class="input-nickname" type="text" placeholder="请输入用户名" maxlength="15">
            </div>
            <div class="error-tip"></div>
          </div>
          <div class="password-box">
            <div class="input-group">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              </span>
              <input class="input-password" :type="showPassword ? 'text' : 'password'" placeholder="请输入6-16位登录密码" maxlength="16" v-model="password">
              <div class="eye" @click="showPassword = !showPassword">
                <svg v-if="showPassword" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                <svg v-else viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.1 2.1C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l2.87 2.87L21 19.73 4.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55C13.97 16.44 13.02 16.71 12 16.71c-2.76 0-5-2.24-5-5 0-1.02.27-1.97.71-2.8l-.18-.11z"/></svg>
              </div>
            </div>
            <div class="error-tip" v-if="passwordError">{{ passwordError }}</div>
          </div>
          <div class="check-box" v-if="mode === 'register'">
            <div class="input-group">
              <span class="input-icon">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
              </span>
              <input class="input-check" type="text" placeholder="请输入图片上的验证码" maxlength="5">
            </div>
            <div class="error-tip"></div>
          </div>
          <div class="agreement" v-if="mode === 'register'">
            <div class="float-clear">
              <div class="left">
                <span class="gou" :class="{ active: agreed }" @click="agreed = !agreed"></span>
                <span>我已阅读并同意</span>
                <span class="highlight">《用户服务协议》</span>
              </div>
            </div>
            <div class="error-tip" v-if="agreeError">{{ agreeError }}</div>
          </div>
          <div class="agreement" v-else>
            <div class="float-clear">
              <div class="left">
                <span class="gou" :class="{ active: agreed }" @click="agreed = !agreed"></span>
                <span>登录即代表你已同意</span>
                <span class="highlight">《用户服务协议》</span>
              </div>
              <div class="right">
                <span class="forget">忘记密码</span>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="submit" :class="{ active: canSubmit }" @click="submit">{{ mode === 'register' ? '立即注册' : '立即登录' }}</div>
            <div class="bottom-hint">
              <span v-if="mode === 'login'">还没有账号？<span class="login-jump" @click="mode = 'register'">去注册</span></span>
              <span v-else>已有账号？<span class="login-jump" @click="mode = 'login'">去登录</span></span>
            </div>
          </div>
          <div class="social-login">
            <div class="social-divider"><span>其他登录方式</span></div>
            <div class="social-buttons">
              <button type="button" class="social-btn wechat">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66L4 17l2.5-1.41C7.36 15.89 8.15 16 9 16c.18 0 .35 0 .53-.02C9.28 15.4 9.13 14.71 9.13 14c0-3.31 3.13-6 7-6 .56 0 1.1.06 1.62.17C16.95 5.9 13.66 4 9.5 4zm-2.5 5c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 5c-3.04 0-5.5 2.06-5.5 4.6 0 2.54 2.46 4.6 5.5 4.6.71 0 1.39-.11 2.02-.31L20.5 23l-.59-1.99C20.95 19.78 22 18.5 22 17c0-2.54-2.46-4.6-5.5-4.6zm-2.5 3c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm5 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/></svg>
                微信
              </button>
              <button type="button" class="social-btn qq">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5c-1.46 0-2.79-.55-3.78-1.44.17-.85.62-1.65 1.27-2.25-.38-.07-.74-.21-1.07-.42-.31 1.08-.04 2.23.72 3.05-.86.52-1.92.82-3.05.82-.34 0-.67-.03-1-.09.72 1.28 2.08 2.16 3.64 2.16.85 0 1.65-.25 2.33-.69.34.06.69.09 1.04.09 2.21 0 4-1.79 4-4 0-.18-.02-.35-.05-.52.67-.36 1.22-.91 1.55-1.58-.6.27-1.25.42-1.93.42-.23 0-.45-.02-.67-.06.33-.59.52-1.27.52-2 0-2.21-1.79-4-4-4s-4 1.79-4 4c0 .73.19 1.41.52 2-.22.04-.44.06-.67.06z"/></svg>
                QQ
              </button>
            </div>
          </div>
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
.float-clear::after {
  display: block;
  height: 0;
  clear: both;
  content: "";
  visibility: hidden;
}
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
.login-window {
  position: relative;
  width: 420px;
  background: #fff;
  border-radius: 24px;
  padding: 0;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  animation: slideUp 0.35s ease;
}
.login-window.register {
  width: 420px;
}
.login-window.register .window-inner {
  padding: 28px 36px 34px;
}
.login-window.register .modal-header {
  margin-bottom: 22px;
}
.login-window.register .input-group {
  height: 44px;
}
.login-window.register .input-icon {
  width: 18px;
  height: 18px;
  flex-basis: 18px;
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
.login-window.register .social-login {
  margin-top: 18px;
}
.login-window.register .social-btn {
  height: 38px;
}
.login-window.register .social-divider {
  margin-bottom: 10px;
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
.input-group {
  position: relative;
  margin-bottom: 0;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 0 14px;
  height: 52px;
  display: flex;
  align-items: center;
  background: #f8fafc;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}
.input-group:focus-within {
  border-color: #fbbf24;
  background: #fff;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.12);
}
.input-group input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  color: #0f172a;
  background: transparent;
}
.input-group input::placeholder {
  color: #94a3b8;
}
.input-icon {
  width: 20px;
  height: 20px;
  flex: 0 0 20px;
  margin-right: 10px;
  color: #94a3b8;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}
.input-group:focus-within .input-icon {
  color: #f59e0b;
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
.verify-box .input-group {
  width: 100%;
}
.input-verify {
  width: 100%;
}
.btn-verify {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
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
.agreement .float-clear {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.agreement .left {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475569;
}
.agreement .right {
  flex-shrink: 0;
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
.social-login {
  margin-top: 28px;
}
.social-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #cbd5e1;
  font-size: 12px;
  margin-bottom: 16px;
}
.social-divider::before,
.social-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #f1f5f9;
}
.social-buttons {
  display: flex;
  gap: 12px;
}
.social-btn {
  flex: 1;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #fff;
  color: #475569;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.social-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}
.social-btn svg {
  width: 20px;
  height: 20px;
}
.social-btn.wechat:hover {
  border-color: #07c160;
  color: #07c160;
}
.social-btn.qq:hover {
  border-color: #12b7f5;
  color: #12b7f5;
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
</style>
