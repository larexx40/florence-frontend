import { baseApi } from "./_index.api"
import type { 
  ApiResponse, 
  LoginDto, 
  LoginResponseDto, 
  ForgotPasswordDto, 
  ResetPasswordDto, 
  RefreshTokenDto,
  RefreshTokenDataDto 
} from "@/@types/auth.type"

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /auth/login
    login: builder.mutation<ApiResponse<LoginResponseDto>, LoginDto>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    // POST /auth/forgot-password
    forgotPassword: builder.mutation<ApiResponse<null>, ForgotPasswordDto>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // POST /auth/reset-password
    resetPassword: builder.mutation<ApiResponse<null>, ResetPasswordDto>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    // POST /auth/refresh-token
    refreshToken: builder.mutation<ApiResponse<RefreshTokenDataDto>, RefreshTokenDto>({
      query: (body) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
} = authApi
