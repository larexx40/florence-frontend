import { Inbox } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  className?: string
}

export default function EmptyState({
  title = "No data available",
  description,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      <div className="w-16 h-16 rounded-full bg-cgrey-100 flex items-center justify-center mb-4">
        {icon || <Inbox size={32} className="text-cdark-400" />}
      </div>
      <h3 className="text-lg font-medium text-cdark-700">{title}</h3>
      {description && (
        <p className="text-sm text-cdark-500 mt-1 max-w-xs">{description}</p>
      )}
    </div>
  )
}
