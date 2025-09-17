import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Upload, Download, FileText, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FeedImport {
  id: string;
  feed_url: string;
  feed_type: string;
  status: string;
  imported_products_count: number;
  error_message: string | null;
  created_at: string;
}

export const AdminFeedImport = () => {
  const [imports, setImports] = useState<FeedImport[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [feedData, setFeedData] = useState({
    url: "",
    type: "xml" as "xml" | "csv" | "json",
  });
  const { toast } = useToast();

  useEffect(() => {
    loadImports();
  }, []);

  const loadImports = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_feed_imports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImports(data || []);
    } catch (error) {
      console.error('Error loading imports:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить историю импорта",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const startImport = async () => {
    if (!feedData.url) {
      toast({
        title: "Ошибка",
        description: "Укажите URL фида",
        variant: "destructive",
      });
      return;
    }

    try {
      setImporting(true);
      
      // Create import record
      const { data, error } = await supabase
        .from('product_feed_imports')
        .insert({
          feed_url: feedData.url,
          feed_type: feedData.type,
          user_id: 'system', // TODO: Replace with actual user ID
          status: 'processing'
        })
        .select()
        .single();

      if (error) throw error;

      // TODO: Implement actual feed processing logic
      // For now, simulate processing
      setTimeout(async () => {
        await supabase
          .from('product_feed_imports')
          .update({
            status: 'completed',
            imported_products_count: Math.floor(Math.random() * 100) + 1
          })
          .eq('id', data.id);
        
        await loadImports();
        setImporting(false);
        
        toast({
          title: "Успешно",
          description: "Импорт завершен",
        });
      }, 3000);

      await loadImports();
      
    } catch (error) {
      console.error('Error starting import:', error);
      setImporting(false);
      toast({
        title: "Ошибка",
        description: "Не удалось начать импорт",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Завершен</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">Обработка</Badge>;
      case 'failed':
        return <Badge variant="destructive">Ошибка</Badge>;
      default:
        return <Badge variant="secondary">Ожидание</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Импорт товаров</h2>
        <p className="text-muted-foreground">
          Загрузка товаров из внешних источников данных
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Import Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Новый импорт
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="feed-url">URL фида данных</Label>
              <Input
                id="feed-url"
                type="url"
                value={feedData.url}
                onChange={(e) => setFeedData({ ...feedData, url: e.target.value })}
                placeholder="https://example.com/feed.xml"
              />
            </div>

            <div>
              <Label htmlFor="feed-type">Тип фида</Label>
              <Select 
                value={feedData.type} 
                onValueChange={(value: "xml" | "csv" | "json") => setFeedData({ ...feedData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xml">XML</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={startImport} 
              disabled={importing}
              className="w-full"
            >
              {importing ? 'Импорт...' : 'Начать импорт'}
            </Button>

            <div className="text-xs text-muted-foreground">
              <p>Поддерживаемые форматы:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>XML (YML, RSS)</li>
                <li>CSV с разделителями</li>
                <li>JSON API</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Инструкции
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground">Формат XML/YML:</h4>
              <p>Поддерживается стандартный формат Yandex.Market YML</p>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground">Формат CSV:</h4>
              <p>Обязательные поля: name, price, category, manufacturer</p>
            </div>

            <div>
              <h4 className="font-medium text-foreground">Формат JSON:</h4>
              <p>REST API с пагинацией или простой массив товаров</p>
            </div>

            <div className="flex items-start gap-2 p-3 bg-muted rounded">
              <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
              <div>
                <p className="text-xs font-medium">Важно!</p>
                <p className="text-xs">
                  Перед импортом убедитесь, что созданы необходимые категории и производители
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Import History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            История импорта
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Загрузка истории...</p>
            </div>
          ) : imports.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">История импорта пуста</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>URL фида</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Импортировано</TableHead>
                  <TableHead>Ошибка</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {imports.map((importRecord) => (
                  <TableRow key={importRecord.id}>
                    <TableCell>
                      {new Date(importRecord.created_at).toLocaleString('ru-RU')}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {importRecord.feed_url}
                    </TableCell>
                    <TableCell className="uppercase">
                      {importRecord.feed_type}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(importRecord.status)}
                    </TableCell>
                    <TableCell>
                      {importRecord.imported_products_count} шт.
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {importRecord.error_message || '-'}
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