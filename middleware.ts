import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  console.log("Middleware: Processing request for:", req.nextUrl.pathname)

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  console.log("Middleware: Session exists:", !!session)
  console.log("Middleware: User ID:", session?.user?.id)

  // Handle admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login and unauthorized pages
    if (req.nextUrl.pathname === "/admin/login" || req.nextUrl.pathname === "/admin/unauthorized") {
      console.log("Middleware: Allowing access to login/unauthorized page")
      return res
    }

    // Check if user is authenticated
    if (!session) {
      console.log("Middleware: No session, redirecting to login")
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    // Check if user has admin role
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single()

      console.log("Middleware: Profile data:", profile)
      console.log("Middleware: Profile error:", error)

      if (error || !profile) {
        console.log("Middleware: No profile found, redirecting to unauthorized")
        return NextResponse.redirect(new URL("/admin/unauthorized", req.url))
      }

      if (!["admin", "super_admin"].includes(profile.role)) {
        console.log("Middleware: User role not admin, redirecting to unauthorized")
        return NextResponse.redirect(new URL("/admin/unauthorized", req.url))
      }

      console.log("Middleware: Admin access granted")
    } catch (error) {
      console.error("Middleware: Error checking admin role:", error)
      return NextResponse.redirect(new URL("/admin/unauthorized", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}