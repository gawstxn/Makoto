import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // Api security
  if (pathname.startsWith("/api")) {
    const origin = request.headers.get("origin")
    const referer = request.headers.get("referer")
    const allowedOrigin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    if ((origin && origin !== allowedOrigin) || (referer && !referer.startsWith(allowedOrigin))) {
      return NextResponse.json({ error: "Forbidden: Invalid Origin" }, { status: 403 })
    }
  }

  // Authentication
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  if (pathname === "/signin" && token) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*", "/signin"]
}
