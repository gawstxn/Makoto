"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Ticket, Gift, ArrowRight, ShieldCheck, Mail, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Product } from "@/lib/api/products"
import { checkCoupon, placeOrder } from "@/lib/api/checkout"
import { formatCurrency } from "@/utils/format"
import { Badge } from "@/components/ui/badge"

const checkoutSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลที่ถูกต้อง (สำคัญ: สินค้าจะถูกส่งไปที่นี่)"),
  truemoneyUrl: z
    .string()
    .url("ลิ้งค์ไม่ถูกต้อง")
    .includes("gift.truemoney.com", { message: "ต้องเป็นลิ้งค์ซองของขวัญ TrueMoney เท่านั้น" })
})

type CheckoutValues = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  product: Product
  initialEmail: string
  quantity: number
}

export function CheckoutForm({ product, initialEmail, quantity }: CheckoutFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isCheckingCoupon, setIsCheckingCoupon] = useState(false)
  const [couponMessage, setCouponMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      email: initialEmail || "",
      truemoneyUrl: ""
    }
  })

  const subtotal = product.price * quantity
  const total = Math.max(0, subtotal - discount)

  const handleApplyCoupon = async () => {
    if (!couponCode) return
    setIsCheckingCoupon(true)
    setCouponMessage(null)

    const result = await checkCoupon(couponCode)

    if (result.success) {
      setDiscount(result.discount!)
      setCouponMessage({ type: "success", text: `ลดราคา ${result.discount} บาท เรียบร้อย!` })
    } else {
      setDiscount(0)
      setCouponMessage({ type: "error", text: result.message! })
    }
    setIsCheckingCoupon(false)
  }

  const onSubmit = async (data: CheckoutValues) => {
    setIsSubmitting(true)

    const result = await placeOrder({
      ...data,
      productId: product.id,
      quantity,
      couponCode: discount > 0 ? couponCode : null,
      total
    })

    if (result.success) {
      router.push(`/order-success?id=${result.orderId}`)
    }
    setIsSubmitting(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start animate-in fade-in duration-500">
      {/* --- Left Column: Forms --- */}
      <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
        <div className="space-y-2 pb-4 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <ShieldCheck className="h-6 w-6" />
            </div>
            ข้อมูลการจัดส่ง & ชำระเงิน
          </h2>
          <p className="text-muted-foreground ml-12">กรอกข้อมูลให้ครบถ้วนเพื่อรับสินค้าทันที</p>
        </div>

        <Form {...form}>
          {/* ✅ 1. เพิ่ม ID ให้ Form เพื่อให้ปุ่มด้านขวาสั่ง Submit ได้ */}
          <form id="checkout-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Email Input */}
            <div className="space-y-5 rounded-2xl border p-6 bg-card/50 shadow-sm relative overflow-hidden">
              {/* Decoration */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

              <h3 className="text-lg font-semibold flex items-center gap-3 text-foreground">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm">
                  <Mail className="h-5 w-5" />
                </div>
                1. ช่องทางรับสินค้า
              </h3>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground/80 font-medium">อีเมล (Email)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ชื่ออีเมลของคุณ (เช่น name@gmail.com)"
                        {...field}
                        className="h-12 text-lg bg-background border-muted-foreground/20 focus-visible:ring-primary shadow-sm"
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" /> สินค้าจะถูกส่งไปที่อีเมลนี้ทันทีหลังชำระเงิน
                    </p>
                  </FormItem>
                )}
              />
            </div>

            {/* TrueMoney Input */}
            <div className="space-y-5 rounded-2xl border p-6 bg-card/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-orange-500/5 rounded-full blur-2xl pointer-events-none"></div>

              <h3 className="text-lg font-semibold flex items-center gap-3 text-foreground">
                <div className="h-9 w-9 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center p-1 shadow-sm">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                </div>
                2. ชำระเงิน (ซองของขวัญ)
              </h3>

              <FormField
                control={form.control}
                name="truemoneyUrl"
                render={({ field }) => (
                  <FormItem className="space-y-5">
                    <div className="rounded-xl bg-orange-50/80 border border-orange-200/60 p-5 text-sm text-orange-900 space-y-3 shadow-sm">
                      <p className="font-bold flex items-center gap-2 text-base text-orange-800">
                        <Gift className="h-5 w-5" /> ขั้นตอนการสร้างซองที่ถูกต้อง
                      </p>
                      <ol className="list-decimal list-inside space-y-2 opacity-90 text-sm pl-2">
                        <li>
                          เข้าแอป TrueMoney เลือกเมนู <strong>"ส่งซองของขวัญ"</strong>
                        </li>
                        <li>
                          ใส่ยอดเงิน{" "}
                          <span className="font-bold bg-white px-2 py-0.5 rounded-md text-orange-600 border border-orange-200 shadow-sm">
                            {formatCurrency(total)}
                          </span>{" "}
                          (ต้องตรงเป๊ะ)
                        </li>
                        <li>
                          เลือกประเภท <strong>"แบ่งจำนวนเงินเท่ากัน"</strong>
                        </li>
                        <li>
                          จำนวนคนรับซอง <strong>"1"</strong> คน เท่านั้น
                        </li>
                        <li>กดยืนยัน แล้วคัดลอกลิงก์มาวางในช่องด้านล่าง</li>
                      </ol>
                    </div>

                    <FormControl>
                      <Input
                        placeholder="วางลิงก์ซองของขวัญที่นี่ (https://gift.truemoney.com/...)"
                        {...field}
                        className="h-12 font-mono text-sm border-orange-200/80 focus-visible:ring-orange-500 focus-visible:border-orange-500 bg-white shadow-sm"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ✅ 2. Mobile Button: แสดงเฉพาะจอเล็ก (lg:hidden) */}
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/25 rounded-xl lg:hidden"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  กำลังตรวจสอบ...
                </>
              ) : (
                <>
                  ยืนยันคำสั่งซื้อ ({formatCurrency(total)}) <ArrowRight className="ml-2 h-6 w-6" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* --- Right Column: Summary --- */}
      <div className="lg:col-span-5 order-1 lg:order-2">
        <div className="sticky top-28 rounded-2xl border bg-card shadow-lg shadow-muted/20 overflow-hidden">
          {/* Header */}
          <div className="bg-muted/40 p-6 border-b flex gap-4 items-start">
            <div className="relative h-20 w-20 shrink-0 rounded-xl overflow-hidden border bg-background shadow-sm">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold line-clamp-2 leading-tight">{product.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary" className="h-6 px-2 text-xs font-medium">
                  {product.category}
                </Badge>
                <span className="font-medium">x {quantity} ชิ้น</span>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6 bg-card">
            {/* Coupon */}
            <div className="space-y-2.5">
              <Label className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                โค้ดส่วนลด (Coupon)
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="กรอกโค้ดส่วนลดที่นี่"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                  disabled={discount > 0}
                  className="bg-background border-muted-foreground/20"
                />
                <Button
                  variant="secondary"
                  onClick={handleApplyCoupon}
                  disabled={!couponCode || isCheckingCoupon || discount > 0}
                  className="font-medium"
                >
                  {isCheckingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : "ใช้โค้ด"}
                </Button>
              </div>
              {couponMessage && (
                <p
                  className={`text-sm mt-2 flex items-center gap-1.5 ${couponMessage.type === "success" ? "text-green-600 font-medium" : "text-red-500"}`}
                >
                  {couponMessage.type === "success" ? <Ticket className="h-4 w-4" /> : null}
                  {couponMessage.text}
                </p>
              )}
            </div>

            <Separator className="bg-border/60" />

            {/* Price Info */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>ยอดรวมสินค้า ({quantity} ชิ้น)</span>
                <span className="font-medium text-foreground">{formatCurrency(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-medium bg-green-50/50 p-2 rounded-lg -mx-2">
                  <span className="flex items-center gap-1.5">
                    <Ticket className="h-4 w-4" /> ส่วนลด
                  </span>
                  <span>- {formatCurrency(discount)}</span>
                </div>
              )}

              <Separator className="my-2 bg-border/60" />

              <div className="flex justify-between items-end pt-2">
                <span className="font-bold text-lg">ยอดที่ต้องชำระสุทธิ</span>
                <span className="text-3xl font-black text-primary tracking-tight">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* ✅ 3. Desktop Button: แสดงเฉพาะจอใหญ่ (hidden lg:flex) */}
            {/* สั่งงาน form ผ่าน attribute form="checkout-form" */}
            <Button
              type="submit"
              form="checkout-form" // 🔥 Key Point: สั่ง Submit Form ด้านซ้าย
              size="lg"
              className="w-full h-14 text-lg font-bold shadow-xl shadow-primary/25 rounded-xl hidden lg:flex transition-transform hover:scale-[1.02]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  ตรวจสอบ...
                </>
              ) : (
                <>
                  ชำระเงินทันที <ArrowRight className="ml-2 h-6 w-6" />
                </>
              )}
            </Button>

            <p className="text-[11px] text-center text-muted-foreground hidden lg:block">
              🔒 ธุรกรรมปลอดภัยด้วยการเข้ารหัส SSL 256-bit
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
