import { NextResponse } from "next/server"

// Mock website settings data
const websiteSettings = {
  siteInfo: {
    name: "EarnWatch",
    tagline: "Watch Videos & Earn Money",
    description: "Get paid for watching videos, completing online work, and selling items",
    contactEmail: "support@earnwatch.com",
    supportPhone: "+1 (555) 123-4567",
  },
  seo: {
    metaTitle: "EarnWatch - Earn Money Watching Videos",
    metaDescription:
      "Join EarnWatch to earn money by watching videos, completing online tasks, and selling items. Start earning today!",
    metaKeywords: "earn money, watch videos, online work, sell items",
    googleAnalyticsId: "",
  },
  content: {
    heroTitle: "Watch Videos & Earn Money",
    heroSubtitle: "Get paid for watching videos, completing online work, and selling items",
    featuresTitle: "Multiple Ways to Earn",
    bannerEnabled: true,
    bannerText: "🎉 New users get $5 bonus! Limited time offer.",
    bannerColor: "green",
    footerDescription:
      "The #1 platform for earning money by watching videos, completing online work, and selling items.",
    copyrightText: "© 2025 EarnWatch. All rights reserved.",
  },
  theme: {
    primaryColor: "#7c3aed",
    secondaryColor: "#ec4899",
    accentColor: "#10b981",
    backgroundColor: "#f9fafb",
    fontFamily: "inter",
    fontSize: "16",
    headingFontWeight: "700",
    containerWidth: "1200",
    borderRadius: "8",
    darkModeEnabled: false,
    logoText: "EarnWatch",
    logoUrl: null,
    faviconUrl: null,
  },
}

export async function GET() {
  try {
    return NextResponse.json({
      settings: websiteSettings,
      message: "Website settings retrieved successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch website settings" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { section, data } = body

    // Validate section
    if (!["siteInfo", "seo", "content", "theme"].includes(section)) {
      return NextResponse.json({ error: "Invalid settings section" }, { status: 400 })
    }

    // Update the specific section
    websiteSettings[section as keyof typeof websiteSettings] = {
      ...websiteSettings[section as keyof typeof websiteSettings],
      ...data,
    }

    // In a real app, you would:
    // 1. Validate admin authentication
    // 2. Sanitize input data
    // 3. Save to database
    // 4. Clear cache/rebuild static files
    // 5. Log the changes

    console.log(`Website settings updated - Section: ${section}`, data)

    return NextResponse.json(
      {
        message: `${section} settings updated successfully`,
        settings: websiteSettings[section as keyof typeof websiteSettings],
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Website settings update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { settings } = body

    // Validate and update all settings
    if (settings.siteInfo) websiteSettings.siteInfo = { ...websiteSettings.siteInfo, ...settings.siteInfo }
    if (settings.seo) websiteSettings.seo = { ...websiteSettings.seo, ...settings.seo }
    if (settings.content) websiteSettings.content = { ...websiteSettings.content, ...settings.content }
    if (settings.theme) websiteSettings.theme = { ...websiteSettings.theme, ...settings.theme }

    console.log("Full website settings updated:", websiteSettings)

    return NextResponse.json(
      {
        message: "All website settings updated successfully",
        settings: websiteSettings,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Full website settings update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
