"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { products, type FlattenedVariant } from "@/data/products"

export default function RecentlyViewed() {
  const [viewed, setViewed] = useState<FlattenedVariant[]>([])

  // Flatten all variants once
  const allVariants: FlattenedVariant[] = products.flatMap(product =>
    product.variants.map(variant => ({
      ...variant,
      parentName: product.name,
      type: product.type,
    }))
  )

  useEffect(() => {
    const key = "recentlyViewed"
    const slugs = JSON.parse(localStorage.getItem(key) || "[]") as string[]

    // Maintain original order
    const ordered = slugs
      .map(slug => allVariants.find(v => v.slug === slug))
      .filter(Boolean) as FlattenedVariant[]

    setViewed(ordered)
  }, [])

  if (viewed.length === 0) return null

  return (
    <div className="mt-12">
      <h2 className="text-lg font-semibold mb-4">Recently Viewed</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {viewed.map(product => (
          <Link key={product.slug} href={`/product/${product.slug}`}>
            <div className="border rounded-lg overflow-hidden hover:shadow-md transition bg-white">
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-36 object-cover"
              />
              <div className="p-2">
                <p className="text-sm font-medium line-clamp-1">{product.parentName} - {product.name}</p>
                <p className="text-muted-foreground text-xs">₹{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
