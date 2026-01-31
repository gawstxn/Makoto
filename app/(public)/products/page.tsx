import { Metadata } from "next"
import { Suspense } from "react"
import { ProductSkeleton } from "@/components/landing/product-skeleton"
import { CategoryTabs } from "@/components/products/category-tabs"
import { ProductSearch } from "@/components/products/product-search"
import { ProductGrid } from "@/components/products/product-grid" // Import ตัวใหม่

export const metadata: Metadata = {
  title: "สินค้าทั้งหมด | Makoto Digital Key",
  description: "เลือกซื้อ Game Key และ Software ราคาประหยัด"
}

interface ProductsPageProps {
  searchParams: Promise<{
    query?: string
    category?: string
  }>
}

export default async function ProductsPage(props: ProductsPageProps) {
  // ✅ await แค่ searchParams (เร็วมาก) แต่ไม่ต้อง await getProducts ตรงนี้
  const searchParams = await props.searchParams

  return (
    <div className="container py-8 md:py-12 mx-auto min-h-screen p-4">
      <div className="flex flex-col items-center text-center gap-6 mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">เลือกซื้อสินค้า</h1>

        {/* ✅ ห่อ Suspense ให้ Search/Tabs เพื่อความชัวร์ (ป้องกัน Error useSearchParams) */}
        <Suspense>
          <ProductSearch />
          <CategoryTabs />
        </Suspense>
      </div>

      {/* ✅ ใช้ Suspense ห่อ ProductGrid แทน */}
      {/* key={JSON.stringify(searchParams)} จะช่วยบังคับให้ Skeleton เด้งขึ้นมาใหม่ทุกครั้งที่ Filter เปลี่ยน */}
      <Suspense fallback={<ProductSkeleton />} key={JSON.stringify(searchParams)}>
        <ProductGrid searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
