import filterItem from '@/core/ReviewSchedule'
import type VideoInfo from '@/types/VideoInfo'

const videoList: VideoInfo[] = [{
  videoId: "hGzKWfQOKeQ",
  title: 'Foraging for wild food ⏲️ 6 Minute English',
  overplay: '06:20',
  uploadDate: '2023-10-06',
  userInputs: [[6,0],[7,12],[8,14],[8,16],[15,3],[17,10],[17,11],[18,17],[19,15],[20,11],[21,14],[22,0],[22,6],[22,7],[22,8],[23,7],[23,12],[23,13],[26,12],[27,11],[28,10],[28,14],[29,1],[29,4],[30,7],[30,8],[30,13],[31,9],[33,11],[34,5],[34,7],[37,1],[38,2],[38,4],[39,10],[39,13],[41,13],[42,2],[43,10],[44,6],[45,12],[45,16],[45,17],[46,0],[46,2],[46,6],[47,0],[48,12],[49,15],[55,6],[56,10],[58,3],[59,1],[60,1],[60,5],[61,0],[62,5],[62,8]]
}, {
  videoId: "9FbdvL2RYPQ",
  title: 'Is there plastic in your blood?: BBC News Review',
  overplay: '10:52',
  uploadDate: '2023-10-06',
  userInputs: [[8,5],[9,7],[9,8],[10,1],[10,5],[11,8],[13,8],[21,7],[26,4],[29,10],[33,5],[34,1],[34,8],[38,5],[43,7],[45,12],[50,7],[56,5],[57,10],[58,4],[63,5],[67,4],[71,5],[74,11],[77,4],[82,2],[84,5],[90,9],[104,5],[108,4],[113,4],[114,8],[119,6],[122,1],[129,1],[139,6],[142,10],[144,10],[145,8],[148,3],[150,2],[156,10],[159,5],[163,7]]
}, {
  videoId: "rCrfyX5aANA",
  title: '8 ways to live longer: BBC News Review',
  overplay: '06:35',
  uploadDate: '2023-10-06',
  userInputs: [[10,8],[13,1],[13,6],[18,4],[25,5],[31,13],[36,3],[38,9],[39,5],[61,5],[63,6],[69,5],[70,6],[73,7],[73,10],[74,0],[78,1],[79,5],[82,6],[83,4],[85,11],[89,10],[90,3],[90,6],[91,6],[92,6],[93,6],[100,1],[106,2],[106,4]]
}, {
  videoId: "duRGF7e_lg4",
  title: 'Rubiales quits: BBC News Review',
  overplay: '05:31',
  uploadDate: '2023-10-06',
  userInputs: [[1,1],[11,1],[15,2],[16,3],[23,0],[23,2],[48,3],[54,8],[69,5],[92,2]]
}, {
  videoId: "Ag7-U4ga9mA",
  title: 'The right way to say sorry ⏲️ 6 Minute English',
  overplay: '06:23',
  uploadDate: '2023-10-05',
  userInputs: [[5,7],[9,11],[13,4],[21,7],[29,4],[36,8],[39,11],[39,12],[45,7],[45,8],[46,6],[49,6],[50,7],[51,7],[53,4],[55,3],[57,4],[57,9],[59,3],[62,2],[63,2],[65,4],[68,2],[68,4],[70,0],[75,8],[78,10],[82,1],[87,2],[92,1],[92,2],[92,5],[92,6],[95,6],[103,1],[103,13],[105,3],[107,0]]
}, {
  videoId: "pASfanRdNUQ",
  title: 'English Rewind - Weekender: handwriting',
  overplay: '05:44',
  uploadDate: '2023-10-05',
  userInputs: [[1,12],[2,5],[5,10],[11,6],[12,8],[13,4],[13,6],[14,7],[16,4],[16,9],[18,4],[19,5],[19,12],[20,5],[21,6],[22,7],[25,10],[27,6],[28,9],[29,5],[29,6],[31,1],[31,8],[35,1],[35,8],[36,3],[37,2],[38,4],[38,9],[40,4],[41,5],[41,12],[42,5],[43,6],[51,8],[55,10],[59,10],[65,10],[69,10],[71,4],[76,10],[78,6],[82,5],[87,11],[90,13],[95,5],[97,4],[97,6]]
}, {
  videoId: "G1GitpVlK3Q",
  title: 'English Rewind - London Life: Rhyming slang',
  overplay: '06:23',
  uploadDate: '2023-10-05',
  userInputs: [[1,12],[2,5],[5,8],[6,10],[8,4],[10,8],[10,10],[11,7],[12,1],[13,5],[14,6],[17,3],[17,6],[17,8],[18,8],[19,12],[20,3],[23,5],[24,0],[26,0],[26,4],[26,7],[30,3],[33,2],[36,3],[40,0],[42,0],[42,4],[42,7],[46,3],[47,12],[49,7],[54,8],[59,4],[60,16],[61,16],[64,12],[65,3],[68,2],[69,7],[70,0],[70,3],[72,13],[74,3],[75,9],[78,3],[79,1],[79,4],[79,12],[81,4],[82,12],[83,2],[84,5],[89,2],[89,8],[92,2],[92,8],[93,0],[96,9],[97,10],[99,6],[102,5],[102,7]]
}, {
  videoId: "lAUivF-NEuM",
  title: 'Lego gives up on recycled bricks: BBC News Review',
  overplay: '06:07',
  uploadDate: '2023-10-01',
  userInputs: [[10,9],[14,1]]
}, {
  videoId: "V0dFKMVs9sg",
  title: 'Improving maths with music: BBC News Review',
  overplay: '06:28',
  uploadDate: '2023-10-01',
  userInputs: [[9,6],[18,5],[20,12],[43,9],[54,2],[82,3],[86,2]]
}, {
  videoId: "Y6HYDUr1ZPU",
  title: 'Banning \'steak\': BBC News Review',
  overplay: '06:33',
  uploadDate: '2023-09-27',
  userInputs: [[7,13],[14,3],[14,5],[18,2],[18,3],[46,1],[46,4],[47,6],[49,3],[51,2],[51,6],[53,3],[59,12],[60,2],[64,3],[67,9],[71,1],[71,2],[72,0],[72,1],[73,9],[77,5],[79,1],[83,8],[87,2],[89,9],[92,8],[94,2],[96,3],[97,8],[102,0],[103,1]]
}, {
  videoId: "0m5Go6gvys0",
  title: 'Laughter helps the heart - BBC News Review',
  overplay: '05:43',
  uploadDate: '2023-09-26',
  userInputs: [[10,1],[12,2],[13,5],[13,8],[32,5],[33,1],[49,7],[50,12],[79,13]]
}, {
  videoId: "fmqTJO_OJ9M",
  title: 'Donald Trump charged: BBC News Review',
  overplay: '06:38',
  uploadDate: '2023-08-28',
  userInputs: [[0,2],[8,4],[10,3],[10,5],[11,4],[12,4],[12,10],[14,4],[17,3],[22,2],[22,4],[24,9],[26,4],[27,1],[27,5],[42,3],[56,2],[57,1],[57,5],[60,9],[62,9],[64,1],[67,2],[69,6],[72,5],[74,8],[75,5],[78,7],[80,2],[85,12],[87,9],[87,10],[88,3],[89,9],[90,1],[98,4],[108,1],[110,4]]
}, {
  videoId: "DEbYvMHS1c4",
  title: 'Antarctic ice melting: BBC News Review',
  overplay: '06:36',
  uploadDate: '2023-08-26',
  userInputs: [[0,0],[1,0],[8,8],[8,10],[10,0],[13,3],[16,2],[21,0],[21,1],[21,4],[21,5],[21,8],[22,5],[23,5],[23,6],[24,1],[24,3],[24,5],[26,9],[28,0],[29,7],[31,3],[34,4],[37,2],[37,4],[37,5],[37,9],[39,5],[39,9],[42,2],[44,3],[46,2],[51,1],[52,5],[56,6],[67,7],[68,8],[89,2],[105,3],[111,1]]
}, {
  videoId: "WJZQGGZ64oI",
  title: 'Learning to smile again: BBC News Review',
  overplay: '05:30',
  uploadDate: '2023-08-25',
  userInputs: [[9,4],[13,0],[33,1],[39,6],[41,1],[44,0],[44,6],[46,3],[47,8],[48,13],[51,2],[52,7],[63,1],[69,0],[69,2]]
}, {
  videoId: "dLyo5M2swUo",
  title: 'First Arab Woman in Space: BBC News Review',
  overplay: '05:23',
  uploadDate: '2023-08-24',
  userInputs: [[1,3],[8,2],[9,3],[10,5],[10,8],[12,1],[12,3],[16,6],[16,8],[21,4],[21,5],[21,6],[42,5],[46,3],[48,0],[49,6],[50,2],[51,1],[54,9],[57,9],[58,7],[59,5],[61,6],[61,9],[66,6],[67,3],[70,5],[74,13],[77,9],[81,3],[81,7],[82,1]]
}, {
  videoId: "tZ-Pbwdqlt0",
  title: 'Can diet improve memory? BBC News Review',
  overplay: '06:25',
  uploadDate: '2023-08-23',
  userInputs: [[15,5],[15,6],[20,8],[27,7],[32,8],[32,10],[33,7],[35,6],[42,9],[42,14],[46,6],[54,7],[57,8],[59,8],[61,8],[69,4],[72,7],[84,6],[86,0]]
}, {
  videoId: "mU6Ac1C8OyM",
  title: 'Shift work linked to depression: BBC News Review',
  overplay: '06:25',
  uploadDate: '2023-08-22',
  userInputs: [[12,6],[14,7],[15,0],[15,10],[18,2],[22,3],[23,0],[23,2],[23,8],[24,5],[24,8],[25,0],[27,4],[28,4],[28,11],[28,16],[31,2],[31,4],[33,9],[34,0],[37,4],[39,4],[41,5],[41,7],[42,4],[44,10],[45,7],[46,6],[48,7],[53,0],[68,9],[69,3],[71,7],[75,4],[81,4],[85,4],[101,15],[104,3]]
}, {
  videoId: "LXrh2AJa8nU",
  title: 'Late nights: Bad for health?: BBC News Review',
  overplay: '07:02',
  uploadDate: '2023-08-22',
  userInputs: [[12,2],[12,12],[16,3],[16,4],[16,6],[25,12],[25,19],[26,1],[29,11],[37,6],[39,6],[40,4],[46,6],[49,2],[50,4],[51,4],[55,5],[55,9],[56,11],[59,3],[60,2],[62,0],[64,7],[64,8],[65,7],[68,0],[70,6],[71,2],[76,6],[81,5],[84,6],[85,7],[88,2],[89,1],[90,4],[91,7],[94,5],[95,3],[95,8],[95,10],[96,8],[97,5],[100,2],[100,7],[101,5],[103,4],[105,0],[107,1]]
}, {
  videoId: "FKK-BppSci8",
  title: 'Blood test for 50 cancers: BBC News Review',
  overplay: '05:47',
  uploadDate: '2023-08-22',
  userInputs: [[11,9],[12,6],[13,4],[18,0],[38,2],[51,1],[53,7],[54,3],[54,7],[59,2],[59,7],[60,11],[61,12],[62,5],[64,1],[65,5],[69,7],[71,10],[72,1],[75,3],[80,8],[81,11],[82,7],[90,0]]
}, {
  videoId: "2BdTnL0Gj-Y",
  title: 'Could we live to 140? BBC News Review',
  overplay: '07:07',
  uploadDate: '2023-08-19',
  userInputs: [[10,9],[15,9],[18,3],[18,5],[48,1],[49,7],[51,7],[53,10],[66,5],[70,8],[76,7],[77,0],[79,0],[80,5],[81,3],[82,5],[87,3],[87,8],[91,3],[93,1],[95,4],[97,3],[98,2],[100,2],[102,4],[104,0]]
}, {
  videoId: "Tefu_NvcC0k",
  title: 'Naps: Good for your brain? BBC News Review',
  overplay: '05:55',
  uploadDate: '2023-08-19',
  userInputs: [[17,2],[21,6],[22,2],[37,1],[37,4],[38,5],[53,4],[64,8],[67,7],[69,6],[72,6],[77,4],[79,9],[82,3],[88,1],[89,0]]
}, {
  videoId: "wNJQPn-SLk8",
  title: 'Can sounds make food taste better? ⏲️ 6 Minute English',
  overplay: '06:20',
  uploadDate: '2023-08-17',
  userInputs: [[3,10],[4,8],[7,4],[9,7],[9,8],[11,9],[11,16],[16,0],[16,4],[16,5],[16,11],[17,11],[18,0],[18,5],[18,6],[19,4],[20,2],[23,0],[23,1],[26,5],[29,14],[30,4],[30,7],[31,1],[31,5],[32,3],[32,8],[33,9],[33,14],[33,17],[34,13],[35,1],[36,7],[36,8],[37,5],[38,1],[39,7],[39,8],[43,7],[44,13],[45,12],[47,13],[49,5],[50,1],[51,3],[51,10],[51,15],[53,9],[54,4],[55,11],[56,0],[56,4],[56,11],[57,12],[58,0],[58,5],[59,12],[60,0],[60,12],[60,14],[61,3],[61,5],[61,7],[61,10],[62,0],[63,1],[65,5],[67,1]]
}, {
  videoId: "14cNavJCsr8",
  title: 'Rainforests: destruction gets worse: BBC News Review',
  overplay: '06:17',
  uploadDate: '2023-08-17',
  userInputs: [[0,2],[17,2],[17,3],[17,5],[22,2],[22,3],[23,1],[25,5],[26,6],[31,3],[33,0],[34,11],[36,4],[39,6],[39,9],[40,8],[41,5],[41,6],[41,9],[42,3],[43,11],[46,9],[47,0],[48,2],[50,1],[51,12],[52,1],[57,6],[58,8],[61,4],[63,0],[63,11],[66,3],[67,2],[69,9],[70,3],[72,2],[72,7],[73,2],[73,10],[74,6],[77,4],[78,1],[78,3],[78,5],[78,7],[79,2],[79,3],[80,7],[86,3],[86,8],[87,2]]
}, {
  videoId: "PTCyYJplnEk",
  title: 'Is it wrong to eat plants? ⏲️ 6 Minute English',
  overplay: '06:23',
  uploadDate: '2023-08-16',
  userInputs: [[2,5],[4,15],[7,5],[12,9],[14,2],[18,6],[19,1],[20,0],[21,4],[22,1],[22,8],[23,7],[23,15],[24,2],[24,8],[26,12],[28,10],[29,8],[30,11],[31,4],[32,5],[32,13],[33,2],[33,6],[35,5],[35,15],[36,9],[39,13],[40,3],[40,7],[43,4],[48,15],[52,4],[57,12],[59,11],[60,1],[60,11],[61,0]]
}, {
  videoId: "jGuEB_X-Mt4",
  title: 'Fukushima Water Release: BBC News Review',
  overplay: '06:47',
  uploadDate: '2023-08-15',
  userInputs: [[12,1],[13,2],[14,3],[14,5],[21,2],[24,2],[30,4],[31,5],[39,10],[40,11],[41,1],[44,4],[46,0],[47,2],[48,6],[48,9],[49,8],[69,7],[70,7],[76,4],[76,7],[77,8],[79,4],[85,2],[88,6],[89,2],[89,5],[92,5],[95,11],[96,4]]
}, {
  videoId: "DxR2waii1Ck",
  title: 'Should we fear chatbots? ⏲️ 6 Minute English',
  overplay: '06:17',
  uploadDate: '2023-08-14',
  userInputs: [[12,4],[13,7],[17,3],[18,1],[26,8],[38,1],[42,2],[42,3],[45,5],[45,6],[45,7],[46,1],[49,10],[50,8],[51,10],[54,3],[56,4],[57,8],[57,9],[60,1],[60,2],[61,8],[63,8],[77,2],[77,12],[78,6],[79,2],[80,6],[84,6],[88,6],[88,8],[100,7],[102,0],[104,1],[104,7],[106,3],[106,9],[107,0],[110,4],[111,6],[113,0]]
}, {
  videoId: "MZCGs3tAOe4",
  title: 'Hottest week ever: BBC News Review',
  overplay: '05:36',
  uploadDate: '2023-08-13',
  userInputs: [[10,11],[11,5],[12,0],[12,2],[12,3],[17,0],[17,1],[17,3],[21,4],[35,5],[43,2],[43,3],[46,9],[46,10],[51,1],[51,2],[56,5],[59,4],[59,5],[65,7],[65,8],[68,3],[69,11],[70,3],[71,5],[74,1],[74,10],[75,2],[76,3],[77,2],[81,11],[82,7],[83,5],[89,0],[89,1],[90,1],[91,11]]
}, {
  videoId: "lC_lCOxR5e0",
  title: 'Plants fighting pollution ⏲️ 6 Minute English',
  overplay: '06:16',
  uploadDate: '2023-08-13',
  userInputs: [[3,6],[4,0],[4,9],[8,4],[8,5],[13,10],[19,12],[26,0],[28,1],[29,6],[31,3],[32,2],[32,4],[32,8],[34,2],[36,2],[37,4],[41,5],[43,5],[45,9],[49,3],[50,4],[51,3],[52,0],[54,6],[56,5],[56,8],[57,6],[61,2],[69,10],[71,4],[71,7],[72,6],[72,10],[73,3],[73,9],[75,7],[78,7],[83,4],[84,1],[84,8],[85,7],[86,2],[88,7],[95,10],[99,4],[105,9],[105,12],[106,9],[107,0],[108,6]]
}, {
  videoId: "AcX3KAkikSM",
  title: 'Green flights? Impossible: BBC News Review',
  overplay: '06:29',
  uploadDate: '2023-08-12',
  userInputs: [[10,8],[13,14],[21,1],[22,8],[29,2],[30,11],[31,2],[31,4],[31,13],[34,10],[35,12],[51,7],[59,12],[60,2],[69,4],[73,10],[75,3],[75,9],[78,0],[80,0],[80,7],[82,12],[86,3],[88,4]]
}, {
  videoId: "VkLIUXjNwYc",
  title: 'Do you have eco-anxiety? ⏲️ 6 Minute English',
  overplay: '06:10',
  uploadDate: '2023-08-11',
  userInputs: [[6, 1], [9, 0], [9, 9], [10, 0], [11, 2], [12, 1], [12, 3], [13, 3], [13, 5], [14, 2], [14, 3], [14, 11], [15, 4], [15, 6], [19, 6], [21, 6], [22, 8], [23, 4], [23, 10], [24, 2], [29, 0], [32, 2], [32, 3], [34, 2], [34, 3], [36, 7], [36, 10], [39, 8], [41, 4], [44, 2], [45, 10], [46, 7], [47, 4], [48, 6], [48, 8], [49, 8], [50, 6], [51, 4], [54, 3], [55, 3], [55, 8], [56, 8], [56, 9], [58, 3], [58, 9], [59, 5], [59, 8], [60, 3], [61, 14], [62, 7], [62, 8], [66, 2], [66, 4], [67, 5], [70, 2], [72, 6], [74, 2], [75, 5], [77, 3], [78, 4], [79, 8], [87, 4], [88, 1], [88, 11], [93, 3], [93, 8], [93, 10], [96, 8], [100, 2], [100, 7], [103, 3], [105, 8], [106, 7], [107, 2], [107, 3], [110, 4]]
}, {
  videoId: "x1sSaGXOokE",
  title: 'English Rewind - Weekender: Later language learning',
  overplay: '06:27',
  uploadDate: '2023-08-10',
  userInputs: [[1, 12], [3, 7], [7, 8], [9, 2], [16, 10], [18, 4], [18, 8], [19, 9], [20, 8], [25, 5], [26, 1], [26, 6], [26, 10], [26, 12], [27, 1], [30, 4], [30, 7], [30, 9], [32, 6], [32, 8], [33, 1], [33, 3], [33, 6], [35, 6], [36, 3], [36, 5], [37, 9], [38, 2], [38, 5], [40, 5], [41, 3], [41, 6], [41, 8], [42, 6], [45, 1], [45, 6], [47, 2], [48, 2], [48, 5], [50, 4], [51, 0], [55, 12], [56, 4], [56, 7], [56, 8], [57, 4], [58, 5], [59, 6], [59, 10], [60, 3], [61, 2], [64, 0], [65, 5], [65, 11], [70, 1], [70, 6], [72, 3], [73, 5], [75, 1], [77, 11], [78, 4], [78, 6], [79, 4], [79, 6], [81, 5], [82, 2], [84, 3], [84, 5], [85, 1], [86, 1], [86, 5], [93, 5], [93, 7]]
}, {
  videoId: "4yaIOaOzkTE",
  title: 'English Rewind - 6 Minute English: Love letters',
  overplay: '06:27',
  uploadDate: '2023-08-09',
  userInputs: [[1, 5], [4, 4], [5, 4], [11, 5], [12, 3], [12, 8], [12, 9], [13, 1], [17, 5], [17, 9], [17, 11], [20, 5], [21, 3], [22, 7], [22, 8], [23, 1], [23, 6], [24, 4], [27, 6], [29, 1], [30, 14], [32, 3], [33, 4], [35, 5], [37, 4], [37, 7], [39, 5], [42, 8], [43, 2], [47, 8], [51, 9], [51, 10], [52, 6], [52, 8], [54, 9], [55, 4], [55, 7], [56, 8], [57, 7], [58, 10], [58, 11], [59, 3], [59, 5], [59, 6], [60, 3], [62, 1], [63, 5], [63, 6], [63, 8], [64, 2], [65, 1], [65, 2], [65, 4], [66, 0], [66, 2], [66, 4], [66, 8], [66, 10], [67, 2], [70, 2], [70, 7], [71, 7], [72, 3], [73, 5], [73, 9], [73, 10], [76, 1], [77, 4], [79, 13], [83, 1], [88, 4], [89, 2], [90, 3], [92, 1], [93, 2], [93, 3], [96, 12], [97, 1], [99, 12], [100, 0], [101, 2], [101, 10], [101, 12], [105, 5], [107, 0]]
}, {
  videoId: "dpJv8RTEuNQ",
  title: 'Alzheimer\'s drug hope: BBC News Review',
  overplay: '06:06',
  uploadDate: '2023-08-08',
  userInputs: [[0,9],[8,3],[9,1],[10,3],[10,4],[11,5],[13,11],[14,1],[21,4],[22,1],[22,3],[22,5],[23,0],[25,11],[26,7],[29,2],[30,10],[33,3],[33,6],[34,2],[34,5],[39,5],[49,11],[56,10],[59,5],[60,6],[61,9],[63,8],[69,8],[71,1],[71,5],[78,8],[85,3],[90,4],[96,6],[98,5]]
}]

export function getVideoInfo(videoId: string): VideoInfo | undefined {
  return videoList.find(video => video.videoId === videoId)
}

export function getVideosOrderByDate() {
  return videoList.slice(0, 10)
}

export function getRecommendedVideos() {
  return filterItem<VideoInfo>(videoList, video => video.uploadDate)
}