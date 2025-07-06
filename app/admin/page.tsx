"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard
    router.replace("/admin/dashboard")
  }, [router])

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-4 animate-pulse">
          <span className="text-white font-bold text-xl">E</span>
        </div>
        <p className="text-lg font-medium text-neutral-600">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}