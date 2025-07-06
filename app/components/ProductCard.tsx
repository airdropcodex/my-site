"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"

interface Product {
  id: string | number
  name: string
  price: number
  original_price?: number | null
  image_url?: string | null
  category?: string
  rating: number
  review_count: number
  badge?: string | null
  is_on_sale?: boolean
  features?: string[] | null
}

interface ProductCardProps {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageError, setImageError] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const discountPercentage = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    // Add to cart logic here
    console.log("Added to cart:", product.name)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
  }

  return (
    <Card
      className={`group relative overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col ${className}`}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50">
        <Link href={`/products/${product.id}`}>
          <Image
            src={
              imageError
                ? "/placeholder.svg?height=300&width=300"
                : product.image_url || "/placeholder.svg?height=300&width=300"
            }
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1">
              {product.badge}
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={handleWishlist}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-600"}`} />
        </Button>

        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link href={`/products/${product.id}`}>
            <Button variant="secondary" size="sm" className="bg-white/90 backdrop-blur-sm hover:bg-white">
              <Eye className="h-4 w-4 mr-1" />
              Quick View
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <CardContent className="p-4 flex-1 flex flex-col">
        {/* Category */}
        {product.category && (
          <p className="text-xs font-medium text-indigo-600 uppercase tracking-wide mb-1">{product.category}</p>
        )}

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-neutral-900 text-sm leading-tight mb-2 min-h-[2.5rem] line-clamp-2 hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
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
          <span className="text-xs text-neutral-600">
            {product.rating} ({product.review_count})
          </span>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="mb-3 min-h-[2rem]">
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-700">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Price */}
        <div className="mb-3 mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-neutral-900">{formatPrice(product.price)}</span>
            {product.original_price && (
              <span className="text-sm text-neutral-500 line-through">{formatPrice(product.original_price)}</span>
            )}
          </div>
          {discountPercentage > 0 && (
            <p className="text-xs text-green-600 font-medium">
              Save {formatPrice(product.original_price! - product.price)}
            </p>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 text-sm"
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
