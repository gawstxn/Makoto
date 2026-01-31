import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Role } from "@prisma/client"
import bcrypt from "bcryptjs"
import { checkRateLimit } from "@/lib/ratelimit"

export async function POST(request: Request) {
  try {
    const { success, headers } = await checkRateLimit(undefined, 5, "1 h")
    if (!success) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429, headers })
    }

    const userCount = await prisma.user.count()
    if (userCount > 0) {
      return NextResponse.json({ error: "Setup has already been completed." }, { status: 410 })
    }

    const { username, password } = await request.json()
    if (!username || !password || password.length < 8) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newSuperAdmin = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: Role.SUPERADMIN
      }
    })

    const { password: _, ...userWithoutPassword } = newSuperAdmin

    return NextResponse.json({
      success: true,
      message: "System initialized. Super Admin created.",
      data: userWithoutPassword
    })
  } catch (error) {
    console.error("Setup Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
