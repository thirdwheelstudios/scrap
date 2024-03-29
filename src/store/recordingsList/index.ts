import { defineStore } from 'pinia'
import { Recording } from '../../models'
import { db } from '../../persistence'
import { promiseWithDelay } from '../../utils/promises'

export const useRecordingsListStore = defineStore('recordingsList', {
  state: () => {
    const savedRecordings = [] as Recording[]
    const isLoadingRecordings = false
    return { savedRecordings, isLoadingRecordings }
  },
  getters: {
    recordings(state) {
      return state.savedRecordings
    },
    totalCount(state) {
      return state.savedRecordings?.length ?? 0
    },
    isLoading(state) {
      return state.isLoadingRecordings
    },
  },
  actions: {
    async load(minDelayInMilliseconds?: number) {
      try {
        this.isLoadingRecordings = true

        const recordings = await promiseWithDelay(db.recordings.toArray(), minDelayInMilliseconds)

        this.savedRecordings = recordings
      } finally {
        this.isLoadingRecordings = false
      }
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
      if (index === -1) return 

      const recording = this.savedRecordings[index]

      this.savedRecordings[index] = {...recording, ...changes}
    }
  },
})
