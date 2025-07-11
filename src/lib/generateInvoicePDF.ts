import PDFDocument from "pdfkit"

export function generateInvoicePDF({
  name,
  email,
  address,
  city,
  zip,
  cart,
  total,
}: {
  name: string
  email: string
  address: string
  city: string
  zip: string
  cart: any[]
  total: number
}): Promise<Buffer> {
  return new Promise((resolve) => {
    const doc = new PDFDocument()
    const buffers: Uint8Array[] = []

    doc.on("data", buffers.push.bind(buffers))
    doc.on("end", () => {
      const pdfBuffer = Buffer.concat(buffers)
      resolve(pdfBuffer)
    })

    // Minimal invoice content
    doc.text("🕯️ Nabiel & Co. – Invoice", { align: "center" }).moveDown()
    doc.text(`Name: ${name}`)
    doc.text(`Email: ${email}`)
    doc.text(`Address: ${address}, ${city} – ${zip}`).moveDown()
    doc.text("Order Items:")

    cart.forEach((item) => {
      doc.text(`• ${item.name} × ${item.quantity} – ₹${item.price * item.quantity}`)
    })

    doc.moveDown().text(`Total: ₹${total}`, { align: "right" })
    doc.end()
  })
}
