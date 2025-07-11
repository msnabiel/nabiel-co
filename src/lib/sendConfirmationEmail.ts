// lib/sendConfirmationEmail.ts
export async function sendConfirmationEmail({
  name,
  email,
  address,
  city,
  zip,
  phone, // ✅ Added here
  cart,
  total,
}: {
  name: string
  email: string
  address: string
  city: string
  zip: string
  phone?: string // ✅ Also add here (optional)
  cart: any[]
  total: number
}) {
  const res = await fetch("/api/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      address,
      city,
      zip,
      phone, // ✅ included in the body
      cart,
      total,
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to send confirmation email")
  }

  return res.json()
}
