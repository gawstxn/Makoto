"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CATEGORIES = [
  { id: "all", label: "ทั้งหมด" },
  { id: "Game Key", label: "Game Key" },
  { id: "Software", label: "Software" },
  { id: "Gift Card", label: "Gift Card" },
  { id: "ID Game", label: "ID Game" }
]

export function CategoryTabs() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())

    // ถ้าเลือก "ทั้งหมด" ให้ลบ param ทิ้ง
    if (categoryId === "all") {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }

    // รีเซ็ตหน้ากลับไปหน้าแรก (ถ้ามี pagination)
    params.delete("page")

    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto no-scrollbar">
      {CATEGORIES.map(category => {
        const isActive = currentCategory === category.id
        return (
          <Button
            key={category.id}
            variant={isActive ? "default" : "outline"}
            size="lg"
            onClick={() => handleCategoryChange(category.id)}
            className={cn(
              "px-6 transition-all", // ทำเป็นทรงแคปซูลสวยๆ
              isActive ? "font-bold shadow-md" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {category.label}
          </Button>
        )
      })}
    </div>
  )
}
