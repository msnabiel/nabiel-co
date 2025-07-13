"use client"

import { Flame, Leaf, HandHeart } from "lucide-react"
import { BUSINESS_NAME} from "@/lib/config"
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-neutral-800 px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About {BUSINESS_NAME}</h1>
        <p className="text-muted-foreground text-lg mb-10">
          Crafted with intention. Poured with care. Lit with love.
        </p>

        <p className="mb-6 text-sm leading-relaxed">
          At <strong>{BUSINESS_NAME}</strong>, we believe that a candle is more than just a scent — it’s a mood, a memory, a moment of peace. Our journey began with a simple desire: to create clean, beautiful candles that elevate everyday life.
        </p>

        <p className="mb-6 text-sm leading-relaxed">
          Every candle we make is hand-poured in small batches using 100% natural soy wax, lead-free wicks, and essential oil blends that are safe, sustainable, and soothing. No additives. No paraffin. No shortcuts.
        </p>

        <p className="mb-6 text-sm leading-relaxed">
          Whether you're winding down after a long day or setting the mood for a cozy night in, our candles are here to bring light, warmth, and intention into your space.
        </p>
      </div>

      {/* Values Section */}
      <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-5xl mx-auto text-center">
        <div>
          <Flame className="mx-auto w-8 h-8 text-amber-500 mb-2" />
          <h3 className="font-semibold mb-1">Pure Ingredients</h3>
          <p className="text-sm text-muted-foreground">
            Only soy wax, essential oils, and clean-burning wicks. That’s it.
          </p>
        </div>
        <div>
          <HandHeart className="mx-auto w-8 h-8 text-amber-500 mb-2" />
          <h3 className="font-semibold mb-1">Handcrafted with Love</h3>
          <p className="text-sm text-muted-foreground">
            Each candle is hand-poured in small batches for quality and care.
          </p>
        </div>
        <div>
          <Leaf className="mx-auto w-8 h-8 text-amber-500 mb-2" />
          <h3 className="font-semibold mb-1">Eco-Conscious</h3>
          <p className="text-sm text-muted-foreground">
            We use sustainable materials and plastic-free packaging.
          </p>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="text-center mt-20">
        <p className="text-sm text-muted-foreground mb-2">
          Have questions or want to collaborate?
        </p>
        <a
          href="/contact"
          className="text-amber-600 hover:underline font-medium"
        >
          Let’s get in touch →
        </a>
      </div>
    </div>
  )
}
