import { baseApi } from "./_index.api"
import type { ApiResponse } from "@/@types/auth.type"
import type {
  CategoryOptionDto,
  CreateCategoryOptionDto,
  UpdateCategoryOptionDto,
  ProductOptionDto,
  CreateProductOptionDto,
  UpdateProductOptionDto,
  ProductOptionValueDto,
  CreateProductOptionValueDto,
  UpdateProductOptionValueDto,
} from "@/@types/option.type"

export const optionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // === Category Options ===

    // GET /categories/{categoryId}/options
    getCategoryOptions: builder.query<ApiResponse<CategoryOptionDto[]>, string>({
      query: (categoryId) => `/categories/${categoryId}/options`,
      providesTags: (result, error, categoryId) => [{ type: "Option", id: `category-${categoryId}` }],
    }),

    // POST /categories/{categoryId}/options
    createCategoryOption: builder.mutation<ApiResponse<CategoryOptionDto>, { categoryId: string; body: CreateCategoryOptionDto }>({
      query: ({ categoryId, body }) => ({
        url: `/categories/${categoryId}/options`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { categoryId }) => [{ type: "Option", id: `category-${categoryId}` }],
    }),

    // PATCH /categories/{categoryId}/options/{optionId}
    updateCategoryOption: builder.mutation<ApiResponse<CategoryOptionDto>, { categoryId: string; optionId: string; body: UpdateCategoryOptionDto }>({
      query: ({ categoryId, optionId, body }) => ({
        url: `/categories/${categoryId}/options/${optionId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { categoryId }) => [{ type: "Option", id: `category-${categoryId}` }],
    }),

    // DELETE /categories/{categoryId}/options/{optionId}
    deleteCategoryOption: builder.mutation<ApiResponse<null>, { categoryId: string; optionId: string }>({
      query: ({ categoryId, optionId }) => ({
        url: `/categories/${categoryId}/options/${optionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { categoryId }) => [{ type: "Option", id: `category-${categoryId}` }],
    }),

    // === Product Options ===

    // GET /products/{productId}/options
    getProductOptions: builder.query<ApiResponse<ProductOptionDto[]>, string>({
      query: (productId) => `/products/${productId}/options`,
      providesTags: (result, error, productId) => [{ type: "Option", id: `product-${productId}` }],
    }),

    // POST /products/{productId}/options
    addProductOption: builder.mutation<ApiResponse<ProductOptionDto>, { productId: string; body: CreateProductOptionDto }>({
      query: ({ productId, body }) => ({
        url: `/products/${productId}/options`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: "Option", id: `product-${productId}` }],
    }),

    // PATCH /products/{productId}/options/{optionId}
    updateProductOption: builder.mutation<ApiResponse<ProductOptionDto>, { productId: string; optionId: string; body: UpdateProductOptionDto }>({
      query: ({ productId, optionId, body }) => ({
        url: `/products/${productId}/options/${optionId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: "Option", id: `product-${productId}` }],
    }),

    // DELETE /products/{productId}/options/{optionId}
    removeProductOption: builder.mutation<ApiResponse<null>, { productId: string; optionId: string }>({
      query: ({ productId, optionId }) => ({
        url: `/products/${productId}/options/${optionId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: "Option", id: `product-${productId}` }],
    }),

    // POST /products/{productId}/options/{optionId}/values
    addProductOptionValue: builder.mutation<ApiResponse<ProductOptionValueDto>, { productId: string; optionId: string; body: CreateProductOptionValueDto }>({
      query: ({ productId, optionId, body }) => ({
        url: `/products/${productId}/options/${optionId}/values`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: "Option", id: `product-${productId}` }],
    }),

    // PATCH /products/{productId}/options/{optionId}/values/{valueId}
    updateProductOptionValue: builder.mutation<ApiResponse<ProductOptionValueDto>, { productId: string; optionId: string; valueId: string; body: UpdateProductOptionValueDto }>({
      query: ({ productId, optionId, valueId, body }) => ({
        url: `/products/${productId}/options/${optionId}/values/${valueId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: "Option", id: `product-${productId}` }],
    }),

    // DELETE /products/{productId}/options/{optionId}/values/{valueId}
    deleteProductOptionValue: builder.mutation<ApiResponse<null>, { productId: string; optionId: string; valueId: string }>({
      query: ({ productId, optionId, valueId }) => ({
        url: `/products/${productId}/options/${optionId}/values/${valueId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: "Option", id: `product-${productId}` }],
    }),
  }),
})

export const {
  // Category options
  useGetCategoryOptionsQuery,
  useCreateCategoryOptionMutation,
  useUpdateCategoryOptionMutation,
  useDeleteCategoryOptionMutation,
  // Product options
  useGetProductOptionsQuery,
  useAddProductOptionMutation,
  useUpdateProductOptionMutation,
  useRemoveProductOptionMutation,
  useAddProductOptionValueMutation,
  useUpdateProductOptionValueMutation,
  useDeleteProductOptionValueMutation,
} = optionApi
