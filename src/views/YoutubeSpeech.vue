<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SpeechToText from '@/SpeechToText/SpeechToText.vue'
import { useVideoStore } from '@/stores/videoInfo'
declare const YT: any

const videoStore = useVideoStore()

let player: any
onMounted(() => {
  const tag = document.createElement('script')
  tag.src = "https://www.youtube.com/iframe_api"
  const firstScriptTag = document.getElementsByTagName('script')[0]
  firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);
  (window as any).onYouTubeIframeAPIReady = () => {
    player = new YT.Player('player', {
      height: '350',
      width: 'auto',
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
let lastVideoId: any
function onPlayerReady() {
  playerReady.value = true
  player.loadPlaylist(videoStore.getSortedVideos().map((video) => video.videoId))
}
function onPlayerStateChange(event: any) {
  playerState.value = event.data
  if (event.data === -1) {
    const currentVideoId = event.target.getVideoData().video_id;
    if (currentVideoId !== lastVideoId) {
      lastVideoId && videoStore.addWatchTimes(lastVideoId)
      lastVideoId = currentVideoId
    }
  }
}

const text = ref('speak something')

const downloadVideoInfo = () => {
  const videos = videoStore.getSortedVideos()
  const blob = new Blob([videos.map((video) => `${video.videoId},${video.watchTimes}`).join(',\n')], { type: "application/octet-stream" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "videosInfo.csv"
  a.style.display = "none"
  document.body.appendChild(a)
  a.click()
  URL.revokeObjectURL(url)
  document.body.removeChild(a)
}
</script>
<template>
  <div class="main-container" v-loading="playerState === -2">
    <div id="player"></div>
    <SpeechToText v-model="text"></SpeechToText>
    <el-button @click="downloadVideoInfo">Download Videos Info</el-button>
  </div>
</template>
  
<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  width: 100dvw;
  height: 100dvh;
  padding-top: 30px;
}
</style>