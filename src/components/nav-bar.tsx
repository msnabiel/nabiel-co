"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Orders", href: "/track-order" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  ]

  return (
    <nav
      className={clsx(
        "w-full sticky top-0 z-50 transition-all border-b",
        scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-white/80"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-amber-600"
        >
          Nabiel & Co.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-700">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "hover:text-black transition-colors",
                pathname === link.href && "text-black font-semibold underline underline-offset-4"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
          </Link>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-4 pt-4 pb-6 flex flex-col gap-3 text-sm font-medium text-neutral-700 bg-white border-t rounded-b-xl shadow"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "hover:text-black transition-colors",
                  pathname === link.href && "text-black font-semibold underline underline-offset-4"
                )}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
