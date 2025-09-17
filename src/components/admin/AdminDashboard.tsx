import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Tag, Building2, TrendingUp } from "lucide-react";

export const AdminDashboard = () => {
  const stats = [
    {
      title: "Всего товаров",
      value: "0",
      icon: Package,
      trend: "+12%",
    },
    {
      title: "Категорий",
      value: "0", 
      icon: Tag,
      trend: "+3%",
    },
    {
      title: "Производителей",
      value: "0",
      icon: Building2,
      trend: "+5%",
    },
    {
      title: "Продаж за месяц",
      value: "0 ₽",
      icon: TrendingUp,
      trend: "+23%",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Добро пожаловать в админ-панель!
        </h2>
        <p className="text-muted-foreground">
          Управляйте каталогом товаров СП-ГРУПП
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.trend}</span> за последний месяц
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              База данных настроена и готова к использованию.
            </p>
            <p className="text-sm text-muted-foreground">
              Начните с добавления категорий и производителей, затем загрузите товары.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};