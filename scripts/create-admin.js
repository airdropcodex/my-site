// Script to create an admin user for testing
// Run this with: node scripts/create-admin.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byvzbhwfwpapkxobyizy.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5dnpiaHdmd3BhcGt4b2J5aXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3NzQxMzksImV4cCI6MjA2NzM1MDEzOX0.0km5rwznsGS5ad7BF5bqvTZXfqJldmZ7POzmWTOGQro'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createAdminUser() {
  const email = 'admin@electrostore.com'
  const password = 'admin123456'

  try {
    console.log('Creating admin user...')
    
    // First, sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (authError && authError.message !== 'User already registered') {
      throw authError
    }

    console.log('User created or already exists')

    // Update the user's role to admin
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert({
        email: email,
        role: 'admin',
        full_name: 'Admin User'
      }, {
        onConflict: 'email'
      })

    if (profileError) {
      throw profileError
    }

    console.log('✅ Admin user created successfully!')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Role: admin')
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message)
  }
}

createAdminUser()