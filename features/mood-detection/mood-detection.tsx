

"use client"

import { useState, useEffect, useRef } from "react"
import { Camera, Activity, RefreshCw, Zap, Heart, Brain, Star, Play, TrendingUp, MessageSquare, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCamera } from "@/components/camera-provider"
import { useNotification } from "@/components/notification-provider"

const moods = [
  { name: "Happy", color: "bg-yellow-500", emoji: "😊", description: "Feeling joyful and content", faceapi: "happy" },
  { name: "Sad", color: "bg-blue-500", emoji: "😢", description: "Feeling down or melancholy", faceapi: "sad" },
  { name: "Excited", color: "bg-red-500", emoji: "🤩", description: "Full of energy and enthusiasm", faceapi: "surprised" },
  { name: "Calm", color: "bg-green-500", emoji: "😌", description: "Peaceful and relaxed", faceapi: "neutral" },
  { name: "Tired", color: "bg-purple-500", emoji: "😴", description: "Feeling sleepy or exhausted", faceapi: "disgusted" },
  { name: "Angry", color: "bg-orange-500", emoji: "😠", description: "Feeling frustrated or angry", faceapi: "angry" },
  { name: "Romantic", color: "bg-pink-500", emoji: "😍", description: "In the mood for love stories", faceapi: "happy" },
  { name: "Adventurous", color: "bg-orange-500", emoji: "🤠", description: "Ready for action and thrills", faceapi: "surprised" },
]

const moodBasedContent = {
  Happy: [
    { id: 1, title: "Ted Lasso", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=450&fit=crop", rating: 8.9, year: 2020, genre: "Comedy", description: "An American football coach moves to England to manage a British soccer team.", tmdb_id: 97546 },
    { id: 2, title: "The Good Place", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=450&fit=crop", rating: 8.2, year: 2016, genre: "Comedy", description: "A woman finds herself in the afterlife and must learn to be a better person.", tmdb_id: 66573 },
    { id: 3, title: "Parks and Recreation", image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=450&fit=crop", rating: 8.6, year: 2009, genre: "Comedy", description: "A mockumentary about local government in the fictional town of Pawnee, Indiana.", tmdb_id: 8592 },
  ],
  Sad: [
    { id: 5, title: "This Is Us", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop", rating: 8.7, year: 2016, genre: "Drama", description: "A heartwarming and emotional story about a unique set of triplets.", tmdb_id: 67136 },
    { id: 7, title: "Inside Out", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop", rating: 8.1, year: 2015, genre: "Animation", description: "After young Riley is uprooted from her Midwest life, her emotions conflict.", tmdb_id: 150540 },
  ],
  Excited: [
    { id: 8, title: "Avengers: Endgame", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop", rating: 8.4, year: 2019, genre: "Action", description: "The Avengers assemble once more to reverse Thanos' actions.", tmdb_id: 299534 },
    { id: 9, title: "Fast & Furious", image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=300&h=450&fit=crop", rating: 7.2, year: 2001, genre: "Action", description: "Los Angeles police officer goes undercover in the racing world.", tmdb_id: 9799 },
  ],
  Calm: [
    { id: 11, title: "Studio Ghibli Collection", image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop", rating: 8.6, year: 1988, genre: "Animation", description: "Beautiful animated films that soothe the soul.", tmdb_id: 129 },
    { id: 12, title: "The Great British Bake Off", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=450&fit=crop", rating: 8.5, year: 2010, genre: "Reality", description: "Amateur bakers compete in a series of rounds.", tmdb_id: 42009 },
  ],
  Tired: [
    { id: 13, title: "Planet Earth", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop", rating: 9.4, year: 2006, genre: "Documentary", description: "A nature documentary series featuring the wild places of our planet.", tmdb_id: 1044 },
  ],
  Angry: [
    { id: 10, title: "John Wick", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=450&fit=crop", rating: 7.4, year: 2014, genre: "Action", description: "An ex-hitman comes out of retirement to track down the gangsters.", tmdb_id: 245891 },
  ],
  Romantic: [
    { id: 15, title: "Bridgerton", image: "https://images.unsplash.com/photo-1489599735734-79b4212bdd26?w=300&h=450&fit=crop", rating: 7.3, year: 2020, genre: "Romance", description: "The romantic lives of the Bridgerton family in Regency-era England.", tmdb_id: 87108 },
    { id: 16, title: "Pride and Prejudice", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=450&fit=crop", rating: 8.7, year: 2005, genre: "Romance", description: "Sparks fly when spirited Elizabeth Bennet meets Mr. Darcy.", tmdb_id: 1403 },
  ],
  Adventurous: [
    { id: 17, title: "Indiana Jones", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop", rating: 8.5, year: 1981, genre: "Adventure", description: "Archaeologist and adventurer Indiana Jones races to find artifacts.", tmdb_id: 85 },
    { id: 18, title: "The Lord of the Rings", image: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=300&h=450&fit=crop", rating: 8.8, year: 2001, genre: "Fantasy", description: "A meek Hobbit and companions set out to destroy an ancient ring.", tmdb_id: 120 },
  ],
}

// face-api expression → our mood mapping
const expressionToMood: Record<string, string> = {
  happy: "Happy",
  sad: "Sad",
  surprised: "Excited",
  neutral: "Calm",
  disgusted: "Tired",
  angry: "Angry",
  fearful: "Adventurous",
}

const quickMoodOptions = [
  { label: "😊 Khush / Happy", value: "Happy" },
  { label: "😢 Udaas / Sad", value: "Sad" },
  { label: "🤩 Excited!", value: "Excited" },
  { label: "😌 Shant / Calm", value: "Calm" },
  { label: "😴 Thaka hua / Tired", value: "Tired" },
  { label: "😠 Gussa / Angry", value: "Angry" },
  { label: "😍 Romantic", value: "Romantic" },
  { label: "🤠 Adventurous", value: "Adventurous" },
]

function combineMoods(cameraMood: string, userMood: string, cameraConfidence: number): { mood: string; confidence: number } {
  if (cameraMood === userMood) {
    return { mood: userMood, confidence: Math.min(100, Math.round(cameraConfidence * 1.15)) }
  } else {
    return { mood: userMood, confidence: Math.min(100, Math.round((cameraConfidence + 85) / 2)) }
  }
}

type AnalysisStep = "idle" | "scanning" | "question" | "done"

export function MoodDetection() {
  const [step, setStep] = useState<AnalysisStep>("idle")
  const [detectedMood, setDetectedMood] = useState<string | null>(null)
  const [cameraMood, setCameraMood] = useState<string | null>(null)
  const [cameraConfidence, setCameraConfidence] = useState(0)
  const [confidence, setConfidence] = useState(0)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [moodHistory, setMoodHistory] = useState<Array<{ mood: string; time: string; confidence: number }>>([])
  const [showRecommendations, setShowRecommendations] = useState(false)
  const [statusText, setStatusText] = useState("")
  const [faceApiLoaded, setFaceApiLoaded] = useState(false)

  const { isCameraActive, requestCamera, stopCamera, cameraStream } = useCamera()
  const { showNotification } = useNotification()
  const videoRef = useRef<HTMLVideoElement>(null)

  // ✅ Camera stream video mein set karo
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream
    }
  }, [cameraStream])

  // ✅ face-api.js models load karo (CDN se, koi API key nahi chahiye)
  useEffect(() => {
    const loadFaceApi = async () => {
      try {
        // Dynamically load face-api.js from CDN
        if (!(window as any).faceapi) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement("script")
            script.src = "https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js"
            script.onload = () => resolve()
            script.onerror = () => reject(new Error("face-api.js load failed"))
            document.head.appendChild(script)
          })
        }

        const faceapi = (window as any).faceapi
        const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model"

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ])

        setFaceApiLoaded(true)
        console.log("✅ face-api.js models loaded!")
      } catch (err) {
        console.error("face-api.js load error:", err)
      }
    }

    loadFaceApi()
  }, [])

  const startMoodAnalysis = async () => {
    const cameraGranted = await requestCamera("mood analysis and personalized recommendations")
    if (!cameraGranted) {
      showNotification("error", "Camera Access Denied", "Please allow camera access for mood detection")
      return
    }

    // Camera stream load hone ka wait karo
    await new Promise(resolve => setTimeout(resolve, 2000))

    setStep("scanning")
    setDetectedMood(null)
    setCameraMood(null)
    setAnalysisProgress(0)
    setShowRecommendations(false)
    showNotification("info", "Analysis Started", "Analyzing your facial expressions...")

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 85) { clearInterval(progressInterval); return 85 }
        return prev + 8
      })
    }, 200)

    try {
      // Wait for camera to be fully ready (videoWidth + readyState >= 2)
      let video = videoRef.current
      let attempts = 0
      while (
        (!video || !video.videoWidth || video.videoWidth === 0 || (video.readyState ?? 0) < 2) &&
        attempts < 30
      ) {
        await new Promise(resolve => setTimeout(resolve, 500))
        video = videoRef.current
        attempts++
      }
      if (!video || !video.videoWidth || (video.readyState ?? 0) < 2) {
        throw new Error("Video stream not ready. Please allow camera and try again.")
      }

      setStatusText("Detecting face...")

      // face-api.js se expression detect karo
      const faceapi = (window as any).faceapi

      if (!faceapi || !faceApiLoaded) {
        throw new Error("face-api.js not loaded yet, please try again")
      }

      // Retry detection up to 5 times with tuned options (lower threshold catches more faces)
      const detectorOptions = new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,       // larger input = better detection (224 | 320 | 416 | 512 | 608)
        scoreThreshold: 0.3,  // lower = more sensitive (default 0.5 is too strict)
      })

      let detections = null
      const MAX_RETRIES = 5
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        setStatusText(`Detecting face... (attempt ${attempt}/${MAX_RETRIES})`)
        detections = await faceapi
          .detectSingleFace(video, detectorOptions)
          .withFaceExpressions()
        if (detections) break
        // Short pause before retrying — gives video frame time to update
        await new Promise(resolve => setTimeout(resolve, 400))
      }

      clearInterval(progressInterval)
      setAnalysisProgress(100)

      if (!detections) {
        throw new Error("No face detected after multiple attempts. Make sure your face is clearly visible, well-lit, and centred in the camera.")
      }

      // Expressions object se best match nikalo
      const expressions: Record<string, number> = detections.expressions
      const topExpression = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0]
      const expressionName = topExpression[0] // e.g. "happy"
      const expressionScore = Math.round(topExpression[1] * 100) // 0-100

      // face-api expression → our mood
      const moodName = expressionToMood[expressionName] || "Calm"

      setCameraMood(moodName)
      setCameraConfidence(expressionScore)
      setStatusText("")
      setStep("question")
      showNotification("info", "Almost there!", "One quick question to perfect your recommendations 🎯")

    } catch (err: any) {
      console.error("face-api mood detection error:", err)
      clearInterval(progressInterval)
      showNotification("error", "Detection Failed", err?.message || "Could not analyze mood. Try again.")
      setStep("idle")
      setStatusText("")
    }
  }

  const handleUserMoodSelect = (userMood: string) => {
    if (!cameraMood) return

    const result = combineMoods(cameraMood, userMood, cameraConfidence)
    setDetectedMood(result.mood)
    setConfidence(result.confidence)
    setStep("done")
    setShowRecommendations(true)

    const newEntry = { mood: result.mood, time: new Date().toLocaleTimeString(), confidence: result.confidence }
    setMoodHistory((prev) => [newEntry, ...prev.slice(0, 4)])

    showNotification("success", "Mood Detected!", `You're feeling ${result.mood.toLowerCase()} (${result.confidence}% confidence)`)

    setTimeout(() => {
      const recs = moodBasedContent[result.mood as keyof typeof moodBasedContent] || []
      showNotification("info", "Recommendations Ready", `Found ${recs.length} perfect matches for your mood!`)
    }, 1500)
  }

  const stopAnalysis = () => {
    setStep("idle")
    stopCamera()
    setDetectedMood(null)
    setCameraMood(null)
    setCameraConfidence(0)
    setConfidence(0)
    setAnalysisProgress(0)
    setShowRecommendations(false)
    setStatusText("")
    showNotification("info", "Analysis Stopped", "Mood detection has been stopped")
  }

  const resetForNewScan = () => {
    setStep("idle")
    setDetectedMood(null)
    setCameraMood(null)
    setCameraConfidence(0)
    setConfidence(0)
    setAnalysisProgress(0)
    setShowRecommendations(false)
    setStatusText("")
  }

  const playContent = (content: any) => {
    showNotification("success", "Now Playing", `Starting ${content.title}`)
    setTimeout(() => {
      showNotification("info", "TMDB Integration", `Loading from TMDB ID: ${content.tmdb_id}`)
    }, 1000)
  }

  const addToWatchlist = (content: any) => {
    showNotification("success", "Added to Watchlist", `${content.title} has been saved for later`)
  }

  const currentMood = moods.find((m) => m.name === detectedMood)
  const recommendations = detectedMood ? (moodBasedContent[detectedMood as keyof typeof moodBasedContent] || []) : []
  const isAnalyzing = step === "scanning"

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
        <p className={`text-sm mt-2 ${faceApiLoaded ? "text-green-400" : "text-yellow-400"}`}>
          {faceApiLoaded ? "✅ face-api.js Ready — No API key needed!" : "⏳ Loading face detection models..."}
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
                <div className="relative w-full h-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover rounded-lg"
                  />
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-blue-500/20 flex flex-col items-center justify-center rounded-lg">
                      <RefreshCw className="h-12 w-12 animate-spin text-blue-400 mx-auto mb-3" />
                      <p className="text-blue-400 font-medium">{statusText || "Analyzing expressions..."}</p>
                      <p className="text-sm text-slate-300 mt-1">Please look at the camera</p>
                      <div className="w-48 mt-4">
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="h-2 rounded-full bg-blue-400 transition-all duration-300" style={{ width: `${analysisProgress}%` }} />
                        </div>
                        <p className="text-xs text-center text-slate-300 mt-2">{analysisProgress}% complete</p>
                      </div>
                    </div>
                  )}
                  {step === "question" && (
                    <div className="absolute inset-0 bg-green-500/20 flex flex-col items-center justify-center rounded-lg">
                      <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                      <p className="text-green-400 font-medium">Face Scanned ✓</p>
                      <p className="text-sm text-slate-300 mt-1">
                        Camera detected: {cameraMood} ({cameraConfidence}%)
                      </p>
                    </div>
                  )}
                  {step === "done" && (
                    <div className="absolute inset-0 bg-purple-500/20 flex flex-col items-center justify-center rounded-lg">
                      <CheckCircle className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                      <p className="text-purple-400 font-medium">Mood Confirmed ✓</p>
                    </div>
                  )}
                  {isCameraActive && step === "idle" && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-32 h-40 border-2 border-green-400/70 rounded-lg animate-pulse" />
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

        {/* Right Panel */}
        <Card className="bg-slate-800 border-slate-700">
          {step === "question" ? (
            <>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-orange-400" />
                  <span>One Quick Question</span>
                  <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full ml-auto">Step 2/2</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-1 text-sm">
                  Camera says you look <span className="text-yellow-400 font-semibold">{cameraMood}</span>.
                  But you know yourself best — aap actually kaisa feel kar rahe ho?
                </p>
                <p className="text-slate-400 text-xs mb-4">Your answer will fine-tune the recommendations 🎯</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickMoodOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleUserMoodSelect(option.value)}
                      className={`p-3 rounded-lg text-sm font-medium transition-all border-2 text-left
                        ${option.value === cameraMood
                          ? "border-yellow-500 bg-yellow-500/10 text-yellow-300"
                          : "border-slate-600 bg-slate-700 text-slate-200 hover:border-purple-500 hover:bg-purple-500/10"
                        }`}
                    >
                      {option.label}
                      {option.value === cameraMood && (
                        <span className="block text-xs text-yellow-400/70 mt-0.5">Camera detected</span>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </>
          ) : (
            <>
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
                      <div className={`h-3 rounded-full ${currentMood.color} transition-all duration-1000`} style={{ width: `${confidence}%` }} />
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
                      <div className="mt-4 flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    )}
                    {!isAnalyzing && step === "idle" && (
                      <div className="mt-6 flex flex-col items-center gap-2 text-slate-500 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">1</span>
                          <span>Camera scans your face</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">2</span>
                          <span>Quick mood confirmation</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs">3</span>
                          <span>Personalized recommendations!</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </>
          )}
        </Card>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {step === "idle" && !isCameraActive && (
          <Button onClick={startMoodAnalysis} className="bg-orange-500 hover:bg-orange-600" size="lg" disabled={!faceApiLoaded}>
            <Camera className="mr-2 h-5 w-5" />
            {faceApiLoaded ? "Start Mood Analysis" : "Loading models..."}
          </Button>
        )}
        {step === "idle" && isCameraActive && (
          <div className="flex gap-4">
            <Button onClick={startMoodAnalysis} className="bg-blue-500 hover:bg-blue-600" size="lg">
              <RefreshCw className="mr-2 h-5 w-5" />
              Analyze Again
            </Button>
            <Button onClick={stopAnalysis} variant="outline" size="lg">Stop Analysis</Button>
          </div>
        )}
        {step === "scanning" && (
          <Button onClick={stopAnalysis} variant="outline" size="lg">Cancel</Button>
        )}
        {step === "question" && (
          <Button onClick={stopAnalysis} variant="outline" size="lg">Cancel</Button>
        )}
        {step === "done" && (
          <div className="flex gap-4">
            <Button onClick={resetForNewScan} className="bg-blue-500 hover:bg-blue-600" size="lg">
              <RefreshCw className="mr-2 h-5 w-5" />
              Scan Again
            </Button>
            <Button onClick={stopAnalysis} variant="outline" size="lg">Stop</Button>
          </div>
        )}
      </div>

      {/* Mood History */}
      {moodHistory.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader><CardTitle>Recent Mood History</CardTitle></CardHeader>
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

      {/* Recommendations */}
      {showRecommendations && detectedMood && recommendations.length > 0 && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400" />
              Perfect for Your {detectedMood} Mood
              <span className="text-sm bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full ml-2">{recommendations.length} matches</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recommendations.map((content) => (
                <div key={content.id} className="bg-slate-700 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer group">
                  <div className="relative aspect-[3/4]">
                    <img src={content.image || "/placeholder.svg"} alt={content.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={() => playContent(content)}><Play className="h-4 w-4" /></Button>
                        <Button size="sm" variant="outline" onClick={() => addToWatchlist(content)}><Heart className="h-4 w-4" /></Button>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400" />{content.rating}
                    </div>
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">{Math.floor(confidence)}% Match</div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-white mb-1">{content.title}</h3>
                    <p className="text-sm text-slate-400 mb-2">{content.genre} • {content.year}</p>
                    <p className="text-xs text-slate-500 line-clamp-2">{content.description}</p>
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










