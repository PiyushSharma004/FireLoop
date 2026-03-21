"use client"

import { useState } from "react"
import { Camera, Activity, RefreshCw, Zap, Heart, Brain, Star, Play, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useCamera } from "@/components/camera-provider"
import { useNotification } from "@/components/notification-provider"

const moods = [
  { name: "Happy", color: "bg-yellow-500", emoji: "😊", description: "Feeling joyful and content" },
  { name: "Sad", color: "bg-blue-500", emoji: "😢", description: "Feeling down or melancholy" },
  { name: "Excited", color: "bg-red-500", emoji: "🤩", description: "Full of energy and enthusiasm" },
  { name: "Calm", color: "bg-green-500", emoji: "😌", description: "Peaceful and relaxed" },
  { name: "Tired", color: "bg-purple-500", emoji: "😴", description: "Feeling sleepy or exhausted" },
  { name: "Bored", color: "bg-gray-500", emoji: "😑", description: "Looking for something interesting" },
  { name: "Romantic", color: "bg-pink-500", emoji: "😍", description: "In the mood for love stories" },
  { name: "Adventurous", color: "bg-orange-500", emoji: "🤠", description: "Ready for action and thrills" },
]

// TMDB-inspired movie data with mood-based recommendations
const moodBasedContent = {
  Happy: [
    {
      id: 1,
      title: "Ted Lasso",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=450&fit=crop",
      rating: 8.9,
      year: 2020,
      genre: "Comedy",
      description: "An American football coach moves to England to manage a British soccer team.",
      tmdb_id: 97546,
    },
    {
      id: 2,
      title: "The Good Place",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=450&fit=crop",
      rating: 8.2,
      year: 2016,
      genre: "Comedy",
      description: "A woman finds herself in the afterlife and must learn to be a better person.",
      tmdb_id: 66573,
    },
    {
      id: 3,
      title: "Parks and Recreation",
      image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=450&fit=crop",
      rating: 8.6,
      year: 2009,
      genre: "Comedy",
      description: "A mockumentary about local government in the fictional town of Pawnee, Indiana.",
      tmdb_id: 8592,
    },
    {
      id: 4,
      title: "Brooklyn Nine-Nine",
      image: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=300&h=450&fit=crop",
      rating: 8.4,
      year: 2013,
      genre: "Comedy",
      description: "Comedy series following the exploits of a talented detective in a New York precinct.",
      tmdb_id: 48891,
    },
  ],
  Sad: [
    {
      id: 5,
      title: "This Is Us",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      rating: 8.7,
      year: 2016,
      genre: "Drama",
      description: "A heartwarming and emotional story about a unique set of triplets.",
      tmdb_id: 67136,
    },
    {
      id: 6,
      title: "The Notebook",
      image: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=300&h=450&fit=crop",
      rating: 7.8,
      year: 2004,
      genre: "Romance",
      description: "A poor yet passionate young man falls in love with a rich young woman.",
      tmdb_id: 11036,
    },
    {
      id: 7,
      title: "Inside Out",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      rating: 8.1,
      year: 2015,
      genre: "Animation",
      description: "After young Riley is uprooted from her Midwest life, her emotions conflict.",
      tmdb_id: 150540,
    },
  ],
  Excited: [
    {
      id: 8,
      title: "Avengers: Endgame",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      rating: 8.4,
      year: 2019,
      genre: "Action",
      description: "The Avengers assemble once more to reverse Thanos' actions.",
      tmdb_id: 299534,
    },
    {
      id: 9,
      title: "Fast & Furious",
      image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=300&h=450&fit=crop",
      rating: 7.2,
      year: 2001,
      genre: "Action",
      description: "Los Angeles police officer goes undercover in the racing world.",
      tmdb_id: 9799,
    },
    {
      id: 10,
      title: "John Wick",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=450&fit=crop",
      rating: 7.4,
      year: 2014,
      genre: "Action",
      description: "An ex-hitman comes out of retirement to track down the gangsters.",
      tmdb_id: 245891,
    },
  ],
  Calm: [
    {
      id: 11,
      title: "Studio Ghibli Collection",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      rating: 8.6,
      year: 1988,
      genre: "Animation",
      description: "Beautiful animated films that soothe the soul.",
      tmdb_id: 129,
    },
    {
      id: 12,
      title: "The Great British Bake Off",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=450&fit=crop",
      rating: 8.5,
      year: 2010,
      genre: "Reality",
      description: "Amateur bakers compete in a series of rounds.",
      tmdb_id: 42009,
    },
  ],
  Tired: [
    {
      id: 13,
      title: "Planet Earth",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      rating: 9.4,
      year: 2006,
      genre: "Documentary",
      description: "A nature documentary series featuring the wild places of our planet.",
      tmdb_id: 1044,
    },
    {
      id: 14,
      title: "Meditation & Sleep Stories",
      image: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=300&h=450&fit=crop",
      rating: 8.0,
      year: 2020,
      genre: "Wellness",
      description: "Calming content to help you relax and unwind.",
      tmdb_id: 0,
    },
  ],
  Romantic: [
    {
      id: 15,
      title: "Bridgerton",
      image: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=300&h=450&fit=crop",
      rating: 7.3,
      year: 2020,
      genre: "Romance",
      description: "The romantic lives of the Bridgerton family in Regency-era England.",
      tmdb_id: 87108,
    },
    {
      id: 16,
      title: "Pride and Prejudice",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=450&fit=crop",
      rating: 8.7,
      year: 2005,
      genre: "Romance",
      description: "Sparks fly when spirited Elizabeth Bennet meets Mr. Darcy.",
      tmdb_id: 1403,
    },
  ],
  Adventurous: [
    {
      id: 17,
      title: "Indiana Jones",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      rating: 8.5,
      year: 1981,
      genre: "Adventure",
      description: "Archaeologist and adventurer Indiana Jones races to find artifacts.",
      tmdb_id: 85,
    },
    {
      id: 18,
      title: "The Lord of the Rings",
      image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=300&h=450&fit=crop",
      rating: 8.8,
      year: 2001,
      genre: "Fantasy",
      description: "A meek Hobbit and companions set out to destroy an ancient ring.",
      tmdb_id: 120,
    },
  ],
  Bored: [
    {
      id: 19,
      title: "Stranger Things",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop",
      rating: 8.7,
      year: 2016,
      genre: "Sci-Fi",
      description: "When a young boy vanishes, a small town uncovers supernatural mysteries.",
      tmdb_id: 66732,
    },
    {
      id: 20,
      title: "The Office",
      image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=450&fit=crop",
      rating: 8.9,
      year: 2005,
      genre: "Comedy",
      description: "A mockumentary on a group of typical office workers.",
      tmdb_id: 2316,
    },
  ],
}

export function MoodDetection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectedMood, setDetectedMood] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [moodHistory, setMoodHistory] = useState<Array<{ mood: string; time: string; confidence: number }>>([])
  const [showRecommendations, setShowRecommendations] = useState(false)
  const { isCameraActive, requestCamera, stopCamera } = useCamera()
  const { showNotification } = useNotification()

  const startMoodAnalysis = async () => {
    const cameraGranted = await requestCamera("mood analysis and personalized recommendations")
    if (!cameraGranted) {
      showNotification("error", "Camera Access Denied", "Please allow camera access for mood detection")
      return
    }

    setIsAnalyzing(true)
    setDetectedMood(null)
    setAnalysisProgress(0)
    setShowRecommendations(false)
    showNotification("info", "Analysis Started", "Analyzing your facial expressions...")

    // Simulate progressive analysis
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate AI mood detection with realistic timing
    setTimeout(() => {
      const randomMood = moods[Math.floor(Math.random() * moods.length)]
      const newConfidence = Math.floor(Math.random() * 25) + 75 // 75-100% confidence

      setDetectedMood(randomMood.name)
      setConfidence(newConfidence)
      setIsAnalyzing(false)
      setShowRecommendations(true)

      // Add to history
      const newEntry = {
        mood: randomMood.name,
        time: new Date().toLocaleTimeString(),
        confidence: newConfidence,
      }
      setMoodHistory((prev) => [newEntry, ...prev.slice(0, 4)]) // Keep last 5 entries

      showNotification(
        "success",
        "Mood Detected!",
        `You're feeling ${randomMood.name.toLowerCase()} (${newConfidence}% confidence)`,
      )

      // Show recommendations after a brief delay
      setTimeout(() => {
        showNotification(
          "info",
          "Recommendations Ready",
          `Found ${getRecommendations().length} perfect matches for your mood!`,
        )
      }, 1500)
    }, 3000)
  }

  const stopAnalysis = () => {
    setIsAnalyzing(false)
    stopCamera()
    setDetectedMood(null)
    setConfidence(0)
    setAnalysisProgress(0)
    setShowRecommendations(false)
    showNotification("info", "Analysis Stopped", "Mood detection has been stopped")
  }

  const getRecommendations = () => {
    if (!detectedMood) return []
    return moodBasedContent[detectedMood as keyof typeof moodBasedContent] || []
  }

  const playContent = (content: any) => {
    showNotification("success", "Now Playing", `Starting ${content.title}`)
    // Simulate opening content
    setTimeout(() => {
      showNotification("info", "TMDB Integration", `Loading from TMDB ID: ${content.tmdb_id}`)
    }, 1000)
  }

  const addToWatchlist = (content: any) => {
    showNotification("success", "Added to Watchlist", `${content.title} has been saved for later`)
  }

  const currentMood = moods.find((m) => m.name === detectedMood)
  const recommendations = getRecommendations()

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Brain className="h-10 w-10 text-purple-400" />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Mood Detection
          </span>
        </h1>
        <p className="text-slate-400 text-lg">
          Advanced facial expression analysis for personalized content recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Live Camera Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              {isCameraActive ? (
                <div className="text-center relative w-full h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                      <Camera className="h-10 w-10 text-green-400" />
                    </div>
                    <p className="text-green-400 font-medium">Camera Active</p>
                    <p className="text-sm text-slate-400 mt-1">AI analyzing facial expressions</p>
                  </div>

                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-blue-500/10 flex flex-col items-center justify-center">
                      <div className="text-center mb-4">
                        <RefreshCw className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-3" />
                        <p className="text-blue-400 font-medium">Analyzing expressions...</p>
                        <p className="text-sm text-slate-400">Please look at the camera</p>
                      </div>
                      <div className="w-48">
                        <Progress value={analysisProgress} className="h-2" />
                        <p className="text-xs text-center text-slate-400 mt-2">{analysisProgress}% complete</p>
                      </div>
                    </div>
                  )}

                  {/* Simulated face detection overlay */}
                  {isCameraActive && !isAnalyzing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-40 border-2 border-green-400/50 rounded-lg animate-pulse" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <Camera className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">Camera not active</p>
                  <p className="text-sm text-slate-500 mt-1">Click "Start Analysis" to begin</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mood Results */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Detected Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            {detectedMood && currentMood ? (
              <div className="text-center space-y-4">
                <div className="text-8xl animate-bounce">{currentMood.emoji}</div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">{detectedMood}</h3>
                  <p className="text-slate-400 mb-2">{currentMood.description}</p>
                  <div className="flex items-center justify-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Confidence: {confidence}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${currentMood.color} transition-all duration-1000`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <Heart className="h-6 w-6 text-red-400 mx-auto mb-1" />
                    <p className="text-sm text-slate-400">Emotional State</p>
                    <p className="font-medium text-white">{detectedMood}</p>
                  </div>
                  <div className="text-center p-3 bg-slate-700 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-1" />
                    <p className="text-sm text-slate-400">Recommendations</p>
                    <p className="font-medium text-white">{recommendations.length} found</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Activity className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">
                  {isAnalyzing ? "Analyzing your mood..." : "Start analysis to detect your mood"}
                </p>
                {isAnalyzing && (
                  <div className="mt-4">
                    <div className="flex justify-center space-x-1">
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!isCameraActive ? (
          <Button
            onClick={startMoodAnalysis}
            className="bg-orange-500 hover:bg-orange-600"
            size="lg"
            disabled={isAnalyzing}
          >
            <Camera className="mr-2 h-5 w-5" />
            Start Mood Analysis
          </Button>
        ) : (
          <div className="flex gap-4">
            {!isAnalyzing ? (
              <Button onClick={startMoodAnalysis} className="bg-blue-500 hover:bg-blue-600" size="lg">
                <RefreshCw className="mr-2 h-5 w-5" />
                Analyze Again
              </Button>
            ) : null}
            <Button onClick={stopAnalysis} variant="outline" size="lg">
              Stop Analysis
            </Button>
          </div>
        )}
      </div>

      {/* Mood History */}
      {moodHistory.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Recent Mood History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {moodHistory.map((entry, index) => {
                const mood = moods.find((m) => m.name === entry.mood)
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{mood?.emoji}</span>
                      <div>
                        <p className="font-medium text-white">{entry.mood}</p>
                        <p className="text-sm text-slate-400">{entry.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-400">{entry.confidence}%</p>
                      <p className="text-xs text-slate-500">confidence</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mood-based Recommendations */}
      {showRecommendations && detectedMood && recommendations.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400" />
              Perfect for Your {detectedMood} Mood
              <span className="text-sm bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full ml-2">
                {recommendations.length} matches
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((content) => (
                <div
                  key={content.id}
                  className="bg-slate-700 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group"
                >
                  <div className="relative aspect-[3/4]">
                    <img
                      src={content.image || "/placeholder.svg"}
                      alt={content.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-orange-500 hover:bg-orange-600"
                          onClick={() => playContent(content)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => addToWatchlist(content)}>
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      {content.rating}
                    </div>
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      {Math.floor(confidence)}% Match
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-white mb-1">{content.title}</h3>
                    <p className="text-sm text-slate-400 mb-2">
                      {content.genre} • {content.year}
                    </p>
                    <p className="text-xs text-slate-500 line-clamp-2">{content.description}</p>
                    <div className="mt-2 text-xs text-slate-600">TMDB ID: {content.tmdb_id}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
