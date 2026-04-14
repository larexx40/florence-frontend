import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  token: string | null
}

const token = Cookies.get("token")

const initialState: AuthState = {
  isAuthenticated: !!token,
  user: null,
  token: token || null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true
      state.user = action.payload
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true
      Cookies.set("token", action.payload, { expires: 7 })
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      Cookies.remove("token")
    },
  },
})

export const { login, setToken, logout } = authSlice.actions
export default authSlice.reducer
