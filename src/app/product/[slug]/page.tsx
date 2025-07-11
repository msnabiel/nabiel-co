import { products } from "@/data/products"
import ProductClientView from "./ProductClientView"

interface ProductPageProps {
  params: { slug: string }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug)
  const related = products.filter((p) => p.slug !== params.slug).slice(0, 2)

  return (
    <ProductClientView product={product} related={related} />
  )
}
