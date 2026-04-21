
"use client"

import { useState } from "react"
import { Play, Music, Heart, SkipForward, Shuffle, Volume2 } from "lucide-react"

const moodPlaylists = {
  Happy: {
    emoji: "😊",
    color: "from-yellow-500 to-orange-500",
    songs: [
      { title: "Kesariya", artist: "Arijit Singh", duration: "4:28", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop" },
      { title: "Apna Bana Le", artist: "Arijit Singh", duration: "3:45", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop" },
      { title: "Tum Hi Ho", artist: "Arijit Singh", duration: "4:12", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop" },
      { title: "Ik Vaari Aa", artist: "Arijit Singh", duration: "5:01", img: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=60&h=60&fit=crop" },
      { title: "Channa Mereya", artist: "Arijit Singh", duration: "4:49", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop" },
    ]
  },
  Sad: {
    emoji: "😢",
    color: "from-blue-500 to-indigo-600",
    songs: [
      { title: "Agar Tum Saath Ho", artist: "Arijit Singh", duration: "5:42", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop" },
      { title: "Phir Le Aya Dil", artist: "Arijit Singh", duration: "4:33", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop" },
      { title: "Hamari Adhuri Kahani", artist: "Arijit Singh", duration: "4:15", img: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=60&h=60&fit=crop" },
      { title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", duration: "4:28", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop" },
    ]
  },
  Excited: {
    emoji: "🤩",
    color: "from-red-500 to-pink-500",
    songs: [
      { title: "Balam Pichkari", artist: "Vishal Shekhar", duration: "3:58", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop" },
      { title: "Malang", artist: "Arijit Singh", duration: "3:45", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop" },
      { title: "Gallan Goodiyaan", artist: "Various", duration: "4:22", img: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=60&h=60&fit=crop" },
      { title: "Badtameez Dil", artist: "Vishal Shekhar", duration: "3:37", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop" },
    ]
  },
  Calm: {
    emoji: "😌",
    color: "from-green-500 to-teal-500",
    songs: [
      { title: "Kun Faya Kun", artist: "A.R. Rahman", duration: "7:52", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop" },
      { title: "Iktara", artist: "Amit Trivedi", duration: "3:28", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop" },
      { title: "Tum Se Hi", artist: "Mohit Chauhan", duration: "4:18", img: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=60&h=60&fit=crop" },
      { title: "Dil Dhadakne Do", artist: "Priyanka Chopra", duration: "4:05", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop" },
    ]
  },
  Angry: {
    emoji: "😠",
    color: "from-orange-500 to-red-600",
    songs: [
      { title: "Zinda", artist: "Siddharth Mahadevan", duration: "3:52", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop" },
      { title: "Kar Har Maidaan Fateh", artist: "Sukhwinder Singh", duration: "4:18", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop" },
      { title: "Jai Ho", artist: "A.R. Rahman", duration: "5:42", img: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=60&h=60&fit=crop" },
    ]
  },
  Romantic: {
    emoji: "😍",
    color: "from-pink-500 to-rose-500",
    songs: [
      { title: "Tere Bina", artist: "Guru Randhawa", duration: "3:45", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop" },
      { title: "Raabta", artist: "Arijit Singh", duration: "4:12", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop" },
      { title: "Tera Ban Jaunga", artist: "Akhil Sachdeva", duration: "3:58", img: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=60&h=60&fit=crop" },
      { title: "Pehli Baar", artist: "Darshan Raval", duration: "4:22", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=60&h=60&fit=crop" },
    ]
  },
  Tired: {
    emoji: "😴",
    color: "from-purple-500 to-indigo-500",
    songs: [
      { title: "Luka Chuppi", artist: "A.R. Rahman", duration: "5:22", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop" },
      { title: "Sooraj Ki Baahon Mein", artist: "Shafqat Amanat Ali", duration: "4:44", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop" },
      { title: "O Re Piya", artist: "Rahat Fateh Ali Khan", duration: "5:10", img: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=60&h=60&fit=crop" },
    ]
  },
  Adventurous: {
    emoji: "🤠",
    color: "from-amber-500 to-orange-600",
    songs: [
      { title: "Chaiyya Chaiyya", artist: "Sukhwinder Singh", duration: "6:42", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop" },
      { title: "Rang De Basanti", artist: "A.R. Rahman", duration: "4:28", img: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=60&h=60&fit=crop" },
      { title: "Jai Ho", artist: "A.R. Rahman", duration: "5:42", img: "https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?w=60&h=60&fit=crop" },
    ]
  },
}

const moodKeys = Object.keys(moodPlaylists) as Array<keyof typeof moodPlaylists>

export function MoodPlaylist() {
  const [selectedMood, setSelectedMood] = useState<keyof typeof moodPlaylists>("Happy")
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [liked, setLiked] = useState<Set<number>>(new Set())

  const playlist = moodPlaylists[selectedMood]

  const togglePlay = (index: number) => {
    setPlayingIndex(playingIndex === index ? null : index)
  }

  const toggleLike = (index: number) => {
    setLiked(prev => {
      const newSet = new Set(prev)
      newSet.has(index) ? newSet.delete(index) : newSet.add(index)
      return newSet
    })
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-black mb-2">
          <span className="text-red-600">MOOD</span>
          <span className="text-white">TUNES</span>
        </h1>
        <p className="text-gray-400">Apna mood choose karo — playlist ready hai 🎵</p>
      </div>

      {/* Mood Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {moodKeys.map((mood) => (
          <button
            key={mood}
            onClick={() => { setSelectedMood(mood); setPlayingIndex(null) }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              selectedMood === mood
                ? "bg-red-600 text-white scale-105 shadow-lg shadow-red-600/30"
                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
            }`}
          >
            {moodPlaylists[mood].emoji} {mood}
          </button>
        ))}
      </div>

      {/* Now Playing Banner */}
      <div className={`rounded-2xl bg-gradient-to-r ${playlist.color} p-6 flex items-center justify-between`}>
        <div>
          <p className="text-white/70 text-sm mb-1">Playlist for your mood</p>
          <h2 className="text-white text-2xl font-bold">{selectedMood} Vibes {playlist.emoji}</h2>
          <p className="text-white/70 text-sm mt-1">{playlist.songs.length} songs</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white text-black px-5 py-2 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-all">
            <Play className="h-4 w-4 fill-black" /> Play All
          </button>
          <button className="bg-white/20 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-white/30 transition-all">
            <Shuffle className="h-4 w-4" /> Shuffle
          </button>
        </div>
      </div>

      {/* Song List */}
      <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
        {playlist.songs.map((song, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 p-4 hover:bg-zinc-800 transition-colors cursor-pointer border-b border-zinc-800/50 last:border-0 ${
              playingIndex === index ? "bg-zinc-800" : ""
            }`}
          >
            {/* Index / Play */}
            <div className="w-8 text-center flex-shrink-0" onClick={() => togglePlay(index)}>
              {playingIndex === index ? (
                <Volume2 className="h-4 w-4 text-red-500 animate-pulse mx-auto" />
              ) : (
                <span className="text-gray-500 text-sm group-hover:hidden">{index + 1}</span>
              )}
            </div>

            {/* Thumbnail */}
            <img src={song.img} alt={song.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className={`font-medium truncate ${playingIndex === index ? "text-red-400" : "text-white"}`}>
                {song.title}
              </p>
              <p className="text-gray-500 text-sm truncate">{song.artist}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button onClick={() => toggleLike(index)}>
                <Heart className={`h-4 w-4 transition-colors ${liked.has(index) ? "text-red-500 fill-red-500" : "text-gray-500 hover:text-red-400"}`} />
              </button>
              <span className="text-gray-500 text-sm">{song.duration}</span>
              <button onClick={() => togglePlay(index)} className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-all">
                {playingIndex === index
                  ? <SkipForward className="h-3 w-3" />
                  : <Play className="h-3 w-3 fill-white" />
                }
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
