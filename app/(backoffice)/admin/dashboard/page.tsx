"use client"

import {
  CreditCard,
  DollarSign,
  Package,
  Users,
  Activity,
  ArrowUpRight,
  ShoppingBag,
  MoreHorizontal
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* 1. Header & Actions */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>

      {/* 2. KPI Cards (Stats) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">รายได้ทั้งหมด</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿145,231.89</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-bold">+20.1%</span> จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">คำสั่งซื้อ</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2,350</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-bold">+180.1%</span> จากเดือนที่แล้ว
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Products/Keys */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">สินค้าคงเหลือ (Keys)</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">
              มี 4 รายการที่ <span className="text-red-500 font-bold">ใกล้หมด</span>
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Active Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ลูกค้าใช้งานอยู่</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 ตั้งแต่ชั่วโมงที่แล้ว</p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Left: Overview Chart (Bar Chart CSS) */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>ภาพรวมยอดขาย</CardTitle>
            <CardDescription>แสดงยอดขายรายเดือนในปีปัจจุบัน</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <SimpleBarChart />
          </CardContent>
        </Card>

        {/* Right: Recent Sales */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>รายการสั่งซื้อล่าสุด</CardTitle>
            <CardDescription>มีการสั่งซื้อ 265 รายการในเดือนนี้</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ------------------------------------------------------------------
// Sub-Components (เพื่อความสะอาดของไฟล์หลัก)
// ------------------------------------------------------------------

function RecentSales() {
  const sales = [
    { name: "Somchai K.", email: "somchai@example.com", amount: "฿1,990", product: "Elden Ring", avatar: "SK" },
    { name: "Alice Smith", email: "alice@example.com", amount: "฿450", product: "Windows 11 Pro", avatar: "AS" },
    { name: "John Doe", email: "john@example.com", amount: "฿2,500", product: "Cyberpunk 2077", avatar: "JD" },
    { name: "Somsri J.", email: "somsri@example.com", amount: "฿350", product: "Netflix 1 Month", avatar: "SJ" },
    { name: "David W.", email: "david@example.com", amount: "฿1,200", product: "Office 365", avatar: "DW" }
  ]

  return (
    <div className="space-y-8">
      {sales.map((sale, i) => (
        <div key={i} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sale.name}`} alt="Avatar" />
            <AvatarFallback>{sale.avatar}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.name}</p>
            <p className="text-xs text-muted-foreground">{sale.product}</p>
          </div>
          <div className="ml-auto font-medium">{sale.amount}</div>
        </div>
      ))}
    </div>
  )
}

// สร้างกราฟแท่งง่ายๆ ด้วย CSS/Tailwind (ไม่ต้องลง Recharts)
function SimpleBarChart() {
  const data = [
    { month: "Jan", height: "h-20", value: "฿4.5k" },
    { month: "Feb", height: "h-28", value: "฿6.2k" },
    { month: "Mar", height: "h-16", value: "฿3.8k" },
    { month: "Apr", height: "h-32", value: "฿7.5k" },
    { month: "May", height: "h-40", value: "฿9.1k" },
    { month: "Jun", height: "h-24", value: "฿5.5k" },
    { month: "Jul", height: "h-36", value: "฿8.2k" },
    { month: "Aug", height: "h-48", value: "฿11.0k" },
    { month: "Sep", height: "h-32", value: "฿7.2k" },
    { month: "Oct", height: "h-28", value: "฿6.5k" },
    { month: "Nov", height: "h-44", value: "฿10.2k" },
    { month: "Dec", height: "h-52", value: "฿12.5k" }
  ]

  return (
    <div className="mt-4">
      <div className="flex items-end justify-between gap-2 h-[250px] w-full px-2">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2 group w-full">
            {/* Tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -mt-8 bg-black text-white text-xs rounded px-2 py-1">
              {d.value}
            </div>
            {/* Bar */}
            <div
              className={`w-full bg-slate-900 dark:bg-slate-50 rounded-t-md transition-all hover:opacity-80 ${d.height}`}
              style={{ minHeight: "10px" }} // กันมันเตี้ยเกิน
            />
            {/* Label */}
            <span className="text-xs text-muted-foreground">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
