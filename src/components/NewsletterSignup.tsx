"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

const handleSubmit = async () => {
  const res = await fetch("/api/send-coupon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })

  if (res.ok) {
    toast.success("Coupon sent to your inbox! 🎁")
    setEmail("")
  } else {
    toast.error("Failed to send coupon. Try again.")
  }
}


  return (
<section className="bg-amber-50 p-6 sm:p-6 px-4 sm:px-6 rounded-2xl shadow-md max-w-xl mx-auto my-12">
  <h2 className="text-2xl font-semibold mb-2 text-center">
    📧 Join Our Candle Club
  </h2>
  <p className="text-sm text-center mb-4 text-muted-foreground">
    Sign up for updates, early launches & get <strong>10% off</strong> your first order!
  </p>

  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
    <Input
      type="email"
      placeholder="you@example.com"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <Button
      type="submit"
      className="w-full sm:w-auto"
      disabled={loading || !email}
    >
      {loading ? "Joining..." : "Join Now"}
    </Button>
  </form>
</section>

  )
}
