import ProductCard from "./ProductCard"

const products = [
  {
    id: 1,
    name: "Smart Air Conditioner",
    price: 899,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cooling",
    description: "Energy-efficient smart AC with WiFi control",
  },
  {
    id: 2,
    name: "French Door Refrigerator",
    price: 1299,
    image: "/placeholder.svg?height=300&width=300",
    category: "Refrigeration",
    description: "Spacious refrigerator with advanced cooling technology",
  },
  {
    id: 3,
    name: '65" 4K Smart TV',
    price: 799,
    image: "/placeholder.svg?height=300&width=300",
    category: "Entertainment",
    description: "Ultra HD smart TV with streaming capabilities",
  },
  {
    id: 4,
    name: "Convection Oven",
    price: 449,
    image: "/placeholder.svg?height=300&width=300",
    category: "Cooking",
    description: "Multi-function convection oven with digital controls",
  },
  {
    id: 5,
    name: "Deep Freezer",
    price: 599,
    image: "/placeholder.svg?height=300&width=300",
    category: "Storage",
    description: "Large capacity chest freezer for bulk storage",
  },
  {
    id: 6,
    name: "Front Load Washing Machine",
    price: 749,
    image: "/placeholder.svg?height=300&width=300",
    category: "Laundry",
    description: "High-efficiency washing machine with multiple cycles",
  },
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
