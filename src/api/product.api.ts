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

    // POST /products - Create product (supports both JSON and FormData)
    createProduct: builder.mutation<ApiResponse<ProductDto>, CreateProductDto | FormData>({
      query: (body) => {
        const isFormData = body instanceof FormData
        return {
          url: "/products",
          method: "POST",
          body,
          headers: isFormData
            ? {} // Let browser set Content-Type for FormData
            : { "Content-Type": "application/json" },
        }
      },
      invalidatesTags: ["Products"],
    }),

    // PATCH /products/{id} - Update product (supports both JSON and FormData)
    updateProduct: builder.mutation<ApiResponse<ProductDto>, { id: string; body: UpdateProductDto | FormData }>({
      query: ({ id, body }) => {
        const isFormData = body instanceof FormData
        return {
          url: `/products/${id}`,
          method: "PATCH",
          body,
          headers: isFormData
            ? {} // Let browser set Content-Type for FormData
            : { "Content-Type": "application/json" },
        }
      },
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

    // POST /products/{id}/images - Attach image via URL (JSON)
    attachImage: builder.mutation<ApiResponse<ProductDto>, { id: string; body: AttachImageDto }>({
      query: ({ id, body }) => ({
        url: `/products/${id}/images`,
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Product", id }],
    }),

    // POST /products/{id}/images/upload - Upload image file (FormData)
    uploadProductImage: builder.mutation<ApiResponse<ProductDto>, { id: string; file: File; altText?: string }>({
      query: ({ id, file, altText }) => {
        const formData = new FormData()
        formData.append("image", file)
        if (altText) formData.append("altText", altText)
        return {
          url: `/products/${id}/images/upload`,
          method: "POST",
          body: formData,
          // Let browser set Content-Type for FormData
        }
      },
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
  useUploadProductImageMutation,
  useDetachImageMutation,
} = productApi
