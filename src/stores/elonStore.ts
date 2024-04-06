import { defineStore } from 'pinia'
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  Timestamp,
} from 'firebase/firestore'
import type {
  CollectionReference,
  DocumentData,
} from 'firebase/firestore'

export interface BaseEntity {
  id?: string
}

export const elonStore = async <Entity extends BaseEntity>(
  storeId: string,
  collectionReference: CollectionReference,
  briefKeys: (keyof Entity)[],
  detailKeys: (keyof Entity)[],
) => {
  const briefDocument = doc(collectionReference, 'storeId')
  const detailCollection = collection(collectionReference, 'storeId', 'details')

  const getDetailDoc = (id: string) => {
    return doc(detailCollection, id)
  }

  const entityToData = (entity: Entity, keys: (keyof Entity)[]) => {
    const data = {} as Entity
    for (const key of keys) {
      if (entity[key] !== undefined) {
        data[key] = entity[key]
      }
    }
    return data
  }

  const entityToBrief = (entity: Entity) => {
    return entityToData(entity, briefKeys)
  }

  const entityToDetail = (entity: Entity) => {
    return entityToData(entity, detailKeys)
  }

  const dataToEntity = (documentData: DocumentData, entity: Entity, keys: (keyof Entity)[]) => {
    for (const key of keys) {
      const value = documentData[key as keyof DocumentData]
      if (value !== undefined) {
        if (value instanceof Timestamp) {
          entity[key] = value.toDate() as Entity[keyof Entity]
        } else {
          entity[key] = value
        }
      }
    }
  }

  const dataToBrief = (documentData: DocumentData, entity: Entity) => {
    return dataToEntity(documentData, entity, briefKeys)
  }

  const dataToDetail = (documentData: DocumentData, entity: Entity) => {
    return dataToEntity(documentData, entity, detailKeys)
  }

  const useStore = defineStore(storeId, {
    state: () => {
      return {
        entityMap: {} as Record<string, Entity>,
      }
    },
    actions: {
      async init() {
        const documentSnapshot = await getDoc(briefDocument)
        if (documentSnapshot.exists()) {
          const documentDataMap = documentSnapshot.data()
          for (const [id, documentData] of Object.entries(documentDataMap)) {
            this.entityMap[id] = {
              id
            } as Entity
            dataToBrief(documentData, this.entityMap[id])
          }
        } else {
          await setDoc(briefDocument, {})
          this.entityMap = {}
        }
      },
      async setBrief(entity: Entity) {
        if (!entity.id) {
          return
        }
        await updateDoc(briefDocument, {
          [entity.id]: entityToBrief(entity)
        })
        this.entityMap[entity.id] = entity
      },
      async addEntity(entity: Entity) {
        const documentReference = await addDoc(detailCollection, entityToDetail(entity))
        entity.id = documentReference.id
        await this.setBrief(entity)
      },
      async setEntity(entity: Entity) {
        if (!entity.id) {
          return
        }
        await Promise.all([
          setDoc(getDetailDoc(entity.id), entityToDetail(entity)),
          this.setBrief(entity)
        ])
      },
      async getDetail(id: string) {
        const entity = this.entityMap[id]
        if (!entity) {
          return null
        }
        const documentSnapshot = await getDoc(getDetailDoc(id))
        if (documentSnapshot.exists()) {
          dataToDetail(documentSnapshot.data(), entity)
        }
        return entity
      },
      async deleteEntity(id: string) {
        await Promise.all([
          deleteDoc(getDetailDoc(id)),
          updateDoc(briefDocument, {
            [id]: deleteField()
          })
        ])
        delete this.entityMap[id]
      },
    }
  })

  await useStore().init()
  return useStore
}
