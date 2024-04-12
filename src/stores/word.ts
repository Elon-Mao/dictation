import { defineStore } from 'pinia'
import { useElonStore } from './elonStore'
import formatDate from '@/common/formatDate'

export interface WordOld {
  id?: string
  spellDate?: string
  spellTimes?: number
}

export interface Word {
  id?: string
  speltDate?: string
  speltTimes?: number
}

const storeId = 'words'
const today = formatDate(new Date())
export const useWordStore = defineStore(storeId, () => {
  const elonStore = useElonStore<Word>(storeId, ['speltDate', 'speltTimes'])


  const needSpell = (id: string) => {
    const word = elonStore.entityMap[id.toLowerCase()]
    return !word || word.speltDate! <= today
  }

  const addWordSpellTimes = async (id: string) => {
    id = id.toLowerCase()
    let word = elonStore.entityMap[id]
    if (!word) {
      word = {
        id,
        speltDate: today,
        speltTimes: 0
      }
    }
    const speltDate = new Date(today)
    speltDate.setDate(speltDate.getDate() + Math.pow(2, word.speltTimes!))
    word.speltDate = formatDate(speltDate)
    word.speltTimes! += 1
    await elonStore.setBrief(word)
  }

  const minusWordSpellTimes = async (id: string) => {
    id = id.toLowerCase()
    const word = elonStore.entityMap[id]
    if (word) {
      if (word.speltDate === today) {
        return
      }
      if (word.speltTimes! < 3) {
        await elonStore.deleteEntity(word)
      } else {
        word.speltDate = today
        word.speltTimes! -= 2
        await elonStore.setBrief(word)
      }
    }
  }

  return {
    ...elonStore,
    needSpell,
    addWordSpellTimes,
    minusWordSpellTimes,
  }
})
// const useWordStore = defineStore(storeId, {
//   state: () => {
//     return {
//       wordMap: {} as Record<string, WordInfo>
//     }
//   },
//   actions: {
//     async init() {
//       const words = await getDoc(wordsDoc)
//       this.wordMap = words.data() as Record<string, WordInfo>
//     },
//     needSpell(word: string) {
//       const wordInfo = this.wordMap[word.toLowerCase()]
//       return !wordInfo || wordInfo.spellDate <= today
//     },
//     async addWordSpellTimes(word: string) {
//       word = word.toLowerCase()
//       let wordInfo = this.wordMap[word]
//       if (!wordInfo) {
//         wordInfo = {
//           spellDate: today,
//           spellTimes: 0
//         }
//       }
//       const spellDate = new Date(today)
//       spellDate.setDate(spellDate.getDate() + Math.pow(2, wordInfo.spellTimes))
//       wordInfo.spellDate = formatDate(spellDate)
//       wordInfo.spellTimes += 1
//       await customPromise(updateDoc(wordsDoc, {
//         [word]: wordInfo
//       }))
//       this.wordMap[word] = wordInfo
//     },
//     async minusWordSpellTimes(word: string) {
//       word = word.toLowerCase()
//       const wordInfo = this.wordMap[word]
//       if (wordInfo) {
//         if (wordInfo.spellDate === today) {
//           return
//         }
//         if (wordInfo.spellTimes < 3) {
//           await updateDoc(wordsDoc, {
//             [word]: deleteField()
//           })
//           delete this.wordMap[word]
//         } else {
//           wordInfo.spellDate = today
//           wordInfo.spellTimes -= 2
//           await customPromise(updateDoc(wordsDoc, {
//             [word]: wordInfo
//           }))
//         }
//       }
//     },
//     async saveAll() {
//       await customPromise(setDoc(wordsDoc, this.wordMap))
//     }
//   }
// })

// await customPromise(useWordStore().init())