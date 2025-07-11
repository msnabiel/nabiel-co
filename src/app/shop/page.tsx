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
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Flame, ShoppingCart, SlidersHorizontal } from "lucide-react"
import { products as PRODUCTS } from "@/data/products"
import { useCart } from "@/lib/hooks/useCart"
import type { Product } from "@/data/products"

export default function ShopPage() {
  const [imageError, setImageError] = useState<Record<number, boolean>>({})
  const [query, setQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [sortOption, setSortOption] = useState<"low" | "high" | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const { addToCart } = useCart()
const [addedProductId, setAddedProductId] = useState<number | null>(null)

const handleAddToCart = (product: Product) => {
  addToCart(product)
  setAddedProductId(product.id)
  setTimeout(() => {
    setAddedProductId(null)
  }, 1000) // show animation for 1 sec
}

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
    <div className="min-h-screen px-3 py-6 bg-gradient-to-b from-amber-50 to-white text-neutral-800">
      <header className="text-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">🕯️ Shop Scented Candles</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Handcrafted soy candles for a cozy vibe.
        </p>
      </header>

      {/* Search + Filter */}
      <div className="flex items-center justify-between gap-2 max-w-4xl mx-auto mb-4">
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
  <div className="bg-white border rounded-md p-4 shadow-sm max-w-4xl mx-auto mb-4 text-sm space-y-4 sm:space-y-2">
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
          variant="destructive"
          size="sm"
          onClick={() => setSortOption(null)}
        >
          <Trash2 className="w-4 h-4" />
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
        variant="destructive"
        size="sm"
        onClick={() => setMaxPrice(null)}
      >
        Clear
      </Button>
    </div>
  </div>
)}

      

{/* Product Grid - Mobile Optimized */}
      <div className="max-w-6xl mx-auto">
        {/* Mobile: Compact Horizontal List */}
        <div className="sm:hidden divide-y divide-muted">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center gap-3 py-3 cursor-pointer"
              onClick={() => window.location.href = `/product/${product.slug}`}
            >
              {/* Image */}
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                {imageError[product.id] ? (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    <Flame className="w-5 h-5" />
                  </div>
                ) : (
                  <img
                    src={
                      product.images?.[0] ||
                      `https://source.unsplash.com/300x200/?candle,${product.name}`
                    }
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={() =>
                      setImageError((prev) => ({ ...prev, [product.id]: true }))
                    }
                  />
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{truncate(product.name, 35)}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {product.description ?? "100% soy wax"}
                </p>
                <p className="text-sm font-semibold mt-1">₹{product.price}</p>
              </div>

              {/* Cart Button */}
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  handleAddToCart(product)
                }}
                size="icon"
                variant={addedProductId === product.id ? "default" : "outline"}
                className={`h-8 w-8 ${
                  addedProductId === product.id ? "bg-black text-white" : ""
                }`}
                disabled={addedProductId === product.id}
              >
                {addedProductId === product.id ? (
                  <Flame className="w-4 h-4 animate-pulse" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/product/${product.slug}`} className="group">
              <Card className="flex flex-col justify-between cursor-pointer hover:shadow-sm transition text-sm h-[280px] md:h-[320px]">
                <CardHeader className="pb-2 h-[60px] md:h-[72px] overflow-hidden">
                  <CardTitle className="text-sm md:text-base">
                    {truncate(product.name, 30)}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {truncate(product.description ?? "100% soy wax", 50)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between h-[160px] md:h-[180px]">
                  {imageError[product.id] ? (
                    <div className="flex items-center justify-center h-[100px] md:h-[120px] bg-gray-100 rounded-md text-gray-400 mb-2">
                      <Flame className="w-6 h-6" />
                    </div>
                  ) : (
                    <img
                      src={
                        product.images?.[0] ||
                        `https://source.unsplash.com/300x200/?candle,${product.name}`
                      }
                      alt={product.name}
                      className="rounded-md mb-2 object-contain w-full h-[100px] md:h-[120px]"
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
                        handleAddToCart(product)
                      }}
                      size="sm"
                      className={`text-xs transition-all duration-300 ${
                        addedProductId === product.id ? "bg-black text-white" : ""
                      }`}
                      disabled={addedProductId === product.id}
                    >
                      {addedProductId === product.id ? (
                        <>
                          <Flame className="w-4 h-4 mr-1 animate-pulse" />
                          Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Add
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No candles found matching your search.
          </div>
        )}
      </div>
    </div>
  )
}