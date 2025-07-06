-- Update settings for Bangladesh market
UPDATE public.settings 
SET value = '"৳"'
WHERE key = 'currency';

UPDATE public.settings 
SET value = '100.00'
WHERE key = 'shipping_fee';

UPDATE public.settings 
SET value = '2000.00'
WHERE key = 'free_shipping_threshold';

-- Insert Bangladesh-specific settings
INSERT INTO public.settings (key, value, description) VALUES
('payment_methods', '["bkash", "nagad", "rocket", "bank_transfer", "cash_on_delivery"]', 'Available payment methods for Bangladesh'),
('bkash_merchant', '"01XXXXXXXXX"', 'bKash merchant number'),
('nagad_merchant', '"01XXXXXXXXX"', 'Nagad merchant number'),
('rocket_merchant', '"01XXXXXXXXX"', 'Rocket merchant number'),
('delivery_areas', '["dhaka", "chittagong", "sylhet", "rajshahi", "khulna", "barisal", "rangpur", "mymensingh"]', 'Delivery areas in Bangladesh'),
('dhaka_delivery_fee', '60.00', 'Delivery fee within Dhaka'),
('outside_dhaka_delivery_fee', '120.00', 'Delivery fee outside Dhaka')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
