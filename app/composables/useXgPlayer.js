/**
 * 懒加载 xgplayer + flv + 弹幕，避免首页静态打包整包播放器
 * 仅在 Client 侧调用 init / destroy
 */

let playerModulesPromise = null

async function loadPlayerModules() {
  if (!playerModulesPromise) {
    playerModulesPromise = Promise.all([
      import('xgplayer'),
      import('xgplayer-flv'),
      import('xgplayer/es/plugins/danmu/index.js'),
      import('xgplayer/dist/index.min.css'),
      import('xgplayer/es/plugins/danmu/index.css')
    ]).then(([playerMod, flvMod, danmuMod]) => ({
      Player: playerMod.default,
      FlvPlugin: flvMod.default,
      Danmu: danmuMod.default
    }))
  }
  return playerModulesPromise
}

/**
 * @param {object} options
 * @param {string} options.containerId - 播放器挂载 DOM id
 * @param {() => object} options.getConfig - 返回 xgplayer 配置（不含 plugins）
 * @param {boolean} [options.withDanmu=true]
 * @param {boolean} [options.withFlv=true]
 */
export function useXgPlayer(options = {}) {
  const {
    containerId,
    getConfig,
    withDanmu = true,
    withFlv = true
  } = options

  const isReady = ref(false)
  const isMuted = ref(true)
  const isLoading = ref(false)
  const error = ref(null)

  let player = null
  let destroyed = false
  let initToken = 0

  function bindCommonEvents(instance) {
    instance.muted = true
    isMuted.value = true

    instance.on('volumechange', () => {
      isMuted.value = instance.muted
    })

    instance.on('play', () => {
      isLoading.value = false
    })

    instance.on('canplay', () => {
      isLoading.value = false
    })

    instance.on('error', (err) => {
      error.value = err
      isLoading.value = false
    })
  }

  function destroyInstance() {
    if (player) {
      try {
        player.destroy()
      } catch { /* ignore */ }
      player = null
    }
    isReady.value = false
  }

  async function init() {
    if (!import.meta.client || !containerId) return null
    destroyed = false
    const token = ++initToken
    isLoading.value = true
    error.value = null

    // 先清掉旧实例，避免切换房间时叠两个播放器
    destroyInstance()

    try {
      const { Player, FlvPlugin, Danmu } = await loadPlayerModules()
      if (destroyed || token !== initToken) return null

      const plugins = []
      if (withFlv) plugins.push(FlvPlugin)
      if (withDanmu) plugins.push(Danmu)

      const baseConfig = typeof getConfig === 'function' ? getConfig() : {}
      player = new Player({
        id: containerId,
        plugins,
        ...baseConfig
      })

      bindCommonEvents(player)
      isReady.value = true
      return player
    } catch (e) {
      if (token === initToken) {
        error.value = e
        isLoading.value = false
      }
      console.error('[useXgPlayer] init failed', e)
      return null
    }
  }

  function destroy() {
    initToken += 1
    destroyInstance()
  }

  function unmute() {
    if (!player) return
    player.muted = false
    isMuted.value = false
    if (player.paused) player.play()
  }

  function getPlayer() {
    return player
  }

  onUnmounted(() => {
    destroyed = true
    destroy()
  })

  return {
    isReady: readonly(isReady),
    isMuted,
    isLoading,
    error: readonly(error),
    init,
    destroy,
    unmute,
    getPlayer,
    loadPlayerModules
  }
}
