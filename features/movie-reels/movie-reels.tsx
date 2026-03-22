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

// Famous movie scenes with real working YouTube videos
const famousMovieScenes: MovieReel[] = [
  {
    id: 1,
    title: "All Izz Well - 3 Idiots",
    movieTitle: "3 Idiots",
    description: "The most iconic scene from 3 Idiots! Aal Izz Well 😂🎓 #3Idiots #AamirKhan #Bollywood",
    duration: "2:30",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/K0eDlFX9GMc",
    mood: "Comedy",
    genre: "Comedy",
    rating: 9.8,
    year: 2009,
    likes: 4500000,
    comments: 120000,
    shares: 250000,
    isLiked: false,
    isBookmarked: false,
    username: "bollywood_comedy",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#3Idiots", "#AamirKhan", "#Bollywood", "#Comedy"],
  },
  {
    id: 2,
    title: "Baburao Comedy - Hera Pheri",
    movieTitle: "Hera Pheri",
    description: "Baburao ka phone scene - ek dum mast comedy! 😂📞 #HeraPheri #Paresh #Comedy",
    duration: "3:00",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/6x0YKVbSTjA",
    mood: "Hilarious",
    genre: "Comedy",
    rating: 9.9,
    year: 2000,
    likes: 6700000,
    comments: 234000,
    shares: 456000,
    isLiked: true,
    isBookmarked: true,
    username: "hera_pheri_clips",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#HeraPheri", "#Baburao", "#Paresh", "#Comedy"],
  },
  {
    id: 3,
    title: "Mr. Bean at the Dentist",
    movieTitle: "Mr. Bean",
    description: "Mr. Bean's funniest dentist scene ever! 😂🦷 #MrBean #Comedy #Funny",
    duration: "4:00",
    thumbnail: "https://images.unsplash.com/photo-1527736947477-2790e28f3443?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/eZbtAFq7dP8",
    mood: "Hilarious",
    genre: "Comedy",
    rating: 9.7,
    year: 1992,
    likes: 8900000,
    comments: 345000,
    shares: 567000,
    isLiked: false,
    isBookmarked: false,
    username: "mrbean_official",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#MrBean", "#Comedy", "#Funny", "#Classic"],
  },
  {
    id: 4,
    title: "Golmaal Comedy Scene",
    movieTitle: "Golmaal",
    description: "Golmaal ka superhit comedy scene! Paagal kahin ke 😂 #Golmaal #Ajay #Comedy",
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/Uc9V7eeO1LY",
    mood: "Comedy",
    genre: "Comedy",
    rating: 9.5,
    year: 2006,
    likes: 3400000,
    comments: 89000,
    shares: 123000,
    isLiked: true,
    isBookmarked: false,
    username: "golmaal_clips",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#Golmaal", "#AjayDevgn", "#Comedy", "#Bollywood"],
  },
  {
    id: 5,
    title: "Friends - Joey Doesn't Share Food",
    movieTitle: "Friends",
    description: "Joey doesn't share food! The most relatable scene ever 😂🍕 #Friends #Joey #Comedy",
    duration: "1:30",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/R-qS-7vGFwM",
    mood: "Funny",
    genre: "Comedy",
    rating: 9.6,
    year: 1994,
    likes: 12000000,
    comments: 456000,
    shares: 789000,
    isLiked: true,
    isBookmarked: true,
    username: "friends_clips",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#Friends", "#Joey", "#Comedy", "#FoodLover"],
  },
  {
    id: 6,
    title: "Andaz Apna Apna - Crime Master Gogo",
    movieTitle: "Andaz Apna Apna",
    description: "Crime Master Gogo - Main hoon Crime Master Gogo! 😂💪 #AndazApnaApna #Bollywood",
    duration: "2:00",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/mVVrK8jN0PM",
    mood: "Hilarious",
    genre: "Comedy",
    rating: 9.8,
    year: 1994,
    likes: 5600000,
    comments: 167000,
    shares: 234000,
    isLiked: false,
    isBookmarked: true,
    username: "classic_bollywood",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#AndazApnaApna", "#CrimeMasterGogo", "#Bollywood", "#Classic"],
  },
  {
    id: 7,
    title: "The Office - That's What She Said",
    movieTitle: "The Office",
    description: "Michael Scott's best moments compilation 😂👔 #TheOffice #MichaelScott #Comedy",
    duration: "3:30",
    thumbnail: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/3tHkFxn1VEw",
    mood: "Funny",
    genre: "Comedy",
    rating: 9.4,
    year: 2005,
    likes: 7800000,
    comments: 234000,
    shares: 456000,
    isLiked: true,
    isBookmarked: false,
    username: "office_clips",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#TheOffice", "#MichaelScott", "#Comedy", "#Funny"],
  },
  {
    id: 8,
    title: "Dhamaal - Junglee Hai Tu",
    movieTitle: "Dhamaal",
    description: "Dhamaal ka superhit comedy scene! Paagalpan at its best 😂 #Dhamaal #Comedy",
    duration: "2:15",
    thumbnail: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/Uc9V7eeO1LY",
    mood: "Crazy",
    genre: "Comedy",
    rating: 9.3,
    year: 2007,
    likes: 2300000,
    comments: 67000,
    shares: 89000,
    isLiked: false,
    isBookmarked: false,
    username: "dhamaal_clips",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#Dhamaal", "#Comedy", "#Bollywood", "#Funny"],
  },
  {
    id: 9,
    title: "Tom and Jerry - Classic Chase",
    movieTitle: "Tom and Jerry",
    description: "The most iconic cartoon comedy chase scene! 😂🐱🐭 #TomAndJerry #Comedy #Classic",
    duration: "2:00",
    thumbnail: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/AhTo3tQMZnY",
    mood: "Funny",
    genre: "Animation",
    rating: 9.9,
    year: 1940,
    likes: 15000000,
    comments: 567000,
    shares: 890000,
    isLiked: true,
    isBookmarked: true,
    username: "cartoon_classics",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#TomAndJerry", "#Comedy", "#Classic", "#Cartoon"],
  },
  {
    id: 10,
    title: "Munna Bhai MBBS - Circuit Comedy",
    movieTitle: "Munna Bhai MBBS",
    description: "Circuit aur Munna bhai ka best comedy scene 😂 #MunnaBhai #Circuit #Bollywood",
    duration: "2:30",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=800&fit=crop",
    videoUrl: "https://www.youtube.com/embed/K0eDlFX9GMc",
    mood: "Hilarious",
    genre: "Comedy",
    rating: 9.7,
    year: 2003,
    likes: 4500000,
    comments: 123000,
    shares: 234000,
    isLiked: false,
    isBookmarked: false,
    username: "munna_bhai_clips",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    hashtags: ["#MunnaBhai", "#Circuit", "#Bollywood", "#Comedy"],
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

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
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
      showNotification("info", "Playing Reel", currentReel.title)
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
    showNotification("success", "Reel Shared", "Shared " + currentReel.title)
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
                  src={reel.videoUrl + "?autoplay=" + (index === currentReelIndex ? "1" : "0") + "&mute=" + (isMuted ? "1" : "0") + "&controls=1&rel=0"}
                  className="w-full h-full"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
            </div>

            {/* Progress Bar */}
            {index === currentReelIndex && (
              <div className="absolute top-4 left-4 right-4 z-20">
                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500 transition-all duration-100" style={{ width: progress + "%" }} />
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
                  <p className="text-white/80 text-xs">{reel.movieTitle} • {reel.year}</p>
                </div>
                <button className="bg-transparent border border-white/50 text-white hover:bg-white/20 text-xs px-4 py-1 rounded-full transition-colors">
                  Follow
                </button>
              </div>
            </div>

            {/* Center Play Button */}
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
                    <span key={tagIndex} className="text-blue-300 text-sm font-medium">{tag}</span>
                  ))}
                </div>

                {/* Audio Info */}
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
              <button onClick={toggleLike} className="flex flex-col items-center gap-1 group">
                <div className={"w-12 h-12 rounded-full flex items-center justify-center transition-all " + (reel.isLiked ? "bg-red-500 scale-110" : "bg-black/30 backdrop-blur-sm group-hover:bg-black/50")}>
                  <Heart className={"h-6 w-6 text-white " + (reel.isLiked ? "fill-white" : "")} />
                </div>
                <span className="text-white text-xs font-medium">{formatNumber(reel.likes)}</span>
              </button>

              <button className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/50 transition-all">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <span className="text-white text-xs font-medium">{formatNumber(reel.comments)}</span>
              </button>

              <button onClick={shareReel} className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/50 transition-all">
                  <Share className="h-6 w-6 text-white" />
                </div>
                <span className="text-white text-xs font-medium">{formatNumber(reel.shares)}</span>
              </button>

              <button onClick={toggleBookmark} className="flex flex-col items-center gap-1 group">
                <div className={"w-12 h-12 rounded-full flex items-center justify-center transition-all " + (reel.isBookmarked ? "bg-yellow-500 scale-110" : "bg-black/30 backdrop-blur-sm group-hover:bg-black/50")}>
                  <Bookmark className={"h-6 w-6 text-white " + (reel.isBookmarked ? "fill-white" : "")} />
                </div>
              </button>

              <button className="flex flex-col items-center gap-1 group">
                <div className="w-12 h-12 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-black/50 transition-all">
                  <MoreHorizontal className="h-6 w-6 text-white" />
                </div>
              </button>

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
        {reels.slice(0, 10).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToReel(index)}
            className={"w-1 h-6 rounded-full transition-all " + (index === currentReelIndex ? "bg-orange-500" : "bg-white/30 hover:bg-white/50")}
          />
        ))}
      </div>

      {/* Bottom Safe Area */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />
    </div>
  )
}
