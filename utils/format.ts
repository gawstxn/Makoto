/**
 * แปลงตัวเลขเป็นรูปแบบเงินบาทไทย (THB)
 * ตัวอย่าง: 1200 -> ฿1,200.00
 * * @param amount จำนวนเงิน (number)
 * @returns string ที่จัดรูปแบบเป็นเงินบาท
 */
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 2
  }).format(amount)
}

/**
 * แปลงตัวเลขเป็นรูปแบบที่มีลูกน้ำคั่น
 * ตัวอย่าง: 1000000 -> 1,000,000
 * * @param number ตัวเลขที่ต้องการจัดรูปแบบ
 * @returns string ตัวเลขพร้อมลูกน้ำ
 */
export function formatNumber(number: number) {
  return new Intl.NumberFormat("th-TH").format(number)
}

/**
 * แปลงตัวเลขเป็นเปอร์เซ็นต์
 * ตัวอย่าง: 12.5 -> 12.5%
 * * @param value ค่าตัวเลข (เช่น 100 = 100%, 50 = 50%)
 * @returns string เปอร์เซ็นต์
 */
export function formatPercentage(value: number) {
  // หาร 100 เพราะ Intl มอง 1 = 100%
  return new Intl.NumberFormat("th-TH", {
    style: "percent",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value / 100)
}

/**
 * แปลงขนาดไฟล์ (Bytes) เป็นหน่วยที่อ่านง่าย (KB, MB, GB)
 * ตัวอย่าง: 1024 -> 1 KB
 * * @param bytes ขนาดไฟล์ในหน่วย Bytes
 * @param decimals (Optional) จำนวนทศนิยมที่ต้องการ (default: 2)
 * @returns string ขนาดไฟล์พร้อมหน่วย
 */
export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}
