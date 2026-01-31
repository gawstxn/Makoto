import { getProducts } from "@/lib/api/products"
import { ProductCard } from "./product-card"

export async function ProductSection() {
  const products = await getProducts()

  return (
    <section className="container py-12 md:py-24 mx-auto p-4" id="products">
      <div className="flex flex-col items-center gap-4 text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">สินค้าแนะนำ</h2>
        <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          คัดสรรสินค้าคุณภาพเยี่ยมเพื่อคุณโดยเฉพาะ
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
