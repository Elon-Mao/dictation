<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import parseXMLCaption from '@/core/CaptionXMLParser'
import { getRecommendedVideos, getVideoInfo, getVideosOrderByDate } from '@/fetch/videoData'
import AutoWidthInput from '@/components/AutoWidthInput.vue'
import VideoCompact from '@/components/VideoCompact.vue'
import SpeechToText from '@/components/SpeechToText.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type CaptionText from '@/types/CaptionText'
import type { MessageHandler, ScrollbarInstance } from 'element-plus'
import type VideoInfo from '@/types/VideoInfo'
import { addUnloadConfirm } from '@/core/EventListener'
declare const YT: any

const router = useRouter()
const route = useRoute()
let videoId = route.params.videoId as string

const scrollbar = ref<ScrollbarInstance>()
let scrollbarView: HTMLDivElement
let player: any
onMounted(() => {
  addUnloadConfirm()
  scrollbarView = scrollbar.value!.wrapRef!.children[0] as HTMLDivElement
  const tag = document.createElement('script')
  tag.src = "https://www.youtube.com/iframe_api"
  const firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
  (window as any).onYouTubeIframeAPIReady = () => {
    player = new YT.Player('player', {
      height: '360',
      width: '640',
      playerVars: {
        'iv_load_policy': 3,
        'modestbranding': 1,
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    })
  }
})

const playerReady = ref(false)
const playerState = ref(-2)
let playerTimeInterval = ref(0)
let currentIndex = -1
let currentTime = -1
let volumeMessage: MessageHandler
function onPlayerReady() {
  playerReady.value = true
  loadVideo()
  playerTimeInterval.value = setInterval(() => {
    currentTime = player.getCurrentTime()
    const findIndex = captionTexts.value.findIndex(captionText => captionText.start <= currentTime && currentTime < captionText.start + captionText.dur)
    if (findIndex === -1 || findIndex === currentIndex) {
      return
    }
    scrollbarView.children[currentIndex]?.children[0].classList.remove('caption-text-current')
    currentIndex = findIndex
    const currentCaption = scrollbarView.children[findIndex].children[0] as HTMLDivElement
    currentCaption.classList.add('caption-text-current')
    if (!recentlyWheel) {
      scrollbar.value!.setScrollTop(Math.max(currentCaption.offsetTop - 200, 0))
    }
  }, 100)
  document.addEventListener('keydown', onKeydown)
}
function onPlayerStateChange(event: {
  data: number
}) {
  playerState.value = event.data
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === ' ') {
    event.preventDefault()
    const playerState = player.getPlayerState()
    if (playerState === 1) {
      player.pauseVideo()
    } else if (playerState === 2) {
      player.playVideo()
    }
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    player.seekTo(currentTime - 3, true)
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    player.seekTo(currentTime + 3, true)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    const volume = Math.min(player.getVolume() + 5, 100)
    player.setVolume(volume)
    volumeMessage?.close()
    volumeMessage = ElMessage(`volume:${volume}%`)
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    const volume = Math.max(player.getVolume() - 5, 0)
    player.setVolume(volume)
    volumeMessage?.close()
    volumeMessage = ElMessage(`volume:${volume}%`)
  } else if (event.key === 'Enter') {
    event.preventDefault()
    showAnswer.value = !showAnswer.value
  }
}

const captionTexts = ref<CaptionText[]>([])
const userInputs = ref<string[][]>([])
const videoInfo = ref<VideoInfo | undefined>()
const recommendedVideos = ref<VideoInfo[]>([])
const lastVideos = ref<VideoInfo[]>([])
const familiarWords = new Map()
function loadVideo() {
  captionTexts.value = []
  userInputs.value = []
  parseXMLCaption(videoId).then((parseResult: CaptionText[]) => {
    for (const captionText of parseResult) {
      captionTexts.value.push(captionText)
      userInputs.value.push([])
    }
    videoInfo.value = getVideoInfo(videoId)
    if (!videoInfo.value) {
      return
    }
    const uploadDate = new Date(videoInfo.value.uploadDate)
    uploadDate.setDate(uploadDate.getDate() + 30)
    if (uploadDate < new Date()) {
      videoInfo.value.userInputs = []
    }
    if (videoInfo.value.userInputs.length === 0) {
      const xhr = new XMLHttpRequest()
      xhr.open("GET", '/familiarWords.csv')
      xhr.onload = () => {
        xhr.response.split(/,\r?\n/).forEach((row: string) => {
          const [familiarWord, times] = row.split(',')
          familiarWords.set(familiarWord, Number(times))
        })
        parseResult.forEach((captionText, i) => {
          captionText.words.forEach((word, j) => {
            const wordLowerCase = word.value.toLowerCase()
            if (word.value.length !== 1 && (!familiarWords.has(wordLowerCase) || familiarWords.get(wordLowerCase) < 3)) {
              userInputs.value[i][j] = ''
            }
          })
        })
      }
      xhr.send()
    } else {
      for (const userinput of videoInfo.value.userInputs) {
        userInputs.value[userinput[0]][userinput[1]] = ''
      }
    }
  }).finally(() => {
    recommendedVideos.value = getRecommendedVideos()
    lastVideos.value = getVideosOrderByDate()
    player.loadVideoById(videoId)
    showCaption.value = true
    showAnswer.value = false
  })
}

const showCaption = ref(true)
const showAnswer = ref(false)

function captionOnclick(captionText: CaptionText) {
  recentlyWheel = setTimeout(stopWheel, 4000)
  player.playVideo()
  player.seekTo(captionText.start, true)
}

function mouseenterCaption(event: MouseEvent) {
  (event.target as HTMLDivElement).parentElement!.classList.add('caption-text-hover')
}

function mouseleaveCaption(event: MouseEvent) {
  (event.target as HTMLDivElement).parentElement!.classList.remove('caption-text-hover')
}

function mouseenterInput(event: MouseEvent) {
  (event.target as HTMLDivElement).parentElement!.parentElement!.parentElement!.parentElement!.classList.remove('caption-text-hover')
}

function mouseleaveInput(event: MouseEvent) {
  (event.target as HTMLDivElement).parentElement!.parentElement!.parentElement!.parentElement!.classList.add('caption-text-hover')
}

let recentlyWheel = 0
function stopWheel() {
  recentlyWheel = 0
}
function captionOnWheel() {
  clearTimeout(recentlyWheel)
  recentlyWheel = setTimeout(stopWheel, 4000)
}


function moreVideoOnclick(videoInfo: VideoInfo) {
  if (videoInfo.videoId !== videoId) {
    ElMessageBox.confirm('Changes you made may not be saved.', 'Leave site?', {
      customStyle: {
        verticalAlign: 'top'
      }
    }).then(() => {
      router.push(`/youtube/${videoInfo.videoId}/play`)
      videoId = videoInfo.videoId
      loadVideo()
    })
  }
}

watch(showAnswer, () => {
  if (!showAnswer.value) {
    return
  } 

  const json: number[][] = []
  const correctWords = new Set()
  captionTexts.value.forEach((captionText, i) => {
    captionText.words.forEach((word, j) => {
      if (userInputs.value[i][j] !== undefined) {
        if (userInputs.value[i][j] === word.value) {
          correctWords.add(word.value.toLowerCase())
        } else {
          json.push([i, j])
          if (familiarWords.has(word.value.toLowerCase())) {
            console.log(word.value.toLowerCase(), userInputs.value[i][j])
          }
        }
      }
    })
  })
  Array.from(correctWords).forEach(correctWord => {
    if (familiarWords.has(correctWord)) {
      familiarWords.set(correctWord, familiarWords.get(correctWord) + 1)
    } else {
      familiarWords.set(correctWord, 1)
    }
  })

  console.log(JSON.stringify(json))
  if (json.length === 0) { 
    ElMessage({
      message: `all right`,
      type: 'success',
    })
  } else {
    player.seekTo(captionTexts.value[json[0][0]].start, true)
    ElMessage.error(`some mistakes`)
  }
  if (videoInfo.value!.userInputs.length !== 0) {
    return
  }
  const blob = new Blob([Array.from(familiarWords.entries()).join(',\n')], { type: "application/octet-stream" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "familiarWords.csv"
  a.style.display = "none"
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
})

onUnmounted(() => {
  clearInterval(playerTimeInterval.value)
  document.removeEventListener('keydown', onKeydown)
})
</script>
<template>
  <el-container class="player-container" v-loading="playerState === -2">
    <el-aside width="660px" class="player-side">
      <div style="height: 100%;">
        <div class="player-wrapper">
          <div id="player"></div>
          <el-row>
            <el-col :span="18">
              <span v-if="videoInfo" class="video-title" :title="videoInfo.title">{{ videoInfo.title }}</span>
            </el-col>
            <el-col :span="6">
              <span class="video-upload-date">upload date: {{ videoInfo?.uploadDate }}</span>
            </el-col>
          </el-row>
        </div>
        <el-row class="more-video">
          <el-col :span="12" class="lastest-videos">
            <el-scrollbar height="100%">
              <VideoCompact v-for="videoInfo in recommendedVideos" :key="videoInfo.videoId"
                @click="moreVideoOnclick(videoInfo)" :video-info="videoInfo">
              </VideoCompact>
            </el-scrollbar>
          </el-col>
          <el-col :span="12" class="dated-videos">
            <el-scrollbar height="100%">
              <VideoCompact v-for="videoInfo in lastVideos" :key="videoInfo.videoId" @click="moreVideoOnclick(videoInfo)"
                :video-info="videoInfo">
              </VideoCompact>
            </el-scrollbar>
          </el-col>
        </el-row>
      </div>
    </el-aside>
    <el-main ref="playerMain" class="player-main">
      <el-row>
        <el-switch v-model="showCaption" class="show-caption-switch" inline-prompt active-text="hide caption"
          inactive-text="show caption" />
        <el-switch v-show="showCaption" v-model="showAnswer" inline-prompt active-text="hide answer"
          inactive-text="show answer" />
      </el-row>
      <el-row class="voice-input">
        <SpeechToText />
      </el-row>
      <el-scrollbar v-show="showCaption" ref="scrollbar" @wheel="captionOnWheel">
        <div v-for="(captionText, captionIndex) in captionTexts">
          <div class="caption-text" @click="captionOnclick(captionText)" @mouseenter="mouseenterCaption"
            @mouseleave="mouseleaveCaption">
            <span class="caption-number">{{ captionIndex + 1 }}</span>
            <div class="caption-row">
              <span>{{ captionText.firstSeparator }}</span>
              <template v-for="(word, wordIndex) in captionText.words">
                <div v-if="userInputs[captionIndex][wordIndex] !== undefined" class="caption-word">
                  <div class="caption-input-wrapper" @click.stop @mouseenter="mouseenterInput"
                    @mouseleave="mouseleaveInput">
                    <div v-show="showAnswer && userInputs[captionIndex][wordIndex] !== word.value"
                      class="caption-answer-error"></div>
                    <auto-width-input size="large" v-model:modelvalue="userInputs[captionIndex][wordIndex]"
                      class="caption-input" maxlength="32" />
                  </div>
                  <span v-show="showAnswer && userInputs[captionIndex][wordIndex]" class="caption-word-answer">
                    {{ word.value }}
                  </span>
                </div>
                <span v-else class="caption-word-span">{{ word.value }}</span>
                <span class="caption-word-span">{{ word.separator }}</span>
              </template>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
  
<style scoped>
.player-container {
  height: calc(100vh - 16px);
  line-height: 40px;
  font-size: 24px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.player-side {
  padding: 20px 0 0 20px;
}

.player-wrapper {
  line-height: 30px;
  display: flex;
  flex-direction: column;
}

.player-wrapper .el-col {
  height: 30px;
}

#player {
  height: 360px;
  width: 640px;
}

.video-title {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.video-upload-date {
  float: right;
  font-size: 14px;
}

.more-video {
  margin-top: 20px;
  height: calc(100% - 430px);
}

.lastest-videos {
  height: 100%;
  padding-right: 5px;
}

.dated-videos {
  height: 100%;
  padding-left: 5px;
}

.player-main {
  display: flex;
  flex-direction: column;
}

.player-main span {
  vertical-align: top;
}

.voice-input {
  width: calc(100% - 50px);
  padding-left: 25px;
  padding-bottom: 10px;
}

.show-caption-switch {
  margin: 0 20px 5px 30px;
}

.caption-text {
  display: inline-flex;
  cursor: pointer;
  white-space: nowrap;
}

.caption-text-current {
  color: #409eff;
}

.caption-text-hover {
  color: #909399;
}

.caption-number {
  display: inline-block;
  margin-right: 10px;
  width: 40px;
  text-align: right;
}

.caption-row {
  display: inline-block;
  white-space: pre-wrap;
}

.caption-word {
  display: inline-block;
  height: 82px;
}

.caption-input-wrapper {
  position: relative;
}

.caption-answer-error {
  box-shadow: 0 0 0 2px var(--el-color-danger) inset;
  position: absolute;
  z-index: 1;
  pointer-events: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.caption-input {
  min-width: 100px;
}

.caption-word-answer {
  padding: 1px 15px;
}

.caption-word-span {
  padding: 1px 0px;
}
</style>
<style>
.el-input {
  font-size: 24px !important;
}

.el-textarea__inner {
  line-height: 40px;
  font-size: 24px !important;
}
</style>