import { defineStore } from 'pinia'
import {
  collection,
  doc,
  query,
  setDoc,
  onSnapshot
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
const wordCollection = collection(db, `users/${userStore.user.uid}/dictation/userinfo/words`)
const today = formatDate(new Date())

const useWordStore = defineStore('words', {
  state: () => {
    return {
      wordMap: {} as Record<string, WordInfo>
    }
  },
  actions: {
    init() {
      onSnapshot(query(wordCollection), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.wordMap[doc.id] = doc.data() as WordInfo
        })
      })
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
      const spellDate = new Date(wordInfo.spellDate)
      spellDate.setDate(spellDate.getDate() + Math.pow(2, wordInfo.spellTimes))
      wordInfo.spellDate = formatDate(spellDate)
      wordInfo.spellTimes += 1
      await customPromise(setDoc(doc(wordCollection, word), wordInfo))
    }
  }
})

useWordStore().init()

export { useWordStore }