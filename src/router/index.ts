import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/youtube/DxR2waii1Ck/play'
    },
    {
      path: '/portal',
      name: 'Portal',
      component: () => import('@/views/Portal.vue'),
    },
    {
      path: '/youtube/play/:videoId?',
      name: 'YoutubePlay',
      component: () => import('@/views/YoutubePlay.vue')
    },
    {
      path: '/youtube/speech',
      name: 'YoutubeSpeech',
      component: () => import('@/views/YoutubeSpeech.vue')
    },
  ]
})

router.beforeEach((to) => {
  if (to.name !== 'Portal') {
    const userStore = useUserStore()
    if (!userStore.user) {
      return {
        name: 'Portal'
      }
    }
  }
})

export default router
