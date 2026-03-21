"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { CameraProvider } from "@/components/camera-provider"
import { NotificationProvider } from "@/components/notification-provider"
import { ThemeProvider } from "@/components/theme-provider"

export default function FireLoopApp() {
  const [activeFeature, setActiveFeature] = useState("home")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.title = "🔥 FireLoop - Emotion-Aware Streaming"
  }, [])

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔥</div>
          <h1 className="text-3xl font-bold text-orange-400 mb-2">FireLoop</h1>
          <p className="text-slate-400">Loading your emotion-aware experience...</p>
          <div className="mt-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <CameraProvider>
          <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
            <div className="flex h-screen">
              {/* Always visible sidebar */}
              <Sidebar activeFeature={activeFeature} setActiveFeature={setActiveFeature} />

              {/* Main content area */}
              <MainContent activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
            </div>
          </div>
        </CameraProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}
