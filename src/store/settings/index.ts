import { defineStore } from 'pinia'
import { AppTheme } from '../../enums'
import { getValue, setValue } from '../../utils/localStorage'

export const useSettingsStore = defineStore('settings', {
  state: () => {
    const _theme = getValue('theme', AppTheme.auto)
    const _audioBitsPerSecond = getValue('audioBitsPerSecond', 128000)
    const _videoBitsPerSecond = getValue('videoBitsPerSecond', 2500000)
    const _orderByFieldName = getValue<'startDateTime' | 'description'>(
      'orderByFieldName',
      'startDateTime'
    )
    const _orderByDescending = getValue('orderByDescending', true)
    const _cookiesAccepted = getValue('cookiesAccepted', false)

    return {
      _theme,
      _audioBitsPerSecond,
      _videoBitsPerSecond,
      _orderByFieldName,
      _orderByDescending,
      _cookiesAccepted,
    }
  },
  getters: {
    theme(state) {
      return state._theme
    },
    audioBitsPerSecond(state) {
      return state._audioBitsPerSecond
    },
    videoBitsPerSecond(state) {
      return state._videoBitsPerSecond
    },
    orderByFieldName(state) {
      return state._orderByFieldName
    },
    orderByDescending(state) {
      return state._orderByDescending
    },
    cookiesAccepted(state) {
      return state._cookiesAccepted
    },
  },
  actions: {
    setTheme(theme: AppTheme) {
      this._theme = theme
      setValue('theme', theme)
    },
    setAudioBitsPerSecond(bitsPerSecond: number) {
      this._audioBitsPerSecond = bitsPerSecond
      setValue('audioBitsPerSecond', bitsPerSecond)
    },
    setVideoBitsPerSecond(bitsPerSecond: number) {
      this._videoBitsPerSecond = bitsPerSecond
      setValue('videoBitsPerSecond', bitsPerSecond)
    },
    setOrderByFieldName(value: 'startDateTime' | 'description') {
      this._orderByFieldName = value
      setValue('orderByFieldName', value)
    },
    setOrderByDescending(value: boolean) {
      this._orderByDescending = value
      setValue('orderByDescending', value)
    },
    setCookiesAccepted(value: boolean) {
      this._cookiesAccepted = value
      setValue('cookiesAccepted', value)
    },
  },
})
