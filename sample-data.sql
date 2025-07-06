-- Sample Data for ElectroStore
-- Run this after setting up the schema

-- Insert sample categories
INSERT INTO categories (id, name, slug, description, icon, color, product_count, is_active) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Air Conditioners', 'air-conditioners', 'Stay cool with our energy-efficient air conditioning systems', 'Snowflake', '#3B82F6', 0, TRUE),
('550e8400-e29b-41d4-a716-446655440002', 'Refrigerators', 'refrigerators', 'Keep your food fresh with premium refrigeration solutions', 'Refrigerator', '#10B981', 0, TRUE),
('550e8400-e29b-41d4-a716-446655440003', 'Televisions', 'televisions', 'Experience entertainment like never before with our smart TVs', 'Monitor', '#8B5CF6', 0, TRUE),
('550e8400-e29b-41d4-a716-446655440004', 'Washing Machines', 'washing-machines', 'Efficient laundry solutions for modern homes', 'Washing Machine', '#EF4444', 0, TRUE),
('550e8400-e29b-41d4-a716-446655440005', 'Microwave Ovens', 'microwave-ovens', 'Quick and convenient cooking solutions', 'Microwave', '#F59E0B', 0, TRUE),
('550e8400-e29b-41d4-a716-446655440006', 'Freezers', 'freezers', 'Extra storage for your frozen goods', 'Package', '#06B6D4', 0, TRUE);

-- Insert sample products
INSERT INTO products (id, name, slug, description, price, original_price, category_id, image_url, features, specifications, rating, review_count, stock_quantity, is_featured, is_active, badge) VALUES
-- Air Conditioners
('550e8400-e29b-41d4-a716-446655440101', 'LG Dual Cool Inverter 1.5 Ton', 'lg-dual-cool-inverter-1-5-ton', 'Energy efficient inverter AC with dual cool technology for faster cooling', 45000.00, 52000.00, '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500', ARRAY['Dual Cool Technology', 'Energy Efficient', '4-Star Rating', '10 Year Warranty'], '{"capacity": "1.5 Ton", "energy_rating": "4 Star", "warranty": "10 Years", "type": "Split AC"}', 4.5, 128, 25, TRUE, TRUE, 'BESTSELLER'),
('550e8400-e29b-41d4-a716-446655440102', 'Samsung WindFree 2 Ton', 'samsung-windfree-2-ton', 'Experience comfort without the cold draft with WindFree technology', 55000.00, 62000.00, '550e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1558618644-fcd25c85cd64?w=500', ARRAY['WindFree Technology', 'AI Auto Mode', '5-Star Rating', 'Wi-Fi Control'], '{"capacity": "2 Ton", "energy_rating": "5 Star", "warranty": "12 Years", "type": "Split AC"}', 4.7, 89, 15, TRUE, TRUE, 'NEW'),

-- Refrigerators
('550e8400-e29b-41d4-a716-446655440201', 'Whirlpool 340L Double Door', 'whirlpool-340l-double-door', 'Spacious double door refrigerator with advanced cooling technology', 35000.00, 42000.00, '550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=500', ARRAY['Fresh Flow Air Tower', 'Zeolite Technology', '3-Star Rating', 'Stabilizer Free'], '{"capacity": "340L", "energy_rating": "3 Star", "warranty": "10 Years", "type": "Double Door"}', 4.3, 156, 18, TRUE, TRUE, 'POPULAR'),
('550e8400-e29b-41d4-a716-446655440202', 'Samsung 580L Side by Side', 'samsung-580l-side-by-side', 'Premium side-by-side refrigerator with water dispenser', 75000.00, 85000.00, '550e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500', ARRAY['Water Dispenser', 'Digital Display', '4-Star Rating', 'Twin Cooling Plus'], '{"capacity": "580L", "energy_rating": "4 Star", "warranty": "12 Years", "type": "Side by Side"}', 4.6, 94, 8, TRUE, TRUE, 'PREMIUM'),

-- Televisions
('550e8400-e29b-41d4-a716-446655440301', 'Sony 55" 4K Smart TV', 'sony-55-4k-smart-tv', 'Immersive 4K experience with smart features and stunning picture quality', 65000.00, 75000.00, '550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500', ARRAY['4K Ultra HD', 'Smart TV', 'HDR Support', 'Voice Control'], '{"screen_size": "55 inches", "resolution": "4K Ultra HD", "warranty": "2 Years", "type": "Smart TV"}', 4.4, 203, 12, TRUE, TRUE, 'TRENDING'),
('550e8400-e29b-41d4-a716-446655440302', 'LG 65" OLED Smart TV', 'lg-65-oled-smart-tv', 'Premium OLED display with perfect blacks and infinite contrast', 150000.00, 180000.00, '550e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', ARRAY['OLED Display', 'Dolby Vision', 'webOS', 'ThinQ AI'], '{"screen_size": "65 inches", "resolution": "4K OLED", "warranty": "3 Years", "type": "OLED Smart TV"}', 4.8, 67, 5, TRUE, TRUE, 'PREMIUM'),

-- Washing Machines
('550e8400-e29b-41d4-a716-446655440401', 'Whirlpool 7.5kg Top Load', 'whirlpool-7-5kg-top-load', 'Efficient top-loading washing machine with multiple wash programs', 28000.00, 32000.00, '550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1604335399105-a0c585fd81db?w=500', ARRAY['ZPF Technology', 'Hard Water Wash', '5-Star Rating', '6th Sense'], '{"capacity": "7.5kg", "energy_rating": "5 Star", "warranty": "5 Years", "type": "Top Load"}', 4.2, 178, 22, TRUE, TRUE, 'VALUE'),
('550e8400-e29b-41d4-a716-446655440402', 'Samsung 8kg Front Load', 'samsung-8kg-front-load', 'Premium front-loading washer with AI-powered wash cycles', 42000.00, 48000.00, '550e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1558618644-fcd25c85cd64?w=500', ARRAY['AI Wash', 'Steam Wash', '4-Star Rating', 'AddWash Door'], '{"capacity": "8kg", "energy_rating": "4 Star", "warranty": "10 Years", "type": "Front Load"}', 4.5, 112, 16, TRUE, TRUE, 'SMART'),

-- Microwave Ovens
('550e8400-e29b-41d4-a716-446655440501', 'LG 28L Convection Microwave', 'lg-28l-convection-microwave', 'Versatile convection microwave with multiple cooking modes', 18000.00, 22000.00, '550e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500', ARRAY['Convection Cooking', 'Auto Cook Menu', 'Child Lock', 'LED Display'], '{"capacity": "28L", "type": "Convection", "warranty": "2 Years", "power": "900W"}', 4.1, 145, 30, TRUE, TRUE, 'VERSATILE'),

-- Freezers
('550e8400-e29b-41d4-a716-446655440601', 'Blue Star 300L Deep Freezer', 'blue-star-300l-deep-freezer', 'Spacious chest freezer for bulk storage needs', 25000.00, 28000.00, '550e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500', ARRAY['Fast Freeze', 'Lock & Key', '4-Star Rating', 'Stabilizer Free'], '{"capacity": "300L", "energy_rating": "4 Star", "warranty": "5 Years", "type": "Chest Freezer"}', 4.0, 78, 14, FALSE, TRUE, 'BULK');

-- Update category product counts
UPDATE categories SET product_count = (
    SELECT COUNT(*) FROM products WHERE products.category_id = categories.id AND products.is_active = TRUE
);

-- Create an admin user (you'll need to register first, then update the role)
-- After registering with your email, run this query with your actual user ID:
-- UPDATE profiles SET role = 'admin' WHERE email = 'your-admin-email@domain.com';