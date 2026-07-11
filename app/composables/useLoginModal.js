/**
 * 登录弹窗状态（跨页面复用，避免每页重复 loginVisible/openLogin）
 */
const visible = ref(false)
const type = ref('login')

export function useLoginModal() {
  const { isLoggedIn, login, logout } = useAuth()

  function openLogin(mode = 'login') {
    type.value = mode === 'register' ? 'register' : 'login'
    visible.value = true
  }

  function closeLogin() {
    visible.value = false
  }

  function handleLoginSuccess() {
    login()
    closeLogin()
  }

  function handleLogout() {
    logout()
  }

  /** 需登录才执行的动作 */
  function requireLogin(action, mode = 'login') {
    if (isLoggedIn.value) {
      action?.()
      return true
    }
    openLogin(mode)
    return false
  }

  return {
    isLoggedIn,
    loginVisible: visible,
    loginType: type,
    openLogin,
    closeLogin,
    handleLogin: handleLoginSuccess,
    handleLogout,
    requireLogin
  }
}
