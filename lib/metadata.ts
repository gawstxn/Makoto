// lib/metadata.ts
import type { Metadata } from "next";

// 1. กำหนดค่า Config กลาง
const siteConfig = {
  name: "My Awesome Shop",
  description: "จำหน่ายสินค้า IT คุณภาพสูง ราคาถูก ส่งไว",
  url: "https://my-awesome-shop.com",
  ogImage: "https://my-awesome-shop.com/og-default.jpg",
};

// 2. สร้างฟังก์ชัน Helper เพื่อรวมค่า (Merge)
type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
};

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = "/favicon.ico",
}: SeoProps = {}): Metadata {
  return {
    title: title
      ? {
          default: title,
          template: `%s | ${siteConfig.name}`, // ผลลัพธ์: "หน้าสินค้า | My Awesome Shop"
        }
      : siteConfig.name,
    description,
    openGraph: {
      title: title ? `${title} | ${siteConfig.name}` : siteConfig.name,
      description,
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      locale: "th_TH",
      type: "website",
    },
    icons,
    metadataBase: new URL(siteConfig.url), // สำคัญ! ช่วยแก้ปัญหา URL รูปภาพไม่ขึ้น
  };
}
