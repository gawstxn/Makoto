import { Metadata } from "next"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SetupForm } from "@/components/auth/setup-form"

export const metadata: Metadata = {
  title: "System Setup - Makoto Admin",
  description: "Initial setup for the administration system"
}

export default async function SetupPage() {
  // 🛡️ Server-Side Protection
  // เช็คก่อนเลยว่ามี User หรือยัง ถ้ามีแล้วห้ามเข้าหน้านี้
  const userCount = await prisma.user.count()

  if (userCount > 0) {
    redirect("/signin")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Header / Logo Area */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          {/* ใส่ Logo หรือ Icon ของโปรเจกต์ตรงนี้ */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8 text-primary"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome to Makoto Admin</h1>
        <p className="mt-2 text-sm text-gray-600">
          ระบบยังไม่ถูกเปิดใช้งาน กรุณาสร้างบัญชีผู้ดูแลระบบสูงสุดเพื่อเริ่มต้น
        </p>
      </div>

      <Card className="w-full max-w-md shadow-lg border-primary/20">
        <CardHeader className="space-y-1 bg-primary/5 pb-6">
          <CardTitle className="text-xl font-semibold text-primary">System Initialization</CardTitle>
          <CardDescription>สร้างบัญชี Super Admin สำหรับจัดการระบบ</CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <SetupForm />
        </CardContent>
      </Card>

      <p className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Makoto Admin System. All rights reserved.
      </p>
    </div>
  )
}
