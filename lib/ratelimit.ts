import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { headers } from "next/headers"

const redis = Redis.fromEnv()

const limiters = new Map<string, Ratelimit>()

export async function checkRateLimit(
  identifier?: string,
  limit: number = 10,
  window: "10 s" | "1 m" | "1 h" | "1 d" = "1 h"
) {
  if (!limiters.has(window)) {
    limiters.set(
      window,
      new Ratelimit({
        redis: redis,
        limiter: Ratelimit.slidingWindow(limit, window),
        analytics: true,
        prefix: "@upstash/ratelimit"
      })
    )
  }
  const ratelimit = limiters.get(window)!

  if (!identifier) {
    const headersList = await headers()
    const forwardedFor = headersList.get("x-forwarded-for")
    identifier = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1"
  }

  const result = await ratelimit.limit(identifier)

  const responseHeaders = {
    "X-RateLimit-Limit": result.limit.toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.reset.toString()
  }

  return {
    success: result.success,
    headers: responseHeaders
  }
}
