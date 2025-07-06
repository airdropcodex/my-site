import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: "air-conditioners",
    name: "Air Conditioners",
    description: "Cool & efficient climate control",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 12,
  },
  {
    id: "refrigerators",
    name: "Refrigerators",
    description: "Fresh storage solutions",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 18,
  },
  {
    id: "televisions",
    name: "Televisions",
    description: "Entertainment at its finest",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 24,
  },
  {
    id: "kitchen",
    name: "Kitchen Appliances",
    description: "Ovens, microwaves & more",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 15,
  },
  {
    id: "freezers",
    name: "Deep Freezers",
    description: "Extra storage capacity",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 8,
  },
  {
    id: "laundry",
    name: "Washing Machines",
    description: "Efficient laundry solutions",
    image: "/placeholder.svg?height=200&width=300",
    productCount: 14,
  },
]

export default function CategoryGrid() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-light text-gray-900 mb-4">Shop by Category</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our comprehensive selection of home appliances, each category featuring the latest technology and
          energy-efficient designs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/category/${category.id}`}>
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <span className="text-sm text-gray-500">{category.productCount} products</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
