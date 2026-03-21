"use client"

import { useState, useEffect } from "react"
import { Phone, PhoneCall, UserPlus, Video, Mic, MicOff, VideoOff, MessageCircle, Users, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNotification } from "@/components/notification-provider"

interface Contact {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "busy" | "in-call"
  lastSeen?: string
  mood?: string
  moodEmoji?: string
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    status: "online",
    mood: "Happy",
    moodEmoji: "😊",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    status: "online",
    mood: "Excited",
    moodEmoji: "🤩",
  },
  {
    id: "3",
    name: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    status: "busy",
    mood: "Focused",
    moodEmoji: "🤔",
  },
  {
    id: "4",
    name: "Alex Rodriguez",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    status: "offline",
    lastSeen: "2 hours ago",
  },
  {
    id: "5",
    name: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    status: "in-call",
    mood: "Calm",
    moodEmoji: "😌",
  },
]

const sharedContent = [
  {
    id: 1,
    title: "The Office",
    type: "Comedy",
    match: 95,
    reason: "Perfect for group happiness",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=200&h=150&fit=crop",
    duration: "22 min",
  },
  {
    id: 2,
    title: "Stranger Things",
    type: "Thriller",
    match: 78,
    reason: "Exciting for mixed moods",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop",
    duration: "50 min",
  },
  {
    id: 3,
    title: "Friends",
    type: "Comedy",
    match: 92,
    reason: "Great for social viewing",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=150&fit=crop",
    duration: "25 min",
  },
]

const chatMessages = [
  {
    id: 1,
    user: "Sarah",
    message: "This is perfect for tonight! 😊",
    time: "2:34 PM",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 2,
    user: "Mike",
    message: "Agreed! Love the mood sync feature",
    time: "2:35 PM",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
  },
  {
    id: 3,
    user: "You",
    message: "Let's start with The Office!",
    time: "2:36 PM",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
  },
]

export function FireCall() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [newContactName, setNewContactName] = useState("")
  const [inCall, setInCall] = useState(false)
  const [currentCall, setCurrentCall] = useState<Contact | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [messages, setMessages] = useState(chatMessages)
  const [newMessage, setNewMessage] = useState("")
  const { showNotification } = useNotification()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (inCall) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [inCall])

  const addContact = () => {
    if (newContactName.trim()) {
      const newContact: Contact = {
        id: Date.now().toString(),
        name: newContactName,
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face`,
        status: "offline",
      }
      setContacts([...contacts, newContact])
      setNewContactName("")
      showNotification("success", "Contact Added", `${newContactName} has been added to your contacts`)
    }
  }

  const startCall = (contact: Contact) => {
    if (contact.status === "offline") {
      showNotification("error", "Contact Unavailable", `${contact.name} is currently offline`)
      return
    }
    if (contact.status === "in-call") {
      showNotification("error", "Contact Busy", `${contact.name} is currently in another call`)
      return
    }

    setCurrentCall(contact)
    setInCall(true)
    setCallDuration(0)
    showNotification("success", "Call Started", `Connected with ${contact.name}`)

    // Simulate call connection
    setTimeout(() => {
      showNotification("info", "Mood Sync Active", "Emotion tracking enabled for shared recommendations")
    }, 2000)
  }

  const endCall = () => {
    if (currentCall) {
      showNotification(
        "info",
        "Call Ended",
        `Call with ${currentCall.name} ended after ${formatDuration(callDuration)}`,
      )
    }
    setInCall(false)
    setCurrentCall(null)
    setIsMuted(false)
    setIsVideoOff(false)
    setCallDuration(0)
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: "You",
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face",
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "busy":
        return "bg-yellow-500"
      case "in-call":
        return "bg-blue-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (contact: Contact) => {
    switch (contact.status) {
      case "online":
        return "Online"
      case "busy":
        return "Busy"
      case "in-call":
        return "In Call"
      case "offline":
        return contact.lastSeen ? `Last seen ${contact.lastSeen}` : "Offline"
      default:
        return "Unknown"
    }
  }

  const watchTogether = (content: (typeof sharedContent)[0]) => {
    showNotification("success", "Starting Watch Party", `Now watching ${content.title} together`)
  }

  if (inCall && currentCall) {
    return (
      <div className="h-full bg-slate-900 flex flex-col">
        {/* Call Header */}
        <div className="p-4 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={currentCall.avatar || "/placeholder.svg"}
                alt={currentCall.name}
                className="w-12 h-12 rounded-full border-2 border-green-400"
              />
              <div>
                <h3 className="font-semibold text-white text-lg">{currentCall.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <p className="text-sm text-green-400">Connected • {formatDuration(callDuration)}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">FireCall • Emotion Sync Active</div>
              <div className="flex items-center gap-1 mt-1">
                <Heart className="h-4 w-4 text-red-400" />
                <span className="text-sm text-red-400">Mood tracking enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Area */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Remote Video */}
            <div className="bg-slate-800 flex items-center justify-center relative">
              <div className="text-center">
                <img
                  src={currentCall.avatar || "/placeholder.svg"}
                  alt={currentCall.name}
                  className="w-40 h-40 rounded-full mx-auto mb-4 border-4 border-blue-400"
                />
                <p className="text-white text-2xl font-semibold">{currentCall.name}</p>
                <p className="text-slate-400 mt-2">{isVideoOff ? "Video disabled" : "Video call active"}</p>
              </div>

              {/* Mood indicator */}
              <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <span className="text-lg">{currentCall.moodEmoji || "😊"}</span>
                <span>{currentCall.mood || "Happy"}</span>
              </div>

              {/* Audio visualization */}
              {!isMuted && (
                <div className="absolute bottom-4 left-4 flex items-center gap-1">
                  <div className="w-1 h-4 bg-green-400 rounded animate-pulse" />
                  <div className="w-1 h-6 bg-green-400 rounded animate-pulse" style={{ animationDelay: "0.1s" }} />
                  <div className="w-1 h-3 bg-green-400 rounded animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-1 h-5 bg-green-400 rounded animate-pulse" style={{ animationDelay: "0.3s" }} />
                </div>
              )}
            </div>

            {/* Local Video */}
            <div className="bg-slate-700 flex items-center justify-center relative">
              <div className="text-center">
                <div className="w-40 h-40 bg-slate-600 rounded-full mx-auto mb-4 flex items-center justify-center border-4 border-green-400">
                  {isVideoOff ? (
                    <VideoOff className="h-20 w-20 text-slate-400" />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&h=160&fit=crop&crop=face"
                      alt="You"
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </div>
                <p className="text-white text-2xl font-semibold">You</p>
                <p className="text-slate-400 mt-2">{isVideoOff ? "Video disabled" : "Local video"}</p>
              </div>

              {/* Your mood indicator */}
              <div className="absolute top-4 right-4 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm flex items-center gap-2">
                <span className="text-lg">😌</span>
                <span>Calm</span>
              </div>

              {/* Mute indicator */}
              {isMuted && (
                <div className="absolute bottom-4 right-4 bg-red-500/20 text-red-400 px-3 py-2 rounded-full text-sm flex items-center gap-2">
                  <MicOff className="h-4 w-4" />
                  <span>Muted</span>
                </div>
              )}
            </div>
          </div>

          {/* Shared Content Area */}
          <div className="absolute bottom-24 left-4 right-4 bg-slate-800/95 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-semibold text-white flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Watching Together
                </h4>
                <p className="text-sm text-slate-400">Synced recommendations based on both moods</p>
              </div>
              <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                Browse More Content
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {sharedContent.map((content) => (
                <div
                  key={content.id}
                  className="bg-slate-700 rounded-lg p-3 cursor-pointer hover:bg-slate-600 transition-colors"
                  onClick={() => watchTogether(content)}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={content.image || "/placeholder.svg"}
                      alt={content.title}
                      className="w-12 h-8 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm truncate">{content.title}</p>
                      <p className="text-xs text-slate-400">
                        {content.match}% match • {content.duration}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call Controls */}
        <div className="p-6 bg-slate-800 border-t border-slate-700">
          <div className="flex items-center justify-center gap-4">
            <Button
              variant={isMuted ? "destructive" : "outline"}
              size="lg"
              onClick={() => {
                setIsMuted(!isMuted)
                showNotification("info", isMuted ? "Microphone On" : "Microphone Off", "")
              }}
              className="w-14 h-14 rounded-full"
            >
              {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>

            <Button
              variant={isVideoOff ? "destructive" : "outline"}
              size="lg"
              onClick={() => {
                setIsVideoOff(!isVideoOff)
                showNotification("info", isVideoOff ? "Video On" : "Video Off", "")
              }}
              className="w-14 h-14 rounded-full"
            >
              {isVideoOff ? <VideoOff className="h-6 w-6" /> : <Video className="h-6 w-6" />}
            </Button>

            <Button
              variant="destructive"
              size="lg"
              onClick={endCall}
              className="w-16 h-14 rounded-full bg-red-500 hover:bg-red-600"
            >
              <Phone className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-14 h-14 rounded-full"
              onClick={() => showNotification("info", "Chat", "Chat feature coming soon!")}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          🔥 <span className="text-orange-400">FireCall</span>
        </h1>
        <p className="text-slate-400">Video calls with emotion-synced content recommendations for shared viewing</p>
      </div>

      {/* Add Contact */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Add New Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Enter contact name"
              value={newContactName}
              onChange={(e) => setNewContactName(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              onKeyPress={(e) => e.key === "Enter" && addContact()}
            />
            <Button onClick={addContact} className="bg-orange-500 hover:bg-orange-600">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Contacts</span>
            <span className="text-sm text-slate-400">
              {contacts.filter((c) => c.status === "online").length} online
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={contact.avatar || "/placeholder.svg"}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(contact.status)} rounded-full border-2 border-slate-700`}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{contact.name}</p>
                      {contact.mood && (
                        <span className="text-sm bg-slate-600 px-2 py-1 rounded-full flex items-center gap-1">
                          <span>{contact.moodEmoji}</span>
                          <span className="text-slate-300">{contact.mood}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">{getStatusText(contact)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={contact.status === "offline"}
                    onClick={() => startCall(contact)}
                    className="hover:bg-green-500/10 hover:border-green-500 hover:text-green-400"
                  >
                    <PhoneCall className="h-4 w-4 mr-1" />
                    {contact.status === "offline" ? "Offline" : "Call"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Calls */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: "Sarah Johnson",
                time: "2 hours ago",
                duration: "45:32",
                type: "video",
                avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
              },
              {
                name: "Mike Chen",
                time: "Yesterday",
                duration: "23:15",
                type: "audio",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
              },
              {
                name: "Emma Davis",
                time: "2 days ago",
                duration: "1:12:45",
                type: "video",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
              },
            ].map((call, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <img
                    src={call.avatar || "/placeholder.svg"}
                    alt={call.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-white">{call.name}</p>
                    <p className="text-sm text-slate-400">
                      {call.time} • {call.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {call.type === "video" ? (
                    <Video className="h-4 w-4 text-blue-400" />
                  ) : (
                    <Phone className="h-4 w-4 text-green-400" />
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const contact = contacts.find((c) => c.name === call.name)
                      if (contact) startCall(contact)
                    }}
                  >
                    <PhoneCall className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
