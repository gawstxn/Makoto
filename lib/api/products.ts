import { delay } from "@/utils/time"

// 1. Type Definition
export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  originalPrice?: number // ราคาเต็ม (มีหรือไม่มีก็ได้)
  image: string
  category: "Game Key" | "Software" | "Gift Card" | "ID Game"
  stock: number // ✅ ใช้จำนวนสินค้าแทน (0 = หมด)
  createdAt: string // ไว้เรียงลำดับ "มาใหม่"
}

// 2. Mock Data (ข้อมูลจำลอง)
const ALL_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "elden-ring-steam-key",
    name: "Elden Ring",
    description: "สุดยอดเกม RPG แห่งปี สำรวจดินแดน Lands Between ในโลก Open World ที่กว้างใหญ่และอันตราย",
    price: 1490,
    originalPrice: 1990,
    image: "/assets/hero.png",
    category: "Game Key",
    stock: 0, // มีของ 15 ชิ้น
    createdAt: "2024-01-10T10:00:00Z"
  },
  {
    id: "2",
    slug: "windows-11-pro-license",
    name: "Windows 11 Pro License",
    description: "คีย์แท้ 100% สำหรับเปิดใช้งาน Windows 11 Pro ถาวร อัปเดตได้ตลอดชีพ ย้ายเครื่องได้",
    price: 490,
    originalPrice: 490,
    image: "/assets/hero.png",
    category: "Software",
    stock: 50, // สินค้า Digital มีเยอะ
    createdAt: "2024-01-15T12:00:00Z"
  },
  {
    id: "3",
    slug: "valorant-points-5000-vp",
    name: "Valorant Points 5350 VP",
    description: "เติมเข้า ID ทันทีระบบออโต้ เพียงกรอก Riot ID สะดวก รวดเร็ว ปลอดภัย",
    price: 1200,
    originalPrice: 1350,
    image: "/assets/hero.png",
    category: "Gift Card",
    stock: 0, // ❌ สินค้าหมด (ตัวอย่าง)
    createdAt: "2024-02-01T09:00:00Z"
  },
  {
    id: "4",
    slug: "id-valorant-rank-ascendant",
    name: "ID Valorant Rank Ascendant",
    description: "ไอดีมือสอง แรงค์ Ascendant 2 มีสกิน Vandal RGX, Phantom Oni, Knife Reaver ครบเซ็ต",
    price: 2500,
    originalPrice: 4500,
    image: "/assets/hero.png",
    category: "ID Game",
    stock: 1, // ไอดีเกมมักจะมีแค่ 1 ชิ้น
    createdAt: "2024-01-20T15:30:00Z"
  },
  {
    id: "5",
    slug: "microsoft-office-2021",
    name: "Microsoft Office 2021 Home & Student",
    description: "ผูกกับบัญชี Microsoft ของคุณ ใช้ได้ถาวร ย้ายเครื่องได้ ของแท้ 100%",
    price: 890,
    originalPrice: 2490,
    image: "/assets/hero.png",
    category: "Software",
    stock: 20,
    createdAt: "2024-01-05T08:00:00Z"
  },
  {
    id: "6",
    slug: "steam-wallet-500-thb",
    name: "Steam Wallet 500 THB",
    description: "รหัสเติมเงิน Steam Wallet มูลค่า 500 บาท โซนไทย ส่งโค้ดทันที",
    price: 550,
    image: "/assets/hero.png",
    category: "Gift Card",
    stock: 8,
    createdAt: "2024-02-05T11:00:00Z"
  },
  {
    id: "7",
    slug: "cyberpunk-2077-ultimate",
    name: "Cyberpunk 2077: Ultimate Edition",
    description: "รวมภาคหลักและ Phantom Liberty สัมผัสประสบการณ์ Night City เต็มรูปแบบ",
    price: 1290,
    originalPrice: 1890,
    image: "/assets/hero.png",
    category: "Game Key",
    stock: 5,
    createdAt: "2024-01-25T14:00:00Z"
  },
  {
    id: "8",
    slug: "minecraft-java-bedrock",
    name: "Minecraft: Java & Bedrock Edition",
    description: "เกม Sandbox ยอดนิยมตลอดกาล ได้ทั้งสองเวอร์ชันในคีย์เดียว",
    price: 850,
    originalPrice: 1100,
    image: "/assets/hero.png",
    category: "Game Key",
    stock: 100,
    createdAt: "2024-02-10T10:00:00Z"
  }
]

// 3. API Functions

export interface GetProductsParams {
  query?: string
  category?: string
  sort?: string
}

/**
 * ดึงรายการสินค้าทั้งหมด พร้อม Filter/Search/Sort
 */
export async function getProducts({ query, category, sort }: GetProductsParams = {}) {
  // จำลอง Network Latency
  await delay(800)

  let filtered = [...ALL_PRODUCTS]

  // 1. Search Query
  if (query) {
    const q = query.toLowerCase()
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }

  // 2. Category Filter
  if (category && category !== "all") {
    filtered = filtered.filter(p => p.category === category)
  }

  // 3. Sort Logic
  if (sort === "price_asc") {
    filtered.sort((a, b) => a.price - b.price)
  } else if (sort === "price_desc") {
    filtered.sort((a, b) => b.price - a.price)
  } else if (sort === "newest") {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return filtered
}

/**
 * ดึงสินค้าชิ้นเดียวจาก Slug
 */
export async function getProductBySlug(slug: string) {
  await delay(500)
  const product = ALL_PRODUCTS.find(p => p.slug === slug)
  return product || null
}

/**
 * ดึงสินค้าแนะนำ (สำหรับหน้า Home)
 * - เอาเฉพาะสินค้าที่มีของ (stock > 0)
 * - เอามาแค่ 6 อันแรก
 */
export async function getFeaturedProducts() {
  await delay(1000)
  return ALL_PRODUCTS.filter(p => p.stock > 0).slice(0, 6)
}
