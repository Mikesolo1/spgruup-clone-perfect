import { Phone, Mail, Clock, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-background shadow-sm">
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">СП</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">СП-ГРУПП</h1>
              <p className="text-xs text-muted-foreground">Оборудование для автосервисов</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">О компании</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Сервис и гарантия</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Доставка и оплата</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Тендерный отдел</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Отзывы</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Блог</a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">Контакты</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="outline" className="hidden md:flex">
              Каталог
            </Button>
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