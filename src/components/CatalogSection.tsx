import { Card, CardContent } from "@/components/ui/card";
import { 
  Car, 
  Settings, 
  Wrench, 
  Zap, 
  Stethoscope, 
  Droplets, 
  Archive, 
  Fuel, 
  Armchair, 
  Flame, 
  Hammer, 
  Wind, 
  Gauge, 
  Plus, 
  Package 
} from "lucide-react";

const catalogItems = [
  { name: "Подъемники", icon: Car, color: "bg-blue-500" },
  { name: "Стенды сход-развал", icon: Settings, color: "bg-green-500" },
  { name: "Оборудование для шиномонтажа", icon: Wrench, color: "bg-purple-500" },
  { name: "Компрессоры", icon: Zap, color: "bg-yellow-500" },
  { name: "Диагностическое оборудование", icon: Stethoscope, color: "bg-red-500" },
  { name: "Гидравлическое оборудование", icon: Droplets, color: "bg-cyan-500" },
  { name: "Домкраты", icon: Archive, color: "bg-orange-500" },
  { name: "Замена технических жидкостей", icon: Fuel, color: "bg-pink-500" },
  { name: "Мебель для автосервиса и производств", icon: Armchair, color: "bg-indigo-500" },
  { name: "Сварочные аппараты", icon: Flame, color: "bg-rose-500" },
  { name: "Станки для заклепки тормозных колодок", icon: Hammer, color: "bg-teal-500" },
  { name: "Промышленные пылесосы", icon: Wind, color: "bg-slate-500" },
  { name: "Отвод выхлопных газов", icon: Gauge, color: "bg-lime-500" },
  { name: "Инструмент для автосервиса", icon: Wrench, color: "bg-amber-500" },
  { name: "Дополнительное оборудование для автосервиса", icon: Plus, color: "bg-emerald-500" },
  { name: "Запчасти", icon: Package, color: "bg-violet-500" }
];

const CatalogSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Наш каталог оборудования насчитывает более 15 000 наименований оборудования и инструмента для автосервисов и СТО
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {catalogItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card key={index} className="catalog-item cursor-pointer border-border hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${item.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground leading-tight">
                    {item.name}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;