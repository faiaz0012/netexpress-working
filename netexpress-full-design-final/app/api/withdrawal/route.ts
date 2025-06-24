import { NextResponse } from "next/server"

// Mock exchange rates (in real app, fetch from API)
const exchangeRates = {
  USD_TO_BDT: 110,
  BDT_TO_USD: 0.0091,
}

// Mock withdrawal data
const withdrawalHistory = [
  {
    id: 1,
    userId: "user123",
    amount: 2750, // BDT
    currency: "BDT",
    method: "bkash",
    methodDetails: { bkash_number: "01712345678" },
    fee: 30,
    netAmount: 2720,
    status: "completed",
    requestDate: "2025-01-20T10:00:00Z",
    processedDate: "2025-01-20T11:30:00Z",
    transactionId: "BKS123456789",
  },
  {
    id: 2,
    userId: "user123",
    amount: 50, // USD
    currency: "USD",
    method: "paypal",
    methodDetails: { paypal_email: "user@example.com" },
    fee: 1.99,
    netAmount: 48.01,
    status: "pending",
    requestDate: "2025-01-19T15:30:00Z",
    processedDate: null,
    transactionId: null,
  },
]

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, amount, currency, method, methodDetails } = body

    // Validate required fields
    if (!userId || !amount || !currency || !method || !methodDetails) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate amount
    const withdrawalAmount = Number.parseFloat(amount)
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 0) {
      return NextResponse.json({ error: "Invalid withdrawal amount" }, { status: 400 })
    }

    // Validate minimum amounts
    const minAmounts = {
      bkash: { amount: 500, currency: "BDT" },
      nagad: { amount: 500, currency: "BDT" },
      rocket: { amount: 500, currency: "BDT" },
      bank: { amount: 1000, currency: "BDT" },
      paypal: { amount: 25, currency: "USD" },
    }

    const minAmount = minAmounts[method as keyof typeof minAmounts]
    if (minAmount && withdrawalAmount < minAmount.amount) {
      return NextResponse.json(
        { error: `Minimum withdrawal amount for ${method} is ${minAmount.amount} ${minAmount.currency}` },
        { status: 400 },
      )
    }

    // Calculate fees
    const fees = {
      bkash: 30, // BDT
      nagad: 25, // BDT
      rocket: 35, // BDT
      bank: 50, // BDT
      paypal: 1.99, // USD
    }

    const fee = fees[method as keyof typeof fees] || 0
    const netAmount = withdrawalAmount - fee

    // Validate method-specific details
    if (method === "bkash" && !methodDetails.bkash_number) {
      return NextResponse.json({ error: "bKash number is required" }, { status: 400 })
    }

    if (method === "nagad" && !methodDetails.nagad_number) {
      return NextResponse.json({ error: "Nagad number is required" }, { status: 400 })
    }

    if (method === "rocket" && !methodDetails.rocket_number) {
      return NextResponse.json({ error: "Rocket number is required" }, { status: 400 })
    }

    if (method === "bank") {
      if (!methodDetails.bank_name || !methodDetails.account_number || !methodDetails.account_holder) {
        return NextResponse.json({ error: "Bank details are incomplete" }, { status: 400 })
      }
    }

    if (method === "paypal" && !methodDetails.paypal_email) {
      return NextResponse.json({ error: "PayPal email is required" }, { status: 400 })
    }

    // Validate mobile numbers for Bangladeshi services
    const mobileNumberRegex = /^01[3-9]\d{8}$/
    if (method === "bkash" && !mobileNumberRegex.test(methodDetails.bkash_number)) {
      return NextResponse.json({ error: "Invalid bKash number format" }, { status: 400 })
    }

    if (method === "nagad" && !mobileNumberRegex.test(methodDetails.nagad_number)) {
      return NextResponse.json({ error: "Invalid Nagad number format" }, { status: 400 })
    }

    if (method === "rocket" && !mobileNumberRegex.test(methodDetails.rocket_number)) {
      return NextResponse.json({ error: "Invalid Rocket number format" }, { status: 400 })
    }

    // Create withdrawal request
    const withdrawal = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      amount: withdrawalAmount,
      currency,
      method,
      methodDetails,
      fee,
      netAmount,
      status: "pending",
      requestDate: new Date().toISOString(),
      processedDate: null,
      transactionId: null,
      estimatedProcessingTime: getProcessingTime(method),
    }

    // In a real app, you would:
    // 1. Verify user balance
    // 2. Deduct amount from user balance
    // 3. Save withdrawal request to database
    // 4. Send notification to admin
    // 5. Send confirmation email to user
    // 6. Integrate with payment gateway APIs

    console.log("Withdrawal request created:", withdrawal)

    return NextResponse.json(
      {
        message: "Withdrawal request submitted successfully",
        withdrawal,
        estimatedProcessingTime: withdrawal.estimatedProcessingTime,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Withdrawal request error:", error)
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

    // Filter withdrawals for the user
    const userWithdrawals = withdrawalHistory.filter((withdrawal) => withdrawal.userId === userId)

    return NextResponse.json({
      withdrawals: userWithdrawals,
      total: userWithdrawals.length,
      exchangeRates,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch withdrawal history" }, { status: 500 })
  }
}

function getProcessingTime(method: string): string {
  const processingTimes = {
    bkash: "Instant - 2 hours",
    nagad: "Instant - 2 hours",
    rocket: "2-6 hours",
    bank: "24-48 hours",
    paypal: "24-48 hours",
  }

  return processingTimes[method as keyof typeof processingTimes] || "24-48 hours"
}
