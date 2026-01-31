import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, AlertCircle } from "lucide-react"

import { getProducts } from "@/lib/api/products"
import { CheckoutForm } from "@/components/checkout/checkout-form"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface CheckoutPageProps {
  searchParams: Promise<{
    productId?: string
    quantity?: string
    email?: string
  }>
}

export default async function CheckoutPage(props: CheckoutPageProps) {
  const params = await props.searchParams

  if (!params.productId || !params.quantity) {
    redirect("/products")
  }

  // 1. ดึงข้อมูลสินค้าล่าสุดจาก DB
  const products = await getProducts()
  const product = products.find(p => p.id === params.productId)

  if (!product) notFound()

  // 2. ตรวจสอบ Stock (Validation)
  const requestedQty = parseInt(params.quantity, 10) || 1

  // 🔴 ถ้าสินค้าหมด ให้เด้งออก หรือแจ้งเตือน
  if (product.stock <= 0) {
    return (
      <div className="container py-20 text-center space-y-4 p-4">
        <h1 className="text-2xl font-bold text-destructive">สินค้าหมดชั่วคราว</h1>
        <p>ขออภัย สินค้ารายการนี้ถูกจำหน่ายหมดแล้วในขณะที่คุณกำลังทำรายการ</p>
        <Link href="/products">
          <Button>กลับไปเลือกสินค้าอื่น</Button>
        </Link>
      </div>
    )
  }

  // 🟡 ถ้าขอมามากกว่าที่มี -> ปรับให้เท่ากับ Stock สูงสุด
  let validQuantity = requestedQty
  let adjustedMessage = null

  if (requestedQty > product.stock) {
    validQuantity = product.stock // 👈 Force ให้เท่ากับ Max Stock
    adjustedMessage = `คุณเลือกสินค้า ${requestedQty} ชิ้น แต่เรามีสินค้าเพียง ${product.stock} ชิ้น ระบบจึงปรับจำนวนให้อัตโนมัติ`
  }

  return (
    <div className="container py-8 md:py-12 mx-auto min-h-screen bg-muted/10 p-4">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Link href={`/products/${product.slug}`}>
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">ยืนยันคำสั่งซื้อ</h1>
      </div>

      {/* ⚠️ แจ้งเตือนถ้ามีการปรับลดจำนวน */}
      {adjustedMessage && (
        <Alert variant="destructive" className="mb-6 bg-orange-50 text-orange-900 border-orange-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>จำนวนสินค้าถูกปรับเปลี่ยน</AlertTitle>
          <AlertDescription>{adjustedMessage}</AlertDescription>
        </Alert>
      )}

      {/* ส่ง validQuantity ที่ผ่านการกรองแล้วไปให้ Form */}
      <CheckoutForm product={product} initialEmail={params.email || ""} quantity={validQuantity} />
    </div>
  )
}
