import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./store.reducer"
import { middleware } from "./store.middleware"

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => middleware(getDefaultMiddleware) as any,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
