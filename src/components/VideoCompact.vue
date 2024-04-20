<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { More } from '@element-plus/icons-vue'
import { useVideoStore } from '@/stores/video'
import type { Video } from '@/stores/video'

const props = defineProps<{
  video: Video
}>()
const route = useRoute()
const router = useRouter()
const videoStore = useVideoStore()
const src = `https://i.ytimg.com/vi/${props.video.id}/mqdefault.jpg`

const deleteVideo = async () => {
  videoStore.deleteEntity(videoStore.entityMap[props.video.id!])
  await videoStore.commit()
  router.push(`/youtube/play`)
}

const moveToListenlist = async () => {
  videoStore.setDetail({
    id: props.video.id
  })
  videoStore.setBrief({
    ...props.video,
    listenedTimes: 0
  })
  await videoStore.commit()
  router.push(`/youtube/play`)
}
</script>

<template>
  <div
    :class="`video-cover-wrapper el-card is-always-shadow${route.params.videoId === props.video.id ? ' video-selected' : ''}`">
    <el-image :src="src" />
    <el-popover placement="bottom" :width="100" trigger="click" :popper-style="{ padding: 0 }">
      <template #reference>
        <el-button class="video-more-btn" :icon="More" circle @click.stop />
      </template>
      <div class="video-operation">
        <el-popconfirm title="Are you sure to delete this?" @confirm="deleteVideo">
          <template #reference>
            <el-button>Delete</el-button>
          </template>
        </el-popconfirm>
        <el-popconfirm title="Are you sure to delete this?" @confirm="moveToListenlist">
          <template #reference>
            <el-button>Move to listen list</el-button>
          </template>
        </el-popconfirm>
      </div>
    </el-popover>
  </div>
</template>

<style scoped>
.video-selected {
  box-shadow: 0 0 10px 2px blue;
  border: 0;
}

.video-selected>div {
  pointer-events: none;
}

.video-more-btn {
  position: absolute;
  top: 0;
  right: 0;
}

.video-operation {
  display: flex;
  flex-direction: column;
}

.video-operation>button {
  width: 100%;
  margin: 0;
}
</style>
