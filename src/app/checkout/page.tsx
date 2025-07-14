"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail"
import { supabase } from "@/lib/supabase/client" // or wherever you initialized it
import { validCoupons } from "@/data/coupon"
import { BUSINESS_NAME } from "@/lib/config"
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
    const [coupon, setCoupon] = useState("")
    const [discount, setDiscount] = useState(0)

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
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = Math.round(subtotal * (1 - discount))

  //const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
  const handleNotImplemented = async () => {
  // Show a toast notification
  toast("🚧 Not implemented yet!")
}
const handleApplyCoupon = () => {
  const match = validCoupons.find(
    (c) => c.code.toLowerCase() === coupon.trim().toLowerCase()
  )

  if (match) {
    setDiscount(match.discount)
    toast.success(`🎉 Coupon applied! ${match.discount * 100}% off`)
  } else {
    setDiscount(0)
    toast.error("Invalid coupon code")
  }
}


  const handleBuyNow = async () => {
  const totalAmount = total // already includes discount

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
    name: BUSINESS_NAME,
    description: "Candle Purchase",
    order_id: order.id,
    handler: function (response: any) {
  const { razorpay_order_id, razorpay_payment_id } = response

  toast.success("✅ Payment successful!")

  handleCheckout({
    razorpay_order_id,
    razorpay_payment_id,
  })
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


const handleCheckout = async ({
  razorpay_order_id,
  razorpay_payment_id,
}: {
  razorpay_order_id: string
  razorpay_payment_id: string
}) => {
  if (Object.values(form).some((v) => v.trim() === "")) {
    toast.error("Please fill all fields")
    return
  }

  try {
    const { error } = await supabase.from("orders").insert([
  {
    name: form.name,
    email: form.email,
    phone: form.phone,
    address: form.address,
    city: form.city,
    zip: form.zip,
    cart,
    total,
    razorpay_order_id,
    payment_id: razorpay_payment_id,
    status: "processing",
  },
])

if (error) {
  console.error("Supabase insert error:", error.message)
  toast.error("❌ Failed to save order: " + error.message)
  return
}

    await sendConfirmationEmail({
      ...form,
      cart,
      total,
    })

    toast.success("✅ Order placed & confirmation sent!")

    localStorage.removeItem("cart")
    setCart([])
    setForm({ name: "", email: "", address: "", city: "", zip: "", phone: "" })
  } catch (err) {
    toast.error("Something went wrong during checkout.")
  }
}
const { phone, ...requiredFields } = form
const formIsValid = Object.values(requiredFields).every((v) => v.trim() !== "")



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
            <div className="flex gap-2">
  <Input
    placeholder="Enter coupon code"
    value={coupon}
    onChange={(e) => setCoupon(e.target.value)}
  />
  <Button onClick={handleApplyCoupon} variant="secondary">
    Apply
  </Button>
</div>

{discount > 0 && (
  <div className="flex justify-between text-sm text-green-600">
    <span>Discount applied</span>
    <span>-{Math.round(subtotal * discount)}</span>
  </div>
)}

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
  disabled={cart.length === 0 || !formIsValid}
  onClick={handleBuyNow}
  className="w-full bg-amber-500 hover:bg-amber-600 text-white"
>
  Buy Now with Razorpay
</Button>

<Button
  disabled={cart.length === 0 || !formIsValid}
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
