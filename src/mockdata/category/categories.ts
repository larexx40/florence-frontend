import type { Category, CategoryTab } from "@/@types/category.type"

export const collectionCategories: Category[] = [
  { id: "1", name: "Tops", slug: "tops", image: "/images/cls-categories/fashion/top.jpg", type: "abs" },
  { id: "2", name: "Accessories", slug: "accessories", image: "/images/cls-categories/fashion/accessories.jpg", type: "abs" },
  { id: "3", name: "Sportwear", slug: "sportwear", image: "/images/cls-categories/fashion/sportwear.jpg", type: "abs" },
  { id: "4", name: "Men", slug: "men", image: "/images/cls-categories/fashion/men.jpg", type: "abs" },
  { id: "5", name: "Kids", slug: "kids", image: "/images/cls-categories/fashion/kid.jpg", type: "abs" },
]

export const categoryTabs: CategoryTab[] = [
  {
    label: "Women",
    value: "women",
    categories: [
      { id: "w1", name: "Dress", slug: "dress", image: "/images/cls-categories/fashion/circle-dress.jpg", type: "circle" },
      { id: "w2", name: "Partywear", slug: "partywear", image: "/images/cls-categories/fashion/circle-partywear.jpg", type: "circle" },
      { id: "w3", name: "Jewelry", slug: "jewelry", image: "/images/cls-categories/fashion/circle-jewelry.jpg", type: "circle" },
      { id: "w4", name: "Tops", slug: "tops", image: "/images/cls-categories/fashion/circle-tops.jpg", type: "circle" },
      { id: "w5", name: "Bottoms", slug: "bottoms", image: "/images/cls-categories/fashion/circle-bottoms.jpg", type: "circle" },
      { id: "w6", name: "Sportwear", slug: "sportwear", image: "/images/cls-categories/fashion/circle-sportwear.jpg", type: "circle" },
    ],
  },
  {
    label: "Men",
    value: "men",
    categories: [
      { id: "m1", name: "Sportwear", slug: "sportwear", image: "/images/cls-categories/fashion/circle-sportwear.jpg", type: "circle" },
      { id: "m2", name: "Dress", slug: "dress", image: "/images/cls-categories/fashion/circle-dress.jpg", type: "circle" },
      { id: "m3", name: "Partywear", slug: "partywear", image: "/images/cls-categories/fashion/circle-partywear.jpg", type: "circle" },
      { id: "m4", name: "Jewelry", slug: "jewelry", image: "/images/cls-categories/fashion/circle-jewelry.jpg", type: "circle" },
      { id: "m5", name: "Bottoms", slug: "bottoms", image: "/images/cls-categories/fashion/circle-bottoms.jpg", type: "circle" },
      { id: "m6", name: "Tops", slug: "tops", image: "/images/cls-categories/fashion/circle-tops.jpg", type: "circle" },
    ],
  },
]
