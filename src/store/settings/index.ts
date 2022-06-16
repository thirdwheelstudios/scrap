import { defineStore } from 'pinia'
import { AppTheme } from '../../enums'
import { getValue, setValue } from '../../utils/localStorage'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    const appTheme = getValue('theme', AppTheme.auto)
    const audioBitsPerSecondSetting = getValue('audioBitsPerSecond', 128000)
    const videoBitsPerSecondSetting = getValue('videoBitsPerSecond', 2500000)
    const orderByFieldNameSetting = getValue<'startDateTime' | 'description'>('orderByFieldName', 'startDateTime')
    const orderByDescendingSetting = getValue('orderByDescending', true)

    return { 
      appTheme, 
      audioBitsPerSecondSetting,
      videoBitsPerSecondSetting, 
      orderByFieldNameSetting, 
      orderByDescendingSetting,
    }
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
    orderByFieldName(state) {
      return state.orderByFieldNameSetting
    },
    orderByDescending(state) {
      return state.orderByDescendingSetting
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
    setOrderByFieldName(value: 'startDateTime' | 'description') {
      this.orderByFieldNameSetting = value
      setValue('orderByFieldName', value)
    },
    setOrderByDescending(value: boolean) {
      this.orderByDescendingSetting = value
      setValue('orderByDescending', value)
    },
  },
})
