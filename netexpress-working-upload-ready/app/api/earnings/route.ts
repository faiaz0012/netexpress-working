import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, videoId, action, amount } = body

    // Validate required fields
    if (!userId || !videoId || !action || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Verify the user is authenticated
    // 2. Check if the action is valid (user actually watched/liked/subscribed)
    // 3. Prevent duplicate earnings for the same action
    // 4. Update user's balance in database
    // 5. Log the earning transaction

    const earning = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      videoId,
      action,
      amount: Number.parseFloat(amount),
      timestamp: new Date().toISOString(),
      status: "completed",
    }

    console.log("Earning recorded:", earning)

    return NextResponse.json(
      {
        message: "Earning recorded successfully",
        earning,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Earning recording error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Mock earnings data
    const earnings = [
      {
        id: 1,
        action: "Watched Video",
        title: "Amazing Travel Destinations 2025",
        amount: 0.25,
        time: "2 hours ago",
        type: "watch",
      },
      {
        id: 2,
        action: "Liked Video",
        title: "Cooking Masterclass: Italian Pasta",
        amount: 0.05,
        time: "3 hours ago",
        type: "like",
      },
      // Add more earnings...
    ]

    return NextResponse.json({
      earnings,
      totalEarnings: earnings.reduce((sum, earning) => sum + earning.amount, 0),
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch earnings" }, { status: 500 })
  }
}
