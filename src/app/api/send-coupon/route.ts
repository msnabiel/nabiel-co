import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import {
  BUSINESS_NAME,
  BUSINESS_PHONE,
  BUSINESS_INSTAGRAM,
} from "@/lib/config"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, code = "WELCOME10", name = "Friend" } = body

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 })
  }

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
      from: `"${BUSINESS_NAME}" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `🎁 Your 10% OFF Coupon – ${BUSINESS_NAME}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px; background: #fff;">
          <img 
            src="https://www.nabiel.co.in/logo.png" 
            alt="${BUSINESS_NAME}" 
            style="height: 48px; margin: 0 auto 16px; display: block;" 
          />
          <h2 style="color: #f59e0b; text-align: center;">🕯️ ${BUSINESS_NAME} – Welcome Gift</h2>

          <p>Hi <strong>${name}</strong>,</p>
          <p>Thanks for joining our candle club! Here's a special <strong>10% OFF</strong> coupon just for you.</p>

          <div style="background: #fef3c7; border: 1px dashed #f59e0b; padding: 16px; font-size: 24px; font-weight: bold; text-align: center; border-radius: 8px; margin: 24px 0;">
            ${code}
          </div>

          <p style="text-align: center;">Use this code at checkout to get 10% off your first order.</p>

          <div style="margin-top: 32px; text-align: center;">
            <a href="${BUSINESS_INSTAGRAM}" style="background: #f59e0b; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500;">
              Follow us on Instagram
            </a>
          </div>

          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 32px;">
            Handmade with love in India 🇮🇳<br/>
            ${BUSINESS_NAME} | ${BUSINESS_PHONE}
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
