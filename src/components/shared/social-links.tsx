import { Facebook, Instagram, Send } from "lucide-react"
import { BUSINESS_DETAILS } from "@/constants/business"
import { cn } from "@/lib/utils"

type SocialLinksProps = {
  className?: string
  itemClassName?: string
  showLabel?: boolean
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-5 w-5", className)} fill="currentColor">
      <path d="M16.49 3c.36 2.82 1.94 4.51 4.51 4.76v3.06a7.62 7.62 0 0 1-4.43-1.34v6.27c0 3.97-2.3 6.25-6.18 6.25-3.2 0-5.92-2.28-5.92-5.73 0-3.68 2.8-5.92 6.3-5.92.44 0 .87.04 1.27.13v3.17a3.59 3.59 0 0 0-1.19-.2c-1.67 0-3.15 1-3.15 2.79 0 1.66 1.25 2.74 2.7 2.74 1.87 0 2.99-1.13 2.99-3.34V3h3.1Z" />
    </svg>
  )
}

function getIcon(icon: (typeof BUSINESS_DETAILS.socialLinks)[number]["icon"]) {
  switch (icon) {
    case "telegram":
      return <Send className="h-5 w-5" />
    case "facebook":
      return <Facebook className="h-5 w-5" />
    case "instagram":
      return <Instagram className="h-5 w-5" />
    case "tiktok":
      return <TikTokIcon />
    default:
      return null
  }
}

export default function SocialLinks({
  className,
  itemClassName,
  showLabel = true,
}: SocialLinksProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {BUSINESS_DETAILS.socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-cdark-200 px-3 py-2 text-sm text-cdark-700 transition-colors hover:border-cblue-600 hover:text-cblue-600",
            itemClassName
          )}
        >
          {getIcon(link.icon)}
          {showLabel ? <span>{link.label}</span> : null}
        </a>
      ))}
    </div>
  )
}
