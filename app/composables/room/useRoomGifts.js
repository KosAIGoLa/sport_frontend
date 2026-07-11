/**
 * 直播间礼物飞字特效
 */
export function useRoomGifts() {
  const giftEffects = ref([])

  function spawnGiftEffects({
    count,
    delay,
    minDuration,
    durationRange,
    minScale,
    scaleRange,
    leftMin,
    leftMax,
    text,
    icon
  }) {
    const baseId = Date.now()
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const id = baseId + i + Math.random()
        const left = leftMin + Math.random() * (leftMax - leftMin)
        const duration = minDuration + Math.random() * durationRange
        const scale = minScale + Math.random() * scaleRange
        giftEffects.value.push({ id, left, duration, scale, text, icon })
        setTimeout(() => {
          giftEffects.value = giftEffects.value.filter(g => g.id !== id)
        }, duration * 1000)
      }, i * delay)
    }
  }

  function sendGift() {
    spawnGiftEffects({
      count: 5 + Math.floor(Math.random() * 4),
      delay: 120,
      minDuration: 2.2,
      durationRange: 1.2,
      minScale: 0.8,
      scaleRange: 0.5,
      leftMin: 80,
      leftMax: (typeof window !== 'undefined' ? window.innerWidth : 1200) - 240,
      text: '送了一个礼物'
    })
  }

  function openRedPacketCoins() {
    spawnGiftEffects({
      count: 6,
      delay: 100,
      minDuration: 1.8,
      durationRange: 0.8,
      minScale: 0.7,
      scaleRange: 0.4,
      leftMin: 100,
      leftMax: (typeof window !== 'undefined' ? window.innerWidth : 1200) - 280,
      text: '+金币',
      icon: 'coin'
    })
  }

  return {
    giftEffects,
    spawnGiftEffects,
    sendGift,
    openRedPacketCoins
  }
}
