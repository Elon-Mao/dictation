import { defineStore } from 'pinia'
import { useElonStore } from './elonStore'

export interface Video {
  id?: string
  uploadedTime?: Date
  listenedTimes?: number
  timedtext?: string
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 生成一个随机索引
    [array[i], array[j]] = [array[j], array[i]] // 交换元素位置
  }
  return array
}

const storeId = 'videos'
export const useVideoStore = defineStore(storeId, () => {
  const elonStore = useElonStore<Video>(storeId, ['uploadedTime', 'listenedTimes'], ['timedtext'])

  const addWatchTimes = async (video: Video) => {
    video.listenedTimes! += 1
    elonStore.setBrief(video)
    await elonStore.commit()
  }

  const getListenList = () => {
    return shuffleArray(elonStore.entities.value.filter((video) => video.listenedTimes !== -1))
      .sort((v0, v1) => v0.listenedTimes! - v1.listenedTimes!)
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
