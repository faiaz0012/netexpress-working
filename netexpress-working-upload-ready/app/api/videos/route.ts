import { NextResponse } from "next/server"

// Mock video data
const videos = [
  {
    id: 1,
    title: "Amazing Travel Destinations 2025",
    channel: "Travel Explorer",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "5:30",
    views: "125K",
    likes: "3.2K",
    earnings: 0.25,
    category: "Travel",
    description: "Discover the most beautiful travel destinations for 2025",
    isSubscribed: false,
    channelAvatar: "/placeholder.svg?height=40&width=40",
    uploadDate: "2025-01-15",
    tags: ["travel", "destinations", "2025", "vacation"],
  },
  {
    id: 2,
    title: "Cooking Masterclass: Italian Pasta",
    channel: "Chef's Kitchen",
    thumbnail: "/placeholder.svg?height=200&width=300",
    duration: "8:45",
    views: "89K",
    likes: "2.1K",
    earnings: 0.35,
    category: "Cooking",
    description: "Learn to make authentic Italian pasta from scratch",
    isSubscribed: true,
    channelAvatar: "/placeholder.svg?height=40&width=40",
    uploadDate: "2025-01-14",
    tags: ["cooking", "pasta", "italian", "recipe"],
  },
  // Add more videos as needed
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let filteredVideos = videos

    if (category && category !== "All") {
      filteredVideos = filteredVideos.filter((video) => video.category === category)
    }

    if (search) {
      filteredVideos = filteredVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(search.toLowerCase()) ||
          video.channel.toLowerCase().includes(search.toLowerCase()) ||
          video.category.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return NextResponse.json({
      videos: filteredVideos,
      total: filteredVideos.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}
