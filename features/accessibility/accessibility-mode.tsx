"use client"

import { useState } from "react"
import { Accessibility, Volume2, Eye, Hand, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function AccessibilityMode() {
  const [emotionSubtitles, setEmotionSubtitles] = useState(true)
  const [visualMoodIndicators, setVisualMoodIndicators] = useState(true)
  const [gestureNavigation, setGestureNavigation] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [largeText, setLargeText] = useState(false)

  const subtitleExample = [
    { text: "I can't believe you did that!", emotion: "angrily", color: "text-red-400" },
    { text: "It's going to be okay", emotion: "whispers", color: "text-blue-400" },
    { text: "That's hilarious!", emotion: "laughing", color: "text-yellow-400" },
  ]

  const moodIcons = [
    { mood: "Happy", icon: "😊", color: "bg-yellow-500" },
    { mood: "Sad", icon: "😢", color: "bg-blue-500" },
    { mood: "Angry", icon: "😠", color: "bg-red-500" },
    { mood: "Surprised", icon: "😲", color: "bg-purple-500" },
    { mood: "Calm", icon: "😌", color: "bg-green-500" },
  ]

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Accessibility className="h-8 w-8" />
          Deaf Accessibility Mode
        </h1>
        <p className="text-slate-400">Enhanced visual features for deaf and hard-of-hearing users</p>
      </div>

      {/* Settings */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Accessibility Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Emotion-Aware Subtitles</h3>
              <p className="text-sm text-slate-400">Add emotional context to subtitles</p>
            </div>
            <Switch checked={emotionSubtitles} onCheckedChange={setEmotionSubtitles} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Visual Mood Indicators</h3>
              <p className="text-sm text-slate-400">Show color-coded mood icons</p>
            </div>
            <Switch checked={visualMoodIndicators} onCheckedChange={setVisualMoodIndicators} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Gesture Navigation</h3>
              <p className="text-sm text-slate-400">Navigate using hand gestures</p>
            </div>
            <Switch checked={gestureNavigation} onCheckedChange={setGestureNavigation} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">High Contrast Mode</h3>
              <p className="text-sm text-slate-400">Increase visual contrast</p>
            </div>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-white">Large Text</h3>
              <p className="text-sm text-slate-400">Increase subtitle text size</p>
            </div>
            <Switch checked={largeText} onCheckedChange={setLargeText} />
          </div>
        </CardContent>
      </Card>

      {/* Emotion-Aware Subtitles Demo */}
      {emotionSubtitles && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Emotion-Aware Subtitles Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-black rounded-lg p-6 space-y-4">
              {subtitleExample.map((subtitle, index) => (
                <div key={index} className="text-center">
                  <p className={`${largeText ? "text-xl" : "text-lg"} font-medium text-white`}>"{subtitle.text}"</p>
                  <p className={`text-sm ${subtitle.color} mt-1`}>[{subtitle.emotion}]</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400 mt-4">
              Emotional context is automatically added to help understand the tone and delivery of dialogue.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Visual Mood Indicators */}
      {visualMoodIndicators && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Visual Mood Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4 mb-4">
              {moodIcons.map((mood) => (
                <div key={mood.mood} className="text-center">
                  <div
                    className={`w-16 h-16 ${mood.color} rounded-full flex items-center justify-center text-2xl mx-auto mb-2`}
                  >
                    {mood.icon}
                  </div>
                  <p className="text-sm text-white">{mood.mood}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-400">
              These mood indicators appear during scenes to show the emotional tone of the content.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Gesture Navigation */}
      {gestureNavigation && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hand className="h-5 w-5" />
              Gesture Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-4xl mb-2">👆</div>
                <p className="text-sm text-white font-medium">Point Up</p>
                <p className="text-xs text-slate-400">Volume Up</p>
              </div>
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-4xl mb-2">👇</div>
                <p className="text-sm text-white font-medium">Point Down</p>
                <p className="text-xs text-slate-400">Volume Down</p>
              </div>
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-4xl mb-2">👈</div>
                <p className="text-sm text-white font-medium">Point Left</p>
                <p className="text-xs text-slate-400">Previous</p>
              </div>
              <div className="text-center p-4 bg-slate-700 rounded-lg">
                <div className="text-4xl mb-2">👉</div>
                <p className="text-sm text-white font-medium">Point Right</p>
                <p className="text-xs text-slate-400">Next</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                <strong>Note:</strong> Gesture recognition is currently in development. This feature will use computer
                vision to detect hand gestures for navigation.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
