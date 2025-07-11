"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const router = useRouter()

  // Load cart from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCart(parsed)
        console.log("Cart loaded:", parsed)
      } catch (err) {
        console.error("Invalid cart format", err)
        localStorage.removeItem("cart")
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
    toast("Removed from cart.")
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm">
          Your cart is empty. Start exploring our candles 🕯️
        </p>
      ) : (
        <div className="space-y-6 max-w-2xl mx-auto">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row md:items-center justify-between border-b pb-4 gap-4"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-muted-foreground">
                  ₹{item.price} × {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                  className="w-20"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <div className="text-right text-lg font-medium mt-4">
            Total: ₹{total}
          </div>

          <Button
            className="w-full bg-amber-500 hover:bg-amber-600 text-white"
            onClick={() => router.push("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </main>
  )
}
