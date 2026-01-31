"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDebounce } from "use-debounce" // 📦 ต้องลง npm i use-debounce ก่อน
import { Input } from "@/components/ui/input"

export function ProductSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("query") || ""

  const [text, setText] = useState(initialQuery)
  // ✅ 1. ใช้ Debounce (หน่วงเวลา 500ms)
  const [query] = useDebounce(text, 500)

  useEffect(() => {
    // ✅ 2. เช็คก่อนว่าค่าเปลี่ยนจริงไหม (ป้องกัน Loop)
    if (query === initialQuery) return

    const params = new URLSearchParams(searchParams)
    if (query) {
      params.set("query", query)
    } else {
      params.delete("query")
    }

    // ✅ 3. สั่งเปลี่ยน URL
    router.push(`/products?${params.toString()}`)
  }, [query, router, searchParams, initialQuery])

  return (
    <Input
      placeholder="ค้นหาสินค้า..."
      value={text}
      onChange={e => setText(e.target.value)}
      className="max-w-xl h-11"
    />
  )
}
