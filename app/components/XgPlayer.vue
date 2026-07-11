<template>
  <div :id="containerId" class="xgplayer-container"></div>
</template>

<script setup>
const props = defineProps({
  containerId: {
    type: String,
    required: true
  },
  config: {
    type: Object,
    required: true
  },
  reloadKey: {
    type: [String, Number],
    default: 0
  },
  withDanmu: {
    type: Boolean,
    default: true
  },
  withFlv: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'ready',
  'play',
  'pause',
  'ended',
  'muted-change',
  'loading-change',
  'error'
])

const {
  isMuted,
  isLoading,
  error,
  init,
  unmute,
  getPlayer
} = useXgPlayer({
  containerId: props.containerId,
  getConfig: () => props.config,
  withDanmu: props.withDanmu,
  withFlv: props.withFlv
})

async function reload() {
  const player = await init()
  if (!player) return null

  player.on('play', () => emit('play', player))
  player.on('pause', () => emit('pause', player))
  player.on('ended', () => emit('ended', player))
  emit('ready', player)
  return player
}

watch(isMuted, value => emit('muted-change', value), { immediate: true })
watch(isLoading, value => emit('loading-change', value), { immediate: true })
watch(error, value => {
  if (value) emit('error', value)
})
watch(() => props.reloadKey, reload)

onMounted(reload)

defineExpose({
  reload,
  unmute,
  getPlayer
})
</script>
