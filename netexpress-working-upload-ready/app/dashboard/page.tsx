"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Play, Users, Gift, Calendar, Award, CreditCard, ThumbsUp } from "lucide-react"
import { Label } from "@/components/ui/label"

const userStats = {
  totalEarnings: 127.45,
  todayEarnings: 8.25,
  videosWatched: 234,
  totalLikes: 189,
  subscriptions: 45,
  referrals: 12,
  level: "Gold",
  nextLevel: "Platinum",
  levelProgress: 75,
  dailyStreak: 15,
}

const recentEarnings = [
  {
    id: 1,
    action: "Watched Video",
    title: "Amazing Travel Destinations 2025",
    amount: 0.25,
    time: "2 hours ago",
    type: "watch",
  },
  {
    id: 2,
    action: "Liked Video",
    title: "Cooking Masterclass: Italian Pasta",
    amount: 0.05,
    time: "3 hours ago",
    type: "like",
  },
  {
    id: 3,
    action: "Subscribed to Channel",
    title: "Tech Guru",
    amount: 0.25,
    time: "5 hours ago",
    type: "subscribe",
  },
  {
    id: 4,
    action: "Daily Bonus",
    title: "Completed 5 videos",
    amount: 2.5,
    time: "Yesterday",
    type: "bonus",
  },
  {
    id: 5,
    action: "Referral Bonus",
    title: "Friend joined EarnWatch",
    amount: 5.0,
    time: "2 days ago",
    type: "referral",
  },
]

const achievements = [
  {
    id: 1,
    title: "First Video",
    description: "Watch your first video",
    icon: Play,
    completed: true,
    reward: 0.5,
  },
  {
    id: 2,
    title: "Like Master",
    description: "Like 100 videos",
    icon: ThumbsUp,
    completed: true,
    reward: 2.0,
  },
  {
    id: 3,
    title: "Subscriber",
    description: "Subscribe to 50 channels",
    icon: Users,
    completed: false,
    reward: 5.0,
    progress: 45,
    total: 50,
  },
  {
    id: 4,
    title: "Daily Warrior",
    description: "30-day login streak",
    icon: Calendar,
    completed: false,
    reward: 10.0,
    progress: 15,
    total: 30,
  },
]

export default function DashboardPage() {
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "2024-12-01",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-bold text-purple-600">EarnWatch</h1>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-green-700">${userStats.totalEarnings.toFixed(2)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Track your earnings and progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${userStats.totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">+${userStats.todayEarnings.toFixed(2)} today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Videos Watched</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.videosWatched}</div>
              <p className="text-xs text-muted-foreground">+12 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.dailyStreak} days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Level</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.level}</div>
              <p className="text-xs text-muted-foreground">
                {userStats.levelProgress}% to {userStats.nextLevel}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Level Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-600" />
                    Level Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{userStats.level}</span>
                      <span className="text-sm text-gray-600">Next: {userStats.nextLevel}</span>
                    </div>
                    <Progress value={userStats.levelProgress} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{userStats.levelProgress}% Complete</span>
                      <span>25 more videos to level up</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Goals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="w-5 h-5 mr-2 text-purple-600" />
                    Daily Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Watch 5 videos</span>
                        <span className="text-sm">3/5</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Like 10 videos</span>
                        <span className="text-sm">7/10</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Subscribe to 2 channels</span>
                        <span className="text-sm">1/2</span>
                      </div>
                      <Progress value={50} className="h-2" />
                    </div>
                    <div className="text-center pt-2">
                      <Badge className="bg-green-100 text-green-800">Daily Bonus: $2.50</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="earnings">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentEarnings.map((earning) => (
                        <div key={earning.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                earning.type === "watch"
                                  ? "bg-blue-100"
                                  : earning.type === "like"
                                    ? "bg-red-100"
                                    : earning.type === "subscribe"
                                      ? "bg-green-100"
                                      : earning.type === "bonus"
                                        ? "bg-purple-100"
                                        : "bg-yellow-100"
                              }`}
                            >
                              {earning.type === "watch" ? (
                                <Play className="w-5 h-5 text-blue-600" />
                              ) : earning.type === "like" ? (
                                <ThumbsUp className="w-5 h-5 text-red-600" />
                              ) : earning.type === "subscribe" ? (
                                <Users className="w-5 h-5 text-green-600" />
                              ) : earning.type === "bonus" ? (
                                <Gift className="w-5 h-5 text-purple-600" />
                              ) : (
                                <DollarSign className="w-5 h-5 text-yellow-600" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium">{earning.action}</h3>
                              <p className="text-sm text-gray-600">{earning.title}</p>
                              <p className="text-xs text-gray-500">{earning.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-600">+${earning.amount.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Withdrawal</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">${userStats.totalEarnings.toFixed(2)}</div>
                      <p className="text-sm text-gray-600">Available Balance</p>
                      <p className="text-xs text-red-500 mt-1">Minimum withdrawal: $25.00</p>
                    </div>

                    <div className="space-y-3">
                      <Label>Select Payment Method</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="p-3 border rounded-lg text-center hover:bg-blue-50 border-blue-500 bg-blue-50">
                          <div className="font-medium text-sm">bKash</div>
                          <div className="text-xs text-gray-600">Mobile Banking</div>
                        </button>
                        <button className="p-3 border rounded-lg text-center hover:bg-orange-50">
                          <div className="font-medium text-sm">Nagad</div>
                          <div className="text-xs text-gray-600">Mobile Banking</div>
                        </button>
                        <button className="p-3 border rounded-lg text-center hover:bg-purple-50">
                          <div className="font-medium text-sm">Rocket</div>
                          <div className="text-xs text-gray-600">Mobile Banking</div>
                        </button>
                        <button className="p-3 border rounded-lg text-center hover:bg-green-50">
                          <div className="font-medium text-sm">Bank Transfer</div>
                          <div className="text-xs text-gray-600">Local Banks</div>
                        </button>
                      </div>
                    </div>

                    <Button className="w-full" disabled={userStats.totalEarnings < 25}>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Withdraw (Min $25)
                    </Button>
                    <div className="text-xs text-gray-500 text-center">
                      Withdrawals processed within 24-48 hours
                      <br />
                      Processing fee: ৳50 per withdrawal
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-4 border rounded-lg ${
                        achievement.completed ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              achievement.completed ? "bg-green-100" : "bg-gray-100"
                            }`}
                          >
                            <achievement.icon
                              className={`w-5 h-5 ${achievement.completed ? "text-green-600" : "text-gray-400"}`}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{achievement.title}</h3>
                            <p className="text-sm text-gray-600">{achievement.description}</p>
                          </div>
                        </div>
                        <Badge variant={achievement.completed ? "default" : "secondary"}>
                          ${achievement.reward.toFixed(2)}
                        </Badge>
                      </div>
                      {!achievement.completed && achievement.progress && (
                        <div>
                          <Progress value={(achievement.progress / achievement.total) * 100} className="h-2 mb-2" />
                          <p className="text-xs text-gray-500">
                            {achievement.progress}/{achievement.total}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle>Referral Program</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Earn 20% of your friends' earnings!</h3>
                    <p className="text-gray-600 mb-4">
                      Invite friends and earn 20% of everything they make. Plus, they get a $5 bonus when they sign up!
                    </p>
                    <div className="bg-white p-3 rounded-md">
                      <p className="text-sm font-mono break-all">https://earnwatch.com/ref/JOHN123</p>
                    </div>
                    <Button className="mt-4">Copy Referral Link</Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{userStats.referrals}</div>
                      <div className="text-sm text-gray-600">Total Referrals</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">$24.50</div>
                      <div className="text-sm text-gray-600">Referral Earnings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">8</div>
                      <div className="text-sm text-gray-600">Active This Month</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <input type="text" value={user.name} className="w-full mt-1 p-2 border rounded-md" readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input type="email" value={user.email} className="w-full mt-1 p-2 border rounded-md" readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Member Since</label>
                    <input
                      type="text"
                      value={new Date(user.joinDate).toLocaleDateString()}
                      className="w-full mt-1 p-2 border rounded-md"
                      readOnly
                    />
                  </div>
                  <Button>Update Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">PayPal Email</label>
                    <input
                      type="email"
                      placeholder="Enter PayPal email"
                      className="w-full mt-1 p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Minimum Withdrawal</label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option value="25">$25 (Recommended)</option>
                      <option value="50">$50</option>
                      <option value="100">$100</option>
                      <option value="250">$250</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email notifications</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
