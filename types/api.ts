export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: {
    code: string
    details?: any
  }
  metadata?: {
    timestamp: string
    requestId?: string
    page?: number
    limit?: number
    total?: number
  }
}
