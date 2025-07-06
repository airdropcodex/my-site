"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Shield, 
  AlertTriangle, 
  Lock, 
  Eye, 
  Activity,
  Globe,
  User,
  Clock,
  MapPin,
  Smartphone,
  Monitor,
  RefreshCw
} from "lucide-react"
import { RevealAnimation } from "@/components/ui/reveal-animation"
import EnhancedDataTable from "../components/EnhancedDataTable"

interface SecurityEvent {
  id: string
  type: 'login_success' | 'login_failed' | 'password_change' | 'role_change' | 'suspicious_activity'
  user_email: string
  ip_address: string
  location: string
  device: string
  timestamp: string
  details: string
  risk_level: 'low' | 'medium' | 'high'
}

interface SecurityMetrics {
  totalLogins: number
  failedLogins: number
  suspiciousActivities: number
  blockedIPs: number
  activeUsers: number
  securityScore: number
}

export default function SecurityPage() {
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalLogins: 0,
    failedLogins: 0,
    suspiciousActivities: 0,
    blockedIPs: 0,
    activeUsers: 0,
    securityScore: 0
  })
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("24h")

  useEffect(() => {
    loadSecurityData()
  }, [timeRange])

  const loadSecurityData = async () => {
    try {
      setLoading(true)
      
      // Mock security data - replace with real security monitoring
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setMetrics({
        totalLogins: 1247,
        failedLogins: 23,
        suspiciousActivities: 5,
        blockedIPs: 12,
        activeUsers: 89,
        securityScore: 94
      })

      setSecurityEvents([
        {
          id: "1",
          type: "login_success",
          user_email: "admin@electrostore.com",
          ip_address: "192.168.1.100",
          location: "Dhaka, Bangladesh",
          device: "Chrome on Windows",
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          details: "Successful admin login",
          risk_level: "low"
        },
        {
          id: "2",
          type: "login_failed",
          user_email: "unknown@example.com",
          ip_address: "45.123.45.67",
          location: "Unknown Location",
          device: "Unknown Browser",
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          details: "Failed login attempt with invalid credentials",
          risk_level: "medium"
        },
        {
          id: "3",
          type: "suspicious_activity",
          user_email: "user@example.com",
          ip_address: "123.45.67.89",
          location: "Multiple Locations",
          device: "Multiple Devices",
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          details: "Multiple login attempts from different locations",
          risk_level: "high"
        },
        {
          id: "4",
          type: "role_change",
          user_email: "newadmin@electrostore.com",
          ip_address: "192.168.1.100",
          location: "Dhaka, Bangladesh",
          device: "Chrome on Windows",
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          details: "User role changed from 'user' to 'admin'",
          risk_level: "medium"
        },
        {
          id: "5",
          type: "password_change",
          user_email: "user@example.com",
          ip_address: "192.168.1.105",
          location: "Dhaka, Bangladesh",
          device: "Safari on iPhone",
          timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
          details: "Password changed successfully",
          risk_level: "low"
        }
      ])
    } catch (error) {
      console.error("Error loading security data:", error)
    } finally {
      setLoading(false)
    }
  }

  const securityColumns = [
    {
      key: "type",
      title: "Event Type",
      render: (value: string) => {
        const typeConfig = {
          login_success: { label: "Login Success", color: "bg-green-100 text-green-800", icon: <Lock className="h-3 w-3" /> },
          login_failed: { label: "Login Failed", color: "bg-red-100 text-red-800", icon: <AlertTriangle className="h-3 w-3" /> },
          password_change: { label: "Password Change", color: "bg-blue-100 text-blue-800", icon: <Shield className="h-3 w-3" /> },
          role_change: { label: "Role Change", color: "bg-purple-100 text-purple-800", icon: <User className="h-3 w-3" /> },
          suspicious_activity: { label: "Suspicious Activity", color: "bg-orange-100 text-orange-800", icon: <Eye className="h-3 w-3" /> }
        }
        const config = typeConfig[value as keyof typeof typeConfig]
        return (
          <Badge className={`${config.color} font-medium flex items-center space-x-1`}>
            {config.icon}
            <span>{config.label}</span>
          </Badge>
        )
      }
    },
    {
      key: "user_email",
      title: "User",
      sortable: true
    },
    {
      key: "ip_address",
      title: "IP Address",
      render: (value: string) => (
        <code className="text-xs bg-neutral-100 px-2 py-1 rounded">{value}</code>
      )
    },
    {
      key: "location",
      title: "Location",
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3 text-neutral-500" />
          <span className="text-sm">{value}</span>
        </div>
      )
    },
    {
      key: "device",
      title: "Device",
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          {value.includes('iPhone') || value.includes('Android') ? 
            <Smartphone className="h-3 w-3 text-neutral-500" /> : 
            <Monitor className="h-3 w-3 text-neutral-500" />
          }
          <span className="text-sm">{value}</span>
        </div>
      )
    },
    {
      key: "timestamp",
      title: "Time",
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3 text-neutral-500" />
          <span className="text-sm">{new Date(value).toLocaleString()}</span>
        </div>
      )
    },
    {
      key: "risk_level",
      title: "Risk Level",
      render: (value: string) => {
        const riskColors = {
          low: "bg-green-100 text-green-800",
          medium: "bg-yellow-100 text-yellow-800",
          high: "bg-red-100 text-red-800"
        }
        return (
          <Badge className={`${riskColors[value as keyof typeof riskColors]} font-medium`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Badge>
        )
      }
    }
  ]

  const securityMetrics = [
    {
      title: "Security Score",
      value: metrics.securityScore,
      suffix: "%",
      icon: <Shield className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
      description: "Overall security health"
    },
    {
      title: "Total Logins",
      value: metrics.totalLogins,
      icon: <Activity className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-600",
      description: "Successful authentications"
    },
    {
      title: "Failed Logins",
      value: metrics.failedLogins,
      icon: <AlertTriangle className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-orange-500 to-red-600",
      description: "Authentication failures"
    },
    {
      title: "Blocked IPs",
      value: metrics.blockedIPs,
      icon: <Globe className="h-6 w-6" />,
      gradient: "bg-gradient-to-br from-purple-500 to-violet-600",
      description: "Suspicious IP addresses"
    }
  ]

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Security Monitoring</h1>
            <p className="text-neutral-600 mt-2">Monitor security events and system access</p>
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
          <h1 className="text-3xl font-bold text-neutral-900">Security Monitoring</h1>
          <p className="text-neutral-600 mt-2">Monitor security events and system access</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={loadSecurityData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>
      </div>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <RevealAnimation key={metric.title} delay={index * 0.1}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-neutral-600">{metric.title}</p>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-neutral-900">
                        {metric.value}{metric.suffix || ''}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500">{metric.description}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-2xl ${metric.gradient} flex items-center justify-center text-white shadow-lg`}>
                    {metric.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          </RevealAnimation>
        ))}
      </div>

      {/* Security Alerts */}
      {securityEvents.filter(event => event.risk_level === 'high').length > 0 && (
        <RevealAnimation delay={0.4}>
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="h-5 w-5" />
                <span>High Risk Security Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {securityEvents.filter(event => event.risk_level === 'high').map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-red-900">{event.details}</h4>
                    <p className="text-sm text-red-800">
                      User: {event.user_email} | IP: {event.ip_address} | Location: {event.location}
                    </p>
                    <p className="text-xs text-red-700 mt-1">
                      {new Date(event.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="text-red-800 border-red-300">
                    Investigate
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </RevealAnimation>
      )}

      {/* Security Events Table */}
      <RevealAnimation delay={0.5}>
        <EnhancedDataTable
          data={securityEvents}
          columns={securityColumns}
          title="Security Events Log"
          searchPlaceholder="Search security events..."
        />
      </RevealAnimation>

      {/* Security Recommendations */}
      <RevealAnimation delay={0.6}>
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>Security Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Enable Two-Factor Authentication</h4>
                <p className="text-sm text-blue-800 mb-3">
                  Add an extra layer of security for admin accounts
                </p>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Configure 2FA
                </Button>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Update Security Policies</h4>
                <p className="text-sm text-green-800 mb-3">
                  Review and update password and access policies
                </p>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Review Policies
                </Button>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">IP Whitelist Management</h4>
                <p className="text-sm text-purple-800 mb-3">
                  Configure trusted IP addresses for admin access
                </p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Manage IPs
                </Button>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">Security Audit</h4>
                <p className="text-sm text-orange-800 mb-3">
                  Schedule regular security audits and penetration testing
                </p>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Schedule Audit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </RevealAnimation>
    </div>
  )
}