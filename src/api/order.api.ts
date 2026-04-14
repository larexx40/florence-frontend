import { baseApi } from "./_index.api"
import type { ApiResponse } from "@/@types/auth.type"
import type { 
  PlaceOrderDto, 
  UpdateOrderStatusDto, 
  OrderQueryParams,
  OrderStatus,
  PaymentStatus 
} from "@/@types/order-api.type"
import type { PaginatedDataDto } from "@/@types/user.type"

// Order types based on API spec
export interface OrderItemDto {
  id: string
  variantId: string
  productName: string
  variantName: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface OrderDto {
  id: string
  orderNumber: string
  email: string
  customerId?: string
  customerName?: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  total: number
  items: OrderItemDto[]
  address?: unknown
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface OrdersListResponseDto {
  orders: OrderDto[]
  pagination: PaginatedDataDto
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /orders - List all orders (admin/staff)
    getOrders: builder.query<ApiResponse<OrdersListResponseDto>, OrderQueryParams>({
      query: (params) => ({
        url: "/orders",
        params,
      }),
      providesTags: ["Order"],
    }),

    // GET /orders/{id} - Get order by ID
    getOrderById: builder.query<ApiResponse<OrderDto>, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // PATCH /orders/{id}/status - Update order status
    updateOrderStatus: builder.mutation<ApiResponse<OrderDto>, { id: string; body: UpdateOrderStatusDto }>({
      query: ({ id, body }) => ({
        url: `/orders/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Order", id }],
    }),

    // GET /orders/{id}/receipt - Get thermal receipt
    getOrderReceipt: builder.query<string, string>({
      query: (id) => `/orders/${id}/receipt`,
    }),
  }),
})

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useGetOrderReceiptQuery,
} = orderApi
