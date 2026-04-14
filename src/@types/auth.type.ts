// API Response wrapper
export interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}

// Login
export interface LoginDto {
  email: string
  password: string
}

export interface LoginResponseDto {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: UserRole
    isProfileComplete: boolean
  }
}

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "SUPPORT" | "LOGISTICS" | "CUSTOMER"

// Forgot Password
export interface ForgotPasswordDto {
  email: string
}

// Reset Password
export interface ResetPasswordDto {
  token: string
  newPassword: string
  confirmPassword: string
}

// Refresh Token
export interface RefreshTokenDto {
  refreshToken: string
}

export interface RefreshTokenDataDto {
  accessToken: string
  refreshToken: string
}
