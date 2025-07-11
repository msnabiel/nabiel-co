"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Banner() {
  return (
    <section className="relative w-full h-[320px] sm:h-[500px] overflow-hidden mb-12">
      {/* ✅ Background image */}
      <Image
        src="/banner.png"
        alt="Candle Banner"
        fill
        priority
        className="object-cover object-center"
      />

      {/* ✅ Overlay content */}
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
        <div className="max-w-xl w-full text-white text-center space-y-3 sm:space-y-5">
          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            ✨ Light Up Your Space
          </h1>
          <p className="text-xs sm:text-base text-white/90 max-w-md mx-auto">
            Premium handcrafted soy candles made with eco-friendly ingredients.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <Link href="/shop">
  <Button size="sm" className="text-sm">
    🛍️ Shop Now
  </Button>
</Link>
<Link href="/brochure.pdf" target="_blank">
  <Button
    variant="outline"
    size="sm"
    className="text-sm text-black border-white hover:bg-white hover:text-black"
  >
    📄 View Brochure
  </Button>
</Link>

          </div>
        </div>
      </div>
    </section>
  )
}
