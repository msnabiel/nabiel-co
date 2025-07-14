"use client"

import { BUSINESS_NAME, BUSINESS_MAIL, BUSINESS_PHONE, BUSINESS_INSTAGRAM } from "@/lib/config"

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6 text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
      <p className="text-muted-foreground mb-4">
        At {BUSINESS_NAME}, we use 100% soy wax and eco-friendly materials to bring you clean,
        long-lasting aromas. Each candle is hand-poured with care and crafted to elevate your mood and space.
      </p>
      <div className="space-y-2 text-sm text-muted-foreground">
        <p><strong>📞 Call:</strong> {BUSINESS_PHONE}</p>
        <p><strong>📧 Email:</strong> {BUSINESS_MAIL}</p>
        <p>
          <strong>📷 Instagram:</strong>{" "}
          <a
            href={BUSINESS_INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 hover:text-blue-800"
          >
            @{BUSINESS_NAME.toLowerCase().replace(/\s/g, "")}
          </a>
        </p>
      </div>
    </section>
  )
}
