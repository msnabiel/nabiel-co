"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CandlestickChartIcon } from "lucide-react"
const PRODUCTS = [
  {
    id: "lavender-bliss",
    name: "Lavender Bliss",
    price: 399,
    tag: "Relaxing",
    description:
      "Experience calm with our lavender-scented candle. Hand-poured with 100% soy wax and essential oils.",
  },
  {
    id: "vanilla-drift",
    name: "Vanilla Drift",
    price: 349,
    tag: "Sweet",
    description:
      "A warm vanilla aroma to sweeten your space. Made with love and all-natural ingredients.",
  },
  {
    id: "citrus-bloom",
    name: "Citrus Bloom",
    price: 379,
    tag: "Fresh",
    description:
      "Uplift your mood with this vibrant citrus blend. Clean burn, long-lasting joy.",
  },
]

export default function ProductPage() {
  const { id } = useParams()
  const product = PRODUCTS.find((p) => p.id === id)

  const [quantity, setQuantity] = useState(1)
  const [imageError, setImageError] = useState(false)

  if (!product) return <div className="p-6">Product not found.</div>

  const handleAddToCart = () => {
    alert(`${quantity} × ${product.name} added to cart.`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-neutral-800">
  <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          {imageError ? (
            <div className="flex items-center justify-center h-[300px] bg-gray-100 text-gray-400 rounded-xl">
              <CandlestickChartIcon className="w-12 h-12" />
            </div>
          ) : (
            <img
              src={`https://source.unsplash.com/600x400/?candle,${product.name}`}
              alt={product.name}
              className="rounded-xl"
              onError={() => setImageError(true)}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <p className="text-lg font-semibold">₹{product.price}</p>
          </div>

          {/* Quantity + Button */}
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
              className="w-20"
            />
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
