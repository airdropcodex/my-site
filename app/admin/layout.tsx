"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"
import AdminSidebar from "./components/AdminSidebar"
import AdminHeader from "./components/AdminHeader"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, profile, loading } = useAuth()

  // Ensure component is mounted before checking auth
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || loading) return

    // Skip auth check for login and unauthorized pages
    if (pathname === "/admin/login" || pathname === "/admin/unauthorized") {
      return
    }

    // Check if user is authenticated
    if (!user) {
      router.push("/admin/login")
      return
    }

    // Check if user has admin role
    const isAdmin = profile?.role === "admin" || profile?.role === "super_admin"
    
    if (!isAdmin) {
      router.push("/admin/unauthorized")
      return
    }
  }, [user, profile, loading, mounted, pathname, router])

  // Don't render anything until mounted
  if (!mounted) {
    return null
  }

  // Show loading state while auth is being checked
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

  // For login and unauthorized pages, render without sidebar/header
  if (pathname === "/admin/login" || pathname === "/admin/unauthorized") {
    return <>{children}</>
  }

  // If not authenticated or not admin, don't render admin layout
  if (!user || (profile && !["admin", "super_admin"].includes(profile.role))) {
    return null
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