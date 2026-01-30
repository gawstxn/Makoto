import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { checkRateLimit } from "@/lib/ratelimit"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    const { success, headers } = await checkRateLimit(undefined, 5, "1 h")
    if (!success) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429, headers })
    }

    const { username, password } = await request.json()
    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { username }
    })

    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userCount = await prisma.user.count()
    if (userCount === 0) {
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
        message: "Super Admin created successfully",
        data: userWithoutPassword
      })
    }

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id
      }
    })

    if (!currentUser || currentUser.role !== Role.SUPERADMIN) {
      return NextResponse.json({ error: "Forbidden: Only Super Admin can create users" }, { status: 403 })
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: Role.ADMIN
      }
    })

    const { password: _, ...newUserWithoutPassword } = newUser

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: newUserWithoutPassword
    })
  } catch (error) {
    console.error("Registration Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
