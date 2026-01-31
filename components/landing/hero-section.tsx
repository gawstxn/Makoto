import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle2, ShoppingBag, Zap, ShieldCheck, Gamepad2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-10 md:py-20 lg:py-28">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />

      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              {/* Badge: เน้นระบบ Auto */}
              <div className="flex justify-center lg:justify-start">
                <Badge
                  variant="secondary"
                  className="px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                >
                  ระบบจัดส่งอัตโนมัติ ได้ของทันทีใน 1 นาที
                </Badge>
              </div>

              {/* H1 Headline: เน้นสินค้า Digital/Game Key */}
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-7xl">
                ปลดล็อกความสนุก <br className="hidden lg:inline" />
                ด้วย <span className="text-primary">Key & ID เกมราคาสุดคุ้ม</span>
              </h1>

              {/* Description: ขยายความสินค้า */}
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl lg:mx-0">
                แหล่งรวม Game Key, ID เกม Steam/Riot, และซอฟต์แวร์ลิขสิทธิ์แท้ มั่นใจด้วยระบบความปลอดภัยสูงสุด
                รับประกันหลังการขายทุกออเดอร์
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center lg:justify-start">
              <Link href="/products">
                <Button size="lg" className="w-full min-[400px]:w-auto h-12 px-8 text-base shadow-lg shadow-primary/25">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  เลือกซื้อสินค้า
                </Button>
              </Link>
              <Link href="/how-to-buy">
                <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto h-12 px-8 text-base">
                  วิธีการสั่งซื้อ <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Trust Badges: ปรับให้เข้ากับสินค้า Digital */}
            <div className="flex flex-wrap items-center justify-center gap-6 lg:justify-start text-sm text-muted-foreground pt-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span>ส่งโค้ดทันที 24 ชม.</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>รับประกันไอดีแท้ 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4 text-blue-500" />
                <span>มีเกมให้เลือกกว่า 500+ เกม</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="mx-auto w-full max-w-125 lg:max-w-none">
            <div className="relative aspect-square lg:aspect-4/3 overflow-hidden rounded-2xl bg-muted/50 shadow-2xl ring-1 ring-border">
              {/* แนะนำให้เปลี่ยนรูปเป็นพวก Game Character หรือ Software Box Art */}
              <Image
                src="/assets/hero.png"
                alt="Digital Game Keys and Software"
                fill
                className="object-cover transition-transform hover:scale-105 duration-700"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
