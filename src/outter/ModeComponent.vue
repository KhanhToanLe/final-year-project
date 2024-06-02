<template>
  <div>
    <currentMode
      class="cursor-pointer"
      theme="outline"
      :size="28"
      :stroke-width="3"
      :fill="['#2f9842']"
      @click="changeMode"
    />
  </div>
</template>

<script setup>
import { PlayCycle, PlayOnce, ShuffleOne } from '@icon-park/vue-next'
import { computed } from 'vue'
import { usePlayerStore } from './player'
import { PLAY_MODE } from './enums'

const playerStore = usePlayerStore()
const playMode = computed(() => playerStore.playMode)

const currentMode = computed(() => {
  const modeVal = playMode.value
  return modeVal === PLAY_MODE.SEQUENCE
    ? PlayCycle
    : modeVal === PLAY_MODE.RANDOM
    ? ShuffleOne
    : PlayOnce
})

const changeMode = () => {
  console.log("go to change mode");
  const mode = (playMode.value + 1) % 3
  playerStore.changeMode(mode)
}

const test = "hello world";
defineExpose({changeMode,currentMode,test})
</script>

<style scoped></style>