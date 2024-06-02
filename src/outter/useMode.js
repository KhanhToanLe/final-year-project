import { PlayCycle, PlayOnce, ShuffleOne } from '@icon-park/vue-next'
import { computed } from 'vue'
import { usePlayerStore } from './player'
import { PLAY_MODE } from './enums'

export default function useMode () {
  const playerStore = usePlayerStore()
  const playMode = computed(() => playerStore.playMode)

  const currentMode = computed(() => {
    console.log("hello world");
    return PlayCycle;
    // const modeVal = playMode.value
    // return modeVal === PLAY_MODE.SEQUENCE
    //   ? PlayCycle
    //   : modeVal === PLAY_MODE.RANDOM
    //     ? ShuffleOne
    //     : PlayOnce
  })

  const changeMode = () => {
    const mode = (playMode.value + 1) % 3
    playerStore.changeMode(mode)
  }

  return {
    currentMode,
    changeMode
  }
}
