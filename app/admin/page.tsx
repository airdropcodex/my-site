"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  Package,
  Star,
  AlertCircle,
  Activity
} from "lucide-react"
import StatCard from "./components/StatCard"
import EnhancedDataTable from "./components/EnhancedDataTable"
import { RevealAnimation, StaggerContainer } from "@/components/ui/reveal-animation"
import { FloatingShape } from "@/components/ui/floating-elements"

// Mock data for demonstration
const statsData = [
  {
    title: "Total Revenue",
    value: 84392,
    change: 12.5,
    changeType: "increase" as const,
    prefix: "$",
    icon: <DollarSign className="h-6 w-6" />,
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600"
  },
  {
    title: "Total Orders",
    value: 1429,
    change: 8.2,
    changeType: "increase" as const,
    icon: <ShoppingBag className="h-6 w-6" />,
    gradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
  },
  {
    title: "Active Users",
    value: 2847,
    change: 3.1,
    changeType: "decrease" as const,
    icon: <Users className="h-6 w-6" />,
    gradient: "bg-gradient-to-br from-purple-500 to-violet-600"
  },
  {
    title: "Products Sold",
    value: 3926,
    change: 15.8,
    changeType: "increase" as const,
    icon: <Package className="h-6 w-6" />,
    gradient: "bg-gradient-to-br from-orange-500 to-red-600"
  }
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    email: "john@example.com",
    total: 1299,
    status: "completed",
    date: "2024-01-15",
    items: 3
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    total: 2499,
    status: "processing",
    date: "2024-01-15",
    items: 2
  },
  {
    id: "ORD-003",
    customer: "Mike Davis",
    email: "mike@example.com",
    total: 899,
    status: "shipped",
    date: "2024-01-14",
    items: 1
  },
  {
    id: "ORD-004",
    customer: "Lisa Wilson",
    email: "lisa@example.com",
    total: 3299,
    status: "pending",
    date: "2024-01-14",
    items: 4
  },
  {
    id: "ORD-005",
    customer: "Tom Brown",
    email: "tom@example.com",
    total: 1599,
    status: "completed",
    date: "2024-01-13",
    items: 2
  }
]

const orderColumns = [
  {
    key: "id",
    title: "Order ID",
    sortable: true,
    render: (value: string) => (
      <span className="font-mono text-sm font-medium">{value}</span>
    )
  },
  {
    key: "customer",
    title: "Customer",
    sortable: true,
    render: (value: string, row: any) => (
      <div>
        <p className="font-medium">{value}</p>
        <p className="text-xs text-neutral-500">{row.email}</p>
      </div>
    )
  },
  {
    key: "total",
    title: "Total",
    sortable: true,
    render: (value: number) => (
      <span className="font-semibold">${value.toLocaleString()}</span>
    )
  },
  {
    key: "status",
    title: "Status",
    render: (value: string) => {
      const statusColors = {
        completed: "bg-green-100 text-green-800",
        processing: "bg-blue-100 text-blue-800",
        shipped: "bg-purple-100 text-purple-800",
        pending: "bg-yellow-100 text-yellow-800"
      }
      return (
        <Badge className={`${statusColors[value as keyof typeof statusColors]} font-medium`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      )
    }
  },
  {
    key: "items",
    title: "Items",
    sortable: true,
    render: (value: number) => (
      <span className="text-neutral-600">{value} item{value !== 1 ? 's' : ''}</span>
    )
  },
  {
    key: "date",
    title: "Date",
    sortable: true,
    render: (value: string) => (
      <span className="text-sm text-neutral-600">
        {new Date(value).toLocaleDateString()}
      </span>
    )
  }
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-indigo-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <FloatingShape 
        size={200} 
        color="bg-indigo-500/5" 
        delay={0} 
        className="absolute -top-20 -left-20"
      />
      <FloatingShape 
        size={150} 
        color="bg-purple-500/5" 
        delay={3} 
        className="absolute top-1/2 -right-20"
      />
      
      <div className="relative z-10 p-6 lg:p-8 space-y-8">
        {/* Header */}
        <RevealAnimation>
          <div className="space-y-2">
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Admin Dashboard
            </motion.h1>
            <motion.p 
              className="text-neutral-600 text-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Monitor your business performance and manage operations
            </motion.p>
          </div>
        </RevealAnimation>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={stat.title} {...stat} index={index} />
          ))}
        </StaggerContainer>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <RevealAnimation delay={0.3}>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Revenue Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-neutral-500">
                  <div className="text-center">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-neutral-300" />
                    <p>Revenue chart will be displayed here</p>
                    <p className="text-sm">Integration with charts library coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RevealAnimation>

          {/* Quick Actions */}
          <RevealAnimation delay={0.4}>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-blue-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div 
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-blue-900">Pending Orders</h4>
                      <p className="text-sm text-blue-700">5 orders need attention</p>
                    </div>
                    <Badge className="bg-blue-600 text-white">5</Badge>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-orange-900">Low Stock</h4>
                      <p className="text-sm text-orange-700">3 products need restocking</p>
                    </div>
                    <Badge className="bg-orange-600 text-white">3</Badge>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-green-900">New Reviews</h4>
                      <p className="text-sm text-green-700">12 reviews to moderate</p>
                    </div>
                    <Badge className="bg-green-600 text-white">12</Badge>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </RevealAnimation>
        </div>

        {/* Recent Orders Table */}
        <RevealAnimation delay={0.5}>
          <EnhancedDataTable
            data={recentOrders}
            columns={orderColumns}
            title="Recent Orders"
            searchPlaceholder="Search orders..."
            actions={{
              view: (row) => console.log("View order:", row),
              edit: (row) => console.log("Edit order:", row),
              delete: (row) => console.log("Delete order:", row)
            }}
          />
        </RevealAnimation>
      </div>
    </div>
  )
}
