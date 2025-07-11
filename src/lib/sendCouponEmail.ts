export async function sendCouponEmail({
  email,
  code = "WELCOME10",
}: {
  email: string
  code?: string
}) {
  const res = await fetch("/api/send-coupon", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, code }),
  })

  if (!res.ok) {
    throw new Error("Failed to send coupon email")
  }
}
