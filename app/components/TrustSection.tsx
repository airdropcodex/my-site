import { Shield, Truck, Headphones, Award, Users, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const trustFeatures = [
  {
    icon: Shield,
    title: "Warranty Protection",
    description: "Comprehensive warranty coverage on all products",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description: "Free installation and delivery nationwide",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service assistance",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Award,
    title: "Quality Assured",
    description: "Only premium brands and certified products",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

const stats = [
  { number: "50K+", label: "Happy Customers", icon: Users },
  { number: "4.9/5", label: "Customer Rating", icon: Star },
  { number: "99%", label: "Satisfaction Rate", icon: Award },
  { number: "24/7", label: "Support Available", icon: Headphones },
]

export default function TrustSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Trust Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustFeatures.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <IconComponent className="h-8 w-8 mx-auto mb-3 opacity-80" />
                  <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
