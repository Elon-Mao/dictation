import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/youtube/Tefu_NvcC0k/play'
    },
    {
      path: '/youtube/:videoId/play',
      name: 'youtubePlay',
      component: () => import('@/views/YoutubePlay.vue')
    },
    {
      path: '/youtube/:videoId/manage',
      name: 'youtubeManage',
      component: () => import('@/views/YoutubeManage.vue')
    },
    {
      path: '/recite',
      name: 'recite',
      component: () => import('@/views/Recite.vue')
    }
  ]
})

export default router
