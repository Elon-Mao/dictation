<script setup lang="ts">
import type VideoInfo from '@/types/VideoInfo'

const props = defineProps<{
  videoInfo: VideoInfo
}>()

const src = `/${props.videoInfo.videoId}/hqdefault.jpg`
</script>

<template>
  <div class="video-compact">
    <div class="video-cover-wrapper">
      <el-image :src="src" />
      <span class="video-overplay">{{ props.videoInfo.overplay }}</span>
    </div>
    <div class="video-info">
      <span class="video-title">{{ props.videoInfo.title }}</span>
      <span class="video-upload-date">{{ props.videoInfo.uploadDate }}</span>
    </div>
  </div>
</template>

<style scoped>
.video-compact {
  display: flex;
  cursor: pointer;
  margin-bottom: 10px;
}

.video-cover-wrapper {
  width: 168px;
  height: 94px;
  position: relative;
}

.video-overplay {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  line-height: 12px;
  font-size: 12px;
  border-radius: 4px;
  padding: 4px;
}

.video-info {
  display: flex;
  flex-direction: column;
  width: calc(100% - 168px);
}

.video-title {
  font-size: 16px;
  line-height: 16px;
}

.video-upload-date {
  font-size: 14px;
  line-height: 14px;
}
</style>
