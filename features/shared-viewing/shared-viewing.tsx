"use client"

import { useState, useEffect } from "react"
import { Users, Play, Heart, MessageCircle, UserPlus, Video, Mic, Settings, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNotification } from "@/components/notification-provider"

interface Viewer {
  id: string
  name: string
  avatar: string
  mood: string
  moodEmoji: string
  isHost: boolean
  status: "connected" | "connecting" | "disconnected"
}

const mockViewers: Viewer[] = [
  {
    id: "1",
    name: "You",
    avatar: "https://picsum.photos/100/100?random=1",
    mood: "Happy",
    moodEmoji: "😊",
    isHost: true,
    status: "connected",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    avatar: "https://picsum.photos/100/100?random=2",
    mood: "Excited",
    moodEmoji: "🤩",
    isHost: false,
    status: "connected",
  },
  {
    id: "3",
    name: "Mike Chen",
    avatar: "https://picsum.photos/100/100?random=3",
    mood: "Calm",
    moodEmoji: "😌",
    isHost: false,
    status: "connected",
  },
]

const sharedContent = [
  {
    id: 1,
    title: "The Office",
    type: "Comedy",
    match: 95,
    reason: "Perfect for group happiness",
    image: "https://picsum.photos/300/200?random=10",
    rating: 8.9,
    year: 2005,
    duration: "22 min",
  },
  {
    id: 2,
    title: "Stranger Things",
    type: "Thriller",
    match: 78,
    reason: "Exciting for mixed moods",
    image: "https://picsum.photos/300/200?random=11",
    rating: 8.7,
    year: 2016,
    duration: "50 min",
  },
  {
    id: 3,
    title: "Friends",
    type: "Comedy",
    match: 92,
    reason: "Great for social viewing",
    image: "https://picsum.photos/300/200?random=12",
    rating: 8.9,
    year: 1994,
    duration: "25 min",
  },
  {
    id: 4,
    title: "Marvel Movies",
    type: "Action",
    match: 85,
    reason: "Action-packed for excitement",
    image: "https://picsum.photos/300/200?random=13",
    rating: 8.4,
    year: 2008,
    duration: "2h 30min",
  },
]

const chatMessages = [
  {
    id: 1,
    user: "Sarah",
    message: "This is perfect for tonight! 😊",
    time: "2:34 PM",
    avatar: "https://picsum.photos/40/40?random=2",
  },
  {
    id: 2,
    user: "Mike",
    message: "Agreed! Love the mood sync feature",
    time: "2:35 PM",
    avatar: "https://picsum.photos/40/40?random=3",
  },
  {
    id: 3,
    user: "You",
    message: "Let's start with The Office!",
    time: "2:36 PM",
    avatar: "https://picsum.photos/40/40?random=1",
  },
]

export function SharedViewing() {
  const [viewers, setViewers] = useState<Viewer[]>(mockViewers)
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [groupMood, setGroupMood] = useState("Mixed")
  const [messages, setMessages] = useState(chatMessages)
  const [newMessage, setNewMessage] = useState("")
  const [sessionDuration, setSessionDuration] = useState(0)
  const [currentlyWatching, setCurrentlyWatching] = useState<(typeof sharedContent)[0] | null>(null)
  const [newViewerName, setNewViewerName] = useState("")
  const { showNotification } = useNotification()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isSessionActive])

  const startSession = () => {
    setIsSessionActive(true)
    setSessionDuration(0)

    // Calculate group mood based on individual moods
    const moods = viewers.map((v) => v.mood)
    if (moods.every((m) => m === "Happy")) setGroupMood("Happy")
    else if (moods.includes("Excited")) setGroupMood("Excited")
    else setGroupMood("Mixed")

    showNotification("success", "Session Started", "Shared viewing session is now active!")

    // Simulate mood sync
    setTimeout(() => {
      showNotification("info", "Mood Sync Complete", "All viewers' emotions are now synchronized")
    }, 2000)
  }

  const endSession = () => {
    setIsSessionActive(false)
    setCurrentlyWatching(null)
    const duration = Math.floor(sessionDuration / 60)
    showNotification("info", "Session Ended", `Session lasted ${duration} minutes`)
  }

  const addViewer = () => {
    if (newViewerName.trim()) {
      const newViewer: Viewer = {
        id: Date.now().toString(),
        name: newViewerName,
        avatar: `https://picsum.photos/100/100?random=${Date.now()}`,
        mood: ["Happy", "Excited", "Calm", "Focused"][Math.floor(Math.random() * 4)],
        moodEmoji: ["😊", "🤩", "😌", "🤔"][Math.floor(Math.random() * 4)],
        isHost: false,
        status: "connecting",
      }

      setViewers([...viewers, newViewer])
      setNewViewerName("")
      showNotification("success", "Viewer Added", `${newViewerName} is joining the session`)

      // Simulate connection
      setTimeout(() => {
        setViewers((prev) => prev.map((v) => (v.id === newViewer.id ? { ...v, status: "connected" } : v)))
        showNotification("info", "Viewer Connected", `${newViewerName} has joined successfully`)
      }, 2000)
    }
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: "https://picsum.photos/40/40?random=1",
      }
      setMessages([...messages, message])
      setNewMessage("")
      showNotification("success", "Message Sent", "Your message has been sent to all viewers")
    }
  }

  const watchTogether = (content: (typeof sharedContent)[0]) => {
    setCurrentlyWatching(content)
    showNotification("success", "Now Watching Together", `Started ${content.title} for all viewers`)
  }

  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "happy":
        return "bg-yellow-500"
      case "excited":
        return "bg-red-500"
      case "calm":
        return "bg-green-500"
      case "mixed":
        return "bg-purple-500"
      case "focused":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Users className="h-10 w-10 text-blue-400" />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Emotion-Tracked Shared Viewing
          </span>
        </h1>
        <p className="text-slate-400 text-lg">Watch together with friends and sync content based on everyone's mood</p>
      </div>

      {/* Session Status */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${isSessionActive ? "bg-green-500 animate-pulse" : "bg-gray-500"}`}
              />
              Viewing Session
            </span>
            <div className="flex items-center gap-4">
              {isSessionActive && (
                <div className="text-sm text-slate-400">Duration: {formatDuration(sessionDuration)}</div>
              )}
              <div
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isSessionActive
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                }`}
              >
                {isSessionActive ? "🔴 Live" : "⚫ Inactive"}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4">
            {!isSessionActive ? (
              <Button onClick={startSession} className="bg-orange-500 hover:bg-orange-600" size="lg">
                <Users className="mr-2 h-5 w-5" />
                Start Shared Session
              </Button>
            ) : (
              <div className="flex gap-4">
                <Button onClick={endSession} variant="outline" size="lg">
                  End Session
                </Button>
                <Button
                  onClick={() => showNotification("info", "Settings", "Session settings opened")}
                  variant="outline"
                  size="lg"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Viewers and Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Add Viewer */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Invite Viewer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter viewer name"
                  value={newViewerName}
                  onChange={(e) => setNewViewerName(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  onKeyPress={(e) => e.key === "Enter" && addViewer()}
                />
                <Button onClick={addViewer} size="sm">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Connected Viewers */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Connected Viewers</span>
                <span className="text-sm text-slate-400">
                  {viewers.filter((v) => v.status === "connected").length} online
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {viewers.map((viewer) => (
                  <div key={viewer.id} className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
                    <div className="relative">
                      <img
                        src={viewer.avatar || "/placeholder.svg"}
                        alt={viewer.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-700 ${
                          viewer.status === "connected"
                            ? "bg-green-500"
                            : viewer.status === "connecting"
                              ? "bg-yellow-500 animate-pulse"
                              : "bg-gray-500"
                        }`}
                      />
                      {viewer.isHost && (
                        <div className="absolute -top-1 -left-1 bg-orange-500 text-white text-xs px-1 rounded">
                          HOST
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">{viewer.name}</p>
                        {isSessionActive && <span className="text-2xl">{viewer.moodEmoji}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-slate-400 capitalize">{viewer.status}</p>
                        {isSessionActive && (
                          <>
                            <span className="text-slate-500">•</span>
                            <span className="text-sm text-slate-400">{viewer.mood}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {isSessionActive && (
                      <div className="flex items-center gap-1">
                        <Video className="h-4 w-4 text-blue-400" />
                        <Mic className="h-4 w-4 text-green-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Group Mood Analysis */}
          {isSessionActive && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-400" />
                  Group Mood Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div
                    className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${getMoodColor(groupMood)}/20 border ${getMoodColor(groupMood)}/30`}
                  >
                    <span className="text-3xl">
                      {groupMood === "Happy" ? "😊" : groupMood === "Excited" ? "🤩" : "🎭"}
                    </span>
                    <div>
                      <p className="font-semibold text-white">Group Mood: {groupMood}</p>
                      <p className="text-sm text-slate-400">Based on {viewers.length} viewers</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <p className="text-xl font-bold text-yellow-400">
                      {viewers.filter((v) => v.mood === "Happy").length}
                    </p>
                    <p className="text-xs text-slate-400">Happy</p>
                  </div>
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <p className="text-xl font-bold text-red-400">
                      {viewers.filter((v) => v.mood === "Excited").length}
                    </p>
                    <p className="text-xs text-slate-400">Excited</p>
                  </div>
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <p className="text-xl font-bold text-green-400">
                      {viewers.filter((v) => v.mood === "Calm").length}
                    </p>
                    <p className="text-xs text-slate-400">Calm</p>
                  </div>
                  <div className="p-3 bg-slate-700 rounded-lg">
                    <p className="text-xl font-bold text-blue-400">
                      {viewers.filter((v) => v.mood === "Focused").length}
                    </p>
                    <p className="text-xs text-slate-400">Focused</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Content and Chat */}
        <div className="lg:col-span-2 space-y-6">
          {/* Currently Watching */}
          {currentlyWatching && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-green-400" />
                  Now Watching Together
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 p-4 bg-slate-700 rounded-lg">
                  <img
                    src={currentlyWatching.image || "/placeholder.svg"}
                    alt={currentlyWatching.title}
                    className="w-24 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg">{currentlyWatching.title}</h3>
                    <p className="text-slate-400">
                      {currentlyWatching.type} • {currentlyWatching.year}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-yellow-400">{currentlyWatching.rating}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">{currentlyWatching.duration}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{currentlyWatching.match}%</div>
                    <div className="text-xs text-slate-400">Group Match</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Group Recommendations */}
          {isSessionActive && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle>Group Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sharedContent.map((content) => (
                    <div
                      key={content.id}
                      className="bg-slate-700 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => watchTogether(content)}
                    >
                      <div className="relative">
                        <img
                          src={content.image || "/placeholder.svg"}
                          alt={content.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                            <Play className="h-4 w-4 mr-1" />
                            Watch Together
                          </Button>
                        </div>
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-400" />
                          {content.rating}
                        </div>
                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          {content.match}% Match
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-white">{content.title}</h3>
                        <p className="text-sm text-slate-400 mb-2">
                          {content.type} • {content.duration}
                        </p>
                        <p className="text-xs text-slate-500">{content.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Group Chat */}
          {isSessionActive && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Group Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-slate-900 rounded-lg p-3 mb-3 overflow-y-auto space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className="flex items-start gap-2">
                      <img
                        src={message.avatar || "/placeholder.svg"}
                        alt={message.user}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{message.user}</span>
                          <span className="text-xs text-slate-500">{message.time}</span>
                        </div>
                        <p className="text-sm text-slate-300">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button onClick={sendMessage} size="sm" className="bg-orange-500 hover:bg-orange-600">
                    Send
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
