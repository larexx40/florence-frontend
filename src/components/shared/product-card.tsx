import { Link } from "react-router-dom"
import type { Product } from "@/@types/product.type"
import StatusBadge from "@/ui/badge/status-badge"
import { cn } from "@/lib/utils"
import Icon, { HEROICONS } from "@/ui/icons/icon"

interface ProductCardProps {
  product: Product
  className?: string
}

const badgeMap: Record<string, "Sale" | "New" | "Trending" | "Hot"> = {
  sale: "Sale",
  new: "New",
  trending: "Trending",
  hot: "Hot",
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <div className={cn("group relative", className)}>
      <div className="relative overflow-hidden rounded-lg bg-cgrey aspect-[3/4]">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {product.badge && (
          <div className="absolute top-3 left-3">
            <StatusBadge status={badgeMap[product.badge]} />
          </div>
        )}

        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-cdark-900 text-white text-xs font-medium px-2 py-1 rounded">
            {discount}% Off
          </span>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/40 to-transparent">
          <button className="p-2 bg-white rounded-full shadow hover:bg-cblue-50 transition-colors" title="Quick Add">
            <Icon icon={HEROICONS.CART} size={16} className="text-cdark-900" />
          </button>
          <Link to={`/product/${product.slug}`} className="p-2 bg-white rounded-full shadow hover:bg-cblue-50 transition-colors" title="Quick View">
            <Icon icon={HEROICONS.SEARCH} size={16} className="text-cdark-900" />
          </Link>
          <button className="p-2 bg-white rounded-full shadow hover:bg-cblue-50 transition-colors" title="Wishlist">
            <Icon icon={HEROICONS.HEART} size={16} className="text-cdark-900" />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <Link to={`/product/${product.slug}`} className="text-sm font-medium text-cdark-900 hover:text-cblue-600 transition-colors">
          {product.name}
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-cdark-900">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-cdark-400 line-through">${product.compareAtPrice.toFixed(2)}</span>
          )}
        </div>

        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="w-4 h-4 rounded-full border border-cdark-200 cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
