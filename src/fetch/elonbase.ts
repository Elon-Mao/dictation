import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  query,
} from 'firebase/firestore'
import type {
  CollectionReference
} from 'firebase/firestore'

export class Elonbase<Entity extends {
  id?: string
}> {
  #collectionReference: CollectionReference
  #keys: (keyof Entity)[]
  #detailKeys: (keyof Entity)[]

  constructor(collectionReference: CollectionReference, keys: (keyof Entity)[], detailKeys: (keyof Entity)[]) {
    this.#collectionReference = collectionReference
    this.#keys = keys
    this.#detailKeys = detailKeys
  }

  getCollection() {
    return this.#collectionReference
  }

  getEntityDoc(id: string) {
    return doc(this.#collectionReference, id)
  }

  getDetailDoc(id: string) {
    return doc(this.#collectionReference, id, 'details', 'detail')
  }

  #getBaseData(entity: Entity, keys: (keyof Entity)[]) {
    const data = {} as Entity
    for (const key of keys) {
      data[key] = entity[key]
    }
    return data
  }

  getEntityData(entity: Entity) {
    return this.#getBaseData(entity, this.#keys)
  }

  getDetailData(entity: Entity) {
    return this.#getBaseData(entity, this.#detailKeys)
  }

  async addEntity(entity: Entity) {
    const docRef = await addDoc(this.#collectionReference, this.getEntityData(entity))
    entity.id = docRef.id
  }

  async setEntity(entity: Entity) {
    if (!entity.id) {
      return Promise.reject()
    }
    await setDoc(this.getEntityDoc(entity.id), this.getEntityData(entity))
  }

  async setDetail(entity: Entity) {
    if (!entity.id) {
      return Promise.reject()
    }
    await setDoc(this.getDetailDoc(entity.id), this.getDetailData(entity))
  }

  async getEntity(id: string) {
    const docSnap = await getDoc(this.getEntityDoc(id))
    return docSnap.exists() ? docSnap.data() as Entity : null
  }

  async getDetail(entity: Entity) {
    if (!entity.id) {
      return Promise.reject()
    }
    const docSnap = await getDoc(this.getDetailDoc(entity.id))
    if (docSnap.exists()) {
      const detail = docSnap.data() as Entity
      for (const key of this.#detailKeys) {
        entity[key] = detail[key]
      }
    }
  }

  async deleteEntity(id: string) {
    await this.deleteDetail(id)
    await deleteDoc(this.getEntityDoc(id))
  }

  async deleteDetail(id: string) {
    await deleteDoc(this.getDetailDoc(id))
  }

  async getAll() {
    const querySnapshot = await getDocs(query(this.#collectionReference))
    const entities: Entity[] = []
    querySnapshot.forEach(async (doc) => {
      const entity = {
        id: doc.id,
        ...doc.data()
      } as Entity
      await this.getDetail(entity)
      entities.push(entity)
    })
    return entities
  }

  async setAll(entities: Entity[]) {
    for (const entity of entities) {
      await this.setEntity(entity)
      await this.setDetail(entity)
    }
  }
}
