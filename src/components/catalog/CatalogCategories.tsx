import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
}

interface CatalogCategoriesProps {
  categories: Category[];
  onCategorySelect: (slug: string) => void;
}

export const CatalogCategories = ({ categories, onCategorySelect }: CatalogCategoriesProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
      {categories.map((category) => (
        <Card 
          key={category.id} 
          className="cursor-pointer hover:shadow-lg transition-all duration-300 border-border hover:border-primary/50"
          onClick={() => onCategorySelect(category.slug)}
        >
          <CardContent className="p-4 text-center">
            {category.image_url && (
              <div className="w-16 h-16 mx-auto mb-3 bg-muted rounded-lg overflow-hidden">
                <img 
                  src={category.image_url} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h3 className="font-medium text-sm text-foreground leading-tight">
              {category.name}
            </h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};