// app/product/[slug]/page.tsx
import { products } from "@/data/products"
import ProductClientView from "./ProductClientView"

interface PageProps {
  params: { slug: string }
}

export default function ProductPage({ params }: PageProps) {
  const product = products.find((p) => p.slug === params.slug)
  const related = products.filter((p) => p.slug !== params.slug).slice(0, 2)

  return <ProductClientView product={product} related={related} />
}
