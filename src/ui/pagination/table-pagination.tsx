import { cn } from "@/lib/utils"
import Icon, { HEROICONS } from "@/ui/icons/icon"

interface TablePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function TablePagination({ currentPage, totalPages, onPageChange, className }: TablePaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className={cn("flex items-center justify-center gap-2 mt-6", className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="p-2 rounded-lg border border-cdark-200 hover:bg-cdark-50 disabled:opacity-30"
      >
        <Icon icon={HEROICONS.ARROW_LEFT} size={16} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={cn(
            "w-8 h-8 rounded-lg text-sm font-medium",
            page === currentPage ? "bg-cblue-600 text-white" : "hover:bg-cdark-50"
          )}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="p-2 rounded-lg border border-cdark-200 hover:bg-cdark-50 disabled:opacity-30"
      >
        <Icon icon={HEROICONS.ARROW_RIGHT} size={16} />
      </button>
    </div>
  )
}
