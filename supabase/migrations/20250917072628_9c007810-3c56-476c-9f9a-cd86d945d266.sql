-- Create categories table for hierarchical product categories
CREATE TABLE public.categories (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    parent_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create manufacturers table
CREATE TABLE public.manufacturers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    logo_url TEXT,
    website_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    short_description TEXT,
    sku TEXT UNIQUE,
    price DECIMAL(12,2),
    old_price DECIMAL(12,2),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    manufacturer_id UUID REFERENCES public.manufacturers(id) ON DELETE SET NULL,
    images TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    stock_quantity INTEGER DEFAULT 0,
    weight DECIMAL(8,3),
    dimensions JSONB, -- {length, width, height}
    meta_title TEXT,
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product attributes table for flexible product characteristics
CREATE TABLE public.product_attributes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    attribute_type TEXT NOT NULL CHECK (attribute_type IN ('text', 'number', 'boolean', 'select', 'multiselect')),
    options JSONB, -- For select/multiselect types
    unit TEXT, -- For number types (kg, mm, etc)
    category_id UUID REFERENCES public.categories(id) ON DELETE CASCADE,
    is_filterable BOOLEAN DEFAULT false,
    is_required BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(category_id, slug)
);

-- Create product attribute values table
CREATE TABLE public.product_attribute_values (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    attribute_id UUID REFERENCES public.product_attributes(id) ON DELETE CASCADE,
    value TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(product_id, attribute_id)
);

-- Create product feed imports table for tracking imports
CREATE TABLE public.product_feed_imports (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    feed_url TEXT NOT NULL,
    feed_type TEXT NOT NULL CHECK (feed_type IN ('xml', 'csv', 'json')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    imported_products_count INTEGER DEFAULT 0,
    error_message TEXT,
    user_id UUID NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manufacturers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_attributes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_attribute_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_feed_imports ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Manufacturers are viewable by everyone" ON public.manufacturers FOR SELECT USING (is_active = true);
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Product attributes are viewable by everyone" ON public.product_attributes FOR SELECT USING (true);
CREATE POLICY "Product attribute values are viewable by everyone" ON public.product_attribute_values FOR SELECT USING (true);

-- Admin policies (assuming admin role will be implemented later)
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage manufacturers" ON public.manufacturers FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage product attributes" ON public.product_attributes FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can manage product attribute values" ON public.product_attribute_values FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Admins can view feed imports" ON public.product_feed_imports FOR ALL USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_categories_parent_id ON public.categories(parent_id);
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_manufacturer_id ON public.products(manufacturer_id);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_product_attributes_category_id ON public.product_attributes(category_id);
CREATE INDEX idx_product_attribute_values_product_id ON public.product_attribute_values(product_id);
CREATE INDEX idx_product_attribute_values_attribute_id ON public.product_attribute_values(attribute_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_manufacturers_updated_at BEFORE UPDATE ON public.manufacturers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_product_attributes_updated_at BEFORE UPDATE ON public.product_attributes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_product_feed_imports_updated_at BEFORE UPDATE ON public.product_feed_imports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();