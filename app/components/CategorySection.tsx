"use client"

import { useState } from "react"
import Link from "next/link"
import { Snowflake, Package, Tv, ChefHat, Shirt } from "lucide-react"

const categories = [
  { id: "fridge", name: "Fridge", icon: Package, color: "from-emerald-500 to-teal-500" },
  { id: "washing-machine", name: "Washing Machine", icon: Shirt, color: "from-pink-500 to-rose-500" },
  { id: "tv", name: "TV", icon: Tv, color: "from-violet-500 to-purple-500" },
  { id: "oven", name: "Oven", icon: ChefHat, color: "from-orange-500 to-red-500" },
  { id: "deep-fridge", name: "Deep Fridge", icon: Package, color: "from-indigo-500 to-blue-500" },
  { id: "ac", name: "AC", icon: Snowflake, color: "from-cyan-500 to-blue-500" },
]

export default function CategorySection() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200/50 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-medium text-indigo-700">Shop by Category</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
            Find exactly what
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              you're looking for
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Browse our comprehensive selection of premium electronics, each category curated for excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Link key={category.id} href={`/category/${category.id}`}>
                <div className="bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 group text-center">
                  <div className="flex flex-col items-center space-y-3">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 group-hover:text-indigo-600 transition-colors duration-200">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
