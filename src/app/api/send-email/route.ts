import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { generateInvoicePDF } from "@/lib/generateInvoicePDF"
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
  //const pdfBuffer = await generateInvoicePDF(body)
  try {
    await transporter.sendMail({
      from: `"Nabiel & Co." <${process.env.GMAIL_USER}>`, // will be yourgmail+orders@gmail.com
      to: body.email,
      subject: "Your Order Confirmation – Nabiel & Co.",
      html: `
  <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #eee; border-radius: 8px; background: #fff;">
  <img 
    src="http://localhost:3000/logo.png" 
    alt="Nabiel & Co." 
    style="height: 48px; margin: 0 auto 16px; display: block;" 
  />
    <h2 style="color: #f59e0b; text-align: center;">🕯️ Nabiel & Co. – Order Confirmation</h2>

    <p>Hi <strong>${body.name}</strong>,</p>
    ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ""}
    <p>Thank you for your order! We're excited to handcraft and ship your scented candles soon.</p>

    <h3 style="margin-top: 24px;">📦 Order Summary</h3>
    <table style="width: 100%; border-collapse: collapse; margin-top: 8px; margin-bottom: 16px;">
      ${body.cart
        .map(
          (item: any) => `
            <tr>
              <td style="padding: 6px 0;">${item.name} × ${item.quantity}</td>
              <td style="text-align: right;">₹${item.price * item.quantity}</td>
            </tr>`
        )
        .join("")}
      <tr style="border-top: 1px solid #ccc;">
        <td style="padding: 10px 0; font-weight: bold;">Total</td>
        <td style="text-align: right; font-weight: bold;">₹${body.total}</td>
      </tr>
    </table>

    <h3>📍 Shipping Address</h3>
    <p style="margin-bottom: 24px;">
      ${body.address},<br/>
      ${body.city} – ${body.zip}
    </p>

    <p>You'll receive another email when your order is on the way.</p>

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
/*attachments: [
        {
          filename: "Invoice.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],*/
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
