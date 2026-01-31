import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { withApiKey } from "@/lib/api/guards"

export const dynamic = "force-dynamic"
export const revalidate = 0

const DB_TIMEOUT = 3000

const dbKeepalive = async () => {
  try {
    const dbCheck = Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("DB Timeout")), DB_TIMEOUT))
    ])
    await dbCheck
    return NextResponse.json(
      { message: "OK" },
      {
        status: 200,
        headers: { "Cache-Control": "no-store" }
      }
    )
  } catch (error) {
    console.error("DB Keepalive Failed:", error)
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
  }
}

export const GET = withApiKey("CRON_API_SECRET", dbKeepalive)
