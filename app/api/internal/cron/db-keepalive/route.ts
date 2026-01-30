import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

const DB_TIMEOUT = 3000

export async function GET(req: NextRequest) {
  try {
    if (req.headers.get("x-api-key") !== process.env.CRON_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const dbCheck = Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("DB Timeout")), DB_TIMEOUT))
    ])
    await dbCheck
    return NextResponse.json({
      message: "OK",
      headers: {
        "Cache-Control": "no-store"
      }
    })
  } catch (error) {
    console.error("DB Keepalive Failed:", error)
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
  }
}
