<script setup lang="ts">
import { objectStorage } from '@/core/setting'
import type VideoInfo from '@/types/VideoInfo'

const props = defineProps<{
  videoInfo: VideoInfo
}>()

const src = `${objectStorage}/${props.videoInfo.videoId}/hqdefault.jpg`
const bodyStyle = {
  padding: '0',
  display: 'flex',
  cursor: 'pointer',
  height: '94px',
}
</script>

<template>
  <el-card :body-style="bodyStyle" class="video-compact">
    <div class="video-cover-wrapper">
      <el-image :src="src" />
      <span class="video-overplay">{{ props.videoInfo.overplay }}</span>
    </div>
    <div class="video-info">
      <span class="video-title" :title="props.videoInfo.title">{{ props.videoInfo.title }}</span>
      <span class="video-upload-date">{{ props.videoInfo.uploadDate }}</span>
    </div>
  </el-card>
</template>

<style scoped>
.video-compact {
  margin-bottom: 10px;
  width: calc(100% - 12px);
}

.video-cover-wrapper {
  width: 168px;
  height: 100%;
  position: relative;
}

.video-overplay {
  position: absolute;
  bottom: 1px;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  line-height: 12px;
  font-size: 12px;
  border-radius: 4px;
  padding: 4px;
}

.video-info {
  padding-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 168px);
  height: 100%;
}

.video-title {
  font-size: 16px;
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.video-upload-date {
  padding-right: 2px;
  font-size: 14px;
  line-height: 16px;
  text-align: right;
}
</style>
