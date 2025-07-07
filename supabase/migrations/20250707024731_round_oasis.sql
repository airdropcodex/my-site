-- Create admin user for testing
-- Run this in your Supabase SQL Editor

-- First, insert the user into auth.users (if not exists)
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'admin@electrostore.com',
  crypt('admin123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) ON CONFLICT (email) DO NOTHING;

-- Then create/update the profile with admin role
INSERT INTO profiles (id, email, full_name, role)
SELECT 
  u.id,
  u.email,
  'Admin User',
  'admin'
FROM auth.users u
WHERE u.email = 'admin@electrostore.com'
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'admin',
  full_name = 'Admin User',
  updated_at = NOW();

-- Verify the admin user was created
SELECT 
  p.email,
  p.full_name,
  p.role,
  p.created_at
FROM profiles p
WHERE p.email = 'admin@electrostore.com';