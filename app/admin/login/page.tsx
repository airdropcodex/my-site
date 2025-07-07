"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, Eye, EyeOff, Shield } from "lucide-react"
import { authService } from "@/lib/supabase/auth"
import { toast } from "sonner"

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    
    // Check if already logged in as admin
    checkExistingAuth()
  }, [router])

  const checkExistingAuth = async () => {
    try {
      const user = await authService.getCurrentUser()
      if (user) {
        const isAdmin = await authService.isAdmin(user.id)
        if (isAdmin) {
          router.replace("/admin")
          router.refresh()
        }
      }
    } catch (error) {
      // User not logged in, stay on login page
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Sign in with Supabase
      const { user } = await authService.signInWithEmail(formData)

      if (user) {
        // Check if user has admin role
        const isAdmin = await authService.isAdmin(user.id)

        if (isAdmin) {
          toast.success("Successfully signed in as admin!")
          
          // Use replace instead of push to prevent back navigation to login
          // and refresh to ensure session is properly synchronized
          router.replace("/admin")
          router.refresh()
        } else {
          toast.error("Access denied. Admin privileges required.")
          await authService.signOut()
        }
      }
    } catch (error: any) {
      console.error("Admin login error:", error)
      toast.error(error.message || "Failed to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto">
            <Shield className="text-white h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-neutral-900">Admin Login</CardTitle>
          <p className="text-neutral-600">Sign in to access the admin panel</p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm">
            <p className="text-amber-800 font-medium">Admin Access Required</p>
            <p className="text-amber-700">Only users with admin role can access this panel.</p>
            <p className="text-amber-700 mt-1">
              Don't have admin access? 
              <Link href="/auth/sign-in" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                User Login
              </Link>
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your admin email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-3"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Not an admin?{" "}
              <Link href="/auth/sign-in" className="text-indigo-600 hover:text-indigo-700 font-medium">
                User Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}