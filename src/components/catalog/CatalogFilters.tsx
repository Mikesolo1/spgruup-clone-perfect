import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";

interface FilterAttribute {
  id: string;
  name: string;
  slug: string;
  attribute_type: string;
  options?: any;
  unit?: string;
}

interface CatalogFiltersProps {
  categoryId?: string;
  onFiltersChange: (filters: any) => void;
}

export const CatalogFilters = ({ categoryId, onFiltersChange }: CatalogFiltersProps) => {
  const [filters, setFilters] = useState<FilterAttribute[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, any>>({});
  const [manufacturers, setManufacturers] = useState<Array<{id: string, name: string}>>([]);

  useEffect(() => {
    if (categoryId) {
      loadFilters();
    }
    loadManufacturers();
  }, [categoryId]);

  const loadFilters = async () => {
    try {
      const { data, error } = await supabase
        .from('product_attributes')
        .select('*')
        .eq('category_id', categoryId)
        .eq('is_filterable', true)
        .order('sort_order');

      if (error) throw error;
      setFilters(data || []);
    } catch (error) {
      console.error('Error loading filters:', error);
    }
  };

  const loadManufacturers = async () => {
    try {
      const { data, error } = await supabase
        .from('manufacturers')
        .select('id, name')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setManufacturers(data || []);
    } catch (error) {
      console.error('Error loading manufacturers:', error);
    }
  };

  const handleFilterChange = (filterId: string, value: any) => {
    const updatedFilters = { ...selectedFilters, [filterId]: value };
    setSelectedFilters(updatedFilters);
    onFiltersChange({ ...updatedFilters, priceRange });
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
    onFiltersChange({ ...selectedFilters, priceRange: range });
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setPriceRange([0, 1000000]);
    onFiltersChange({});
  };

  const renderFilter = (filter: FilterAttribute) => {
    switch (filter.attribute_type) {
      case 'select':
        return (
          <div key={filter.id} className="space-y-3">
            <h4 className="font-medium text-foreground">{filter.name}</h4>
            {filter.options?.map((option: string, index: number) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${filter.id}-${index}`}
                  checked={selectedFilters[filter.id]?.includes(option)}
                  onCheckedChange={(checked) => {
                    const current = selectedFilters[filter.id] || [];
                    const updated = checked
                      ? [...current, option]
                      : current.filter((item: string) => item !== option);
                    handleFilterChange(filter.id, updated);
                  }}
                />
                <Label htmlFor={`${filter.id}-${index}`} className="text-sm">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      
      case 'number':
        return (
          <div key={filter.id} className="space-y-3">
            <h4 className="font-medium text-foreground">{filter.name}</h4>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="От"
                value={selectedFilters[filter.id]?.[0] || ''}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined;
                  const current = selectedFilters[filter.id] || [undefined, undefined];
                  handleFilterChange(filter.id, [value, current[1]]);
                }}
              />
              <Input
                type="number"
                placeholder="До"
                value={selectedFilters[filter.id]?.[1] || ''}
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : undefined;
                  const current = selectedFilters[filter.id] || [undefined, undefined];
                  handleFilterChange(filter.id, [current[0], value]);
                }}
              />
            </div>
            {filter.unit && (
              <span className="text-xs text-muted-foreground">{filter.unit}</span>
            )}
          </div>
        );
      
      case 'boolean':
        return (
          <div key={filter.id} className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={filter.id}
                checked={selectedFilters[filter.id] === true}
                onCheckedChange={(checked) => handleFilterChange(filter.id, checked)}
              />
              <Label htmlFor={filter.id} className="font-medium">
                {filter.name}
              </Label>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg">Фильтры</CardTitle>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Очистить
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Цена, ₽</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={1000000}
              min={0}
              step={1000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0].toLocaleString()} ₽</span>
            <span>{priceRange[1].toLocaleString()} ₽</span>
          </div>
        </div>

        <Separator />

        {/* Manufacturers */}
        {manufacturers.length > 0 && (
          <>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Производитель</h4>
              <div className="max-h-48 overflow-y-auto space-y-2">
                {manufacturers.map((manufacturer) => (
                  <div key={manufacturer.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`manufacturer-${manufacturer.id}`}
                      checked={selectedFilters.manufacturers?.includes(manufacturer.id)}
                      onCheckedChange={(checked) => {
                        const current = selectedFilters.manufacturers || [];
                        const updated = checked
                          ? [...current, manufacturer.id]
                          : current.filter((id: string) => id !== manufacturer.id);
                        handleFilterChange('manufacturers', updated);
                      }}
                    />
                    <Label htmlFor={`manufacturer-${manufacturer.id}`} className="text-sm">
                      {manufacturer.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Dynamic filters */}
        {filters.map(renderFilter)}
      </CardContent>
    </Card>
  );
};