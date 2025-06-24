import { NextResponse } from "next/server"

// Mock Bangladeshi payment settings
const bangladeshiPaymentSettings = {
  exchangeRates: {
    usdToBdt: 110.0,
    bdtToUsd: 0.0091,
    lastUpdated: "2025-01-20T10:00:00Z",
  },
  fees: {
    bkash: 30, // BDT
    nagad: 25, // BDT
    rocket: 35, // BDT
    bank: 50, // BDT
  },
  limits: {
    bkash: { min: 500, max: 25000 }, // BDT
    nagad: { min: 500, max: 25000 }, // BDT
    rocket: { min: 500, max: 20000 }, // BDT
    bank: { min: 1000, max: 100000 }, // BDT
  },
  enabled: true,
  autoUpdateRates: true,
  rateSource: "Bangladesh Bank",
}

// Mock transaction statistics
const transactionStats = {
  totalWithdrawals: {
    bkash: { count: 1247, amount: 2456780 }, // BDT
    nagad: { count: 892, amount: 1789340 }, // BDT
    rocket: { count: 456, amount: 987650 }, // BDT
    bank: { count: 234, amount: 5678900 }, // BDT
  },
  monthlyStats: {
    "2025-01": {
      bkash: { count: 156, amount: 345670 },
      nagad: { count: 123, amount: 234560 },
      rocket: { count: 67, amount: 123450 },
      bank: { count: 34, amount: 567890 },
    },
  },
  averageProcessingTime: {
    bkash: "1.2 hours",
    nagad: "1.5 hours",
    rocket: "3.2 hours",
    bank: "28 hours",
  },
}

export async function GET() {
  try {
    return NextResponse.json({
      settings: bangladeshiPaymentSettings,
      stats: transactionStats,
      message: "Bangladeshi payment settings retrieved successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch Bangladeshi payment settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { exchangeRates, fees, limits, enabled, autoUpdateRates } = body

    // Update settings
    if (exchangeRates) {
      bangladeshiPaymentSettings.exchangeRates = {
        ...bangladeshiPaymentSettings.exchangeRates,
        ...exchangeRates,
        lastUpdated: new Date().toISOString(),
      }
    }

    if (fees) {
      bangladeshiPaymentSettings.fees = { ...bangladeshiPaymentSettings.fees, ...fees }
    }

    if (limits) {
      bangladeshiPaymentSettings.limits = { ...bangladeshiPaymentSettings.limits, ...limits }
    }

    if (typeof enabled === "boolean") {
      bangladeshiPaymentSettings.enabled = enabled
    }

    if (typeof autoUpdateRates === "boolean") {
      bangladeshiPaymentSettings.autoUpdateRates = autoUpdateRates
    }

    // In a real app, you would:
    // 1. Validate admin authentication
    // 2. Update database
    // 3. Clear cache
    // 4. Log changes
    // 5. Notify relevant services

    console.log("Bangladeshi payment settings updated:", bangladeshiPaymentSettings)

    return NextResponse.json(
      {
        message: "Bangladeshi payment settings updated successfully",
        settings: bangladeshiPaymentSettings,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Bangladeshi payment settings update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Update exchange rates (can be called by cron job)
export async function PUT() {
  try {
    // In a real app, fetch from Bangladesh Bank API or other reliable source
    const newRate = 110.5 + Math.random() * 2 - 1 // Simulate rate fluctuation

    bangladeshiPaymentSettings.exchangeRates = {
      usdToBdt: Number.parseFloat(newRate.toFixed(2)),
      bdtToUsd: Number.parseFloat((1 / newRate).toFixed(6)),
      lastUpdated: new Date().toISOString(),
    }

    console.log("Exchange rates updated:", bangladeshiPaymentSettings.exchangeRates)

    return NextResponse.json(
      {
        message: "Exchange rates updated successfully",
        rates: bangladeshiPaymentSettings.exchangeRates,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Exchange rate update error:", error)
    return NextResponse.json({ error: "Failed to update exchange rates" }, { status: 500 })
  }
}
