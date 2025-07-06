import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    try {
      await supabase.auth.exchangeCodeForSession(code)
    } catch (error) {
      console.error("Error exchanging code for session:", error)
      // Redirect to error page or login with error message
      return NextResponse.redirect(`${requestUrl.origin}/auth/sign-in?error=auth_callback_error`)
    }
  }

  // URL to redirect to after sign in process completes
  // Use production URL if available, otherwise fall back to request origin
  const redirectUrl =
    process.env.NODE_ENV === "production" ? "https://v0-e-commerce-electronics-website.vercel.app/" : requestUrl.origin

  return NextResponse.redirect(redirectUrl)
}
