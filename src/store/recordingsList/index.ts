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
  },
  actions: {
    async load() {
      const recordings = await db.recordings.toArray()

      this.savedRecordings = recordings
    },
  },
})
