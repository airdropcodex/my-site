export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          role: "user" | "admin" | "super_admin"
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          role?: "user" | "admin" | "super_admin"
          avatar_url?: string | null
        }
        Update: {
          email?: string | null
          full_name?: string | null
          role?: "user" | "admin" | "super_admin"
          avatar_url?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          color: string | null
          product_count: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          color?: string | null
          product_count?: number
          is_active?: boolean
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          product_count?: number
          is_active?: boolean
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          original_price: number | null
          category_id: string | null
          image_url: string | null
          images: string[] | null
          features: string[] | null
          specifications: any | null
          rating: number
          review_count: number
          stock_quantity: number
          is_featured: boolean
          is_active: boolean
          badge: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          name: string
          slug: string
          description?: string | null
          price: number
          original_price?: number | null
          category_id?: string | null
          image_url?: string | null
          images?: string[] | null
          features?: string[] | null
          specifications?: any | null
          rating?: number
          review_count?: number
          stock_quantity?: number
          is_featured?: boolean
          is_active?: boolean
          badge?: string | null
        }
        Update: {
          name?: string
          slug?: string
          description?: string | null
          price?: number
          original_price?: number | null
          category_id?: string | null
          image_url?: string | null
          images?: string[] | null
          features?: string[] | null
          specifications?: any | null
          rating?: number
          review_count?: number
          stock_quantity?: number
          is_featured?: boolean
          is_active?: boolean
          badge?: string | null
        }
      }
    }
  }
}
