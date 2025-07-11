"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ShoppingCart, Heart, MessageCircle } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select"
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion"

interface Props {
  product: any
  related: any[]
}

export default function ProductClientView({ product, related }: Props) {
  const [quantity, setQuantity] = useState("1")
const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-semibold">Product not found</h1>
        <Link href="/" className="text-blue-500 underline">← Back to shop</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6">
      <div className="grid md:grid-cols-2 gap-6 md:gap-10">
        {/* Image Gallery */}
        <div className="space-y-3">
          {product.images?.map((img: string, i: number) => (
            <Image
              key={i}
              src={img}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg border w-full max-w-[500px] mx-auto"
            />
          ))}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2 text-sm text-yellow-500">
              {"★".repeat(4)}{"☆"}{" "}
              <span className="text-muted-foreground ml-1">(142 reviews)</span>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">{product.description}</p>
            <p className="text-xl md:text-2xl font-semibold">₹{product.price}</p>
          </div>

          {/* Scent and Quantity Selectors - Side by Side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1 font-medium">Scent</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select scent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vanilla">Vanilla</SelectItem>
                  <SelectItem value="lavender">Lavender</SelectItem>
                  <SelectItem value="rose">Rose</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-1 font-medium">Quantity</label>
          <input
  type="number"
  min={1}
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
  className="w-full px-3 py-2 border rounded-md"
/>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button
  className="flex gap-2 flex-1"
  onClick={() => {
    const qty = Math.max(1, parseInt(quantity || "1", 10))
    for (let i = 0; i < qty; i++) {
      addToCart(product)
    }
  }}
>
  <ShoppingCart size={18} />
  Add to Cart
</Button>

            <Button variant="outline" className="flex gap-2">
              <Heart size={18} />
              Wishlist
            </Button>
          </div>

          {/* Share - Compact with Icon */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <span>Share:</span>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Check out this candle: ${product.name} - ${
                  typeof window !== "undefined" ? window.location.href : ""
                }`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
          </div>

          {/* FAQ - Compact */}
          <div>
            <h2 className="text-lg font-semibold mt-4 mb-2">Product FAQs</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="burn">
                <AccordionTrigger className="text-sm">How long does it burn?</AccordionTrigger>
                <AccordionContent className="text-sm">
                  Around 20–25 hours depending on use.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="refill">
                <AccordionTrigger className="text-sm">Is it refillable?</AccordionTrigger>
                <AccordionContent className="text-sm">
                  Yes, the jar is eco-friendly and reusable.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">You may also like</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="w-full min-w-[120px] max-w-[140px] border rounded-lg p-3 hover:shadow transition bg-white shrink-0"
              >
                <div className="w-[80px] h-[80px] mx-auto relative">
                  <Image
                    src={p.images?.[0] || "/placeholder.jpg"}
                    alt={p.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <p className="mt-2 text-xs font-medium text-center line-clamp-2">{p.name}</p>
                <p className="text-xs text-muted-foreground text-center">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add to Cart */}
      <div className="fixed bottom-0 inset-x-0 bg-white border-t p-3 sm:hidden flex gap-2 z-50">
                    <Button
  className="flex gap-2 flex-1"
  onClick={() => {
    const qty = Math.max(1, parseInt(quantity || "1", 10))
    for (let i = 0; i < qty; i++) {
      addToCart(product)
    }
  }}
>
  <ShoppingCart size={18} />
  Add to Cart
</Button>
        <Button variant="outline" size="icon">
          <Heart size={18} />
        </Button>
      </div>
    </div>
  )
}