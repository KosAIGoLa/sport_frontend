/**
 * 站内导航 + View Transition 辅助
 * - 避免同页多个 view-transition-name 导致整页 VT 被浏览器跳过
 * - 统一 navigateTo
 */

export function clearViewTransitionNames() {
  if (!import.meta.client) return
  document.querySelectorAll('[data-vt-room-cover], [data-vt-anchor-cover]').forEach((el) => {
    el.style.viewTransitionName = ''
    el.removeAttribute('data-vt-room-cover')
    el.removeAttribute('data-vt-anchor-cover')
  })
}

export function armRoomCover(el, roomId) {
  if (!import.meta.client || !el || !roomId) return
  clearViewTransitionNames()
  el.dataset.vtRoomCover = String(roomId)
  el.style.viewTransitionName = `room-cover-${roomId}`
}

export function armAnchorCover(el, roomId) {
  if (!import.meta.client || !el || !roomId) return
  clearViewTransitionNames()
  el.dataset.vtAnchorCover = String(roomId)
  el.style.viewTransitionName = `anchor-cover-${roomId}`
}

export function extractRoomId(href = '') {
  const match = String(href).match(/\/room\/([^/?#]+)/)
  return match ? match[1] : ''
}

export function sameAppPath(path) {
  if (!import.meta.client) return false
  const cur = decodeURIComponent(`${window.location.pathname}${window.location.search}${window.location.hash}`)
  const next = decodeURIComponent(path)
  return cur === next
}

/**
 * 站内跳转（触发 Nuxt View Transitions）
 * - 非直播间路径会清掉残留 room-cover / anchor-cover name
 *   （卡片 pointerdown 后改点底栏时，残留 name 会导致整页 VT 被浏览器跳过）
 * - 进直播间时保留已 arm 的共享元素 name（options.keepVt 可强制保留）
 */
export async function appNavigate(path, options = {}) {
  if (!path) return
  if (sameAppPath(path) && !options.force) return

  const { keepVt = false, ...navOptions } = options
  if (!keepVt && !extractRoomId(String(path))) {
    clearViewTransitionNames()
  }

  return navigateTo(path, navOptions)
}

export function useAppNavigate() {
  return {
    clearViewTransitionNames,
    armRoomCover,
    armAnchorCover,
    extractRoomId,
    sameAppPath,
    appNavigate
  }
}
