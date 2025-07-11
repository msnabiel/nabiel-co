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
  const [showFilters, setShowFilters] = useState(false)
  const [sortOption, setSortOption] = useState<"low" | "high" | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const { addToCart } = useCart()

  function truncate(text: string, maxLength: number) {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + "…"
  }

  let filteredProducts = PRODUCTS.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description?.toLowerCase().includes(query.toLowerCase())
  )

  if (maxPrice !== null) {
    filteredProducts = filteredProducts.filter((p) => p.price <= maxPrice)
  }

  if (sortOption === "low") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortOption === "high") {
    filteredProducts.sort((a, b) => b.price - a.price)
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
        <Button variant="outline" size="icon" onClick={() => setShowFilters((prev) => !prev)}>
          <SlidersHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Filter Dropdown */}
      {showFilters && (
  <div className="bg-white border rounded-md p-4 shadow-sm max-w-4xl mx-auto mb-6 text-sm space-y-4 sm:space-y-2">
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <label className="font-medium">Sort by:</label>
      <div className="flex flex-wrap gap-2">
        <Button
          variant={sortOption === "low" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortOption("low")}
        >
          Price: Low to High
        </Button>
        <Button
          variant={sortOption === "high" ? "default" : "outline"}
          size="sm"
          onClick={() => setSortOption("high")}
        >
          Price: High to Low
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSortOption(null)}
        >
          Reset
        </Button>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <label className="font-medium">Max Price:</label>
      <Input
        type="number"
        placeholder="e.g. 500"
        className="w-full sm:w-24"
        value={maxPrice ?? ""}
        onChange={(e) => {
          const val = parseInt(e.target.value)
          setMaxPrice(isNaN(val) ? null : val)
        }}
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setMaxPrice(null)}
      >
        Clear
      </Button>
    </div>
  </div>
)}


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
