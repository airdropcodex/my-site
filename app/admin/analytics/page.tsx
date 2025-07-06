"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react"
import { RevealAnimation } from "@/components/ui/reveal-animation"
import StatCard from "../components/StatCard"

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: string
  topPages: Array<{ page: string; views: number; change: number }>
  deviceStats: Array<{ device: string; percentage: number; users: number }>
  trafficSources: Array<{ source: string; percentage: number; visitors: number }>
  revenueData: Array<{ month: string; revenue: number; orders: number }>
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 0,
    uniqueVisitors: 0,
    bounceRate: 0,
    avgSessionDuration: "0:00",
    topPages: [],
    deviceStats: [],
    trafficSources: [],
    revenueData: []
  })
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      
      // Mock analytics data - replace with real analytics API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setAnalyticsData({
        pageViews: 45678,
        uniqueVisitors: 12345,
        bounceRate: 32.5,
        avgSessionDuration: "3:42",
        topPages: [
          { page: "/", views: 15234, change: 12.5 },
          { page: "/products", views: 8967, change: 8.2 },
          { page: "/category/televisions", views: 5432, change: -2.1 },
          { page: "/products/samsung-55-4k-tv", views: 3456, change: 15.8 },
          { page: "/about", views: 2345, change: 5.3 }
        ],
        deviceStats: [
          { device: "Desktop", percentage: 45.2, users: 5580 },
          { device: "Mobile", percentage: 38.7, users: 4776 },
          { device: "Tablet", percentage: 16.1, users: 1989 }
        ],
        trafficSources: [
          { source: "Organic Search", percentage: 42.3, visitors: 5223 },
          { source: "Direct", percentage: 28.7, visitors: 3543 },
          { source: "Social Media", percentage: 15.2, visitors: 1876 },
          { source: "Referral", percentage: 8.9, visitors: 1099 },
          { source: "Email", percentage: 4.9, visitors: 604 }
        ],
        revenueData: [
          { month: "Jan", revenue: 45000, orders: 234 },
          { month: "Feb", revenue: 52000, orders: 267 },
          { month: "Mar", revenue: 48000, orders: 245 },
          { month: "Apr", revenue: 61000, orders: 312 },
          { month: "May", revenue: 58000, orders: 298 },
          { month: "Jun", revenue: 67000, orders: 345 }
        ]
      })
    } catch (error) {
      console.error("Error loading analytics data:", error)
    } finally {
      setLoading(false)
    }
  }

  const statsData = [
    {
      title: "Page Views",
      value: analyticsData.pageViews,
      change: 12.5,
      changeType: "increase" as const,
      icon: <Eye className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      title: "Unique Visitors",
      value: analyticsData.uniqueVisitors,
      change: 8.2,
      changeType: "increase" as const,
      icon: <Users className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      title: "Bounce Rate",
      value: analyticsData.bounceRate,
      change: 2.1,
      changeType: "decrease" as const,
      suffix: "%",
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      title: "Avg. Session",
      value: 0,
      change: 5.3,
      changeType: "increase" as const,
      icon: <Clock className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-purple-500 to-violet-600"
    }
  ]

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'desktop':
        return <Monitor className="h-5 w-5" />
      case 'mobile':
        return <Smartphone className="h-5 w-5" />
      case 'tablet':
        return <Tablet className="h-5 w-5" />
      default:
        return <Globe className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Analytics & Reporting</h1>
            <p className="text-neutral-600 mt-2">Monitor your website performance and user behavior</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 animate-pulse h-32">
              <div className="h-4 bg-neutral-200 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-neutral-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Analytics & Reporting</h1>
          <p className="text-neutral-600 mt-2">Monitor your website performance and user behavior</p>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <RevealAnimation delay={0.2}>
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
                <span>Top Pages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">{page.page}</p>
                      <p className="text-sm text-neutral-600">{page.views.toLocaleString()} views</p>
                    </div>
                    <Badge 
                      className={`${
                        page.change > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {page.change > 0 ? '+' : ''}{page.change}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </RevealAnimation>

        {/* Device Stats */}
        <RevealAnimation delay={0.3}>
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Monitor className="h-5 w-5 text-purple-600" />
                <span>Device Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.deviceStats.map((device, index) => (
                  <div key={device.device} className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center text-white">
                      {getDeviceIcon(device.device)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-neutral-900">{device.device}</span>
                        <span className="text-sm font-bold text-neutral-700">{device.percentage}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${device.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1">{device.users.toLocaleString()} users</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </RevealAnimation>
      </div>

      {/* Traffic Sources */}
      <RevealAnimation delay={0.4}>
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span>Traffic Sources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {analyticsData.trafficSources.map((source, index) => (
                <div key={source.source} className="text-center p-4 bg-neutral-50 rounded-xl">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-lg">{source.percentage.toFixed(0)}%</span>
                  </div>
                  <h3 className="font-semibold text-neutral-900 mb-1">{source.source}</h3>
                  <p className="text-sm text-neutral-600">{source.visitors.toLocaleString()} visitors</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </RevealAnimation>

      {/* Revenue Chart Placeholder */}
      <RevealAnimation delay={0.5}>
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span>Revenue Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-neutral-500">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-neutral-300" />
                <p className="text-lg font-medium">Revenue Chart</p>
                <p className="text-sm">Chart integration coming soon</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-bold text-2xl text-green-600">$67K</p>
                    <p className="text-neutral-600">This Month</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-2xl text-blue-600">345</p>
                    <p className="text-neutral-600">Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-2xl text-purple-600">+15%</p>
                    <p className="text-neutral-600">Growth</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </RevealAnimation>
    </div>
  )
}