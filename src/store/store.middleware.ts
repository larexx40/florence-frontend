import { baseApi } from "@/api/_index.api"

export const middleware = (getDefaultMiddleware: () => any) =>
  getDefaultMiddleware().concat(baseApi.middleware)
