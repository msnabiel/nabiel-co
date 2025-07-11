"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight text-amber-600">
          Nabiel & Co.
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-700">
          <Link href="/" className="hover:text-black">Home</Link>
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <Link href="/about" className="hover:text-black">About</Link>
          <Link href="/contact" className="hover:text-black">Contact</Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
          </Link>

          {/* Hamburger Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-4 pt-4 pb-6 flex flex-col gap-3 text-sm font-medium text-neutral-700 bg-white border-t rounded-b-xl shadow"
          >
            <Link href="/" className="hover:text-black" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/shop" className="hover:text-black" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link href="/about" className="hover:text-black" onClick={() => setMenuOpen(false)}>About</Link>
            <Link href="/contact" className="hover:text-black" onClick={() => setMenuOpen(false)}>Contact</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
