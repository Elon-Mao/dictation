import { defineStore } from 'pinia'
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import customPromise from '@/common/customPromise'
import { useUserStore } from './user'

const userStore = useUserStore()
const videosDoc = doc(db, `users/${userStore.user.uid}/dictation`, 'videos')

const useVideoStore = defineStore('videos', {
  state: () => {
    return {
      videoMap: {} as Record<string, number>
    }
  },
  actions: {
    async init() {
      const videos = await getDoc(videosDoc)
      this.videoMap = videos.data() as Record<string, number>
    },
    getSortedVideos(): string[] {
      const videos = []
      for (const videoId in this.videoMap) {
        videos.push({
          videoId,
          watchTimes: this.videoMap[videoId]
        })
      }
      return videos.sort((v0, v1) => v0.watchTimes - v1.watchTimes).map((video) => video.videoId)
    },
    async addWatchTimes(videoId: string) {
      const watchTimes = this.videoMap[videoId] + 1
      await customPromise(updateDoc(videosDoc, {
        [videoId]: watchTimes
      }))
      this.videoMap[videoId] = watchTimes
    },
    async saveAll() {
      await customPromise(setDoc(videosDoc, this.videoMap))
    }
  }
})

await customPromise(useVideoStore().init())

export { useVideoStore }