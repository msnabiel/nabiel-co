import Link from "next/link"
import { Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-white text-sm text-muted-foreground py-8 px-6 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand Info */}
        <div className="text-center md:text-left">
          <p>© {new Date().getFullYear()} Nabiel & Co. All rights reserved.</p>
          <p className="text-xs">Handcrafted with care in India 🇮🇳</p>
        </div>

        {/* Legal Links */}
        <div className="flex gap-4 justify-center">
          <Link href="/privacy-policy" className="hover:underline text-black">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline text-black">
            Terms
          </Link>
          <Link href="/refund-policy" className="hover:underline text-black">
            Return Policy
          </Link>
        </div>

        {/* Contact Icons */}
        <div className="flex gap-4 items-center justify-center">
          <a
            href="mailto:info.nabielco@gmail.com"
            className="inline-flex items-center gap-2 text-black hover:underline"
          >
            <Mail className="w-4 h-4 text-black" />
            info.nabielco@gmail.com
          </a>
          <a
            href="https://instagram.com/nabielco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-black hover:underline"
          >
            <Instagram className="w-4 h-4 text-black" />
            @nabielco
          </a>
        </div>
      </div>
    </footer>
  )
}
