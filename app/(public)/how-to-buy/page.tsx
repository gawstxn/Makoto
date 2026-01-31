"use client"

import { Search, MousePointerClick, Gift, Mail, HelpCircle } from "lucide-react"

// Shadcn UI Components
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function HowToBuyPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Header Section */}
      <section className="bg-white border-b py-16 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="mb-2 bg-red-100 text-red-600 hover:bg-red-200">
            Automated System 24/7
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900">สั่งซื้อง่าย ได้ของทันที</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            ระบบอัตโนมัติ 100% เพียง 4 ขั้นตอนง่ายๆ <br className="hidden sm:inline" />
            คุณก็จะได้รับ Code/Key สินค้าไปใช้งานได้ภายใน 1 นาที
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8 space-y-16">
        {/* 2. Steps Grid (4 Steps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Step 1 */}
          <Card className="shadow-lg border-none hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="text-9xl font-black text-gray-900 leading-none">1</span>
            </div>
            <CardHeader className="relative">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600 shadow-sm">
                <Search className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl">เลือกสินค้า</CardTitle>
              <CardDescription className="text-gray-500">
                ค้นหาเกมหรือโปรแกรมที่ต้องการ เลือกจำนวน แล้วกดปุ่ม{" "}
                <span className="text-blue-600 font-semibold">"ซื้อทันที"</span>
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Step 2 */}
          <Card className="shadow-lg border-none hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="text-9xl font-black text-gray-900 leading-none">2</span>
            </div>
            <CardHeader className="relative">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 text-orange-600 shadow-sm">
                <MousePointerClick className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl">ตรวจสอบรายการ</CardTitle>
              <CardDescription className="text-gray-500">
                ในหน้า Checkout ตรวจสอบรายการสินค้า และยอดเงินรวมที่ต้องชำระให้ถูกต้อง
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Step 3 */}
          <Card className="shadow-lg border-none hover:shadow-xl transition-all duration-300 relative overflow-hidden group bg-gradient-to-br from-white to-red-50/50 border-red-100">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="text-9xl font-black text-red-900 leading-none">3</span>
            </div>
            <CardHeader className="relative">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-4 text-red-600 shadow-sm">
                <Gift className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl text-red-700">ชำระเงิน (ซอง)</CardTitle>
              <CardDescription className="text-gray-600">
                สร้างซองของขวัญ TrueMoney <span className="font-bold text-red-600">ตามยอดที่ระบุ</span> แล้วนำลิงก์มาวาง
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Step 4 */}
          <Card className="shadow-lg border-none hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <span className="text-9xl font-black text-gray-900 leading-none">4</span>
            </div>
            <CardHeader className="relative">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-green-600 shadow-sm">
                <Mail className="h-7 w-7" />
              </div>
              <CardTitle className="text-xl">รับสินค้าทันที</CardTitle>
              <CardDescription className="text-gray-500">
                ระบบตรวจสอบยอดเงิน (1-3 วินาที) และส่ง Code/Key ไปทาง{" "}
                <span className="font-semibold text-green-600">อีเมล</span> ทันที
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* 3. FAQ Section */}
        <div className="max-w-3xl mx-auto pb-10">
          <div className="flex items-center gap-2 mb-6 ml-1">
            <HelpCircle className="h-6 w-6 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-800">คำถามที่พบบ่อย</h2>
          </div>

          <Card className="border-none shadow-md">
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="px-6">
                  <AccordionTrigger className="text-base font-medium hover:no-underline">
                    ชำระเงินแล้วจะได้ของตอนไหน?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 pb-4">
                    ทันทีครับ! ระบบของเราเป็นระบบอัตโนมัติ 100% ทันทีที่ระบบตรวจสอบลิงก์ซองของขวัญสำเร็จ (ใช้เวลา 1-3
                    วินาที) Key สินค้าจะถูกส่งไปที่อีเมลของคุณ และแสดงบนหน้าเว็บทันที
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="px-6">
                  <AccordionTrigger className="text-base font-medium hover:no-underline">
                    ทำไมต้องใช้ซองของขวัญ TrueMoney?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 pb-4">
                    ระบบซองของขวัญช่วยให้ AI ตรวจสอบยอดเงินได้ทันทีตลอด 24 ชม. โดยไม่ต้องรอแอดมินมานั่งเช็คสลิปครับ
                    ทำให้ลูกค้าได้รับสินค้าไวที่สุด ไม่ต้องรอคิว
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="px-6 border-b-0">
                  <AccordionTrigger className="text-base font-medium hover:no-underline">
                    สินค้ามีปัญหา ใช้งานไม่ได้ ทำอย่างไร?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-500 pb-4">
                    หากได้รับโค้ดแล้วใช้งานไม่ได้ สามารถติดต่อเราได้ทาง Fanpage หรือ Line Official
                    พร้อมแนบหมายเลขคำสั่งซื้อ เรามีทีมงานดูแลตลอดเวลาครับ
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
