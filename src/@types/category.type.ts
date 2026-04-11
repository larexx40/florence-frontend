export interface Category {
  id: string
  name: string
  slug: string
  image: string
  type: "abs" | "circle"
}

export interface CategoryTab {
  label: string
  value: string
  categories: Category[]
}
