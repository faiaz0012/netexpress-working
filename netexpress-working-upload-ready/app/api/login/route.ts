import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Here you would typically:
    // 1. Find user by email
    // 2. Verify password hash
    // 3. Generate JWT token
    // 4. Set secure cookies

    // Simulate login validation
    if (email === "demo@example.com" && password === "password") {
      return NextResponse.json(
        {
          message: "Login successful",
          user: {
            id: "demo-user",
            firstName: "Demo",
            lastName: "User",
            email: email,
          },
        },
        { status: 200 },
      )
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
