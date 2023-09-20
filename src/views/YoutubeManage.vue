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
const wordMap = new Map()
parseXMLCaption(videoId).then((parseResult: CaptionText[]) => {
  parseResult.forEach((captionText, x) => {
    captionTexts.value.push(captionText)
    userInputs.value.push([])
    captionText.words.forEach((word, y) => {
      const key = word.value.toLowerCase()
      const indexes = wordMap.get(key)
      if (indexes === undefined) {
        wordMap.set(key, [[x, y]])
      } else {
        indexes.push([x, y])
      }
    })
  })
  const userInputIndexes = getVideoInfo(videoId)?.userInputs || []
  if (userInputIndexes.length === 0) {
    for (const [key, value] of wordMap) {
      if (value.length === 1 && key.length > 10) {
        userInputs.value[value[0][0]][value[0][1]] = 'a'
      }
    }
  }
  for (const userinput of userInputIndexes) {
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
  for (const indexes of wordMap.get(wordValue)) {
    userInputs.value[indexes[0]][indexes[1]] = userInput
  }
  output()
}

function getNum(word: string) {
  return wordMap.get(word.toLowerCase()).length
}
</script>

<template>
  <div v-for="(captionText, captionIndex) in captionTexts">
    <div class="caption-row">
      {{ captionText.firstSeparator }}
      <template v-for="(word, wordIndex) in captionText.words">
        <span
          :class="['caption-word-span', { 'caption-word-selected': userInputs[captionIndex][wordIndex] }, { 'caption-word-once': getNum(word.value) === 1 }]"
          :title="getNum(word.value)" @click="selectWord(captionIndex, wordIndex)">{{ word.value }}</span>{{
            word.separator }}
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

.caption-word-once {
  font-size: 40px;
}
</style>