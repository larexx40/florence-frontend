import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL || "/api"

const API_KEY = import.meta.env.VITE_APP_API_KEY || "api_key_efyuwgeyu783y83wyfeuiw7hhh76876756456ererewr323483y78eyr78yw78ryq894u98qhghghyutyuty"

export const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = Cookies.get("token")
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    headers.set("x-api-key", API_KEY)
    return headers
  },
})

// Custom baseQuery with 401 error handling
export const baseQueryWithAuth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions)

  // Check if the response is 401 Unauthorized
  if (result.error && result.error.status === 401) {
    // Don't redirect if we're already on the login page or if this is a login request
    const isOnLoginPage = window.location.pathname === '/login'
    const isLoginRequest = typeof args === 'object' && args.url?.includes('/auth/login')

    if (!isOnLoginPage && !isLoginRequest) {
      // Clear the token cookie
      Cookies.remove("token")
      // Clear RTK Query cache
      api.dispatch(baseApi.util.resetApiState())
      // Redirect to login page
      window.location.href = "/login"
    }
    return result
  }

  return result
}

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Product", "Cart", "Auth", "User", "Order", "Category", "Option", "Cart", "Admin", "User", "Order", "Coupon", "Auth", "Category"],
  endpoints: () => ({}),
})
