import { baseApi } from "./_index.api"
import type { ApiResponse } from "@/@types/auth.type"
import type { 
  CreateProductDto, 
  UpdateProductDto, 
  ProductQueryParams,
  AttachImageDto,
  AddProductOptionDto,
  UpdateProductOptionDto,
  AddOptionValueDto,
  UpdateOptionValueDto
} from "@/@types/product-api.type"
import type { PaginatedDataDto } from "@/@types/user.type"

// Product DTO
export interface ProductDto {
  id: string
  name: string
  slug: string
  description?: string
  basePrice: number
  compareAtPrice?: number
  costPerUnit?: number
  sku?: string
  barcode?: string
  trackInventory: boolean
  stockQuantity?: number
  lowStockThreshold?: number
  isActive: boolean
  metaTitle?: string
  metaDescription?: string
  categoryId?: string
  categoryName?: string
  discountId?: string
  images: Array<{
    id: string
    url: string
    altText?: string
    position: number
  }>
  options: Array<{
    id: string
    optionId: string
    name: string
    position: number
    values: Array<{
      id: string
      value: string
      position: number
    }>
  }>
  createdAt: string
  updatedAt: string
}

export interface ProductsListResponseDto {
  products: ProductDto[]
  pagination: PaginatedDataDto
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /products - List all products
    getProducts: builder.query<ApiResponse<ProductsListResponseDto>, ProductQueryParams>({
      query: (params) => ({ 
        url: "/products", 
        params: {
          ...params,
          page: params.page?.toString(),
          limit: params.limit?.toString(),
        } 
      }),
      providesTags: ["Products"],
    }),

    // GET /products/{slug} - Get product by slug
    getProductBySlug: builder.query<ApiResponse<ProductDto>, string>({
      query: (slug) => `/products/${slug}`,
      providesTags: (_result, _error, slug) => [{ type: "Product", id: slug }],
    }),

    // POST /products - Create product (admin only)
    createProduct: builder.mutation<ApiResponse<ProductDto>, CreateProductDto>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    // PATCH /products/{id} - Update product (admin only)
    updateProduct: builder.mutation<ApiResponse<ProductDto>, { id: string; body: UpdateProductDto }>({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }, "Products"],
    }),

    // DELETE /products/{id} - Deactivate product (admin only)
    deleteProduct: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // POST /products/{id}/images - Attach image to product
    attachImage: builder.mutation<ApiResponse<ProductDto>, { id: string; body: AttachImageDto }>({
      query: ({ id, body }) => ({
        url: `/products/${id}/images`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    // DELETE /products/{id}/images/{imageId} - Detach image
    detachImage: builder.mutation<ApiResponse<null>, { productId: string; imageId: string }>({
      query: ({ productId, imageId }) => ({
        url: `/products/${productId}/images/${imageId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: "Product", id: productId }],
    }),
  }),
})

export const { 
  useGetProductsQuery, 
  useGetProductBySlugQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAttachImageMutation,
  useDetachImageMutation,
} = productApi
