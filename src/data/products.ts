// src/data/products.ts

export type Variant = {
  id: string
  name: string
  slug: string
  sku: string
  price: number
  description: string
  images: string[]
}
export type FlattenedVariant = Variant & {
  parentName: string
  type: "Aura" | "Zen"
}

export type Product = {
  id: number
  name: string // e.g., "Aura Candle"
  slug: string // e.g., "aura-candle"
  type: "Aura" | "Zen"
  defaultVariantId: string
  variants: Variant[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Aura Candle",
    slug: "aura-candle",
    type: "Aura",
    defaultVariantId: "aura-rose",
    variants: [
      {
        id: "aura-rose",
        name: "Rose",
        slug: "aura-candle-rose",
        sku: "AURA-ROSE",
        price: 299,
        description: "A romantic rose-scented Aura candle for calming spaces.",
        images: ["/logo.png", "/logo.png"],
      },
      {
        id: "aura-jasmine",
        name: "Jasmine",
        slug: "aura-candle-jasmine",
        sku: "AURA-JASMINE",
        price: 299,
        description: "Floral jasmine Aura candle to soothe your senses.",
        images: ["/logo.png", "/logo.png"],
      },
      {
        id: "aura-sandalwood",
        name: "Sandalwood",
        slug: "aura-candle-sandalwood",
        sku: "AURA-SANDAL",
        price: 299,
        description: "Earthy sandalwood Aura candle for grounding energy.",
        images: ["/logo.png", "/logo.png"],
      },
      {
        id: "aura-lemongrass",
        name: "Lemongrass",
        slug: "aura-candle-lemongrass",
        sku: "AURA-LEMONGRASS",
        price: 299,
        description: "Zesty lemongrass Aura candle to refresh your space.",
        images: ["/logo.png", "/logo.png"],
      },
      {
        id: "aura-lavender",
        name: "Lavender",
        slug: "aura-candle-lavender",
        sku: "AURA-LAVENDER",
        price: 299,
        description: "Soothing lavender Aura candle to relax your mood.",
        images: ["/logo.png", "/logo.png"], 
      },
    ],
  },
  {
    id: 2,
    name: "Zen Candle",
    slug: "zen-candle",
    type: "Zen",
    defaultVariantId: "zen-rose",
    variants: [
      {
        id: "zen-rose",
        name: "Rose",
        slug: "zen-candle-rose",
        sku: "ZEN-ROSE",
        price: 349,
        description: "Rose-scented Zen candle to calm the mind and elevate your mood.",
        images: ["/logo.png", "/logo.png"],
      },
      {
        id: "zen-jasmine",
        name: "Jasmine",
        slug: "zen-candle-jasmine",
        sku: "ZEN-JASMINE",
        price: 349,
        description: "Delicate jasmine Zen candle for meditative spaces.",
        images: ["/logo.png", "/logo.png"],
      },
      {
        id: "zen-sandalwood",
        name: "Sandalwood",
        slug: "zen-candle-sandalwood",
        sku: "ZEN-SANDAL",
        price: 349,
        description: "Warm sandalwood Zen candle for a deep sense of peace.",
        images: ["/logo.png", "/logo.png"],
      },
      {
        id: "zen-lemongrass",
        name: "Lemongrass",
        slug: "zen-candle-lemongrass",
        sku: "ZEN-LEMONGRASS",
        price: 349,
        description: "Invigorating lemongrass Zen candle to awaken your senses.",
        images: ["/logo.png", "/logo.png"],
      },
      {
        id: "zen-lavender",
        name: "Lavender",
        slug: "zen-candle-lavender",
        sku: "ZEN-LAVENDER",
        price: 349,
        description: "Lavender Zen candle to help you unwind and breathe deeply.",
        images: ["/logo.png", "/logo.png"],
      },
    ],
  },
]

