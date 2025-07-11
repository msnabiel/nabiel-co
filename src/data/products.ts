// src/data/products.ts

export type Product = {
  id: number
  name: string
  slug: string
  price: number
  description?: string
  image?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Lavender Calm",
    slug: "lavender-calm",
    price: 299,
    description: "Soothing lavender for peaceful vibes.",
    image: "/logo.png",
  },
  {
    id: 2,
    name: "Vanilla Dream",
    slug: "vanilla-dream",
    price: 349,
    image: "/products/vanilla.jpg",
  },
  // Add more products here...
]
