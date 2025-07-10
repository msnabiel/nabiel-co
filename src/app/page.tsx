"use client"

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

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-neutral-800">
      {/* Hero Section */}
<section className="py-20 text-center px-6 max-w-3xl mx-auto">
  <h1 className="text-5xl font-bold mb-4">Breathe In Calm.</h1>
  <p className="text-xl mb-6 text-muted-foreground">
    Hand-poured scented candles made with love and natural ingredients.
  </p>
  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <Button className="text-lg px-6 py-2" disabled>
    🚧 Shop Coming Soon
  </Button>

  <Button
    variant="outline"
    className="text-lg px-6 py-2"
    onClick={() => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" })
    }}
  >
    📬 Contact Us
  </Button>

  <a
    href="/Nabiel-Co-Brochure.pdf"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button variant="outline" className="text-lg px-6 py-2">
      📄 View Brochure
    </Button>
  </a>
</div>

</section>


<section className="py-16 px-6 max-w-4xl mx-auto text-center">
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
        @nabielcandles
      </a>
    </p>
  </div>
</section>


      {/* Contact Form */}
      <section id="contact" className="py-16 px-4 max-w-xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-center">Get in Touch</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            alert("Form submitted! (not wired up)")
          }}
          className="space-y-4"
        >
          <Input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Textarea
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <Button type="submit">Send Message</Button>
        </form>
      </section>

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

    </div>
  )
}
