import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/client"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query")

  if (!query) return NextResponse.json({ error: "Query missing" }, { status: 400 }) 

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .or(`id.eq.${query},email.eq.${query}`)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 })
  }

  return NextResponse.json({ order: data })
}
