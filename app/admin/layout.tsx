"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authService } from "@/lib/supabase/auth"
import AdminSidebar from "./components/AdminSidebar"
import AdminHeader from "./components/AdminHeader"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Ensure component is mounted before checking auth
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Skip auth check for login and unauthorized pages
    if (pathname === "/admin/login" || pathname === "/admin/unauthorized") {
      setIsAuthorized(true)
      setLoading(false)
      return
    }

    checkAdminAuth()
  }, [router, pathname, mounted])

  const checkAdminAuth = async () => {
    try {
      // Get current user from Supabase
      const user = await authService.getCurrentUser()
      
      if (!user) {
        // No user logged in, redirect to login
        router.push("/admin/login")
        return
      }

      // Check if user has admin role
      const isAdmin = await authService.isAdmin(user.id)
      
      if (!isAdmin) {
        // User doesn't have admin role, redirect to unauthorized
        router.push("/admin/unauthorized")
        return
      }

      // User is authorized admin
      setIsAuthorized(true)
    } catch (error) {
      console.error("Auth check error:", error)
      router.push("/admin/login")
    } finally {
      setLoading(false)
    }
  }

  // Don't render anything until mounted
  if (!mounted) {
    return null
  }

  // Show loading state to prevent flickering
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl animate-pulse"></div>
          <span className="text-lg font-medium text-neutral-600">Checking permissions...</span>
        </div>
      </div>
    )
  }

  // If not authorized and not on login/unauthorized page, don't render admin layout
  if (!isAuthorized && pathname !== "/admin/login" && pathname !== "/admin/unauthorized") {
    return null
  }

  // For login and unauthorized pages, render without sidebar/header
  if (pathname === "/admin/login" || pathname === "/admin/unauthorized") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <AdminSidebar />
      <div className="lg:pl-72">
        <AdminHeader />
        <main className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}