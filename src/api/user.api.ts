import { baseApi } from "./_index.api"
import type { 
  ApiResponse 
} from "@/@types/auth.type"
import type {
  UserDto,
  CreateUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  SetupAccountDto,
  AwardStoreCreditDto,
  SendUserEmailDto,
  UserStatsResponseDto,
  UsersListResponseDto,
  PaginatedDataDto
} from "@/@types/user.type"

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /users/me - Get own profile
    getMyProfile: builder.query<ApiResponse<UserDto>, void>({
      query: () => "/users/me",
      providesTags: ["Auth"],
    }),

    // POST /users/me/setup-account - First-time setup
    setupAccount: builder.mutation<ApiResponse<UserDto>, SetupAccountDto>({
      query: (body) => ({
        url: "/users/me/setup-account",
        method: "POST",
        body,
      }),
    }),

    // POST /users/me/change-password
    changePassword: builder.mutation<ApiResponse<null>, ChangePasswordDto>({
      query: (body) => ({
        url: "/users/me/change-password",
        method: "POST",
        body,
      }),
    }),

    // GET /users - List all users (admin only)
    getUsers: builder.query<ApiResponse<UsersListResponseDto>, { page?: number; limit?: number }>({
      query: () => "/users",
      providesTags: ["User"],
    }),

    // POST /users - Create user
    createUser: builder.mutation<ApiResponse<UserDto>, CreateUserDto>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // GET /users/{id} - Get user by ID
    getUserById: builder.query<ApiResponse<UserDto>, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // PATCH /users/{id} - Update user
    updateUser: builder.mutation<ApiResponse<UserDto>, { id: string; body: UpdateUserDto }>({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // DELETE /users/{id} - Delete user
    deleteUser: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    // PATCH /users/{id}/toggle-active
    toggleUserActive: builder.mutation<ApiResponse<UserDto>, string>({
      query: (id) => ({
        url: `/users/${id}/toggle-active`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "User", id }],
    }),

    // POST /users/{id}/store-credit - Award store credit
    awardStoreCredit: builder.mutation<ApiResponse<UserDto>, { id: string; body: AwardStoreCreditDto }>({
      query: ({ id, body }) => ({
        url: `/users/${id}/store-credit`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "User", id }],
    }),

    // POST /users/{id}/send-email
    sendUserEmail: builder.mutation<ApiResponse<null>, { id: string; body: SendUserEmailDto }>({
      query: ({ id, body }) => ({
        url: `/users/${id}/send-email`,
        method: "POST",
        body,
      }),
    }),

    // POST /users/{id}/send-login-details
    sendLoginDetails: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/users/${id}/send-login-details`,
        method: "POST",
      }),
    }),

    // GET /users/{id}/stats
    getUserStats: builder.query<ApiResponse<UserStatsResponseDto>, string>({
      query: (id) => `/users/${id}/stats`,
    }),

    // GET /users/{id}/orders
    getUserOrders: builder.query<ApiResponse<{ orders: unknown[]; pagination: PaginatedDataDto }>, { id: string; page?: number; limit?: number }>({
      query: ({ id, page, limit }) => ({
        url: `/users/${id}/orders`,
        params: { page, limit },
      }),
    }),
  }),
})

export const {
  useGetMyProfileQuery,
  useSetupAccountMutation,
  useChangePasswordMutation,
  useGetUsersQuery,
  useCreateUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useToggleUserActiveMutation,
  useAwardStoreCreditMutation,
  useSendUserEmailMutation,
  useSendLoginDetailsMutation,
  useGetUserStatsQuery,
  useGetUserOrdersQuery,
} = userApi
