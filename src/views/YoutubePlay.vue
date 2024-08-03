<script setup lang="ts">
import { onMounted, onUnmounted, ref, reactive, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import parseXMLCaption from '@/core/CaptionXMLParser'
import AutoWidthInput from '@/components/AutoWidthInput.vue'
import VideoCompact from '@/components/VideoCompact.vue'
import SpeechToText from '@/components/SpeechToText.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type CaptionText from '@/types/CaptionText'
import type { FormInstance, FormRules, MessageHandler, ScrollbarInstance } from 'element-plus'
import { addUnloadConfirm } from '@/core/EventListener'
import customPromise from '@/common/customPromise'
import { useVideoStore, type Video } from '@/stores/video'
import { useWordStore } from '@/stores/word'
import { useSystemStore } from '@/stores/system'
declare const YT: any

const router = useRouter()
const route = useRoute()
const videoStore = useVideoStore()
const wordStore = useWordStore()
const systemStore = useSystemStore()

const videos = ref<Video[]>([])
const loadVideos = () => {
  videos.value = videoStore.getNewVideos()
  videos.value.sort((v0, v1) => v1.uploadedTime!.getTime() - v0.uploadedTime!.getTime())
  if (!route.params.videoId && videos.value.length) {
    router.push(`/youtube/play/${videos.value[0].id}`)
  }
}

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

watch(
  () => route.params.videoId,
  loadVideo
)

if (videoStore.entities.length) {
  loadVideos()
  loadVideo()
} else {
  const videosWatch = watch(() => videoStore.entities, () => {
    if (videoStore.entities.length) {
      loadVideos()
      loadVideo()
      videosWatch()
    }
  })
}

const playerReady = ref(false)
const playerState = ref(-2)
let playerTimeInterval = ref(0)
let currentIndex = -1
let currentTime = -1
let volumeMessage: MessageHandler
function onPlayerReady() {
  playerReady.value = true
  if (videoStore.entities.length) {
    loadVideos()
    loadVideo()
  }
  playerTimeInterval.value = setInterval(() => {
    currentTime = player.getCurrentTime()
    const findIndex = captionTexts.value.findLastIndex(captionText => captionText.start <= currentTime && currentTime < captionText.start + captionText.dur)
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
async function loadVideo() {
  if (!player || !player.loadVideoById) {
    return
  }
  const videoId = route.params.videoId as string
  if (!videoId) {
    loadVideos()
    return
  }
  const video = videos.value.find((v) => v.id === videoId)
  if (!video) {
    router.push(`/youtube/play`)
    return
  }
  await videoStore.getDetail(video)
  captionTexts.value = []
  userInputs.value = []
  const parseResult: CaptionText[] = parseXMLCaption(video.timedtext!)
  for (const captionText of parseResult) {
    captionTexts.value.push(captionText)
    userInputs.value.push([])
  }
  parseResult.forEach((captionText, i) => {
    captionText.words.forEach((word, j) => {
      if (wordStore.needSpell(word.value)) {
        userInputs.value[i][j] = ''
      }
    })
  })
  player.loadVideoById(videoId)
  showCaption.value = true
  showAnswer.value = false
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

function moreVideoOnclick(video: Video) {
  if (video.id !== route.params.videoId) {
    ElMessageBox.confirm('Changes you made may not be saved.', 'Leave site?', {
      customStyle: {
        verticalAlign: 'top'
      }
    }).then(() => {
      router.push(`/youtube/play/${video.id}`)
    })
  }
}

const saveWords = async () => {
  const json: number[][] = []
  const correctWords = new Set<string>()
  const wrongWords = new Set<string>()
  captionTexts.value.forEach((captionText, i) => {
    captionText.words.forEach((word, j) => {
      if (userInputs.value[i][j] !== undefined) {
        if (userInputs.value[i][j] === word.value) {
          correctWords.add(word.value.toLowerCase())
        } else {
          json.push([i, j])
          if (userInputs.value[i][j]) {
            wrongWords.add(word.value.toLowerCase())
            wrongWords.add(userInputs.value[i][j].toLowerCase())
          }
        }
      }
    })
  })
  systemStore.setLoading(true)
  console.log('correct-----------------------------------------------------')
  Array.from(correctWords).forEach(correctWord => {
    if (!wrongWords.has(correctWord)) {
      console.log(correctWord)
      wordStore.addWordSpellTimes(correctWord)
    }
  })
  console.log('wrong-----------------------------------------------------')
  Array.from(wrongWords).forEach(async wrongWord => {
    console.log(wrongWord)
    wordStore.minusWordSpellTimes(wrongWord)
  })
  await wordStore.commit()
  systemStore.setLoading(false)

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
}

const downloadWords = () => {
  const words = [...wordStore.entities].sort((w0, w1) => w0.id! > w1.id! ? 1 : -1)
  const blob = new Blob([words.map((word) => `${word.id},${word.speltDate},${word.speltTimes}`).join(',\n')], { type: "application/octet-stream" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "familiarWords.csv"
  a.style.display = "none"
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

onUnmounted(() => {
  clearInterval(playerTimeInterval.value)
  document.removeEventListener('keydown', onKeydown)
})

interface AddVideoForm {
  url: string
  timedtext: string
}

const addVideoDialogVisible = ref(false)
const addVideoForm = reactive<AddVideoForm>({
  url: '',
  timedtext: '',
})
const addVideoFormRef = ref<FormInstance>()
const urlPattern = /[?&]v=([^&]+)/
const rules = reactive<FormRules<AddVideoForm>>({
  url: [
    { required: true, message: 'Please input URL', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value.match(urlPattern)) {
          callback()
        } else {
          callback(new Error(rule.message))
        }
      }, message: 'Can not read video id', trigger: 'blur'
    },
  ],
  timedtext: [
    { required: true, message: 'Please input timedtext', trigger: 'blur' },
  ]
})
const submitAddVideoForm = () => {
  addVideoFormRef.value!.validate(async (valid) => {
    if (valid) {
      const video = {
        id: addVideoForm.url.match(urlPattern)![1],
        uploadedTime: new Date(),
        listenedTimes: -1,
        timedtext: addVideoForm.timedtext,
      } as Video
      videoStore.setEntity(video)
      await customPromise(videoStore.commit())
      ElMessage({
        message: 'Video added successfully.',
        type: 'success',
      })
      loadVideos()
      addVideoForm.url = ''
      addVideoForm.timedtext = ''
      addVideoDialogVisible.value = false
    } else {
      return false
    }
  })
}
</script>
<template>
  <el-container class="player-container">
    <el-aside width="660px" class="player-side">
      <div style="height: 100%;">
        <div id="player"></div>
        <el-row class="videos-container">
          <el-scrollbar height="100%">
            <div class="videos-wrapper">
              <div class="video-cover-wrapper el-card is-always-shadow">
                <el-button link @click="addVideoDialogVisible = true">Add Video</el-button>
              </div>
              <VideoCompact v-for="video in videos" :key="video.id"
                @click="moreVideoOnclick(video)" :video="video">
              </VideoCompact>
            </div>
          </el-scrollbar>
        </el-row>
      </div>
    </el-aside>
    <el-main ref="playerMain" class="player-main">
      <el-row>
        <el-switch v-model="showCaption" class="show-caption-switch" inline-prompt active-text="hide caption"
          inactive-text="show caption" />
        <el-switch v-show="showCaption" v-model="showAnswer" inline-prompt active-text="hide answer"
          inactive-text="show answer" />
        <el-button @click="saveWords">Save Words</el-button>
        <el-button @click="downloadWords">Download Words</el-button>
        <el-button @click="loadVideo">Reload</el-button>
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
  <el-dialog v-model="addVideoDialogVisible" title="Add Video" width="80%">
    <el-form ref="addVideoFormRef" :model="addVideoForm" :rules="rules" label-width="auto">
      <el-form-item label="URL" prop="url">
        <el-input v-model="addVideoForm.url" />
      </el-form-item>
      <el-form-item label="Timedtext" prop="timedtext">
        <el-input v-model="addVideoForm.timedtext" :rows="10" type="textarea" />
      </el-form-item>
      <el-form-item class="form-button">
        <el-button type="primary" @click="submitAddVideoForm()">
          Add
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
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

#player {
  height: 360px;
  width: 640px;
}

.videos-container {
  margin-top: 20px;
  height: calc(100% - 430px);
}

.videos-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 5px;
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
  vertical-align: top;
  display: inline-flex;
  flex-direction: column;
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

.video-cover-wrapper {
  width: 168px;
  height: 95px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.form-button {
  justify-content: flex-end;
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

.form-button .el-form-item__content {
  flex-grow: 0;
  min-width: auto;
}

.video-cover-wrapper>div {
  cursor: pointer;
}
</style>@/stores/wordOld