<template>
  <div class="profile-panel">
    <div class="user-tabs">
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

    <div v-if="activeTab === 'basic'" class="user-cards-grid">
      <div class="info-card">
        <div class="info-card-icon phone">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </div>
        <div class="info-card-body">
          <div class="info-card-title-row">
            <h3>未绑定手机</h3>
            <a href="javascript:;" class="action-link" @click="$emit('update:activeTab', 'phone')">立即绑定</a>
          </div>
          <p>绑定手机后可以享受到手机相关的安全及提醒服务</p>
        </div>
      </div>
      <div class="info-card">
        <div class="info-card-icon idcard">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
          </svg>
        </div>
        <div class="info-card-body">
          <div class="info-card-title-row">
            <h3>实名认证</h3>
            <a href="javascript:;" class="action-link" @click="$emit('update:activeTab', 'realname')">立即认证</a>
          </div>
          <p>尚未实名认证，无法申请直播间</p>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'avatar'" class="avatar-panel">
      <p class="avatar-upload-title">请选择一个新照片点击上传</p>
      <label class="avatar-upload-circle">
        <input type="file" accept="image/*" class="avatar-upload-input" @change="$emit('avatar-upload', $event)">
        <img class="avatar-upload-preview" :src="avatarPreview" alt="avatar" @error="e => e.target.src = '/assets/avatars/frog-avatar.png'">
        <div class="avatar-upload-overlay">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>点击上传</span>
        </div>
      </label>
    </div>

    <div v-if="activeTab === 'nickname'" class="nickname-panel">
      <div class="nickname-form">
        <div class="nickname-row">
          <label class="nickname-label">当前昵称：</label>
          <span class="nickname-current">{{ nickname }}</span>
        </div>
        <div class="nickname-row">
          <label class="nickname-label">新昵称：</label>
          <input v-model="localNickname" type="text" class="nickname-input" placeholder="请输入新的昵称" maxlength="30">
          <button type="button" class="nickname-submit" @click="$emit('confirm-nickname', localNickname)">确认修改</button>
        </div>
      </div>
      <div class="nickname-rules">
        <h4>说明：</h4>
        <ol>
          <li>修改昵称后，请用新昵称和原来的密码登录，旧的昵称将无法登录。</li>
          <li>第一次可免费修改昵称，以后每次修改昵称需要50鹅肝。</li>
          <li>新昵称需符合注册规范，可使用数字，字母，汉字，不超过5-30个字符。</li>
          <li>如遇服务器更新或其它问题导致昵称修改失败，请 <a href="javascript:;" class="nickname-service">联系客服</a>。</li>
        </ol>
      </div>
    </div>

    <div v-if="activeTab === 'realname'" class="realname-tab-panel">
      <img class="realname-tab-panel__img" src="/assets/ui/appointment-penguin.png" alt="penguin">
      <h3>请去企鹅体育APP实名认证</h3>
      <p>非大陆用户认证，请联系企鹅体育客服QQ：800161087</p>
    </div>

    <div v-if="activeTab === 'phone'" class="phone-bind-panel">
      <div class="phone-bind-form">
        <div class="phone-bind-row">
          <label class="phone-bind-label">手机号：</label>
          <input v-model="localPhone" type="tel" class="phone-bind-input" placeholder="请输入手机号" maxlength="11">
        </div>
        <div class="phone-bind-row">
          <label class="phone-bind-label">获取验证码：</label>
          <input v-model="localCode" type="text" class="phone-bind-input phone-bind-input--code" placeholder="请输入验证码" maxlength="6">
          <button type="button" class="phone-bind-send" :disabled="countdown > 0" @click="$emit('send-code', localPhone)">{{ countdown > 0 ? `${countdown}s 后重发` : '发送验证码' }}</button>
        </div>
        <p class="phone-bind-tip">您将会收到一个验证码，验证码验证过程不收取任何费用</p>
        <button type="button" class="phone-bind-submit" @click="$emit('confirm-bind', { phone: localPhone, code: localCode })">确认绑定</button>
      </div>
    </div>

    <div class="vip-banner">
      <div class="vip-banner-text">
        <h2>五大贵族 尊享特权</h2>
        <span class="vip-tag">企鹅贵族</span>
      </div>
      <button class="vip-btn" type="button">查看贵族特权</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activeTab: { type: String, required: true },
  tabs: { type: Array, required: true },
  nickname: { type: String, default: '企鹅玩家Kc2hI9' },
  avatarPreview: { type: String, required: true },
  phone: { type: String, default: '' },
  code: { type: String, default: '' },
  countdown: { type: Number, default: 0 }
})
defineEmits(['update:activeTab', 'avatar-upload', 'confirm-nickname', 'send-code', 'confirm-bind'])

const localNickname = ref('')
const localPhone = ref(props.phone)
const localCode = ref(props.code)

watch(() => props.phone, (v) => { localPhone.value = v })
watch(() => props.code, (v) => { localCode.value = v })
</script>
