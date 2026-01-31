import { Footer } from "@/components/layout/footer"
import { Navbar } from "@/components/layout/navbar"
// import { SiteFooter } from "@/components/layout/site-footer" // (ถ้ามี Footer)

interface PublicLayoutProps {
  children: React.ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col relative">
      {/* 1. Navbar อยู่บนสุด */}
      <Navbar />

      {/* 2. Main Content ขยายเต็มพื้นที่ที่เหลือ */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  )
}
