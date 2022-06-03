import { defineStore } from 'pinia'
import { Recording } from '../../models'
import { db } from '../../persistence'

export const useRecordingsListStore = defineStore('recordingsList', {
  state: () => {
    const savedRecordings = [] as Recording[]
    return { savedRecordings }
  },
  getters: {
    recordings(state) {
      return state.savedRecordings
    },
    totalCount(state) {
      return state.savedRecordings?.length ?? 0
    },
  },
  actions: {
    async load() {
      const recordings = await db.recordings.toArray()

      this.savedRecordings = recordings
    },
    async add(recording: Recording) {
      await db.recordings.add(recording)

      this.savedRecordings.push(recording)
    },
    async deleteById(id: number) {
      await db.recordings.delete(id)

      const newRecordings = this.recordings.filter(
        (x: Recording) => x.id !== id
      )
      this.savedRecordings = [...newRecordings]
    },
    async deleteAll() {
      const collection = db.recordings.toCollection()

      await collection.delete()

      this.savedRecordings = [] as Recording[]
    },
    async getById(id: number) {
      const recording = await db.recordings.where('id').equals(id).first()

      if (!recording) return false

      return recording
    },
    async updateById(id: number, changes: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [keyPath: string]: any;
    }) {
      await db.recordings.update(id, changes)

      const index = this.savedRecordings.findIndex((x) => x.id === id)
      if (!index) return 

      const recording = this.savedRecordings[index]

      this.savedRecordings[index] = {...recording, ...changes}
    }
  },
})
