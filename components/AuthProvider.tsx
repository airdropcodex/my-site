"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  profile: any | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  signOut: async () => {},
})

// ────────────────────────────────────────────────────────────
// A very small, in-memory cache so we don’t re-fetch the same
// profile over and over, avoiding Supabase 429 “Too Many Requests”.
// It lives for the lifetime of the tab – fine for client-side use.
const profileCache: Record<string, any> = {}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const alreadyFetchedRef = useRef<string | null>(null)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Only refetch when SIGNED_IN or TOKEN_REFRESHED
      if (["SIGNED_IN", "TOKEN_REFRESHED"].includes(event) && session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id)
      }

      if (event === "SIGNED_OUT" || !session) {
        setUser(null)
        setProfile(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchProfile = async (userId: string) => {
    // Already cached for this tab?
    if (profileCache[userId]) {
      setProfile(profileCache[userId])
      return
    }

    // Prevent duplicate fetches for same UID while one is in flight
    if (alreadyFetchedRef.current === userId) return
    alreadyFetchedRef.current = userId

    try {
      const { data, error, status } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle()

      // Handle 429 or other errors gracefully
      if (error) {
        if (status === 429 || error.message?.includes("Too Many")) {
          console.warn("Rate-limited fetching profile – will retry later")
        } else if (error.code !== "PGRST116") {
          console.error("Error fetching profile:", error)
        }
        return
      }

      profileCache[userId] = data
      setProfile(data)
    } catch (err) {
      console.error("Unexpected error fetching profile:", err)
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
