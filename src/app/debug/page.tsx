"use client"

import { Button } from "@/components/ui/button"
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail"
import { sendCouponEmail } from "@/lib/sendCouponEmail" // Optional
import { toast } from "sonner" // Optional: use this instead of alert

export default function EmailTestPage() {
  const handleSendConfirmation = async () => {
    try {
      await sendConfirmationEmail({
        name: "Test User",
        email: "info.nabielco@gmail.com",
        address: "123 Test Street",
        city: "Testville",
        zip: "123456",
        phone: "123-456-7890",
        cart: [
          { id: 1, name: "Lavender Bliss", price: 399, quantity: 2 },
        ],
        total: 798,
      })
      toast.success("✅ Order confirmation email sent!")
    } catch (e) {
      console.error("Confirmation Email Error:", e)
      toast.error("❌ Failed to send confirmation email.")
    }
  }

  const handleSendCoupon = async () => {
    try {
      await sendCouponEmail({
        email: "info.nabielco@gmail.com",
        code: "WELCOME10",
      })
      toast.success("🎁 Coupon email sent!")
    } catch (e) {
      console.error("Coupon Email Error:", e)
      toast.error("❌ Failed to send coupon email.")
    }
  }

  return (
    <main className="p-6 space-y-4 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">🧪 Test Emails</h1>
      <Button onClick={handleSendConfirmation}>Send Order Confirmation</Button>
      <Button onClick={handleSendCoupon} variant="outline">Send Coupon Email</Button>
    </main>
  )
}
