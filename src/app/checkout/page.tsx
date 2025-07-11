"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail"

type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    phone: "", 
  })

  // Load cart
  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setCart(parsed)
      } catch {
        toast.error("Failed to load cart")
      }
    }
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleNotImplemented = async () => {
  // Show a toast notification
  toast("🚧 Not implemented yet!")
}

  const handleBuyNow = async () => {
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const res = await fetch("/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: totalAmount }),
  })

  const order = await res.json()

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // public key
    amount: order.amount,
    currency: order.currency,
    name: "Nabiel & Co.",
    description: "Candle Purchase",
    order_id: order.id,
    handler: function (response: any) {
      toast.success("Payment successful!")
      handleCheckout()
      // TODO: Save order to Supabase or send confirmation email
    },
    prefill: {
      name: form.name,
      email: form.email,
      contact: form.phone || undefined, // only if provided
    },
    theme: { color: "#f59e0b" },
  }

  const rzp = new (window as any).Razorpay(options)
  rzp.open()
}


const handleCheckout = async () => {
  if (Object.values(form).some((v) => v.trim() === "")) {
    toast.error("Please fill all fields")
    return
  }

  try {
    await sendConfirmationEmail({
      ...form,
      cart,
      total,
    })

    toast.success("Order placed and email sent!")
    localStorage.removeItem("cart")
    setCart([])
    setForm({ name: "", email: "", address: "", city: "", zip: "", phone: "" })
  } catch (err) {
    toast.error("Failed to send confirmation email.")
  }
}



  return (
    <main className="min-h-screen bg-white px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Shipping Information</h2>
          <Input
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            placeholder="Email Address"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
            <Input
            placeholder="Phone Number (optional)"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            />
          <Input
            placeholder="Shipping Address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
          <Input
            placeholder="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          <Input
            placeholder="ZIP Code"
            name="zip"
            value={form.zip}
            onChange={handleChange}
          />
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="border rounded-xl p-4 space-y-2 bg-gray-50">
            {cart.length === 0 ? (
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm text-neutral-700"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))
            )}
            <hr />
            <div className="flex justify-between font-medium text-black">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="grid gap-3 mt-4">
  {/* Razorpay dynamic buy button */}
  <Button
    disabled={cart.length === 0}
    onClick={handleBuyNow}
    className="w-full bg-amber-500 hover:bg-amber-600 text-white"
  >
    Buy Now with Razorpay
  </Button>

  {/* Optional: COD fallback or email-only confirmation */}
  <Button
    disabled={cart.length === 0}
    variant="outline"
    onClick={handleBuyNow}
    className="w-full"
  >
    Place Order (COD / Email Only)
  </Button>
</div>

        </div>
      </div>
    </main>
  )
}
