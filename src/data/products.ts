// src/data/products.ts

export type Product = {
  id: number
  name: string
  slug: string
  price: number
  description?: string
  images?: string[], // ✅ array of image URLs
  type: "Aura" | "Zen" // ✅ added type 
}
export const products: Product[] = [
  {
    id: 1,
    name: "Aura Candle - Rose",
    slug: "aura-candle-rose",
    price: 299,
    type: "Aura",
    description: "A romantic rose-scented Aura candle for calming spaces.",
    images: ["/logo.png"],
  },
  {
    id: 2,
    name: "Aura Candle - Jasmine",
    slug: "aura-candle-jasmine",
    price: 299,
    type: "Aura",
    description: "Floral jasmine Aura candle to soothe your senses.",
    images: ["/logo.png"],
  },
  {
    id: 3,
    name: "Aura Candle - Sandalwood",
    slug: "aura-candle-sandalwood",
    price: 299,
    type: "Aura",
    description: "Earthy sandalwood Aura candle for grounding energy.",
    images: ["/logo.png"],
  },
  {
    id: 4,
    name: "Aura Candle - Lemongrass",
    slug: "aura-candle-lemongrass",
    price: 299,
    type: "Aura",
    description: "Zesty lemongrass Aura candle to refresh your space.",
    images: ["/logo.png"],
  },
  {
    id: 5,
    name: "Aura Candle - Lavender",
    slug: "aura-candle-lavender",
    price: 299,
    type: "Aura",
    description: "Soothing lavender Aura candle to relax your mood.",
    images: ["/logo.png"],
  },
  {
    id: 6,
    name: "Zen Candle - Rose",
    slug: "zen-candle-rose",
    price: 349,
    type: "Zen",
    description: "Rose-scented Zen candle to calm the mind and elevate your mood.",
    images: ["/logo.png"],
  },
  {
    id: 7,
    name: "Zen Candle - Jasmine",
    slug: "zen-candle-jasmine",
    price: 349,
    type: "Zen",
    description: "Delicate jasmine Zen candle for meditative spaces.",
    images: ["/logo.png"],
  },
  {
    id: 8,
    name: "Zen Candle - Sandalwood",
    slug: "zen-candle-sandalwood",
    price: 349,
    type: "Zen",
    description: "Warm sandalwood Zen candle for a deep sense of peace.",
    images: ["/logo.png"],
  },
  {
    id: 9,
    name: "Zen Candle - Lemongrass",
    slug: "zen-candle-lemongrass",
    price: 349,
    type: "Zen",
    description: "Invigorating lemongrass Zen candle to awaken your senses.",
    images: ["/logo.png"],
  },
  {
    id: 10,
    name: "Zen Candle - Lavender",
    slug: "zen-candle-lavender",
    price: 349,
    type: "Zen",
    description: "Lavender Zen candle to help you unwind and breathe deeply.",
    images: ["/logo.png"],
  },
]
