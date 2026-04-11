import { format, formatDistanceToNow } from "date-fns"

export function formatDate(date: string | Date, pattern = "MMM dd, yyyy"): string {
  return format(new Date(date), pattern)
}

export function formatRelativeDate(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
