"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, ArrowRight, DollarSign, Clock, CheckCircle } from "lucide-react"

export function WithdrawalButton({ userBalance = 0 }: { userBalance?: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const minWithdrawal = 25
  const canWithdraw = userBalance >= minWithdrawal

  return (
    <div className="relative">
      {/* Main Withdrawal Button */}
      <Link href="/withdrawal">
        <Button
          variant={canWithdraw ? "success" : "outline"}
          animation={canWithdraw ? "glow" : "none"}
          className={`h-14 px-6 text-white font-semibold ${canWithdraw ? "" : "cursor-not-allowed opacity-60"}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={!canWithdraw}
        >
          {/* Content */}
          <div className="relative flex items-center gap-3">
            {/* Icon Container */}
            <div
              className={`p-2 rounded-full bg-white/20 transform transition-all duration-300 ${
                isHovered ? "rotate-12 scale-110" : "rotate-0 scale-100"
              }`}
            >
              <Wallet className="w-5 h-5" />
            </div>

            {/* Text Content */}
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">Withdraw</span>
                {canWithdraw && (
                  <ArrowRight
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      isHovered ? "translate-x-1" : "translate-x-0"
                    }`}
                  />
                )}
              </div>
              <div className="text-sm opacity-90">${userBalance.toFixed(2)} available</div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="absolute -top-2 -right-2">
            {canWithdraw ? (
              <Badge className="bg-green-400 text-green-900 badge-3d">
                <CheckCircle className="w-3 h-3 mr-1" />
                Ready
              </Badge>
            ) : (
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 badge-3d">
                <Clock className="w-3 h-3 mr-1" />${minWithdrawal} min
              </Badge>
            )}
          </div>
        </Button>
      </Link>

      {/* Floating Money Icons */}
      {canWithdraw && isHovered && (
        <>
          <DollarSign className="absolute -top-3 left-2 w-4 h-4 text-green-500 animate-bounce" />
          <DollarSign className="absolute -top-2 right-4 w-3 h-3 text-green-400 animate-bounce delay-100" />
          <DollarSign className="absolute top-1 -right-3 w-3 h-3 text-green-600 animate-bounce delay-200" />
        </>
      )}

      {/* Progress Bar for Min Withdrawal */}
      {!canWithdraw && userBalance > 0 && (
        <div className="absolute -bottom-8 left-0 right-0">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min((userBalance / minWithdrawal) * 100, 100)}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1 text-center">
            ${(minWithdrawal - userBalance).toFixed(2)} more to withdraw
          </div>
        </div>
      )}
    </div>
  )
}
