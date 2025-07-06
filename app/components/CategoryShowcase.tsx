"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Snowflake, Tv, ChefHat, Package, Shirt } from "lucide-react"

const categories = [
  {
    id: "air-conditioners",
    name: "Air Conditioners",
    description: "Cool & efficient climate control",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 12,
    icon: Snowflake,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    id: "refrigerators",
    name: "Refrigerators",
    description: "Fresh storage solutions",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 18,
    icon: Package,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
  },
  {
    id: "televisions",
    name: "Televisions",
    description: "Entertainment at its finest",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 24,
    icon: Tv,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
  },
  {
    id: "kitchen",
    name: "Kitchen Appliances",
    description: "Ovens, microwaves & more",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 15,
    icon: ChefHat,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
  },
  {
    id: "freezers",
    name: "Deep Freezers",
    description: "Extra storage capacity",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 8,
    icon: Zap,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    id: "laundry",
    name: "Washing Machines",
    description: "Efficient laundry solutions",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 14,
    icon: Shirt,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
  },
]

export default function CategoryShowcase() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Shop by Category</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Find Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Appliance
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse our comprehensive selection of premium home appliances, each category featuring the latest technology
            and energy-efficient designs crafted for modern living.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card
                  className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white hover:-translate-y-2"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <CardContent className="p-0">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                      ></div>
                      <Image
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Icon Overlay */}
                      <div
                        className={`absolute top-4 right-4 w-12 h-12 ${category.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <IconComponent className={`h-6 w-6 ${category.textColor}`} />
                      </div>

                      {/* Product Count Badge */}
                      <Badge className="absolute bottom-4 left-4 bg-white/90 text-gray-700 hover:bg-white/90">
                        {category.productCount} products
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <ArrowRight
                          className={`h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-all duration-300 ${
                            hoveredCategory === category.id ? "translate-x-1" : ""
                          }`}
                        />
                      </div>
                      <p className="text-gray-600 leading-relaxed">{category.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
