"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CraftedWithCare() {
  return (
    <section className="pt-0 pb-16 sm:pt-0 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-4">Crafted with Care</h2>
      <p className="text-muted-foreground mb-8">
        Each candle is hand-poured in small batches using eco-friendly soy wax,
        natural wicks, and soothing essential oils. Here’s a glimpse into our process.
      </p>
      <div className="grid md:grid-cols-3 gap-6 text-left">
        <Card>
          <CardHeader>
            <CardTitle>🌿 Ingredient Selection</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We carefully source clean-burning soy wax and premium oils that are safe for your home.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>🕯️ Hand Pouring</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Every candle is poured by hand with love to ensure consistent quality and care.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>📦 Sustainable Packaging</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We use eco-friendly, minimal packaging that's as kind to the planet as our scents are to your soul.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
