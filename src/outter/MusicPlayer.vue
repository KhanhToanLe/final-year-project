<template>
  <div class="w-[800px] ml-[auto] mr-[auto]">
    <div class="mt-8 sm:mt-28">
      <h1 class="player-title text-xl">
        <router-link to="/musics">我的私人音乐坊 &gt;</router-link>
      </h1>
      <div class="flex items-center mt-6 flex-col-reverse sm:flex-row">
        <div class="flex-1 w-full">
          <div class="flex items-center h-9 mt-6 sm:mt-0 !justify-start">
            <span class="text-xl text-gray-800 text">
              {{ currentSong.title }}
            </span>
            <span class="text-sm text-gray-600 ml-1">
              <i class="mx-1.5.5.5.5.5">-</i> {{ currentSong.artist }}
            </span>
          </div>
          <div class="flex items-center mt-8">
            <span class="music-time mr-1.5">
              {{ formatTime(currentTime) }}
            </span>
            <ProgressBar
              class="flex-1"
              :progress="progress"
              @progress-changing="onProgressChanging"
              @progress-changed="onProgressChanged"
            />
            <span class="music-time ml-1.5">
              {{ formatTime(currentSong.duration) }}
            </span>
          </div>
          <div class="player-control flex items-center justify-between mt-10">
            <ModeComponent ref="modeChange"
            />
            <span class="inline-flex items-center">
              <GoStart
                class="cursor-pointer"
                theme="outline"
                :size="32"
                fill="#2f9842"
                :stroke-width="3"
                @click="prev"
              />
              <PlayPause
                class="cursor-pointer ml-5"
                theme="outline"
                :size="40"
                fill="#2f9842"
                :stroke-width="3"
                @click="togglePlay"
              />
              <GoEnd
                class="cursor-pointer ml-5"
                theme="outline"
                :size="32"
                fill="#2f9842"
                stroke-width="3"
                @click="next"
              />
            </span>
            <div class="inline-flex items-center ">
              <Volume
                theme="outline"
                :size="16"
                fill="#2f9842"
              />
              <div class="w-16 ml-1.5">
                <ProgressBar
                  :progress="volume"
                  @progress-changing="onVolumeChange"
                  @progress-changed="onVolumeChange"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="w-[180px] h-[180px] sm:ml-5">
          <div
            v-show="currentSong"
            ref="cdRef"
          >
            <img
              :class="[true ? ['w-full', 'h-full', 'rounded-full', cdClass] : '']"
              ref="cdCoverRef"
              :src="currentSong.cover"
              :alt="currentSong.title"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ModeComponent from './ModeComponent.vue';
import ProgressBar from './ProgressBar.vue'
import { formatTime } from './utils.js'
import {usePlayerStore} from './usePlayerStore'

import {
  VolumeMute,
  VolumeSmall,
  VolumeNotice,
  PauseOne,
  Play,
  GoStart,
  GoEnd
} from '@icon-park/vue-next'

import useCd from './useCd.js';
import { computed, onMounted, ref } from 'vue';
import emitter from './emitter.js';


const modeChange = ref(null);
const playerStore = usePlayerStore()
const playing = computed(() => playerStore.playing)
const currentSong = computed(() => playerStore.currentSong)
const currentTime = computed(() => playerStore.currentTime)
const volume = computed(() => playerStore.volume)

// hooks
const { cdRef, cdCoverRef, cdClass } = useCd()

// computed
const PlayPause = computed(() => {
  return playing.value ? PauseOne : Play
})
const progress = computed(() => {
  const duration = currentSong.value.duration ?? 0
  return currentTime.value / duration
})
const Volume = computed(() => {
  return volume.value === 0
    ? VolumeMute
    : volume.value < 0.3
      ? VolumeSmall
      : VolumeNotice
})

// methods
const togglePlay = () => {
  playerStore.setPlaying(!playing.value)
}

const prev = () => emitter.emit('prev')
const next = () => emitter.emit('next')

const onProgressChanging = (progress) => {
  playerStore.setProgressChanging(true)
  playerStore.setCurrentTime(currentSong.value.duration * progress)
}

const onProgressChanged = (progress) => {
  playerStore.setProgressChanging(false)

  const currentTime = currentSong.value.duration * progress
  playerStore.setCurrentTime(currentTime)
  emitter.emit('changeTime', currentTime)

  if (!playing.value) {
    playerStore.setPlaying(true)
  }
}

const onVolumeChange = (volume) => {
  playerStore.setVolume(volume)
  emitter.emit('changeVolume', volume)
}

</script>

<style scoped lang="scss">
.player-title {
  color: #2f9842;
}

.player-control {
  & .i-icon {

    path,
    rect {
      stroke: #2f9842;
    }
  }
}

.music-time {
  @apply w-10 text-gray-500 text-sm;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.playing {
  animation: rotate 20s linear infinite;
}
</style>