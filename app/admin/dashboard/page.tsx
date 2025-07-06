"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp,
  Package,
  Star,
  AlertCircle,
  Activity,
  Eye,
  Edit,
  Trash2,
  Plus,
  FileText,
  Settings,
  BarChart3,
  Shield
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { authService } from "@/lib/supabase/auth"
import StatCard from "../components/StatCard"
import EnhancedDataTable from "../components/EnhancedDataTable"
import { RevealAnimation, StaggerContainer } from "@/components/ui/reveal-animation"
import { FloatingShape } from "@/components/ui/floating-elements"
import { toast } from "sonner"

interface DashboardStats {
  totalUsers: number
  totalProducts: number
  totalRevenue: number
  totalOrders: number
  activeUsers: number
  pendingOrders: number
}

interface RecentActivity {
  id: string
  type: 'user_registration' | 'product_created' | 'order_placed' | 'admin_action'
  description: string
  timestamp: string
  user?: string
  status?: string
}

interface SystemAlert {
  id: string
  type: 'warning' | 'error' | 'info'
  title: string
  message: string
  timestamp: string
  resolved: boolean
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    activeUsers: 0,
    pendingOrders: 0
  })
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [systemAlerts, setSystemAlerts] = useState<SystemAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const supabase = createClient()

  useEffect(() => {
    loadDashboardData()
    getCurrentUser()
  }, [])

  const getCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser()
      if (user) {
        const profile = await authService.getUserProfile(user.id)
        setCurrentUser({ ...user, ...profile })
      }
    } catch (error) {
      console.error("Error getting current user:", error)
    }
  }

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load statistics
      const [usersResult, productsResult] = await Promise.all([
        supabase.from("profiles").select("id", { count: 'exact' }),
        supabase.from("products").select("id", { count: 'exact' })
      ])

      setStats({
        totalUsers: usersResult.count || 0,
        totalProducts: productsResult.count || 0,
        totalRevenue: 125430, // Mock data - replace with real revenue calculation
        totalOrders: 1247, // Mock data - replace with real orders count
        activeUsers: 89, // Mock data - replace with real active users
        pendingOrders: 23 // Mock data - replace with real pending orders
      })

      // Load recent activity (mock data - replace with real activity log)
      setRecentActivity([
        {
          id: "1",
          type: "user_registration",
          description: "New user registered: john.doe@example.com",
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          user: "john.doe@example.com",
          status: "completed"
        },
        {
          id: "2",
          type: "product_created",
          description: "New product added: Samsung 65\" OLED TV",
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          user: currentUser?.email || "admin",
          status: "completed"
        },
        {
          id: "3",
          type: "order_placed",
          description: "Order #ORD-2024-001 placed for $1,299",
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          user: "customer@example.com",
          status: "processing"
        },
        {
          id: "4",
          type: "admin_action",
          description: "Product inventory updated",
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          user: currentUser?.email || "admin",
          status: "completed"
        }
      ])

      // Load system alerts (mock data - replace with real system monitoring)
      setSystemAlerts([
        {
          id: "1",
          type: "warning",
          title: "Low Stock Alert",
          message: "3 products are running low on inventory",
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          resolved: false
        },
        {
          id: "2",
          type: "info",
          title: "System Update",
          message: "Scheduled maintenance completed successfully",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          resolved: true
        }
      ])

    } catch (error) {
      console.error("Error loading dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const statsData = [
    {
      title: "Total Revenue",
      value: stats.totalRevenue,
      change: 12.5,
      changeType: "increase" as const,
      prefix: "$",
      icon: <DollarSign className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      change: 8.2,
      changeType: "increase" as const,
      icon: <Users className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      title: "Total Products",
      value: stats.totalProducts,
      change: 3.1,
      changeType: "increase" as const,
      icon: <Package className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-purple-500 to-violet-600"
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      change: 15.8,
      changeType: "increase" as const,
      icon: <ShoppingBag className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-orange-500 to-red-600"
    }
  ]

  const activityColumns = [
    {
      key: "type",
      title: "Type",
      render: (value: string) => {
        const typeColors = {
          user_registration: "bg-blue-100 text-blue-800",
          product_created: "bg-green-100 text-green-800",
          order_placed: "bg-purple-100 text-purple-800",
          admin_action: "bg-orange-100 text-orange-800"
        }
        const typeLabels = {
          user_registration: "User Registration",
          product_created: "Product Created",
          order_placed: "Order Placed",
          admin_action: "Admin Action"
        }
        return (
          <Badge className={`${typeColors[value as keyof typeof typeColors]} font-medium`}>
            {typeLabels[value as keyof typeof typeLabels]}
          </Badge>
        )
      }
    },
    {
      key: "description",
      title: "Description",
      sortable: true
    },
    {
      key: "user",
      title: "User",
      render: (value: string) => (
        <span className="text-sm text-neutral-600">{value || "System"}</span>
      )
    },
    {
      key: "timestamp",
      title: "Time",
      sortable: true,
      render: (value: string) => (
        <span className="text-sm text-neutral-600">
          {new Date(value).toLocaleString()}
        </span>
      )
    },
    {
      key: "status",
      title: "Status",
      render: (value: string) => {
        const statusColors = {
          completed: "bg-green-100 text-green-800",
          processing: "bg-blue-100 text-blue-800",
          pending: "bg-yellow-100 text-yellow-800",
          failed: "bg-red-100 text-red-800"
        }
        return (
          <Badge className={`${statusColors[value as keyof typeof statusColors]} font-medium`}>
            {value?.charAt(0).toUpperCase() + value?.slice(1)}
          </Badge>
        )
      }
    }
  ]

  const quickActions = [
    {
      title: "Add New Product",
      description: "Create a new product listing",
      icon: <Plus className="h-5 w-5" />,
      href: "/admin/products/new",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/users",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Content Management",
      description: "Manage pages and content",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/content",
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "System Settings",
      description: "Configure system settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Analytics",
      description: "View detailed analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/admin/analytics",
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "Security Logs",
      description: "Monitor security events",
      icon: <Shield className="h-5 w-5" />,
      href: "/admin/security",
      color: "from-pink-500 to-rose-500"
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <p className="text-lg font-medium text-neutral-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

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
              Welcome back, {currentUser?.full_name || currentUser?.email || 'Admin'}! Monitor your business performance and manage operations.
            </motion.p>
          </div>
        </RevealAnimation>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={stat.title} {...stat} index={index} />
          ))}
        </StaggerContainer>

        {/* System Alerts */}
        {systemAlerts.filter(alert => !alert.resolved).length > 0 && (
          <RevealAnimation delay={0.2}>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-amber-800">
                  <AlertCircle className="h-5 w-5" />
                  <span>System Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemAlerts.filter(alert => !alert.resolved).map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-amber-900">{alert.title}</h4>
                      <p className="text-sm text-amber-800">{alert.message}</p>
                      <p className="text-xs text-amber-700 mt-1">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="text-amber-800 border-amber-300">
                      Resolve
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </RevealAnimation>
        )}

        {/* Quick Actions */}
        <RevealAnimation delay={0.3}>
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-indigo-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer"
                  >
                    <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-neutral-50">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-white`}>
                            {action.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900">{action.title}</h3>
                            <p className="text-sm text-neutral-600">{action.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </RevealAnimation>

        {/* Recent Activity */}
        <RevealAnimation delay={0.4}>
          <EnhancedDataTable
            data={recentActivity}
            columns={activityColumns}
            title="Recent Activity"
            searchPlaceholder="Search activity..."
          />
        </RevealAnimation>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevealAnimation delay={0.5}>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span>Performance Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-600">Server Uptime</span>
                    <span className="text-sm font-bold text-green-600">99.9%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-600">Database Performance</span>
                    <span className="text-sm font-bold text-blue-600">95.2%</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95.2%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-neutral-600">API Response Time</span>
                    <span className="text-sm font-bold text-purple-600">142ms</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RevealAnimation>

          <RevealAnimation delay={0.6}>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>Security Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-green-900">SSL Certificate</h4>
                      <p className="text-sm text-green-700">Valid until Dec 2024</p>
                    </div>
                    <Badge className="bg-green-600 text-white">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-blue-900">Firewall Status</h4>
                      <p className="text-sm text-blue-700">All systems protected</p>
                    </div>
                    <Badge className="bg-blue-600 text-white">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-purple-900">Backup Status</h4>
                      <p className="text-sm text-purple-700">Last backup: 2 hours ago</p>
                    </div>
                    <Badge className="bg-purple-600 text-white">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RevealAnimation>
        </div>
      </div>
    </div>
  )
}