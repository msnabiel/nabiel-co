"use client"

import Banner from "@/components/banner"
import NewsletterSignup from "@/components/NewsletterSignup"
import CraftedWithCare from "@/components/CraftedWithCare"
import WhyChooseUs from "@/components/WhyChooseUs"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-neutral-800">
      <Banner />
      <CraftedWithCare />
      <section className="text-center my-0 px-4 sm:px-0">
        <NewsletterSignup />
      </section>
      <WhyChooseUs />
    </div>
  )
}
