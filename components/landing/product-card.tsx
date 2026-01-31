import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, PackageX, Box } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/utils/format"

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
  slug: string
  stock: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock === 0

  return (
    <Card
      className={`p-0 gap-0 group overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg ${isOutOfStock ? "opacity-90" : "hover:-translate-y-1"}`}
    >
      {/* --- Image Section --- */}
      {/* ✅ ปรับสัดส่วนเป็น 16/9 (aspect-video) เพื่อให้การ์ดเตี้ยลง */}
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-110 ${isOutOfStock ? "grayscale" : ""}`}
          />
        </div>
      </CardHeader>

      {/* --- Content Section --- */}
      {/* ✅ ลด Padding จาก p-5 เหลือ p-3 ให้ดู Compact ขึ้น */}
      <CardContent className="flex-1 p-4 pt-0 space-y-2">
        <div className="space-y-1">
          <Badge variant="outline" className="w-fit text-[10px] text-muted-foreground px-1.5 py-0 h-5">
            {product.category}
          </Badge>
          {/* ลดความสูง title ลง */}
          <h3 className="font-bold text-sm leading-tight line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        </div>

        {/* ✅ แสดง Stock เสมอ (แม้จะเป็น 0) */}
        <div
          className={`flex items-center gap-1.5 text-xs ${isOutOfStock ? "text-red-500 font-medium" : "text-muted-foreground"}`}
        >
          <Box className="h-3.5 w-3.5" />
          <span>มีสินค้า {product.stock} ชิ้น</span>
        </div>
      </CardContent>

      {/* --- Footer / Action Section --- */}
      <CardFooter className="p-4 pt-0 mt-auto">
        <div className="flex w-full items-center justify-between gap-3">
          {/* Price */}
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground">ราคา</span>
            <span
              className={`text-base font-bold ${isOutOfStock ? "text-muted-foreground decoration-slate-400" : "text-primary"}`}
            >
              {formatCurrency(product.price)}
            </span>
          </div>

          {/* Button */}
          {isOutOfStock ? (
            <Button disabled variant="secondary" size="sm" className="w-24 h-9 opacity-80 text-xs">
              <PackageX className="mr-1.5 h-3.5 w-3.5" />
              หมด
            </Button>
          ) : (
            <Link href={`/products/${product.slug}`} className="w-24">
              <Button size="sm" className="w-full h-9 shadow-md shadow-primary/20 text-xs">
                <ShoppingCart className="mr-1.5 h-3.5 w-3.5" />
                ซื้อเลย
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
