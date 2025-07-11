"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { products } from "@/data/products"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CandlestickChartIcon } from "lucide-react"

type ProductCardProps = {
  product: {
    name: string
    price: number
    slug: string
    image?: string
  }
}

function ProductCard({ product }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <Card className="cursor-pointer hover:shadow-md transition">
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>Soothing & natural</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
            {!imgError ? (
              <Image
                src={product.image || ""}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
                <CandlestickChartIcon className="w-10 h-10" />
              </div>
            )}
          </div>
          <p className="text-lg font-medium">₹{product.price}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function ProductGrid() {
  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Best Sellers</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  )
}
