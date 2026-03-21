"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Play, Heart, Share, Volume2, VolumeX, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react"
import { useNotification } from "@/components/notification-provider"
import { tmdbApi } from "@/lib/tmdb-api"

interface MovieReel {
  id: number
  title: string
  movieTitle: string
  description: string
  duration: string
  thumbnail: string
  videoUrl: string
  mood: string
  genre: string
  rating: number
  year: number
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  isBookmarked: boolean
  username: string
  userAvatar: string
  hashtags: string[]
}

// Famous movie scenes with real data
const famousMovieScenes: MovieReel[] = [
  {
    id: 1,
    title: "I Am Iron Man",
    movieTitle: "Iron Man",
    description: "The moment that started the MCU - Tony Stark reveals his identity 🔥⚡ #IronMan #MCU #Marvel",
    duration: "1:23",
    thumbnail: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/yKOLBZEv0Gk",
    mood: "Epic",
    genre: "Action",
    rating: 9.6,
    year: 2008,
    likes: 2847000,
    comments: 45600,
    shares: 89400,
    isLiked: false,
    isBookmarked: false,
    username: "marvel_official",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#IronMan", "#MCU", "#Marvel", "#TonyStark"],
  },
  {
    id: 2,
    title: "I Am Your Father",
    movieTitle: "Star Wars: The Empire Strikes Back",
    description: "The most shocking plot twist in cinema history 😱⚔️ #StarWars #DarthVader #PlotTwist",
    duration: "0:45",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/xuJEYdOFEP4",
    mood: "Dramatic",
    genre: "Sci-Fi",
    rating: 9.9,
    year: 1980,
    likes: 5632000,
    comments: 78900,
    shares: 156700,
    isLiked: true,
    isBookmarked: true,
    username: "starwars_clips",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#StarWars", "#DarthVader", "#PlotTwist", "#Empire"],
  },
  {
    id: 3,
    title: "You Can't Handle The Truth",
    movieTitle: "A Few Good Men",
    description: "Jack Nicholson's legendary courtroom scene 👨‍⚖️🔥 #AFewGoodMen #JackNicholson #Courtroom",
    duration: "2:15",
    thumbnail: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/9FnO3igOkOk",
    mood: "Intense",
    genre: "Drama",
    rating: 9.7,
    year: 1992,
    likes: 1284700,
    comments: 34500,
    shares: 67800,
    isLiked: false,
    isBookmarked: false,
    username: "classic_cinema",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#AFewGoodMen", "#JackNicholson", "#Courtroom", "#Classic"],
  },
  {
    id: 4,
    title: "Here's Johnny!",
    movieTitle: "The Shining",
    description: "The most terrifying door scene ever filmed 😱🚪 #TheShining #Horror #StanleyKubrick",
    duration: "1:34",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/WDpipB4yehk",
    mood: "Terrifying",
    genre: "Horror",
    rating: 9.4,
    year: 1980,
    likes: 892400,
    comments: 23400,
    shares: 45600,
    isLiked: true,
    isBookmarked: false,
    username: "horror_classics",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#TheShining", "#Horror", "#StanleyKubrick", "#JackNicholson"],
  },
  {
    id: 5,
    title: "Avengers Assemble",
    movieTitle: "Avengers: Endgame",
    description: "The most epic superhero moment in cinema history 🦸‍♂️⚡ #Avengers #Endgame #Marvel",
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/0jNvJU52LvU",
    mood: "Epic",
    genre: "Action",
    rating: 9.8,
    year: 2019,
    likes: 4567800,
    comments: 123400,
    shares: 234500,
    isLiked: true,
    isBookmarked: true,
    username: "marvel_official",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#Avengers", "#Endgame", "#Marvel", "#Epic"],
  },
  {
    id: 6,
    title: "I'll Be Back",
    movieTitle: "The Terminator",
    description: "Arnold's most iconic line that became legendary 🤖💪 #Terminator #Arnold #Iconic",
    duration: "0:32",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/5cOJbYiQjls",
    mood: "Badass",
    genre: "Sci-Fi",
    rating: 9.2,
    year: 1984,
    likes: 1567800,
    comments: 45600,
    shares: 78900,
    isLiked: false,
    isBookmarked: true,
    username: "action_classics",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#Terminator", "#Arnold", "#Iconic", "#SciFi"],
  },
  {
    id: 7,
    title: "Why So Serious?",
    movieTitle: "The Dark Knight",
    description: "Heath Ledger's chilling Joker performance 🃏😈 #DarkKnight #Joker #HeathLedger",
    duration: "1:56",
    thumbnail: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/xaPepCVepCg",
    mood: "Dark",
    genre: "Action",
    rating: 9.9,
    year: 2008,
    likes: 3456700,
    comments: 89400,
    shares: 167800,
    isLiked: true,
    isBookmarked: false,
    username: "batman_clips",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#DarkKnight", "#Joker", "#HeathLedger", "#Batman"],
  },
  {
    id: 8,
    title: "Frankly My Dear",
    movieTitle: "Gone with the Wind",
    description: "Clark Gable's legendary final line 💔🌪️ #GoneWithTheWind #ClarkGable #Classic",
    duration: "1:12",
    thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/GQ5ICXMC4xY",
    mood: "Romantic",
    genre: "Romance",
    rating: 9.1,
    year: 1939,
    likes: 892400,
    comments: 23400,
    shares: 45600,
    isLiked: false,
    isBookmarked: false,
    username: "golden_age_films",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#GoneWithTheWind", "#ClarkGable", "#Classic", "#Romance"],
  },
]

export function MovieReels() {
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [reels, setReels] = useState(famousMovieScenes)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { showNotification } = useNotification()

  const currentReel = reels[currentReelIndex]

  // Load more reels from TMDB
  useEffect(() => {
    const loadMoreReels = async () => {
      if (isLoading) return
      setIsLoading(true)

      try {
        const [trending, popular, topRated] = await Promise.all([
          tmdbApi.getTrending(),
          tmdbApi.getPopular(),
          tmdbApi.getTopRated(),
        ])

        const allMovies = [...trending, ...popular, ...topRated]
        const uniqueMovies = allMovies.filter(
          (movie, index, self) => index === self.findIndex((m) => m.id === movie.id),
        )

        const newReels = uniqueMovies.slice(0, 10).map((movie, index) => ({
          id: movie.id + 1000,
          title: `${movie.title} - Epic Scene`,
          movieTitle: movie.title,
          description: `${movie.overview.substring(0, 80)}... 🎬✨ #${movie.title.replace(/\s+/g, "")} #Cinema`,
          duration: `${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 60)
            .toString()
            .padStart(2, "0")}`,
          thumbnail: tmdbApi.getBackdropUrl(movie.backdrop_path),
          videoUrl: "",
          mood: ["Epic", "Dramatic", "Thrilling", "Emotional", "Action"][Math.floor(Math.random() * 5)],
          genre: "Drama",
          rating: Math.round(movie.vote_average * 10) / 10,
          year: new Date(movie.release_date).getFullYear(),
          likes: Math.floor(movie.popularity * 1000) + Math.floor(Math.random() * 100000),
          comments: Math.floor(Math.random() * 50000) + 1000,
          shares: Math.floor(Math.random() * 25000) + 500,
          isLiked: Math.random() > 0.7,
          isBookmarked: Math.random() > 0.8,
          username: `${movie.title.toLowerCase().replace(/\s+/g, "").substring(0, 8)}_clips`,
          userAvatar: `https://images.unsplash.com/photo-${1472099645785 + index}?w=50&h=50&fit=crop&crop=face`,
          hashtags: [
            `#${movie.title.replace(/\s+/g, "")}`,
            "#Cinema",
            "#MovieClips",
            ["#Epic", "#Viral", "#MustWatch"][Math.floor(Math.random() * 3)],
          ],
        }))

        setReels((prev) => [...prev, ...newReels])
      } catch (error) {
        console.error("Error loading more reels:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMoreReels()
  }, [])

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Auto advance to next reel
            setCurrentReelIndex((prevIndex) => (prevIndex + 1) % reels.length)
            return 0
          }
          return prev + 1
        })
      }, 150)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentReelIndex, reels.length])

  // Scroll handling for vertical navigation
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isScrolling = false
    let scrollTimeout: NodeJS.Timeout

    const handleScroll = () => {
      if (isScrolling) return

      const scrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      const newIndex = Math.round(scrollTop / containerHeight)

      if (newIndex !== currentReelIndex && newIndex >= 0 && newIndex < reels.length) {
        setCurrentReelIndex(newIndex)
        setProgress(0)
        setIsPlaying(true)
      }

      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        isScrolling = false
      }, 150)
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      isScrolling = true

      const delta = e.deltaY
      const containerHeight = container.clientHeight
      const targetScroll =
        delta > 0
          ? Math.min((currentReelIndex + 1) * containerHeight, (reels.length - 1) * containerHeight)
          : Math.max((currentReelIndex - 1) * containerHeight, 0)

      container.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      })
    }

    container.addEventListener("scroll", handleScroll)
    container.addEventListener("wheel", handleWheel, { passive: false })

    return () => {
      container.removeEventListener("scroll", handleScroll)
      container.removeEventListener("wheel", handleWheel)
      clearTimeout(scrollTimeout)
    }
  }, [currentReelIndex, reels.length])

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isUpSwipe = distance > 50
    const isDownSwipe = distance < -50

    if (isUpSwipe && currentReelIndex < reels.length - 1) {
      scrollToReel(currentReelIndex + 1)
    }
    if (isDownSwipe && currentReelIndex > 0) {
      scrollToReel(currentReelIndex - 1)
    }
  }

  const scrollToReel = (index: number) => {
    const container = containerRef.current
    if (!container) return

    const containerHeight = container.clientHeight
    container.scrollTo({
      top: index * containerHeight,
      behavior: "smooth",
    })
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && currentReelIndex > 0) {
        e.preventDefault()
        scrollToReel(currentReelIndex - 1)
      } else if (e.key === "ArrowDown" && currentReelIndex < reels.length - 1) {
        e.preventDefault()
        scrollToReel(currentReelIndex + 1)
      } else if (e.key === " ") {
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentReelIndex, reels.length])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      showNotification("info", "Playing Reel", `${currentReel.title}`)
    }
  }

  const toggleLike = () => {
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === currentReel.id
          ? {
              ...reel,
              isLiked: !reel.isLiked,
              likes: reel.isLiked ? reel.likes - 1 : reel.likes + 1,
            }
          : reel,
      ),
    )

    // Haptic feedback
    if ("vibrate" in navigator) {
      navigator.vibrate(50)
    }

    showNotification(
      "success",
      currentReel.isLiked ? "Removed from Favorites" : "Added to Favorites",
      currentReel.title,
    )
  }

  const toggleBookmark = () => {
    setReels((prev) =>
      prev.map((reel) => (reel.id === currentReel.id ? { ...reel, isBookmarked: !reel.isBookmarked } : reel)),
    )
    showNotification(
      "success",
      currentReel.isBookmarked ? "Removed from Saved" : "Saved to Collection",
      currentReel.title,
    )
  }

  const shareReel = () => {
    setReels((prev) => prev.map((reel) => (reel.id === currentReel.id ? { ...reel, shares: reel.shares + 1 } : reel)))
    showNotification("success", "Reel Shared", `Shared "${currentReel.title}"`)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Scrollable Reels Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: "smooth" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {reels.map((reel, index) => (
          <div key={reel.id} className="relative w-full h-screen snap-start flex-shrink-0">
            {/* Background Video/Image */}
            <div className="absolute inset-0">
              {reel.videoUrl ? (
                <iframe
                  src={`${reel.videoUrl}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=1&playlist=${reel.videoUrl
                    .split("/")
                    .pop()}`}
                  className="w-full h-full object-cover"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{ border: "none" }}
                />
              ) : (
                <img
                  src={reel.thumbnail || "/placeholder.svg"}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                />
              )}

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10" />
            </div>

            {/* Progress Bar - Only for current reel */}
            {index === currentReelIndex && (
              <div className="absolute top-4 left-4 right-4 z-20">
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 transition-all duration-100" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {/* Top User Info */}
            <div className="absolute top-12 left-4 right-20 z-20">
              <div className="flex items-center gap-3">
                <img
                  src={reel.userAvatar || "/placeholder.svg"}
                  alt={reel.username}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{reel.username}</p>
                  <p className="text-white/80 text-xs">
                    {reel.movieTitle} • {reel.year}
                  </p>
                </div>
                <button className="bg-transparent border border-white/50 text-white hover:bg-white/20 text-xs px-4 py-1 rounded-full transition-colors">
                  Follow
                </button>
              </div>
            </div>

            {/* Center Play Button - Only show when paused and is current reel */}
            {!isPlaying && index === currentReelIndex && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/70 transition-all"
                >
                  <Play className="h-8 w-8 text-white ml-1" />
                </button>
              </div>
            )}

            {/* Bottom Content */}
            <div className="absolute bottom-32 left-4 right-20 z-20">
              <div className="space-y-3">
                <h2 className="text-white font-bold text-lg leading-tight">{reel.title}</h2>
                <p className="text-white/90 text-sm leading-relaxed">{reel.description}</p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-2">
                  {reel.hashtags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-blue-300 text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Music/Audio Info */}
                <div className="flex items-center gap-2 bg-black/30 rounded-full px-3 py-1 backdrop-blur-sm w-fit">
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-white text-xs">Original Audio • {reel.movieTitle}</span>
                </div>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="absolute bottom-40 right-4 z-20 flex flex-col gap-6">
              {/* Like Button */}
              <button onClick={toggleLike} className="flex flex-col items-center gap-1 group">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    reel.isLiked ? "bg-red-500 scale-110" : "bg-black/30 backdrop-blur-sm group-hover:bg-black/50"
                  }`}
                >
                  <Heart className={`h-6 w-6 text-white ${reel.isLiked ? "fill-white" : ""}`} />
                </div>
                <span className="text-white text-xs font-medium">{formatNumber(reel.likes)}</span>
              </button>

              {/* Comment Button */}
              <button className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/50 transition-all">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <span className="text-white text-xs font-medium">{formatNumber(reel.comments)}</span>
              </button>

              {/* Share Button */}
              <button onClick={shareReel} className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/50 transition-all">
                  <Share className="h-6 w-6 text-white" />
                </div>
                <span className="text-white text-xs font-medium">{formatNumber(reel.shares)}</span>
              </button>

              {/* Bookmark Button */}
              <button onClick={toggleBookmark} className="flex flex-col items-center gap-1 group">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    reel.isBookmarked
                      ? "bg-yellow-500 scale-110"
                      : "bg-black/30 backdrop-blur-sm group-hover:bg-black/50"
                  }`}
                >
                  <Bookmark className={`h-6 w-6 text-white ${reel.isBookmarked ? "fill-white" : ""}`} />
                </div>
              </button>

              {/* More Options */}
              <button className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/50 transition-all">
                  <MoreHorizontal className="h-6 w-6 text-white" />
                </div>
              </button>

              {/* Volume Toggle */}
              <button onClick={() => setIsMuted(!isMuted)} className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/50 transition-all">
                  {isMuted ? <VolumeX className="h-6 w-6 text-white" /> : <Volume2 className="h-6 w-6 text-white" />}
                </div>
              </button>
            </div>

            {/* Reel Counter */}
            <div className="absolute top-12 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm z-20">
              {index + 1} / {reels.length}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicators */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 flex flex-col gap-1">
        {reels.slice(0, 8).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToReel(index)}
            className={`w-1 h-6 rounded-full transition-all ${
              index === currentReelIndex ? "bg-orange-500" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Bottom Safe Area */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />
    </div>
  )
}
