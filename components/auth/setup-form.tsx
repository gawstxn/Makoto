"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Rocket, ShieldCheck, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PasswordInput } from "@/components/ui/password-input"

export function SetupForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // 1. Client-side Validation
    if (formData.password !== formData.confirmPassword) {
      setError("❌ รหัสผ่านทั้งสองช่องไม่ตรงกัน")
      setLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("⚠️ รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร")
      setLoading(false)
      return
    }

    try {
      // 2. Call API
      const res = await fetch("/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 410) {
          // ถ้าเคย Setup ไปแล้ว ให้ดีดไปหน้า Login เลย
          router.replace("/signin")
          return
        }
        throw new Error(data.error || "Something went wrong")
      }

      // 3. Success -> Redirect to Login
      // อาจจะใส่ Toast notification ตรงนี้เพิ่มก็ได้
      router.push("/signin?setup=success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "การเชื่อมต่อล้มเหลว")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>ผิดพลาด</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">กำหนดชื่อผู้ใช้งาน (Super Admin)</Label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="username"
              name="username"
              placeholder="เช่น admin"
              required
              disabled={loading}
              value={formData.username}
              onChange={handleChange}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">รหัสผ่าน</Label>
          <PasswordInput
            id="password"
            name="password"
            placeholder="ตั้งรหัสผ่าน (อย่างน้อย 8 ตัว)"
            required
            disabled={loading}
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน</Label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            placeholder="กรอกรหัสผ่านอีกครั้ง"
            required
            disabled={loading}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </div>

      <Button className="w-full" size="lg" type="submit" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            กำลังตั้งค่าระบบ...
          </>
        ) : (
          <>
            <Rocket className="mr-2 h-4 w-4" />
            เริ่มต้นใช้งานระบบ
          </>
        )}
      </Button>
    </form>
  )
}
