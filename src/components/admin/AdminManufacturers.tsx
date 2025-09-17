import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Manufacturer {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  website_url: string | null;
  is_active: boolean;
}

export const AdminManufacturers = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingManufacturer, setEditingManufacturer] = useState<Manufacturer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website_url: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    loadManufacturers();
  }, []);

  const loadManufacturers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('manufacturers')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setManufacturers(data || []);
    } catch (error) {
      console.error('Error loading manufacturers:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить производителей",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^а-яa-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const saveManufacturer = async () => {
    try {
      const slug = generateSlug(formData.name);
      const manufacturerData = {
        name: formData.name,
        slug,
        description: formData.description || null,
        website_url: formData.website_url || null,
      };

      if (editingManufacturer) {
        const { error } = await supabase
          .from('manufacturers')
          .update(manufacturerData)
          .eq('id', editingManufacturer.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('manufacturers')
          .insert(manufacturerData);

        if (error) throw error;
      }

      await loadManufacturers();
      setDialogOpen(false);
      setEditingManufacturer(null);
      setFormData({ name: "", description: "", website_url: "" });
      
      toast({
        title: "Успешно",
        description: editingManufacturer ? "Производитель обновлен" : "Производитель создан",
      });
    } catch (error) {
      console.error('Error saving manufacturer:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить производителя",
        variant: "destructive",
      });
    }
  };

  const deleteManufacturer = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этого производителя?')) return;

    try {
      const { error } = await supabase
        .from('manufacturers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setManufacturers(manufacturers.filter(m => m.id !== id));
      toast({
        title: "Успешно",
        description: "Производитель удален",
      });
    } catch (error) {
      console.error('Error deleting manufacturer:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось удалить производителя",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (manufacturer: Manufacturer) => {
    setEditingManufacturer(manufacturer);
    setFormData({
      name: manufacturer.name,
      description: manufacturer.description || "",
      website_url: manufacturer.website_url || "",
    });
    setDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingManufacturer(null);
    setFormData({ name: "", description: "", website_url: "" });
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Производители</h2>
          <p className="text-muted-foreground">Управление производителями оборудования</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить производителя
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingManufacturer ? 'Редактировать производителя' : 'Создать производителя'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Название</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Название производителя"
                />
              </div>
              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Описание производителя (необязательно)"
                />
              </div>
              <div>
                <Label htmlFor="website">Сайт</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <Button onClick={saveManufacturer} className="w-full">
                {editingManufacturer ? 'Обновить' : 'Создать'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Список производителей ({manufacturers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Загрузка производителей...</p>
            </div>
          ) : manufacturers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Производители еще не добавлены</p>
              <Button className="mt-4" onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить первого производителя
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Сайт</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {manufacturers.map((manufacturer) => (
                  <TableRow key={manufacturer.id}>
                    <TableCell className="font-medium">
                      {manufacturer.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {manufacturer.slug}
                    </TableCell>
                    <TableCell>
                      {manufacturer.website_url ? (
                        <a 
                          href={manufacturer.website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Сайт
                        </a>
                      ) : '-'}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {manufacturer.description || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditDialog(manufacturer)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteManufacturer(manufacturer.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};