import { delay } from "@/utils/time"

// จำลองฐานข้อมูลคูปอง
const COUPONS: Record<string, number> = {
  WELCOME10: 10, // ลด 10 บาท
  SALE50: 50, // ลด 50 บาท
  MAKOTO99: 99 // ลด 99 บาท
}

export async function checkCoupon(code: string) {
  await delay(600) // จำลองโหลด
  const discount = COUPONS[code.toUpperCase()]

  if (discount !== undefined) {
    return { success: true, discount }
  } else {
    return { success: false, message: "โค้ดส่วนลดไม่ถูกต้อง หรือหมดอายุแล้ว" }
  }
}

export async function placeOrder(data: any) {
  await delay(1500) // จำลองการตรวจสอบซองอั่งเปา (นานหน่อยให้ดูสมจริง)

  // ในระบบจริง: ต้องยิงไป Backend เพื่อเช็คยอดเงินในซอง TrueMoney
  console.log("Order Placed:", data)

  return { success: true, orderId: "ORD-" + Math.floor(Math.random() * 100000) }
}
