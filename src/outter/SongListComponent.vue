<template>
  <div class="w-[800px] ml-[auto] mr-auto">
    <div class="musiclist my-8">
      <div class="music-header mb-4">
        <div class="music-tabs">
          <span
            :class="{ 'is-active': tabRef == STORAGE.LOCALE }"
            @click="() => switchTab(STORAGE.LOCALE)"
          >本地</span>
          <span
            :class="['ml-2.5', {
              'is-active': tabRef === STORAGE.ONLINE
            }]"
            @click="() => switchTab(STORAGE.ONLINE)"
          >在线</span>
        </div>
        <span class="music-mode">
          <ViewGridCard
            v-if="currentMode === MODE.CARD"
            theme="outline"
            size="24"
            fill="#6b7280"
            @click="() => switchMode(MODE.LIST)"
          />

          <ViewGridList
            v-if="currentMode === MODE.LIST"
            theme="outline"
            size="24"
            fill="#6b7280"
            @click="() => switchMode(MODE.CARD)"
          />
        </span>
      </div>
      <div class="relative mb-5">
        <div :class="['music-singers', { 'is-expand': isExpand }]">
          <span
            :class="['music-singer',
              { 'is-active': currentSinger === '' }]"
            @click="() => selectSinger()"
          >全部({{ musicList.length }})
          </span>
          <template
            v-for="(item, index) in singerList"
            :key="index"
          >
            <span
              :class="['music-singer', { 'is-active': currentSinger === item.artist }]"
              @click="() => selectSinger(item.artist)"
            >
              {{ item.artist }}({{ item.count }})
            </span>
          </template>
        </div>
        <div class="music-expand">
          <expandIcon
            theme="outline"
            :size="24"
            fill="#6b7280"
            @click="() => switchExpand()"
          >
          </expandIcon>
        </div>
      </div>
      <div :class="['music-list', { 'mode-card': currentMode === MODE.CARD }]">
        <template
          v-for="(item, index) in filterMusicList"
          :key="index"
        >
          <SongListItem
            :musicItem="item"
            :currentTab="tabRef"
            :onclick="() => selectItem(item, index)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from './usePlayerStore.js'
import {useMusicStore} from './useMusicStore.js';
import { computed, onMounted, ref } from 'vue';
import {STORAGE,MODE} from './enums.js';
import { ViewGridList, ViewGridCard, ExpandDown, ExpandUp } from '@icon-park/vue-next'
import SongListItem from './SongListItem.vue';

// store
const playerStore = usePlayerStore()
    const musicStore = useMusicStore()
    const currentTab = computed(() => musicStore.currentTab)
    const currentMode = computed(() => musicStore.currentMode)
    const onlineMusics = computed(() => musicStore.onlineMusics)
    const localMusics = computed(() => musicStore.localMusics)

    const isExpand = ref(false)
    const currentSinger = ref('')

    // computed
    const tabRef = ref(currentTab.value)
    const musicList = computed(() =>
      tabRef.value === STORAGE.ONLINE ? onlineMusics.value : localMusics.value
    )
    const singerList = computed(() => {
      const artistMap = musicList.value.reduce((map, item) => {
        if (map[item.artist]) {
          map[item.artist]++
        } else {
          map[item.artist] = 1
        }
        return map
      }, {})
      const artistMapSorted = Object.entries(artistMap).sort((a, b) => {
        return b[1] - a[1]
      })
      return artistMapSorted.map((item) => {
        return { artist: item[0], count: item[1] }
      })
    })
    const expandIcon = computed(() => {
      return isExpand.value ? ExpandUp : ExpandDown
    })
    const filterMusicList = computed(() => {
      return !currentSinger.value
        ? musicList.value
        : musicList.value.filter(item => {
          return item.artist === currentSinger.value
        })
    })

    // methods
    const selectSinger = (singer = '') => {
      currentSinger.value = singer
    }
    const switchExpand = () => {
      isExpand.value = !isExpand.value
    }
    const switchTab = (tab) => {
      tabRef.value = tab
      selectSinger()
    }
    const switchMode = (mode) => {
      musicStore.setCurrentMode(mode)
    }
    const selectItem = (song, index) => {
      musicStore.setCurrentTab(tabRef.value)
      playerStore.selectPlay({
        sequenceList: filterMusicList.value,
        currentIndex: index
      })
    }

    // lifecycle
    onMounted(() => {
      musicStore.fetchMusics()
    })
</script>

<style lang="scss" scoped>
// @import "./musiclist";

.music-header {
  @apply flex items-center justify-between;
}

.music-tabs {
  @apply inline-flex items-center h-8 text-sm bg-white shadow-sm rounded-md;

  span {
    @apply w-16 h-full leading-8 text-center text-gray-600 cursor-pointer rounded-md;

    &.is-active {
      @apply text-gray-50;

      background-color: #2f9842;
    }
  }
}

.music-singers {
  @apply inline-flex flex-wrap text-sm h-[44px] overflow-hidden transition-all;

  &.is-expand {
    @apply h-auto;
  }

  .music-singer {
    @apply px-3 py-2 bg-white mr-2 mb-2 cursor-pointer rounded-sm shadow-sm;

    &.is-active {
      @apply text-gray-50;

      background-color: #2f9842;
    }
  }
}

.music-expand {
  @apply absolute -right-8 top-1 cursor-pointer;

  .i-icon {
    path,
    rect {
      stroke: #2f9842;
    }
  }
}

.music-mode {
  @apply inline-flex cursor-pointer;

  & .i-icon {
    path,
    rect {
      stroke: #2f9842;
    }
  }
}

.music-list {
  &.mode-card { // CARD 展示模式
    @apply flex flex-wrap -mx-2;

    > .music-item {
      @apply h-44 sm:w-1/4 w-1/2;

      .music-inner {
        @apply relative flex-col mx-2;

        img {
          @apply w-full h-2/3;
        }

        .music-title {
          @apply ml-0 py-2 self-start;
        }

        .music-artist {
          @apply mr-0 self-start;
        }

        .i-icon {
          @apply absolute right-0 bottom-0;
        }
      }
    }
  }
}

</style>