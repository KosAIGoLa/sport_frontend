const defaultLocale = 'zh-CN'
const supportedLocales = ['zh-CN', 'en-US']
const locale = ref(defaultLocale)
const messages = shallowRef({})
const isReady = ref(false)
const loadedLocales = new Map()
// composables/i18n → app/locales
const localeLoaders = import.meta.glob('../../locales/*.js')
let initialized = false
let loadingPromise = null

function resolveLocale(language) {
  const normalized = String(language || '').toLowerCase()
  if (normalized === 'zh-cn' || normalized.startsWith('zh')) return 'zh-CN'
  if (normalized === 'en-us' || normalized.startsWith('en')) return 'en-US'
  return defaultLocale
}

function getValue(source, key) {
  return key.split('.').reduce((value, part) => value && value[part], source)
}

function getLocaleLoader(targetLocale) {
  const suffix = `/locales/${targetLocale}.js`
  return Object.entries(localeLoaders).find(([path]) => path.endsWith(suffix))?.[1]
}

async function loadLocale(targetLocale) {
  const normalizedLocale = supportedLocales.includes(targetLocale) ? targetLocale : defaultLocale

  if (loadedLocales.has(normalizedLocale)) {
    messages.value = loadedLocales.get(normalizedLocale)
    locale.value = normalizedLocale
    isReady.value = true
    return
  }

  const loader = getLocaleLoader(normalizedLocale) || getLocaleLoader(defaultLocale)
  if (!loader) {
    console.error('[i18n] locale module not found', normalizedLocale, Object.keys(localeLoaders))
    isReady.value = true
    return
  }

  const mod = await loader()
  const loadedMessages = mod.default || {}
  loadedLocales.set(normalizedLocale, loadedMessages)
  messages.value = loadedMessages
  locale.value = normalizedLocale
  isReady.value = true
}

/**
 * 首屏固定加载默认语系（SSR/CSR 一致，避免 hydration 文案不一致）
 * 浏览器偏好语系在 hydrate 后再软切换
 */
function initializeLocale() {
  if (initialized) return loadingPromise
  initialized = true

  loadingPromise = loadLocale(defaultLocale).catch((err) => {
    console.error('[i18n] locale load failed', err)
    isReady.value = true
  })
  return loadingPromise
}

/** 客户端 hydrate 后按浏览器语言切换（不阻塞首屏） */
export async function applyBrowserLocale() {
  if (!import.meta.client) return
  const browserLocale = resolveLocale(navigator.languages?.[0] || navigator.language)
  if (browserLocale !== locale.value) {
    await loadLocale(browserLocale)
  }
}

/** 等待语系档就绪（可在 app.vue / 页面 setup 中 await） */
export function ensureI18n() {
  return initializeLocale() || Promise.resolve()
}

export function useI18n() {
  const ready = initializeLocale() || Promise.resolve()

  function t(key) {
    // 未就绪时不回退 key，避免露出 page.titleHome 等变量名
    if (!isReady.value) return ''
    return getValue(messages.value, key) || key
  }

  return {
    locale: readonly(locale),
    isReady: readonly(isReady),
    ready,
    t,
    loadLocale
  }
}
