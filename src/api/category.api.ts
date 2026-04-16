import { baseApi } from "./_index.api"
import type { ApiResponse } from "@/@types/auth.type"
import type {
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryListResponseDto,
} from "@/@types/category.type"

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /categories - List all categories
    getCategories: builder.query<ApiResponse<CategoryListResponseDto>, void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    // GET /categories/{id} - Get category by ID
    getCategoryById: builder.query<ApiResponse<CategoryDto>, string>({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    // POST /categories - Create category (supports both JSON and FormData)
    createCategory: builder.mutation<ApiResponse<CategoryDto>, CreateCategoryDto | FormData>({
      query: (body) => {
        const isFormData = body instanceof FormData
        return {
          url: "/categories",
          method: "POST",
          body,
          headers: isFormData
            ? {} // Let browser set Content-Type for FormData
            : { "Content-Type": "application/json" },
        }
      },
      invalidatesTags: ["Category"],
    }),

    // PATCH /categories/{id} - Update category (supports both JSON and FormData)
    updateCategory: builder.mutation<ApiResponse<CategoryDto>, { id: string; body: UpdateCategoryDto | FormData }>({
      query: ({ id, body }) => {
        const isFormData = body instanceof FormData
        return {
          url: `/categories/${id}`,
          method: "PATCH",
          body,
          headers: isFormData
            ? {} // Let browser set Content-Type for FormData
            : { "Content-Type": "application/json" },
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Category", id }, "Category"],
    }),

    // DELETE /categories/{id} - Delete category
    deleteCategory: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
