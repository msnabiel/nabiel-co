import { products } from "@/data/products"
import ProductClientView from "./ProductClientView"
import type { FlattenedVariant } from "@/data/products"

interface PageProps {
  params: { slug: string }
}

export default function ProductPage({ params }: PageProps) {
  const { slug } = params

  // Flatten variants to search by slug
  const allVariants: FlattenedVariant[] = products.flatMap((product) =>
    product.variants.map((variant) => ({
      ...variant,
      parentName: product.name,
      type: product.type,
    }))
  )

  const product = allVariants.find((v) => v.slug === slug)

  // Related = just other random variants (excluding the current one)
  const related = allVariants.filter((v) => v.slug !== slug).slice(0, 4)

  return <ProductClientView product={product} related={related} />
}

// Static paths for build-time generation
export async function generateStaticParams() {
  const variantSlugs = products.flatMap((product) =>
    product.variants.map((variant) => ({
      slug: variant.slug,
    }))
  )

  return variantSlugs
}
