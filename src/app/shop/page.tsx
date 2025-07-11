"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Flame, ShoppingCart, SlidersHorizontal } from "lucide-react"
import { products as PRODUCTS } from "@/data/products"
import { useCart } from "@/lib/hooks/useCart"

export default function ShopPage() {
  const [imageError, setImageError] = useState<Record<number, boolean>>({})
  const [query, setQuery] = useState("")
  const { addToCart } = useCart()

  const filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description?.toLowerCase().includes(query.toLowerCase())
  )
  function truncate(text: string, maxLength: number) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-b from-amber-50 to-white text-neutral-800">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">🕯️ Shop Scented Candles</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Handcrafted soy candles for a cozy vibe.
        </p>
      </header>

      {/* Search + Filter */}
      <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto mb-6">
        <Input
          type="text"
          placeholder="Search candles..."
          className="flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.slug}`} className="group">
            <Card className="flex flex-col justify-between cursor-pointer hover:shadow-sm transition text-sm sm:text-base h-[320px]">
  <CardHeader className="pb-2 h-[72px] overflow-hidden">
    <CardTitle className="text-base sm:text-lg">
      {truncate(product.name, 30)}
    </CardTitle>
    <CardDescription className="text-xs text-muted-foreground">
      {truncate(product.description ?? "100% soy wax", 50)}
    </CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col justify-between h-[180px]">
    {imageError[product.id] ? (
      <div className="flex items-center justify-center h-[120px] bg-gray-100 rounded-md text-gray-400 mb-2">
        <Flame className="w-6 h-6" />
      </div>
    ) : (
      <img
        src={
          product.images?.[0] ||
          `https://source.unsplash.com/300x200/?candle,${product.name}`
        }
        alt={product.name}
        className="rounded-md mb-2 object-contain w-full h-[120px]"
        onError={() =>
          setImageError((prev) => ({ ...prev, [product.id]: true }))
        }
      />
    )}
    <div className="flex items-center justify-between">
      <p className="font-medium">₹{product.price}</p>
      <Button
        onClick={(e) => {
          e.preventDefault()
          addToCart(product)
        }}
        size="sm"
        className="text-xs"
      >
        <ShoppingCart className="w-4 h-4 mr-1" />
        Add
      </Button>
    </div>
  </CardContent>
</Card>

          </Link>
        ))}

        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No candles found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}
