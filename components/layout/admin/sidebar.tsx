"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, LogOut, Store } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500"
  },
  {
    label: "คำสั่งซื้อ (Orders)",
    icon: ShoppingCart,
    href: "/admin/orders",
    color: "text-violet-500"
  },
  {
    label: "สินค้า (Products)",
    icon: Package,
    href: "/admin/products",
    color: "text-pink-700"
  },
  {
    label: "ลูกค้า (Users)",
    icon: Users,
    href: "/admin/users",
    color: "text-orange-700"
  },
  {
    label: "ตั้งค่า (Settings)",
    icon: Settings,
    href: "/admin/settings"
  }
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4">
            {/* ใส่ Logo ตรงนี้ หรือใช้ Icon แทน */}
            <div className="bg-white rounded-lg w-full h-full flex items-center justify-center">
              <span className="text-slate-900 font-bold text-xl">M</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold">
            Makoto <span className="text-xs font-normal text-slate-400">Admin</span>
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map(route => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Sidebar: ปุ่มกลับหน้าบ้าน */}
      <div className="px-3 py-2">
        <Link href="/">
          <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10">
            <Store className="h-5 w-5 mr-3" />
            กลับหน้าเว็บไซต์
          </Button>
        </Link>
      </div>
    </div>
  )
}
