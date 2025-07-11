"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function UnderConstructionPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-amber-50 px-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <AlertTriangle className="w-16 h-16 text-amber-500" />
        </div>

        <h1 className="text-3xl font-bold text-neutral-800">
          Page Under Construction
        </h1>
        <p className="text-muted-foreground">
          We're currently working on this page. Sorry for the inconvenience.
          Please check back later.
        </p>

        <Link href="/">
          <Button>Go back home</Button>
        </Link>
      </div>
    </main>
  )
}
