// lib/hooks/useCart.ts
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { FlattenedVariant } from "@/data/products"

export type CartItem = FlattenedVariant & { quantity: number }

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCart(parsed)
      } catch {
        localStorage.removeItem("cart")
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = useCallback((product: FlattenedVariant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })

    toast.success(`${product.parentName} (${product.name}) added to cart`)
  }, [])

  return {
    cart,
    addToCart,
    setCart,
  }
}
