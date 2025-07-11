"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Phone, Mail, Instagram } from "lucide-react"
import { toast } from "sonner"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("email", form.email)
    formData.append("message", form.message)

    try {
      const res = await fetch("https://formspree.io/f/xpwrvqyg", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })

      const data = await res.json()

      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon 💌")
        setForm({ name: "", email: "", message: "" })
      } else {
        toast.error(data?.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      toast.error("Network error. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-neutral-800 px-6 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
        <p className="text-muted-foreground mb-10 text-sm">
          We'd love to hear from you — whether you have a question, feedback, or just want to say hi.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <Input
            type="text"
            placeholder="Your Name"
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Textarea
            placeholder="Your Message"
            rows={5}
            value={form.message}
            required
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>

      <div className="mt-16 text-center space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          <span>+91 63832 38742</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" />
          <span>info.nabielco@gmail.com</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Instagram className="w-4 h-4" />
          <a
            href="https://instagram.com/nabielco"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-black"
          >
            @nabielco
          </a>
        </div>
      </div>
    </div>
  )
}
