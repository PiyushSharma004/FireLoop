"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  User,
  Settings,
  LogOut,
  Camera,
  Edit3,
  Heart,
  Clock,
  TrendingUp,
  Upload,
  Check,
  X,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNotification } from "@/components/notification-provider"

interface UserProfileProps {
  setActiveFeature: (feature: string) => void
}

// Preset avatar options
const presetAvatars = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
]

export function UserProfile({ setActiveFeature }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)
  const [userName, setUserName] = useState("Alex Johnson")
  const [userBio, setUserBio] = useState("Movie enthusiast & AI explorer")
  const [userAvatar, setUserAvatar] = useState(presetAvatars[0])
  const [tempUserName, setTempUserName] = useState(userName)
  const [tempUserBio, setTempUserBio] = useState(userBio)
  const [tempUserAvatar, setTempUserAvatar] = useState(userAvatar)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { showNotification } = useNotification()

  const userStats = {
    watchTime: "127 hours",
    favoriteGenre: "Sci-Fi",
    moodDetections: 45,
    friendsConnected: 12,
  }

  const recentActivity = [
    { action: "Watched", content: "Stranger Things S4", time: "2 hours ago", mood: "Excited" },
    { action: "Added to Watchlist", content: "The Bear", time: "1 day ago", mood: "Happy" },
    { action: "Completed", content: "Ted Lasso", time: "3 days ago", mood: "Uplifting" },
  ]

  const handleStartEdit = () => {
    setTempUserName(userName)
    setTempUserBio(userBio)
    setTempUserAvatar(userAvatar)
    setIsEditingProfile(true)
    setIsOpen(false)
  }

  const handleSaveProfile = () => {
    setUserName(tempUserName)
    setUserBio(tempUserBio)
    setUserAvatar(tempUserAvatar)
    setIsEditingProfile(false)
    setIsEditingAvatar(false)
    showNotification("success", "Profile Updated", "Your profile has been saved successfully!")
  }

  const handleCancelEdit = () => {
    setTempUserName(userName)
    setTempUserBio(userBio)
    setTempUserAvatar(userAvatar)
    setIsEditingProfile(false)
    setIsEditingAvatar(false)
  }

  const handleAvatarSelect = (avatarUrl: string) => {
    setTempUserAvatar(avatarUrl)
    setIsEditingAvatar(false)
    showNotification("info", "Avatar Selected", "Don't forget to save your changes!")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file type
      if (!file.type.startsWith("image/")) {
        showNotification("error", "Invalid File", "Please select an image file (JPG, PNG, GIF)")
        return
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        showNotification("error", "File Too Large", "Please select an image smaller than 5MB")
        return
      }

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file)
      setTempUserAvatar(objectUrl)
      setIsEditingAvatar(false)
      showNotification("success", "Photo Uploaded", "Custom photo uploaded! Don't forget to save.")
    }
  }

  const handleCustomUpload = () => {
    fileInputRef.current?.click()
  }

  const handleSignOut = () => {
    showNotification("info", "Signing Out", "See you next time!")
    // Simulate sign out
  }

  // Avatar Selection Modal
  if (isEditingAvatar) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="bg-slate-800 border-slate-700 max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Choose Your Avatar
              </span>
              <Button variant="ghost" size="sm" onClick={() => setIsEditingAvatar(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Selection */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={tempUserAvatar || "/placeholder.svg"}
                  alt="Selected Avatar"
                  className="w-20 h-20 rounded-full object-cover border-4 border-orange-500 mx-auto"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                  <Check className="h-3 w-3" />
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-2">Current Selection</p>
            </div>

            {/* Upload Custom Photo */}
            <div className="text-center p-4 border-2 border-dashed border-slate-600 rounded-lg hover:border-orange-500 transition-colors">
              <div className="relative">
                <img
                  src="/images/photo-upload-reference.png"
                  alt="Upload Reference"
                  className="w-16 h-16 mx-auto mb-2 rounded-full opacity-50"
                />
                <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-sm text-slate-400 mb-3">Upload your own photo</p>
              <Button onClick={handleCustomUpload} className="bg-orange-500 hover:bg-orange-600">
                <ImageIcon className="h-4 w-4 mr-2" />
                Choose File
              </Button>
              <p className="text-xs text-slate-500 mt-2">JPG, PNG, GIF up to 5MB</p>

              {/* Hidden file input */}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </div>

            {/* Preset Avatars */}
            <div>
              <h4 className="text-sm font-medium text-white mb-3">Choose from presets:</h4>
              <div className="grid grid-cols-5 gap-3">
                {presetAvatars.map((avatar, index) => (
                  <button
                    key={index}
                    onClick={() => handleAvatarSelect(avatar)}
                    className={`relative group ${tempUserAvatar === avatar ? "ring-2 ring-orange-500" : ""}`}
                  >
                    <img
                      src={avatar || "/placeholder.svg"}
                      alt={`Avatar ${index + 1}`}
                      className="w-16 h-16 rounded-full object-cover hover:scale-110 transition-transform"
                    />
                    {tempUserAvatar === avatar && (
                      <div className="absolute inset-0 bg-orange-500/20 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-orange-400" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={() => setIsEditingAvatar(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button onClick={() => setIsEditingAvatar(false)} className="flex-1 bg-orange-500 hover:bg-orange-600">
                Confirm Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Profile Edit Modal
  if (isEditingProfile) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="bg-slate-800 border-slate-700 max-w-md w-full">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Edit Profile
              </span>
              <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={tempUserAvatar || "/placeholder.svg"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-orange-500"
                />
                <button
                  onClick={() => setIsEditingAvatar(true)}
                  className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-lg"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-slate-400 mt-2">Click camera to change photo</p>
            </div>

            {/* Name Input */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Display Name</label>
              <Input
                value={tempUserName}
                onChange={(e) => setTempUserName(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter your name"
                maxLength={30}
              />
              <p className="text-xs text-slate-500 mt-1">{tempUserName.length}/30 characters</p>
            </div>

            {/* Bio Input */}
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Bio</label>
              <Input
                value={tempUserBio}
                onChange={(e) => setTempUserBio(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Tell us about yourself"
                maxLength={50}
              />
              <p className="text-xs text-slate-500 mt-1">{tempUserBio.length}/50 characters</p>
            </div>

            {/* Preview */}
            <div className="p-4 bg-slate-700 rounded-lg">
              <p className="text-sm text-slate-400 mb-2">Preview:</p>
              <div className="flex items-center gap-3">
                <img
                  src={tempUserAvatar || "/placeholder.svg"}
                  alt="Preview"
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/50"
                />
                <div>
                  <p className="font-medium text-white">{tempUserName || "Your Name"}</p>
                  <p className="text-sm text-slate-400">{tempUserBio || "Your bio"}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleCancelEdit} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                className="flex-1 bg-orange-500 hover:bg-orange-600"
                disabled={!tempUserName.trim()}
              >
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Profile Picture Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-700 transition-colors"
      >
        <img
          src={userAvatar || "/placeholder.svg"}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-orange-500/50 hover:border-orange-500 transition-colors"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">{userName}</p>
          <p className="text-xs text-slate-400">Online</p>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
            {/* Profile Header */}
            <div className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={userAvatar || "/placeholder.svg"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover border-3 border-orange-500"
                  />
                  <button
                    onClick={handleStartEdit}
                    className="absolute -bottom-1 -right-1 bg-slate-700 text-white p-1 rounded-full hover:bg-slate-600 transition-colors"
                  >
                    <Edit3 className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg">{userName}</h3>
                  <p className="text-slate-300 text-sm">{userBio}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-400">Online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="p-4 border-b border-slate-700">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-slate-700 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">Watch Time</p>
                  <p className="text-sm font-medium text-white">{userStats.watchTime}</p>
                </div>
                <div className="text-center p-2 bg-slate-700 rounded-lg">
                  <Heart className="h-4 w-4 text-red-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">Favorite</p>
                  <p className="text-sm font-medium text-white">{userStats.favoriteGenre}</p>
                </div>
                <div className="text-center p-2 bg-slate-700 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-purple-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">Mood Scans</p>
                  <p className="text-sm font-medium text-white">{userStats.moodDetections}</p>
                </div>
                <div className="text-center p-2 bg-slate-700 rounded-lg">
                  <User className="h-4 w-4 text-green-400 mx-auto mb-1" />
                  <p className="text-xs text-slate-400">Friends</p>
                  <p className="text-sm font-medium text-white">{userStats.friendsConnected}</p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-4 border-b border-slate-700">
              <h4 className="text-sm font-medium text-white mb-3">Recent Activity</h4>
              <div className="space-y-2">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-slate-700/50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">
                        <span className="text-slate-400">{activity.action}</span> {activity.content}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">{activity.time}</span>
                        <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded">
                          {activity.mood}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button
                onClick={handleStartEdit}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Edit3 className="h-4 w-4 text-slate-400" />
                <span className="text-white">Edit Profile</span>
              </button>

              <button
                onClick={() => {
                  setActiveFeature("settings")
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                <span className="text-white">Settings</span>
              </button>

              <button
                onClick={() => {
                  handleSignOut()
                  setIsOpen(false)
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-slate-700 rounded-lg transition-colors text-red-400 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
