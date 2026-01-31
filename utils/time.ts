/**
 * แสดงวันที่แบบสั้น (ไทย)
 * ตัวอย่าง: 31 ม.ค. 2026
 * * @param date วันที่ (Date object, timestamp number, หรือ string)
 * @returns string วันที่แบบย่อ
 */
export function formatDate(date: string | number | Date) {
  if (!date) return "-"
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(date))
}

/**
 * แสดงวันที่แบบเต็ม (ไทย)
 * ตัวอย่าง: 31 มกราคม 2569
 * * @param date วันที่ (Date object, timestamp number, หรือ string)
 * @returns string วันที่แบบเต็ม
 */
export function formatFullDate(date: string | number | Date) {
  if (!date) return "-"
  return new Intl.DateTimeFormat("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date))
}

/**
 * แสดงวันที่และเวลา
 * ตัวอย่าง: 31 ม.ค. 2026, 14:30 น.
 * * @param date วันที่ (Date object, timestamp number, หรือ string)
 * @returns string วันที่และเวลา
 */
export function formatDateTime(date: string | number | Date) {
  if (!date) return "-"
  return (
    new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date(date)) + " น."
  )
}

/**
 * แสดงเวลาอย่างเดียว
 * ตัวอย่าง: 14:30 น.
 * * @param date วันที่ (Date object, timestamp number, หรือ string)
 * @returns string เวลา
 */
export function formatTime(date: string | number | Date) {
  if (!date) return "-"
  return (
    new Intl.DateTimeFormat("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date(date)) + " น."
  )
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
