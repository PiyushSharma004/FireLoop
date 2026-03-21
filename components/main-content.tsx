"use client"

import { Wifi, Battery, Clock } from "lucide-react"
import { UserProfile } from "@/components/user-profile"
import { HomeView } from "@/features/home/home-view"
import { MoodDetection } from "@/features/mood-detection/mood-detection"
import { FireCall } from "@/features/firecall/firecall"
import { SharedViewing } from "@/features/shared-viewing/shared-viewing"
import { VoiceRecall } from "@/features/voice-recall/voice-recall"
import { MovieReels } from "@/features/movie-reels/movie-reels"
import { AccessibilityMode } from "@/features/accessibility/accessibility-mode"
import { FatiguePrevention } from "@/features/fatigue-prevention/fatigue-prevention"
import { Settings } from "@/features/settings/settings"
import { useState, useEffect } from "react"

interface MainContentProps {
  activeFeature: string
  setActiveFeature: (feature: string) => void
}

export function MainContent({ activeFeature, setActiveFeature }: MainContentProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const renderFeature = () => {
    switch (activeFeature) {
      case "home":
        return <HomeView setActiveFeature={setActiveFeature} />
      case "mood-detection":
        return <MoodDetection />
      case "movie-reels":
        return <MovieReels />
      case "shared-viewing":
        return <SharedViewing />
      case "firecall":
        return <FireCall />
      case "voice-recall":
        return <VoiceRecall />
      case "accessibility":
        return <AccessibilityMode />
      case "fatigue-prevention":
        return <FatiguePrevention />
      case "settings":
        return <Settings />
      default:
        return <HomeView setActiveFeature={setActiveFeature} />
    }
  }

  const getFeatureTitle = () => {
    const featureMap: Record<string, string> = {
      home: "🏠 Home",
      "mood-detection": "🧠 Mood Detection",
      "movie-reels": "🎬 MovieBits",
      "shared-viewing": "👥 Shared Viewing",
      firecall: "📞 FireCall",
      "voice-recall": "🎤 FuzzyFind",
      accessibility: "♿ Accessibility Mode",
      "fatigue-prevention": "😴 Fatigue Prevention",
      settings: "⚙️ Settings",
    }
    return featureMap[activeFeature] || "🔥 FireLoop"
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="font-semibold text-white text-lg">{getFeatureTitle()}</h2>
            <p className="text-sm text-slate-400">Emotion-Aware Streaming • AI Powered</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* System Status */}
          <div className="hidden lg:flex items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-full">
              <Clock className="h-4 w-4" />
              <span>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-full">
              <Wifi className="h-4 w-4 text-green-400" />
              <span className="text-green-400">Connected</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-full">
              <Battery className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400">85%</span>
            </div>
          </div>

          {/* User Profile */}
          <UserProfile setActiveFeature={setActiveFeature} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-slate-900">{renderFeature()}</main>
    </div>
  )
}
