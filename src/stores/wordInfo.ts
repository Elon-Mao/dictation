import { defineStore } from 'pinia'
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  deleteField
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import customPromise from '@/common/customPromise'
import { useUserStore } from './user'
import formatDate from '@/common/formatDate'

export interface WordInfo {
  spellDate: string
  spellTimes: number
}

const userStore = useUserStore()
const wordsDoc = doc(db, `users/${userStore.user.uid}/dictation`, 'words')
const today = formatDate(new Date())

const useWordStore = defineStore('words', {
  state: () => {
    return {
      wordMap: {} as Record<string, WordInfo>
    }
  },
  actions: {
    async init() {
      const words = await getDoc(wordsDoc)
      this.wordMap = words.data() as Record<string, WordInfo>
    },
    needSpell(word: string) {
      const wordInfo = this.wordMap[word.toLowerCase()]
      return !wordInfo || wordInfo.spellDate <= today
    },
    async addWordSpellTimes(word: string) {
      word = word.toLowerCase()
      let wordInfo = this.wordMap[word]
      if (!wordInfo) {
        wordInfo = {
          spellDate: today,
          spellTimes: 0
        }
      }
      const spellDate = new Date(today)
      spellDate.setDate(spellDate.getDate() + Math.pow(2, wordInfo.spellTimes))
      wordInfo.spellDate = formatDate(spellDate)
      wordInfo.spellTimes += 1
      await customPromise(updateDoc(wordsDoc, {
        [word]: wordInfo
      }))
      this.wordMap[word] = wordInfo
    },
    async minusWordSpellTimes(word: string) {
      word = word.toLowerCase()
      const wordInfo = this.wordMap[word]
      if (wordInfo) {
        if (wordInfo.spellDate === today) {
          return
        }
        if (wordInfo.spellTimes < 3) {
          await updateDoc(wordsDoc, {
            [word]: deleteField()
          })
        } else {
          wordInfo.spellDate = today
          wordInfo.spellTimes -= 2
          await customPromise(updateDoc(wordsDoc, {
            [word]: wordInfo
          }))
        }
      }
    },
    async saveAll() {
      await customPromise(setDoc(wordsDoc, this.wordMap))
    }
  }
})

await customPromise(useWordStore().init())

export { useWordStore }