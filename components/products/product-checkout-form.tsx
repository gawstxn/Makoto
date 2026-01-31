"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Minus, Plus, CreditCard, Loader2, Box } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Product } from "@/lib/api/products"
import { formatCurrency } from "@/utils/format"

interface ProductCheckoutFormProps {
  product: Product
}

export function ProductCheckoutForm({ product }: ProductCheckoutFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // ✅ ตัด Email ออกจาก Schema (เหลือแค่เช็คจำนวน)
  const checkoutSchema = z.object({
    quantity: z.number().min(1, "จำนวนต้องมากกว่า 0").max(product.stock, `สินค้ามีจำกัดเพียง ${product.stock} ชิ้น`)
  })

  type CheckoutValues = z.infer<typeof checkoutSchema>

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      quantity: product.stock > 0 ? 1 : 0
    }
  })

  const onSubmit = async (data: CheckoutValues) => {
    setIsLoading(true)
    // ลดเวลา Delay ลงหน่อยเพราะไม่ต้อง validate email แล้ว
    await new Promise(resolve => setTimeout(resolve, 300))

    // ✅ ส่งแค่ ID กับ Quantity ไปหน้า Checkout (ไม่ต้องส่ง email)
    const params = new URLSearchParams({
      productId: product.id,
      quantity: data.quantity.toString()
    })

    router.push(`/checkout?${params.toString()}`)
  }

  const handleQuantityChange = (delta: number) => {
    const current = form.getValues("quantity")
    const next = current + delta
    if (next >= 1 && next <= product.stock) {
      form.setValue("quantity", next)
    }
  }

  const currentQty = form.watch("quantity")
  const totalPrice = product.price * (currentQty || 0)
  const isOutOfStock = product.stock === 0

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="space-y-1 mb-6">
        <h3 className="font-bold text-xl flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          สั่งซื้อทันที
        </h3>
        <p className="text-sm text-muted-foreground">เลือกจำนวนสินค้า แล้วไปชำระเงินได้เลย</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* ❌ ตัดช่อง Email ออกแล้ว */}

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel className="font-semibold">จำนวน</FormLabel>
                  <span
                    className={`text-sm flex items-center gap-1 ${isOutOfStock ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    <Box className="h-3 w-3" />
                    {isOutOfStock ? "สินค้าหมด" : `มีสินค้า ${product.stock} ชิ้น`}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 shrink-0"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={isOutOfStock || field.value <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <div className="flex-1 text-center font-bold text-xl border rounded-md h-10 flex items-center justify-center bg-background">
                    {field.value}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 shrink-0"
                    onClick={() => handleQuantityChange(1)}
                    disabled={isOutOfStock || field.value >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="border-t pt-4 mt-2 space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-muted-foreground">ยอดรวมทั้งสิ้น</span>
              <span className="font-bold text-2xl text-primary">{formatCurrency(totalPrice)}</span>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20"
              disabled={isLoading || isOutOfStock}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  กำลังดำเนินการ...
                </>
              ) : (
                <>{isOutOfStock ? "สินค้าหมดชั่วคราว" : "ไปหน้าชำระเงิน"}</>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
