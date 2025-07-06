"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import ProductCard from "./ProductCard"

interface Product {
  id: string
  name: string
  price: number
  original_price: number | null
  image_url: string | null
  category_id: string | null
  rating: number
  review_count: number
  badge: string | null
  is_on_sale: boolean
  features: string[] | null
}

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Premium Smart Air Conditioner 1.5 Ton",
    price: 89900,
    original_price: 109900,
    image_url: "/placeholder.svg?height=400&width=400",
    category_id: null,
    rating: 4.8,
    review_count: 124,
    badge: "Hot",
    is_on_sale: true,
    features: ["Energy Star", "Smart Control", "Quiet Operation"],
  },
  {
    id: "2",
    name: "French Door Smart Refrigerator 500L",
    price: 129900,
    original_price: 159900,
    image_url: "/placeholder.svg?height=400&width=400",
    category_id: null,
    rating: 4.9,
    review_count: 156,
    badge: "New",
    is_on_sale: true,
    features: ["Smart Display", "Energy Efficient", "Large Capacity"],
  },
  {
    id: "3",
    name: "65 Inch 4K OLED Smart TV",
    price: 179900,
    original_price: 229900,
    image_url: "/placeholder.svg?height=400&width=400",
    category_id: null,
    rating: 4.9,
    review_count: 203,
    badge: "Premium",
    is_on_sale: true,
    features: ["4K OLED Display", "HDR Support", "Smart OS"],
  },
  {
    id: "4",
    name: "Front Load Washing Machine 8kg",
    price: 79900,
    original_price: null,
    image_url: "/placeholder.svg?height=400&width=400",
    category_id: null,
    rating: 4.7,
    review_count: 145,
    badge: null,
    is_on_sale: false,
    features: ["Front Loading", "Steam Clean", "Energy Star"],
  },
  {
    id: "5",
    name: "Convection Microwave Oven 30L",
    price: 45900,
    original_price: null,
    image_url: "/placeholder.svg?height=400&width=400",
    category_id: null,
    rating: 4.6,
    review_count: 92,
    badge: null,
    is_on_sale: false,
    features: ["Convection Cooking", "Auto Programs", "Digital Display"],
  },
  {
    id: "6",
    name: "Chest Deep Freezer 300L",
    price: 59900,
    original_price: null,
    image_url: "/placeholder.svg?height=400&width=400",
    category_id: null,
    rating: 4.8,
    review_count: 67,
    badge: null,
    is_on_sale: false,
    features: ["Large Capacity", "Energy Efficient", "Lock & Key"],
  },
]

const filterTabs = [
  { id: "all", name: "All Products" },
  { id: "bestsellers", name: "Best Sellers" },
  { id: "new", name: "New Arrivals" },
  { id: "sale", name: "On Sale" },
]

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [activeFilter])

  const fetchProducts = async () => {
    setLoading(true)

    // Always try to use fallback data first to ensure products show
    console.log("Fetching products with filter:", activeFilter)

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase not configured – using fallback products.")
      setProducts(fallbackProducts)
      setLoading(false)
      return
    }

    try {
      let query = supabase.from("products").select("*").eq("is_active", true)

      switch (activeFilter) {
        case "bestsellers":
          query = query.gte("rating", 4.5).order("rating", { ascending: false })
          break
        case "new":
          query = query.order("created_at", { ascending: false })
          break
        case "sale":
          query = query.not("original_price", "is", null)
          break
        default:
          query = query.eq("is_featured", true).order("created_at", { ascending: false })
      }

      const { data: productRows, error } = await query.limit(6)

      if (error) {
        console.warn("Database error, using fallback products:", error.message)
        setProducts(fallbackProducts)
      } else if (!productRows || productRows.length === 0) {
        console.warn("No products found in database, using fallback products")
        setProducts(fallbackProducts)
      } else {
        console.log("Successfully fetched products:", productRows.length)
        setProducts(
          productRows.map((p) => ({
            ...p,
            is_on_sale: !!p.original_price,
          })),
        )
      }
    } catch (err) {
      console.error("Unexpected error fetching products:", err)
      setProducts(fallbackProducts)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-neutral-50 to-indigo-50/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/50 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-purple-700">Featured Collection</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Premium Electronics
            <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Handpicked for You
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover our carefully curated selection of premium electronics designed to elevate your lifestyle with
            cutting-edge technology and superior performance.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-neutral-200/50">
            <div className="flex space-x-1">
              {filterTabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === tab.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/50"
                  }`}
                  onClick={() => setActiveFilter(tab.id)}
                >
                  {tab.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid with equal heights */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-[600px]">
                <div className="aspect-square bg-neutral-200 rounded-xl mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="opacity-0 animate-fade-in-up h-full"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="group border-2 border-neutral-200 hover:border-indigo-300 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg"
          >
            Load More Products
            <div className="ml-2 w-5 h-5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <span className="text-white text-xs">+</span>
            </div>
          </Button>
        </div>
      </div>
    </section>
  )
}
