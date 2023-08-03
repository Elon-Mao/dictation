import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dictation/:videoId/play',
      name: 'dictationPlay',
      component: () => import('@/views/DictationPlay.vue')
    },
    {
      path: '/dictation/:videoId/manage',
      name: 'dictationManage',
      component: () => import('@/views/DictationManage.vue')
    }
  ]
})

export default router
