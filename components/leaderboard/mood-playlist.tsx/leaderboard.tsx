
"use client"

import { useState } from "react"
import { Trophy, Star, Film, TrendingUp, Medal, Crown } from "lucide-react"

const friends = [
  {
    rank: 1, name: "Rahul Sharma", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face",
    points: 4820, moviesWatched: 142, streak: 12, badge: "🎬 Cinephile", trend: "up",
    recentWatch: "Oppenheimer", mood: "Excited"
  },
  {
    rank: 2, name: "Priya Patel", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    points: 4210, moviesWatched: 128, streak: 8, badge: "🌟 Star Reviewer", trend: "up",
    recentWatch: "Dune Part 2", mood: "Happy"
  },
  {
    rank: 3, name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    points: 3950, moviesWatched: 115, streak: 5, badge: "🎭 Drama King", trend: "same",
    recentWatch: "Poor Things", mood: "Calm"
  },
  {
    rank: 4, name: "Anjali Singh", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
    points: 3400, moviesWatched: 98, streak: 3, badge: "🎪 Comedy Fan", trend: "down",
    recentWatch: "Barbie", mood: "Happy"
  },
  {
    rank: 5, name: "Vikram Das", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
    points: 2980, moviesWatched: 87, streak: 7, badge: "🚀 Sci-Fi Nerd", trend: "up",
    recentWatch: "Interstellar", mood: "Adventurous"
  },
  {
    rank: 6, name: "Neha Gupta", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
    points: 2540, moviesWatched: 74, streak: 2, badge: "💕 Romance Fan", trend: "up",
    recentWatch: "Bridgerton", mood: "Romantic"
  },
]

const challenges = [
  { title: "Weekend Binge", desc: "Watch 3 movies this weekend", reward: "+500 pts", progress: 2, total: 3, color: "bg-red-600" },
  { title: "Mood Explorer", desc: "Try 5 different mood categories", reward: "+300 pts", progress: 3, total: 5, color: "bg-purple-600" },
  { title: "Review Master", desc: "Rate 10 movies this week", reward: "+200 pts", progress: 7, total: 10, color: "bg-blue-600" },
]

export function Leaderboard() {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "challenges">("leaderboard")
  const myRank = 3

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-400" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-300" />
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />
    return <span className="text-gray-500 font-bold text-sm w-5 text-center">#{rank}</span>
  }

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-3 w-3 text-green-400" />
    if (trend === "down") return <TrendingUp className="h-3 w-3 text-red-400 rotate-180" />
    return <span className="text-gray-500 text-xs">—</span>
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-black mb-2">
          <span className="text-red-600">MOOD</span>
          <span className="text-white">BOARD</span>
        </h1>
        <p className="text-gray-400">Friends ke saath compete karo — sabse zyada movies dekho! 🏆</p>
      </div>

      {/* My Stats */}
      <div className="bg-gradient-to-r from-red-600/20 to-red-900/20 border border-red-600/30 rounded-2xl p-4 flex items-center gap-4">
        <div className="bg-amber-600 rounded-full p-2">
          <Medal className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-gray-400 text-sm">Tumhari rank</p>
          <p className="text-white font-bold text-lg">#{myRank} Alex Johnson</p>
        </div>
        <div className="text-right">
          <p className="text-red-400 font-bold text-xl">3,950</p>
          <p className="text-gray-500 text-xs">points</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-zinc-900 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab("leaderboard")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "leaderboard" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          🏆 Leaderboard
        </button>
        <button
          onClick={() => setActiveTab("challenges")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "challenges" ? "bg-red-600 text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          🎯 Challenges
        </button>
      </div>

      {activeTab === "leaderboard" ? (
        <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
          {friends.map((friend, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-4 border-b border-zinc-800/50 last:border-0 transition-colors
                ${friend.name === "Alex Johnson" ? "bg-red-600/10 border-l-2 border-l-red-600" : "hover:bg-zinc-800/50"}
              `}
            >
              {/* Rank */}
              <div className="w-6 flex justify-center">{getRankIcon(friend.rank)}</div>

              {/* Avatar */}
              <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700 flex-shrink-0" />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-semibold truncate ${friend.name === "Alex Johnson" ? "text-red-400" : "text-white"}`}>
                    {friend.name}
                  </p>
                  {getTrendIcon(friend.trend)}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-500">{friend.badge}</span>
                  <span className="text-xs text-gray-600">•</span>
                  <Film className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500">{friend.moviesWatched} movies</span>
                  <span className="text-xs text-gray-600">•</span>
                  <span className="text-xs text-orange-400">🔥 {friend.streak} day streak</span>
                </div>
              </div>

              {/* Points */}
              <div className="text-right">
                <p className="text-white font-bold">{friend.points.toLocaleString()}</p>
                <p className="text-gray-500 text-xs">points</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {challenges.map((challenge, i) => (
            <div key={i} className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-bold">{challenge.title}</h3>
                  <p className="text-gray-400 text-sm mt-0.5">{challenge.desc}</p>
                </div>
                <span className="bg-red-600/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full">
                  {challenge.reward}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-zinc-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${challenge.color} transition-all`}
                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                  />
                </div>
                <span className="text-gray-400 text-sm">{challenge.progress}/{challenge.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


