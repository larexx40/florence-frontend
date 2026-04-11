import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export default function Modal({ open, onOpenChange, title, children, footer, className }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={() => onOpenChange(false)} />
      <div className={cn("relative bg-white rounded-xl shadow-xl max-w-lg w-full mx-4 p-6", className)}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={() => onOpenChange(false)} className="p-1 hover:bg-cdark-100 rounded-lg">
            ✕
          </button>
        </div>
        <div>{children}</div>
        {footer && <div className="mt-4 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}
