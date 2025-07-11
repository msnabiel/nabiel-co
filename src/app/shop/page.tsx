"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Flame, ShoppingCart } from "lucide-react"
import { toast } from "sonner"

type Product = {
  id: number
  name: string
  price: number
  tag: string
}

type CartItem = Product & { quantity: number }

const PRODUCTS: Product[] = [
  { id: 1, name: "Aura Candles", price: 399, tag: "Relaxing" },
  { id: 2, name: "Zen Candles", price: 349, tag: "Sweet" },
  { id: 3, name: "Citrus Bloom", price: 379, tag: "Fresh" },
  { id: 4, name: "Ocean Breeze", price: 359, tag: "Cool" },
  { id: 5, name: "Cinnamon Spice", price: 399, tag: "Warm" },
  { id: 6, name: "Rose Garden", price: 369, tag: "Floral" },
]

export default function ShopPage() {
  const [imageError, setImageError] = useState<Record<number, boolean>>({})
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false) // Track if cart has been loaded

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      try {
        const parsed = JSON.parse(stored).map((item: any) => ({
          ...item,
          id: Number(item.id),
        }))
        setCart(parsed)
        console.log("Loaded cart from localStorage:", parsed)
      } catch (e) {
        console.error("Invalid cart format", e)
        localStorage.removeItem("cart")
      }
    }
    setIsLoaded(true) // Mark as loaded even if no cart data
  }, [])

  // Save cart to localStorage only after it's been loaded and when it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart))
      console.log("Saved cart to localStorage:", cart)
    }
  }, [cart, isLoaded])

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })

    toast.success(`${product.name} added to cart`)
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-b from-amber-50 to-white text-neutral-800">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">🕯️ Shop Scented Candles</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Explore our hand-poured candles made with natural soy wax, pure essential oils, and lots of love.
        </p>
      </header>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {PRODUCTS.map((product: Product) => (
          <Card key={product.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
              <CardDescription>{product.tag} • 100% soy wax</CardDescription>
            </CardHeader>
            <CardContent>
              {imageError[product.id] ? (
                <div className="flex items-center justify-center h-[200px] bg-gray-100 rounded-xl text-gray-400 mb-4">
                  <Flame className="w-10 h-10" />
                </div>
              ) : (
                <img
                  src={`https://source.unsplash.com/400x300/?candle,${product.name}`}
                  alt={product.name}
                  className="rounded-xl mb-4"
                  onError={() =>
                    setImageError((prev) => ({ ...prev, [product.id]: true }))
                  }
                />
              )}

              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">₹{product.price}</p>
                <Button onClick={() => addToCart(product)} size="sm">
                  <ShoppingCart className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="mt-12 max-w-xl mx-auto text-center border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">🛒 Cart Summary</h2>
          <ul className="text-sm text-muted-foreground space-y-1">
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity} – ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-medium text-black">
            Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </p>
        </div>
      )}
    </div>
  )
}