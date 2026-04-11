import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline"
  children: ReactNode
  className?: string
}

export default function Button({ variant = "primary", children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer",
        variant === "primary" && "bg-cblue-600 text-white hover:bg-cblue-700",
        variant === "secondary" && "bg-cdark-100 text-cdark-900 hover:bg-cdark-200",
        variant === "outline" && "border border-cdark-200 text-cdark-900 hover:bg-cdark-50",
        props.disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
