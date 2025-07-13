"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import AdminDashboard from "./Dashboard"

export default function AdminPage() {
  const [key, setKey] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  const checkAccess = () => {
    if (key === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setAuthenticated(true)
    } else {
      toast.error("Invalid key")
    }
  }

  return authenticated ? (
    <AdminDashboard />
  ) : (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <Input
        placeholder="Enter admin key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="max-w-sm"
      />
      <Button onClick={checkAccess} className="mt-4">Login</Button>
    </div>
  )
}
