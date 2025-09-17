import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingCart, Heart, Eye } from "lucide-react";

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

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
  loading: boolean;
}

export const ProductGrid = ({ products, viewMode, loading }: ProductGridProps) => {
  if (loading) {
    return (
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <Skeleton className="h-48 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-6 w-1/4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Товары не найдены</p>
        <p className="text-muted-foreground text-sm mt-2">
          Попробуйте изменить параметры поиска или фильтры
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {products.map((product) => (
        <Card key={product.id} className={`group cursor-pointer transition-all duration-300 hover:shadow-lg ${viewMode === 'list' ? 'flex' : ''}`}>
          <div className={`${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
            <div className="relative overflow-hidden bg-muted">
              {product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${viewMode === 'list' ? 'h-48' : 'h-64'}`}
                />
              ) : (
                <div className={`w-full bg-muted flex items-center justify-center text-muted-foreground ${viewMode === 'list' ? 'h-48' : 'h-64'}`}>
                  <Eye className="w-8 h-8" />
                </div>
              )}
              
              {product.old_price && product.price && (
                <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                  -{Math.round(((product.old_price - product.price) / product.old_price) * 100)}%
                </Badge>
              )}

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" className="h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <CardContent className="p-4">
              {product.manufacturer && (
                <Badge variant="outline" className="mb-2 text-xs">
                  {product.manufacturer.name}
                </Badge>
              )}
              
              <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              
              {product.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
              )}

              <div className="flex items-center gap-2 mb-3">
                {product.price && (
                  <span className="text-lg font-bold text-primary">
                    {product.price.toLocaleString()} ₽
                  </span>
                )}
                {product.old_price && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.old_price.toLocaleString()} ₽
                  </span>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <div className="flex gap-2 w-full">
                <Button className="flex-1" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  В корзину
                </Button>
                <Button variant="outline" size="sm">
                  Купить в 1 клик
                </Button>
              </div>
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
};