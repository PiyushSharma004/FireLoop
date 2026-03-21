"use client"

import { useState, useEffect } from "react"
import { Play, TrendingUp, Clock, Users, Star, Plus, ChevronLeft, ChevronRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNotification } from "@/components/notification-provider"
import { tmdbApi, type TMDBMovie } from "@/lib/tmdb-api"

interface HomeViewProps {
  setActiveFeature: (feature: string) => void
}

const quickActions = [
  {
    id: "mood",
    title: "Analyze My Mood",
    description: "Get personalized recommendations",
    icon: TrendingUp,
    feature: "mood-detection",
    color: "bg-purple-500",
  },
  {
    id: "continue",
    title: "Continue Watching",
    description: "Pick up where you left off",
    icon: Clock,
    feature: "home",
    color: "bg-blue-500",
  },
  {
    id: "friends",
    title: "Watch with Friends",
    description: "Start a FireCall session",
    icon: Users,
    feature: "firecall",
    color: "bg-green-500",
  },
]

const continueWatching = [
  {
    id: 1,
    title: "The Office",
    episode: "S3 E12 - The Convention",
    progress: 65,
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=200&fit=crop",
    timeLeft: "12 min left",
  },
  {
    id: 2,
    title: "Breaking Bad",
    episode: "S2 E8 - Better Call Saul",
    progress: 23,
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=200&fit=crop",
    timeLeft: "38 min left",
  },
]

export function HomeView({ setActiveFeature }: HomeViewProps) {
  const [watchlist, setWatchlist] = useState<number[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [trendingMovies, setTrendingMovies] = useState<TMDBMovie[]>([])
  const [popularMovies, setPopularMovies] = useState<TMDBMovie[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<TMDBMovie[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { showNotification } = useNotification()

  // Load TMDB data
  useEffect(() => {
    const loadMovieData = async () => {
      try {
        setIsLoading(true)
        const [trending, popular, topRated] = await Promise.all([
          tmdbApi.getTrending(),
          tmdbApi.getPopular(),
          tmdbApi.getTopRated(),
        ])

        setTrendingMovies(trending.slice(0, 5)) // Hero carousel
        setPopularMovies(popular.slice(0, 12)) // Featured content
        setTopRatedMovies(topRated.slice(0, 6)) // Top rated section

        showNotification("success", "Content Loaded", "Latest movies loaded from TMDB!")
      } catch (error) {
        showNotification("error", "Loading Error", "Failed to load movie data")
        console.error("Error loading movie data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMovieData()
  }, [showNotification])

  // Auto-slide functionality
  useEffect(() => {
    if (trendingMovies.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trendingMovies.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [trendingMovies.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % trendingMovies.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + trendingMovies.length) % trendingMovies.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handlePlay = (content: TMDBMovie) => {
    showNotification("success", "Now Playing", `Starting ${content.title}`)
    // Simulate playing content
    setTimeout(() => {
      showNotification("info", "Mood Detection", "Analyzing your facial expressions for better recommendations")
    }, 2000)
  }

  const toggleWatchlist = (contentId: number) => {
    setWatchlist((prev) => {
      const isInWatchlist = prev.includes(contentId)
      const newWatchlist = isInWatchlist ? prev.filter((id) => id !== contentId) : [...prev, contentId]

      showNotification(
        "success",
        isInWatchlist ? "Removed from Watchlist" : "Added to Watchlist",
        isInWatchlist ? "Item removed successfully" : "Item added successfully",
      )

      return newWatchlist
    })
  }

  const handleContinueWatching = (item: (typeof continueWatching)[0]) => {
    showNotification("success", "Resuming Playback", `Continuing ${item.title}`)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading latest movies from TMDB...</p>
        </div>
      </div>
    )
  }

  const currentHeroSlide = trendingMovies[currentSlide]

  return (
    <div className="space-y-8">
      {/* Hero Carousel Section */}
      {currentHeroSlide && (
        <div className="relative h-[500px] rounded-xl overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={tmdbApi.getBackdropUrl(currentHeroSlide.backdrop_path) || "/placeholder.svg"}
              alt={currentHeroSlide.title}
              className="w-full h-full object-cover transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center p-8 lg:p-12">
            <div className="max-w-2xl space-y-6">
              {/* Badge */}
              <div className="flex items-center gap-3">
                <span className="bg-orange-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                  Trending Now
                </span>
                <span className="bg-black/30 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400" />
                  {currentHeroSlide.vote_average.toFixed(1)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">{currentHeroSlide.title}</h1>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-slate-200">
                <span>{new Date(currentHeroSlide.release_date).getFullYear()}</span>
                <span>•</span>
                <span>Movie</span>
                <span>•</span>
                <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded text-sm">Popular</span>
              </div>

              {/* Description */}
              <p className="text-lg text-slate-200 leading-relaxed max-w-xl">
                {currentHeroSlide.overview.length > 150
                  ? currentHeroSlide.overview.substring(0, 150) + "..."
                  : currentHeroSlide.overview}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8"
                  onClick={() => handlePlay(currentHeroSlide)}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Play Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={() => showNotification("info", "More Info", `Opening details for ${currentHeroSlide.title}`)}
                >
                  <Info className="mr-2 h-5 w-5" />
                  More Info
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                  onClick={() => toggleWatchlist(currentHeroSlide.id)}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  My List
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {trendingMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? "bg-orange-500 scale-125" : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
            <div
              className="h-full bg-orange-500 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / trendingMovies.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Rest of the content */}
      <div className="p-6 space-y-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Card
                key={action.id}
                className="bg-slate-800 border-slate-700 hover:bg-slate-750 cursor-pointer transition-all hover:scale-105"
                onClick={() => {
                  setActiveFeature(action.feature)
                  showNotification("info", "Feature Activated", `Opening ${action.title}`)
                }}
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                  <p className="text-slate-400 text-sm">{action.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Continue Watching */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Continue Watching</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {continueWatching.map((item) => (
              <Card
                key={item.id}
                className="bg-slate-800 border-slate-700 overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                onClick={() => handleContinueWatching(item)}
              >
                <div className="flex">
                  <div className="w-32 h-20 relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-slate-400 mb-2">{item.episode}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex-1 bg-slate-700 rounded-full h-1 mr-3">
                        <div className="bg-orange-500 h-1 rounded-full" style={{ width: `${item.progress}%` }} />
                      </div>
                      <span className="text-xs text-slate-400">{item.timeLeft}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Movies from TMDB */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularMovies.map((movie) => (
              <Card
                key={movie.id}
                className="bg-slate-800 border-slate-700 overflow-hidden hover:scale-105 transition-transform cursor-pointer group"
              >
                <div className="relative aspect-[3/4]">
                  <img
                    src={tmdbApi.getImageUrl(movie.poster_path) || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlay(movie)
                        }}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWatchlist(movie.id)
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                  {watchlist.includes(movie.id) && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Watchlist
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-white text-sm mb-1 truncate">{movie.title}</h3>
                  <p className="text-xs text-slate-400 mb-1">{new Date(movie.release_date).getFullYear()}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Popular</span>
                    <span className="text-xs text-slate-500">TMDB</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Rated Movies */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Top Rated</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topRatedMovies.map((movie) => (
              <Card
                key={movie.id}
                className="bg-slate-800 border-slate-700 overflow-hidden hover:scale-105 transition-transform cursor-pointer group"
              >
                <div className="relative aspect-[3/4]">
                  <img
                    src={tmdbApi.getImageUrl(movie.poster_path) || "/placeholder.svg"}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlay(movie)
                        }}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWatchlist(movie.id)
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400" />
                    {movie.vote_average.toFixed(1)}
                  </div>
                  {watchlist.includes(movie.id) && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Watchlist
                    </div>
                  )}
                </div>
                <CardContent className="p-3">
                  <h3 className="font-semibold text-white text-sm mb-1 truncate">{movie.title}</h3>
                  <p className="text-xs text-slate-400 mb-1">{new Date(movie.release_date).getFullYear()}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">Top Rated</span>
                    <span className="text-xs text-slate-500">TMDB</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Watchlist */}
        {watchlist.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">My Watchlist</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...popularMovies, ...topRatedMovies]
                .filter((movie) => watchlist.includes(movie.id))
                .map((movie) => (
                  <Card
                    key={movie.id}
                    className="bg-slate-800 border-slate-700 overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                    onClick={() => handlePlay(movie)}
                  >
                    <div className="aspect-[3/4] relative">
                      <img
                        src={tmdbApi.getImageUrl(movie.poster_path) || "/placeholder.svg"}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-semibold text-white text-sm">{movie.title}</h3>
                      <p className="text-xs text-slate-400">{new Date(movie.release_date).getFullYear()}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
