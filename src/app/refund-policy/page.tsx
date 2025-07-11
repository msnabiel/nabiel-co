"use client"

import Link from "next/link"

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-800 px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Refund & Return Policy</h1>

      <p className="mb-4 text-muted-foreground text-sm text-center">
        Last updated: July 10, 2025
      </p>

      <section className="space-y-6 text-sm leading-6">
        <p>
          At <strong>Nabiel & Co.</strong>, your satisfaction is our priority. If something isn’t right with your order, we’re here to help.
        </p>

        <h2 className="text-xl font-semibold">1. Returns</h2>
        <p>
          We accept returns for damaged or defective products within <strong>7 days</strong> of delivery. To be eligible:
        </p>
        <ul className="list-disc ml-6">
          <li>Item must be unused and in its original packaging</li>
          <li>Proof of purchase (order number or confirmation email) is required</li>
          <li>Clear photos of the damage must be sent to our team</li>
        </ul>

        <h2 className="text-xl font-semibold">2. Non-Returnable Items</h2>
        <p>
          Due to the handmade nature of our products, we do not accept returns for:
        </p>
        <ul className="list-disc ml-6">
          <li>Used candles</li>
          <li>Items damaged due to improper handling after delivery</li>
          <li>Custom or personalized orders</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Refunds</h2>
        <p>
          Once we inspect your return, we will notify you by email. If approved, your refund will be processed to the original payment method within 5–7 business days.
        </p>

        <h2 className="text-xl font-semibold">4. Exchanges</h2>
        <p>
          We currently do not offer direct exchanges. If you'd like a replacement, please return the original item and place a new order.
        </p>

        <h2 className="text-xl font-semibold">5. Cancellations</h2>
        <p>
          Orders can be cancelled within 2 hours of placing them. Please email us immediately at{" "}
          <a href="mailto:info.nabielco@gmail.com" className="text-amber-600 hover:underline">
            info.nabielco@gmail.com
          </a>.
        </p>

        <h2 className="text-xl font-semibold">6. Contact</h2>
        <p>
          For any return or refund request, reach out to us at{" "}
          <a href="mailto:info.nabielco@gmail.com" className="text-amber-600 hover:underline">
            info.nabielco@gmail.com
          </a>{" "}
          with your order number and details.
        </p>

        <p className="pt-4">
          Thank you for supporting handmade. We promise to make things right. 💛
        </p>
      </section>

    </main>
  )
}
