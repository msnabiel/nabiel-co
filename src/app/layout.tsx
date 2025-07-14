import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner"
import Script from "next/script" // For Razorpay integration
import AnnouncementBar from "@/components/AnnouncementBar/AnnouncementBar";
import MarqueeBar from "@/components/AnnouncementBar/MarqueeBar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
import {
  BUSINESS_NAME,
  BUSINESS_TAGLINE,
  BUSINESS_FAVICON,
} from "@/lib/config"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: BUSINESS_NAME,
  description: BUSINESS_TAGLINE,
  icons: {
    icon: BUSINESS_FAVICON,
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Razorpay Script */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
        <AnnouncementBar />
        <MarqueeBar /> {/* 👈 Add this here */}
        <NavBar />
        <Toaster />

        {/* ✅ Main content expands to push footer down */}
        <main className="flex-1">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
