import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">СП</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">СП-ГРУПП</h3>
                <p className="text-xs text-muted-foreground">ООО Сервиспроект</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-4">
              Профессиональное оборудование для автосервисов с 2011 года. 
              Более 2000 оснащенных автомастерских по всей России.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-muted-foreground">+7 800 222-30-05</p>
                  <p className="text-muted-foreground">+7 (918) 583-08-03</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <p className="text-muted-foreground">zakazsaitsp@ya.ru</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <p className="text-muted-foreground">
                  г. Ростов-на-Дону,<br />
                  пр-кт Шолохова 27/82
                </p>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Режим работы</h4>
            <div className="flex items-start space-x-3">
              <Clock className="h-4 w-4 text-primary mt-1" />
              <div>
                <p className="text-muted-foreground">Пн–Пт 9:00–18:00</p>
                <p className="text-muted-foreground">Сб–Вс по договорённости</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Быстрые ссылки</h4>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                О компании
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Каталог
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Доставка и оплата
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Гарантия
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Контакты
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 ООО Сервиспроект (СП-ГРУПП). Все права защищены.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;