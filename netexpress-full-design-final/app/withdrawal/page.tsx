"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, CreditCard, Smartphone, Building, AlertCircle, CheckCircle } from "lucide-react"

const paymentMethods = [
  {
    id: "bkash",
    name: "bKash",
    type: "Mobile Banking",
    icon: "📱",
    color: "bg-pink-100 text-pink-600 border-pink-200",
    fee: "৳30",
    processingTime: "Instant - 2 hours",
    minAmount: 500, // BDT
    maxAmount: 25000, // BDT
    description: "Send money directly to your bKash account",
    fields: ["bkash_number"],
  },
  {
    id: "nagad",
    name: "Nagad",
    type: "Mobile Banking",
    icon: "📲",
    color: "bg-orange-100 text-orange-600 border-orange-200",
    fee: "৳25",
    processingTime: "Instant - 2 hours",
    minAmount: 500,
    maxAmount: 25000,
    description: "Receive payments in your Nagad wallet",
    fields: ["nagad_number"],
  },
  {
    id: "rocket",
    name: "Rocket",
    type: "Mobile Banking",
    icon: "🚀",
    color: "bg-purple-100 text-purple-600 border-purple-200",
    fee: "৳35",
    processingTime: "2-6 hours",
    minAmount: 500,
    maxAmount: 20000,
    description: "Transfer to your Rocket mobile wallet",
    fields: ["rocket_number"],
  },
  {
    id: "bank",
    name: "Bank Transfer",
    type: "Local Banks",
    icon: "🏦",
    color: "bg-blue-100 text-blue-600 border-blue-200",
    fee: "৳50",
    processingTime: "24-48 hours",
    minAmount: 1000,
    maxAmount: 100000,
    description: "Direct transfer to your bank account",
    fields: ["bank_name", "account_number", "account_holder", "routing_number"],
  },
  {
    id: "paypal",
    name: "PayPal",
    type: "International",
    icon: "💳",
    color: "bg-blue-100 text-blue-600 border-blue-200",
    fee: "$1.99",
    processingTime: "24-48 hours",
    minAmount: 25, // USD
    maxAmount: 1000, // USD
    description: "International PayPal transfer",
    fields: ["paypal_email"],
  },
]

const bangladeshiBanks = [
  "Sonali Bank",
  "Janata Bank",
  "Agrani Bank",
  "Rupali Bank",
  "BASIC Bank",
  "Bangladesh Development Bank",
  "Dutch-Bangla Bank (DBBL)",
  "Islami Bank Bangladesh",
  "Southeast Bank",
  "BRAC Bank",
  "Eastern Bank",
  "Prime Bank",
  "Standard Chartered Bank",
  "HSBC Bangladesh",
  "City Bank",
  "Mutual Trust Bank",
  "United Commercial Bank",
  "National Bank",
  "Mercantile Bank",
  "Pubali Bank",
]

export default function WithdrawalPage() {
  const [selectedMethod, setSelectedMethod] = useState("")
  const [withdrawalData, setWithdrawalData] = useState({
    amount: "",
    currency: "BDT",
    bkash_number: "",
    nagad_number: "",
    rocket_number: "",
    bank_name: "",
    account_number: "",
    account_holder: "",
    routing_number: "",
    paypal_email: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock user balance
  const userBalance = 127.45 // USD
  const userBalanceBDT = userBalance * 110 // Approximate conversion

  const selectedPaymentMethod = paymentMethods.find((method) => method.id === selectedMethod)

  const handleInputChange = (field: string, value: string) => {
    setWithdrawalData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!selectedMethod) {
      newErrors.method = "Please select a payment method"
    }

    if (!withdrawalData.amount) {
      newErrors.amount = "Amount is required"
    } else {
      const amount = Number.parseFloat(withdrawalData.amount)
      if (selectedPaymentMethod) {
        const minAmount = selectedPaymentMethod.minAmount
        const maxAmount = selectedPaymentMethod.maxAmount
        const currency = selectedMethod === "paypal" ? "USD" : "BDT"
        const balance = currency === "USD" ? userBalance : userBalanceBDT

        if (amount < minAmount) {
          newErrors.amount = `Minimum amount is ${minAmount} ${currency}`
        }
        if (amount > maxAmount) {
          newErrors.amount = `Maximum amount is ${maxAmount} ${currency}`
        }
        if (amount > balance) {
          newErrors.amount = "Insufficient balance"
        }
      }
    }

    // Validate required fields based on selected method
    if (selectedPaymentMethod) {
      selectedPaymentMethod.fields.forEach((field) => {
        if (!withdrawalData[field as keyof typeof withdrawalData]) {
          newErrors[field] = `${field.replace("_", " ")} is required`
        }
      })

      // Additional validations
      if (selectedMethod === "bkash" && withdrawalData.bkash_number) {
        if (!/^01[3-9]\d{8}$/.test(withdrawalData.bkash_number)) {
          newErrors.bkash_number = "Invalid bKash number format"
        }
      }

      if (selectedMethod === "nagad" && withdrawalData.nagad_number) {
        if (!/^01[3-9]\d{8}$/.test(withdrawalData.nagad_number)) {
          newErrors.nagad_number = "Invalid Nagad number format"
        }
      }

      if (selectedMethod === "rocket" && withdrawalData.rocket_number) {
        if (!/^01[3-9]\d{8}$/.test(withdrawalData.rocket_number)) {
          newErrors.rocket_number = "Invalid Rocket number format"
        }
      }

      if (selectedMethod === "paypal" && withdrawalData.paypal_email) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(withdrawalData.paypal_email)) {
          newErrors.paypal_email = "Invalid email format"
        }
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert(
        `Withdrawal request submitted! You will receive ${withdrawalData.amount} ${
          selectedMethod === "paypal" ? "USD" : "BDT"
        } in your ${selectedPaymentMethod?.name} account within ${selectedPaymentMethod?.processingTime}.`,
      )
      // Reset form
      setWithdrawalData({
        amount: "",
        currency: "BDT",
        bkash_number: "",
        nagad_number: "",
        rocket_number: "",
        bank_name: "",
        account_number: "",
        account_holder: "",
        routing_number: "",
        paypal_email: "",
      })
      setSelectedMethod("")
    } catch (error) {
      alert("Failed to submit withdrawal request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

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
                <span className="text-sm font-medium text-green-700">${userBalance.toFixed(2)}</span>
              </div>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Withdraw Your Earnings</h1>
          <p className="text-xl text-gray-600">Choose your preferred payment method and withdraw your money</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Balance & Payment Methods */}
          <div className="lg:col-span-2">
            {/* Balance Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
                  Available Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">${userBalance.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">USD Balance</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">৳{userBalanceBDT.toFixed(0)}</div>
                    <div className="text-sm text-gray-600">BDT Equivalent</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mr-2" />
                    <span className="text-sm text-yellow-800">
                      Exchange rate: 1 USD = 110 BDT (rates may vary at withdrawal)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Select Payment Method</CardTitle>
                <p className="text-gray-600">Choose how you want to receive your money</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 border-2 rounded-lg text-left transition-all ${
                        selectedMethod === method.id
                          ? `${method.color} shadow-md`
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{method.icon}</span>
                          <div>
                            <h3 className="font-semibold">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.type}</p>
                          </div>
                        </div>
                        {selectedMethod === method.id && <CheckCircle className="w-5 h-5 text-green-600" />}
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <p>Fee: {method.fee}</p>
                        <p>Time: {method.processingTime}</p>
                        <p>
                          Limit: {method.minAmount}-{method.maxAmount} {method.id === "paypal" ? "USD" : "BDT"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                {errors.method && <p className="text-red-500 text-sm mb-4">{errors.method}</p>}

                {/* Withdrawal Form */}
                {selectedPaymentMethod && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-blue-800 mb-2">{selectedPaymentMethod.name} Withdrawal</h4>
                      <p className="text-sm text-blue-700">{selectedPaymentMethod.description}</p>
                    </div>

                    {/* Amount */}
                    <div>
                      <Label htmlFor="amount">
                        Withdrawal Amount ({selectedMethod === "paypal" ? "USD" : "BDT"}) *
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder={`Min: ${selectedPaymentMethod.minAmount}, Max: ${selectedPaymentMethod.maxAmount}`}
                        value={withdrawalData.amount}
                        onChange={(e) => handleInputChange("amount", e.target.value)}
                        className={errors.amount ? "border-red-500" : ""}
                      />
                      {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                    </div>

                    {/* Dynamic Fields Based on Payment Method */}
                    {selectedMethod === "bkash" && (
                      <div>
                        <Label htmlFor="bkash_number">bKash Number *</Label>
                        <Input
                          id="bkash_number"
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          value={withdrawalData.bkash_number}
                          onChange={(e) => handleInputChange("bkash_number", e.target.value)}
                          className={errors.bkash_number ? "border-red-500" : ""}
                        />
                        {errors.bkash_number && <p className="text-red-500 text-xs mt-1">{errors.bkash_number}</p>}
                      </div>
                    )}

                    {selectedMethod === "nagad" && (
                      <div>
                        <Label htmlFor="nagad_number">Nagad Number *</Label>
                        <Input
                          id="nagad_number"
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          value={withdrawalData.nagad_number}
                          onChange={(e) => handleInputChange("nagad_number", e.target.value)}
                          className={errors.nagad_number ? "border-red-500" : ""}
                        />
                        {errors.nagad_number && <p className="text-red-500 text-xs mt-1">{errors.nagad_number}</p>}
                      </div>
                    )}

                    {selectedMethod === "rocket" && (
                      <div>
                        <Label htmlFor="rocket_number">Rocket Number *</Label>
                        <Input
                          id="rocket_number"
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          value={withdrawalData.rocket_number}
                          onChange={(e) => handleInputChange("rocket_number", e.target.value)}
                          className={errors.rocket_number ? "border-red-500" : ""}
                        />
                        {errors.rocket_number && <p className="text-red-500 text-xs mt-1">{errors.rocket_number}</p>}
                      </div>
                    )}

                    {selectedMethod === "bank" && (
                      <>
                        <div>
                          <Label htmlFor="bank_name">Bank Name *</Label>
                          <Select
                            value={withdrawalData.bank_name}
                            onValueChange={(value) => handleInputChange("bank_name", value)}
                          >
                            <SelectTrigger className={errors.bank_name ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select your bank" />
                            </SelectTrigger>
                            <SelectContent>
                              {bangladeshiBanks.map((bank) => (
                                <SelectItem key={bank} value={bank}>
                                  {bank}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.bank_name && <p className="text-red-500 text-xs mt-1">{errors.bank_name}</p>}
                        </div>

                        <div>
                          <Label htmlFor="account_holder">Account Holder Name *</Label>
                          <Input
                            id="account_holder"
                            type="text"
                            placeholder="Full name as per bank records"
                            value={withdrawalData.account_holder}
                            onChange={(e) => handleInputChange("account_holder", e.target.value)}
                            className={errors.account_holder ? "border-red-500" : ""}
                          />
                          {errors.account_holder && (
                            <p className="text-red-500 text-xs mt-1">{errors.account_holder}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="account_number">Account Number *</Label>
                          <Input
                            id="account_number"
                            type="text"
                            placeholder="Bank account number"
                            value={withdrawalData.account_number}
                            onChange={(e) => handleInputChange("account_number", e.target.value)}
                            className={errors.account_number ? "border-red-500" : ""}
                          />
                          {errors.account_number && (
                            <p className="text-red-500 text-xs mt-1">{errors.account_number}</p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="routing_number">Routing Number (Optional)</Label>
                          <Input
                            id="routing_number"
                            type="text"
                            placeholder="Bank routing number"
                            value={withdrawalData.routing_number}
                            onChange={(e) => handleInputChange("routing_number", e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    {selectedMethod === "paypal" && (
                      <div>
                        <Label htmlFor="paypal_email">PayPal Email *</Label>
                        <Input
                          id="paypal_email"
                          type="email"
                          placeholder="your@paypal.com"
                          value={withdrawalData.paypal_email}
                          onChange={(e) => handleInputChange("paypal_email", e.target.value)}
                          className={errors.paypal_email ? "border-red-500" : ""}
                        />
                        {errors.paypal_email && <p className="text-red-500 text-xs mt-1">{errors.paypal_email}</p>}
                      </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Request Withdrawal
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Processing Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Processing Times</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Smartphone className="w-5 h-5 text-pink-600" />
                  <div>
                    <div className="font-medium text-sm">Mobile Banking</div>
                    <div className="text-xs text-gray-600">Instant - 2 hours</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">Bank Transfer</div>
                    <div className="text-xs text-gray-600">24-48 hours</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-sm">PayPal</div>
                    <div className="text-xs text-gray-600">24-48 hours</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fees */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Processing Fees</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>bKash:</span>
                  <span className="font-medium">৳30</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Nagad:</span>
                  <span className="font-medium">৳25</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Rocket:</span>
                  <span className="font-medium">৳35</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Bank Transfer:</span>
                  <span className="font-medium">৳50</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>PayPal:</span>
                  <span className="font-medium">$1.99</span>
                </div>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>All withdrawals are manually reviewed for security</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Mobile banking numbers must be verified</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                  <span>Bank account names must match your profile</span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                  <span>Exchange rates are updated daily</span>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5" />
                  <span>Minimum withdrawal: $25 USD or ৳500 BDT</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
