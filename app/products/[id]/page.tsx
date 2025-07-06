"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, Zap, ArrowLeft, Plus, Minus, Share2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

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
  description?: string
  specifications?: Record<string, string>
  in_stock?: boolean
  stock_quantity?: number
}

// Fallback product data
const getFallbackProduct = (id: string): Product => ({
  id,
  name: "Premium Electronics Product",
  price: 45000,
  original_price: 55000,
  image_url: "/placeholder.svg?height=600&width=600",
  category: "Electronics",
  rating: 4.5,
  review_count: 128,
  badge: "Best Seller",
  isOnSale: true,
  features: ["Premium Quality", "Energy Efficient", "2 Year Warranty", "Free Installation"],
  description:
    "Experience the perfect blend of innovation and reliability with this premium electronics product. Designed with cutting-edge technology and built to last, this product offers exceptional performance for modern homes and offices.",
  specifications: {
    Brand: "Premium Electronics",
    Model: `PE-${id}`,
    Warranty: "2 Years",
    "Power Consumption": "Energy Efficient",
    Dimensions: "Standard Size",
    Weight: "Optimized",
    Color: "Modern Finish",
    Installation: "Free Professional Installation",
  },
  in_stock: true,
  stock_quantity: 15,
})

export default function ProductDetails() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const productId = params.id as string

  useEffect(() => {
    async function fetchProduct() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("products").select("*").eq("id", productId).single()

        if (error || !data) {
          console.warn("Product not found in database, using fallback data")
          setProduct(getFallbackProduct(productId))
        } else {
          setProduct(data)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setProduct(getFallbackProduct(productId))
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("bn-BD", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const discountPercentage = product?.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} item(s) to cart!`)
  }

  const handleBuyNow = () => {
    toast.success("Redirecting to checkout...")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/products" className="inline-flex items-center text-indigo-600 hover:text-indigo-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={product.image_url || "/placeholder.svg?height=600&width=600"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail images - placeholder for multiple images */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`aspect-square bg-white rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === index - 1 ? "border-indigo-600" : "border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(index - 1)}
                >
                  <Image
                    src={product.image_url || "/placeholder.svg?height=150&width=150"}
                    alt={`${product.name} view ${index}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.badge && (
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">{product.badge}</Badge>
              )}
              {discountPercentage > 0 && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  -{discountPercentage}% OFF
                </Badge>
              )}
              <Badge variant="outline" className="text-indigo-600 border-indigo-600">
                {product.category}
              </Badge>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium text-gray-700">
                {product.rating} ({product.review_count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                {product.original_price && (
                  <span className="text-2xl text-gray-500 line-through">{formatPrice(product.original_price)}</span>
                )}
              </div>
              {discountPercentage > 0 && (
                <p className="text-lg font-medium text-green-600">
                  You save {formatPrice(product.original_price! - product.price)}
                </p>
              )}
            </div>

            {/* Features */}
            {product.features && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-indigo-600" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.in_stock ? "bg-green-500" : "bg-red-500"}`}></div>
              <span className={`font-medium ${product.in_stock ? "text-green-700" : "text-red-700"}`}>
                {product.in_stock ? `In Stock (${product.stock_quantity} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= (product.stock_quantity || 10)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3"
                  disabled={!product.in_stock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" onClick={() => setIsWishlisted(!isWishlisted)} className="p-3">
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon" className="p-3 bg-transparent">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <Button
                onClick={handleBuyNow}
                variant="outline"
                className="w-full py-3 border-indigo-600 text-indigo-600 hover:bg-indigo-50 bg-transparent"
                disabled={!product.in_stock}
              >
                Buy Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                <p className="text-xs text-gray-600">Within Dhaka</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">2 Year Warranty</p>
                <p className="text-xs text-gray-600">Official Warranty</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-600">7 Days Return</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Product Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {product.description ||
                      "This premium electronics product combines cutting-edge technology with exceptional build quality. Designed for modern homes and offices, it offers reliable performance and energy efficiency. With professional installation and comprehensive warranty coverage, this product represents excellent value for money."}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="space-y-3">
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                          <span className="font-medium text-gray-900">{key}</span>
                          <span className="text-gray-700">{value}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="font-medium text-gray-900">Brand</span>
                          <span className="text-gray-700">Premium Electronics</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="font-medium text-gray-900">Model</span>
                          <span className="text-gray-700">PE-{productId}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="font-medium text-gray-900">Warranty</span>
                          <span className="text-gray-700">2 Years Official Warranty</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-200">
                          <span className="font-medium text-gray-900">Energy Rating</span>
                          <span className="text-gray-700">5 Star Energy Efficient</span>
                        </div>
                        <div className="flex justify-between py-2">
                          <span className="font-medium text-gray-900">Installation</span>
                          <span className="text-gray-700">Free Professional Installation</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    {/* Sample reviews */}
                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="font-medium">Excellent Product!</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        "Great quality and fast delivery. Highly recommended for anyone looking for reliable
                        electronics."
                      </p>
                      <p className="text-xs text-gray-500 mt-2">- Verified Customer</p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="h-4 w-4 text-gray-300" />
                        </div>
                        <span className="font-medium">Good Value</span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        "Good product for the price. Installation was smooth and professional."
                      </p>
                      <p className="text-xs text-gray-500 mt-2">- Verified Customer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
