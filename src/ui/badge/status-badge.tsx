import { cn } from "@/lib/utils"

type BadgeStatus = "Pending" | "Approved" | "Rejected" | "Under Review" | "Active" | "Inactive" | "Sale" | "New" | "Trending" | "Hot"

interface StatusBadgeProps {
  status: BadgeStatus
  className?: string
}

const statusStyles: Record<BadgeStatus, string> = {
  Pending: "bg-message-100 text-message-800",
  Approved: "bg-success-100 text-success-800",
  Rejected: "bg-error-100 text-error-800",
  "Under Review": "bg-cblue-100 text-cblue-800",
  Active: "bg-success-100 text-success-800",
  Inactive: "bg-cdark-100 text-cdark-600",
  Sale: "bg-error-100 text-error-800",
  New: "bg-cblue-100 text-cblue-800",
  Trending: "bg-message-100 text-message-800",
  Hot: "bg-error-100 text-error-800",
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  )
}
