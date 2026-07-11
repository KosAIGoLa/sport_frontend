<template>
  <div class="user-center-page">
    <main class="user-center-wrapper">
      <UserSidebar
        :menu="menu"
        :is-active="isMenuActive"
        @select="handleMenuClick"
        @apply-live="handleMenuClick({ key: 'realname' })"
      />

      <section class="user-content">
        <UserProfileCard
          :nickname="USER_NICKNAME"
          :avatar="USER_AVATAR"
          @go="activeMenu = $event"
        />

        <UserProfilePanel
          v-if="activeMenu === 'profile'"
          v-model:active-tab="activeTab"
          :tabs="PROFILE_TABS"
          :nickname="USER_NICKNAME"
          :avatar-preview="avatarPreview"
          :countdown="countdown"
          @avatar-upload="handleAvatarUpload"
          @confirm-nickname="confirmNickname"
          @send-code="sendCode"
          @confirm-bind="confirmBind"
        />

        <UserMessagePanel
          v-else-if="activeMenu === 'message'"
          :messages="USER_MESSAGES"
        />

        <UserWealthPanel
          v-else-if="activeMenu === 'wealth'"
          v-model:active-tab="activeWealthTab"
          v-model:month="wealthMonth"
          :tabs="WEALTH_TABS"
          :columns="wealthColumns"
          :empty-text="wealthEmptyText"
        />

        <UserFollowPanel
          v-else-if="activeMenu === 'follow'"
          :list="FOLLOW_LIST"
        />

        <UserOrderPanel v-else-if="activeMenu === 'order'" />

        <UserWatchHistoryPanel
          v-else-if="activeMenu === 'history'"
          v-model:only-live="historyOnlyLive"
          :items="filteredHistoryList"
        />

        <UserAppointmentPanel v-else-if="activeMenu === 'appointment'" />

        <UserGuessPanel v-else-if="activeMenu === 'guess'" />

        <UserMedalPanel
          v-else-if="activeMenu === 'medal'"
          v-model:main-tab="medalMainTab"
          v-model:active-filter="activeMedalFilter"
          :filters="MEDAL_FILTERS"
          :medals="MEDALS"
        />

        <UserContributePanel
          v-else-if="activeMenu === 'contribute'"
          v-model:tab="contributeTab"
          @upload="activeMenu = 'upload'"
        />

        <UserUploadPanel
          v-else-if="activeMenu === 'upload'"
          @upload="handleVideoUpload"
        />

        <UserRoomManagePanel v-else-if="activeMenu === 'room'" />

        <UserSpacePanel
          v-else-if="activeMenu === 'space'"
          v-model:sort="spaceSort"
          :nickname="USER_NICKNAME"
          :avatar="'/assets/avatars/frog-avatar.png'"
          :stats="USER_STATS"
        />

        <div v-else class="empty-panel">
          <img src="/assets/ui/none.png" alt="">
          <span>--暂无数据--</span>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import IconFollow from '~/components/icon/IconFollow.vue'
import {
  USER_NICKNAME,
  USER_AVATAR,
  USER_STATS,
  PROFILE_TABS,
  WEALTH_TABS,
  MEDAL_FILTERS,
  MEDALS,
  FOLLOW_LIST,
  HISTORY_LIST,
  USER_MESSAGES,
  createUserMenu,
  wealthColumnsFor,
  wealthEmptyTextFor
} from '~/data/user'

definePageMeta({
  path: '/user.html',
  layout: 'default',
  forceSolid: true,
  mobileBar: true,
  mobileBarActive: 'profile',
  mobileBarHideAd: true,
  layoutClass: 'user-center-layout',
  viewTransition: 'always'
})

const { t } = useI18n()
useHead(() => ({
  title: t('page.titleUserCenter')
}))

const route = useRoute()

const activeMenu = ref('profile')
const activeTab = ref('basic')
const spaceSort = ref('latest')
const activeWealthTab = ref('liver')
const wealthMonth = ref('本月')
const medalMainTab = ref('limited')
const activeMedalFilter = ref(MEDAL_FILTERS[0])
const contributeTab = ref('published')
const historyOnlyLive = ref(false)
const avatarPreview = ref('/assets/avatars/frog-avatar.png')
const countdown = ref(0)
let phoneTimer = null

const menu = createUserMenu(IconFollow)
const menuKeys = menu.map(item => item.key)
const tabKeys = PROFILE_TABS.map(item => item.key)

const filteredHistoryList = computed(() =>
  historyOnlyLive.value ? HISTORY_LIST.filter(item => item.isLive) : HISTORY_LIST
)
const wealthColumns = computed(() => wealthColumnsFor(activeWealthTab.value))
const wealthEmptyText = computed(() => wealthEmptyTextFor(activeWealthTab.value))

function handleMenuClick(item) {
  if (item.key === 'realname') {
    activeMenu.value = 'profile'
    activeTab.value = 'realname'
  } else if (item.key === 'profile') {
    activeMenu.value = 'profile'
    activeTab.value = 'basic'
  } else {
    activeMenu.value = item.key
  }
}

function isMenuActive(key) {
  if (activeMenu.value === 'profile' && activeTab.value === 'realname') {
    return key === 'realname'
  }
  return activeMenu.value === key
}

function handleAvatarUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    alert('请选择图片文件')
    return
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    avatarPreview.value = e.target.result
    alert('头像已更新，实际使用时应上传到服务器')
  }
  reader.readAsDataURL(file)
}

function handleVideoUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return
  const validTypes = ['video/mp4', 'video/x-msvideo', 'video/avi', 'video/x-flv', 'video/quicktime', 'video/mpeg']
  const validExts = ['.mp4', '.rmvb', '.avi', '.wav', '.flv']
  const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
  if (!validTypes.includes(file.type) && !validExts.includes(ext)) {
    alert('仅支持 mp4、rmvb、avi、wav、flv 格式的视频上传')
    return
  }
  if (file.size > 4 * 1024 * 1024 * 1024) {
    alert('单个视频上传文件最大不能超过 4G')
    return
  }
  alert(`已选择视频：${file.name}，实际使用时应上传到服务器`)
}

function sendCode(phone) {
  if (!phone || phone.length !== 11) {
    alert('请输入正确的手机号')
    return
  }
  countdown.value = 60
  phoneTimer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(phoneTimer)
      phoneTimer = null
    }
  }, 1000)
  alert(`验证码已发送至 ${phone}`)
}

function confirmBind({ phone, code }) {
  if (!phone || phone.length !== 11) {
    alert('请输入正确的手机号')
    return
  }
  if (!code) {
    alert('请输入验证码')
    return
  }
  alert(`手机号 ${phone} 绑定成功`)
  activeTab.value = 'basic'
}

function confirmNickname(val) {
  const nickname = (val || '').trim()
  if (!nickname) {
    alert('请输入新的昵称')
    return
  }
  if (nickname.length < 5 || nickname.length > 30) {
    alert('昵称长度需在5-30个字符之间')
    return
  }
  alert(`昵称已修改为：${nickname}`)
  activeTab.value = 'basic'
}

watch(() => route.query.menu, (val) => {
  if (val === 'realname') {
    activeMenu.value = 'profile'
    activeTab.value = 'realname'
  } else if (val === 'profile') {
    activeMenu.value = 'profile'
    if (!route.query.tab) activeTab.value = 'basic'
  } else if (val && menuKeys.includes(val)) {
    activeMenu.value = val
  }
}, { immediate: true })

watch(() => route.query.tab, (val) => {
  if (val && tabKeys.includes(val)) activeTab.value = val
}, { immediate: true })

onBeforeUnmount(() => {
  if (phoneTimer) clearInterval(phoneTimer)
})
</script>

<style src="~/assets/css/pages/user.css"></style>
