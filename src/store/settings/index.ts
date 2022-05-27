import { defineStore } from 'pinia'
import { AppTheme } from '../../enums'
import { getValue, setValue } from '../../utils/localStorage'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    const appTheme = getValue<AppTheme>('theme') ?? AppTheme.auto
    const audioBitsPerSecondSetting = getValue<number>('audioBitsPerSecond') ?? 128000
    const videoBitsPerSecondSetting = getValue<number>('videoBitsPerSecond') ?? 1250000

    return { appTheme, audioBitsPerSecondSetting, videoBitsPerSecondSetting }
  },
  getters: {
    theme(state) {
      return state.appTheme
    },
    audioBitsPerSecond(state) {
      return state.audioBitsPerSecondSetting
    },
    videoBitsPerSecond(state) {
      return state.videoBitsPerSecondSetting
    },
  },
  actions: {
    setTheme(theme: AppTheme) {
      this.appTheme = theme
      setValue('theme', theme)
    },
    setAudioBitsPerSecond(bitsPerSecond: number) {
      this.audioBitsPerSecondSetting = bitsPerSecond
      setValue('audioBitsPerSecond', bitsPerSecond)
    },
    setVideoBitsPerSecond(bitsPerSecond: number) {
      this.videoBitsPerSecondSetting = bitsPerSecond
      setValue('videoBitsPerSecond', bitsPerSecond)
    },
  },
})
