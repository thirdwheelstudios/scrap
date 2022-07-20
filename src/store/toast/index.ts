import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => {
    let _toast: string | undefined
    let _props

    return { _toast, _props }
  },
  getters: {
    current(state) {
      return state._toast
    },
    props(state) {
      return state._props
    },
  },
  actions: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    open(toast: string, props?: any) {
      this._toast = toast
      this._props = props
    },
    close() {
      this._toast = undefined
      this._props = undefined
    },
  },
})
