import { createServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, TrendingUp, Eye, Heart } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = createServerClient()

  // Fetch dashboard stats
  const [{ count: productsCount }, { count: categoriesCount }, { data: featuredProducts }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*").eq("is_featured", true).limit(5),
  ])

  const stats = [
    {
      title: "Total Products",
      value: productsCount || 0,
      icon: Package,
      color: "from-blue-500 to-cyan-500",
      change: "+12%",
    },
    {
      title: "Categories",
      value: categoriesCount || 0,
      icon: Users,
      color: "from-emerald-500 to-teal-500",
      change: "+5%",
    },
    {
      title: "Featured Items",
      value: featuredProducts?.length || 0,
      icon: Heart,
      color: "from-purple-500 to-violet-500",
      change: "+8%",
    },
    {
      title: "Page Views",
      value: "12.5K",
      icon: Eye,
      color: "from-orange-500 to-red-500",
      change: "+23%",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-2">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}
                  >
                    <IconComponent className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Products */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <span>Featured Products</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {featuredProducts?.map((product) => (
              <div key={product.id} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">{product.name}</h3>
                  <p className="text-sm text-neutral-600">${product.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-900">★ {product.rating}</p>
                  <p className="text-xs text-neutral-600">{product.review_count} reviews</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
