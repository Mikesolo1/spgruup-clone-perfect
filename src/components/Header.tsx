import { Phone, Mail, Clock, Menu, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState } from "react";

const catalogItems = [
  "Подъемники",
  "Стенды сход-развал", 
  "Оборудование для шиномонтажа",
  "Компрессоры",
  "Диагностическое оборудование",
  "Гидравлическое оборудование",
  "Домкраты",
  "Замена технических жидкостей",
  "Мебель для автосервиса",
  "Сварочные аппараты",
  "Станки для заклепки тормозных колодок",
  "Промышленные пылесосы",
  "Отвод выхлопных газов",
  "Инструмент для автосервиса",
  "Дополнительное оборудование",
  "Запчасти"
];

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="bg-background shadow-sm sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-muted py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+7 800 222-30-05</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>+7 (918) 583-08-03</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>zakazsaitsp@ya.ru</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Пн–Пт 9:00–18:00, Сб–Вс по договорённости</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">СП</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">СП-ГРУПП</h1>
              <p className="text-xs text-muted-foreground">Оборудование для автосервисов</p>
            </div>
          </div>

          {/* Navigation with Catalog dropdown */}
          <nav className="hidden lg:flex items-center space-x-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6">
                    Каталог
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-2 p-6 w-[600px]">
                      {catalogItems.map((item, index) => (
                        <a 
                          key={index}
                          href={`/catalog?category=${item.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`} 
                          className="block p-3 rounded-md hover:bg-accent transition-colors text-sm font-medium text-foreground hover:text-primary"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <a href="/" className="text-foreground hover:text-primary transition-colors font-medium">Главная</a>
            <a href="/catalog" className="text-foreground hover:text-primary transition-colors font-medium">Каталог</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">О компании</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Сервис и гарантия</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Доставка и оплата</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Тендерный отдел</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Блог</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>

          {/* Search and mobile menu */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:flex">
              <Input
                type="text"
                placeholder="Поиск оборудования..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button className="lg:hidden">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;