import filterItem from '@/core/ReviewSchedule'
import type VideoInfo from '@/types/VideoInfo'

const videoList: VideoInfo[] = [{
  videoId: "f1VSqAP1dKc",
  title: 'Iceland prepares for volcano: BBC News Review',
  overplay: '05:52',
  uploadDate: '2024-02-17',
  userInputs: []
}, {
  videoId: "lblvpfgPJnc",
  title: 'Israel-Gaza war: a month on: BBC News Review',
  overplay: '05:58',
  uploadDate: '2023-12-23',
  userInputs: [[0,1],[0,2],[7,7],[7,8],[8,0],[8,2],[8,3],[8,5],[9,6],[10,4],[10,6],[11,1],[11,2],[11,7],[15,4],[15,5],[15,6],[15,8],[19,5],[20,0],[20,4],[20,6],[21,6],[21,13],[24,7],[29,5],[31,1],[31,2],[31,3],[31,4],[32,8],[32,9],[43,0],[44,0],[44,1],[44,3],[44,4],[44,5],[45,1],[45,4],[46,6],[46,7],[47,3],[48,6],[49,5],[51,2],[51,3],[53,5],[53,9],[53,10],[56,1],[56,4],[56,5],[59,2],[59,3],[60,4],[60,6],[64,4],[65,6],[66,8],[67,2],[67,14],[68,3],[70,3],[71,4],[75,8],[76,11],[77,4],[78,1],[82,1],[82,4],[82,5],[83,5],[83,7],[86,6]]
}, {
  videoId: "mKZ2LGg8dWo",
  title: 'Friends say goodbye to Matthew Perry: BBC News Review',
  overplay: '05:45',
  uploadDate: '2023-12-21',
  userInputs: [[0,0],[0,1],[1,6],[2,5],[2,7],[2,8],[6,2],[6,3],[7,6],[7,7],[7,11],[8,7],[9,0],[10,0],[10,3],[10,4],[13,2],[13,4],[13,9],[13,10],[18,1],[18,2],[18,6],[18,7],[19,4],[19,5],[19,6],[20,9],[21,3],[21,4],[22,9],[23,5],[24,3],[26,8],[27,1],[29,0],[29,2],[29,3],[35,3],[36,2],[38,9],[40,10],[44,2],[45,0],[45,1],[46,0],[46,1],[46,2],[46,3],[46,7],[47,1],[48,6],[48,7],[48,9],[50,5],[50,12],[53,5],[53,6],[54,4],[73,0],[73,1],[73,8],[73,9],[74,8],[74,9],[75,4],[76,2],[78,6],[78,7],[83,0],[83,1],[83,10],[84,4],[84,5],[85,4],[89,5],[91,1],[91,5]]
}, {
  videoId: "eLVAMz8yQx0",
  title: 'Nature destroying nature: BBC News Review',
  overplay: '05:59',
  uploadDate: '2023-12-18',
  userInputs: [[1,2],[9,4],[10,5],[10,8],[11,2],[12,4],[13,4],[17,2],[17,4],[17,7],[21,1],[21,2],[21,5],[22,5],[23,0],[24,2],[25,5],[25,10],[27,9],[27,10],[28,1],[28,7],[29,5],[30,4],[30,9],[31,3],[32,7],[41,3],[41,6],[43,1],[44,2],[44,4],[45,5],[45,7],[46,5],[52,8],[53,6],[57,5],[59,6],[62,4],[66,7],[70,4],[70,5],[70,8],[71,1],[71,2],[72,5],[73,7],[73,11],[74,1],[77,10],[78,1]]
}, {
  videoId: "Y681hXWwhQY",
  title: 'The benefits of doing nothing ⏲️ 6 Minute English',
  overplay: '06:19',
  uploadDate: '2023-12-21',
  userInputs: [[2,4],[4,0],[6,3],[8,9],[11,8],[13,8],[14,7],[18,2],[20,3],[22,10],[23,4],[23,8],[24,8],[26,7],[31,3],[32,7],[32,8],[34,0],[34,7],[34,9],[36,5],[36,7],[37,6],[38,6],[39,7],[40,7],[41,1],[41,9],[42,2],[42,4],[43,4],[44,4],[45,1],[47,7],[53,10],[55,6],[56,2],[59,4],[59,10],[60,7],[62,0],[62,4],[62,10],[62,11],[63,0],[63,14],[63,15],[63,17],[65,4],[66,5],[66,11],[67,2],[68,0],[68,2],[68,6],[69,3],[70,1],[70,6],[71,6],[71,7],[72,3],[74,11],[74,12],[78,4],[81,7],[83,1],[83,6],[84,3],[89,2],[89,7],[91,6],[91,10],[91,11],[91,16]]
}, {
  videoId: "p4DNWnnrsmQ",
  title: 'Suddenly Breaking Bad? | Breaking Bad (Aaron Paul, Bryan Cranston)',
  overplay: '01:48',
  uploadDate: '2023-12-21',
  userInputs: [[0,5],[1,5],[2,14],[3,11]]
}, {
  videoId: "p_SXc0BVjuc",
  title: 'SpongeBob Builds a Krusty Krab Parade Float! 🍔 | "SpongeBob on Parade" Full Scene | SpongeBob',
  overplay: '05:08',
  uploadDate: '2023-12-24',
  userInputs: [[5,9],[8,5],[23,2],[26,7],[39,1],[41,3],[47,6],[48,7],[57,1],[57,2],[59,6],[70,5],[74,3],[77,2],[77,3],[90,2],[90,5],[99,3],[101,1]]
}, {
  videoId: "6dKXPONICGw",
  title: 'If SpongeBob was a Black & White Cartoon | "Help Wanted" | SpongeBob: Reimagined S2',
  overplay: '03:30',
  uploadDate: '2023-12-28',
  userInputs: [[0,3],[0,4],[12,9],[14,1],[16,5],[18,5],[29,5],[29,6],[40,4],[42,5],[45,8]]
}, {
  videoId: "QDKfrqjSlmY",
  title: 'If SpongeBob was an Anime | "Graveyard Shift" | SpongeBob: Reimagined',
  overplay: '03:42',
  uploadDate: '2023-12-30',
  userInputs: [[0,10],[1,3],[2,9],[3,0],[3,14],[3,16],[3,17],[7,6]]
}, {
  videoId: "14cNavJCsr8",
  title: 'Rainforests: destruction gets worse: BBC News Review',
  overplay: '06:17',
  uploadDate: '2023-12-27',
  userInputs: [[17,3],[22,2],[46,5],[63,0],[66,8],[74,0],[78,7],[79,3]]
}, {
  videoId: "4yaIOaOzkTE",
  title: 'English Rewind - 6 Minute English: Love letters',
  overplay: '06:27',
  uploadDate: '2023-12-26',
  userInputs: [[0,10],[4,4],[6,3],[12,3],[17,11],[30,14],[33,4],[36,4],[36,7],[41,0],[41,3],[47,8],[47,13],[55,2],[58,11],[70,3],[70,4],[70,7],[71,9],[76,3],[77,4],[79,13],[90,1],[91,7],[93,3]]
}, {
  videoId: "5qGjczWTrDQ",
  title: 'How to Analyze and Clean a Dataset [Part 8] | Machine Learning for Beginners',
  overplay: '03:32',
  uploadDate: '2023-12-20',
  userInputs: [[3,0],[11,1],[14,3],[21,2],[26,4],[27,3],[31,0],[36,6],[38,0],[38,4],[38,6],[40,6],[42,0],[42,3],[48,4],[51,3],[53,3],[55,3],[58,4],[62,1],[63,3],[66,5],[66,6],[67,2],[67,3],[70,5],[77,4]]
}, {
  videoId: "2xkXL5EUpS0",
  title: 'Your First Linear Regression Project in Python [Part 7] | Machine Learning for Beginners',
  overplay: '04:10',
  uploadDate: '2023-12-30',
  userInputs: [[4,4],[21,4],[28,0],[29,6],[30,3],[41,5],[44,0],[48,1],[50,1],[50,2],[54,5],[62,0],[76,0],[87,2],[94,3]]
}, {
  videoId: "6mSx_KJxcHI",
  title: 'Introduction to Machine Learning for Beginners [Part 1] | Machine Learning for Beginners',
  overplay: '03:21',
  uploadDate: '2023-12-18',
  userInputs: [[7,3],[14,5],[15,4],[22,2],[25,1],[26,3],[27,2],[30,3],[31,0],[31,1],[37,4],[41,0],[42,0],[42,1],[44,1],[46,1],[49,3],[58,0],[65,1],[68,1],[70,1]]
}, {
  videoId: "6USbzIrKJYU",
  title: 'Amazon water emergency: BBC News Review',
  overplay: '06:12',
  uploadDate: '2023-12-20',
  userInputs: [[0,6],[16,2],[28,8],[48,2],[65,4],[68,3],[90,3],[90,4],[96,0]]
}, {
  videoId: "2WlILkZhHXM",
  title: 'Junk food addiction: BBC News Review',
  overplay: '06:08',
  uploadDate: '2023-12-20',
  userInputs: [[12,9],[14,0],[28,8],[36,8],[39,4],[54,11],[57,10],[79,3],[81,5],[84,9],[87,7]]
}, {
  videoId: "x1sSaGXOokE",
  title: 'English Rewind - Weekender: Later language learning',
  overplay: '06:27',
  uploadDate: '2023-12-22',
  userInputs: [[1,12],[14,4],[16,10],[18,8],[25,5],[26,1],[26,6],[26,10],[26,12],[27,1],[30,0],[32,8],[33,3],[38,2],[41,3],[41,8],[48,2],[56,4],[56,8],[58,5],[59,10],[61,2],[65,5],[66,2],[68,6],[73,5],[74,6],[77,11],[78,4],[79,4],[82,2],[91,5]]
}, {
  videoId: "AcX3KAkikSM",
  title: 'Green flights? Impossible: BBC News Review',
  overplay: '06:29',
  uploadDate: '2024-01-03',
  userInputs: [[10,7],[10,8],[11,7],[13,14],[30,11],[34,10],[35,12],[60,2],[75,9],[80,7]]
}, {
  videoId: "0m5Go6gvys0",
  title: 'Laughter helps the heart - BBC News Review',
  overplay: '05:43',
  uploadDate: '2023-12-25',
  userInputs: [[12,1],[13,2],[24,5],[32,5],[32,8],[83,6]]
}, {
  videoId: "duRGF7e_lg4",
  title: 'Rubiales quits: BBC News Review',
  overplay: '05:31',
  uploadDate: '2024-01-02',
  userInputs: [[1,6],[1,7],[10,7],[11,2],[12,1],[13,4],[23,0]]
}, {
  videoId: "iahCiYwAjv4",
  title: 'China’s Former Premier Li Keqiang Has Died',
  overplay: '06:23',
  uploadDate: '2024-01-01',
  userInputs: [[0,2],[0,3],[5,5],[5,9],[8,12],[10,7],[10,8],[11,8],[12,0],[27,11],[31,2],[32,4],[34,7],[41,2],[41,8],[42,0],[44,10],[46,14],[47,8],[48,4],[55,5],[58,13],[65,2],[69,8],[74,14],[75,8],[77,8],[81,14],[82,6]]
}, {
  videoId: "Ag7-U4ga9mA",
  title: 'The right way to say sorry ⏲️ 6 Minute English',
  overplay: '06:23',
  uploadDate: '2024-01-01',
  userInputs: [[5,7],[6,5],[8,6],[9,11],[13,11],[19,7],[26,6],[27,7],[29,4],[31,10],[38,0],[38,2],[39,5],[39,11],[39,12],[44,8],[46,6],[46,8],[48,4],[50,0],[50,10],[51,7],[59,6],[65,4],[68,2],[70,4],[75,0],[91,3],[92,6],[94,3],[97,10],[104,6],[105,5],[107,4]]
}, {
  videoId: "pASfanRdNUQ",
  title: 'English Rewind - Weekender: handwriting',
  overplay: '05:44',
  uploadDate: '2023-12-18',
  userInputs: [[0,1],[5,4],[20,11],[38,4],[89,3],[90,11],[90,13],[97,6]]
}, {
  videoId: "mA0qsXSXiYM",
  title: 'Krusty Krab\'s Food Truck Looks for 1st Customer! | Full Scene \'Food PBBFT! Truck\' | SpongeBob',
  overplay: '05:12',
  uploadDate: '2023-12-22',
  userInputs: [[1,1],[3,1],[5,7],[7,2],[7,4],[9,9],[19,4],[22,5],[25,0],[33,5],[44,4],[47,2],[54,4],[73,8]]
}, {
  videoId: "fmqTJO_OJ9M",
  title: 'Donald Trump charged: BBC News Review',
  overplay: '06:38',
  uploadDate: '2023-12-22',
  userInputs: [[0,0],[1,2],[1,3],[8,6],[10,3],[10,5],[11,4],[12,1],[12,4],[12,10],[22,5],[57,5],[63,8],[75,10],[85,12],[94,3]]
}, {
  videoId: "lC_lCOxR5e0",
  title: 'Plants fighting pollution ⏲️ 6 Minute English',
  overplay: '06:16',
  uploadDate: '2023-12-21',
  userInputs: [[4,0],[6,0],[28,4],[28,5],[28,7],[31,3],[31,7],[36,7],[45,9],[49,3],[50,4],[51,2],[56,5],[56,8],[69,2],[71,4],[71,7],[72,10],[73,3],[75,6],[83,11],[86,2],[86,8],[99,4]]
}, {
  videoId: "wNJQPn-SLk8",
  title: 'Can sounds make food taste better? ⏲️ 6 Minute English',
  overplay: '06:20',
  uploadDate: '2023-12-22',
  userInputs: [[2,10],[4,8],[7,4],[9,7],[11,9],[16,0],[16,1],[16,4],[17,3],[17,4],[18,0],[18,5],[22,11],[30,4],[31,5],[32,3],[32,8],[34,13],[36,8],[40,1],[40,8],[40,12],[44,13],[50,6],[53,9],[55,11],[59,8],[59,12],[60,0],[61,3],[61,10]]
}, {
  videoId: "VkLIUXjNwYc",
  title: 'Do you have eco-anxiety? ⏲️ 6 Minute English',
  overplay: '06:10',
  uploadDate: '2023-12-26',
  userInputs: [[12,1],[13,4],[14,3],[18,10],[19,1],[21,6],[23,10],[26,9],[29,4],[32,4],[32,5],[32,6],[34,2],[40,4],[46,5],[47,4],[54,1],[56,8],[60,3],[61,14],[63,3],[64,2],[64,3],[64,4],[74,2],[74,4],[77,3],[78,4],[80,0],[81,8],[87,6],[107,2]]
}, {
  videoId: "DEbYvMHS1c4",
  title: 'Antarctic ice melting: BBC News Review',
  overplay: '06:36',
  uploadDate: '2024-01-01',
  userInputs: [[0,0],[1,0],[1,4],[8,8],[10,0],[12,1],[21,0],[21,8],[24,3],[43,5],[50,3],[51,1],[51,10],[68,8],[78,2]]
}, {
  videoId: "WJZQGGZ64oI",
  title: 'Learning to smile again: BBC News Review',
  overplay: '05:30',
  uploadDate: '2023-12-31',
  userInputs: [[8,13],[11,1],[11,9],[12,15],[13,0],[16,9],[17,12],[18,2],[21,1],[24,9],[24,10],[26,1],[26,3],[26,7],[31,4],[33,6],[37,6],[38,4],[57,7],[59,1],[63,1],[66,7],[68,3]]
}, {
  videoId: "dLyo5M2swUo",
  title: 'First Arab Woman in Space: BBC News Review',
  overplay: '05:23',
  uploadDate: '2023-12-31',
  userInputs: [[19,4],[42,5],[53,7],[65,3],[67,3],[74,13],[81,7]]
}, {
  videoId: "tZ-Pbwdqlt0",
  title: 'Can diet improve memory? BBC News Review',
  overplay: '06:25',
  uploadDate: '2023-12-31',
  userInputs: [[0,4],[9,1],[11,1],[15,5],[19,0],[32,8],[43,4],[64,8],[65,7],[79,5]]
}, {
  videoId: "DxR2waii1Ck",
  title: 'Should we fear chatbots? ⏲️ 6 Minute English',
  overplay: '06:17',
  uploadDate: '2023-12-19',
  userInputs: [[5,7],[12,4],[17,8],[38,1],[46,1],[46,3],[50,8],[53,3],[54,13],[57,1],[57,8],[60,7],[60,8],[61,3],[63,8],[76,3],[77,12],[78,0],[89,2],[94,7],[101,2],[101,4],[101,7],[101,8],[101,10],[102,0]]
}, {
  videoId: "hGzKWfQOKeQ",
  title: 'Foraging for wild food ⏲️ 6 Minute English',
  overplay: '06:20',
  uploadDate: '2023-12-25',
  userInputs: [[4,10],[6,5],[8,15],[12,13],[13,0],[16,1],[20,10],[20,12],[21,1],[22,13],[24,5],[26,12],[27,4],[27,6],[27,11],[30,7],[32,3],[36,3],[43,8],[45,16],[45,17],[49,2],[50,11],[56,4],[56,11],[60,12]]
}, {
  videoId: "lAUivF-NEuM",
  title: 'Lego gives up on recycled bricks: BBC News Review',
  overplay: '06:07',
  uploadDate: '2023-12-28',
  userInputs: [[10,2],[10,9],[14,2],[20,3],[23,1],[50,8],[91,1]]
}, {
  videoId: "jGuEB_X-Mt4",
  title: 'Fukushima Water Release: BBC News Review',
  overplay: '06:47',
  uploadDate: '2024-01-02',
  userInputs: [[13,2],[13,3],[14,3],[14,5],[44,5],[48,7],[48,9],[67,2],[70,7],[85,2],[89,5],[95,11],[96,4]]
}, {
  videoId: "G1GitpVlK3Q",
  title: 'English Rewind - London Life: Rhyming slang',
  overplay: '06:23',
  uploadDate: '2023-12-26',
  userInputs: [[0,1],[21,6],[27,12],[28,5],[77,1],[77,7],[80,0],[80,1],[82,9],[82,10],[83,4],[83,6],[83,7],[84,0],[84,3],[85,1],[86,0],[86,1],[87,14],[89,0],[90,1],[95,0],[103,14],[103,17]]
}, {
  videoId: "V0dFKMVs9sg",
  title: 'Improving maths with music: BBC News Review',
  overplay: '06:28',
  uploadDate: '2023-12-30',
  userInputs: [[0,3],[6,5],[8,1],[11,2],[17,4],[26,10],[37,8],[45,8],[56,1],[60,12],[75,11],[77,2],[78,11],[86,2],[90,10]]
}]

export function getVideoInfo(videoId: string): VideoInfo | undefined {
  return videoList.find(video => video.videoId === videoId)
}

export function getVideosOrderByDate() {
  return videoList.slice(0, 10)
}

export function getRecommendedVideos() {
  videoList.sort((v0, v1) => v1.uploadDate.localeCompare(v0.uploadDate))
  return filterItem<VideoInfo>(videoList, video => video.uploadDate)
}