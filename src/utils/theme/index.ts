import { AppTheme } from '../../enums'

const getThemeName = (theme: AppTheme) => {
  let preferredTheme = theme

  if (preferredTheme === AppTheme.auto) {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')

    preferredTheme = prefersDarkMode.matches ? AppTheme.dark : AppTheme.light
  }

  return AppTheme[preferredTheme].toString()
}

export function setTheme(theme: AppTheme) {
  const themeName = getThemeName(theme)

  const themeProps = [
    '--bg-color',
    '--primary-color',
    '--primary-shadow',
    '--bg-primary-gradient-start',
    '--bg-primary-gradient-end',
    '--border-color',
    '--button-text-color',
  ]

  themeProps.map((themeProp) => {
    document.body.style.setProperty(themeProp, `var(${themeProp}-${themeName})`)
  })
}
