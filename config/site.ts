export const siteConfig = {
  name: "Makoto • まこと",
  description: "คำอธิบายเว็บไซต์คิดไม่ออก",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://gawstxn-makoto.vercel.app",
  ogImage: "https://gawstxn-makoto.vercel.app/og.jpg",
  links: {
    twitter: "https://twitter.com/makoto",
    github: "https://github.com/makoto-admin"
  },
  keywords: ["gawstxn", "makoto", "まこと", "", ""]
}

export type SiteConfig = typeof siteConfig
