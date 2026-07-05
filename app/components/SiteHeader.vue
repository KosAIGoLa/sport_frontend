<template>
  <header class="header-wrapper" :class="{ active: isScrolled || forceSolid }">
    <div class="header-inner clearfix">
      <div class="header-left">
        <div class="header-logo-box">
          <img class="header-logo" src="/assets/logo.png" alt="857直播">
          <img class="header-logo-active" src="/assets/logo2.png" alt="857直播">
        </div>
        <nav class="header-menu">
          <ul>
            <li class="home-menu" :class="{ active: activeMenu === 'home' }" @click="scrollToHomeSection('#living-room')"><span>首页</span></li>
            <li class="live-menu" :class="{ active: activeMenu === 'live' }" @click="goLiveType"><span>全部直播</span></li>
            <li class="match-menu" :class="{ active: activeMenu === 'schedule' }" @click="goMatch"><span>赛程</span></li>
            <li class="download-menu">
              <span><a href="/download" target="_blank">下载APP</a></span>
              <img class="hot" src="/assets/hot.png" alt="hot">
              <div class="submenu download-submenu">
                <div class="submenu-box download-submenu-box">
                  <img src="/assets/code.png" alt="857直播">
                  <p>用手机浏览器扫一扫</p>
                  <p>精彩马上呈现</p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <div class="header-right">
        <div v-if="!isLoggedIn" class="no-login">
          <button type="button" class="header-btn header-login" @click="openLogin('login')">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <span>登录</span>
          </button>
          <button type="button" class="header-btn header-register" @click="openLogin('register')">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            <span>注册</span>
          </button>
        </div>
        <div v-else class="had-login">
          <div class="header-subscribe">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/></svg>
            <span>预约</span>
            <div class="submenu subscribe-submenu">
              <div class="submenu-box">
                <div class="subscribe-none">
                  <img src="/assets/none.png" alt="">
                  <span>预约列表空空如也~</span>
                </div>
              </div>
            </div>
          </div>
          <div class="header-concern">
            <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>关注</span>
            <div class="submenu concern-submenu">
              <div class="submenu-box">
                <div class="concern-none">
                  <img src="/assets/none.png" alt="">
                  <span>关注列表空空如也~</span>
                </div>
              </div>
            </div>
          </div>
          <div class="header-avatar">
            <img class="special-avatar avatar" src="/assets/avatar.png" alt="avatar">
            <div class="newMsg"></div>
            <div class="submenu avatar-submenu">
              <div class="submenu-box">
                <div class="top float-clear">
                  <div class="top-up float-clear">
                    <img class="avatar" src="/assets/avatar.png" alt="">
                    <span class="nickname ellipsis">DH0ZGW</span>
                    <div class="identity">主播</div>
                    <div class="btn-logout" @click="logout">退出登录</div>
                  </div>
                  <div class="top-down">
                    <progress class="grow-progress" value="1" max="200"></progress>
                    <div class="grow-box">
                      <span class="text">经验值</span>
                      <span class="cur-grow">1</span>
                      <span>/</span>
                      <span class="max-grow">200</span>
                    </div>
                    <div class="grow-tip">
                      <span>还差</span>
                      <span class="diff-grow">199</span>
                      <span>经验到下一等级</span>
                    </div>
                  </div>
                </div>
                <div class="bottom">
                  <div class="bottom-btn ucenter">
                    <div class="icon home-icon"></div>
                    <span>个人中心</span>
                    <div class="msg-num singular"></div>
                  </div>
                  <div class="bottom-btn concern">
                    <div class="icon concern-icon"></div>
                    <span>我的关注</span>
                  </div>
                  <div class="bottom-btn subscribe">
                    <div class="icon subscribe-icon"></div>
                    <span>我的预约</span>
                  </div>
                </div>
                <div class="anchor-center">
                  <svg class="icon-svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
                  <span>主播中心</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  isLoggedIn: { type: Boolean, default: false },
  activeMenu: { type: String, default: 'home' },
  forceSolid: { type: Boolean, default: false }
})
const emit = defineEmits(['login', 'logout'])

const isScrolled = ref(false)
const router = useRouter()
const route = useRoute()

onMounted(() => {
  isScrolled.value = window.scrollY > 50
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

function openLogin(type) {
  emit('login', type)
}
function logout() {
  emit('logout')
}

function scrollToSection(selector) {
  const el = document.querySelector(selector)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

async function scrollToHomeSection(selector) {
  if (route.path !== '/') {
    await router.push({ path: '/', hash: selector })
    await nextTick()
    window.setTimeout(() => scrollToSection(selector), 60)
    return
  }
  scrollToSection(selector)
}

function goLiveType() {
  router.push('/liveType.html')
}

function goMatch() {
  router.push('/match.html')
}
</script>

<style scoped>
.clearfix::after, .float-clear::after {
  display: block;
  height: 0;
  clear: both;
  content: "";
  visibility: hidden;
}
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.icon-svg {
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 4px;
}

.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 72px;
  z-index: 100;
  background: rgba(8, 13, 32, 0.64);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(18px);
  transition: background 0.3s, box-shadow 0.3s, border-color 0.3s;
  color: #fff;
}
.header-wrapper.active {
  background: rgba(255, 255, 255, 0.86);
  border-color: rgba(229, 231, 235, 0.85);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
  color: #111827;
}
.header-wrapper.active .header-menu li a {
  color: #000;
}
.header-wrapper.active .header-right {
  color: #333;
}
.header-wrapper.active .header-right .icon-svg {
  color: #f8c21b;
}
.header-inner {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 0;
}
.header-left {
  float: left;
  height: 100%;
  display: flex;
  align-items: center;
}
.header-logo-box {
  float: left;
  display: flex;
  align-items: center;
  height: 100%;
  width: 160px;
  margin-right: 58px;
}
.header-logo-box img {
  width: 160px;
  height: auto;
  display: inline;
}
.header-logo-box img.header-logo-active {
  display: none;
}
.header-wrapper.active .header-logo {
  display: none;
}
.header-wrapper.active .header-logo-box img.header-logo-active {
  display: inline;
}
.header-menu {
  float: left;
  height: 100%;
  display: flex;
  align-items: center;
}
.header-menu ul {
  list-style: none;
  font-size: 0;
}
.header-menu li {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  padding: 0 18px;
  margin: 0 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 999px;
  position: relative;
}
.header-menu li:hover,
.header-menu li.active {
  color: #111827;
  background: linear-gradient(135deg, #ffe178 0%, #ffc21c 100%);
  box-shadow: 0 8px 18px rgba(248, 194, 27, 0.28);
}
.header-menu li a {
  color: #fff;
  text-decoration: none;
}
.header-menu li.download-menu {
  padding-right: 18px;
}
.header-menu li.download-menu img.hot {
  position: absolute;
  top: -2px;
  width: 29px;
  height: 19px;
  margin-left: 0;
  vertical-align: middle;
}

.submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 10px;
  z-index: 102;
}
.header-menu li.download-menu:hover .submenu,
.header-subscribe:hover .submenu,
.header-concern:hover .submenu,
.header-avatar:hover .submenu {
  display: block;
}
.submenu-box {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(229, 231, 235, 0.9);
  border-radius: 14px;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.14);
  padding: 15px;
  color: #333;
}
.download-submenu-box {
  width: 140px;
  text-align: center;
}
.download-submenu-box img {
  width: 100px;
  height: 100px;
  margin-bottom: 6px;
}
.download-submenu-box p {
  font-size: 12px;
  color: #666;
  line-height: 1.6;
}

.header-right {
  float: right;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #fff;
  transition: color 0.3s;
}
.no-login {
  display: flex;
  align-items: center;
  gap: 10px;
}
.header-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 999px;
  background: transparent;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.header-btn:hover {
  border-color: #fbbf24;
  color: #fbbf24;
  transform: translateY(-1px);
}
.header-btn .icon-svg {
  width: 16px;
  height: 16px;
  flex: 0 0 16px;
}
.header-login {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.4);
}
.header-login:hover {
  background: rgba(255, 255, 255, 0.22);
}
.header-register {
  background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.25);
}
.header-register:hover {
  color: #fff;
  box-shadow: 0 6px 18px rgba(251, 191, 36, 0.4);
  transform: translateY(-1px);
}
.header-wrapper.active .header-btn {
  color: #0f172a;
  border-color: rgba(15, 23, 42, 0.2);
}
.header-wrapper.active .header-login {
  background: rgba(15, 23, 42, 0.06);
}
.header-wrapper.active .header-login:hover {
  background: rgba(15, 23, 42, 0.1);
  border-color: #fbbf24;
  color: #f59e0b;
}
.header-wrapper.active .header-register {
  color: #fff;
  border-color: transparent;
}

.had-login {
  display: flex;
  align-items: center;
  height: 100%;
}
.header-subscribe,
.header-concern,
.header-avatar {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 12px;
}
.header-subscribe i,
.header-concern i {
  margin-right: 4px;
}
.subscribe-none,
.concern-none {
  text-align: center;
  padding: 20px 30px;
  font-size: 14px;
  color: #999;
}
.subscribe-none img,
.concern-none img {
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 auto 10px;
}

.header-avatar img.avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
}
.avatar-submenu .submenu-box {
  width: 220px;
  padding: 0;
}
.avatar-submenu .top {
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}
.avatar-submenu .top-up {
  position: relative;
  margin-bottom: 10px;
}
.avatar-submenu .top-up img.avatar {
  width: 48px;
  height: 48px;
  float: left;
  margin-right: 10px;
}
.avatar-submenu .nickname {
  display: block;
  font-size: 14px;
  color: #333;
  max-width: 80px;
}
.avatar-submenu .identity {
  display: inline-block;
  font-size: 12px;
  color: #fff;
  background: #f8c21b;
  padding: 2px 6px;
  border-radius: 3px;
  margin-top: 4px;
}
.avatar-submenu .btn-logout {
  float: right;
  font-size: 12px;
  color: #999;
  cursor: pointer;
  margin-top: 6px;
}
.avatar-submenu .btn-logout:hover {
  color: #f8c21b;
}
.grow-progress {
  width: 100%;
  height: 4px;
  margin-bottom: 6px;
  border-radius: 2px;
}
.grow-box {
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}
.grow-tip {
  font-size: 12px;
  color: #f8c21b;
}
.avatar-submenu .bottom {
  padding: 10px 15px;
  border-bottom: 1px solid #f0f0f0;
}
.bottom-btn {
  display: flex;
  align-items: center;
  padding: 8px 0;
  font-size: 13px;
  color: #555;
  cursor: pointer;
}
.bottom-btn:hover {
  color: #f8c21b;
}
.bottom-btn .icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.home-icon {
  background-image: url('/assets/icon-home.png');
}
.concern-icon {
  background-image: url('/assets/icon-concern.png');
}
.subscribe-icon {
  background-image: url('/assets/icon-subscribe.png');
}
.bottom-btn:hover .home-icon {
  background-image: url('/assets/icon-home-active.png');
}
.bottom-btn:hover .concern-icon {
  background-image: url('/assets/icon-concern-active.png');
}
.bottom-btn:hover .subscribe-icon {
  background-image: url('/assets/icon-subscribe-active.png');
}
.anchor-center {
  padding: 12px 15px;
  font-size: 13px;
  color: #fff;
  background: #f8c21b;
  text-align: center;
  cursor: pointer;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.anchor-center svg {
  margin-right: 6px;
}

@media screen and (max-width: 1200px) {
  .header-inner {
    width: 100%;
  }
}
</style>
