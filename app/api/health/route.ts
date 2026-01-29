import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const startTime = performance.now()

    const dbCheck = Promise.race([
      prisma.$queryRaw`SELECT 1`,
      new Promise((_, reject) => setTimeout(() => reject(new Error("DB Timeout")), 3000))
    ])
    await dbCheck
    const dbLatency = Math.round(performance.now() - startTime)

    return NextResponse.json(
      {
        status: "ok",
        database: {
          connected: true,
          latency: `${dbLatency}ms`
        },
        system: {
          memoryUsage: `${Math.round(process.memoryUsage().rss / 1024 / 1024)} MB`,
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
          env: process.env.NODE_ENV,
          version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0"
        }
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0"
        }
      }
    )
  } catch (error) {
    console.error("Health Check Failed:", error)

    return NextResponse.json(
      {
        status: "error",
        database: { connected: false },
        error: process.env.NODE_ENV === "production" ? "Database connection failed" : String(error),
        timestamp: new Date().toISOString()
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, no-cache"
        }
      }
    )
  }
}
