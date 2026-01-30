"use client"

import { useSession, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"

export default function HomePage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="p-10 text-center">Loading...</div>
  }

  if (!session) return null

  const { username, role, id } = session.user || {}

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-xl text-center">ข้อมูลผู้ใช้งาน</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-1">
            <Label className="text-gray-500">Username</Label>
            <div className="text-lg font-semibold">{username}</div>
          </div>

          <div className="flex flex-col space-y-1">
            <Label className="text-gray-500">Role</Label>
            <div>
              <Badge variant={role === "SUPER_ADMIN" ? "destructive" : "default"} className="text-sm">
                {role}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <Label className="text-gray-500">User ID</Label>
            <div className="bg-gray-100 p-2 rounded text-xs font-mono text-gray-700 break-all">{id}</div>
          </div>

          <div className="pt-4 border-t">
            <Label className="text-xs text-gray-400 mb-2 block">Raw Session Data</Label>
            <pre className="bg-black text-green-400 p-3 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => signOut({ callbackUrl: "/signin" })}
          >
            ออกจากระบบ
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
