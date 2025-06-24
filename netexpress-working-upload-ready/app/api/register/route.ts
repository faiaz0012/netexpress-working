import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { referralId, firstName, lastName, email, phone, password } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Hash the password
    // 2. Check if email already exists
    // 3. Save to database
    // 4. Send welcome email
    // 5. Handle referral logic

    // Simulate database save
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      referralId,
      firstName,
      lastName,
      email,
      phone,
      createdAt: new Date().toISOString(),
      status: "active",
    }

    console.log("User registered:", userData)

    return NextResponse.json(
      {
        message: "Registration successful! Please complete account activation to start earning.",
        user: {
          id: userData.id,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          activated: false,
          activationRequired: true,
        },
        redirectTo: "/activation",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
