import { defineStore } from 'pinia'
import { useElonStore } from './elonStore'

export interface Video {
  id?: string
  uploadedTime?: Date
  listenedTimes?: number
  timedtext?: string
}

const storeId = 'videos'
export const useVideoStore = defineStore(storeId, () => {
  const elonStore = useElonStore<Video>(storeId, ['uploadedTime', 'listenedTimes'], ['timedtext'])

  const addWatchTimes = async (video: Video) => {
    video.listenedTimes! += 1
    await elonStore.setBrief(video)
  }

  const getListenList = () => {
    return elonStore.entities.value
      .filter((video) => video.listenedTimes !== -1)
      .sort((v0, v1) => v1.listenedTimes! - v0.listenedTimes!)
  }

  const getNewVideos = () => {
    return elonStore.entities.value
      .filter((video) => video.listenedTimes === -1)
      .sort((v0, v1) => v1.uploadedTime!.getTime() - v0.uploadedTime!.getTime())
  }

  return {
    ...elonStore,
    addWatchTimes,
    getListenList,
    getNewVideos,
  }
})
