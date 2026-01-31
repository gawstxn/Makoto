import { getProducts } from "@/lib/api/products"
import { ProductCard } from "@/components/landing/product-card"

interface ProductGridProps {
  // รับ searchParams เข้ามาแทนที่จะดึงใน Page หลัก
  searchParams: {
    query?: string
    category?: string
  }
}

export async function ProductGrid({ searchParams }: ProductGridProps) {
  // ✅ ย้ายการ await มาไว้ในนี้
  const products = await getProducts(searchParams)

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl bg-muted/20">
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-lg font-medium">ไม่พบสินค้าที่คุณค้นหา</p>
        <p className="text-muted-foreground mt-2">ลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่ "ทั้งหมด" ดูนะครับ</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
