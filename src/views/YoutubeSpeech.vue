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
  player.loadPlaylist(videoStore.getSortedVideos())
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
</script>
<template>
  <div class="main-container" v-loading="playerState === -2">
    <div id="player"></div>
    <SpeechToText v-model="text"></SpeechToText>
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