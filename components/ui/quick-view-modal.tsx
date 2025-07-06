"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { ImageZoom } from "./image-zoom"

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

interface QuickViewModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

export function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (!product) return null

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 h-full"
        >
          {/* Left side - Image */}
          <div className="relative h-64 md:h-full bg-neutral-50">
            <ImageZoom
              src={product.image}
              alt={product.name}
              className="w-full h-full"
              zoomLevel={1.5}
            />
            
            {product.badge && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  {product.badge}
                </Badge>
              </motion.div>
            )}
            
            {discount > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="absolute top-4 right-4 bg-red-500 text-white">
                  -{discount}%
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Right side - Product details */}
          <div className="p-6 space-y-6 overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <DialogTitle className="text-2xl font-bold text-neutral-900 pr-8">
                  {product.name}
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="absolute top-4 right-4 rounded-full hover:bg-neutral-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-neutral-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-neutral-900">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-neutral-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  You save ${(product.originalPrice! - product.price).toLocaleString()}
                </p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Features */}
            {product.features && (
              <div className="space-y-2">
                <h4 className="font-semibold text-neutral-900">Key Features:</h4>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="text-sm text-neutral-600 flex items-center"
                    >
                      <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-900">Quantity:</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                  className="h-10 w-10 rounded-full"
                >
                  -
                </Button>
                <span className="text-lg font-medium w-8 text-center">{selectedQuantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                  className="h-10 w-10 rounded-full"
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-xl font-medium">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart - ${(product.price * selectedQuantity).toLocaleString()}
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`py-2 rounded-xl transition-all duration-300 ${
                    isWishlisted ? 'bg-red-50 border-red-200 text-red-600' : ''
                  }`}
                >
                  <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  Wishlist
                </Button>
                <Button variant="outline" className="py-2 rounded-xl">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 border-t border-neutral-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <Truck className="h-5 w-5 text-blue-600 mx-auto" />
                  <p className="text-xs text-neutral-600">Free Delivery</p>
                </div>
                <div className="space-y-1">
                  <Shield className="h-5 w-5 text-green-600 mx-auto" />
                  <p className="text-xs text-neutral-600">2 Year Warranty</p>
                </div>
                <div className="space-y-1">
                  <RotateCcw className="h-5 w-5 text-purple-600 mx-auto" />
                  <p className="text-xs text-neutral-600">30 Day Return</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
