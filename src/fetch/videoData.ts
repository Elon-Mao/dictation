import type VideoInfo from '@/types/VideoInfo'

const videoList: VideoInfo[] = [{
  videoId: "OW9wHj1Jq0A",
  title: 'Remember When: Dota 2 Heroes',
  overplay: '06:09',
  uploadDate: '2023-08-03',
  userInputs: [[0,6],[1,6],[2,0],[2,5],[2,8],[3,2],[3,5],[3,7],[8,5],[14,4]]
}, {
  videoId: "ea1RJUOiNfQ",
  title: 'How to do the Primary Survey - First Aid Training - St John Ambulance',
  overplay: '04:02',
  uploadDate: '2023-08-02',
  userInputs: [[0,14],[1,1],[1,2],[2,5],[2,7],[2,13],[2,17],[3,4],[3,10],[4,1],[4,6],[4,9],[5,5],[5,22],[6,6],[7,13],[8,2],[12,5],[12,8],[13,4],[13,9],[14,4],[15,17],[15,18],[15,21],[16,7],[16,14],[17,2],[17,18],[18,2],[18,4],[18,7],[19,2],[24,2],[25,7],[26,6],[27,5],[28,1],[28,11],[29,5],[30,3],[30,13],[31,4],[31,11],[33,1],[33,4],[36,4],[37,2],[40,5]]
}, {
  videoId: "Ag7-U4ga9mA",
  title: 'The right way to say sorry ⏲️ 6 Minute English',
  overplay: '06:23',
  uploadDate: '2023-08-01',
  userInputs: [[5,6],[9,10],[13,9],[15,9],[29,4],[32,0],[43,11],[46,6],[46,8],[48,4],[49,6],[55,2],[63,2],[65,3],[67,2],[75,9],[85,2],[85,4],[87,2],[91,3],[92,6],[103,13],[105,3],[105,5],[106,4],[107,0],[107,4]]
}, {
  videoId: "RwQnRWTWcVE",
  title: 'Peppa Pig Season 1 Episode 10 - Gardening - Cartoons for Children',
  overplay: '05:15',
  uploadDate: '2023-08-01',
  userInputs: [[13,2],[15,2],[36,6],[38,7],[49,5],[50,3],[52,4],[56,2],[60,6],[64,2],[69,0],[81,1],[82,5],[86,0]]
}, {
  videoId: "NKRgzXM2r08",
  title: '5 Best Ways to Learn and Improve Your English',
  overplay: '02:51',
  uploadDate: '2023-08-01',
  userInputs: [[4,1],[6,9],[13,7],[13,8],[16,10]]
}, {
  videoId: "rCrfyX5aANA",
  title: '8 ways to live longer: BBC News Review',
  overplay: '06:35',
  uploadDate: '2023-08-01',
  userInputs: [[3,9],[5,3],[10,2],[10,8],[11,6],[13,1],[13,6],[17,2],[21,4],[23,0],[25,5],[28,4],[30,12],[31,13],[32,2],[38,8],[61,5],[90,6],[92,5],[92,8]]
}]

export function getVideoInfo(videoId: string): VideoInfo | undefined {
  return videoList.find(video => video.videoId === videoId)
}

export function getVideosOrderByDate() {
  return videoList.slice(0, 10)
}