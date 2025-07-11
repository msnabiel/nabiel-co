"use client"
import Link from "next/link"
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
import { products as PRODUCTS } from "@/data/products" // ✅ shared import

type CartItem = typeof PRODUCTS[number] & { quantity: number }

export default function ShopPage() {
  const [imageError, setImageError] = useState<Record<number, boolean>>({})
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

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

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }, [cart, isLoaded])

  const addToCart = (product: typeof PRODUCTS[number]) => {
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {PRODUCTS.map((product) => (
  <Link key={product.id} href={`/product/${product.slug}`} className="group">
    <Card className="flex flex-col justify-between cursor-pointer hover:shadow-md transition">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>
          {product.description ?? "100% soy wax"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {imageError[product.id] ? (
          <div className="flex items-center justify-center h-[200px] bg-gray-100 rounded-xl text-gray-400 mb-4">
            <Flame className="w-10 h-10" />
          </div>
        ) : (
          <img
            src={
              product.images?.[0] ||
              `https://source.unsplash.com/400x300/?candle,${product.name}`
            }
            alt={product.name}
            className="rounded-xl mb-4"
            onError={() =>
              setImageError((prev) => ({ ...prev, [product.id]: true }))
            }
          />
        )}
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">₹{product.price}</p>
          <Button
            onClick={(e) => {
              e.preventDefault() // prevent Link click
              addToCart(product)
            }}
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-1" /> Add
          </Button>
        </div>
      </CardContent>
    </Card>
  </Link>
))}
      </div>
    </div>
  )
}   
