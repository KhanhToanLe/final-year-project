<template>
  <div
    :class="['music-item', isActive ? 'is-active' : '']"
    :onclick="() => emit('click')"
  >
    <div class="music-inner">
      <img
        class="w-10 h-10"
        :src="props.musicItem.cover"
        :alt="props.musicItem.title"
      />
      <span class="music-title ml-2.5 text-sm text-gray-800">
        {{ props.musicItem.title }}
      </span>
      <span class="music-artist mr-auto text-xs text-gray-500">
        <i class="mx-1.5">-</i>
        {{ props.musicItem.artist }}
      </span>
      <FolderDownload
        v-if="STORAGE.ONLINE === props.currentTab && !inLocal.value"
        class="p-2"
        theme="outline"
        size="16"
        fill="#333"
        :onclick="withModifiers(addToLocal, ['stop'])"
      />
      <Delete
        v-if="STORAGE.LOCALE === props.currentTab"
        class="p-2"
        theme="outline"
        size="16"
        fill="#333"
        :onclick="withModifiers(removeFromLocal, ['stop'])"
      />
    </div>
  </div>
</template>

<script setup>
import { FolderDownload, Delete } from '@icon-park/vue-next'
import { computed, withModifiers, defineEmits } from 'vue'
import createToast from './toastFunction.js'
import { useMusicStore } from './useMusicStore'
import { usePlayerStore } from './usePlayerStore'
import { STORAGE } from './enums'

const emit = defineEmits(['click']);

const props = defineProps({
  musicItem: {
    type: Object,
    required: true
  },
  currentTab: {
    type: Number,
    required: false
  }
})
// store
const playerStore = usePlayerStore()
const musicStore = useMusicStore()
const currentSong = computed(() => playerStore.currentSong)
const localMusics = computed(() => musicStore.localMusics)

// computed
const isActive = computed(() => {
  return props.musicItem.title === currentSong.value?.title &&
    props.musicItem.artist === currentSong.value?.artist
})
const inLocal = computed(() => {
  return !!localMusics.value.find(item => item.title === props.musicItem.title && item.artist === props.musicItem.artist)
})

// methods
const addToLocal = () => {
  console.log("hello world");
  musicStore.addToLocal(props.musicItem)
  createToast({ text: '已添加到本地' })
}
const removeFromLocal = () => {
  console.log("hello world");
  musicStore.removeFromLocal(props.musicItem)
  createToast({ text: '移除成功' })
}
</script>

<style lang="scss" scoped>
.music-item {
  @apply h-16 mb-2.5 cursor-pointer;

  .music-inner {
    @apply flex items-center h-full p-3 bg-white rounded shadow-md;

    & .i-icon {
      path {
        stroke: #2f9842;
      }
    }
  }

  &.is-active {
    .music-inner {
      background-color: #2f9842;

      span {
        @apply text-gray-50;
      }

      & .i-icon {
        path {
          stroke: #f9fafb;
        }
      }
    }
  }
}
</style>