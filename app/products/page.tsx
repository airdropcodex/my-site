"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Header from "../components/Header"
import ProductCard from "../components/ProductCard"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Grid, List, Search } from "lucide-react"

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
  {
    id: "7",
    name: "Split AC 1.5 Ton Inverter",
    price: 75900,
    original_price: 89900,
    image_url: "/placeholder.svg?height=400&width=400",
    category_id: null,
    rating: 4.6,
    review_count: 98,
    badge: "Sale",
    is_on_sale: true,
    features: ["Inverter Technology", "Energy Efficient", "Remote Control"],
  },
  {
    id: "8",
    name: "Top Load Washing Machine 7kg",
    price: 54900,
    original_price: null,
    image_url: "/placeholder.svg?height=400&width=400",
    category_id: null,
    rating: 4.4,
    review_count: 76,
    badge: null,
    is_on_sale: false,
    features: ["Top Loading", "Multiple Programs", "Water Level Control"],
  },
]

const filterOptions = [
  { id: "all", name: "All Products" },
  { id: "sale", name: "On Sale" },
  { id: "featured", name: "Featured" },
  { id: "new", name: "New Arrivals" },
]

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const supabase = createClient()

  useEffect(() => {
    fetchProducts()
  }, [activeFilter])

  useEffect(() => {
    const search = searchParams.get("search")
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  const fetchProducts = async () => {
    setLoading(true)

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
        case "sale":
          query = query.not("original_price", "is", null)
          break
        case "featured":
          query = query.eq("is_featured", true)
          break
        case "new":
          query = query.order("created_at", { ascending: false })
          break
        default:
          query = query.order("created_at", { ascending: false })
      }

      const { data: productRows, error } = await query

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

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.features &&
        product.features.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase()))),
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by the filteredProducts computation above
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Page Header */}
        <section className="bg-gradient-to-br from-neutral-50 to-indigo-50/30 py-24 mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                All Products
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Premium Electronics
                </span>
              </h1>
              <p className="text-xl text-neutral-600">
                Discover our complete collection of premium home appliances designed for modern living
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="border-b border-neutral-100">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <form onSubmit={handleSearch}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </form>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                <div className="flex space-x-1 bg-neutral-100 rounded-xl p-1">
                  {filterOptions.map((filter) => (
                    <Button
                      key={filter.id}
                      variant="ghost"
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        activeFilter === filter.id
                          ? "bg-white text-indigo-600 shadow-sm"
                          : "text-neutral-600 hover:text-neutral-900"
                      }`}
                      onClick={() => setActiveFilter(filter.id)}
                    >
                      {filter.name}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-neutral-600">
              Showing {filteredProducts.length} products
              {searchQuery && ` for "${searchQuery}"`}
            </div>
          </div>
        </section>

        {/* Products Grid with equal heights */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-[450px]">
                    <div className="aspect-[4/3] bg-neutral-200 rounded-xl mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                      <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
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

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-neutral-600">
                  {searchQuery ? `No products found for "${searchQuery}"` : "No products found matching your criteria."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
