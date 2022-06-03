import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => {
    let currentModal: string | undefined
    let currentProps

    return { currentModal, currentProps }
  },
  getters: {
    current(state) {
      return state.currentModal
    },
    props(state) {
      return state.currentProps
    },
  },
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    open(modal: string, props?: any) {
      this.currentModal = modal
      this.currentProps = props
    },
    close() {
      this.currentModal = undefined
      this.currentProps = undefined
    },
  },
})
