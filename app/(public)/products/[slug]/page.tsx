import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Laptop } from "lucide-react"

import { getProductBySlug } from "@/lib/api/products"
import { formatCurrency } from "@/utils/format"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductCheckoutForm } from "@/components/products/product-checkout-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"

// กำหนด Type ของ Params เป็น Promise (สำหรับ Next.js 15)
interface ProductPageProps {
  params: Promise<{ slug: string }>
}

// 1. Generate Metadata
export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
  const params = await props.params
  const product = await getProductBySlug(params.slug)

  if (!product) return { title: "ไม่พบสินค้า" }

  return {
    title: `${product.name} | Makoto Shop`,
    description: product.description,
    openGraph: { images: [product.image] }
  }
}

// 2. Main Page Component
export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params // ต้อง await ก่อนใช้งาน
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12 mx-auto min-h-screen">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6 md:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">หน้าแรก</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/products">สินค้าทั้งหมด</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold text-primary">{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Grid Layout (items-start เพื่อให้ Sticky ทำงาน) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* --- Left Column: Image & Details (7/12) --- */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Image */}
          <div className="relative aspect-video overflow-hidden rounded-2xl border bg-muted shadow-sm group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
            />
            {product.originalPrice && (
              <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full font-bold text-sm shadow-md z-10">
                ลด {(100 - (product.price / product.originalPrice) * 100).toFixed(0)}%
              </div>
            )}
          </div>

          {/* ❌ Trust Badges ถูกลบออกแล้ว */}

          {/* Info Tabs */}
          <div className="mt-8">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger
                  value="details"
                  className="cursor-pointer rounded-none bg-transparent data-[state=active]:border-primary data-[state=active]:border-b-3 px-6 py-3 font-medium"
                >
                  รายละเอียดสินค้า
                </TabsTrigger>
                <TabsTrigger
                  value="activation"
                  className="cursor-pointer rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-medium"
                >
                  วิธีใช้งาน
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="pt-6 animate-in fade-in slide-in-from-left-2">
                <div className="prose prose-sm md:prose-base max-w-none text-muted-foreground">
                  <p>{product.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="activation" className="pt-6 animate-in fade-in slide-in-from-right-2">
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-xl border space-y-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Laptop className="h-5 w-5" />
                    การใช้งาน (Activation)
                  </h3>
                  <ul className="list-decimal list-inside space-y-2 text-muted-foreground text-sm">
                    <li>ไปที่เมนู Redeem Code หรือ Activate Product ในแพลตฟอร์มที่กำหนด</li>
                    <li>นำรหัส (Key) ที่ได้รับทางอีเมลไปกรอกเพื่อรับสินค้า</li>
                    <li>สินค้าจะถูกเพิ่มเข้าบัญชีของคุณทันที</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* --- Right Column: Checkout Form (Sticky) (5/12) --- */}
        <div className="lg:col-span-5 sticky top-24 z-10">
          <div className="space-y-6">
            {/* Header Info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{product.category}</Badge>
                {/* เช็ค Stock เพื่อแสดงสถานะ */}
                {product.stock > 0 ? (
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  >
                    มีสินค้าพร้อมส่ง ({product.stock})
                  </Badge>
                ) : (
                  <Badge variant="destructive">สินค้าหมด</Badge>
                )}
              </div>

              <h1 className="text-2xl font-bold md:text-3xl text-foreground">{product.name}</h1>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-primary">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through decoration-red-500/50">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <Separator />

            {/* ❌ Platform / Region Grid ถูกลบออกแล้ว */}

            {/* Checkout Form (จะจัดการเรื่องจำนวนและปุ่มกดเองตาม Stock) */}
            <ProductCheckoutForm product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}
