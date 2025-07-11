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
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<any | null>(null)

  const handleSearch = async () => {
    if (!query.trim()) return toast.error("Enter order ID or email")

    setLoading(true)
    setOrder(null)

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("email", query)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error || !data) {
      toast.error("Order not found")
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
    <main className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">🔍 Track Your Order</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Input
          placeholder="Enter order ID or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

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

            {/* Status Tracker */}
            <div className="mt-4">
              <p className="font-semibold mb-2">📦 Order Status</p>
              <div className="flex items-center gap-2 text-sm">
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

            {/* Items */}
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
    </main>
  )
}
