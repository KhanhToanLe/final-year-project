import { defineStore } from 'pinia'
import musicList from './music-list.json'
// import { MusicItem } from './types'
import { shuffle } from './utils'
import { PLAY_MODE } from './enums'

export const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      sequenceList: musicList,
      playList: musicList,
      playing: false,
      playMode: PLAY_MODE.SEQUENCE,
      currentIndex: 0,
      currentTime: 0,
      volume: 1,
      progressChanging: false // 进度条拖拽中，阻止 timeupdate 事件修改 currentTime
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'music-player_player',
        storage: localStorage,
        paths: [
          'sequenceList',
          'playList',
          'playMode',
          'currentIndex',
          'currentTime',
          'volume'
        ]
      }
    ]
  },
  getters: {
    currentSong: (state) => state.playList[state.currentIndex]
  },
  actions: {
    setPlaying (playing) {
      this.playing = playing
    },
    setSequenceList (sequenceList) {
      this.sequenceList = sequenceList
    },
    setPlayList (playList) {
      this.playList = playList
    },
    setPlayMode (playMode) {
      this.playMode = playMode
    },
    setCurrentIndex (currentIndex) {
      this.currentIndex = currentIndex
    },
    setCurrentTime (currentTime) {
      this.currentTime = currentTime
    },
    setVolume (volume) {
      this.volume = volume
    },
    setProgressChanging (progressChanging) {
      this.progressChanging = progressChanging
    },

    selectPlay ({
      sequenceList: list,
      currentIndex
    }) {
      this.setSequenceList(list)
      this.setPlayList(list)
      this.setPlaying(true)
      this.setPlayMode(PLAY_MODE.SEQUENCE)
      this.setCurrentIndex(currentIndex)
    },

    randomPlay ({ sequenceList: list }) {
      this.setSequenceList(list)
      this.setPlayList(shuffle(list))
      this.setPlaying(true)
      this.setPlayMode(PLAY_MODE.RANDOM)
      this.setCurrentIndex(0)
    },

    changeMode (mode) {
      const { title, artist } = this.currentSong
      if (mode === PLAY_MODE.RANDOM) {
        this.setPlayList(shuffle(this.sequenceList))
      } else {
        this.setPlayList(this.sequenceList)
      }
      const index = this.playList.findIndex(
        (item) => item.title === title && item.artist === artist
      )
      this.setCurrentIndex(index)
      this.setPlayMode(mode)
    }
  }
})
