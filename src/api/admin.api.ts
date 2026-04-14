import { baseApi } from "./_index.api"
import type { ApiResponse } from "@/@types/auth.type"
import type { UserDto } from "@/@types/user.type"
import type { AddAdminDto, UpdateAdminProfileDto, ChangeUserRoleDto, DashboardStatsDto } from "@/@types/admin-api.type"
import type { UserRole } from "@/@types/auth.type"

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET /admin/profile - Get own admin profile
    getAdminProfile: builder.query<ApiResponse<UserDto>, void>({
      query: () => "/admin/profile",
      providesTags: ["Auth"],
    }),

    // POST /admin/update-profile - Update profile (first-time setup)
    updateAdminProfile: builder.mutation<ApiResponse<UserDto>, UpdateAdminProfileDto>({
      query: (body) => ({
        url: "/admin/update-profile",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // POST /admin/change-role - Change user role (super admin only)
    changeUserRole: builder.mutation<ApiResponse<UserDto>, ChangeUserRoleDto>({
      query: (body) => ({
        url: "/admin/change-role",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // POST /admin/add-admin - Add new admin (super admin only)
    addAdmin: builder.mutation<ApiResponse<UserDto>, AddAdminDto>({
      query: (body) => ({
        url: "/admin/add-admin",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const {
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
  useChangeUserRoleMutation,
  useAddAdminMutation,
} = adminApi
