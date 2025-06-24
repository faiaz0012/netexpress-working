import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    // Mock jobs data
    const jobs = [
      {
        id: 1,
        category: "gmail-creation",
        title: "Create 10 Gmail Accounts - Bulk Order",
        description: "Need 10 fresh Gmail accounts with phone verification. Must be created from different IPs.",
        rate: 4.0,
        quantity: 10,
        totalPay: 40.0,
        deadline: "24 hours",
        requirements: ["Phone verification required", "Different IP for each account", "Complete profile setup"],
        status: "available",
        difficulty: "Easy",
        postedAt: new Date().toISOString(),
      },
      {
        id: 2,
        category: "social-accounts",
        title: "Instagram Business Accounts",
        description: "Create Instagram business accounts with complete profiles and verification.",
        rate: 6.0,
        quantity: 5,
        totalPay: 30.0,
        deadline: "48 hours",
        requirements: ["Business category setup", "Profile photo", "Bio completion"],
        status: "available",
        difficulty: "Medium",
        postedAt: new Date().toISOString(),
      },
      {
        id: 3,
        category: "data-entry",
        title: "Product Data Entry - 100 Items",
        description: "Enter product information from images into spreadsheet format.",
        rate: 1.5,
        quantity: 100,
        totalPay: 150.0,
        deadline: "3 days",
        requirements: ["Accuracy required", "Excel/Google Sheets", "English proficiency"],
        status: "available",
        difficulty: "Easy",
        postedAt: new Date().toISOString(),
      },
    ]

    let filteredJobs = jobs
    if (category) {
      filteredJobs = jobs.filter((job) => job.category === category)
    }

    return NextResponse.json({
      jobs: filteredJobs,
      total: filteredJobs.length,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { jobId, experience, availability, tools, email, phone, additionalInfo } = body

    // Validate required fields
    if (!jobId || !email || !availability) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Create application record
    const application = {
      id: Math.random().toString(36).substr(2, 9),
      jobId: Number.parseInt(jobId),
      experience: experience || "",
      availability,
      tools: tools || "",
      email,
      phone: phone || null,
      additionalInfo: additionalInfo || "",
      status: "pending_review",
      appliedAt: new Date().toISOString(),
      reviewedAt: null,
    }

    // In a real app, you would:
    // 1. Save to database
    // 2. Send notification to admin
    // 3. Send confirmation email to applicant
    // 4. Check for duplicate applications

    console.log("Job application received:", application)

    return NextResponse.json(
      {
        message: "Application submitted successfully! We'll review it and contact you within 24 hours.",
        applicationId: application.id,
        estimatedReviewTime: "24 hours",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Job application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
