import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_APP_URL!,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL!}/status`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    }
  ]
}
