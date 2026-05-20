import { useEffect, useMemo, useState, type ReactNode } from 'react'

import { ThemeContext, type Theme } from './theme-context'

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme')

    return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : 'light'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)

    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
      },
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
