"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bell,
  DollarSign,
  Clock,
  Eye,
  CheckCircle,
  Gift,
} from "lucide-react"

// Mock video data
const videoData = {
  id: 1,
  title: "Amazing Travel Destinations 2025",
  channel: "Travel Explorer",
  channelAvatar: "/placeholder.svg?height=50&width=50",
  subscribers: "2.5M",
  description:
    "Discover the most breathtaking travel destinations for 2025. From hidden gems to popular hotspots, this comprehensive guide will inspire your next adventure. We'll explore stunning landscapes, cultural experiences, and budget-friendly options for every type of traveler.",
  videoUrl: "/placeholder.svg?height=400&width=700", // In real app, this would be a video URL
  duration: 330, // 5:30 in seconds
  views: "125K",
  likes: 3200,
  dislikes: 45,
  uploadDate: "2025-01-15",
  category: "Travel",
  tags: ["travel", "destinations", "2025", "vacation", "adventure"],
  earnings: {
    watch: 0.25,
    like: 0.05,
    subscribe: 0.25,
    share: 0.1,
  },
}

export default function WatchVideoPage({ params }: { params: { id: string } }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [watchProgress, setWatchProgress] = useState(0)
  const [earnedAmount, setEarnedAmount] = useState(0)
  const [completedActions, setCompletedActions] = useState({
    watched: false,
    liked: false,
    subscribed: false,
    shared: false,
  })

  // Simulate video progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1
          const progress = (newTime / videoData.duration) * 100
          setWatchProgress(progress)

          // Award watching bonus when 80% complete
          if (progress >= 80 && !completedActions.watched) {
            setCompletedActions((prev) => ({ ...prev, watched: true }))
            setEarnedAmount((prev) => prev + videoData.earnings.watch)
          }

          return newTime >= videoData.duration ? videoData.duration : newTime
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, completedActions.watched])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleLike = () => {
    if (!isLiked && !completedActions.liked) {
      setIsLiked(true)
      setIsDisliked(false)
      setCompletedActions((prev) => ({ ...prev, liked: true }))
      setEarnedAmount((prev) => prev + videoData.earnings.like)
    }
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    setIsLiked(false)
  }

  const handleSubscribe = () => {
    if (!isSubscribed && !completedActions.subscribed) {
      setIsSubscribed(true)
      setCompletedActions((prev) => ({ ...prev, subscribed: true }))
      setEarnedAmount((prev) => prev + videoData.earnings.subscribe)
    }
  }

  const handleShare = () => {
    if (!completedActions.shared) {
      setCompletedActions((prev) => ({ ...prev, shared: true }))
      setEarnedAmount((prev) => prev + videoData.earnings.share)
      alert("Video shared! You earned $" + videoData.earnings.share.toFixed(2))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-bold text-purple-600">EarnWatch</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-green-700">Earned: ${earnedAmount.toFixed(2)}</span>
              </div>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Video Section */}
          <div className="lg:col-span-3">
            {/* Video Player */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="relative bg-black rounded-t-lg">
                  <img
                    src={videoData.videoUrl || "/placeholder.svg"}
                    alt={videoData.title}
                    className="w-full h-96 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/50"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Progress value={watchProgress} className="h-2 bg-white/20" />
                    <div className="flex justify-between text-white text-sm mt-2">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(videoData.duration)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{videoData.title}</h1>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={videoData.channelAvatar || "/placeholder.svg"}
                        alt={videoData.channel}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{videoData.channel}</h3>
                        <p className="text-sm text-gray-600">{videoData.subscribers} subscribers</p>
                      </div>
                      <Button
                        onClick={handleSubscribe}
                        className={`${
                          isSubscribed ? "bg-gray-500" : "bg-red-600 hover:bg-red-700"
                        } text-white flex items-center`}
                        disabled={isSubscribed}
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        {isSubscribed ? "Subscribed" : "Subscribe"}
                        {!isSubscribed && <span className="ml-2 text-xs">(+${videoData.earnings.subscribe})</span>}
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        onClick={handleLike}
                        className={`flex items-center ${isLiked ? "bg-blue-50 border-blue-500" : ""}`}
                      >
                        <ThumbsUp className={`w-4 h-4 mr-2 ${isLiked ? "text-blue-600" : ""}`} />
                        {videoData.likes + (isLiked ? 1 : 0)}
                        {!completedActions.liked && <span className="ml-2 text-xs">(+${videoData.earnings.like})</span>}
                      </Button>

                      <Button variant="outline" onClick={handleDislike} className="flex items-center">
                        <ThumbsDown className={`w-4 h-4 mr-2 ${isDisliked ? "text-red-600" : ""}`} />
                        {videoData.dislikes + (isDisliked ? 1 : 0)}
                      </Button>

                      <Button variant="outline" onClick={handleShare} className="flex items-center">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                        {!completedActions.shared && (
                          <span className="ml-2 text-xs">(+${videoData.earnings.share})</span>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {videoData.views} views
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(videoData.uploadDate).toLocaleDateString()}
                    </div>
                    <Badge>{videoData.category}</Badge>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 leading-relaxed">{videoData.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {videoData.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Earnings Tracker */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Earnings Tracker
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle
                        className={`w-5 h-5 mr-2 ${completedActions.watched ? "text-green-600" : "text-gray-400"}`}
                      />
                      <span className="text-sm">Watch 80% of video</span>
                    </div>
                    <span className="text-sm font-medium">${videoData.earnings.watch}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle
                        className={`w-5 h-5 mr-2 ${completedActions.liked ? "text-green-600" : "text-gray-400"}`}
                      />
                      <span className="text-sm">Like the video</span>
                    </div>
                    <span className="text-sm font-medium">${videoData.earnings.like}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle
                        className={`w-5 h-5 mr-2 ${completedActions.subscribed ? "text-green-600" : "text-gray-400"}`}
                      />
                      <span className="text-sm">Subscribe to channel</span>
                    </div>
                    <span className="text-sm font-medium">${videoData.earnings.subscribe}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle
                        className={`w-5 h-5 mr-2 ${completedActions.shared ? "text-green-600" : "text-gray-400"}`}
                      />
                      <span className="text-sm">Share the video</span>
                    </div>
                    <span className="text-sm font-medium">${videoData.earnings.share}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total Earned:</span>
                      <span className="text-green-600">${earnedAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Watch Progress */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Watch Progress</h3>
                <div className="space-y-3">
                  <Progress value={watchProgress} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{watchProgress.toFixed(0)}% Complete</span>
                    <span>{watchProgress >= 80 ? "Bonus Unlocked!" : "Watch 80% to earn"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Bonus */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Gift className="w-5 h-5 mr-2 text-purple-600" />
                  Daily Bonus
                </h3>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">$2.50</div>
                  <p className="text-sm text-gray-600 mb-4">Watch 5 more videos to unlock your daily bonus!</p>
                  <Progress value={40} className="h-2 mb-2" />
                  <p className="text-xs text-gray-500">2 of 5 videos watched today</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
