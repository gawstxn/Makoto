import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { withRoles } from "@/lib/api/guards"
import { Role } from "@prisma/client"

const getCategories = async () => {
  const categories = await prisma.category.findMany()
  return NextResponse.json({
    success: true,
    data: categories
  })
}

const createCategory = async (req: Request) => {
  const body = await req.json()
  const category = await prisma.category.create({
    data: body
  })
  return NextResponse.json({
    success: true,
    data: category
  })
}

const updateCategory = async (req: Request) => {
  const body = await req.json()
  const category = await prisma.category.update({
    where: {
      id: body.id
    },
    data: body
  })
  return NextResponse.json({
    success: true,
    data: category
  })
}

const deleteCategory = async (req: Request) => {
  const body = await req.json()
  const category = await prisma.category.delete({
    where: {
      id: body.id
    }
  })
  return NextResponse.json({
    success: true,
    data: category
  })
}

export const GET = withRoles([Role.ADMIN, Role.SUPERADMIN], getCategories)
export const POST = withRoles([Role.ADMIN, Role.SUPERADMIN], createCategory)
export const PUT = withRoles([Role.ADMIN, Role.SUPERADMIN], updateCategory)
export const DELETE = withRoles([Role.ADMIN, Role.SUPERADMIN], deleteCategory)
