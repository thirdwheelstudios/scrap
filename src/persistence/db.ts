import Dexie, { Table } from 'dexie'
import { Recording } from '../models/Recording'

export class ScrapDexie extends Dexie {
  recordings!: Table<Recording>

  constructor() {
    super('scrapDatabase')

    this.version(1).stores({
      recordings: '++id, description',
    })
  }
}

export const db = new ScrapDexie()
