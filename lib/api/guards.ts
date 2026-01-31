import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "@/lib/auth"
import { Role } from "@prisma/client"

type RouteHandler = (req: NextRequest, context: { params: any }) => Promise<NextResponse>

export function withRoles(allowedRoles: Role[], handler: RouteHandler): RouteHandler {
  return async (req: NextRequest, context: any) => {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userRole = session.user.role as Role

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    return handler(req, context)
  }
}

export function withApiKey(envVarName: string, handler: RouteHandler): RouteHandler {
  return async (req: NextRequest, context: any) => {
    const apiKey = req.headers.get("x-api-key")

    const validApiKey = process.env[envVarName]

    if (!validApiKey) {
      console.error(`SERVER ERROR: Environment variable '${envVarName}' is not set.`)
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 })
    }

    if (!apiKey || apiKey !== validApiKey) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return handler(req, context)
  }
}
