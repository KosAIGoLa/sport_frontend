const defaultLocale = 'zh-CN'
const supportedLocales = ['zh-CN', 'en-US']
const locale = ref(defaultLocale)
const messages = shallowRef({})
const loadedLocales = new Map()
const localeLoaders = import.meta.glob('../locales/*.js')
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

async function loadLocale(targetLocale) {
  const normalizedLocale = supportedLocales.includes(targetLocale) ? targetLocale : defaultLocale

  if (loadedLocales.has(normalizedLocale)) {
    messages.value = loadedLocales.get(normalizedLocale)
    locale.value = normalizedLocale
    return
  }

  const loader = localeLoaders[`../locales/${normalizedLocale}.js`] || localeLoaders[`../locales/${defaultLocale}.js`]
  if (!loader) return

  const mod = await loader()
  const loadedMessages = mod.default || {}
  loadedLocales.set(normalizedLocale, loadedMessages)
  messages.value = loadedMessages
  locale.value = normalizedLocale
}

function initializeLocale() {
  if (initialized) return loadingPromise
  initialized = true

  const browserLocale = process.client
    ? resolveLocale(navigator.languages?.[0] || navigator.language)
    : defaultLocale

  loadingPromise = loadLocale(browserLocale)
  return loadingPromise
}

export function useI18n() {
  initializeLocale()

  function t(key) {
    return getValue(messages.value, key) || key
  }

  return {
    locale: readonly(locale),
    t,
    loadLocale
  }
}
