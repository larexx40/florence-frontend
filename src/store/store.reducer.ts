import { combineReducers } from "@reduxjs/toolkit"
import { baseApi } from "@/api/_index.api"
import cartReducer from "./slices/cart.slice"
import authReducer from "./slices/auth.slice"

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  cart: cartReducer,
  auth: authReducer,
})
