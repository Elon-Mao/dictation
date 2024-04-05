import {
  doc,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  query,
  Timestamp,
} from 'firebase/firestore'
import type {
  CollectionReference,
  DocumentData,
  QueryConstraint,
} from 'firebase/firestore'

export class Elonbase<Entity extends {
  id?: string
}> {
  collectionReference: CollectionReference
  briefKeys: (keyof Entity)[]
  detailKeys: (keyof Entity)[]

  constructor(
    collectionReference: CollectionReference,
    briefKeys: (keyof Entity)[] = [],
    detailKeys: (keyof Entity)[] = []
  ) {
    this.collectionReference = collectionReference
    this.briefKeys = briefKeys
    this.detailKeys = detailKeys
  }

  getCollection() {
    return this.collectionReference
  }

  getBriefDoc(id: string) {
    return doc(this.collectionReference, id)
  }

  getDetailDoc(id: string) {
    return doc(this.collectionReference, id, 'details', 'detail')
  }

  entityToData(entity: Entity, keys: (keyof Entity)[]) {
    const data = {} as Entity
    for (const key of keys) {
      if (entity[key] !== undefined) {
        data[key] = entity[key]
      }
    }
    return data
  }

  briefToData(entity: Entity) {
    return this.entityToData(entity, this.briefKeys)
  }

  detailToData(entity: Entity) {
    return this.entityToData(entity, this.detailKeys)
  }

  dataToEntity(documentData: DocumentData, entity: Entity, keys: (keyof Entity)[]) {
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

  dataToBrief(documentData: DocumentData, entity: Entity) {
    return this.dataToEntity(documentData, entity, this.briefKeys)
  }

  dataToDetail(documentData: DocumentData, entity: Entity) {
    return this.dataToEntity(documentData, entity, this.detailKeys)
  }

  async batchData(entities: Entity[], callbackfn: (entity: Entity) => Promise<void>) {
    await Promise.all(entities.map(callbackfn))
  }

  async addBrief(entity: Entity) {
    const docRef = await addDoc(this.collectionReference, this.briefToData(entity))
    entity.id = docRef.id
  }

  async addBriefs(entities: Entity[]) {
    await this.batchData(entities, (entity) => this.addBrief(entity))
  }

  async addEntity(entity: Entity) {
    await this.addBrief(entity)
    await this.setDetail(entity)
  }

  async setBrief(entity: Entity) {
    if (!entity.id) {
      return Promise.reject()
    }
    await setDoc(this.getBriefDoc(entity.id), this.briefToData(entity))
  }

  async setBriefs(entities: Entity[]) {
    await this.batchData(entities, (entity) => this.setBrief(entity))
  }

  async setDetail(entity: Entity) {
    if (!entity.id) {
      return Promise.reject()
    }
    await setDoc(this.getDetailDoc(entity.id), this.detailToData(entity))
  }

  async setEntity(entity: Entity) {
    await this.setBrief(entity)
    await this.setDetail(entity)
  }

  async setEntities(entities: Entity[]) {
    await this.batchData(entities, (entity) => this.setEntity(entity))
  }

  async getBrief(id: string) {
    const documentSnapshot = await getDoc(this.getBriefDoc(id))
    if (documentSnapshot.exists()) {
      const entity = { id } as Entity
      this.dataToBrief(documentSnapshot.data(), entity)
      return entity
    } else {
      return null
    }
  }

  async getBriefs(...queryConstraints: QueryConstraint[]) {
    const entities: Entity[] = []
    const querySnapshot = await getDocs(query(this.collectionReference, ...queryConstraints))
    querySnapshot.forEach((doc) => {
      const entity = { id: doc.id } as Entity
      this.dataToBrief(doc.data(), entity)
      entities.push(entity)
    })
    return entities
  }

  async getDetail(entity: Entity) {
    if (!entity.id) {
      return Promise.reject()
    }
    const documentSnapshot = await getDoc(this.getDetailDoc(entity.id))
    if (documentSnapshot.exists()) {
      this.dataToDetail(documentSnapshot.data(), entity)
    }
  }

  async getDetails(entities: Entity[]) {
    await this.batchData(entities, (entity) => this.getDetail(entity))
  }

  async getEntity(id: string) {
    const entity = await this.getBrief(id)
    entity && await this.getDetail(entity)
    return entity
  }

  async getEntities(...queryConstraints: QueryConstraint[]) {
    const entities = await this.getBriefs(...queryConstraints)
    await this.getDetails(entities)
    return entities
  }

  async deleteDetail(id: string) {
    await deleteDoc(this.getDetailDoc(id))
  }

  async deleteEntity(id: string) {
    await this.deleteDetail(id)
    await deleteDoc(this.getBriefDoc(id))
  }
}
