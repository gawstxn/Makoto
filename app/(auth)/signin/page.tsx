import { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck } from "lucide-react"
import { SigninForm } from "@/components/auth/signin-form"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Admin Login | Makoto Digital Key"
}

const year = new Date().getFullYear()

export default function SigninPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* Decorative Left Side */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <ShieldCheck className="mr-2 h-6 w-6" />
          Makoto Admin System
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">© {year} Makoto. All rights reserved.</p>
          </blockquote>
        </div>
      </div>

      {/* Login Form */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">เข้าสู่ระบบแอดมิน</h1>
            <p className="text-sm text-muted-foreground">กรอกข้อมูลเพื่อยืนยันตัวตน (NextAuth)</p>
          </div>

          <Suspense fallback={<div></div>}>
            <SigninForm />
          </Suspense>

          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary underline underline-offset-4">
              กลับไปหน้าร้านค้า
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
