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
