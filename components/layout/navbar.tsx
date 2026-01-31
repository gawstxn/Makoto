"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ClipboardClock } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const navItems = [
  { title: "หน้าแรก", href: "/" },
  { title: "สินค้าทั้งหมด", href: "/products" },
  { title: "วิธีการสั่งซื้อ", href: "/how-to-buy" },
  { title: "ติดต่อเรา", href: "/contact" }
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/85">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
        {/* --- 1. Left Side: Logo & Mobile Menu --- */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-left font-bold text-xl">{siteConfig.name}</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4 px-4">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
                <hr />
                <Link
                  key="/check-order"
                  href="/check-order"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-primary",
                    pathname === "/check-order" ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  ตรวจสอบคำสั่งซื้อ
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl tracking-tight">{siteConfig.name}</span>
          </Link>
        </div>

        {/* --- 2. Middle: Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href ? "text-foreground" : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* --- 3. Right Side: Cart & Actions --- */}
        <div className="flex items-center gap-2">
          <Link href="/check-order">
            <Button
              variant="ghost"
              className={cn(
                "hidden sm:flex text-muted-foreground",
                pathname === "/check-order" ? "text-foreground" : "text-muted-foreground"
              )}
            >
              <ClipboardClock className="h-4 w-4" />
              ตรวจสอบคำสั่งซื้อ
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
