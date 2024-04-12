import router from '@/router'
import { defineStore } from 'pinia'
import { auth, db } from '@/config/firebase'
import { useSystemStore } from '@/stores/system'
import type { User } from 'firebase/auth'
import { collection } from 'firebase/firestore'
import { useWordStore } from './word'
import { useVideoStore } from './video'

const appName = 'dictation'

export const useUserStore = defineStore('user', {
  state: () => {
    const userString = localStorage.getItem('user')
    return {
      user: userString ? JSON.parse(userString) : auth.currentUser,
    }
  },
  actions: {
    async setUser(user: User | null) {
      const success = () => {
        this.user = user
        useSystemStore().setLoading(false)
      }

      if (!user) {
        localStorage.removeItem('user')
        router.push({ name: 'Portal'})
        success()
        return
      }

      localStorage.setItem('user', JSON.stringify(user))
      await useWordStore().init(this.getAppCollection())
      await useVideoStore().init(this.getAppCollection())
      success()
    },
    getAppCollection() {
      return collection(db, `users/${this.user.uid}/${appName}`)
    }
  },
})