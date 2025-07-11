"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("https://formspree.io/f/abcxyz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        toast.success("You're in! 🎉 Check your inbox for 10% off.")
        setEmail("")
      } else {
        toast.error("Something went wrong. Please try again.")
      }
    } catch (err) {
      toast.error("Network error.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-amber-50 p-6 rounded-2xl shadow-md max-w-xl mx-auto my-12">
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
        <Button type="submit" disabled={loading || !email}>
          {loading ? "Joining..." : "Join Now"}
        </Button>
      </form>
    </section>
  )
}
