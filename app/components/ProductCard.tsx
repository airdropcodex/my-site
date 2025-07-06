"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
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
      className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-white overflow-hidden hover:-translate-y-1 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative">
          {product.badge && (
            <Badge className="absolute top-2 left-2 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-md text-xs">
              {product.badge}
            </Badge>
          )}

          {discountPercentage > 0 && (
            <Badge className="absolute top-2 right-12 z-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-md text-xs">
              -{discountPercentage}%
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md rounded-lg transition-all duration-200 h-8 w-8"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={`h-3 w-3 transition-colors duration-200 ${
                isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-600"
              }`}
            />
          </Button>

          {/* Optimized image container with proper scaling */}
          <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100 relative">
            <Image
              src={product.image_url || "/placeholder.svg?height=300&width=400"}
              alt={product.name}
              width={400}
              height={300}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            />

            {/* Overlay on hover */}
            <div
              className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-all duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Link href={`/products/${product.id}`}>
                <Button
                  size="sm"
                  className="bg-white/90 backdrop-blur-sm text-neutral-900 hover:bg-white shadow-md rounded-lg text-xs"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Quick View
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Compact content section */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <div>
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide bg-neutral-100 px-2 py-1 rounded-md">
              {product.category || "Electronics"}
            </span>
          </div>

          {/* Compact product name */}
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm font-bold text-neutral-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 min-h-[2.5rem] flex items-start cursor-pointer">
              {product.name}
            </h3>
          </Link>

          {/* Compact features section */}
          <div className="min-h-[1.5rem] flex items-start">
            {product.features && product.features.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 2).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-1 text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-200/50"
                  >
                    <Zap className="h-2 w-2" />
                    <span className="text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1">
                <div className="flex items-center space-x-1 text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 px-2 py-1 rounded-md border border-indigo-200/50">
                  <Zap className="h-2 w-2" />
                  <span className="text-xs">Premium</span>
                </div>
              </div>
            )}
          </div>

          {/* Compact rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-medium text-neutral-600">
              {product.rating} ({product.review_count})
            </span>
          </div>

          {/* Compact pricing */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-neutral-900">{formatPrice(product.price)}</span>
              {product.original_price && (
                <span className="text-sm text-neutral-500 line-through">{formatPrice(product.original_price)}</span>
              )}
            </div>
            {discountPercentage > 0 && (
              <span className="text-xs font-medium text-green-600">
                Save {formatPrice(product.original_price! - product.price)}
              </span>
            )}
          </div>

          {/* Compact features list */}
          <div className="space-y-1 text-xs text-neutral-600">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
              <span>Energy Efficient</span>
            </div>
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
              <span>Free Delivery</span>
            </div>
          </div>

          {/* Compact button */}
          <div className="mt-auto pt-2">
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group text-sm py-2">
              <ShoppingCart className="h-3 w-3 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Add to Cart
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
