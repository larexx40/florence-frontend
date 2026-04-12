import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import ProductCard from "@/components/shared/product-card"
import { mockProducts } from "@/mockdata/product/products"
import Icon, { HEROICONS } from "@/ui/icons/icon"

const categories = ["All", "Tops", "Women", "Men", "Accessories"]
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Newest"]
const PAGE_SIZE_OPTIONS = [10, 20, 50]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState("Featured")
  const pageParam = Number(searchParams.get("page") || "1")
  const currentPage = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam
  const perPageParam = Number(searchParams.get("perPage") || String(PAGE_SIZE_OPTIONS[0]))
  const perPage = PAGE_SIZE_OPTIONS.includes(perPageParam) ? perPageParam : PAGE_SIZE_OPTIONS[0]
  const categoryParam = searchParams.get("category") || "All"
  const activeCategory = categories.find((c) => c.toLowerCase() === categoryParam.toLowerCase()) || "All"

  const filteredProducts = useMemo(() => {
    let products = [...mockProducts]
    if (activeCategory !== "All") {
      products = products.filter((p) => p.category === activeCategory || p.categorySlug === activeCategory.toLowerCase())
    }
    if (sortBy === "Price: Low to High") products.sort((a, b) => a.price - b.price)
    if (sortBy === "Price: High to Low") products.sort((a, b) => b.price - a.price)
    return products
  }, [activeCategory, sortBy])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const paginatedProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * perPage,
    safeCurrentPage * perPage
  )

  const handleCategoryChange = (cat: string) => {
    if (cat === "All") {
      searchParams.delete("category")
    } else {
      searchParams.set("category", cat.toLowerCase())
    }
    searchParams.delete("page")
    setSearchParams(searchParams)
  }

  const handlePageChange = (page: number) => {
    if (page <= 1) {
      searchParams.delete("page")
    } else {
      searchParams.set("page", String(page))
    }
    setSearchParams(searchParams)
  }

  const handlePerPageChange = (nextPerPage: number) => {
    searchParams.set("perPage", String(nextPerPage))
    searchParams.delete("page")
    setSearchParams(searchParams)
  }

  const visiblePages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((page) => {
    if (totalPages <= 5) return true
    return Math.abs(page - safeCurrentPage) <= 2 || page === 1 || page === totalPages
  })

  const mobileVisiblePages = visiblePages.filter((page) => {
    if (totalPages <= 4) return true
    return Math.abs(page - safeCurrentPage) <= 1
  })

  return (
    <div className="container mx-auto py-10 mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-8">Shop</h1>

      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat ? "bg-cblue-600 text-white" : "bg-cdark-100 text-cdark-700 hover:bg-cdark-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full appearance-none rounded-xl border border-cdark-200 bg-cgrey-50 px-4 py-3 pr-10 text-sm font-medium text-cdark-700 shadow-sm transition-colors focus:border-cblue-500 focus:bg-white focus:outline-none md:min-w-56"
          >
            {sortOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <Icon icon={HEROICONS.CHEVRON_DOWN} size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cdark-500" />
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-2 text-sm text-cdark-500 sm:flex-row sm:items-center sm:justify-between">
        <p>{filteredProducts.length} products</p>
        {filteredProducts.length > 0 ? (
          <p>
            Showing {(safeCurrentPage - 1) * perPage + 1}-{Math.min(safeCurrentPage * perPage, filteredProducts.length)} of {filteredProducts.length}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg text-cdark-500">No products found in this category.</p>
        </div>
      )}

      {filteredProducts.length > 0 && (
        <div className="mt-10 rounded-2xl border border-cdark-200 bg-cgrey-50/70 p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between gap-3 md:justify-start">
              <span className="text-sm font-medium text-cdark-600">Items per page</span>
              <div className="relative">
                <select
                  value={perPage}
                  onChange={(e) => handlePerPageChange(Number(e.target.value))}
                  className="appearance-none rounded-full border border-cdark-200 bg-white px-4 py-2 pr-10 text-sm font-semibold text-cdark-700 shadow-sm transition-colors focus:border-cblue-500 focus:outline-none min-w-24"
                >
                  {PAGE_SIZE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <Icon icon={HEROICONS.CHEVRON_DOWN} size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cdark-500" />
              </div>
            </div>

            <div className="rounded-xl bg-white px-4 py-3 text-center text-sm text-cdark-500 md:text-left">
              Page <span className="font-semibold text-cdark-900">{safeCurrentPage}</span> of{" "}
              <span className="font-semibold text-cdark-900">{totalPages}</span>
            </div>

            <div className="flex items-center justify-between gap-2 md:hidden">
              <button
                type="button"
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className="rounded-full border border-cdark-200 bg-white px-4 py-2 text-sm font-medium text-cdark-700 transition-colors hover:border-cblue-500 hover:text-cblue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>
              <div className="flex items-center gap-2">
                {mobileVisiblePages.map((page, index) => {
                  const previousPage = mobileVisiblePages[index - 1]
                  const showGap = previousPage && page - previousPage > 1

                  return (
                    <div key={`mobile-${page}`} className="flex items-center gap-2">
                      {showGap ? <span className="px-1 text-cdark-400">...</span> : null}
                      <button
                        type="button"
                        onClick={() => handlePageChange(page)}
                        className={`h-10 min-w-10 rounded-full px-3 text-sm font-semibold transition-colors ${
                          safeCurrentPage === page
                            ? "bg-cblue-600 text-white shadow-sm"
                            : "border border-cdark-200 bg-white text-cdark-700 hover:border-cblue-500 hover:text-cblue-600"
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className="rounded-full border border-cdark-200 bg-white px-4 py-2 text-sm font-medium text-cdark-700 transition-colors hover:border-cblue-500 hover:text-cblue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>

            <div className="hidden flex-wrap items-center justify-end gap-2 md:flex">
              <button
                type="button"
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage === 1}
                className="rounded-full border border-cdark-200 bg-white px-4 py-2 text-sm font-medium text-cdark-700 transition-colors hover:border-cblue-500 hover:text-cblue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Prev
              </button>

              {visiblePages.map((page, index) => {
                const previousPage = visiblePages[index - 1]
                const showGap = previousPage && page - previousPage > 1

                return (
                  <div key={page} className="flex items-center gap-2">
                    {showGap ? <span className="px-1 text-cdark-400">...</span> : null}
                    <button
                      type="button"
                      onClick={() => handlePageChange(page)}
                      className={`h-10 min-w-10 rounded-full px-4 text-sm font-semibold transition-colors ${
                        safeCurrentPage === page
                          ? "bg-cblue-600 text-white shadow-sm"
                          : "border border-cdark-200 bg-white text-cdark-700 hover:border-cblue-500 hover:text-cblue-600"
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                )
              })}

              <button
                type="button"
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage === totalPages}
                className="rounded-full border border-cdark-200 bg-white px-4 py-2 text-sm font-medium text-cdark-700 transition-colors hover:border-cblue-500 hover:text-cblue-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
