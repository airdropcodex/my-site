import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Handle admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Allow access to login and unauthorized pages
    if (req.nextUrl.pathname === "/admin/login" || req.nextUrl.pathname === "/admin/unauthorized") {
      return res
    }

    // Check if user is authenticated
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }

    // Check if user has admin role
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

    if (!profile || !["admin", "super_admin"].includes(profile.role)) {
      return NextResponse.redirect(new URL("/admin/unauthorized", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/admin/:path*"],
}