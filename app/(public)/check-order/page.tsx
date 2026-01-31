"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Search, Loader2, Link as LinkIcon, AlertCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { findOrderByTruemoney } from "@/lib/api/check-order"

const checkOrderSchema = z.object({
  url: z
    .string()
    .url("รูปแบบลิงก์ไม่ถูกต้อง")
    .includes("gift.truemoney.com", { message: "ต้องเป็นลิงก์ซองของขวัญ TrueMoney เท่านั้น" })
})

export default function CheckOrderPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<z.infer<typeof checkOrderSchema>>({
    resolver: zodResolver(checkOrderSchema),
    defaultValues: {
      url: ""
    }
  })

  async function onSubmit(values: z.infer<typeof checkOrderSchema>) {
    setIsSubmitting(true)
    setError(null)

    try {
      const result = await findOrderByTruemoney(values.url)

      if (result.success) {
        // ✅ ถ้าเจอ: Redirect ไปหน้า Order Success เพื่อดูข้อมูล
        router.push(`/order-success?id=${result.orderId}`)
      } else {
        // ❌ ถ้าไม่เจอ: แจ้ง Error
        setError("ไม่พบข้อมูลการสั่งซื้อจากลิงก์นี้ กรุณาตรวจสอบความถูกต้อง")
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-start min-h-screen py-12 px-4 bg-muted/10">
      <div className="w-full max-w-lg space-y-6">
        {/* Header Text */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">ตรวจสอบสถานะคำสั่งซื้อ</h1>
          <p className="text-muted-foreground">
            กรอกลิงก์ซองของขวัญที่คุณใช้ชำระเงิน <br /> เพื่อค้นหา Order ของคุณ
          </p>
        </div>

        {/* Search Card */}
        <Card className="shadow-xl shadow-primary/5 border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5 text-primary" /> ค้นหาด้วยลิงก์ซอง
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TrueMoney Angpao Link</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="https://gift.truemoney.com/campaign/?v=..."
                            {...field}
                            className="pl-9 font-mono text-sm"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Error Alert */}
                {error && (
                  <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>ผิดพลาด</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full h-11 text-base font-bold" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> กำลังค้นหา...
                    </>
                  ) : (
                    <>
                      ตรวจสอบสถานะ <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            {/* Hint */}
            <div className="mt-6 text-center text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg border border-dashed">
              <p>
                จำลิงก์ไม่ได้? ให้เข้าไปดูในแอป TrueMoney <br />
                เมนู <strong>"รายการย้อนหลัง"</strong> {">"} เลือกรายการที่โอน {">"} ดูรายละเอียด
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
