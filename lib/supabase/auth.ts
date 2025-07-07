import { createClient } from "./client"

export interface SignUpData {
  email?: string
  password?: string
  phone?: string
  fullName?: string
  dateOfBirth?: string
  address?: string
}

export interface SignInData {
  email?: string
  password?: string
  phone?: string
}

export class AuthService {
  private supabase = createClient()

  // Get the correct redirect URL based on environment
  private getRedirectUrl() {
    // Use current origin for redirect URL
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/auth/callback`
    }
    // Fallback for server-side
    return "http://localhost:3000/auth/callback"
  }

  // Email/Password Sign Up
  async signUpWithEmail(data: SignUpData) {
    const { data: authData, error } = await this.supabase.auth.signUp({
      email: data.email!,
      password: data.password!,
      options: {
        emailRedirectTo: this.getRedirectUrl(),
        data: {
          full_name: data.fullName,
          date_of_birth: data.dateOfBirth,
          address: data.address,
        },
      },
    })

    if (error) throw error
    return authData
  }

  // Email/Password Sign In
  async signInWithEmail(data: SignInData) {
    const { data: authData, error } = await this.supabase.auth.signInWithPassword({
      email: data.email!,
      password: data.password!,
    })

    if (error) throw error
    return authData
  }

  // Phone OTP Sign Up
  async signUpWithPhone(phone: string) {
    const { data, error } = await this.supabase.auth.signInWithOtp({
      phone: phone,
      options: {
        shouldCreateUser: true,
      },
    })

    if (error) throw error
    return data
  }

  // Phone OTP Sign In
  async signInWithPhone(phone: string) {
    const { data, error } = await this.supabase.auth.signInWithOtp({
      phone: phone,
    })

    if (error) throw error
    return data
  }

  // Verify OTP
  async verifyOTP(phone: string, token: string) {
    const { data, error } = await this.supabase.auth.verifyOtp({
      phone: phone,
      token: token,
      type: "sms",
    })

    if (error) throw error
    return data
  }

  // Google Sign In
  async signInWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: this.getRedirectUrl(),
      },
    })

    if (error) throw error
    return data
  }

  // Sign Out
  async signOut() {
    const { error } = await this.supabase.auth.signOut()
    if (error) throw error
  }

  // Get Current User
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser()
    if (error) throw error
    return user
  }

  // Get User Profile
  async getUserProfile(userId: string) {
    const { data, error } = await this.supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) throw error
    return data
  }

  // Update User Profile
  async updateUserProfile(userId: string, updates: Partial<SignUpData>) {
    const { data, error } = await this.supabase
      .from("profiles")
      .update({
        full_name: updates.fullName,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Check if user is admin - Enhanced with better error handling
  async isAdmin(userId: string): Promise<boolean> {
    try {
      console.log("Checking admin status for user:", userId)
      
      const { data, error } = await this.supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single()

      if (error) {
        console.error("Error checking admin status:", error)
        return false
      }

      console.log("User profile data:", data)
      const isAdmin = data?.role === "admin" || data?.role === "super_admin"
      console.log("Is admin result:", isAdmin)
      
      return isAdmin
    } catch (error) {
      console.error("Exception in isAdmin check:", error)
      return false
    }
  }

  // Create admin user (for testing)
  async createAdminUser(email: string) {
    try {
      const { data, error } = await this.supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("email", email)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error("Error creating admin user:", error)
      throw error
    }
  }
}

export const authService = new AuthService()