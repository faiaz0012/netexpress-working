import { NextResponse } from "next/server"

// Mock content data
const contentData = {
  pages: [
    {
      id: 1,
      title: "Home Page",
      slug: "/",
      content: "Welcome to EarnWatch - the best platform to earn money online",
      status: "published",
      lastModified: "2025-01-20T10:00:00Z",
    },
    {
      id: 2,
      title: "About Us",
      slug: "/about",
      content: "Learn more about EarnWatch and our mission to help people earn money online",
      status: "published",
      lastModified: "2025-01-19T15:30:00Z",
    },
    {
      id: 3,
      title: "Terms of Service",
      slug: "/terms",
      content: "Terms and conditions for using EarnWatch platform",
      status: "draft",
      lastModified: "2025-01-18T09:15:00Z",
    },
  ],
  announcements: [
    {
      id: 1,
      title: "New Feature: Online Work",
      content: "We've added new online work opportunities including Gmail account creation!",
      type: "feature",
      active: true,
      startDate: "2025-01-20",
      endDate: "2025-02-20",
    },
    {
      id: 2,
      title: "Maintenance Notice",
      content: "Scheduled maintenance on Sunday 2 AM - 4 AM EST",
      type: "maintenance",
      active: false,
      startDate: "2025-01-25",
      endDate: "2025-01-25",
    },
  ],
  faqs: [
    {
      id: 1,
      question: "How do I start earning money?",
      answer: "Simply sign up, activate your account for $2.99, and start watching videos or completing online work!",
      category: "getting-started",
      order: 1,
    },
    {
      id: 2,
      question: "What is the minimum withdrawal amount?",
      answer: "The minimum withdrawal amount is $25.00 with a $1.99 processing fee.",
      category: "payments",
      order: 2,
    },
    {
      id: 3,
      question: "How long does it take to get paid?",
      answer: "Withdrawals are processed within 24-48 hours after approval.",
      category: "payments",
      order: 3,
    },
  ],
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") // pages, announcements, faqs

    if (type && contentData[type as keyof typeof contentData]) {
      return NextResponse.json({
        data: contentData[type as keyof typeof contentData],
        total: (contentData[type as keyof typeof contentData] as any[]).length,
      })
    }

    return NextResponse.json({
      data: contentData,
      message: "Content data retrieved successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch content data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, data } = body

    // Validate type
    if (!["pages", "announcements", "faqs"].includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    // Create new content item
    const newItem = {
      id: Math.max(...(contentData[type as keyof typeof contentData] as any[]).map((item: any) => item.id)) + 1,
      ...data,
      lastModified: new Date().toISOString(),
    }
    ;(contentData[type as keyof typeof contentData] as any[]).push(newItem)

    console.log(`New ${type} item created:`, newItem)

    return NextResponse.json(
      {
        message: `${type} item created successfully`,
        data: newItem,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Content creation error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { type, id, data } = body

    // Validate type
    if (!["pages", "announcements", "faqs"].includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    // Find and update item
    const items = contentData[type as keyof typeof contentData] as any[]
    const itemIndex = items.findIndex((item: any) => item.id === id)

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Content item not found" }, { status: 404 })
    }

    items[itemIndex] = {
      ...items[itemIndex],
      ...data,
      lastModified: new Date().toISOString(),
    }

    console.log(`${type} item updated:`, items[itemIndex])

    return NextResponse.json(
      {
        message: `${type} item updated successfully`,
        data: items[itemIndex],
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Content update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const id = searchParams.get("id")

    if (!type || !id) {
      return NextResponse.json({ error: "Type and ID are required" }, { status: 400 })
    }

    // Validate type
    if (!["pages", "announcements", "faqs"].includes(type)) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    // Find and remove item
    const items = contentData[type as keyof typeof contentData] as any[]
    const itemIndex = items.findIndex((item: any) => item.id === Number.parseInt(id))

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Content item not found" }, { status: 404 })
    }

    const deletedItem = items.splice(itemIndex, 1)[0]

    console.log(`${type} item deleted:`, deletedItem)

    return NextResponse.json(
      {
        message: `${type} item deleted successfully`,
        data: deletedItem,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Content deletion error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
