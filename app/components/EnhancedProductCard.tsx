"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart, Eye, Compare } from "lucide-react"
import { ImageZoom } from "@/components/ui/image-zoom"
import { QuickViewModal } from "@/components/ui/quick-view-modal"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviewCount: number
  badge?: string
  features?: string[]
  description?: string
}

interface EnhancedProductCardProps {
  product: Product
  index?: number
}

export default function EnhancedProductCard({ product, index = 0 }: EnhancedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showQuickView, setShowQuickView] = useState(false)

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Card className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white overflow-hidden cursor-pointer relative">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden bg-neutral-50">
            <ImageZoom
              src={product.image}
              alt={product.name}
              className="w-full h-full"
              zoomLevel={1.2}
            />
            
            {/* Badges */}
            {product.badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white z-10">
                  {product.badge}
                </Badge>
              </motion.div>
            )}
            
            {discount > 0 && (
              <Badge className="absolute top-3 right-3 bg-red-500 text-white z-10">
                -{discount}%
              </Badge>
            )}

            {/* Action Buttons Overlay */}
            <motion.div
              className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
              initial={false}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  className="flex space-x-2"
                  initial={{ scale: 0, rotate: 180 }}
                  animate={{ 
                    scale: isHovered ? 1 : 0, 
                    rotate: isHovered ? 0 : 180 
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/90 hover:bg-white shadow-lg hover:scale-110 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowQuickView(true)
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`rounded-full shadow-lg hover:scale-110 transition-all duration-200 ${
                      isWishlisted 
                        ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                        : 'bg-white/90 hover:bg-white'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsWishlisted(!isWishlisted)
                    }}
                  >
                    <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white/90 hover:bg-white shadow-lg hover:scale-110 transition-all duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Add to compare functionality
                    }}
                  >
                    <Compare className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <CardContent className="p-6 space-y-4">
            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3.5 w-3.5 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-neutral-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs text-neutral-500">({product.reviewCount})</span>
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-lg text-neutral-900 line-clamp-2 leading-tight">
              {product.name}
            </h3>

            {/* Price */}
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-neutral-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-xs text-green-600 font-medium">
                  Save ${(product.originalPrice! - product.price).toLocaleString()}
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 20 
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Button 
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium group/btn"
                onClick={(e) => {
                  e.stopPropagation()
                  // Add to cart functionality
                }}
              >
                <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                Add to Cart
              </Button>
            </motion.div>

            {/* Quick Features (visible when not hovered) */}
            <motion.div
              className="space-y-1"
              initial={false}
              animate={{ 
                opacity: isHovered ? 0 : 1,
                height: isHovered ? 0 : 'auto'
              }}
              transition={{ duration: 0.3 }}
            >
              {product.features?.slice(0, 2).map((feature, index) => (
                <p key={index} className="text-xs text-neutral-600 flex items-center">
                  <div className="w-1 h-1 bg-indigo-600 rounded-full mr-2" />
                  {feature}
                </p>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <QuickViewModal
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
        product={product}
      />
    </>
  )
}
