"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Shield, CheckCircle, AlertTriangle, DollarSign } from "lucide-react"

export default function AccountActivationPage() {
  const [paymentMethod, setPaymentMethod] = useState("paypal")
  const [paymentData, setPaymentData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  const activationFee = 2.99
  const processingFee = 0.3
  const totalAmount = activationFee + processingFee

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))
      alert("Account activated successfully! You can now start earning money.")
      // Redirect to dashboard
    } catch (error) {
      alert("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <h1 className="text-2xl font-bold text-purple-600">EarnWatch</h1>
            </Link>
            <Badge className="bg-orange-100 text-orange-800">Account Activation Required</Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Activate Your Account</h1>
          <p className="text-xl text-gray-600">
            Complete your account activation to start earning money by watching videos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Why Activation Fee */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                Why is there an activation fee?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Prevent Spam Accounts</h4>
                  <p className="text-sm text-gray-600">
                    The activation fee helps us prevent fake accounts and ensures serious users only.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Platform Maintenance</h4>
                  <p className="text-sm text-gray-600">
                    Helps cover server costs, payment processing, and platform improvements.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Higher Quality Experience</h4>
                  <p className="text-sm text-gray-600">
                    Ensures better video content and faster payment processing for all users.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                <h4 className="font-medium text-green-800 mb-2">💰 Earn Back Your Fee Quickly!</h4>
                <p className="text-sm text-green-700">
                  Most users earn back their activation fee within the first week by watching just 12-15 videos.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Activation Payment</CardTitle>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span>Activation Fee:</span>
                  <span className="font-medium">${activationFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Processing Fee:</span>
                  <span className="font-medium">${processingFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-blue-300 mt-2 pt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-lg">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <Label className="text-base font-medium">Payment Method</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`p-4 border rounded-lg text-center ${
                        paymentMethod === "paypal" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}
                    >
                      <div className="font-medium">PayPal</div>
                      <div className="text-sm text-gray-600">Quick & Secure</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-4 border rounded-lg text-center ${
                        paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                      }`}
                    >
                      <div className="font-medium">Credit Card</div>
                      <div className="text-sm text-gray-600">Visa, MasterCard</div>
                    </button>
                  </div>
                </div>

                {/* PayPal Payment */}
                {paymentMethod === "paypal" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="paypalEmail">PayPal Email</Label>
                      <Input
                        id="paypalEmail"
                        type="email"
                        placeholder="Enter your PayPal email"
                        value={paymentData.email}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Credit Card Payment */}
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        type="text"
                        placeholder="Full name on card"
                        value={paymentData.name}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData((prev) => ({ ...prev, cardNumber: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) => setPaymentData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-gray-900">Secure Payment</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Your payment information is encrypted and secure. We never store your payment details.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    "Processing Payment..."
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Activate Account - ${totalAmount.toFixed(2)}
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>By completing this payment, you agree to our Terms of Service.</p>
                  <p className="mt-1">
                    Need help?{" "}
                    <Link href="/contact" className="text-purple-600 hover:underline">
                      Contact Support
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Success Stories */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What Our Users Say</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 italic">
                  "I earned back my activation fee in just 5 days! Now I make $30-50 per week easily."
                </p>
                <p className="text-xs text-gray-500 mt-2">- Sarah M.</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 italic">
                  "The activation fee was worth it. No spam, quality videos, and payments are always on time."
                </p>
                <p className="text-xs text-gray-500 mt-2">- Mike R.</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Best decision I made! The platform is professional and I've earned over $200 so far."
                </p>
                <p className="text-xs text-gray-500 mt-2">- Jennifer L.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
