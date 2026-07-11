<template>
  <div class="match-player">
    <div class="video-stage">
      <div
        class="video-player-wrap"
        :style="transitionName ? { 'view-transition-name': transitionName } : undefined"
      >
        <XgPlayer
          ref="playerRef"
          container-id="xgplayer-container"
          :config="playerConfig"
          :reload-key="roomId"
          @muted-change="isMuted = $event"
        />
        <div class="video-live-badge">
          <span class="live-pulse"></span>
          {{ t('page.liveNow') }}
        </div>
        <div class="video-meta">
          <span class="video-tag">{{ t('page.sportsLive') }}</span>
          <h2>瑞典超 埃尔夫斯堡-哈马比 主黄</h2>
          <p>实时比分 <strong>2-0</strong></p>
        </div>
        <div
          v-if="isMuted"
          class="unmute-btn"
          role="button"
          tabindex="0"
          @click.stop="playerRef?.unmute()"
          @keydown.enter.prevent.stop="playerRef?.unmute()"
        >
          {{ t('common.unmute') }}
        </div>
      </div>
    </div>

    <DesktopOnly tag="div" class="score-board">
      <div class="score-row title-row">
        <span>23:30</span>
        <strong>瑞典超 埃尔夫斯堡-哈马比 主黄</strong>
        <b>2-0</b>
        <em>{{ t('page.sportsLive') }}</em>
      </div>
      <div v-for="(row, idx) in scoreRows" :key="idx" class="score-row">
        <span>{{ row.time }}</span>
        <i>{{ row.status }}</i>
        <strong>{{ row.home }}</strong>
        <b>{{ row.score }}</b>
        <strong>{{ row.away }}</strong>
        <small>{{ row.half }}</small>
        <button type="button">{{ liveStatusText(row.live) }}</button>
      </div>
    </DesktopOnly>

    <DesktopOnly tag="div" class="player-ad">
      <span class="ad-badge">{{ t('page.recommended') }}</span>
      <span class="ad-text">浏览器输入66chat8.cc下载66APP，添加主播助理66号：C99999，备注老万领取每日电子波胆进V</span>
    </DesktopOnly>

    <DesktopOnly tag="div" class="player-assets">
      <span class="player-assets__item">
        <IconEgg icon-class="player-assets__icon egg" />
        鹅蛋：0
      </span>
      <span class="player-assets__item">
        <IconLiver icon-class="player-assets__icon liver" />
        鹅肝：0
      </span>
      <a class="player-assets__btn player-assets__btn--recharge" href="/recharge.html" @click.prevent="appNavigate('/recharge.html')">充值</a>
      <button type="button" class="player-assets__btn player-assets__btn--equipment" @click="$emit('open-equipment')">
        装备
      </button>
    </DesktopOnly>
  </div>
</template>

<script setup>
defineProps({
  roomId: { type: [String, Number], required: true },
  transitionName: { type: String, default: '' },
  playerConfig: { type: Object, required: true },
  scoreRows: { type: Array, default: () => [] }
})
defineEmits(['open-equipment'])

const { t } = useI18n()
const { appNavigate } = useAppNavigate()
const playerRef = ref(null)
const isMuted = ref(true)

function liveStatusText(status) {
  if (status === '直播') return t('page.live')
  if (status === '动画') return t('page.animation')
  return status
}

defineExpose({
  unmute: () => playerRef.value?.unmute()
})
</script>
