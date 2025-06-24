"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Headphones, Clock, Users } from "lucide-react"

export function FloatingSupport() {
  const [isOpen, setIsOpen] = useState(false)

  const supportStats = [
    { label: "Response Time", value: "< 5 min", icon: Clock },
    { label: "Support Agents", value: "24/7", icon: Users },
    { label: "Satisfaction", value: "98%", icon: Headphones },
  ]

  return (
    <>
      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulse Animation */}
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-50"></div>

          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="info"
            animation="glow"
            className="relative rounded-full w-16 h-16 shadow-2xl"
            size="lg"
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </Button>

          {/* Online Badge */}
          <div className="absolute -top-2 -right-2">
            <Badge className="bg-green-500 text-white text-xs px-2 py-1 rounded-full badge-3d animate-bounce">
              Online
            </Badge>
          </div>
        </div>
      </div>

      {/* Support Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 animate-in slide-in-from-bottom-5 duration-300">
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm card-3d">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Headphones className="w-5 h-5" />
                Customer Support
              </CardTitle>
              <p className="text-blue-100 text-sm">We're here to help you 24/7</p>
            </CardHeader>

            <CardContent className="p-6">
              {/* Support Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {supportStats.map((stat, index) => (
                  <div key={index} className="text-center card-3d p-2 rounded-lg">
                    <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <stat.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="text-xs font-semibold text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Contact Options */}
              <div className="space-y-3">
                <a href="https://t.me/earnwatch_support" target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="info" animation="pulse" className="w-full flex items-center gap-3 h-12">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Send className="w-4 h-4" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">Telegram Support</div>
                      <div className="text-xs opacity-90">Instant messaging</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-500 text-white badge-3d">
                      Fast
                    </Badge>
                  </Button>
                </a>

                <a href="mailto:support@earnwatch.com" className="block">
                  <Button variant="outline" animation="morph" className="w-full flex items-center gap-3 h-12 border-2">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <MessageCircle className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-semibold">Email Support</div>
                      <div className="text-xs text-gray-500">support@earnwatch.com</div>
                    </div>
                  </Button>
                </a>

                <Button
                  variant="ghost"
                  animation="float"
                  className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                  onClick={() => {
                    // Open FAQ or Help Center
                    window.open("/help", "_blank")
                  }}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Browse Help Center
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t">
                <p className="text-xs text-gray-500 mb-2">Quick Actions:</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" animation="ripple" className="text-xs">
                    Withdrawal Help
                  </Button>
                  <Button size="sm" variant="outline" animation="ripple" className="text-xs">
                    Account Issues
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
