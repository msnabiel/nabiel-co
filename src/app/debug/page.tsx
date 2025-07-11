"use client"

import { Button } from "@/components/ui/button"
import { sendConfirmationEmail } from "@/lib/sendConfirmationEmail"

export default function EmailTestPage() {
  const handleTest = async () => {
    try {
      await sendConfirmationEmail({
        name: "Test User",
        email: "info.nabielco@gmail.com",
        address: "123 Test Street",
        city: "Testville",
        zip: "123456",
        phone: "123-456-7890", // Optional phone number
        cart: [
          { id: 1, name: "Lavender Bliss", price: 399, quantity: 2 },
        ],
        total: 798,
      })
      alert("✅ Email sent!")
    } catch (e) {
      console.error(e)
      alert("❌ Failed to send email.")
    }
  }

  return (
    <main className="p-6">
      <Button onClick={handleTest}>Send Test Email</Button>
    </main>
  )
}
