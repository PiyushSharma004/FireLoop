
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
    document.title = "🎬 Moodflix - Emotion-Aware Streaming"
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-7xl font-black mb-4 tracking-tight">
            <span className="text-red-600">MOOD</span>
            <span className="text-white">FLIX</span>
          </h1>
          <p className="text-gray-500 text-lg mb-8">Emotion-Aware Streaming</p>
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <CameraProvider>
          <div className="min-h-screen bg-black text-white overflow-hidden">
            <div className="flex h-screen">
              <Sidebar activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
              <MainContent activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
            </div>
          </div>
        </CameraProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}


