<template>
    <audio
      ref="audioRef"
      :onPause="pause"
      :onCanplay="ready"
      :onError="error"
      :onTimeupdate="updateTime"
      :onEnded="end"
    />
</template>
<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import {usePlayerStore } from './usePlayerStore';
import { PLAY_MODE } from './enums.js';
import emitter from './emitter.js';


  // store
const playerStore = usePlayerStore()
const playList = computed(() => playerStore.playList)
const playing = computed(() => playerStore.playing)
const playMode = computed(() => playerStore.playMode)
const currentSong = computed(() => playerStore.currentSong)
const currentIndex = computed(() => playerStore.currentIndex)
const currentTime = computed(() => playerStore.currentTime)
const progressChanging = computed(() => playerStore.progressChanging)
const volume = computed(() => playerStore.volume)


// reactive
const audioRef = ref(null)
const isReady = ref(false)

// watch
watch(() => currentSong.value.url, (newUrl) => {
  if (!newUrl) return
  isReady.value = false
  const audioEl = audioRef.value
  audioEl.src = newUrl
  audioEl.play()
})
watch(playing, (newPlaying) => {
  if (!isReady.value) return

  const audioEl = audioRef.value
  newPlaying ? audioEl.play() : audioEl.pause()
})

// methods
const pause = () => {
  playerStore.setPlaying(false)
}
const ready = (e) => {
  if (isReady.value) return
  isReady.value = true

  if (!currentSong.value.duration) {
    playerStore.$patch(state => {
      state.playList[state.currentIndex] = {
        ...currentSong.value,
        duration: (e.target).duration
      }
    })
  }
  playerStore.setVolume((e.target).volume)
}
const loop = () => {
  const audioEl = audioRef.value
  audioEl.currentTime = 0
  playerStore.setPlaying(true)
}
const prev = () => {
  const list = playList.value
  if (!isReady.value || !list.length) return

  if (list.length === 1) {
    loop()
  } else {
    let index = currentIndex.value - 1
    if (index === -1) index = list.length - 1
    playerStore.setCurrentIndex(index)
    if (!playing.value) playerStore.setPlaying(true)
  }
}
const next = () => {
  const list = playList.value
  if (!isReady.value || !list.length) return

  if (list.length === 1) {
    loop()
  } else {
    let index = currentIndex.value + 1
    if (index === list.length) index = 0
    playerStore.setCurrentIndex(index)
    if (!playing.value) playerStore.setPlaying(true)
  }
}
const error = () => {
  isReady.value = true
}
const updateTime = (e) => {
  if (progressChanging.value) return

  playerStore.setCurrentTime((e.target).currentTime)
}
const changeTime = (currentTime) => {
  (audioRef.value).currentTime = currentTime
}
const end = () => {
  playerStore.setCurrentTime(0)

  if (playMode.value === PLAY_MODE.LOOP) {
    loop()
  } else {
    next()
  }
}
const changeVolume = (volume) => {
  (audioRef.value).volume = volume
}

// lifecycle
onMounted(() => {
  if (currentSong.value) {
    const audioEl = audioRef.value
    audioEl.src = currentSong.value.url
    audioEl.currentTime = currentTime.value
    audioEl.volume = volume.value
  }

  emitter.on('prev', prev)
  emitter.on('next', prev)
  emitter.on('changeTime', changeTime)
  emitter.on('changeVolume', changeVolume)
})

onUnmounted(() => {
  emitter.off('prev', prev)
  emitter.off('next', next)
  emitter.off('changeTime', changeTime)
  emitter.off('changeVolume', changeTime)
})
</script>

<style scoped>
</style>