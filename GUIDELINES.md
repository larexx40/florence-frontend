# Florence Frontend Coding Standards

This document defines how we structure frontend code in this repository.

The goals are:
- keep concerns separated
- make features easy to find and extend
- keep API and Redux logic predictable
- require strong TypeScript contracts for every backend interaction

## Core Rules

1. Use TypeScript everywhere. Avoid `any`.
2. Separate UI, API, business logic, and Redux concerns into different files.
3. Use RTK Query for server state and network requests.
4. Use Redux slices only for client-side app state.
5. Define explicit types for every API request payload, query params, and response body.
6. Keep page components thin. Pages should compose features, not contain heavy logic.
7. Reuse shared components and utilities before creating duplicates.

## Tech Stack

| Layer | Standard |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5 |
| Build Tool | Vite |
| Routing | React Router DOM |
| State | Redux Toolkit + RTK Query |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod |

## Separation Of Concerns

Each file should have one clear responsibility.

### Pages
- Files in `src/pages/` are route-level entry points.
- Pages are responsible for layout, route params, and composing feature components.
- Pages should not contain raw `fetch`, large reducers, or reusable business logic.

### Components
- `src/components/shared/` contains reusable presentation components shared across domains.
- `src/ui/` contains app-level reusable UI primitives.
- Components should receive typed props and stay focused on rendering and UI behavior.

### API
- All network calls must live in `src/api/`.
- Do not call `fetch` or `axios` directly inside pages or components.
- Each domain should have its own API file, for example `product.api.ts`, `order.api.ts`, `auth.api.ts`.
- Shared API configuration belongs in `src/api/_index.api.ts`.

### Redux
- Redux store setup belongs in `src/store/`.
- Client-side state belongs in `src/store/slices/`.
- Do not put API request logic inside Redux slices.
- Do not duplicate server data in slices when RTK Query already owns that state.

### Types
- Shared and domain contracts belong in `src/@types/`.
- Every domain should define its own file, for example `product.type.ts`, `order.type.ts`.
- API request and response contracts must be typed before building endpoints or components.

### Utilities
- Put pure helper functions in `src/utils/`.
- Utilities must not import React components or Redux store modules.

## Recommended Project Structure

```text
src/
|-- @types/
|   |-- _index.ts
|   |-- product.type.ts
|   |-- order.type.ts
|   `-- auth.type.ts
|-- api/
|   |-- _index.api.ts
|   |-- product.api.ts
|   |-- order.api.ts
|   `-- auth.api.ts
|-- components/
|   |-- shared/
|   `-- features/
|-- hooks/
|-- layout/
|-- pages/
|-- store/
|   |-- store.index.ts
|   |-- store.reducer.ts
|   |-- store.middleware.ts
|   `-- slices/
|-- ui/
`-- utils/
```

## API Standards

### Mandatory Rules

- Every endpoint must use RTK Query unless there is a strong technical reason not to.
- Every endpoint must have typed request and response contracts.
- Do not inline anonymous request or response object types inside components.
- Prefer named exported types from `src/@types/`.
- Use `builder.query<ResponseType, RequestType>` and `builder.mutation<ResponseType, RequestType>`.

### API Type Requirements

For every endpoint, define:
- response type
- request body type if applicable
- query params type if applicable
- path param type if the endpoint needs structured params

Example:

```ts
export interface GetProductsParams {
  page?: number
  category?: string
}

export interface ProductResponse {
  id: string
  name: string
  slug: string
  price: number
}

export interface CreateProductPayload {
  name: string
  price: number
  categoryId: string
}
```

Then use them in the API file:

```ts
import { baseApi } from "./_index.api"
import type {
  CreateProductPayload,
  GetProductsParams,
  ProductResponse,
} from "@/@types/product.type"
import type { PaginatedResponse } from "@/@types/_index"

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedResponse<ProductResponse>, GetProductsParams>({
      query: (params) => ({ url: "/products", params }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation<ProductResponse, CreateProductPayload>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
})
```

### API File Responsibilities

`src/api/_index.api.ts`
- base URL
- auth headers
- shared tag types
- shared base API instance

`src/api/<domain>.api.ts`
- domain-specific endpoints only
- generated hooks export
- tag invalidation rules for that domain

### What Not To Do

- Do not write API calls in page files.
- Do not mix API configuration with slice reducers.
- Do not return untyped `unknown`, `any`, or loosely shaped objects if the backend contract is known.
- Do not place backend response mapping logic directly in JSX.

## Redux Standards

### Use Redux Slices For Client State Only

Good slice use cases:
- auth session flags
- cart drawer open state
- local filters that are not owned by the URL
- temporary UI preferences

Bad slice use cases:
- product lists fetched from backend
- order detail fetched from backend
- category collections fetched from backend

Those belong in RTK Query.

### Slice Rules

- Each slice lives in `src/store/slices/<domain>.slice.ts`.
- Slice state must have an explicit interface.
- Actions and reducer names should be clear and domain-specific.
- Side effects should not live inside reducers.

Example:

```ts
interface CartState {
  items: CartItem[]
  isOpen: boolean
}
```

### Store Registration

When adding a new API or slice:
1. Add the reducer to `src/store/store.reducer.ts`
2. Add RTK Query middleware in `src/store/store.middleware.ts` if needed
3. Reuse `RootState` and `AppDispatch` from `src/store/store.index.ts`

## TypeScript Standards

### General

- Prefer `interface` for object contracts that represent entities, payloads, or responses.
- Prefer `type` for unions, mapped types, and utility compositions.
- Export reusable types from domain files.
- Avoid duplicate types across features.

### API Contracts

Minimum expected type coverage:
- entity types
- list response types
- detail response types
- create payload types
- update payload types
- filter/query param types
- error response types when backend shape is known

### Component Props

- All component props must be typed.
- Do not leave props inferred when the component is exported and reused.

## Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Files and folders | kebab-case | `product-card.tsx` |
| Components | PascalCase | `ProductCard` |
| API files | `<domain>.api.ts` | `product.api.ts` |
| Slice files | `<domain>.slice.ts` | `cart.slice.ts` |
| Type files | `<domain>.type.ts` | `product.type.ts` |
| Hooks | `use-<name>.ts` or `use-<name>.tsx` | `use-cart.ts` |
| Utility files | descriptive kebab-case | `format-currency.tsx` |

## Component Guidelines

- Keep components focused and small.
- Prefer composition over deeply nested conditional JSX.
- Move repeated render blocks into shared components.
- Keep business transformations outside the JSX body when they grow beyond simple formatting.
- Use `cn()` from `src/lib/utils.ts` for conditional class names.

## Forms

- Use React Hook Form for non-trivial forms.
- Use Zod for validation schemas where validation rules exist.
- Form value types must be explicit.
- Submission payload types should match API payload types or map to them in a dedicated function.

## Routing

- Define routes in `src/App.tsx`.
- Keep route components under `src/pages/`.
- Use layout components in `src/layout/` for shared wrappers.
- Route files should not own reusable business logic.

## Adding A New Domain

When adding a new domain such as `orders` or `categories`:

1. Create domain types in `src/@types/<domain>.type.ts`
2. Define request and response contracts first
3. Create `src/api/<domain>.api.ts`
4. Add slice only if the domain truly needs client-only state
5. Build shared or feature components for the domain UI
6. Keep the page file focused on route composition
7. Register reducers and middleware in the store

## Definition Of Done

A feature is not complete unless:
- API calls are in `src/api/`
- Redux logic is in `src/store/`
- request and response types are defined
- components and pages are typed
- server state uses RTK Query
- code follows the file naming conventions
- there is no duplicated business logic across pages/components

## Quick Checklist

Before merging, confirm:
- no API call is written directly inside a page or presentational component
- request payloads are typed
- response bodies are typed
- Redux slice state is typed
- server state is not duplicated in slices
- files follow the domain structure
- reusable logic has been extracted out of pages
