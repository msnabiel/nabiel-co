import { products } from "@/data/products"
import ProductClientView from "./ProductClientView"

interface PageProps {
  params: Promise<{ slug: string }>
}

// Server component — statically generated
export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  const related = products.filter((p) => p.slug !== slug).slice(0, 2)
  
  return <ProductClientView product={product} related={related} />
}

// Static paths for build-time generation
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}