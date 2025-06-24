"use client"

import { useState, useEffect } from "react"
import { DollarSign, Play, Eye, Zap } from "lucide-react"

interface AnimatedLogoProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export function AnimatedLogo({ size = "medium", className = "" }: AnimatedLogoProps) {
  const [currentIcon, setCurrentIcon] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const icons = [DollarSign, Play, Eye, Zap]
  const colors = ["text-green-500", "text-blue-500", "text-purple-500", "text-yellow-500"]

  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-12 h-12",
    large: "w-20 h-20",
  }

  const containerSizes = {
    small: "w-10 h-10",
    medium: "w-16 h-16",
    large: "w-24 h-24",
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const CurrentIcon = icons[currentIcon]

  return (
    <div
      className={`relative ${containerSizes[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Spinning Background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 via-blue-500 to-green-500 animate-spin opacity-75"></div>

      {/* Inner Circle */}
      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center shadow-lg">
        {/* Main Icon */}
        <CurrentIcon
          className={`${sizeClasses[size]} ${colors[currentIcon]} transition-all duration-500 transform ${
            isHovered ? "scale-110 rotate-12" : "scale-100 rotate-0"
          }`}
        />
      </div>

      {/* Floating Particles */}
      {isHovered && (
        <>
          <DollarSign className="absolute -top-2 -right-2 w-4 h-4 text-green-500 animate-bounce" />
          <Play className="absolute -bottom-2 -left-2 w-3 h-3 text-blue-500 animate-bounce delay-100" />
          <Eye className="absolute -top-2 -left-2 w-3 h-3 text-purple-500 animate-bounce delay-200" />
          <Zap className="absolute -bottom-2 -right-2 w-4 h-4 text-yellow-500 animate-bounce delay-300" />
        </>
      )}

      {/* Pulse Ring */}
      <div className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping opacity-20"></div>
    </div>
  )
}
