import filterItem from '@/core/ReviewSchedule'
import type VideoInfo from '@/types/VideoInfo'

const videoList: VideoInfo[] = [{
  videoId: 'folK5d4XhqY',
  title: '',
  overplay: '',
  uploadDate: '2024-03-21',
  userInputs: []
}, {
  videoId: '4SnlZNSFHgQ',
  title: '',
  overplay: '',
  uploadDate: '2024-03-16',
  userInputs: []
}, {
  videoId: 'Cyx7oTN5w1g',
  title: '',
  overplay: '',
  uploadDate: '2024-03-16',
  userInputs: []
}, {
  videoId: 'AZUTnDaZUrY',
  title: '',
  overplay: '',
  uploadDate: '2024-03-10',
  userInputs: []
}, {
  videoId: '-m0z1txPbfk',
  title: '',
  overplay: '',
  uploadDate: '2024-03-03',
  userInputs: []
}, {
  videoId: 'da4fProkiM8',
  title: 'Bad bosses make people quit: BBC News Review',
  overplay: '06:59',
  uploadDate: '2024-03-02',
  userInputs: []
}, {
  videoId: '6mSx_KJxcHI',
  title: 'Introduction to Machine Learning for Beginners [Part 1] | Machine Learning for Beginners',
  overplay: '03:21',
  uploadDate: '2023-12-18',
  userInputs: []
}, {
  videoId: 'DxR2waii1Ck',
  title: 'Should we fear chatbots? ⏲️ 6 Minute English',
  overplay: '06:17',
  uploadDate: '2023-12-19',
  userInputs: []
}]

export function getVideoInfo(videoId: string): VideoInfo | undefined {
  return videoList.find(video => video.videoId === videoId)
}

export function getVideosOrderByDate() {
  videoList.sort((v0, v1) => v1.uploadDate.localeCompare(v0.uploadDate))
  return videoList
}

export function getRecommendedVideos() {
  videoList.sort((v0, v1) => v1.uploadDate.localeCompare(v0.uploadDate))
  return filterItem<VideoInfo>(videoList, video => video.uploadDate)
}

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // 生成一个随机索引
    [array[i], array[j]] = [array[j], array[i]]; // 交换元素位置
  }
  return array;
}

export const getRandomList = (): string[] => {
  const videoList = ['OW9wHj1Jq0A', 'ea1RJUOiNfQ', 'Ag7-U4ga9mA', 'RwQnRWTWcVE', 'NKRgzXM2r08', 'rCrfyX5aANA', 'N-gZiF6G6RI', 's6dMWzZKjTs', '98kXWrSyp7o', 'G1GitpVlK3Q', 'pASfanRdNUQ', 'dpJv8RTEuNQ', 'hGzKWfQOKeQ', 'x1sSaGXOokE', '4yaIOaOzkTE', 'MZCGs3tAOe4', 'lC_lCOxR5e0', 'AcX3KAkikSM', 'VkLIUXjNwYc', 'PTCyYJplnEk', 'jGuEB_X-Mt4', 'wNJQPn-SLk8', '14cNavJCsr8', 'mU6Ac1C8OyM', 'LXrh2AJa8nU', 'FKK-BppSci8', '2BdTnL0Gj-Y', 'Tefu_NvcC0k', 'dLyo5M2swUo', 'tZ-Pbwdqlt0', 'WJZQGGZ64oI', 'fmqTJO_OJ9M', 'DEbYvMHS1c4', '0m5Go6gvys0', '9FbdvL2RYPQ', 'lAUivF-NEuM', 'V0dFKMVs9sg', 'duRGF7e_lg4', 'Y6HYDUr1ZPU', 'SMN_ZQMtWNM', '2WlILkZhHXM', 'iahCiYwAjv4', '6USbzIrKJYU', 'mA0qsXSXiYM', '2xkXL5EUpS0', '5qGjczWTrDQ', 'QDKfrqjSlmY', '6dKXPONICGw', 'p_SXc0BVjuc', 'p4DNWnnrsmQ', 'sJ_ig9mGcsY', 'Y681hXWwhQY', 'eLVAMz8yQx0', 'mKZ2LGg8dWo', 'lblvpfgPJnc', 'f1VSqAP1dKc']
  return shuffleArray(videoList)
}