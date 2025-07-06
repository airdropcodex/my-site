import { notFound } from "next/navigation"
import Header from "../../components/Header"
import ProductCard from "../../components/ProductCard"
import Footer from "../../components/Footer"
import { Button } from "@/components/ui/button"
import { Filter, Grid, List } from "lucide-react"

const categoryData = {
  fridge: {
    name: "Refrigerators",
    description: "Keep your food fresh with our premium refrigerators",
    products: [
      {
        id: 1,
        name: "Smart French Door Refrigerator 500L",
        price: 89900,
        original_price: 109900,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Refrigerators",
        description: "Energy-efficient smart refrigerator with advanced cooling technology",
        badge: "Best Seller",
        rating: 4.8,
        review_count: 124,
        features: ["Smart Display", "Energy Star", "Water Dispenser"],
      },
      {
        id: 2,
        name: "Side by Side Refrigerator 600L",
        price: 95900,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Refrigerators",
        description: "Large capacity refrigerator with ice maker",
        rating: 4.6,
        review_count: 89,
        features: ["Ice Maker", "LED Lighting", "Digital Controls"],
      },
    ],
  },
  "washing-machine": {
    name: "Washing Machines",
    description: "Efficient laundry solutions for modern homes",
    products: [
      {
        id: 3,
        name: "Front Load Washing Machine 8kg",
        price: 45900,
        original_price: 55900,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Washing Machines",
        description: "High-efficiency front-loading washing machine",
        badge: "Sale",
        rating: 4.7,
        review_count: 156,
        features: ["Steam Clean", "Quick Wash", "Energy Efficient"],
      },
    ],
  },
  tv: {
    name: "Televisions",
    description: "Premium entertainment with our smart TVs",
    products: [
      {
        id: 4,
        name: '55" 4K Smart TV',
        price: 65900,
        original_price: 79900,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Televisions",
        description: "Ultra HD smart TV with streaming capabilities",
        badge: "Premium",
        rating: 4.9,
        review_count: 203,
        features: ["4K Display", "Smart OS", "Voice Control"],
      },
    ],
  },
  oven: {
    name: "Ovens",
    description: "Modern cooking solutions for your kitchen",
    products: [
      {
        id: 5,
        name: "Convection Microwave Oven 30L",
        price: 25900,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Ovens",
        description: "Multi-function convection microwave with grill",
        rating: 4.5,
        review_count: 92,
        features: ["Convection Cooking", "Auto Programs", "Child Lock"],
      },
    ],
  },
  "deep-fridge": {
    name: "Deep Freezers",
    description: "Extra storage capacity for bulk freezing",
    products: [
      {
        id: 6,
        name: "Chest Deep Freezer 300L",
        price: 35900,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Deep Freezers",
        description: "Large capacity chest freezer with energy-efficient operation",
        rating: 4.6,
        review_count: 67,
        features: ["Large Capacity", "Energy Star", "Lock & Key"],
      },
    ],
  },
  ac: {
    name: "Air Conditioners",
    description: "Stay cool with our energy-efficient ACs",
    products: [
      {
        id: 7,
        name: "Split AC 1.5 Ton Inverter",
        price: 55900,
        original_price: 69900,
        image_url: "/placeholder.svg?height=300&width=300",
        category: "Air Conditioners",
        description: "Energy-efficient inverter AC with smart controls",
        badge: "Hot",
        rating: 4.8,
        review_count: 134,
        features: ["Inverter Technology", "Smart Control", "Copper Coil"],
      },
    ],
  },
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categoryData[params.slug as keyof typeof categoryData]

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Category Header */}
        <section className="bg-gradient-to-br from-neutral-50 to-indigo-50/30 py-24 mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                {category.name}
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-2xl mt-2">
                  Premium Collection
                </span>
              </h1>
              <p className="text-xl text-neutral-600">{category.description}</p>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="border-b border-neutral-100">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <span className="text-neutral-600">{category.products.length} products</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Grid className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {category.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
