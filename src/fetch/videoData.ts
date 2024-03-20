import filterItem from '@/core/ReviewSchedule'
import type VideoInfo from '@/types/VideoInfo'

const videoList: VideoInfo[] = [{
  videoId: "4SnlZNSFHgQ",
  title: '',
  overplay: '',
  uploadDate: '2024-03-16',
  userInputs: []
}, {
  videoId: "Cyx7oTN5w1g",
  title: '',
  overplay: '',
  uploadDate: '2024-03-16',
  userInputs: []
}, {
  videoId: "AZUTnDaZUrY",
  title: '',
  overplay: '',
  uploadDate: '2024-03-10',
  userInputs: []
}, {
  videoId: "-m0z1txPbfk",
  title: '',
  overplay: '',
  uploadDate: '2024-03-03',
  userInputs: []
}, {
  videoId: "da4fProkiM8",
  title: 'Bad bosses make people quit: BBC News Review',
  overplay: '06:59',
  uploadDate: '2024-03-02',
  userInputs: []
}, {
  videoId: "eLVAMz8yQx0",
  title: 'Nature destroying nature: BBC News Review',
  overplay: '05:59',
  uploadDate: '2023-12-18',
  userInputs: [[1,2],[9,4],[10,5],[10,8],[11,2],[12,4],[13,4],[17,2],[17,4],[17,7],[21,1],[21,2],[21,5],[22,5],[23,0],[24,2],[25,5],[25,10],[27,9],[27,10],[28,1],[28,7],[29,5],[30,4],[30,9],[31,3],[32,7],[41,3],[41,6],[43,1],[44,2],[44,4],[45,5],[45,7],[46,5],[52,8],[53,6],[57,5],[59,6],[62,4],[66,7],[70,4],[70,5],[70,8],[71,1],[71,2],[72,5],[73,7],[73,11],[74,1],[77,10],[78,1]]
}, {
  videoId: "6mSx_KJxcHI",
  title: 'Introduction to Machine Learning for Beginners [Part 1] | Machine Learning for Beginners',
  overplay: '03:21',
  uploadDate: '2023-12-18',
  userInputs: [[7,3],[14,5],[15,4],[22,2],[25,1],[26,3],[27,2],[30,3],[31,0],[31,1],[37,4],[41,0],[42,0],[42,1],[44,1],[46,1],[49,3],[58,0],[65,1],[68,1],[70,1]]
}, {
  videoId: "DxR2waii1Ck",
  title: 'Should we fear chatbots? ⏲️ 6 Minute English',
  overplay: '06:17',
  uploadDate: '2023-12-19',
  userInputs: [[5,7],[12,4],[17,8],[38,1],[46,1],[46,3],[50,8],[53,3],[54,13],[57,1],[57,8],[60,7],[60,8],[61,3],[63,8],[76,3],[77,12],[78,0],[89,2],[94,7],[101,2],[101,4],[101,7],[101,8],[101,10],[102,0]]
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