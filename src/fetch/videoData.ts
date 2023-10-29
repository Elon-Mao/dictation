import filterItem from '@/core/ReviewSchedule'
import type VideoInfo from '@/types/VideoInfo'

const videoList: VideoInfo[] = [{
  videoId: "OW9wHj1Jq0A",
  title: 'Remember When: Dota 2 Heroes',
  overplay: '06:09',
  uploadDate: '2023-10-29',
  userInputs: [[0,6],[1,3],[2,2],[2,8],[3,3],[3,6],[4,5],[8,2],[10,2],[13,1],[14,3],[15,3],[16,6],[19,0],[25,5],[32,6],[37,5],[41,1],[41,2],[42,0],[43,2],[48,0],[52,0],[52,2],[52,3],[54,3],[57,9],[59,2],[59,3],[65,1],[65,3],[65,4],[65,5],[68,2],[68,3],[68,6],[71,7],[71,8],[72,0],[73,4],[74,2],[75,4],[77,7],[80,8],[80,9],[81,4],[81,6],[83,3],[83,4],[84,0],[85,3],[91,7],[94,7],[96,4],[100,3],[100,8],[101,5],[101,6],[101,7],[103,4],[103,6],[107,3],[108,5],[109,5],[111,0],[111,3],[111,5],[119,4],[119,6],[121,8],[122,1],[123,1],[124,7],[125,1],[126,8],[128,2],[129,1],[131,8],[132,1],[133,3],[137,0],[139,5],[144,2],[145,2],[145,5],[148,5]]
}, {
  videoId: "wNJQPn-SLk8",
  title: 'Can sounds make food taste better? ⏲️ 6 Minute English',
  overplay: '06:20',
  uploadDate: '2023-10-29',
  userInputs: [[4,8],[4,15],[6,7],[6,8],[6,9],[6,13],[7,4],[7,13],[10,3],[15,7],[16,0],[16,1],[16,4],[16,5],[16,10],[16,11],[17,3],[17,4],[17,5],[17,11],[18,3],[18,6],[19,1],[21,7],[23,11],[25,4],[25,14],[26,5],[31,1],[32,3],[32,8],[33,17],[35,3],[37,5],[38,1],[38,12],[39,6],[39,7],[39,8],[40,12],[41,3],[41,14],[44,13],[47,15],[48,5],[49,5],[49,6],[50,6],[51,15],[52,6],[54,9],[59,7],[59,8],[59,12],[60,0],[61,3],[62,3],[64,3],[65,12]]
}, {
  videoId: "mU6Ac1C8OyM",
  title: 'Shift work linked to depression: BBC News Review',
  overplay: '06:25',
  uploadDate: '2023-10-28',
  userInputs: [[11,5],[19,3],[22,3],[68,9],[71,7],[74,2],[80,4],[81,0],[82,0],[83,1],[84,7],[88,0],[88,3],[90,2],[91,4],[93,0],[98,2],[101,13],[101,15],[106,1]]
}, {
  videoId: "VkLIUXjNwYc",
  title: 'Do you have eco-anxiety? ⏲️ 6 Minute English',
  overplay: '06:10',
  uploadDate: '2023-10-27',
  userInputs: [[9,0],[10,0],[13,4],[15,6],[23,4],[26,5],[32,2],[35,3],[37,8],[44,2],[45,10],[48,7],[49,6],[49,8],[56,8],[58,9],[59,8],[61,14],[62,7],[66,4],[68,0],[70,2],[74,6],[75,5],[81,8],[86,4],[88,1],[88,2],[88,5],[93,10],[95,7],[96,2],[96,8],[104,2],[106,7],[108,10],[109,10]]
}, {
  videoId: "fmqTJO_OJ9M",
  title: 'Donald Trump charged: BBC News Review',
  overplay: '06:38',
  uploadDate: '2023-10-27',
  userInputs: [[0,0],[8,0],[8,6],[11,4],[22,0],[22,2],[22,4],[22,5],[24,5],[24,9],[26,4],[27,5],[42,0],[50,4],[75,10],[86,0],[87,9],[87,10],[88,3],[89,4],[98,6],[111,6]]
}, {
  videoId: "DEbYvMHS1c4",
  title: 'Antarctic ice melting: BBC News Review',
  overplay: '06:36',
  uploadDate: '2023-10-26',
  userInputs: [[0,0],[1,0],[1,4],[8,3],[8,8],[10,0],[13,5],[21,1],[21,8],[24,3],[24,5],[29,8],[37,9],[43,5],[51,10],[67,7],[102,7]]
}, {
  videoId: "WJZQGGZ64oI",
  title: 'Learning to smile again: BBC News Review',
  overplay: '05:30',
  uploadDate: '2023-10-26',
  userInputs: [[7,9],[24,9],[31,4],[33,1],[66,7],[67,2]]
}, {
  videoId: "dLyo5M2swUo",
  title: 'First Arab Woman in Space: BBC News Review',
  overplay: '05:23',
  uploadDate: '2023-10-26',
  userInputs: [[13,4],[16,6],[21,0],[46,3],[49,6],[50,2],[51,1],[52,6],[57,0],[57,9],[58,7],[59,2],[59,5],[61,6],[61,9],[67,3],[69,6],[76,9],[81,3],[81,7]]
}, {
  videoId: "tZ-Pbwdqlt0",
  title: 'Can diet improve memory? BBC News Review',
  overplay: '06:25',
  uploadDate: '2023-10-26',
  userInputs: [[0,4],[8,2],[9,1],[10,3],[15,6],[42,9],[42,14],[46,6],[54,7],[59,8],[61,8],[64,6],[65,6],[71,2],[86,0]]
}, {
  videoId: "MZCGs3tAOe4",
  title: 'Hottest week ever: BBC News Review',
  overplay: '05:36',
  uploadDate: '2023-10-25',
  userInputs: [[0,1],[10,10],[10,11],[12,1],[17,0],[17,3],[22,5],[35,5],[43,2],[44,8],[46,9],[47,5],[48,0],[48,2],[49,1],[49,2],[49,5],[50,6],[51,1],[58,2],[59,4],[65,7],[68,3],[70,3],[71,5],[76,3],[77,2],[79,2],[83,5],[84,11],[85,7],[89,0],[89,4],[90,1]]
}, {
  videoId: "dpJv8RTEuNQ",
  title: 'Alzheimer\'s drug hope: BBC News Review',
  overplay: '06:06',
  uploadDate: '2023-10-25',
  userInputs: [[0,1],[0,9],[7,7],[13,3],[13,11],[22,3],[23,0],[36,10],[49,1],[57,9],[61,9],[63,6],[69,4],[79,9],[90,4],[90,6],[95,3],[97,10],[97,12]]
}, {
  videoId: "FKK-BppSci8",
  title: 'Blood test for 50 cancers: BBC News Review',
  overplay: '05:47',
  uploadDate: '2023-10-25',
  userInputs: [[11,9],[12,6],[18,0],[38,2],[48,4],[48,6],[51,1],[53,7],[54,3],[59,2],[61,12],[62,5],[64,1],[65,5],[66,8],[82,7],[82,11],[90,0]]
}, {
  videoId: "LXrh2AJa8nU",
  title: 'Late nights: Bad for health?: BBC News Review',
  overplay: '07:02',
  uploadDate: '2023-10-25',
  userInputs: [[4,3],[10,4],[12,12],[15,0],[16,4],[20,8],[31,4],[38,4],[39,10],[40,7],[49,2],[50,4],[51,4],[53,10],[53,15],[55,5],[55,9],[59,3],[62,0],[62,9],[64,7],[65,7],[68,0],[71,2],[73,8],[75,2],[76,6],[92,4],[93,9],[94,7],[95,3],[95,10],[99,4],[105,0]]
}, {
  videoId: "DxR2waii1Ck",
  title: 'Should we fear chatbots? ⏲️ 6 Minute English',
  overplay: '06:17',
  uploadDate: '2023-10-24',
  userInputs: [[4,8],[12,4],[13,7],[16,10],[17,3],[17,4],[17,8],[18,1],[25,11],[27,13],[32,4],[32,5],[42,0],[42,2],[42,3],[42,6],[43,1],[43,2],[45,1],[45,5],[45,7],[45,8],[46,1],[46,5],[48,1],[49,1],[49,10],[50,5],[51,10],[52,3],[52,4],[53,3],[54,3],[58,13],[59,6],[60,1],[61,5],[71,2],[73,9],[77,2],[77,8],[78,6],[79,2],[81,3],[89,5],[90,3],[92,3],[94,9],[98,3],[99,2],[104,7],[106,3],[107,0],[110,14]]
}, {
  videoId: "Tefu_NvcC0k",
  title: 'Naps: Good for your brain? BBC News Review',
  overplay: '05:55',
  uploadDate: '2023-10-24',
  userInputs: [[21,6],[22,2],[36,4],[37,8],[38,4],[65,0],[66,4]]
}, {
  videoId: "2BdTnL0Gj-Y",
  title: 'Could we live to 140? BBC News Review',
  overplay: '07:07',
  uploadDate: '2023-10-24',
  userInputs: [[11,4],[15,9],[18,5],[22,1],[25,6],[32,4],[42,4],[43,4],[49,7],[51,7],[56,3],[62,9],[65,3],[67,9],[68,1],[72,9],[76,6],[77,0],[79,0],[80,5],[81,3],[82,5],[87,8],[91,3],[93,1],[97,3],[98,2],[98,7],[100,2],[104,0],[108,3]]
}, {
  videoId: "hGzKWfQOKeQ",
  title: 'Foraging for wild food ⏲️ 6 Minute English',
  overplay: '06:20',
  uploadDate: '2023-10-23',
  userInputs: [[6,0],[7,12],[8,14],[8,16],[15,3],[17,10],[17,11],[18,17],[19,15],[20,11],[21,14],[22,0],[22,6],[22,7],[22,8],[23,7],[23,12],[23,13],[26,12],[27,11],[28,10],[28,14],[29,1],[29,4],[30,7],[30,8],[30,13],[31,9],[33,11],[34,5],[34,7],[37,1],[38,2],[38,4],[39,10],[39,13],[41,13],[42,2],[43,10],[44,6],[45,12],[45,16],[45,17],[46,0],[46,2],[46,6],[47,0],[48,12],[49,15],[55,6],[56,10],[58,3],[59,1],[60,1],[60,5],[61,0],[62,5],[62,8]]
}, {
  videoId: "lAUivF-NEuM",
  title: 'Lego gives up on recycled bricks: BBC News Review',
  overplay: '06:07',
  uploadDate: '2023-10-23',
  userInputs: [[8,4],[9,2],[10,8],[10,9],[13,6],[14,2],[20,3],[26,6],[29,1],[33,10],[34,8],[37,7],[40,7],[41,5],[56,3],[82,5],[91,12]]
}, {
  videoId: "rCrfyX5aANA",
  title: '8 ways to live longer: BBC News Review',
  overplay: '06:35',
  uploadDate: '2023-10-22',
  userInputs: [[10,8],[13,1],[13,6],[18,4],[25,5],[31,13],[36,3],[38,9],[39,5],[61,5],[63,6],[69,5],[70,6],[73,7],[73,10],[74,0],[78,1],[79,5],[82,6],[83,4],[85,11],[89,10],[90,3],[90,6],[91,6],[92,6],[93,6],[100,1],[106,2],[106,4]]
}, {
  videoId: "PTCyYJplnEk",
  title: 'Is it wrong to eat plants? ⏲️ 6 Minute English',
  overplay: '06:23',
  uploadDate: '2023-10-20',
  userInputs: [[2,5],[2,16],[5,4],[6,10],[11,14],[13,7],[14,2],[14,8],[15,2],[15,11],[19,6],[19,7],[20,0],[23,7],[23,15],[26,12],[31,7],[31,8],[32,13],[34,10],[35,9],[35,10],[35,15],[36,5],[37,7],[37,14],[39,7],[39,13],[39,16],[40,3],[41,8],[43,0],[43,4],[47,14],[48,15],[50,15],[51,5],[53,17],[56,6],[62,7]]
}, {
  videoId: "jGuEB_X-Mt4",
  title: 'Fukushima Water Release: BBC News Review',
  overplay: '06:47',
  uploadDate: '2023-10-20',
  userInputs: [[0,9],[8,5],[12,1],[37,1],[37,6],[37,8],[37,9],[44,5],[47,2],[48,9],[80,4],[89,2]]
}, {
  videoId: "G1GitpVlK3Q",
  title: 'English Rewind - London Life: Rhyming slang',
  overplay: '06:23',
  uploadDate: '2023-10-20',
  userInputs: [[1,12],[2,5],[5,8],[10,8],[10,10],[17,3],[17,8],[19,12],[26,0],[26,4],[26,7],[42,0],[42,4],[42,7],[54,8],[60,16],[61,16],[64,12],[69,7],[70,0],[72,13],[78,3],[79,1],[79,12],[82,12],[83,2],[84,5],[89,8],[92,8],[93,0],[96,9],[102,5]]
}, {
  videoId: "14cNavJCsr8",
  title: 'Rainforests: destruction gets worse: BBC News Review',
  overplay: '06:17',
  uploadDate: '2023-10-20',
  userInputs: [[0,2],[0,6],[12,3],[13,9],[13,11],[17,3],[22,3],[36,4],[40,8],[41,6],[46,9],[46,10],[47,0],[50,1],[51,12],[52,1],[54,7],[57,6],[58,8],[61,4],[63,11],[66,3],[66,8],[68,4],[68,8],[71,9],[72,7],[73,10],[77,13],[80,14],[86,8],[91,3]]
}, {
  videoId: "lC_lCOxR5e0",
  title: 'Plants fighting pollution ⏲️ 6 Minute English',
  overplay: '06:16',
  uploadDate: '2023-10-17',
  userInputs: [[4,0],[5,6],[6,0],[8,2],[8,5],[10,4],[10,7],[19,12],[20,1],[20,9],[26,0],[27,9],[31,7],[32,4],[32,8],[33,3],[33,6],[37,4],[42,4],[43,5],[45,9],[48,6],[49,3],[49,8],[50,4],[51,9],[52,0],[53,5],[54,6],[56,5],[56,6],[56,8],[58,5],[61,2],[63,10],[65,4],[68,2],[68,6],[68,8],[72,6],[72,10],[73,3],[74,3],[74,4],[75,6],[77,3],[80,3],[80,12],[83,6],[85,7],[86,2],[87,1],[88,7],[95,10],[98,2],[99,4],[107,0],[107,10],[108,6]]
}, {
  videoId: "x1sSaGXOokE",
  title: 'English Rewind - Weekender: Later language learning',
  overplay: '06:27',
  uploadDate: '2023-10-16',
  userInputs: [[16,10],[19,3],[30,7],[30,9],[36,3],[54,4],[55,12],[56,7],[56,8],[57,4],[60,1],[60,3],[60,10],[63,4],[65,8],[65,11],[77,2],[92,3],[93,5]]
}, {
  videoId: "0m5Go6gvys0",
  title: 'Laughter helps the heart - BBC News Review',
  overplay: '05:43',
  uploadDate: '2023-10-13',
  userInputs: [[9,5],[10,2],[10,6],[10,8],[12,1],[12,2],[13,2],[13,5],[13,8],[24,5],[32,8],[33,2],[40,2],[49,7],[50,12],[61,10],[79,13],[83,6]]
}, {
  videoId: "4yaIOaOzkTE",
  title: 'English Rewind - 6 Minute English: Love letters',
  overplay: '06:27',
  uploadDate: '2023-10-12',
  userInputs: [[6,5],[7,10],[13,5],[24,1],[27,6],[27,7],[32,3],[36,10],[39,5],[42,8],[43,7],[45,7],[54,9],[55,4],[56,8],[57,7],[57,10],[59,5],[59,6],[64,2],[64,6],[65,4],[66,2],[69,4],[75,6],[76,1],[85,4],[88,7],[89,2],[92,2]]
}, {
  videoId: "9FbdvL2RYPQ",
  title: 'Is there plastic in your blood?: BBC News Review',
  overplay: '10:52',
  uploadDate: '2023-10-12',
  userInputs: [[8,5],[9,7],[9,8],[10,1],[10,5],[11,8],[13,8],[21,7],[26,4],[29,10],[33,5],[34,1],[34,8],[38,5],[43,7],[45,12],[50,7],[56,5],[57,10],[58,4],[63,5],[67,4],[71,5],[74,11],[77,4],[82,2],[84,5],[90,9],[104,5],[108,4],[113,4],[114,8],[119,6],[122,1],[129,1],[139,6],[142,10],[144,10],[145,8],[148,3],[150,2],[156,10],[159,5],[163,7]]
}, {
  videoId: "AcX3KAkikSM",
  title: 'Green flights? Impossible: BBC News Review',
  overplay: '06:29',
  uploadDate: '2023-10-12',
  userInputs: [[10,8],[17,5],[22,13],[53,4],[54,3],[59,12],[66,5],[67,2],[70,2],[73,8],[73,10],[75,3],[79,4],[80,7],[82,3],[82,11],[82,12],[86,4]]
}, {
  videoId: "Y6HYDUr1ZPU",
  title: 'Banning \'steak\': BBC News Review',
  overplay: '06:33',
  uploadDate: '2023-10-12',
  userInputs: [[7,1],[7,2],[7,4],[10,5],[14,3],[28,10],[38,7],[40,7],[46,1],[46,5],[47,6],[51,0],[51,2],[57,7],[57,8],[59,12],[60,2],[61,5],[63,6],[64,3],[67,9],[82,6],[85,1],[85,2],[91,3],[102,0]]
}, {
  videoId: "V0dFKMVs9sg",
  title: 'Improving maths with music: BBC News Review',
  overplay: '06:28',
  uploadDate: '2023-10-08',
  userInputs: [[9,6],[11,7],[14,1],[18,5],[20,12],[35,6],[36,10],[40,9],[43,9],[45,1],[48,3],[50,4],[50,9],[51,7],[52,5],[53,7],[54,2],[55,8],[57,5],[61,8],[61,10],[62,3],[67,3],[67,4],[76,7],[77,9],[82,2],[82,3],[86,2],[93,6],[97,1],[98,4],[100,3]]
}, {
  videoId: "duRGF7e_lg4",
  title: 'Rubiales quits: BBC News Review',
  overplay: '05:31',
  uploadDate: '2023-10-07',
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