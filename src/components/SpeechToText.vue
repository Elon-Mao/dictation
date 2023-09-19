<script setup lang="ts">
import { voiceInstall, voiceUninstall } from '@/core/SpeechToText'
import { ref, computed } from 'vue'

const props = defineProps(['modelvalue'])
const emit = defineEmits(['update:modelvalue'])
const voiceInput = props.modelvalue !== undefined ? computed({
  get() {
    return props.modelvalue
  },
  set(value) {
    emit('update:modelvalue', value)
  }
}) : ref('')

const speeching = ref(false)
const loading = ref(false)

function onFocus() {
  voiceInstall(() => {
    speeching.value = true
    loading.value = true
    voiceInput.value = ''
  }, results => {
    loading.value = false
    voiceInput.value = results
  }, () => {
    speeching.value = false
  })
}
</script>

<template>
  <div v-show="speeching" class="speeching-wrapper">
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
  <el-input v-model="voiceInput" v-loading="!speeching && loading" type="textarea" :autosize="{ minRows: 2 }"
    @focus="onFocus" @blur="voiceUninstall" placeholder="hold down 'Alt+L' to speech" />
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
