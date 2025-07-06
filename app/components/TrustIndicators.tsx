import { Users, Package, Star, Shield, Award, Truck, Headphones, RefreshCw } from "lucide-react"

const stats = [
  { icon: Users, number: "50K+", label: "Happy Customers", color: "from-blue-500 to-cyan-500" },
  { icon: Package, number: "500+", label: "Premium Products", color: "from-emerald-500 to-teal-500" },
  { icon: Star, number: "4.9", label: "Average Rating", color: "from-yellow-500 to-orange-500" },
  { icon: Shield, number: "99%", label: "Satisfaction Rate", color: "from-purple-500 to-violet-500" },
]

const features = [
  { icon: Truck, title: "Free Shipping", description: "On orders over $500" },
  { icon: RefreshCw, title: "Easy Returns", description: "30-day return policy" },
  { icon: Award, title: "Quality Assured", description: "Premium brands only" },
  { icon: Headphones, title: "Expert Support", description: "24/7 customer service" },
]

export default function TrustIndicators() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                >
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl font-bold text-neutral-900 mb-2">{stat.number}</div>
                <div className="text-neutral-600 font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Features */}
        <div className="bg-gradient-to-br from-neutral-50 to-indigo-50/30 rounded-3xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <IconComponent className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h3 className="font-bold text-lg text-neutral-900 mb-2">{feature.title}</h3>
                  <p className="text-neutral-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
