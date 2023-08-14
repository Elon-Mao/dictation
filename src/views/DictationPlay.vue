<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import parseXMLCaption from '@/core/CaptionXMLParser'
import { getRecommendedVideos, getVideoInfo, getVideosOrderByDate } from '@/fetch/videoData'
import AutoWidthInput from '@/components/AutoWidthInput.vue'
import VideoCompact from '@/components/VideoCompact.vue'
import { ElMessageBox } from 'element-plus'
import type CaptionText from '@/types/CaptionText'
import type { ScrollbarInstance } from 'element-plus'
import type VideoInfo from '@/types/VideoInfo'
declare const YT: any

const voiceInput = ref('')
const recognition = new (window as any).webkitSpeechRecognition()
recognition.lang = 'en-US'
recognition.continuous = true
let results: SpeechRecognitionResult[] = []
recognition.onresult = (event: {
  results: SpeechRecognitionResult[]
}) => {
  results = [...event.results]
}
recognition.onend = () => {
  voiceInput.value = results.map(result => result[0].transcript).join()
  speeching.value = false
}

const route = useRoute()
const router = useRouter()
let videoId = route.params.videoId as string

const scrollbar = ref<ScrollbarInstance>()
let scrollbarView: HTMLDivElement
let player: any
onMounted(() => {
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
  document.addEventListener('keyup', onKeyup)
}
function onPlayerStateChange(event: {
  data: number
}) {
  playerState.value = event.data
}
let altDown = false
const speeching = ref(false)
const speechKeyPress = ref(false)
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
  } else if (event.key === 'Alt') {
    altDown = true
  } else if (event.key === 'l' && altDown && !speeching.value) {
    speechKeyPress.value = true
    voiceInput.value = ''
    recognition.start()
    speeching.value = true
  }
}
function onKeyup(event: KeyboardEvent) {
  if (event.key === 'Alt') {
    altDown = false
  } else if (event.key === 'l' && speechKeyPress) {
    recognition.stop()
    speechKeyPress.value = false
  }
}

const captionTexts = ref<CaptionText[]>([])
const userInputs = ref<string[][]>([])
const videoInfo = ref<VideoInfo | undefined>()
const recommendedVideos = ref<VideoInfo[]>([])
const lastVideos = ref<VideoInfo[]>([])
function loadVideo() {
  parseXMLCaption(videoId).then((parseResult: CaptionText[]) => {
    captionTexts.value = []
    userInputs.value = []
    for (const captionText of parseResult) {
      captionTexts.value.push(captionText)
      userInputs.value.push([])
    }
    videoInfo.value = getVideoInfo(videoId)
    for (const userinput of videoInfo.value?.userInputs || []) {
      userInputs.value[userinput[0]][userinput[1]] = ''
    }
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
  ElMessageBox.confirm('Your inputs will not be saved?')
    .then(() => {
      playerState.value = -2
      router.push(`/dictation/${videoInfo.videoId}/play`)
      videoId = videoInfo.videoId
      loadVideo()
    })
}

onUnmounted(() => {
  clearInterval(playerTimeInterval.value)
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('keyup', onKeyup)
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
              <VideoCompact v-for="videoInfo in recommendedVideos" :key="videoInfo.videoId" @click="moreVideoOnclick(videoInfo)"
                :video-info="videoInfo">
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
    <el-main class="player-main">
      <el-row>
        <el-switch v-model="showCaption" class="show-caption-switch" inline-prompt active-text="hide caption"
          inactive-text="show caption" />
        <el-switch v-show="showCaption" v-model="showAnswer" inline-prompt active-text="hide answer"
          inactive-text="show answer" />
      </el-row>
      <el-row>
        <div v-show="speechKeyPress" class="speeching-wrapper">
          <div style="--d: 0"></div>
          <div style="--d: 1"></div>
          <div style="--d: 2"></div>
          <div style="--d: 3"></div>
          <div style="--d: 4"></div>
          <div style="--d: 5"></div>
          <div style="--d: 4"></div>
          <div style="--d: 3"></div>
          <div style="--d: 2"></div>
          <div style="--d: 1"></div>
          <div style="--d: 0"></div>
          <div style="--d: 1"></div>
          <div style="--d: 2"></div>
          <div style="--d: 3"></div>
          <div style="--d: 4"></div>
          <div style="--d: 5"></div>
          <div style="--d: 4"></div>
          <div style="--d: 3"></div>
          <div style="--d: 2"></div>
          <div style="--d: 1"></div>
          <div style="--d: 0"></div>
        </div>
        <el-input v-model="voiceInput" v-loading="speeching" class="voice-input" type="textarea"
          placeholder="hold down 'Alt+L' to speech" />
      </el-row>
      <el-scrollbar v-show="showCaption" ref="scrollbar" @wheel="captionOnWheel">
        <div v-for="(captionText, captionIndex) in captionTexts">
          <div class="caption-text" @click="captionOnclick(captionText)" @mouseenter="mouseenterCaption"
            @mouseleave="mouseleaveCaption">
            <span class="caption-number">{{ captionIndex + 1 }}</span>
            <span>{{ captionText.firstSeparator }}</span>
            <div class="caption-row">
              <template v-for="(word, wordIndex) in captionText.words">
                <div v-if="userInputs[captionIndex][wordIndex] !== undefined" class="caption-word">
                  <div class="caption-input-wrapper" @click.stop @mouseenter="mouseenterInput"
                    @mouseleave="mouseleaveInput">
                    <div v-show="showAnswer && userInputs[captionIndex][wordIndex] !== word.value"
                      class="caption-answer-error"></div>
                    <auto-width-input size="large" v-model:modelvalue="userInputs[captionIndex][wordIndex]"
                      class="caption-input" maxlength="32" />
                  </div>
                  <span v-show="showAnswer" class="caption-word-answer">{{ word.value }}</span>
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

.speeching-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}

.speeching-wrapper div {
  background: #409eff;
  width: 6px;
  height: 20%;
  margin-right: 10px;
  animation: loading 1s infinite linear;
  animation-delay: calc(0.1s * var(--d));
}

@keyframes loading {
  0% {
    height: 20%;
  }

  50% {
    height: 50%;
  }

  100% {
    height: 20%;
  }
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