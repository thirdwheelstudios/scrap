import { defineStore } from 'pinia'
import { AppTheme } from '../../enums'
import { getValue, setValue } from '../../utils/localStorage'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    const appTheme = getValue<AppTheme>('theme') ?? AppTheme.auto

    return { appTheme }
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
