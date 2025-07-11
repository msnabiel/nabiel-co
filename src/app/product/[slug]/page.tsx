// app/product/[slug]/page.tsx
import { products } from "@/data/products"
import { AlertTriangle, ArrowLeft, ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900">Product Not Found</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Oops! We couldn't find the candle you're looking for.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse More Candles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header with back button */}
      <div className="sticky top-0 z-0 bg-transparent backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square bg-white rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Thumbnail gallery placeholder - you can add multiple images later */}
            <div className="hidden sm:flex gap-3">
              <div className="w-20 h-20 bg-white rounded-lg shadow-md overflow-hidden border-2 border-amber-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Add more thumbnails here if you have multiple product images */}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-2xl sm:text-3xl font-bold text-amber-600">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    In Stock
                  </span>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                {product.description ||
                  "This candle is crafted with love and natural ingredients to bring calm and comfort to your space. Perfect for creating a cozy atmosphere in any room."}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-100">
              <h3 className="font-semibold text-gray-900 mb-4">Product Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-600">Natural Soy Wax</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-600">40+ Hour Burn Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-600">Hand-Poured</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  <span className="text-gray-600">Eco-Friendly</span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button className="px-3 py-2 hover:bg-gray-100 transition-colors">-</button>
                  <span className="px-4 py-2 border-x border-gray-300">1</span>
                  <button className="px-3 py-2 hover:bg-gray-100 transition-colors">+</button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-4 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="sm:w-auto w-full bg-white text-amber-600 border-2 border-amber-200 px-6 py-4 rounded-xl font-semibold hover:bg-amber-50 transition-all duration-200 flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span className="sm:hidden">Add to Wishlist</span>
                </button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 className="font-semibold text-gray-900 mb-2">Care Instructions</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Trim wick to 1/4" before each use. Allow wax to pool to edges for even burning. 
                Never leave unattended. Keep away from children and pets.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}