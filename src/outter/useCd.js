import { computed, ref, watch } from 'vue'
import { usePlayerStore } from './player'

export default function useCd () {
  const cdRef = ref(null)
  const cdCoverRef = ref(null)

  const playerStore = usePlayerStore()
  const playing = computed(() => playerStore.playing)
  const cdClass = computed(() => playing.value ? 'playing' : '')

  const syncTransform = (wrapper, inner) => {
    const wrapperTransform = getComputedStyle(wrapper).transform
    const innerTransform = getComputedStyle(inner).transform
    wrapper.style.transform = wrapperTransform === 'none'
      ? innerTransform
      : innerTransform.concat(wrapperTransform) // 旋转角度叠加
  }

  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdCoverRef.value)
    }
  })

  return {
    cdRef,
    cdCoverRef,
    cdClass
  }
}
