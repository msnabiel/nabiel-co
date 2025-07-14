import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { supabase } from "@/lib/supabase/server"
import {
  BUSINESS_NAME,
  BUSINESS_MAIL,
  BUSINESS_INSTAGRAM,
} from "@/lib/config"

export async function POST(req: Request) {
  const { email, name } = await req.json()

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  // Check if email exists in the `orders` table
  const { data: existingOrder, error: fetchError } = await supabase
    .from("orders")
    .select("id")
    .eq("email", email)
    .maybeSingle()

  if (!existingOrder || fetchError) {
    return NextResponse.json(
      { error: "No order found for this email" },
      { status: 404 }
    )
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  const { error: updateError } = await supabase
    .from("orders")
    .update({
      otp,
      otp_expires_at: expiresAt.toISOString(),
    })
    .eq("email", email)

  if (updateError) {
    console.error("❌ Failed to store OTP:", updateError)
    return NextResponse.json({ error: "Failed to store OTP" }, { status: 500 })
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
      subject: `🔐 OTP Verification – ${BUSINESS_NAME}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px; background: #fff;">
          <img 
            src="https://www.nabiel.co.in/logo.png" 
            alt="${BUSINESS_NAME}" 
            style="height: 48px; margin: 0 auto 16px; display: block;" 
          />
          <h2 style="color: #f59e0b; text-align: center;">🔐 Verify Your Order – OTP Inside</h2>

          <p>Hi <strong>${name || "there"}</strong>,</p>

          <p>To view your order status, please enter the following OTP:</p>

          <h1 style="font-size: 32px; text-align: center; color: #111; letter-spacing: 2px; margin: 24px 0;">
            ${otp}
          </h1>

          <p>This OTP is valid for the next <strong>10 minutes</strong>.</p>
          <p>If you didn’t request this, you can safely ignore this email.</p>

          <div style="margin-top: 32px; text-align: center;">
            <a href="${BUSINESS_INSTAGRAM}" style="background: #f59e0b; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500;">
              Follow us on Instagram
            </a>
          </div>

          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 32px;">
            Handmade with love in India 🇮🇳<br/>
            ${BUSINESS_NAME} | ${BUSINESS_MAIL}
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true }) // Don't return OTP in production
  } catch (error) {
    console.error("❌ Error sending OTP email:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
