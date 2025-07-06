import { Users, Package, Star, Shield } from "lucide-react"

const stats = [
  { icon: Users, number: "50K+", label: "Happy Customers" },
  { icon: Package, number: "500+", label: "Premium Products" },
  { icon: Star, number: "4.9", label: "Average Rating" },
  { icon: Shield, number: "99%", label: "Satisfaction Rate" },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
