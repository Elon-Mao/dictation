<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

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

const speechKeyPress = ref(false)
const speeching = ref(false)
let altDown = false
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Alt') {
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
document.addEventListener('keydown', onKeydown)
document.addEventListener('keyup', onKeyup)

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('keyup', onKeyup)
})
</script>

<template>
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
  <el-input v-model="voiceInput" v-loading="speeching" type="textarea"
    placeholder="hold down 'Alt+L' to speech" />
</template>

<style scoped>
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
</style>
