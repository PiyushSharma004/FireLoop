"use client"

import { useState, useEffect } from "react"
import { Eye, Clock, Coffee, Moon, Activity, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useCamera } from "@/components/camera-provider"

export function FatiguePrevention() {
  const [watchTime, setWatchTime] = useState(0)
  const [blinkRate, setBlinkRate] = useState(15)
  const [fatigueLevel, setFatigueLevel] = useState(0)
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [showBreakSuggestion, setShowBreakSuggestion] = useState(false)
  const { isCameraActive, requestCamera, stopCamera } = useCamera()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isMonitoring) {
      interval = setInterval(() => {
        setWatchTime((prev) => prev + 1)

        // Simulate fatigue detection
        const newBlinkRate = Math.max(5, 15 - Math.floor(watchTime / 30))
        setBlinkRate(newBlinkRate)

        const newFatigueLevel = Math.min(100, Math.floor(watchTime / 10))
        setFatigueLevel(newFatigueLevel)

        if (newFatigueLevel > 70 && !showBreakSuggestion) {
          setShowBreakSuggestion(true)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isMonitoring, showBreakSuggestion])

  const startMonitoring = async () => {
    const cameraGranted = await requestCamera("fatigue detection and wellness monitoring")
    if (!cameraGranted) return

    setIsMonitoring(true)
    setWatchTime(0)
    setFatigueLevel(0)
    setShowBreakSuggestion(false)
  }

  const stopMonitoring = () => {
    setIsMonitoring(false)
    stopCamera()
    setWatchTime(0)
    setFatigueLevel(0)
    setShowBreakSuggestion(false)
  }

  const takeBreak = () => {
    setShowBreakSuggestion(false)
    setWatchTime(0)
    setFatigueLevel(0)
  }

  const getFatigueColor = (level: number) => {
    if (level < 30) return "text-green-400"
    if (level < 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getFatigueStatus = (level: number) => {
    if (level < 30) return "Fresh"
    if (level < 60) return "Mild Fatigue"
    return "High Fatigue"
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
          <Eye className="h-8 w-8" />
          Binge-Fatigue Prevention
        </h1>
        <p className="text-slate-400">Monitor your viewing habits and prevent content addiction or exhaustion</p>
      </div>

      {/* Break Suggestion Modal */}
      {showBreakSuggestion && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-slate-800 border-slate-700 max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <AlertTriangle className="h-5 w-5" />
                Time for a Break!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300">
                You've been watching for a while and showing signs of fatigue. Taking a break will help refresh your
                mind and improve your viewing experience.
              </p>
              <div className="flex gap-3">
                <Button onClick={takeBreak} className="flex-1 bg-green-500 hover:bg-green-600">
                  <Coffee className="mr-2 h-4 w-4" />
                  Take Break
                </Button>
                <Button onClick={() => setShowBreakSuggestion(false)} variant="outline" className="flex-1">
                  Continue Watching
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Monitoring Controls */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle>Fatigue Monitoring</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            {!isMonitoring ? (
              <Button onClick={startMonitoring} className="bg-orange-500 hover:bg-orange-600" size="lg">
                <Eye className="mr-2 h-5 w-5" />
                Start Monitoring
              </Button>
            ) : (
              <Button onClick={stopMonitoring} variant="outline" size="lg">
                Stop Monitoring
              </Button>
            )}
          </div>

          {isCameraActive && (
            <div className="text-center text-green-400 text-sm">
              Camera active - Monitoring facial expressions and blink patterns
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fatigue Metrics */}
      {isMonitoring && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                Watch Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">
                  {Math.floor(watchTime / 60)}:{(watchTime % 60).toString().padStart(2, "0")}
                </p>
                <p className="text-sm text-slate-400">minutes</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Eye className="h-4 w-4" />
                Blink Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-3xl font-bold text-white">{blinkRate}</p>
                <p className="text-sm text-slate-400">blinks/min</p>
                <p className="text-xs text-slate-500 mt-1">Normal: 15-20 blinks/min</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <Activity className="h-4 w-4" />
                Fatigue Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className={`text-3xl font-bold ${getFatigueColor(fatigueLevel)}`}>{fatigueLevel}%</p>
                <p className="text-sm text-slate-400">{getFatigueStatus(fatigueLevel)}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Fatigue Progress */}
      {isMonitoring && (
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Fatigue Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Fatigue Level</span>
                <span className={getFatigueColor(fatigueLevel)}>{fatigueLevel}%</span>
              </div>
              <Progress value={fatigueLevel} className="h-2" />
            </div>

            {fatigueLevel > 50 && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  <strong>Recommendation:</strong> Consider taking a 5-10 minute break to rest your eyes and mind.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Wellness Suggestions */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            Wellness Mode
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-700 rounded-lg text-center">
              <Coffee className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-medium text-white mb-2">Take a Break</h3>
              <p className="text-sm text-slate-400 mb-3">Step away from the screen for 5-10 minutes</p>
              <Button size="sm" variant="outline">
                Start Break Timer
              </Button>
            </div>

            <div className="p-4 bg-slate-700 rounded-lg text-center">
              <Eye className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-medium text-white mb-2">Eye Exercises</h3>
              <p className="text-sm text-slate-400 mb-3">Reduce eye strain with simple exercises</p>
              <Button size="sm" variant="outline">
                Start Exercises
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
