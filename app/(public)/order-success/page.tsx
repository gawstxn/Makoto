import Link from "next/link"
import { redirect } from "next/navigation"
import { CheckCircle2, ShoppingBag, AlertCircle, ArrowRight, Mail, Inbox, Home } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

// Mock Data Function
async function getOrder(orderId: string) {
  if (orderId === "FAIL") return null
  return {
    id: orderId,
    status: "paid",
    items: [
      { name: "Elden Ring Steam Key", price: 1490 },
      { name: "Windows 11 Pro", price: 490 } // ลองเพิ่มสินค้าให้ดูยาวขึ้น
    ],
    total: 1980,
    email: "customer@example.com",
    date: "31 ม.ค. 2026"
  }
}

interface OrderSuccessPageProps {
  searchParams: Promise<{ id?: string }>
}

export default async function OrderSuccessPage(props: OrderSuccessPageProps) {
  const params = await props.searchParams
  const orderId = params.id

  if (!orderId) redirect("/")

  const order = await getOrder(orderId)

  // Case 1: Error State
  if (!order) {
    return (
      <div className="h-[calc(100vh-65px)] flex flex-col items-center justify-center space-y-4 text-center">
        <div className="rounded-full bg-red-100 p-4 animate-bounce">
          <AlertCircle className="h-10 w-10 text-red-600" />
        </div>
        <h1 className="text-2xl font-bold">ไม่พบคำสั่งซื้อ</h1>
        <Link href="/">
          <Button variant="outline">กลับหน้าหลัก</Button>
        </Link>
      </div>
    )
  }

  // Case 2: Success State (Fixed Height Layout)
  return (
    // ✅ Wrapper หลัก: ล็อคความสูงและจัดกึ่งกลางบน Desktop
    <div className="bg-muted/10 min-h-screen lg:h-[calc(100vh-65px)] lg:min-h-0 lg:overflow-hidden flex items-center justify-center p-4">
      {/* ✅ Card Container: กำหนด max-height และ Flex Column เพื่อดัน Content ข้างใน */}
      <Card className="w-full max-w-lg border-none shadow-2xl shadow-primary/10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-500">
        {/* --- 1. Fixed Header (ส่วนหัวสีเขียว ไม่เลื่อน) --- */}
        <div className="bg-green-600 p-6 text-center text-white space-y-3 relative shrink-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

          <div className="relative mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner mb-2">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <div className="relative">
            <h1 className="text-xl font-bold tracking-tight">ชำระเงินเรียบร้อย!</h1>
            <p className="text-green-50 text-sm font-medium opacity-90">ขอบคุณที่อุดหนุนครับ</p>
          </div>
        </div>

        {/* --- 2. Scrollable Content (ส่วนเนื้อหา เลื่อนได้ถ้าเยอะเกิน) --- */}
        <div className="overflow-y-auto custom-scrollbar flex-1">
          <CardContent className="pt-6 space-y-6">
            {/* Email Notification */}
            <div className="bg-blue-50/80 border border-blue-100 p-5 rounded-2xl text-center space-y-3 mx-2">
              <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto text-blue-600">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-blue-900">สินค้าถูกส่งไปที่อีเมลแล้ว</h3>
                <p className="text-blue-700/90 text-sm leading-relaxed px-2">
                  เช็คที่ <span className="font-bold text-blue-800">{order.email}</span>
                </p>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-blue-600/70 bg-blue-100/50 py-1.5 rounded-lg">
                <Inbox className="h-3 w-3" />
                <span>อย่าลืมตรวจสอบ Junk/Spam นะครับ</span>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-4 px-2">
              <div className="flex justify-between items-center text-sm text-muted-foreground border-b pb-2 border-dashed">
                <span>Order ID</span>
                <span className="font-mono font-bold text-foreground">{order.id}</span>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <ShoppingBag className="h-3 w-3" /> รายการสินค้า
                </h3>
                <div className="rounded-xl border bg-muted/20 p-4 space-y-3 text-sm">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4">
                      <span className="text-foreground font-medium line-clamp-1">{item.name}</span>
                      <span className="font-mono text-muted-foreground whitespace-nowrap">
                        ฿{item.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <Separator className="bg-border/60" />
                  <div className="flex justify-between text-base font-bold text-primary">
                    <span>ยอดสุทธิ</span>
                    <span>฿{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>

        {/* --- 3. Fixed Footer (ส่วนปุ่ม ไม่เลื่อน) --- */}
        <CardFooter className="flex flex-col gap-2 p-6 pt-2 bg-background shrink-0 z-10">
          <Link href="/" className="w-full">
            <Button className="w-full h-11 text-base font-bold shadow-md hover:shadow-lg transition-all" size="lg">
              <Home className="h-4 w-4" /> กลับหน้าหลัก
            </Button>
          </Link>
          <p className="text-center text-[10px] text-muted-foreground pt-2 opacity-60">
            Transaction Date: {order.date}
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
