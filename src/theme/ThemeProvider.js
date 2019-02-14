import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { dark, light } from './colors'

const isBrowser = typeof window !== 'undefined'

const initialState = () => {
  if (isBrowser) {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    const userPrefersDarkMode = JSON.parse(
      window.localStorage.getItem('darkMode')
    )

    if (userPrefersDarkMode === null) {
      window.localStorage.setItem('darkMode', darkMode)
    }

    return darkMode || userPrefersDarkMode ? dark : light
  }

  return {
    colors: {
      name: 'server',
      background: 'transparent',
      text: 'transparent',
      primary: 'transparent',
      navBg: 'transparent',
      navText: 'transparent',
      semiDark: '#44475a',
      codeBg: '#44475a'
    }
  }
}

const Theme = ({ children, props }) => {
  const [theme, setTheme] = useState(initialState)

  const toggleTheme = () => {
    let darkMode = theme === dark

    if (isBrowser) {
      window.localStorage.setItem('darkMode', !darkMode)
    }
    setTheme(darkMode ? light : dark)
  }

  return (
    <ThemeProvider
      theme={{
        colors: theme.colors,
        toggleTheme: () => toggleTheme()
      }}
    >
      {children}
    </ThemeProvider>
  )
}

export default Theme
