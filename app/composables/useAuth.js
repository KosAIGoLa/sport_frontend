import { ref } from 'vue'

const isLoggedIn = ref(false)

export function useAuth() {
  const login = () => {
    isLoggedIn.value = true
    if (process.client) {
      localStorage.setItem('isLoggedIn', 'true')
    }
  }

  const logout = () => {
    isLoggedIn.value = false
    if (process.client) {
      localStorage.removeItem('isLoggedIn')
    }
  }

  const sync = () => {
    if (process.client) {
      isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
    }
  }

  onMounted(sync)

  return {
    isLoggedIn,
    login,
    logout
  }
}
