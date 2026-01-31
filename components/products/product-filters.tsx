"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

const CATEGORIES = [
  { id: "all", label: "ทั้งหมด" },
  { id: "Game Key", label: "Game Key (Steam/Epic)" },
  { id: "Software", label: "Software & Windows" },
  { id: "Gift Card", label: "Gift Card & Wallet" },
  { id: "ID Game", label: "ID Game (มือสอง)" }
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || "all"

  // ฟังก์ชันเปลี่ยน URL โดยไม่รีเฟรชหน้า
  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("category")
    } else {
      params.set("category", value)
    }
    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/products")
  }

  return (
    <div className="space-y-8">
      {/* หมวดหมู่ */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold tracking-tight">หมวดหมู่สินค้า</h3>
        <RadioGroup value={currentCategory} onValueChange={handleCategoryChange}>
          <div className="space-y-3">
            {CATEGORIES.map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={category.id} />
                <Label htmlFor={category.id} className="cursor-pointer font-normal">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* ปุ่มล้างตัวกรอง */}
      <Button
        variant="outline"
        className="w-full"
        onClick={clearFilters}
        disabled={!searchParams.toString()} // ถ้าไม่มี query params ให้ disable
      >
        ล้างตัวกรอง
      </Button>
    </div>
  )
}
