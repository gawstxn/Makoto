import { Suspense } from "react"
import { HeroSection } from "@/components/landing/hero-section"
import { ProductSection } from "@/components/landing/product-section" // Async Component
import { ProductSkeleton } from "@/components/landing/product-skeleton"
import { JsonLd } from "@/components/seo/json-ld"
import { getProducts } from "@/lib/api/products" // import มาเพื่อทำ JSON-LD

export default async function IndexPage() {
  // (Optional) Pre-fetch data for JSON-LD SEO
  // ถ้าอยากให้ JSON-LD สมบูรณ์ที่สุด อาจต้อง fetch ตรงนี้ด้วย
  // (Next.js จะ dedupe request ให้เอง ไม่ต้องกลัวยิงซ้ำ)
  const products = await getProducts()

  return (
    <>
      {/* ✅ SEO: Structured Data สำหรับสินค้า (สำคัญมาก) */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Product",
              name: product.name,
              description: product.description,
              image: `https://your-site.com${product.image}`,
              offers: {
                "@type": "Offer",
                price: product.price,
                priceCurrency: "THB",
                availability: "https://schema.org/InStock"
              }
            }
          }))
        }}
      />

      <div className="flex min-h-screen flex-col">
        <main className="flex-1 animate-fade-up animate-once">
          {/* Static: มาทันที */}
          <HeroSection />

          {/* Dynamic: รอโหลด (Streaming) */}
          <Suspense fallback={<ProductSkeleton />}>
            <ProductSection />
          </Suspense>
        </main>
      </div>
    </>
  )
}
