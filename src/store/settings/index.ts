import { defineStore } from 'pinia'
import { AppTheme } from '../../enums'
import { getValue, setValue } from '../../utils/localStorage'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    return { appTheme: getValue('theme', AppTheme.auto) }
  },
  getters: {
    theme(state) {
      return state.appTheme
    },
  },
  actions: {
    setTheme(theme: AppTheme) {
      this.appTheme = theme
      setValue('theme', theme)
    },
  },
})
