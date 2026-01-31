"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

export function ProductToolbar() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // State สำหรับช่องค้นหา
  const [search, setSearch] = useState(searchParams.get("query") || "")

  // Debounce: รอ User หยุดพิมพ์ 500ms ค่อยเปลี่ยน URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (search) {
        params.set("query", search)
      } else {
        params.delete("query")
      }
      router.push(`/products?${params.toString()}`)
    }, 500)
    return () => clearTimeout(timer)
  }, [search, router, searchParams])

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
      {/* ช่องค้นหา */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="ค้นหาชื่อเกม, โปรแกรม..."
          className="pl-9"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* เรียงลำดับ */}
      <Select onValueChange={handleSortChange} defaultValue={searchParams.get("sort") || "newest"}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="เรียงลำดับ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">มาใหม่ล่าสุด</SelectItem>
          <SelectItem value="price_asc">ราคา: ต่ำ - สูง</SelectItem>
          <SelectItem value="price_desc">ราคา: สูง - ต่ำ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
