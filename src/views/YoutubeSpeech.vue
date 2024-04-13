<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import SpeechToText from '@/SpeechToText/SpeechToText.vue'
declare const YT: any
import { useVideoStore } from '@/stores/video'
import type { Video } from '@/stores/video'
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
let lastVideoId: string
let videos: Video[] = []
function onPlayerReady() {
  const onReady = () => {
    playerReady.value = true
    videos = videoStore.getListenList()
    player.loadPlaylist(videos.map((video) => video.id))
    setInterval(() => {
      const currentTime = player.getCurrentTime()
      const duration = player.getDuration()
      if (currentTime && duration && duration - currentTime < 3) {
        const currentVideoId: string = player.getVideoData().video_id
        if (currentVideoId !== lastVideoId) {
          videoStore.addWatchTimes(videos.find((video) => video.id === currentVideoId)!)
          lastVideoId = currentVideoId
        }
      }
    }, 1000)
  }

  if (videoStore.entities.length) {
    onReady()
  } else {
    const videoWatch = watch(() => videoStore.entities, () => {
      if (videoStore.entities.length) {
        onReady()
        videoWatch()
      }
    })
  }
}
function onPlayerStateChange(event: any) {
  playerState.value = event.data
}

const text = ref('speak something')

const downloadVideoInfo = () => {
  const blob = new Blob([[...videoStore.entities].sort((v0, v1) => v0.id!.localeCompare(v1.id!))
    .map((video) => `${video.id},${video.listenedTimes}`).join(',\n')], { type: "application/octet-stream" })
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