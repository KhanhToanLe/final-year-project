import { defineStore } from 'pinia'
import musicList from './music-list.json'
import { BASE_URL } from './constants'
import { MODE, STORAGE } from './enums'

export const useMusicStore = defineStore('musiclist', {
  state: () => ({
    currentTab: STORAGE.LOCALE,
    currentMode: MODE.LIST,
    onlineMusics: [],
    localMusics: musicList
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'music-player_musiclist',
        storage: localStorage
      }
    ]
  },
  actions: {
    setCurrentTab (currentTab) {
      this.currentTab = currentTab
    },
    setCurrentMode (currentMode) {
      this.currentMode = currentMode
    },

    async fetchMusics () {
      try {
        const res = await fetch(
          BASE_URL + '/qiniu/get_musics?filename=default.json'
        ).then((response) => response.json())
        if (res.success) {
          this.onlineMusics = res.data
        }
      } catch (err) {
        console.log(err)
      }
    },

    addToLocal (music) {
      this.localMusics.push(music)
    },
    removeFromLocal (music) {
      console.log("go here");
      this.localMusics = this.localMusics.filter((item) => {
        return !(item.title === music.title && item.artist === music.artist)
      })
    }
  }
})
