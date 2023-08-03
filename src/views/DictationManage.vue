<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import parseXMLCaption from '@/core/CaptionXMLParser'
import { getVideoInfo } from '@/fetch/videoData'
import type CaptionText from '@/types/CaptionText'

const captionTexts = ref<CaptionText[]>([])
const userInputs = ref<string[][]>([])

const route = useRoute()
const videoId = route.params.videoId as string
parseXMLCaption(videoId).then((parseResult: CaptionText[]) => {
  for (const captionText of parseResult) {
    captionTexts.value.push(captionText)
    userInputs.value.push([])
  }
  for (const userinput of getVideoInfo(videoId)?.userInputs || []) {
    userInputs.value[userinput[0]][userinput[1]] = 'a'
  }
})

function output() {
  const json: number[][] = []
  userInputs.value.forEach((caption, captionIndex) => {
    caption.forEach((word, wordIndex) => {
      if (word) {
        json.push([captionIndex, wordIndex])
      }
    })
  })
  console.log(JSON.stringify(json))
}

function selectWord(captionIndex: number, wordIndex: number) {
  const userInput = userInputs.value[captionIndex][wordIndex] ? '' : 'a'
  const wordValue = captionTexts.value[captionIndex].words[wordIndex].value.toLowerCase()
  captionTexts.value.forEach((captionText, x) => {
    captionText.words.forEach((word, y) => {
      if (word.value.toLowerCase() === wordValue) {
        userInputs.value[x][y] = userInput
      }
    })
  })
  output()
}
</script>

<template>
  <div v-for="(captionText, captionIndex) in captionTexts">
    <div class="caption-row">
      <template v-for="(word, wordIndex) in captionText.words">
        <span :class="['caption-word-span', { 'caption-word-selected': userInputs[captionIndex][wordIndex] }]"
          @click="selectWord(captionIndex, wordIndex)">{{ word.value }}</span>{{ word.separator }}
      </template>
    </div>
  </div>
</template>

<style scoped>
.caption-row {
  font-size: 32px;
  white-space: pre-wrap;
}

.caption-word-span {
  cursor: pointer;
}

.caption-word-span:hover {
  color: #909399;
}

.caption-word-selected {
  color: #409eff !important;
}
</style>