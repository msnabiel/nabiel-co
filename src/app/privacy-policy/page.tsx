"use client"

import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-800 px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

      <p className="mb-4 text-muted-foreground text-sm text-center">
        Last updated: July 10, 2025
      </p>

      <section className="space-y-6 text-sm leading-6">
        <p>
          At <strong>Nabiel & Co.</strong>, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services.
        </p>

        <h2 className="text-xl font-semibold">1. Information We Collect</h2>
        <ul className="list-disc ml-6">
          <li><strong>Personal Information:</strong> Name, email address, shipping address, and payment details when you make a purchase.</li>
          <li><strong>Usage Data:</strong> Pages visited, time spent, and other analytic data to help improve our website.</li>
        </ul>

        <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
        <ul className="list-disc ml-6">
          <li>To process orders and deliver products.</li>
          <li>To respond to inquiries and provide customer support.</li>
          <li>To send updates, promotional offers, or newsletters (only if you've opted in).</li>
          <li>To analyze website usage and improve our services.</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Sharing Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share information with trusted partners who assist in operating our website, as long as they agree to keep your data confidential.
        </p>

        <h2 className="text-xl font-semibold">4. Cookies</h2>
        <p>
          We use cookies to enhance your browsing experience. You can disable cookies in your browser settings, but it may affect how our site functions.
        </p>

        <h2 className="text-xl font-semibold">5. Data Security</h2>
        <p>
          We implement a variety of security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
        </p>

        <h2 className="text-xl font-semibold">6. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. To do so, please contact us at <a href="mailto:info.nabielco@gmail.com" className="text-amber-600 hover:underline">info.nabielco@gmail.com</a>.
        </p>

        <h2 className="text-xl font-semibold">7. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with a new "Last updated" date.
        </p>

        <h2 className="text-xl font-semibold">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, feel free to <Link href="/contact" className="text-amber-600 hover:underline">contact us</Link>.
        </p>
      </section>
    </main>
  )
}
