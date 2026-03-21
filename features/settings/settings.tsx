"use client"

import { useState, useEffect } from "react"
import {
  SettingsIcon,
  Camera,
  Mic,
  Shield,
  Palette,
  Volume2,
  Bell,
  User,
  Database,
  Wifi,
  Download,
  Trash2,
  RotateCcw,
  Eye,
  VolumeX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useNotification } from "@/components/notification-provider"
import { useTheme } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export function Settings() {
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [dataCollection, setDataCollection] = useState(true)
  const [autoMoodDetection, setAutoMoodDetection] = useState(false)
  const [fatigueMonitoring, setFatigueMonitoring] = useState(true)
  const [language, setLanguage] = useState("en")
  const [userName, setUserName] = useState("FireLoop User")
  const [email, setEmail] = useState("")
  const [autoPlay, setAutoPlay] = useState(true)
  const [subtitles, setSubtitles] = useState(true)
  const [highQuality, setHighQuality] = useState(false)
  const [offlineMode, setOfflineMode] = useState(false)
  const { showNotification } = useNotification()
  const { volume, setVolume, brightness, setBrightness } = useTheme()

  // Audio context for volume control
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [gainNode, setGainNode] = useState<GainNode | null>(null)

  useEffect(() => {
    // Initialize audio context for volume control
    if (typeof window !== "undefined") {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const gain = ctx.createGain()
        gain.connect(ctx.destination)
        setAudioContext(ctx)
        setGainNode(gain)
      } catch (error) {
        console.log("Audio context not supported")
      }
    }
  }, [])

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0]
    setVolume(volumeValue)

    // Apply volume to audio context
    if (gainNode) {
      gainNode.gain.value = volumeValue / 100
    }

    // Show visual feedback
    showNotification("info", "Volume Changed", `Volume set to ${volumeValue}%`)
  }

  const handleBrightnessChange = (newBrightness: number[]) => {
    const brightnessValue = newBrightness[0]
    setBrightness(brightnessValue)
    showNotification("info", "Brightness Changed", `Brightness set to ${brightnessValue}%`)
  }

  const handleSaveProfile = () => {
    showNotification("success", "Profile Saved", "Your profile information has been updated successfully")
  }

  const handleExportData = () => {
    showNotification("info", "Exporting Data", "Your data export will be ready in a few minutes")
    setTimeout(() => {
      showNotification("success", "Export Complete", "Your data has been exported successfully")
    }, 3000)
  }

  const handleClearHistory = () => {
    showNotification("success", "History Cleared", "Your viewing history has been cleared")
  }

  const handleResetPreferences = () => {
    setCameraEnabled(true)
    setMicEnabled(true)
    setNotifications(true)
    setDataCollection(true)
    setAutoMoodDetection(false)
    setFatigueMonitoring(true)
    setVolume(75)
    setBrightness(80)
    setLanguage("en")
    setAutoPlay(true)
    setSubtitles(true)
    setHighQuality(false)
    setOfflineMode(false)
    showNotification("success", "Preferences Reset", "All settings have been reset to defaults")
  }

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.")
    if (confirmed) {
      showNotification(
        "error",
        "Account Deletion",
        "Account deletion process initiated. You will receive a confirmation email.",
      )
    }
  }

  const handleTestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      stream.getTracks().forEach((track) => track.stop())
      showNotification("success", "Camera Test", "Camera is working properly")
    } catch (error) {
      showNotification("error", "Camera Test Failed", "Unable to access camera. Please check permissions.")
    }
  }

  const handleTestMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop())
      showNotification("success", "Microphone Test", "Microphone is working properly")
    } catch (error) {
      showNotification("error", "Microphone Test Failed", "Unable to access microphone. Please check permissions.")
    }
  }

  const handleCacheManagement = () => {
    showNotification("info", "Cache Management", "Clearing cache and optimizing storage...")
    setTimeout(() => {
      showNotification("success", "Cache Cleared", "Application cache has been cleared successfully")
    }, 2000)
  }

  const testVolume = () => {
    if (audioContext) {
      const oscillator = audioContext.createOscillator()
      const testGain = audioContext.createGain()

      oscillator.connect(testGain)
      testGain.connect(audioContext.destination)

      oscillator.frequency.value = 440
      testGain.gain.value = (volume / 100) * 0.1

      oscillator.start()
      oscillator.stop(audioContext.currentTime + 0.2)

      showNotification("info", "Volume Test", `Playing test sound at ${volume}% volume`)
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <SettingsIcon className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-muted-foreground">Configure your FireLoop experience and privacy preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy & Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Camera Access
                </h3>
                <p className="text-sm text-muted-foreground">Allow camera for mood detection and fatigue monitoring</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={cameraEnabled}
                  onCheckedChange={(checked) => {
                    setCameraEnabled(checked)
                    showNotification("info", "Camera Access", checked ? "Camera enabled" : "Camera disabled")
                  }}
                />
                <Button size="sm" variant="outline" onClick={handleTestCamera}>
                  Test
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Microphone Access
                </h3>
                <p className="text-sm text-muted-foreground">Allow microphone for voice commands and mood analysis</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={micEnabled}
                  onCheckedChange={(checked) => {
                    setMicEnabled(checked)
                    showNotification(
                      "info",
                      "Microphone Access",
                      checked ? "Microphone enabled" : "Microphone disabled",
                    )
                  }}
                />
                <Button size="sm" variant="outline" onClick={handleTestMicrophone}>
                  Test
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Data Collection</h3>
                <p className="text-sm text-muted-foreground">Collect viewing behavior to improve recommendations</p>
              </div>
              <Switch
                checked={dataCollection}
                onCheckedChange={(checked) => {
                  setDataCollection(checked)
                  showNotification(
                    "info",
                    "Data Collection",
                    checked ? "Data collection enabled" : "Data collection disabled",
                  )
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Offline Mode</h3>
                <p className="text-sm text-muted-foreground">Download content for offline viewing</p>
              </div>
              <Switch
                checked={offlineMode}
                onCheckedChange={(checked) => {
                  setOfflineMode(checked)
                  showNotification("info", "Offline Mode", checked ? "Offline mode enabled" : "Offline mode disabled")
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* AI Features */}
        <Card>
          <CardHeader>
            <CardTitle>AI Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto Mood Detection</h3>
                <p className="text-sm text-muted-foreground">Automatically detect mood when opening the app</p>
              </div>
              <Switch
                checked={autoMoodDetection}
                onCheckedChange={(checked) => {
                  setAutoMoodDetection(checked)
                  showNotification(
                    "info",
                    "Auto Mood Detection",
                    checked ? "Auto detection enabled" : "Auto detection disabled",
                  )
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Fatigue Monitoring</h3>
                <p className="text-sm text-muted-foreground">Monitor viewing time and suggest breaks</p>
              </div>
              <Switch
                checked={fatigueMonitoring}
                onCheckedChange={(checked) => {
                  setFatigueMonitoring(checked)
                  showNotification(
                    "info",
                    "Fatigue Monitoring",
                    checked ? "Fatigue monitoring enabled" : "Fatigue monitoring disabled",
                  )
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Smart Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive personalized content recommendations</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={(checked) => {
                  setNotifications(checked)
                  showNotification(
                    "info",
                    "Smart Notifications",
                    checked ? "Notifications enabled" : "Notifications disabled",
                  )
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">High Quality Streaming</h3>
                <p className="text-sm text-muted-foreground">Use higher bandwidth for better quality</p>
              </div>
              <Switch
                checked={highQuality}
                onCheckedChange={(checked) => {
                  setHighQuality(checked)
                  showNotification("info", "High Quality", checked ? "High quality enabled" : "High quality disabled")
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Display & Audio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Display & Audio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Toggle */}
            <ThemeToggle />

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium flex items-center gap-2">
                  {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  Volume
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{volume}%</span>
                  <Button size="sm" variant="outline" onClick={testVolume}>
                    Test
                  </Button>
                </div>
              </div>
              <Slider value={[volume]} onValueChange={handleVolumeChange} max={100} step={1} className="w-full" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Brightness</h3>
                <span className="text-sm text-muted-foreground">{brightness}%</span>
              </div>
              <Slider
                value={[brightness]}
                onValueChange={handleBrightnessChange}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Auto-play</h3>
                <p className="text-sm text-muted-foreground">Automatically play next episode</p>
              </div>
              <Switch
                checked={autoPlay}
                onCheckedChange={(checked) => {
                  setAutoPlay(checked)
                  showNotification("info", "Auto-play", checked ? "Auto-play enabled" : "Auto-play disabled")
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Subtitles</h3>
                <p className="text-sm text-muted-foreground">Show subtitles by default</p>
              </div>
              <Switch
                checked={subtitles}
                onCheckedChange={(checked) => {
                  setSubtitles(checked)
                  showNotification("info", "Subtitles", checked ? "Subtitles enabled" : "Subtitles disabled")
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Display Name</label>
              <Input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Enter your name" />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Language</label>
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value)
                  showNotification(
                    "info",
                    "Language Changed",
                    `Language set to ${e.target.options[e.target.selectedIndex].text}`,
                  )
                }}
                className="w-full bg-background border border-border rounded-md px-3 py-2"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="it">Italian</option>
                <option value="pt">Portuguese</option>
                <option value="ja">Japanese</option>
                <option value="ko">Korean</option>
                <option value="zh">Chinese</option>
              </select>
            </div>

            <Button onClick={handleSaveProfile} className="w-full">
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button onClick={handleExportData} variant="outline" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Export My Data
              </Button>
              <Button onClick={handleClearHistory} variant="outline" className="w-full justify-start">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Viewing History
              </Button>
              <Button onClick={handleCacheManagement} variant="outline" className="w-full justify-start">
                <Database className="mr-2 h-4 w-4" />
                Manage Cache
              </Button>
              <Button onClick={handleResetPreferences} variant="outline" className="w-full justify-start">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset All Preferences
              </Button>
            </div>

            <div className="pt-4 border-t">
              <Button onClick={handleDeleteAccount} variant="destructive" className="w-full">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                This action cannot be undone and will permanently delete your account
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Connection</p>
                <p className="font-medium text-green-600">Online</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Eye className="h-5 w-5 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Camera Status</p>
                <p className="font-medium">{cameraEnabled ? "Enabled" : "Disabled"}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Mic className="h-5 w-5 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Microphone</p>
                <p className="font-medium">{micEnabled ? "Enabled" : "Disabled"}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <Bell className="h-5 w-5 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Notifications</p>
                <p className="font-medium">{notifications ? "On" : "Off"}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-center space-y-2">
                <p className="text-2xl font-bold text-orange-500">🔥 FireLoop</p>
                <p className="text-muted-foreground">Version 1.0.0</p>
                <p className="text-sm text-muted-foreground">Emotion-Aware Smart Streaming Interface</p>
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => showNotification("info", "Update Check", "You're running the latest version!")}
                  >
                    Check for Updates
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
