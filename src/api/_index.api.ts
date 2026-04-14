import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL || "/api"

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token")
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Product", "Products", "Category", "Cart", "Admin", "User", "Order", "Coupon", "Auth"],
  endpoints: () => ({}),
})
