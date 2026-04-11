import { baseApi } from "./_index.api"
import type { Product } from "@/@types/product.type"
import type { PaginatedResponse } from "@/@types/_index"

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<Product>, { page?: number; category?: string }>({
      query: (params) => ({ url: "/products", params }),
      providesTags: ["Products"],
    }),
    getProductBySlug: builder.query<Product, string>({
      query: (slug) => `/products/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Product", id: slug }],
    }),
  }),
  overrideExisting: false,
})

export const { useGetProductsQuery, useGetProductBySlugQuery } = productApi
