"use client"

import { useState } from "react"
import { Heart, Play, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const sceneData = [
  {
    id: 1,
    title: "The Office - Jim's Proposal",
    show: "The Office",
    emotion: "Romantic",
    duration: "3:45",
    thumbnail: "/placeholder.svg?height=120&width=200",
    description: "Jim proposes to Pam at a gas station",
    mood: "happy",
    tags: ["romantic", "heartwarming", "proposal"],
  },
  {
    id: 2,
    title: "Friends - Ross and Rachel's First Kiss",
    show: "Friends",
    emotion: "Romantic",
    duration: "2:30",
    thumbnail: "/placeholder.svg?height=120&width=200",
    description: "The moment we all waited for",
    mood: "excited",
    tags: ["romantic", "iconic", "kiss"],
  },
  {
    id: 3,
    title: "Brooklyn Nine-Nine - Halloween Heist",
    show: "Brooklyn Nine-Nine",
    emotion: "Funny",
    duration: "5:20",
    thumbnail: "/placeholder.svg?height=120&width=200",
    description: "The ultimate Halloween competition",
    mood: "happy",
    tags: ["comedy", "heist", "competition"],
  },
  {
    id: 4,
    title: "Stranger Things - Eleven Saves the Day",
    show: "Stranger Things",
    emotion: "Thrilling",
    duration: "4:15",
    thumbnail: "/placeholder.svg?height=120&width=200",
    description: "Eleven uses her powers to defeat the Demogorgon",
    mood: "excited",
    tags: ["action", "supernatural", "heroic"],
  },
]

const moodColors = {
  happy: "bg-yellow-500",
  excited: "bg-red-500",
  sad: "bg-blue-500",
  calm: "bg-green-500",
  tired: "bg-purple-500",
}

export function SceneRecommendations() {
  const [currentMood, setCurrentMood] = useState<string>("happy")
  const [filteredScenes, setFilteredScenes] = useState(sceneData)

  const filterByMood = (mood: string) => {
    setCurrentMood(mood)
    const filtered = sceneData.filter((scene) => scene.mood === mood)
    setFilteredScenes(filtered.length > 0 ? filtered : sceneData)
  }

  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "romantic":
        return "text-pink-400"
      case "funny":
        return "text-yellow-400"
      case "thrilling":
        return "text-red-400"
      case "sad":
        return "text-blue-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Heart className="h-8 w-8" />
          Scene-Level Recommendations
        </h1>
        <p className="text-slate-400">Jump directly to scenes that match your current emotional state</p>
      </div>

      {/* Mood Selector */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Select Your Current Mood</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {Object.entries(moodColors).map(([mood, color]) => (
              <button
                key={mood}
                onClick={() => filterByMood(mood)}
                className={`
                  px-4 py-2 rounded-full capitalize font-medium transition-all
                  ${currentMood === mood ? `${color} text-white` : "bg-slate-700 text-slate-300 hover:bg-slate-600"}
                `}
              >
                {mood}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Mood Display */}
      <div className="text-center p-4 bg-slate-800 rounded-lg">
        <p className="text-slate-400">Showing scenes for mood:</p>
        <p className={`text-2xl font-bold capitalize ${moodColors[currentMood as keyof typeof moodColors]} text-white`}>
          {currentMood}
        </p>
      </div>

      {/* Scene Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenes.map((scene) => (
          <Card
            key={scene.id}
            className="bg-slate-800 border-slate-700 overflow-hidden hover:scale-105 transition-transform"
          >
            <div className="relative">
              <img src={scene.thumbnail || "/placeholder.svg"} alt={scene.title} className="w-full h-32 object-cover" />
              <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                {scene.duration}
              </div>
              <div className="absolute bottom-2 left-2">
                <span className={`text-xs px-2 py-1 rounded ${getEmotionColor(scene.emotion)} bg-black/70`}>
                  {scene.emotion}
                </span>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-white mb-1">{scene.title}</h3>
              <p className="text-sm text-slate-400 mb-2">{scene.show}</p>
              <p className="text-sm text-slate-300 mb-3">{scene.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {scene.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <Play className="mr-2 h-4 w-4" />
                Watch Scene
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scene Analytics */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Scene Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">2.5 hrs</p>
              <p className="text-sm text-slate-400">Total watch time today</p>
            </div>
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-sm text-slate-400">Scenes watched</p>
            </div>
            <div className="text-center p-4 bg-slate-700 rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">Happy</p>
              <p className="text-sm text-slate-400">Most watched mood</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
