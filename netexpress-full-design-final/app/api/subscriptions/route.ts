import { NextResponse } from "next/server"

// Mock subscription data
const subscriptions = [
  {
    id: 1,
    name: "Adobe Creative Suite",
    vendor: "Adobe Inc.",
    category: "Design Software",
    price: 52.99,
    period: "month",
    rating: 4.8,
    users: "10M+",
    features: ["Photoshop", "Illustrator", "Premiere Pro", "After Effects"],
    popular: true,
  },
  {
    id: 2,
    name: "Microsoft Office 365",
    vendor: "Microsoft",
    category: "Productivity",
    price: 12.5,
    period: "month",
    rating: 4.7,
    users: "300M+",
    features: ["Word", "Excel", "PowerPoint", "Teams"],
    popular: true,
  },
  // Add more subscriptions...
]

export async function GET() {
  try {
    return NextResponse.json({
      subscriptions,
      total: subscriptions.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, vendor, category, price, period, features } = body

    // Validate required fields
    if (!name || !vendor || !category || !price || !period) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new subscription
    const newSubscription = {
      id: subscriptions.length + 1,
      name,
      vendor,
      category,
      price: Number.parseFloat(price),
      period,
      features: features || [],
      rating: 0,
      users: "0",
      popular: false,
      createdAt: new Date().toISOString(),
    }

    subscriptions.push(newSubscription)

    return NextResponse.json(newSubscription, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create subscription" }, { status: 500 })
  }
}
