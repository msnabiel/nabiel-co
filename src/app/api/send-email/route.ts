import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: Request) {
  const body = await req.json()

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
      from: `"Nabiel & Co." <${process.env.GMAIL_USER}>`, // will be yourgmail+orders@gmail.com
      to: body.email,
      subject: "Your Order Confirmation – Nabiel & Co.",
      html: `
        <h2>Hi ${body.name},</h2>
        <p>Thank you for your order!</p>
        <p><strong>Shipping Address:</strong> ${body.address}, ${body.city} – ${body.zip}</p>
        <p><strong>Order Summary:</strong></p>
        <ul>
          ${body.cart
            .map(
              (item: any) =>
                `<li>${item.name} × ${item.quantity} – ₹${
                  item.price * item.quantity
                }</li>`
            )
            .join("")}
        </ul>
        <p><strong>Total:</strong> ₹${body.total}</p>
        <p>We’ll notify you once your order ships. 🕯️</p>
        <p>Warm regards,<br/>Nabiel & Co.</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
