
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Home, Brain, Users, Accessibility, Settings, Camera, Film, GripVertical, Move, Music, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeFeature: string
  setActiveFeature: (feature: string) => void
}

const features = [
  { id: "home", name: "Home", icon: Home, description: "Main dashboard", color: "text-blue-400" },
  {
    id: "mood-detection",
    name: "Mood Detection",
    icon: Brain,
    description: "AI emotion analysis",
    color: "text-purple-400",
  },
  {
    id: "movie-reels",
    name: "MovieBits",
    icon: Film,
    description: "Fun movie scenes",
    color: "text-pink-400",
  },
  {
    id: "shared-viewing",
    name: "Shared Viewing",
    icon: Users,
    description: "Watch with friends",
    color: "text-green-400",
  },
  {
    id: "mood-playlist",
    name: "Mood Playlist",
    icon: Music,
    description: "Music for your mood",
    color: "text-red-400",
  },
  {
    id: "leaderboard",
    name: "Leaderboard",
    icon: Trophy,
    description: "Compete with friends",
    color: "text-yellow-400",
  },
  {
    id: "accessibility",
    name: "Deaf Accessibility",
    icon: Accessibility,
    description: "Enhanced accessibility",
    color: "text-cyan-400",
  },
  {
    id: "fatigue-prevention",
    name: "Binge Prevention",
    icon: Camera,
    description: "Wellness monitoring",
    color: "text-red-400",
  },
  { id: "settings", name: "Settings", icon: Settings, description: "App preferences", color: "text-gray-400" },
]

export function Sidebar({ activeFeature, setActiveFeature }: SidebarProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: 320, height: window.innerHeight })
  const [isResizing, setIsResizing] = useState(false)
  const [isDetached, setIsDetached] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const resizeRef = useRef<HTMLDivElement>(null)

  // Handle dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && dragRef.current) {
        const newX = Math.max(0, Math.min(e.clientX - 160, window.innerWidth - size.width))
        const newY = Math.max(0, Math.min(e.clientY - 30, window.innerHeight - size.height))
        setPosition({ x: newX, y: newY })
        setIsDetached(true)
      }

      if (isResizing && resizeRef.current) {
        const newWidth = Math.max(280, Math.min(500, e.clientX - position.x))
        const newHeight = Math.max(400, Math.min(window.innerHeight - position.y, e.clientY - position.y))
        setSize({ width: newWidth, height: newHeight })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = isDragging ? "grabbing" : "nw-resize"
      document.body.style.userSelect = "none"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isDragging, isResizing, position, size])

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
  }

  const handleDock = () => {
    setPosition({ x: 0, y: 0 })
    setSize({ width: 320, height: window.innerHeight })
    setIsDetached(false)
  }

  const sidebarStyle = isDetached
    ? {
        position: "fixed" as const,
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: 60,
      }
    : {}

  return (
    <div
      ref={sidebarRef}
      style={sidebarStyle}
      className={`
        ${isDetached ? "" : "relative"} 
        h-full w-80 bg-zinc-900 border-r border-zinc-800
        flex flex-col flex-shrink-0
        ${isDragging ? "shadow-2xl" : ""}
        ${isDetached ? "rounded-lg shadow-2xl border border-zinc-700" : ""}
      `}
    >
      {/* Drag Handle */}
      <div
        ref={dragRef}
        onMouseDown={handleDragStart}
        className={`
          flex items-center justify-between p-4 border-b border-zinc-800 flex-shrink-0
          ${isDragging ? "cursor-grabbing" : "cursor-grab"}
          hover:bg-zinc-800/50 transition-colors
        `}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Move className="h-4 w-4 text-gray-400" />
            <div className="text-2xl ">🎬</div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-red-500">MOODFLIX</h1>
            <p className="text-xs text-gray-500">Emotion-Aware Streaming</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isDetached && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDock}
              className="hover:bg-zinc-800 text-gray-400 hover:text-white"
              title="Dock sidebar"
            >
              <GripVertical className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face"
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/50"
          />
          <div>
            <p className="font-medium text-white">Alex Johnson</p>
            <p className="text-sm text-gray-400">Movie enthusiast</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-400">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left
                transition-all duration-200 group relative overflow-hidden
                ${
                  activeFeature === feature.id
                    ? "bg-red-600/20 text-red-500 border border-red-600/30 shadow-lg"
                    : "hover:bg-zinc-800 text-slate-300 hover:text-white hover:scale-[1.02]"
                }
              `}
            >
              <Icon
                className={`h-5 w-5 flex-shrink-0 ${activeFeature === feature.id ? "text-red-500" : feature.color}`}
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{feature.name}</p>
                <p className="text-xs text-gray-500 group-hover:text-gray-400 truncate">{feature.description}</p>
              </div>
              {activeFeature === feature.id && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </button>
          )
        })}
      </nav>

      {/* Quick Actions - Bottom */}
      <div className="p-4 border-t border-zinc-800 flex-shrink-0">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveFeature("mood-detection")}
            className="flex items-center justify-center gap-2 p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors text-sm"
          >
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Mood Scan</span>
          </button>
          <button
            onClick={() => setActiveFeature("leaderboard")}
            className="flex items-center justify-center gap-2 p-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors text-sm"
          >
            <Trophy className="h-4 w-4" />
            <span className="hidden sm:inline">Ranks</span>
          </button>
        </div>
      </div>

      {/* Resize Handle */}
      {isDetached && (
        <div
          ref={resizeRef}
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize bg-slate-600 hover:bg-slate-500 transition-colors"
          style={{
            clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
          }}
        />
      )}
    </div>
  )
}







