"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, DollarSign, Clock, CheckCircle, Users, Shield, Star, Zap, Globe, Smartphone } from "lucide-react"

const workCategories = [
  {
    id: "gmail-creation",
    title: "Gmail Account Creation",
    description: "Create fresh Gmail accounts with phone verification",
    rate: "$2.50 - $5.00",
    difficulty: "Easy",
    timeRequired: "5-10 minutes",
    icon: Mail,
    color: "bg-red-100 text-red-600",
    requirements: ["Valid phone number", "Clean IP address", "Basic computer skills"],
    instructions: [
      "Use a clean browser/device",
      "Create account with unique details",
      "Verify with phone number",
      "Complete profile setup",
      "Submit account details securely",
    ],
  },
  {
    id: "social-accounts",
    title: "Social Media Accounts",
    description: "Create verified social media accounts",
    rate: "$1.50 - $8.00",
    difficulty: "Easy",
    timeRequired: "10-15 minutes",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    requirements: ["Phone verification", "Profile photo", "Basic information"],
    instructions: [
      "Create account on specified platform",
      "Add profile picture and bio",
      "Verify phone number",
      "Complete initial setup",
      "Submit login credentials",
    ],
  },
  {
    id: "data-entry",
    title: "Data Entry Tasks",
    description: "Simple data entry and form filling",
    rate: "$0.50 - $2.00",
    difficulty: "Easy",
    timeRequired: "2-5 minutes",
    icon: Globe,
    color: "bg-green-100 text-green-600",
    requirements: ["Attention to detail", "Basic typing skills"],
    instructions: [
      "Access provided data source",
      "Enter data accurately",
      "Follow formatting guidelines",
      "Double-check for errors",
      "Submit completed work",
    ],
  },
  {
    id: "app-testing",
    title: "App Testing & Reviews",
    description: "Test mobile apps and write reviews",
    rate: "$1.00 - $3.00",
    difficulty: "Medium",
    timeRequired: "15-30 minutes",
    icon: Smartphone,
    color: "bg-purple-100 text-purple-600",
    requirements: ["Smartphone/tablet", "App store account"],
    instructions: [
      "Download specified app",
      "Test all main features",
      "Use app for required time",
      "Write detailed review",
      "Submit screenshots/proof",
    ],
  },
]

const availableJobs = [
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
  },
  {
    id: 4,
    category: "app-testing",
    title: "Fitness App Testing & Review",
    description: "Test new fitness tracking app and provide detailed feedback.",
    rate: 8.0,
    quantity: 1,
    totalPay: 8.0,
    deadline: "5 days",
    requirements: ["Android/iOS device", "Use app for 3 days", "Detailed review"],
    status: "available",
    difficulty: "Medium",
  },
]

export default function OnlineWorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("gmail-creation")
  const [applicationData, setApplicationData] = useState({
    jobId: "",
    experience: "",
    availability: "",
    tools: "",
    portfolio: "",
    contactMethod: "email",
    email: "",
    phone: "",
    additionalInfo: "",
  })
  const [showApplication, setShowApplication] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)

  const handleApplyJob = (job: any) => {
    setSelectedJob(job)
    setApplicationData((prev) => ({ ...prev, jobId: job.id.toString() }))
    setShowApplication(true)
  }

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate application submission
    alert(`Application submitted for "${selectedJob?.title}"! We'll review and contact you within 24 hours.`)
    setShowApplication(false)
    setApplicationData({
      jobId: "",
      experience: "",
      availability: "",
      tools: "",
      portfolio: "",
      contactMethod: "email",
      email: "",
      phone: "",
      additionalInfo: "",
    })
  }

  const selectedCategoryData = workCategories.find((cat) => cat.id === selectedCategory)
  const filteredJobs = availableJobs.filter((job) => job.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-bold text-purple-600">EarnWatch</h1>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-500 hover:text-purple-600">
                Home
              </Link>
              <Link href="/online-work" className="text-purple-600 font-medium">
                Online Work
              </Link>
              <Link href="/sell-to-us" className="text-gray-500 hover:text-purple-600">
                Sell to Us
              </Link>
              <Link href="/dashboard" className="text-gray-500 hover:text-purple-600">
                Dashboard
              </Link>
            </nav>
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Online Work Opportunities</h1>
          <p className="text-xl text-gray-600">
            Complete simple online tasks and earn money from home. No experience required!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">$0.50 - $8.00</div>
              <div className="text-sm text-gray-600">Per Task</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2-30 min</div>
              <div className="text-sm text-gray-600">Task Duration</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">500+</div>
              <div className="text-sm text-gray-600">Active Workers</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">4.8/5</div>
              <div className="text-sm text-gray-600">Worker Rating</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Work Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {workCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedCategory === category.id
                        ? "border-purple-500 bg-purple-50 shadow-md"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${category.color}`}>
                        <category.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{category.title}</h3>
                        <p className="text-xs text-gray-600">{category.rate}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-sm">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  Safety & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>All payments are secured</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>No upfront fees required</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Work from anywhere</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>24/7 support available</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedCategoryData && (
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedCategoryData.color}`}
                    >
                      <selectedCategoryData.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{selectedCategoryData.title}</CardTitle>
                      <p className="text-gray-600">{selectedCategoryData.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">{selectedCategoryData.rate}</div>
                      <div className="text-sm text-gray-600">Per Task</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{selectedCategoryData.timeRequired}</div>
                      <div className="text-sm text-gray-600">Time Required</div>
                    </div>
                    <div className="text-center">
                      <Badge variant="secondary">{selectedCategoryData.difficulty}</Badge>
                      <div className="text-sm text-gray-600 mt-1">Difficulty</div>
                    </div>
                  </div>

                  <Tabs defaultValue="requirements" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="requirements">Requirements</TabsTrigger>
                      <TabsTrigger value="instructions">How to Complete</TabsTrigger>
                    </TabsList>
                    <TabsContent value="requirements" className="mt-4">
                      <ul className="space-y-2">
                        {selectedCategoryData.requirements.map((req, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="instructions" className="mt-4">
                      <ol className="space-y-2">
                        {selectedCategoryData.instructions.map((instruction, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="bg-purple-100 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                            </div>
                            <span className="text-sm">{instruction}</span>
                          </li>
                        ))}
                      </ol>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Available Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Available Jobs</CardTitle>
                <p className="text-gray-600">Current opportunities in {selectedCategoryData?.title}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">{job.title}</h3>
                          <p className="text-gray-600 mb-3">{job.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.requirements.map((req, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right ml-6">
                          <div className="text-2xl font-bold text-green-600">${job.totalPay.toFixed(2)}</div>
                          <div className="text-sm text-gray-600">Total Payment</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Rate per item:</span>
                          <div className="font-medium">${job.rate.toFixed(2)}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Quantity:</span>
                          <div className="font-medium">{job.quantity}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Deadline:</span>
                          <div className="font-medium">{job.deadline}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Difficulty:</span>
                          <Badge variant="secondary" className="text-xs">
                            {job.difficulty}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-100 text-green-800">Available</Badge>
                          <span className="text-sm text-gray-500">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Posted 2 hours ago
                          </span>
                        </div>
                        <Button onClick={() => handleApplyJob(job)} className="bg-purple-600 hover:bg-purple-700">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Application Modal */}
        {showApplication && selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Apply for: {selectedJob.title}</CardTitle>
                <p className="text-gray-600">Fill out the application form below</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitApplication} className="space-y-4">
                  <div>
                    <Label htmlFor="experience">Relevant Experience</Label>
                    <Textarea
                      id="experience"
                      placeholder="Describe any relevant experience you have with this type of work..."
                      value={applicationData.experience}
                      onChange={(e) => setApplicationData((prev) => ({ ...prev, experience: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={applicationData.availability}
                      onValueChange={(value) => setApplicationData((prev) => ({ ...prev, availability: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Can start immediately</SelectItem>
                        <SelectItem value="within-24h">Within 24 hours</SelectItem>
                        <SelectItem value="within-48h">Within 48 hours</SelectItem>
                        <SelectItem value="within-week">Within a week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="tools">Tools & Equipment</Label>
                    <Textarea
                      id="tools"
                      placeholder="List the tools, software, or equipment you have access to..."
                      value={applicationData.tools}
                      onChange={(e) => setApplicationData((prev) => ({ ...prev, tools: e.target.value }))}
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={applicationData.phone}
                      onChange={(e) => setApplicationData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Any additional information you'd like to share..."
                      value={applicationData.additionalInfo}
                      onChange={(e) => setApplicationData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                      rows={2}
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" className="flex-1">
                      Submit Application
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowApplication(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
