export interface ErrorResponse {
  message: string
  statusCode: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
