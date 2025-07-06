-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  product_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url TEXT,
  images TEXT[], -- Array of image URLs
  features TEXT[],
  specifications JSONB,
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  badge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create content_pages table for dynamic content
CREATE TABLE IF NOT EXISTS public.content_pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content JSONB, -- Rich content with blocks
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create media table for file management
CREATE TABLE IF NOT EXISTS public.media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  url TEXT NOT NULL,
  alt_text TEXT,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table for site configuration
CREATE TABLE IF NOT EXISTS public.settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES public.profiles(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table for product reviews
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table for order management
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB,
  billing_address JSONB,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon, color) VALUES
('Air Conditioners', 'air-conditioners', 'Cool & efficient climate control', 'Snowflake', 'from-cyan-500 to-blue-500'),
('Refrigerators', 'refrigerators', 'Fresh storage solutions', 'Package', 'from-emerald-500 to-teal-500'),
('Televisions', 'televisions', 'Entertainment at its finest', 'Tv', 'from-violet-500 to-purple-500'),
('Kitchen Appliances', 'kitchen', 'Ovens, microwaves & more', 'ChefHat', 'from-orange-500 to-red-500'),
('Deep Freezers', 'freezers', 'Extra storage capacity', 'Zap', 'from-indigo-500 to-blue-500'),
('Washing Machines', 'laundry', 'Efficient laundry solutions', 'Shirt', 'from-pink-500 to-rose-500')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
WITH category_ids AS (
  SELECT id, slug FROM public.categories
)
INSERT INTO public.products (name, slug, description, price, original_price, category_id, image_url, features, rating, review_count, is_featured, stock_quantity, badge) 
VALUES
-- Air Conditioners
(
  'Premium Smart Air Conditioner 1.5 Ton',
  'premium-smart-ac-1-5-ton',
  'Energy-efficient smart AC with WiFi control, voice commands, and advanced air purification technology',
  899.00,
  1099.00,
  (SELECT id FROM category_ids WHERE slug = 'air-conditioners'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['Energy Star Certified', 'Smart WiFi Control', 'Quiet Operation', 'Air Purification'],
  4.8,
  124,
  true,
  15,
  'Hot'
),
(
  'Window AC Unit 1 Ton',
  'window-ac-1-ton',
  'Compact and efficient window air conditioner perfect for small to medium rooms',
  449.00,
  NULL,
  (SELECT id FROM category_ids WHERE slug = 'air-conditioners'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['Compact Design', 'Energy Efficient', 'Easy Installation'],
  4.5,
  89,
  false,
  25,
  NULL
),

-- Refrigerators
(
  'French Door Smart Refrigerator 500L',
  'french-door-smart-fridge-500l',
  'Spacious French door refrigerator with smart features and advanced cooling technology',
  1299.00,
  1599.00,
  (SELECT id FROM category_ids WHERE slug = 'refrigerators'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['Smart Display', 'Energy Efficient', 'Large Capacity', 'Water Dispenser'],
  4.9,
  156,
  true,
  8,
  'New'
),
(
  'Side by Side Refrigerator 600L',
  'side-by-side-fridge-600l',
  'Large capacity side-by-side refrigerator with water and ice dispenser',
  1599.00,
  NULL,
  (SELECT id FROM category_ids WHERE slug = 'refrigerators'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['Ice Maker', 'Water Dispenser', 'LED Lighting', 'Digital Controls'],
  4.7,
  134,
  false,
  5,
  NULL
),

-- Televisions
(
  '65" 4K OLED Smart TV',
  '65-inch-4k-oled-smart-tv',
  'Premium 65-inch OLED display with 4K HDR, smart features, and cinema-quality picture',
  1799.00,
  2299.00,
  (SELECT id FROM category_ids WHERE slug = 'televisions'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['4K OLED Display', 'HDR Support', 'Smart OS', 'Voice Control'],
  4.9,
  203,
  true,
  12,
  'Premium'
),
(
  '55" 4K LED Smart TV',
  '55-inch-4k-led-smart-tv',
  'High-quality 55-inch LED TV with 4K resolution and smart streaming capabilities',
  799.00,
  999.00,
  (SELECT id FROM category_ids WHERE slug = 'televisions'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['4K LED Display', 'Smart Streaming', 'Multiple HDMI Ports', 'Voice Remote'],
  4.6,
  178,
  true,
  20,
  'Sale'
),

-- Kitchen Appliances
(
  'Convection Microwave Oven 30L',
  'convection-microwave-oven-30l',
  'Multi-function convection microwave with grill and auto-cook programs',
  459.00,
  NULL,
  (SELECT id FROM category_ids WHERE slug = 'kitchen'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['Convection Cooking', 'Auto Programs', 'Digital Display', 'Child Lock'],
  4.6,
  92,
  false,
  18,
  NULL
),

-- Deep Freezers
(
  'Chest Deep Freezer 300L',
  'chest-deep-freezer-300l',
  'Large capacity chest freezer perfect for bulk storage with energy-efficient operation',
  599.00,
  NULL,
  (SELECT id FROM category_ids WHERE slug = 'freezers'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['Large Capacity', 'Energy Efficient', 'Temperature Control', 'Lock & Key'],
  4.8,
  67,
  false,
  10,
  NULL
),

-- Washing Machines
(
  'Front Load Washing Machine 8kg',
  'front-load-washing-machine-8kg',
  'High-efficiency front-loading washing machine with multiple wash programs and steam cleaning',
  799.00,
  NULL,
  (SELECT id FROM category_ids WHERE slug = 'laundry'),
  '/placeholder.svg?height=400&width=400',
  ARRAY['Front Loading', 'Steam Clean', 'Multiple Programs', 'Energy Star'],
  4.7,
  145,
  true,
  14,
  NULL
)
ON CONFLICT (slug) DO NOTHING;

-- Insert default settings
INSERT INTO public.settings (key, value, description) VALUES
('site_name', '"ElectroStore"', 'Website name'),
('site_description', '"Premium Electronics for Modern Living"', 'Website description'),
('contact_email', '"support@electrostore.com"', 'Contact email address'),
('contact_phone', '"+1 (555) 123-4567"', 'Contact phone number'),
('shipping_fee', '50.00', 'Default shipping fee'),
('free_shipping_threshold', '500.00', 'Minimum order for free shipping'),
('tax_rate', '0.08', 'Default tax rate'),
('currency', '"USD"', 'Default currency'),
('featured_products_limit', '6', 'Number of featured products to display'),
('new_arrivals_days', '30', 'Days to consider products as new arrivals')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Only admins can modify categories" ON public.categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
);

-- Products policies
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Only admins can modify products" ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
);

-- Content pages policies
CREATE POLICY "Published content is viewable by everyone" ON public.content_pages FOR SELECT USING (is_published = true);
CREATE POLICY "Only admins can modify content" ON public.content_pages FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
);

-- Media policies
CREATE POLICY "Media is viewable by everyone" ON public.media FOR SELECT USING (true);
CREATE POLICY "Only admins can modify media" ON public.media FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
);

-- Settings policies
CREATE POLICY "Settings are viewable by admins" ON public.settings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
);
CREATE POLICY "Only admins can modify settings" ON public.settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can insert their own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Only admins can approve reviews" ON public.reviews FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
);

-- Orders policies
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role IN ('admin', 'super_admin'))
);

-- Order items policies
CREATE POLICY "Users can view their own order items" ON public.order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);
CREATE POLICY "Users can insert their own order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_content_pages_updated_at BEFORE UPDATE ON public.content_pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON public.settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update product ratings
CREATE OR REPLACE FUNCTION update_product_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.products 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating::numeric), 0)
      FROM public.reviews 
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) 
      AND is_approved = true
    ),
    review_count = (
      SELECT COUNT(*)
      FROM public.reviews 
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id) 
      AND is_approved = true
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update product ratings when reviews change
CREATE TRIGGER update_product_rating_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION update_product_rating();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON public.order_items(product_id);
