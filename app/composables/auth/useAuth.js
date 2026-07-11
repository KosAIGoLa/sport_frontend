/**
 * 全局登录态（模块级单例 + Nuxt useState 兼容 SSR/CSR）
 */
const isLoggedIn = ref(false)
let synced = false

function readStoredLogin() {
  if (!import.meta.client) return false
  try {
    return localStorage.getItem('isLoggedIn') === 'true'
  } catch {
    return false
  }
}

export function useAuth() {
  // 客户端首次调用时同步本地存储，避免每个组件都 onMounted
  if (import.meta.client && !synced) {
    synced = true
    isLoggedIn.value = readStoredLogin()
  }

  const login = () => {
    isLoggedIn.value = true
    if (import.meta.client) {
      try {
        localStorage.setItem('isLoggedIn', 'true')
      } catch { /* ignore */ }
    }
  }

  const logout = () => {
    isLoggedIn.value = false
    if (import.meta.client) {
      try {
        localStorage.removeItem('isLoggedIn')
      } catch { /* ignore */ }
    }
  }

  return {
    isLoggedIn: readonly(isLoggedIn),
    login,
    logout
  }
}
