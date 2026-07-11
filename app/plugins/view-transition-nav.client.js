/**
 * 站内 <a href> 点击兜底 → navigateTo
 * 配合 nuxt.config 中 app.viewTransition: { enabled: 'always' }
 * 与 experimental.viewTransition，由 Nuxt 内置 view-transitions 插件做过渡。
 */
export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  document.addEventListener(
    'click',
    (event) => {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = event.target?.closest?.('a[href]')
      if (!anchor) return
      if (anchor.hasAttribute('download')) return
      if (anchor.dataset.noVt != null) return

      const target = (anchor.getAttribute('target') || '').toLowerCase()
      if (target && target !== '_self') return

      const raw = anchor.getAttribute('href')
      if (!raw || raw.startsWith('javascript:') || raw.startsWith('mailto:') || raw.startsWith('tel:')) return
      if (raw.startsWith('#')) return

      let url
      try {
        url = new URL(raw, window.location.href)
      } catch {
        return
      }

      if (url.origin !== window.location.origin) return

      const next = `${url.pathname}${url.search}${url.hash}`
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
      if (next === current) return

      event.preventDefault()
      navigateTo(next)
    },
    false
  )
})
