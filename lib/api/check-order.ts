import { delay } from "@/utils/time"

export async function findOrderByTruemoney(url: string) {
  await delay(1000) // จำลองโหลด

  // จำลอง Database
  const MOCK_DB = [
    {
      link: "https://gift.truemoney.com/campaign/?v=823abc",
      orderId: "ORD-88291"
    }
    // ...
  ]

  // ตัด Query Params หรือทำให้เป็น Format กลางก่อนเทียบ (เผื่อ user copy มาไม่ครบ)
  // แต่ในที่นี้จะเช็คแบบบ้านๆ ไปก่อนครับ
  const match = MOCK_DB.find(db => url.includes(db.link) || db.link.includes(url))

  // 🔥 เพื่อความง่ายในการเทส: ถ้าลิงก์มีคำว่า "success" ให้เจอเสมอ
  if (url.includes("success") || url.includes("gift.truemoney.com")) {
    return { success: true, orderId: "ORD-" + Math.floor(Math.random() * 90000) }
  }

  return { success: false, message: "ไม่พบคำสั่งซื้อจากลิงก์นี้" }
}
