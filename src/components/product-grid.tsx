// components/ProductGrid.tsx
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CandlestickChartIcon } from "lucide-react"

type Product = {
  name: string
  price: string
}

const products: Product[] = [
  { name: "Lavender Bliss", price: "₹399" },
  { name: "Vanilla Drift", price: "₹349" },
  { name: "Citrus Bloom", price: "₹379" },
]

export default function ProductGrid() {
  return (
    <section className="py-12 px-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Best Sellers</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {products.map((item, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>Soothing & natural</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={`https://source.unsplash.com/400x300/?candle,${item.name}`}
                alt={item.name}
                className="rounded-xl mb-4"
                onError={(e) => {
                  e.currentTarget.style.display = "none"
                  const fallback = document.getElementById(`fallback-icon-${idx}`)
                  if (fallback) fallback.style.display = "flex"
                }}
              />
              <div
                id={`fallback-icon-${idx}`}
                className="hidden items-center justify-center h-[200px] rounded-xl bg-gray-100 text-gray-400 mb-4"
              >
                <CandlestickChartIcon className="w-10 h-10" />
              </div>
              <p className="text-lg font-medium">{item.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
