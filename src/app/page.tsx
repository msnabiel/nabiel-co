"use client"
import NewsletterSignup from "@/components/NewsletterSignup"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import Banner from "@/components/banner"
export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-neutral-800">
      <Banner />

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
{/* Newsletter Signup Section */}
<section className="text-center my-0 px-4 sm:px-0">
  <NewsletterSignup />
</section>





     {/* About Section */}
<section className="py-20 px-6 text-center max-w-3xl mx-auto">
  <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
  <p className="text-muted-foreground mb-4">
    At Nabiel & Co, we use 100% soy wax and eco-friendly materials to bring you clean, long-lasting aromas. Each candle is hand-poured with care and crafted to elevate your mood and space.
  </p>
  <div className="space-y-2 text-sm text-muted-foreground">
    <p><strong>📞 Call:</strong> +91 6383238742</p>
    <p><strong>📧 Email:</strong> info.nabielco@gmail.com</p>
    <p>
      <strong>📷 Instagram:</strong>{" "}
      <a
        href="https://instagram.com/nabielco"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-600 hover:text-blue-800"
      >
        @nabielco
      </a>
    </p>
  </div>
</section>



{/*

      <footer className="text-center text-sm text-muted-foreground py-6 border-t">
  <p>© {new Date().getFullYear()} Nabiel & Co. All rights reserved.</p>
  <a
    href="/Nabiel-Co-Brochure.pdf"
    target="_blank"
    rel="noopener noreferrer"
    className="underline text-blue-600 hover:text-blue-800 mt-2 block"
  >
    📄 Download Our Product Brochure
  </a>
</footer>
*/}
    </div>
  )
}
