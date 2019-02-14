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

  const SERVER_RENDER = 'transparent'

  return {
    colors: {
      name: 'rendered-on-server',
      background: SERVER_RENDER,
      text: SERVER_RENDER,
      primary: SERVER_RENDER,
      navBg: SERVER_RENDER,
      navText: SERVER_RENDER,
      semiDark: SERVER_RENDER,
      codeBg: SERVER_RENDER
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
