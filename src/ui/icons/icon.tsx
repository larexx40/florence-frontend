import {
  ShoppingCartIcon,
  UserIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
} from "@heroicons/react/24/outline"
import {
  HeartIcon as HeartSolid,
  StarIcon as StarSolid,
} from "@heroicons/react/24/solid"
import { cn } from "@/lib/utils"
import type { SVGProps } from "react"

export enum HEROICONS {
  CART = "cart",
  USER = "user",
  HEART = "heart",
  HEART_SOLID = "heart-solid",
  SEARCH = "search",
  MENU = "menu",
  CLOSE = "close",
  CHEVRON_DOWN = "chevron-down",
  ARROW_RIGHT = "arrow-right",
  ARROW_LEFT = "arrow-left",
  MINUS = "minus",
  PLUS = "plus",
  STAR = "star",
  STAR_SOLID = "star-solid",
}

const iconMap: Record<HEROICONS, React.ComponentType<SVGProps<SVGSVGElement>>> = {
  [HEROICONS.CART]: ShoppingCartIcon,
  [HEROICONS.USER]: UserIcon,
  [HEROICONS.HEART]: HeartIcon,
  [HEROICONS.HEART_SOLID]: HeartSolid,
  [HEROICONS.SEARCH]: MagnifyingGlassIcon,
  [HEROICONS.MENU]: Bars3Icon,
  [HEROICONS.CLOSE]: XMarkIcon,
  [HEROICONS.CHEVRON_DOWN]: ChevronDownIcon,
  [HEROICONS.ARROW_RIGHT]: ArrowRightIcon,
  [HEROICONS.ARROW_LEFT]: ArrowLeftIcon,
  [HEROICONS.MINUS]: MinusIcon,
  [HEROICONS.PLUS]: PlusIcon,
  [HEROICONS.STAR]: StarIcon,
  [HEROICONS.STAR_SOLID]: StarSolid,
}

interface IconProps {
  icon: HEROICONS
  className?: string
  size?: number
}

export default function Icon({ icon, className, size = 20 }: IconProps) {
  const IconComponent = iconMap[icon]
  if (!IconComponent) return null
  return <IconComponent className={cn("inline-block", className)} width={size} height={size} />
}
