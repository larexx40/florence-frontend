# Rakisi Frontend — Project Guidelines

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5.8 |
| Build | Vite 7 (`@vitejs/plugin-react`) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) + custom theme tokens |
| UI Primitives | shadcn/ui (new-york style, Radix-based) |
| Custom UI | `src/ui/` — app-level components (Button, Icon, DataTable, Pagination, Badge, Timeline) |
| State | Redux Toolkit + RTK Query |
| Routing | React Router v7 (declarative `createBrowserRouter`) |
| Forms | React Hook Form + Zod validation |
| Tables | TanStack Table v8 |
| Charts | Recharts v3 |
| Animation | Framer Motion |
| Dates | date-fns |
| Toasts | Sonner |
| PDF Export | html2canvas + jsPDF |
| Auth Tokens | js-cookie |
| Icons | Heroicons (`@heroicons/react`), Lucide (`lucide-react`), Ant Design Icons |

---

## Project Structure

```
src/
├── @types/           # Shared TypeScript interfaces & enums
│   ├── _index.ts     #   Barrel: ErrorResponse, PaginatedResponse, HttpMethod, etc.
│   └── <domain>.type.ts  #   Domain-specific types (customer.type.ts, quote-type/, etc.)
├── api/              # RTK Query API definitions
│   ├── _index.api.ts #   Shared baseQuery (baseUrl + Bearer token from cookies)
│   └── <domain>.api.ts  #   Domain API slices (customer.api.ts, quote.api.ts)
├── components/
│   ├── features/     # Domain-specific feature components
│   │   ├── risk/     #   Risk assessment forms, registry, factory, validators
│   │   └── validators/ # Zod validator schemas per insurance class
│   ├── shared/       # Reusable shared components
│   │   ├── form/     #   Form field wrappers (FormInput, FormSelect, FormDatePicker, etc.)
│   │   └── *.tsx     #   Modal, MultiStepForm, InfoCard, SummaryCard, VerticalTab, etc.
│   └── ui/           # shadcn/ui primitives (DO NOT EDIT directly — managed by shadcn CLI)
├── hooks/            # Custom React hooks (usePdfExport, etc.)
├── layout/           # Route layouts (RootLayout — auth guard + Navbar + Outlet)
├── lib/              # Utility libraries (cn() for className merging)
├── mockdata/         # Mock data organized by domain (claim/, customer/, policy/, etc.)
├── pages/            # Page components organized by domain
│   ├── auth/         #   Login, ForgotPassword
│   ├── claim/        #   Claim list, detail, file-claim, risk-assessment
│   ├── compliance/
│   ├── customer/     #   Customer list, detail, add-customer, edit-customer
│   ├── dashboard/
│   ├── payment/
│   ├── policy/
│   └── quote/        #   Quote list, detail, add-quote, edit-quote, email-quote
├── store/            # Redux store configuration
│   ├── store.index.ts   # configureStore + RootState & AppDispatch types
│   ├── store.reducer.ts # combineReducers (slices + API reducers)
│   ├── store.middleware.ts # Middleware (RTK Query API middleware + serializable check)
│   ├── slices/       # Redux Toolkit slices (customer.slice.ts, etc.)
│   └── redux-provider.tsx # Standalone Provider wrapper (unused — Provider is in main.tsx)
├── ui/               # App-level custom UI components
│   ├── badge/        #   StatusBadge with semantic status variants
│   ├── button/       #   Custom Button (primary/secondary/outline variants)
│   ├── icons/        #   Icon component + HEROICONS enum
│   ├── navigation/   #   Navbar
│   ├── pagination/   #   TablePagination
│   ├── table/        #   DataTable (TanStack Table wrapper with row-click navigation)
│   └── timeline/
├── utils/            # Pure utility functions
│   ├── format-currency.tsx  # NGN currency formatter
│   ├── format-utils.tsx     # formatDate, mapQuoteStatusToBadge
│   ├── normalize-enum.util.ts # SNAKE_CASE → Title Case
│   └── to-status-badge.util.ts # Enum → StatusBadge status mapping
├── App.tsx           # Router definition (all routes)
├── main.tsx          # Entry point (StrictMode + Redux Provider)
└── index.css         # Tailwind imports + custom @theme tokens + CSS variables
```

---

## Architecture & Data Flow

### Routing
- **Auth routes** (`/login`, `/forgot-password`) are siblings of the root layout — no Navbar.
- **Protected routes** are children of `RootLayout` which checks `localStorage.getItem("isAuthenticated")` and redirects to `/login` if false.
- Route definitions live in `App.tsx` using `createBrowserRouter` + `createRoutesFromElements`.
- Domain routes follow RESTful patterns: `/<domain>` (list), `/<domain>/add-<domain>`, `/<domain>/:id` (detail), `/<domain>/:id/edit`.

### API Layer (RTK Query)
1. **Base query** (`src/api/_index.api.ts`): Configures `fetchBaseQuery` with `VITE_APP_API_BASE_URL` and injects the Bearer token from `js-cookie`.
2. **API slices** (`src/api/<domain>.api.ts`): Each domain gets its own `createApi` slice with:
   - `reducerPath` matching the domain name (e.g., `"customerApi"`)
   - `tagTypes` for cache invalidation (e.g., `["Customer", "Customers"]`)
   - Strongly typed `builder.query` / `builder.mutation` endpoints
   - `providesTags` on queries, `invalidatesTags` on mutations
3. **Store registration**: Every API slice must be added to:
   - `store.reducer.ts` — `[api.reducerPath]: api.reducer`
   - `store.middleware.ts` — `api.middleware` in the middleware array
4. **Usage in components**: Import auto-generated hooks (e.g., `useGetCustomersQuery`, `useCreateCustomerMutation`).

### State Management (Redux Toolkit)
- **Slices** (`src/store/slices/`): Use `createSlice` for client-side state. Keep slices minimal — prefer RTK Query for server state.
- **Types**: Export `RootState` and `AppDispatch` from `store.index.ts`.

### Forms
- **React Hook Form** with `FormProvider` for multi-step forms.
- **Zod schemas** for validation (see `src/components/features/validators/`).
- **Form field wrappers** in `src/components/shared/form/` — always use these instead of raw shadcn form components directly in pages.
- **MultiStepForm** (`src/components/shared/multi-step-form.tsx`): Reusable wizard form with progress bar, back/next navigation, and `onFinish`/`onStepSubmit` callbacks.

---

## Naming Conventions

| Artifact | Convention | Example |
|---|---|---|
| Files & folders | kebab-case | `customer-table-column.tsx`, `risk-assessment/` |
| Component exports | PascalCase, default export | `export default function Customer()` |
| API files | `<domain>.api.ts` | `customer.api.ts` |
| Type files | `<domain>.type.ts` | `customer.type.ts` |
| Slice files | `<domain>.slice.ts` | `customer.slice.ts` |
| Barrel/index files | `_index.ts` or `_index.api.ts` | Prefix with underscore |
| Utility files | `<verb>-<noun>.util.ts` or `<verb>-<noun>.tsx` | `format-currency.tsx`, `normalize-enum.util.ts` |
| Custom hooks | `use-<name>.ts` | `use-pdf-export.ts` |
| CSS custom colors | `c<name>-<shade>` | `cblue-500`, `cdark-200`, `success-500` |
| RTK Query hooks | Auto-generated `use<Endpoint>Query/Mutation` | `useGetCustomersQuery` |

---

## Styling Guidelines

### Custom Color Tokens
The project defines **custom Tailwind theme colors** in `src/index.css` via `@theme`. Use these instead of default Tailwind colors:

| Token | Purpose |
|---|---|
| `cblue-{50–900}` | Primary brand blue |
| `cdark-{50–900}` | Dark text / backgrounds |
| `cgrey`, `cgrey-50` | Light backgrounds |
| `success-{50–900}` | Success / approved states |
| `error-{50–900}` | Error / destructive states |
| `message-{50–900}` | Warning / info states |

Also available: shadcn semantic tokens (`primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `card`, `popover`).

### Font
- **Rethink Sans** (loaded via Google Fonts in `index.css`)
- Applied globally on `body`

### Class Merging
- Always use `cn()` from `@/lib/utils` (or `../../lib/utils`) when conditionally merging Tailwind classes.
- Never use raw string interpolation for className merging — use `cn()`.

### Layout Pattern for List Pages
```tsx
<div className="container mx-auto py-10 mt-8 bg-white rounded-lg shadow-sm px-6">
  {/* Search + Filter bar */}
  <div className="flex justify-between items-center mb-5">
    <div className="flex space-x-4">
      {/* Search input */}
      {/* Filter button */}
    </div>
    <div className="flex space-x-3">
      <Button variant="secondary">Export to CSV</Button>
      <Button variant="primary" onClick={() => navigate("/<domain>/add-<domain>")}>
        Add <Domain>
      </Button>
    </div>
  </div>
  <DataTable columns={COLUMNS} data={data?.items || []} resource="<domain>" pagination={...} />
</div>
```

---

## Component Guidelines

### When to Use Which Button
- **`src/ui/button/button.tsx`** (custom `Button`): Use for app-level UI — has `primary`, `secondary`, `outline` variants matching the cblue/cdark theme. Import as `import Button from '../../ui/button/button'`.
- **`src/components/ui/button.tsx`** (shadcn `Button`): Use inside shadcn-managed components or when you need shadcn variants (`default`, `destructive`, `ghost`, `link`). Import as `import { Button } from '../../components/ui/button'`.

### Data Tables
- Always use `DataTable` from `src/ui/table/dataTable.tsx`.
- Define columns in a separate `<domain>-table-column.tsx` file co-located with the page.
- Pass `resource` prop to enable row-click navigation to `/<resource>/<id>`.
- Use `TablePagination` via the `pagination` prop.

### Modals
- Use `Modal` from `src/components/shared/modal.tsx` — wraps shadcn `Dialog`.
- Props: `open`, `onOpenChange`, `title`, `children`, `footer`.

### Status Badges
- Use `StatusBadge` from `src/ui/badge/` with `status` prop: `"Pending" | "Approved" | "Rejected" | "Under Review" | "Active" | "Inactive" | ...`
- Map backend enums to badge statuses using utilities in `src/utils/to-status-badge.util.ts` or `src/utils/format-utils.tsx`.

### Icons
- Use the `Icon` component from `src/ui/icons/` with `HEROICONS` enum for Heroicons.
- Use `lucide-react` directly for shadcn-compatible icons.

---

## Adding a New Domain (Checklist)

1. **Types**: Create `src/@types/<domain>.type.ts`. Export from `_index.ts` if shared.
2. **API**: Create `src/api/<domain>.api.ts` with `createApi`, `baseQuery`, `tagTypes`, endpoints. Register in `store.reducer.ts` and `store.middleware.ts`.
3. **Slice** (if needed): Create `src/store/slices/<domain>.slice.ts`. Register in `store.reducer.ts`.
4. **Mock data** (if needed): Create `src/mockdata/<domain>/`.
5. **Pages**: Create `src/pages/<domain>/` folder with:
   - `<domain>.tsx` — list page
   - `<domain>-table-column.tsx` — column definitions
   - `<domain>-detail/` — detail page + sub-components
   - `add-<domain>.tsx` — create form
   - `edit-<domain>-detail.tsx` — edit form
6. **Routes**: Add routes in `App.tsx` under `RootLayout`.
7. **Validators** (if form): Add Zod schema in `src/components/features/validators/`.
8. **Shared components**: If reusable, add to `src/components/shared/`.

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_APP_API_BASE_URL` | Backend API base URL (used in `src/api/_index.api.ts`) |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Vite) |
| `npm run build` | Type-check (`tsc -b`) then build (Vite) |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

---

## Linting & Code Quality

- ESLint with `typescript-eslint` recommended + `react-hooks` + `react-refresh` plugins.
- Target: `**/*.{ts,tsx}` — `dist/` is ignored.
- No custom rules beyond the presets — follow the existing code style.

---

## Key Patterns to Follow

1. **Prefer RTK Query over manual fetch** for all API calls. Only use raw `fetch` for non-standard cases (e.g., file downloads with custom headers).
2. **Use `FormInput` / `FormSelect` / `FormDatePicker`** wrappers from `src/components/shared/form/` — never use raw shadcn form primitives directly in pages.
3. **Co-locate column definitions** with their page in a `<domain>-table-column.tsx` file.
4. **Use `cn()`** for conditional className merging — never template literals with logic.
5. **Use custom color tokens** (`cblue-*`, `cdark-*`, `success-*`, `error-*`, `message-*`) instead of Tailwind defaults.
6. **Default exports** for page components; named exports for shared/utility components.
7. **Tag-based cache invalidation** in RTK Query — always define `providesTags` and `invalidatesTags`.
8. **Auth guard** is handled in `RootLayout` — new protected routes just need to be children of the root `<Route path="/" element={<RootLayout />}>`.
9. **Keep `src/components/ui/` untouched** — these are managed by the shadcn CLI. Custom app UI goes in `src/ui/` or `src/components/shared/`.
10. **Mock data** in `src/mockdata/` is organized by domain — use during development when the API is unavailable.
