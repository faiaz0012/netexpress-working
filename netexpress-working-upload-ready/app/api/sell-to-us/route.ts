import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      itemName,
      category,
      condition,
      description,
      askingPrice,
      purchasePrice,
      purchaseDate,
      reason,
      email,
      phone,
      images,
    } = body

    // Validate required fields
    if (!itemName || !category || !condition || !description || !askingPrice || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate price
    const price = Number.parseFloat(askingPrice)
    if (isNaN(price) || price <= 0) {
      return NextResponse.json({ error: "Invalid asking price" }, { status: 400 })
    }

    // Create submission record
    const submission = {
      id: Math.random().toString(36).substr(2, 9),
      itemName,
      category,
      condition,
      description,
      askingPrice: price,
      purchasePrice: purchasePrice ? Number.parseFloat(purchasePrice) : null,
      purchaseDate: purchaseDate || null,
      reason: reason || null,
      email,
      phone: phone || null,
      images: images || [],
      status: "pending_review",
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      offerAmount: null,
      offerStatus: null,
    }

    // In a real app, you would:
    // 1. Save to database
    // 2. Send notification to admin team
    // 3. Send confirmation email to user
    // 4. Process images and store them

    console.log("Item submission received:", submission)

    return NextResponse.json(
      {
        message: "Item submission received successfully! We'll review it and get back to you within 24-48 hours.",
        submissionId: submission.id,
        estimatedReviewTime: "24-48 hours",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Sell-to-us submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email parameter is required" }, { status: 400 })
    }

    // Mock submissions data - in real app, fetch from database
    const submissions = [
      {
        id: "abc123",
        itemName: "iPhone 14 Pro Max",
        category: "Electronics",
        askingPrice: 899.99,
        status: "pending_review",
        submittedAt: "2025-01-20T10:00:00Z",
        offerAmount: null,
      },
      {
        id: "def456",
        itemName: "Gaming Laptop",
        category: "Electronics",
        askingPrice: 1299.99,
        status: "offer_made",
        submittedAt: "2025-01-18T14:30:00Z",
        offerAmount: 1100.0,
      },
    ]

    return NextResponse.json({
      submissions,
      total: submissions.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 })
  }
}
