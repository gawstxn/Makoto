"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function NotFound() {
  const router = useRouter()
  const pathname = usePathname()
  const [count, setCount] = useState(3)

  useEffect(() => {
    const countdown = setInterval(() => {
      setCount(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    const redirectTimer = setTimeout(() => {
      if (typeof window !== "undefined" && window.history.length > 2) {
        router.back()
      } else {
        if (pathname.startsWith("/admin")) {
          router.push("/admin")
        } else {
          router.push("/")
        }
      }
    }, 3000)
    return () => {
      clearTimeout(redirectTimer)
      clearInterval(countdown)
    }
  }, [router, pathname])

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 text-center p-4">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <h2 className="text-xl font-semibold text-gray-800">Not Found</h2>

        <div className="flex flex-col items-center gap-2 text-gray-500">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
          <p>
            Redirecting to previous page in <span className="font-bold text-blue-600 text-lg">{count}</span> seconds
          </p>
        </div>
      </div>
    </div>
  )
}
