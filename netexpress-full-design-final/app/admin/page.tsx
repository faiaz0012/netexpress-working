"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Users,
  DollarSign,
  Play,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  Settings,
  Camera,
  Mail,
  Globe,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Mock admin data
const adminStats = {
  totalUsers: 15847,
  activeUsers: 8923,
  totalEarnings: 45678.9,
  totalWithdrawals: 23456.78,
  pendingWithdrawals: 2345.67,
  totalVideos: 1234,
  totalViews: 2345678,
  activationFees: 8934.53,
  processingFees: 1234.56,
}

const recentUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2025-01-20",
    status: "active",
    balance: 45.67,
    totalEarned: 123.45,
    activated: true,
    activationFee: 2.99,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "2025-01-19",
    status: "pending",
    balance: 0.0,
    totalEarned: 0.0,
    activated: false,
    activationFee: 0.0,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    joinDate: "2025-01-18",
    status: "suspended",
    balance: 12.34,
    totalEarned: 67.89,
    activated: true,
    activationFee: 2.99,
  },
]

const pendingWithdrawals = [
  {
    id: 1,
    user: "John Doe",
    email: "john@example.com",
    amount: 50.0,
    processingFee: 1.99,
    netAmount: 48.01,
    method: "PayPal",
    requestDate: "2025-01-20",
    status: "pending",
  },
  {
    id: 2,
    user: "Sarah Wilson",
    email: "sarah@example.com",
    amount: 100.0,
    processingFee: 1.99,
    netAmount: 98.01,
    method: "Bank Transfer",
    requestDate: "2025-01-19",
    status: "pending",
  },
]

const systemSettings = {
  minWithdrawal: 25.0,
  activationFee: 2.99,
  processingFee: 1.99,
  watchEarning: 0.25,
  likeEarning: 0.05,
  subscribeEarning: 0.25,
  shareEarning: 0.1,
  referralRate: 20,
  dailyBonusLimit: 5,
}

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [searchTerm, setSearchTerm] = useState("")
  const [settings, setSettings] = useState(systemSettings)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Admin credentials
    if (
      (loginData.username === "admin" && loginData.password === "EarnWatch2025!") ||
      (loginData.username === "superadmin" && loginData.password === "EW_SuperAdmin_2025!")
    ) {
      setIsAuthenticated(true)
    } else {
      alert("Invalid credentials!")
    }
  }

  const handleApproveWithdrawal = (id: number) => {
    alert(`Withdrawal ${id} approved and processed!`)
  }

  const handleRejectWithdrawal = (id: number) => {
    alert(`Withdrawal ${id} rejected!`)
  }

  const handleSuspendUser = (id: number) => {
    alert(`User ${id} suspended!`)
  }

  const handleActivateUser = (id: number) => {
    alert(`User ${id} activated!`)
  }

  const handleUpdateSettings = () => {
    alert("Settings updated successfully!")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-red-600">🔒 Admin Panel</CardTitle>
            <p className="text-gray-600">Secure Administrator Access</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData((prev) => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter admin username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter admin password"
                />
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Access Admin Panel
              </Button>
              <div className="text-xs text-gray-500 text-center mt-4">
                <p>
                  <strong>Admin Credentials:</strong>
                </p>
                <p>Username: admin</p>
                <p>Password: EarnWatch2025!</p>
                <p className="mt-2 text-green-600">
                  <strong>Super Admin:</strong>
                </p>
                <p>Username: superadmin</p>
                <p>Password: EW_SuperAdmin_2025!</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-red-600">🔒 EarnWatch Admin</h1>
              <Badge className="bg-red-100 text-red-800">Administrator</Badge>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, withdrawals, and system settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{adminStats.activeUsers.toLocaleString()} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings Paid</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${adminStats.totalWithdrawals.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">${adminStats.pendingWithdrawals.toLocaleString()} pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activation Fees</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${adminStats.activationFees.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+${adminStats.processingFees.toLocaleString()} processing</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Video Views</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{adminStats.totalVideos} videos</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="submissions">Items</TabsTrigger>
            <TabsTrigger value="online-work">Work</TabsTrigger>
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="font-medium text-purple-600">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">Joined: {user.joinDate}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-sm font-medium">Balance: ${user.balance.toFixed(2)}</p>
                          <p className="text-xs text-gray-600">Earned: ${user.totalEarned.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">
                            Activation: {user.activated ? `$${user.activationFee}` : "Pending"}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              user.status === "active"
                                ? "default"
                                : user.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {user.status}
                          </Badge>
                          {!user.activated && (
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              Not Activated
                            </Badge>
                          )}
                        </div>

                        <div className="flex space-x-2">
                          {user.status === "active" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuspendUser(user.id)}
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              Suspend
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleActivateUser(user.id)}
                              className="text-green-600 border-green-600 hover:bg-green-50"
                            >
                              Activate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                  Pending Withdrawals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingWithdrawals.map((withdrawal) => (
                    <div
                      key={withdrawal.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 border-yellow-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{withdrawal.user}</h3>
                          <p className="text-sm text-gray-600">{withdrawal.email}</p>
                          <p className="text-xs text-gray-500">
                            Requested: {withdrawal.requestDate} | Method: {withdrawal.method}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-medium">${withdrawal.amount.toFixed(2)}</p>
                          <p className="text-sm text-gray-600">Fee: ${withdrawal.processingFee.toFixed(2)}</p>
                          <p className="text-sm font-medium text-green-600">Net: ${withdrawal.netAmount.toFixed(2)}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveWithdrawal(withdrawal.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectWithdrawal(withdrawal.id)}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="submissions">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-blue-600" />
                  Item Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock submission data */}
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 border-blue-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Camera className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">iPhone 14 Pro Max</h3>
                        <p className="text-sm text-gray-600">user@example.com</p>
                        <p className="text-xs text-gray-500">Submitted: 2025-01-20 | Category: Electronics</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-medium">Asking: $899.99</p>
                        <p className="text-sm text-gray-600">Condition: Like New</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Make Offer
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Camera className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Gaming Laptop RTX 4070</h3>
                        <p className="text-sm text-gray-600">gamer@example.com</p>
                        <p className="text-xs text-gray-500">Submitted: 2025-01-18 | Category: Electronics</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-medium">Asking: $1,299.99</p>
                        <p className="text-sm text-green-600">Offer Made: $1,100.00</p>
                      </div>

                      <div className="flex space-x-2">
                        <Badge className="bg-green-100 text-green-800">Offer Sent</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="online-work">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Online Work Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock application data */}
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-200">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Gmail Account Creation - Bulk Order</h3>
                        <p className="text-sm text-gray-600">worker@example.com</p>
                        <p className="text-xs text-gray-500">Applied: 2025-01-20 | Experience: 2 years</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-medium">Rate: $4.00 per account</p>
                        <p className="text-sm text-gray-600">Quantity: 10 accounts</p>
                        <p className="text-sm text-green-600">Total: $40.00</p>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Instagram Business Accounts</h3>
                        <p className="text-sm text-gray-600">socialworker@example.com</p>
                        <p className="text-xs text-gray-500">Applied: 2025-01-19 | Experience: 1 year</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-medium">Rate: $6.00 per account</p>
                        <p className="text-sm text-gray-600">Quantity: 5 accounts</p>
                        <p className="text-sm text-blue-600">Total: $30.00</p>
                      </div>

                      <div className="flex space-x-2">
                        <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Data Entry - Product Information</h3>
                        <p className="text-sm text-gray-600">dataentry@example.com</p>
                        <p className="text-xs text-gray-500">Applied: 2025-01-18 | Experience: 6 months</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-medium">Rate: $1.50 per item</p>
                        <p className="text-sm text-gray-600">Quantity: 100 items</p>
                        <p className="text-sm text-purple-600">Total: $150.00</p>
                      </div>

                      <div className="flex space-x-2">
                        <Badge className="bg-green-100 text-green-800">Approved</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="website">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" defaultValue="EarnWatch" />
                  </div>
                  <div>
                    <Label htmlFor="siteTagline">Tagline</Label>
                    <Input id="siteTagline" defaultValue="Watch Videos & Earn Money" />
                  </div>
                  <div>
                    <Label htmlFor="siteDescription">Description</Label>
                    <Textarea
                      id="siteDescription"
                      defaultValue="Get paid for watching videos, completing online work, and selling items"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input id="contactEmail" type="email" defaultValue="support@earnwatch.com" />
                  </div>
                  <div>
                    <Label htmlFor="supportPhone">Support Phone</Label>
                    <Input id="supportPhone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <Button className="w-full">Update Site Information</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input id="metaTitle" defaultValue="EarnWatch - Earn Money Watching Videos" />
                  </div>
                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      defaultValue="Join EarnWatch to earn money by watching videos, completing online tasks, and selling items. Start earning today!"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaKeywords">Meta Keywords</Label>
                    <Input id="metaKeywords" defaultValue="earn money, watch videos, online work, sell items" />
                  </div>
                  <div>
                    <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                    <Input id="googleAnalytics" placeholder="G-XXXXXXXXXX" />
                  </div>
                  <Button className="w-full">Update SEO Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Homepage Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="heroTitle">Hero Title</Label>
                    <Input id="heroTitle" defaultValue="Watch Videos & Earn Money" />
                  </div>
                  <div>
                    <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                    <Textarea
                      id="heroSubtitle"
                      defaultValue="Get paid for watching videos, completing online work, and selling items"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="featuresTitle">Features Section Title</Label>
                    <Input id="featuresTitle" defaultValue="Multiple Ways to Earn" />
                  </div>
                  <Button>Update Homepage Content</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Announcement Banner</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="showBanner" defaultChecked />
                    <Label htmlFor="showBanner">Show Announcement Banner</Label>
                  </div>
                  <div>
                    <Label htmlFor="bannerText">Banner Text</Label>
                    <Input id="bannerText" defaultValue="🎉 New users get $5 bonus! Limited time offer." />
                  </div>
                  <div>
                    <Label htmlFor="bannerColor">Banner Color</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="green">Green (Success)</option>
                      <option value="blue">Blue (Info)</option>
                      <option value="yellow">Yellow (Warning)</option>
                      <option value="red">Red (Alert)</option>
                    </select>
                  </div>
                  <Button>Update Banner</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Footer Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="footerDescription">Footer Description</Label>
                    <Textarea
                      id="footerDescription"
                      defaultValue="The #1 platform for earning money by watching videos, completing online work, and selling items."
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="copyrightText">Copyright Text</Label>
                    <Input id="copyrightText" defaultValue="© 2025 EarnWatch. All rights reserved." />
                  </div>
                  <Button>Update Footer</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="theme">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Color Scheme</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex space-x-2">
                      <Input id="primaryColor" type="color" defaultValue="#7c3aed" className="w-20" />
                      <Input defaultValue="#7c3aed" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex space-x-2">
                      <Input id="secondaryColor" type="color" defaultValue="#ec4899" className="w-20" />
                      <Input defaultValue="#ec4899" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex space-x-2">
                      <Input id="accentColor" type="color" defaultValue="#10b981" className="w-20" />
                      <Input defaultValue="#10b981" className="flex-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <div className="flex space-x-2">
                      <Input id="backgroundColor" type="color" defaultValue="#f9fafb" className="w-20" />
                      <Input defaultValue="#f9fafb" className="flex-1" />
                    </div>
                  </div>
                  <Button className="w-full">Apply Color Scheme</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Typography</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <select id="fontFamily" className="w-full p-2 border rounded-md">
                      <option value="inter">Inter (Default)</option>
                      <option value="roboto">Roboto</option>
                      <option value="opensans">Open Sans</option>
                      <option value="lato">Lato</option>
                      <option value="montserrat">Montserrat</option>
                      <option value="poppins">Poppins</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="fontSize">Base Font Size</Label>
                    <select id="fontSize" className="w-full p-2 border rounded-md">
                      <option value="14">14px (Small)</option>
                      <option value="16" selected>
                        16px (Default)
                      </option>
                      <option value="18">18px (Large)</option>
                      <option value="20">20px (Extra Large)</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="headingFont">Heading Font Weight</Label>
                    <select id="headingFont" className="w-full p-2 border rounded-md">
                      <option value="600">Semi Bold (600)</option>
                      <option value="700" selected>
                        Bold (700)
                      </option>
                      <option value="800">Extra Bold (800)</option>
                      <option value="900">Black (900)</option>
                    </select>
                  </div>
                  <Button className="w-full">Apply Typography</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Layout Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="containerWidth">Container Max Width</Label>
                    <select id="containerWidth" className="w-full p-2 border rounded-md">
                      <option value="1200">1200px (Default)</option>
                      <option value="1400">1400px (Wide)</option>
                      <option value="1600">1600px (Extra Wide)</option>
                      <option value="full">Full Width</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="borderRadius">Border Radius</Label>
                    <select id="borderRadius" className="w-full p-2 border rounded-md">
                      <option value="4">4px (Small)</option>
                      <option value="8" selected>
                        8px (Default)
                      </option>
                      <option value="12">12px (Medium)</option>
                      <option value="16">16px (Large)</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="darkMode" />
                    <Label htmlFor="darkMode">Enable Dark Mode Option</Label>
                  </div>
                  <Button className="w-full">Apply Layout Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Logo & Branding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="logoUpload">Upload Logo</Label>
                    <Input id="logoUpload" type="file" accept="image/*" />
                    <p className="text-xs text-gray-500">Recommended: 200x50px, PNG or SVG</p>
                  </div>
                  <div>
                    <Label htmlFor="faviconUpload">Upload Favicon</Label>
                    <Input id="faviconUpload" type="file" accept="image/*" />
                    <p className="text-xs text-gray-500">Recommended: 32x32px, ICO or PNG</p>
                  </div>
                  <div>
                    <Label htmlFor="logoText">Logo Text (if no image)</Label>
                    <Input id="logoText" defaultValue="EarnWatch" />
                  </div>
                  <Button className="w-full">Update Branding</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Payment Settings</h3>

                    <div>
                      <Label htmlFor="minWithdrawal">Minimum Withdrawal Amount ($)</Label>
                      <Input
                        id="minWithdrawal"
                        type="number"
                        step="0.01"
                        value={settings.minWithdrawal}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, minWithdrawal: Number.parseFloat(e.target.value) }))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="activationFee">Account Activation Fee ($)</Label>
                      <Input
                        id="activationFee"
                        type="number"
                        step="0.01"
                        value={settings.activationFee}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, activationFee: Number.parseFloat(e.target.value) }))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="processingFee">Withdrawal Processing Fee ($)</Label>
                      <Input
                        id="processingFee"
                        type="number"
                        step="0.01"
                        value={settings.processingFee}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, processingFee: Number.parseFloat(e.target.value) }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Earning Rates</h3>

                    <div>
                      <Label htmlFor="watchEarning">Watch Video Earning ($)</Label>
                      <Input
                        id="watchEarning"
                        type="number"
                        step="0.01"
                        value={settings.watchEarning}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, watchEarning: Number.parseFloat(e.target.value) }))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="likeEarning">Like Video Earning ($)</Label>
                      <Input
                        id="likeEarning"
                        type="number"
                        step="0.01"
                        value={settings.likeEarning}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, likeEarning: Number.parseFloat(e.target.value) }))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="subscribeEarning">Subscribe Earning ($)</Label>
                      <Input
                        id="subscribeEarning"
                        type="number"
                        step="0.01"
                        value={settings.subscribeEarning}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, subscribeEarning: Number.parseFloat(e.target.value) }))
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="referralRate">Referral Commission (%)</Label>
                      <Input
                        id="referralRate"
                        type="number"
                        value={settings.referralRate}
                        onChange={(e) =>
                          setSettings((prev) => ({ ...prev, referralRate: Number.parseInt(e.target.value) }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Bangladeshi Payment Settings</h3>

                    <div>
                      <Label htmlFor="usdToBdt">USD to BDT Exchange Rate</Label>
                      <Input id="usdToBdt" type="number" step="0.01" defaultValue="110.00" placeholder="110.00" />
                    </div>

                    <div>
                      <Label htmlFor="bkashFee">bKash Processing Fee (BDT)</Label>
                      <Input id="bkashFee" type="number" step="0.01" defaultValue="30" />
                    </div>

                    <div>
                      <Label htmlFor="nagadFee">Nagad Processing Fee (BDT)</Label>
                      <Input id="nagadFee" type="number" step="0.01" defaultValue="25" />
                    </div>

                    <div>
                      <Label htmlFor="rocketFee">Rocket Processing Fee (BDT)</Label>
                      <Input id="rocketFee" type="number" step="0.01" defaultValue="35" />
                    </div>

                    <div>
                      <Label htmlFor="bankFee">Bank Transfer Fee (BDT)</Label>
                      <Input id="bankFee" type="number" step="0.01" defaultValue="50" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="enableBangladeshiPayments" defaultChecked />
                      <Label htmlFor="enableBangladeshiPayments">Enable Bangladeshi Payment Methods</Label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <Button onClick={handleUpdateSettings} className="bg-green-600 hover:bg-green-700">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Activation Fees Collected:</span>
                      <span className="font-medium text-green-600">${adminStats.activationFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fees Collected:</span>
                      <span className="font-medium text-green-600">${adminStats.processingFees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Earnings Paid:</span>
                      <span className="font-medium text-red-600">-${adminStats.totalWithdrawals.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-semibold">
                        <span>Net Revenue:</span>
                        <span className="text-green-600">
                          $
                          {(
                            adminStats.activationFees +
                            adminStats.processingFees -
                            adminStats.totalWithdrawals
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Registered Users:</span>
                      <span className="font-medium">{adminStats.totalUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users:</span>
                      <span className="font-medium text-green-600">{adminStats.activeUsers.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Activation Rate:</span>
                      <span className="font-medium">
                        {((adminStats.activeUsers / adminStats.totalUsers) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Earnings per User:</span>
                      <span className="font-medium">
                        ${(adminStats.totalEarnings / adminStats.activeUsers).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
