"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  return (
    <div className="p-4">
      <h1>Hello Makoto</h1>
      <p>Wait for design and features</p>
      <Button onClick={() => router.push("/signin")} className="mt-4" size="sm">
        Sign in
      </Button>
    </div>
  )
}
