"use client"

import Link from "next/link"

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-800 px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

      <p className="mb-4 text-muted-foreground text-sm text-center">
        Last updated: July 10, 2025
      </p>

      <section className="space-y-6 text-sm leading-6">
        <p>
          Welcome to <strong>Nabiel & Co.</strong>! These Terms and Conditions govern your use of our website and services. By accessing or purchasing from our site, you agree to these terms.
        </p>

        <h2 className="text-xl font-semibold">1. Use of Our Website</h2>
        <p>
          You agree to use our website for lawful purposes only. You must not misuse our services or attempt to disrupt our operations.
        </p>

        <h2 className="text-xl font-semibold">2. Products and Pricing</h2>
        <p>
          We strive to display accurate product descriptions and prices. However, we reserve the right to correct errors or update pricing without prior notice. All prices are in INR (₹).
        </p>

        <h2 className="text-xl font-semibold">3. Orders and Payment</h2>
        <p>
          Once you place an order, you will receive a confirmation email. All payments must be made securely through our supported payment gateways. We reserve the right to cancel any order for any reason.
        </p>

        <h2 className="text-xl font-semibold">4. Shipping and Delivery</h2>
        <p>
          We aim to process and ship orders promptly. Delivery times may vary based on location. We are not liable for delays caused by third-party logistics.
        </p>

        <h2 className="text-xl font-semibold">5. Returns and Refunds</h2>
        <p>
          We accept returns for damaged or defective products within 7 days of delivery. Please refer to our <Link href="/refund-policy" className="text-amber-600 hover:underline">Refund Policy</Link> for details.
        </p>

        <h2 className="text-xl font-semibold">6. Intellectual Property</h2>
        <p>
          All content on this website, including logos, images, and text, is the property of Nabiel & Co. You may not reproduce or use it without written permission.
        </p>

        <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
        <p>
          We are not liable for any indirect or consequential damages arising from the use of our site or products. Our total liability is limited to the amount paid by you.
        </p>

        <h2 className="text-xl font-semibold">8. Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes will be handled in the courts of Tamil Nadu, India.
        </p>

        <h2 className="text-xl font-semibold">9. Changes to Terms</h2>
        <p>
          We may update these Terms at any time. Updates will be posted on this page with the revised date.
        </p>

        <h2 className="text-xl font-semibold">10. Contact Us</h2>
        <p>
          For any questions or concerns, please contact us at <a href="mailto:hello@nabielandco.com" className="text-amber-600 hover:underline">hello@nabielandco.com</a>.
        </p>
      </section>
    </main>
  )
}
