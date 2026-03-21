"use client"

import { useState, useEffect } from "react"
import { Mic, Search, Play, MicOff, Volume2, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useNotification } from "@/components/notification-provider"

const movieDatabase = [
  {
    id: 1,
    title: "The Jungle Book",
    tags: ["bear", "jungle", "animals", "mowgli", "disney", "adventure"],
    year: 2016,
    genre: "Adventure",
    rating: 7.4,
    image: "https://picsum.photos/200/300?random=20",
    description: "A man-cub raised by wolves must face his fears and the tiger Shere Khan.",
  },
  {
    id: 2,
    title: "Finding Nemo",
    tags: ["fish", "ocean", "clown", "lost", "father", "disney", "pixar"],
    year: 2003,
    genre: "Animation",
    rating: 8.2,
    image: "https://picsum.photos/200/300?random=21",
    description: "A clown fish searches the ocean for his missing son.",
  },
  {
    id: 3,
    title: "The Lion King",
    tags: ["lion", "africa", "simba", "king", "animals", "disney", "hakuna matata"],
    year: 1994,
    genre: "Animation",
    rating: 8.5,
    image: "https://picsum.photos/200/300?random=22",
    description: "A young lion prince flees his kingdom after his father's death.",
  },
  {
    id: 4,
    title: "Frozen",
    tags: ["ice", "snow", "princess", "elsa", "anna", "disney", "let it go"],
    year: 2013,
    genre: "Animation",
    rating: 7.4,
    image: "https://picsum.photos/200/300?random=23",
    description: "A fearless princess sets off on a journey to find her sister.",
  },
  {
    id: 5,
    title: "Toy Story",
    tags: ["toys", "buzz", "woody", "children", "adventure", "pixar", "cowboy"],
    year: 1995,
    genre: "Animation",
    rating: 8.3,
    image: "https://picsum.photos/200/300?random=24",
    description: "A cowboy doll is profoundly threatened by a new spaceman figure.",
  },
  {
    id: 6,
    title: "Spider-Man",
    tags: ["spider", "superhero", "web", "peter", "marvel", "new york"],
    year: 2002,
    genre: "Action",
    rating: 7.4,
    image: "https://picsum.photos/200/300?random=25",
    description: "A teenager gains spider-like abilities after being bitten by a radioactive spider.",
  },
  {
    id: 7,
    title: "The Dark Knight",
    tags: ["batman", "joker", "gotham", "superhero", "dark", "crime"],
    year: 2008,
    genre: "Action",
    rating: 9.0,
    image: "https://picsum.photos/200/300?random=26",
    description: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into anarchy.",
  },
  {
    id: 8,
    title: "Titanic",
    tags: ["ship", "love", "ocean", "disaster", "romance", "iceberg"],
    year: 1997,
    genre: "Romance",
    rating: 7.9,
    image: "https://picsum.photos/200/300?random=27",
    description: "A love story aboard the ill-fated maiden voyage of the RMS Titanic.",
  },
  {
    id: 9,
    title: "Harry Potter",
    tags: ["wizard", "magic", "hogwarts", "harry", "potter", "fantasy"],
    year: 2001,
    genre: "Fantasy",
    rating: 7.6,
    image: "https://picsum.photos/200/300?random=28",
    description: "A young wizard discovers his magical heritage on his 11th birthday.",
  },
  {
    id: 10,
    title: "Star Wars",
    tags: ["space", "jedi", "force", "lightsaber", "galaxy", "luke"],
    year: 1977,
    genre: "Sci-Fi",
    rating: 8.6,
    image: "https://picsum.photos/200/300?random=29",
    description: "A young farm boy joins the Rebellion to save the galaxy from the Empire.",
  },
]

const sampleQueries = [
  "that bear jungle movie",
  "fish movie with clown father",
  "ice princess movie with sisters",
  "toy movie with cowboy and spaceman",
  "spider superhero movie",
  "lion king africa movie",
  "wizard boy with glasses",
  "ship love story disaster",
  "space movie with lightsabers",
  "batman dark movie with joker",
]

export function VoiceRecall() {
  const [isListening, setIsListening] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof movieDatabase>([])
  const [voiceInput, setVoiceInput] = useState("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [selectedGenre, setSelectedGenre] = useState<string>("all")
  const [isProcessing, setIsProcessing] = useState(false)
  const { showNotification } = useNotification()

  const genres = ["all", "Animation", "Action", "Adventure", "Romance", "Fantasy", "Sci-Fi"]

  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery)
    } else {
      setSearchResults([])
    }
  }, [searchQuery, selectedGenre])

  const startListening = () => {
    setIsListening(true)
    setIsProcessing(true)
    showNotification("info", "Listening...", "Speak your movie description now")

    // Simulate voice recognition with realistic timing
    setTimeout(() => {
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)]
      setVoiceInput(randomQuery)
      setSearchQuery(randomQuery)
      setIsListening(false)
      setIsProcessing(false)

      // Add to search history
      setSearchHistory((prev) => [randomQuery, ...prev.slice(0, 4)])

      showNotification("success", "Voice Recognized", `Found: "${randomQuery}"`)
    }, 3000)
  }

  const stopListening = () => {
    setIsListening(false)
    setIsProcessing(false)
    showNotification("info", "Listening Stopped", "Voice recognition cancelled")
  }

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    const words = query
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 2)
    const results = movieDatabase.filter((movie) => {
      const matchesGenre = selectedGenre === "all" || movie.genre === selectedGenre
      const matchesQuery = words.some(
        (word) =>
          movie.title.toLowerCase().includes(word) ||
          movie.tags.some((tag) => tag.toLowerCase().includes(word)) ||
          movie.genre.toLowerCase().includes(word) ||
          movie.description.toLowerCase().includes(word),
      )
      return matchesGenre && matchesQuery
    })

    // Sort by relevance (number of matching words)
    results.sort((a, b) => {
      const aMatches = words.filter(
        (word) =>
          a.title.toLowerCase().includes(word) ||
          a.tags.some((tag) => tag.toLowerCase().includes(word)) ||
          a.description.toLowerCase().includes(word),
      ).length
      const bMatches = words.filter(
        (word) =>
          b.title.toLowerCase().includes(word) ||
          b.tags.some((tag) => tag.toLowerCase().includes(word)) ||
          b.description.toLowerCase().includes(word),
      ).length
      return bMatches - aMatches
    })

    setSearchResults(results)
  }

  const handleExampleQuery = (query: string) => {
    setSearchQuery(query)
    setVoiceInput(query)
    setSearchHistory((prev) => [query, ...prev.slice(0, 4)])
    showNotification("info", "Example Selected", `Searching for: "${query}"`)
  }

  const playMovie = (movie: (typeof movieDatabase)[0]) => {
    showNotification("success", "Now Playing", `Starting ${movie.title} (${movie.year})`)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setVoiceInput("")
    setSearchResults([])
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <Mic className="h-10 w-10 text-yellow-400" />
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Fuzzy Voice Movie Recall
          </span>
        </h1>
        <p className="text-slate-400 text-lg">Describe a movie with vague terms and let AI find the exact match</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Voice Input */}
        <div className="lg:col-span-1 space-y-6">
          {/* Voice Input */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Voice Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <div
                  className={`
                  w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer
                  ${
                    isListening
                      ? "bg-red-500/20 border-4 border-red-500 animate-pulse scale-110"
                      : "bg-slate-700 border-2 border-slate-600 hover:border-slate-500 hover:scale-105"
                  }
                `}
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? (
                    <div className="text-center">
                      <Mic className="h-12 w-12 text-red-400 mx-auto mb-2 animate-pulse" />
                      <p className="text-xs text-red-400">Listening...</p>
                    </div>
                  ) : (
                    <Mic className="h-12 w-12 text-slate-400" />
                  )}
                </div>
              </div>

              {voiceInput && (
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium">You said:</p>
                  <p className="text-white font-medium mt-1">"{voiceInput}"</p>
                </div>
              )}

              <div className="text-center space-y-3">
                {!isListening ? (
                  <Button
                    onClick={startListening}
                    className="bg-orange-500 hover:bg-orange-600 w-full"
                    size="lg"
                    disabled={isProcessing}
                  >
                    <Mic className="mr-2 h-5 w-5" />
                    {isProcessing ? "Processing..." : "Start Voice Search"}
                  </Button>
                ) : (
                  <Button onClick={stopListening} variant="destructive" size="lg" className="w-full">
                    <MicOff className="mr-2 h-5 w-5" />
                    Stop Listening
                  </Button>
                )}

                <div className="text-xs text-slate-500">
                  {isListening ? "Speak clearly into your microphone" : "Click to start voice recognition"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Text Search */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Text Search
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your movie description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                />
                {searchQuery && (
                  <Button onClick={clearSearch} variant="outline" size="sm">
                    Clear
                  </Button>
                )}
              </div>

              {/* Genre Filter */}
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Filter by Genre:</label>
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white"
                >
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre === "all" ? "All Genres" : genre}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Searches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {searchHistory.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleQuery(query)}
                      className="w-full p-2 bg-slate-700 hover:bg-slate-600 rounded text-left text-sm text-slate-300 transition-colors"
                    >
                      "{query}"
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Results */}
          {searchResults.length > 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search Results
                  </span>
                  <span className="text-sm text-slate-400">{searchResults.length} found</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((movie, index) => (
                    <div
                      key={movie.id}
                      className="bg-slate-700 rounded-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => playMovie(movie)}
                    >
                      <div className="flex">
                        <div className="w-24 h-36 relative">
                          <img
                            src={movie.image || "/placeholder.svg"}
                            alt={movie.title}
                            className="w-full h-full object-cover"
                          />
                          {index === 0 && (
                            <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                              Best Match
                            </div>
                          )}
                        </div>
                        <div className="flex-1 p-3">
                          <h3 className="font-semibold text-white mb-1">{movie.title}</h3>
                          <p className="text-sm text-slate-400 mb-2">
                            {movie.year} • {movie.genre}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-yellow-400 text-sm">{movie.rating}</span>
                          </div>
                          <p className="text-xs text-slate-500 mb-2 line-clamp-2">{movie.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {movie.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-3 pt-0">
                        <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                          <Play className="h-4 w-4 mr-1" />
                          Watch Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Example Queries */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>Try These Example Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sampleQueries.map((example) => (
                  <button
                    key={example}
                    onClick={() => handleExampleQuery(example)}
                    className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-left transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-white font-medium">"{example}"</p>
                      <Mic className="h-4 w-4 text-slate-400 group-hover:text-orange-400 transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* How It Works */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle>How Voice Movie Recall Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mic className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="font-medium text-white mb-2">1. Speak</h3>
                  <p className="text-sm text-slate-400">Describe the movie using any words you remember</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="font-medium text-white mb-2">2. AI Analyzes</h3>
                  <p className="text-sm text-slate-400">Our AI matches your description to our movie database</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Play className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="font-medium text-white mb-2">3. Watch</h3>
                  <p className="text-sm text-slate-400">Get exact matches ranked by relevance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
