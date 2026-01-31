import { NextResponse } from "next/server"
import { ApiResponse } from "@/types/api"

export function createResponse<T>(
  data: T | null,
  message: string,
  statusCode: number = 200,
  error?: ApiResponse["error"],
  meta: Partial<ApiResponse["metadata"]> = {}
) {
  const responseBody: ApiResponse<T> = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data: data ?? undefined,
    error,
    metadata: {
      timestamp: new Date().toISOString(),
      ...meta
    }
  }

  return NextResponse.json(responseBody, { status: statusCode })
}
