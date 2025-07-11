// lib/hooks/useCart.ts
import { useEffect, useState, useCallback } from "react"
import { toast } from "sonner"
import { products as PRODUCTS } from "@/data/products"

type Product = typeof PRODUCTS[number]
export type CartItem = Product & { quantity: number }

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      try {
        const parsed = JSON.parse(stored).map((item: any) => ({
          ...item,
          id: Number(item.id),
        }))
        setCart(parsed)
      } catch {
        localStorage.removeItem("cart")
      }
    }
    setIsLoaded(true)
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  // Add to cart
  const addToCart = useCallback((product: Product) => {
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
  }, [])

  return {
    cart,
    addToCart,
    setCart,
  }
}
