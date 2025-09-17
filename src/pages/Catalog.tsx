import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { CatalogCategories } from "@/components/catalog/CatalogCategories";
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  parent_id: string | null;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number | null;
  old_price: number | null;
  images: string[];
  manufacturer?: {
    name: string;
  };
  category?: {
    name: string;
  };
}

const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const categorySlug = searchParams.get('category');

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [categorySlug]);

  const loadCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('products')
        .select(`
          *,
          manufacturer:manufacturers(name),
          category:categories(name)
        `)
        .eq('is_active', true);

      if (categorySlug) {
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .single();

        if (categoryData) {
          query = query.eq('category_id', categoryData.id);
        }
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentCategory = categories.find(cat => cat.slug === categorySlug);
  const childCategories = categories.filter(cat => cat.parent_id === currentCategory?.id);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: 'Главная', href: '/' },
            { label: 'Каталог', href: '/catalog' },
            ...(currentCategory ? [{ label: currentCategory.name, href: `/catalog?category=${currentCategory.slug}` }] : [])
          ]} 
        />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {currentCategory ? currentCategory.name : 'Каталог оборудования для СТО'}
          </h1>
          
          {!categorySlug && (
            <CatalogCategories 
              categories={categories.filter(cat => !cat.parent_id)} 
              onCategorySelect={(slug) => setSearchParams({ category: slug })}
            />
          )}

          {currentCategory && childCategories.length > 0 && (
            <CatalogCategories 
              categories={childCategories} 
              onCategorySelect={(slug) => setSearchParams({ category: slug })}
            />
          )}
        </div>

        <div className="flex gap-8">
          {/* Sidebar with filters */}
          <aside className={`w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-4">
              <CatalogFilters 
                categoryId={currentCategory?.id}
                onFiltersChange={(filters) => {
                  // Handle filter changes
                  console.log('Filters changed:', filters);
                }}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
                
                <span className="text-sm text-muted-foreground">
                  Найдено товаров: {products.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products grid */}
            <ProductGrid 
              products={products} 
              viewMode={viewMode} 
              loading={loading} 
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Catalog;