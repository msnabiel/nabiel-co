"use client"

import Link from "next/link"
import { Flame, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Variant = {
  id: number
  name: string
  slug: string
  price: number
  description?: string
  images?: string[]
  type: string
  parentName: string
}

type Props = {
  variants: Variant[]
  addedId: number | null
  onAddToCart: (variant: Variant) => void
  imageError: Record<number, boolean>
  setImageError: React.Dispatch<React.SetStateAction<Record<number, boolean>>>
}

export default function ProductGrid({ variants, addedId, onAddToCart, imageError, setImageError }: Props) {
  const truncate = (text: string, max: number) =>
    text.length <= max ? text : text.slice(0, max) + "…"

  return (
    <>
      {/* Mobile */}
      <div className="sm:hidden divide-y divide-muted">
        {variants.map((v) => {
          const id = Number(v.id)
          return (
            <div key={id} className="flex items-center gap-3 py-3 cursor-pointer" onClick={() => (window.location.href = `/product/${v.slug}`)}>
              <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                {imageError[id] ? (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    <Flame className="w-5 h-5" />
                  </div>
                ) : (
                  <img
                    src={v.images?.[0] || `https://source.unsplash.com/300x200/?candle,${v.name}`}
                    alt={v.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError((prev) => ({ ...prev, [id]: true }))}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">
                  {v.parentName} <span className="text-muted-foreground">({v.name})</span>
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {v.description ?? "100% soy wax"}
                </p>
                <p className="text-sm font-semibold mt-1">₹{v.price}</p>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onAddToCart(v)
                }}
                size="icon"
                variant={addedId === id ? "default" : "outline"}
                className={`h-8 w-8 ${addedId === id ? "bg-black text-white" : ""}`}
                disabled={addedId === id}
              >
                {addedId === id ? (
                  <Flame className="w-4 h-4 animate-pulse" />
                ) : (
                  <ShoppingCart className="w-4 h-4" />
                )}
              </Button>
            </div>
          )
        })}
      </div>

      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {variants.map((v) => {
          const id = Number(v.id)
          return (
            <Link key={id} href={`/product/${v.slug}`} className="group">
              <Card className="flex flex-col justify-between cursor-pointer hover:shadow-sm transition text-sm h-[280px] md:h-[320px]">
                <CardHeader className="pb-2 h-[60px] md:h-[72px] overflow-hidden">
                  <CardTitle className="text-sm md:text-base">
                    {v.parentName} <span className="text-muted-foreground">({v.name})</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {truncate(v.description ?? "100% soy wax", 50)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-between h-[160px] md:h-[180px]">
                  {imageError[id] ? (
                    <div className="flex items-center justify-center h-[100px] md:h-[120px] bg-gray-100 rounded-md text-gray-400 mb-2">
                      <Flame className="w-6 h-6" />
                    </div>
                  ) : (
                    <img
                      src={v.images?.[0] || `https://source.unsplash.com/300x200/?candle,${v.name}`}
                      alt={v.name}
                      className="rounded-md mb-2 object-contain w-full h-[100px] md:h-[120px]"
                      onError={() => setImageError((prev) => ({ ...prev, [id]: true }))}
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <p className="font-medium">₹{v.price}</p>
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        onAddToCart(v)
                      }}
                      size="sm"
                      className={`text-xs transition-all duration-300 ${
                        addedId === id ? "bg-black text-white" : ""
                      }`}
                      disabled={addedId === id}
                    >
                      {addedId === id ? (
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
          )
        })}
      </div>
    </>
  )
}
