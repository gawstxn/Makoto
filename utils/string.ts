/**
 * ตัดข้อความที่ยาวเกินไปและต่อท้ายด้วย ...
 * ตัวอย่าง: truncate("Hello World", 5) -> "Hello..."
 * * @param str ข้อความต้นฉบับ
 * @param length ความยาวสูงสุดที่ต้องการ
 * @returns string ข้อความที่ถูกตัดแล้ว
 */
export function truncate(str: string, length: number) {
  if (!str) return ""
  return str.length > length ? `${str.substring(0, length)}...` : str
}

/**
 * สร้างตัวอักษรย่อจากชื่อ (สำหรับ Avatar)
 * ตัวอย่าง: "Makoto Admin" -> "MA"
 * * @param name ชื่อเต็ม
 * @returns string ตัวอักษรย่อ 1-2 ตัวพิมพ์ใหญ่
 */
export function getInitials(name: string) {
  if (!name) return ""
  return (
    name
      .match(/(^\S\S?|\b\S)?/g)
      ?.join("")
      .match(/(^\S|\S$)?/g)
      ?.join("")
      .toUpperCase() || ""
  )
}

/**
 * สุ่มรหัส String (เช่นใช้ทำ Ref Code หรือ Password ชั่วคราว)
 * * @param length ความยาวที่ต้องการ (default: 8)
 * @returns string รหัสสุ่มภาษาอังกฤษตัวพิมพ์ใหญ่+ตัวเลข
 */
export function generateRandomId(length = 8) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2)
    .toUpperCase()
}

/**
 * แปลงข้อความให้เป็น URL Slug (รองรับภาษาไทย)
 * ตัวอย่าง: "Elden Ring: Shadow of the Erdtree" -> "elden-ring-shadow-of-the-erdtree"
 * ตัวอย่าง: "เกม Resident Evil 4 Remake" -> "resident-evil-4-remake"
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\u0E00-\u0E7F-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}
