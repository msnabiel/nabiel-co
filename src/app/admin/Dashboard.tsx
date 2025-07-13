"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) toast.error("Failed to fetch orders")
      else setOrders(data)
    }

    fetchOrders()
  }, [])

  const updateStatus = async (id: number, status: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)

    if (error) toast.error("Update failed")
    else {
      toast.success("Status updated")
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      )
    }
  }

  const filtered = orders.filter((o) =>
    o.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Admin Dashboard</h1>

      <Input
        placeholder="Search by email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />

      <div className="grid gap-4">
        {filtered.map((order) => (
          <Card key={order.id}>
            <CardContent className="p-4 space-y-2">
              <p><strong>{order.name}</strong> — {order.email}</p>
              <p>Total: ₹{order.total}</p>
              <p>Status: {order.status}</p>

              <div className="flex gap-2">
                <Button onClick={() => updateStatus(order.id, "shipped")}>
                  Mark as Shipped
                </Button>
                <Button onClick={() => updateStatus(order.id, "delivered")} variant="outline">
                  Mark as Delivered
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
