"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { ShoppingCart, Heart } from "lucide-react"
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
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-xl font-semibold">Product not found</h1>
        <Link href="/" className="text-blue-500 underline">← Back to shop</Link>
      </div>
    )
  }

 if (!product) {
return (
<div className="p-6 text-center">
<h1 className="text-xl font-semibold">Product not found</h1>
<Link href="/" className="text-blue-500 underline">
← Back to shop
</Link>
</div>
)
}

return (
<div className="max-w-6xl mx-auto p-4 sm:p-6">
<div className="grid md:grid-cols-2 gap-10">
{/* Image Gallery */}
<div className="space-y-4">
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
<div className="space-y-6">
<div className="space-y-1">
<h1 className="text-3xl font-bold">{product.name}</h1>
<div className="flex items-center gap-2 text-sm text-yellow-500">
{"★".repeat(4)}{"☆"}{" "}
<span className="text-muted-foreground ml-1">(142 reviews)</span>
</div>

<p className="text-muted-foreground mt-2">{product.description}</p>
<p className="text-2xl font-semibold mt-4">₹{product.price}</p>
</div>

{/* Scent Selector */}
<div>
<label className="block text-sm mb-1 font-medium">Choose Scent</label>
<Select>
<SelectTrigger className="w-48">
<SelectValue placeholder="Select scent" />
</SelectTrigger>
<SelectContent>
<SelectItem value="vanilla">Vanilla</SelectItem>
<SelectItem value="lavender">Lavender</SelectItem>
<SelectItem value="rose">Rose</SelectItem>
</SelectContent>
</Select>
</div>

{/* Quantity Selector */}
<div className="flex items-center gap-3">
<label className="text-sm font-medium">Quantity:</label>
<input
type="number"
min={1}
value={quantity}
onChange={(e) => setQuantity(Number(e.target.value))}
className="w-16 px-2 py-1 border rounded"
/>
</div>

{/* Buttons */}
<div className="flex gap-3">
<Button
className="flex gap-2"
onClick={() => {
// Add to cart logic here
toast("Added to cart!")
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

{/* Share */}
<div className="text-sm text-muted-foreground pt-2">
Share:{" "}
<a
href={`https://wa.me/?text=${encodeURIComponent(
`Check out this candle: ${product.name} - ${
typeof window !== "undefined" ? window.location.href : ""
}`
)}`}
target="_blank"
rel="noopener noreferrer"
className="text-blue-600"
>
WhatsApp
</a>
</div>

{/* FAQ */}
<div>
<h2 className="text-lg font-semibold mt-6 mb-2">Product FAQs</h2>
<Accordion type="single" collapsible>
<AccordionItem value="burn">
<AccordionTrigger>How long does it burn?</AccordionTrigger>
<AccordionContent>
Around 20–25 hours depending on use.
</AccordionContent>
</AccordionItem>
<AccordionItem value="refill">
<AccordionTrigger>Is it refillable?</AccordionTrigger>
<AccordionContent>
Yes, the jar is eco-friendly and reusable.
</AccordionContent>
</AccordionItem>
</Accordion>
</div>
</div>
</div>

{/* Related Products */}
<div className="mt-16">
<h2 className="text-2xl font-semibold mb-4">You may also like</h2>
<div className="overflow-x-auto">
<div className="flex gap-4 sm:grid sm:grid-cols-2">
{related.map((p) => (
<Link
key={p.id}
href={`/product/${p.slug}`}
className="w-full max-w-[140px] border rounded-lg p-2 hover:shadow transition bg-white shrink-0"
>
<div className="w-[100px] h-[100px] mx-auto relative">
<Image
src={p.images?.[0] || "/placeholder.jpg"}
alt={p.name}
fill
className="object-cover rounded-md"
/>
</div>


<p className="mt-2 text-sm font-medium text-center">{p.name}</p>
<p className="text-xs text-muted-foreground text-center">₹{p.price}</p>
</Link>
))}
</div>
</div>
</div>

{/* Sticky Mobile Add to Cart */}
<div className="fixed bottom-0 inset-x-0 bg-white border-t p-4 sm:hidden flex justify-between z-50">
<Button className="w-full flex-1">
<ShoppingCart size={18} />
Add to Cart
</Button>
</div>
</div>
)
}

