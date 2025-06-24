"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Users, Shield, Check, Heart, Share2 } from "lucide-react"

// Mock service data - in real app this would come from API
const serviceData = {
  id: 1,
  name: "Adobe Creative Suite",
  category: "Design Software",
  vendor: "Adobe Inc.",
  description:
    "The complete creative toolkit for designers, photographers, and video editors. Get access to industry-leading apps like Photoshop, Illustrator, Premiere Pro, and more.",
  longDescription:
    "Adobe Creative Suite is the industry standard for creative professionals worldwide. With over 20 desktop and mobile apps, you'll have everything you need to create stunning graphics, edit photos, design websites, create videos, and more. Whether you're a beginner or a seasoned professional, Creative Suite provides the tools and resources to bring your creative vision to life.",
  price: 52.99,
  originalPrice: 79.99,
  period: "month",
  rating: 4.8,
  reviewCount: 12847,
  users: "10M+",
  image: "/placeholder.svg?height=400&width=600",
  gallery: [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ],
  features: [
    "Photoshop - Professional photo editing",
    "Illustrator - Vector graphics and design",
    "Premiere Pro - Video editing and production",
    "After Effects - Motion graphics and visual effects",
    "InDesign - Page layout and publishing",
    "Lightroom - Photo organization and editing",
    "XD - UI/UX design and prototyping",
    "Acrobat Pro - PDF creation and editing",
    "20GB cloud storage",
    "Adobe Fonts access",
    "Premium support",
    "Regular updates and new features",
  ],
  plans: [
    {
      name: "Monthly",
      price: 52.99,
      period: "month",
      savings: null,
      popular: false,
    },
    {
      name: "Annual",
      price: 39.99,
      period: "month",
      billedAnnually: 479.88,
      savings: "Save 25%",
      popular: true,
    },
    {
      name: "Student",
      price: 19.99,
      period: "month",
      savings: "Save 62%",
      popular: false,
      note: "Verification required",
    },
  ],
  requirements: [
    "Windows 10 (64-bit) or macOS 10.15 or later",
    "8GB RAM (16GB recommended)",
    "4GB available hard-disk space",
    "Internet connection required for activation",
  ],
  reviews: [
    {
      id: 1,
      user: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Absolutely essential for any creative professional. The integration between apps is seamless and the regular updates keep adding great new features.",
    },
    {
      id: 2,
      user: "Mike Chen",
      rating: 4,
      date: "1 month ago",
      comment:
        "Great software suite, though it can be resource-intensive. The learning curve is steep but worth it for the professional results.",
    },
    {
      id: 3,
      user: "Emma Davis",
      rating: 5,
      date: "2 months ago",
      comment:
        "Been using this for years and it just keeps getting better. The cloud sync feature is a game-changer for working across devices.",
    },
  ],
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const [selectedPlan, setSelectedPlan] = useState(1) // Annual plan selected by default
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handlePurchase = () => {
    const plan = serviceData.plans[selectedPlan]
    console.log("Purchasing plan:", plan)
    alert(`Redirecting to checkout for ${plan.name} plan at $${plan.price}/${plan.period}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-bold text-blue-600">SubMarket</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/browse" className="hover:text-blue-600">
            Browse
          </Link>
          <span>/</span>
          <span className="text-gray-900">{serviceData.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{serviceData.name}</h1>
                  <p className="text-gray-600">by {serviceData.vendor}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsWishlisted(!isWishlisted)}>
                    <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(serviceData.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 font-medium">{serviceData.rating}</span>
                  <span className="ml-1 text-gray-600">({serviceData.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-gray-600">{serviceData.users} users</span>
                </div>
                <Badge>{serviceData.category}</Badge>
              </div>

              <img
                src={serviceData.image || "/placeholder.svg"}
                alt={serviceData.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <p className="text-gray-700 leading-relaxed">{serviceData.description}</p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="bg-white rounded-lg shadow-sm">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="p-6">
                <h3 className="text-xl font-semibold mb-4">About {serviceData.name}</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{serviceData.longDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {serviceData.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${serviceData.name} screenshot ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="features" className="p-6">
                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {serviceData.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="requirements" className="p-6">
                <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
                <ul className="space-y-2">
                  {serviceData.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center">
                      <Shield className="w-4 h-4 text-blue-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="reviews" className="p-6">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="space-y-6">
                  {serviceData.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                            {review.user.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{review.user}</p>
                            <p className="text-sm text-gray-600">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Choose Your Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {serviceData.plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPlan === index ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    } ${plan.popular ? "ring-2 ring-blue-500" : ""}`}
                    onClick={() => setSelectedPlan(index)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          checked={selectedPlan === index}
                          onChange={() => setSelectedPlan(index)}
                          className="mr-3"
                        />
                        <span className="font-medium">{plan.name}</span>
                      </div>
                      {plan.popular && <Badge className="bg-blue-500">Most Popular</Badge>}
                    </div>

                    <div className="ml-6">
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold">${plan.price}</span>
                        <span className="text-gray-600 ml-1">/{plan.period}</span>
                      </div>

                      {plan.billedAnnually && (
                        <p className="text-sm text-gray-600">Billed annually (${plan.billedAnnually})</p>
                      )}

                      {plan.savings && (
                        <Badge variant="secondary" className="mt-1">
                          {plan.savings}
                        </Badge>
                      )}

                      {plan.note && <p className="text-xs text-gray-500 mt-1">{plan.note}</p>}
                    </div>
                  </div>
                ))}

                <Button onClick={handlePurchase} className="w-full" size="lg">
                  Get Started - ${serviceData.plans[selectedPlan].price}/{serviceData.plans[selectedPlan].period}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>✓ Instant access after purchase</p>
                  <p>✓ 30-day money-back guarantee</p>
                  <p>✓ Cancel anytime</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
