"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

const statusSteps = [
  { label: "Processing", emoji: "🟡" },
  { label: "Shipped", emoji: "📦" },
  { label: "Out for Delivery", emoji: "🚚" },
  { label: "Delivered", emoji: "✅" },
]

export default function OrdersPage() {
  const [email, setEmail] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [order, setOrder] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  const sendOtp = async () => {
  if (!email.includes("@")) return toast.error("Enter valid email")
  setLoading(true)

  const res = await fetch("/api/send-otp", {
    method: "POST",
    body: JSON.stringify({ email }),
  })

  const json = await res.json()
  if (!res.ok) {
    toast.error(json.error || "Failed to send OTP")
  } else {
    toast.success(`OTP sent to ${email}`)
    setOtpSent(true)
  }

  setLoading(false)
}


  const verifyOtp = async () => {
    if (!otp.trim()) return toast.error("Enter OTP")
    setLoading(true)

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("email", email)
      .eq("otp", otp)
      .gte("otp_expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error || !data) {
      toast.error("Invalid or expired OTP")
    } else {
      setOrder(data)
    }

    setLoading(false)
  }

  const getStepIndex = (status: string) => {
    return statusSteps.findIndex((s) =>
      s.label.toLowerCase().replace(/ /g, "_") === status.toLowerCase()
    )
  }

  return (
<main className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-neutral-800 px-4 py-16 sm:px-6 md:px-8">
  <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">🔐 Secure Order Lookup</h1>

      {!order && (
        <>
          {!otpSent ? (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={sendOtp} disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Input
                placeholder="Enter OTP sent to email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button onClick={verifyOtp} disabled={loading}>
                {loading ? "Verifying..." : "Verify & View Order"}
              </Button>
            </div>
          )}
        </>
      )}

      {order && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Total:</strong> ₹{order.total}</p>
              <p><strong>Address:</strong> {order.address}, {order.city} - {order.zip}</p>
            </div>

            <div className="mt-4">
              <p className="font-semibold mb-2">📦 Order Status</p>
              <div className="flex items-center gap-2 text-sm flex-wrap">
                {statusSteps.map((step, i) => (
                  <div
                    key={step.label}
                    className={cn(
                      "flex items-center gap-1",
                      i <= getStepIndex(order.status || "") ? "text-amber-600 font-semibold" : "text-muted-foreground"
                    )}
                  >
                    <span>{step.emoji}</span>
                    <span>{step.label}</span>
                    {i < statusSteps.length - 1 && <span className="mx-1">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold mt-4">🕯️ Items</p>
              <ul className="list-disc pl-6 text-sm">
                {order.cart.map((item: any, i: number) => (
                  <li key={i}>
                    {item.name} × {item.quantity} — ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
      </div>
    </main>
  )
}
