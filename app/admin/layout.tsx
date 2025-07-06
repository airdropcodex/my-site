"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
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

    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsAuthorized(true)
      setLoading(false)
      return
    }

    // Check if admin is logged in via localStorage
    const adminSession = localStorage.getItem("admin_session")

    if (!adminSession || adminSession !== "true") {
      router.push("/admin/login")
      return
    }

    setIsAuthorized(true)
    setLoading(false)
  }, [router, pathname, mounted])

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
          <span className="text-lg font-medium text-neutral-600">Loading...</span>
        </div>
      </div>
    )
  }

  // If not authorized and not on login page, don't render admin layout
  if (!isAuthorized && pathname !== "/admin/login") {
    return null
  }

  // For login page, render without sidebar/header
  if (pathname === "/admin/login") {
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