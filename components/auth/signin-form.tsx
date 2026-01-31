// components/auth/signin-form.tsx
"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, LogIn, Eye, EyeOff, Lock, User, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription } from "@/components/ui/alert"

// ตรวจสอบ path นี้ว่าถูกต้องไหม (ถ้าไม่มีไฟล์นี้ ให้สร้าง validation schema ขึ้นมา)
import { signInSchema } from "@/lib/validations/auth"

export function SigninForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // ⭐️ ดึง callbackUrl จาก URL ถ้าไม่มีให้ไป /admin/dashboard
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard"

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "CredentialsSignin" ? "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" : null
  )

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { username: "", password: "" }
  })

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        username: values.username,
        password: values.password,
        redirect: false
      })

      if (result?.error) {
        console.error(result.error)
        setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
      } else if (result?.ok) {
        // ⭐️ Redirect ไปยังหน้าที่ User พยายามจะเข้า (หรือ Dashboard)
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ")
    } finally {
      setIsSubmitting(false)
    }
  }

  // ... (ส่วน return JSX ของคุณ เหมือนเดิมเป๊ะครับ) ...
  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* ... ใส่ JSX เดิมของคุณตรงนี้ได้เลย ... */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="admin" {...field} className="pl-9" autoCapitalize="none" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...field}
                      className="pl-9 pr-9"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <Alert variant="destructive" className="py-2 bg-red-50 text-red-900 border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> กำลังตรวจสอบ...
              </>
            ) : (
              <>
                เข้าสู่ระบบ <LogIn className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
