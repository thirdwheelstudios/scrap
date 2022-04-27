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
    count(state) {
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
    },
  },
})
