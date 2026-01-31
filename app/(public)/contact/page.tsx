"use client"

import { Mail, MessageCircle, Phone, Clock, Facebook, ArrowRight, HelpCircle } from "lucide-react"

// Shadcn UI Components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* 1. Header Section */}
      <section className="bg-white border-b py-16 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Badge variant="secondary" className="mb-2">
            Online Support Only
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900">มีคำถาม? ทักแชทได้เลย</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            เราไม่มีหน้าร้าน แต่ทีมงานพร้อมดูแลคุณผ่านช่องทางออนไลน์ <br className="hidden sm:inline" />
            ตอบกลับไวภายใน 15 นาที (ในเวลาทำการ)
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8 space-y-12">
        {/* 2. Main Contact Grid (The "Hub") */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card 1: Line OA (Highlight สุด) */}
          <Card className="shadow-lg border-green-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <MessageCircle className="w-24 h-24 text-green-600 transform rotate-12" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-green-700">
                <MessageCircle className="h-8 w-8" /> Line Official
              </CardTitle>
              <CardDescription className="text-base">
                ช่องทางที่ตอบไวที่สุด เหมาะสำหรับถามสเปค หรือเช็คสถานะสินค้า
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#00B900] hover:bg-[#009900] text-white h-12 text-lg font-medium shadow-green-200 shadow-md">
                แอดไลน์ @yourshop
              </Button>
              <p className="text-xs text-center text-gray-400 mt-3">หรือสแกน QR Code ได้ที่เมนู</p>
            </CardContent>
          </Card>

          {/* Card 2: Facebook Messenger */}
          <Card className="shadow-lg border-blue-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Facebook className="w-24 h-24 text-blue-600 transform -rotate-12" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl text-blue-700">
                <Facebook className="h-8 w-8" /> Messenger
              </CardTitle>
              <CardDescription className="text-base">
                ทักแชทเพจ Facebook สำหรับติดตามโปรโมชั่น หรือรีวิวสินค้า
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#0084FF] hover:bg-[#006bcf] text-white h-12 text-lg font-medium shadow-blue-200 shadow-md">
                ทักแชท Facebook
              </Button>
              <p className="text-xs text-center text-gray-400 mt-3">ติดตามเพจเพื่อรับข่าวสารใหม่ๆ</p>
            </CardContent>
          </Card>

          {/* Card 3: Email & Business */}
          <Card className="shadow-lg border-gray-200 hover:shadow-xl transition-all duration-300 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
                <Mail className="h-6 w-6" /> ติดต่องาน / อื่นๆ
              </CardTitle>
              <CardDescription>สำหรับเสนอขายสินค้า, สมัครงาน หรือแจ้งปัญหาการใช้งานเว็บไซต์</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <a href="mailto:support@example.com">
                <Button variant="outline" className="w-full h-12 text-base border-2 hover:bg-gray-50">
                  <Mail className="mr-2 h-4 w-4" /> ส่งอีเมลหาเรา
                </Button>
              </a>

              <div className="bg-slate-50 p-4 rounded-lg space-y-2 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <span className="font-semibold">เวลาทำการแอดมิน:</span>
                </div>
                <p className="text-sm text-gray-500 pl-6">จันทร์ - ศุกร์: 09:00 - 18:00 น.</p>
                <p className="text-sm text-gray-500 pl-6">(เสาร์-อาทิตย์ ตอบช้านิดนึงนะครับ)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. FAQ Section (ลดภาระการตอบคำถามซ้ำๆ) */}
        <section className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-6 w-6 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-800">คำถามที่ลูกค้าถามบ่อย</h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-medium">ร้านอยู่ที่ไหน มีหน้าร้านไหม?</AccordionTrigger>
                <AccordionContent className="text-gray-500 leading-relaxed">
                  เราเป็นร้านค้าออนไลน์ 100% ครับ ไม่มีหน้าร้านให้เข้ามาดูสินค้า
                  แต่เรามีรีวิวและภาพสินค้าจริงให้ดูครบถ้วน และรับประกันความพึงพอใจครับ
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-medium">สั่งของวันนี้ ได้ของวันไหน?</AccordionTrigger>
                <AccordionContent className="text-gray-500 leading-relaxed">
                  เราตัดรอบส่งเวลา 14:00 น. ของทุกวันครับ <br />
                  - กทม. และปริมณฑล: ได้รับวันถัดไป <br />- ต่างจังหวัด: ได้รับภายใน 2-3 วันทำการ
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-medium">สินค้ามีประกันไหม เคลมยังไง?</AccordionTrigger>
                <AccordionContent className="text-gray-500 leading-relaxed">
                  สินค้าทุกชิ้นมีประกันศูนย์ไทยครับ หากมีปัญหาภายใน 7 วัน เปลี่ยนตัวใหม่ให้ทันที
                  หลังจากนั้นสามารถส่งเคลมผ่านทางเรา หรือส่งเข้าศูนย์บริการโดยตรงได้เลยครับ
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </div>
  )
}
