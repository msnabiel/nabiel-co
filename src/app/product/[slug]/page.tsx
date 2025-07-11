import { products } from "@/data/products"
import ProductClientView from "./ProductClientView"

interface PageProps {
  params: { slug: string }
}

// Server component — statically generated
export default function ProductPage({ params }: PageProps) {
  const product = products.find((p) => p.slug === params.slug)
  const related = products.filter((p) => p.slug !== params.slug).slice(0, 2)

  return <ProductClientView product={product} related={related} />
}

// Static paths for build-time generation
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}
