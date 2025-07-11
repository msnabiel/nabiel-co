import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const { email } = await req.json()

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

  const couponCode = "WELCOME10"

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  try {
    await transporter.sendMail({
      from: `"Nabiel & Co." <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome! Here's your 10% OFF coupon",
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 500px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px; background: #fff;">
          <h2 style="color: #f59e0b; text-align: center;">🕯️ Welcome to Nabiel & Co!</h2>
          <p>Thanks for signing up! We're thrilled to have you.</p>
          <p>Your exclusive coupon code is:</p>
          <div style="font-size: 24px; font-weight: bold; background: #fef3c7; padding: 12px 20px; border-radius: 6px; text-align: center; margin: 16px 0;">
            ${couponCode}
          </div>
          <p>Use it at checkout to get <strong>10% OFF</strong> your first order.</p>
          <div style="margin-top: 32px; text-align: center;">
            <a href="https://instagram.com/nabielco" style="background: #f59e0b; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500;">
              Follow us on Instagram
            </a>
          </div>
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 32px;">
            Handmade with love in India 🇮🇳<br/>
            Nabiel & Co. | info.nabielco@gmail.com
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending coupon email:", error)
    return NextResponse.json({ error: "Failed to send coupon" }, { status: 500 })
  }
}
