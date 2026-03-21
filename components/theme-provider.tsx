"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "dark" | "light"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  volume: number
  setVolume: (volume: number) => void
  brightness: number
  setBrightness: (brightness: number) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")
  const [volume, setVolume] = useState(75)
  const [brightness, setBrightness] = useState(80)

  useEffect(() => {
    // Load from localStorage on mount
    const savedTheme = localStorage.getItem("fireloop-theme") as Theme
    const savedVolume = localStorage.getItem("fireloop-volume")
    const savedBrightness = localStorage.getItem("fireloop-brightness")

    if (savedTheme) setTheme(savedTheme)
    if (savedVolume) setVolume(Number.parseInt(savedVolume))
    if (savedBrightness) setBrightness(Number.parseInt(savedBrightness))
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)

    // Apply CSS variables for theme
    if (theme === "light") {
      document.documentElement.style.setProperty("--background", "255 255 255")
      document.documentElement.style.setProperty("--foreground", "15 23 42")
      document.documentElement.style.setProperty("--card", "248 250 252")
      document.documentElement.style.setProperty("--card-foreground", "15 23 42")
      document.documentElement.style.setProperty("--primary", "234 88 12")
      document.documentElement.style.setProperty("--primary-foreground", "255 255 255")
      document.documentElement.style.setProperty("--muted", "241 245 249")
      document.documentElement.style.setProperty("--muted-foreground", "100 116 139")
      document.documentElement.style.setProperty("--border", "226 232 240")
    } else {
      document.documentElement.style.setProperty("--background", "15 23 42")
      document.documentElement.style.setProperty("--foreground", "248 250 252")
      document.documentElement.style.setProperty("--card", "30 41 59")
      document.documentElement.style.setProperty("--card-foreground", "248 250 252")
      document.documentElement.style.setProperty("--primary", "234 88 12")
      document.documentElement.style.setProperty("--primary-foreground", "255 255 255")
      document.documentElement.style.setProperty("--muted", "51 65 85")
      document.documentElement.style.setProperty("--muted-foreground", "148 163 184")
      document.documentElement.style.setProperty("--border", "51 65 85")
    }

    // Apply brightness filter
    document.documentElement.style.filter = `brightness(${brightness}%)`

    // Store in localStorage
    localStorage.setItem("fireloop-theme", theme)
    localStorage.setItem("fireloop-volume", volume.toString())
    localStorage.setItem("fireloop-brightness", brightness.toString())
  }, [theme, brightness, volume])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        volume,
        setVolume,
        brightness,
        setBrightness,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}
