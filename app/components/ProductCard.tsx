"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Eye, Zap, ShoppingCart } from "lucide-react"

interface Product {
  id: number | string
  name: string
  price: number
  original_price?: number | null
  image_url?: string | null
  category?: string
  rating: number
  review_count: number
  badge?: string | null
  isOnSale?: boolean
  features?: string[] | null
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const discountPercentage = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  // Format price in BDT
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card
      className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden hover:-translate-y-2 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative">
          {product.badge && (
            <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg">
              {product.badge}
            </Badge>
          )}

          {discountPercentage > 0 && (
            <Badge className="absolute top-4 right-16 z-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg">
              -{discountPercentage}%
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg rounded-xl transition-all duration-200"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={`h-4 w-4 transition-colors duration-200 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-600"
              }`}
            />
          </Button>

          {/* Fixed aspect ratio container for consistent image sizing */}
          <div className="aspect-square overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 relative">
            <Image
              src={product.image_url || "/placeholder.svg?height=400&width=400"}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* Overlay on hover */}
            <div
              className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button
                size="sm"
                className="bg-white/90 backdrop-blur-sm text-neutral-900 hover:bg-white shadow-lg rounded-xl"
              >
                <Eye className="h-4 w-4 mr-2" />
                Quick View
              </Button>
            </div>
          </div>
        </div>

        {/* Content section with flex-1 to fill remaining space */}
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <div>
            <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider bg-neutral-100 px-3 py-1 rounded-full">
              {product.category || "Electronics"}
            </span>
          </div>

          {/* Fixed height for product name to ensure consistency */}
          <h3 className="text-xl font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 min-h-[3.5rem] flex items-start">
            {product.name}
          </h3>

          {/* Features section with consistent height */}
          <div className="min-h-[2.5rem] flex items-start">
            {product.features && product.features.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {product.features.slice(0, 2).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200/50"
                  >
                    <Zap className="h-3 w-3" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-1 text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-200/50">
                  <Zap className="h-3 w-3" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center space-x-1 text-xs bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 px-3 py-1 rounded-full border border-green-200/50">
                  <Zap className="h-3 w-3" />
                  <span>Energy Efficient</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-neutral-600">
              {product.rating} ({product.review_count})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-neutral-900">{formatPrice(product.price)}</span>
                {product.original_price && (
                  <span className="text-lg text-neutral-500 line-through">{formatPrice(product.original_price)}</span>
                )}
              </div>
              {discountPercentage > 0 && (
                <span className="text-sm font-medium text-green-600">
                  Save {formatPrice(product.original_price! - product.price)}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2 text-xs text-neutral-600">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>Energy Efficient</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>Free Delivery in Dhaka</span>
            </div>
          </div>

          {/* Push button to bottom with mt-auto */}
          <div className="mt-auto pt-4">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Add to Cart • {formatPrice(product.price)}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
