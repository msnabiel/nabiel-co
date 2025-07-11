import { NextResponse } from "next/server"
import Razorpay from "razorpay"

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export async function POST(req: Request) {
  const { amount } = await req.json()

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: "INR",
      receipt: `rcpt_${Math.floor(Math.random() * 10000)}`,
    })

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
