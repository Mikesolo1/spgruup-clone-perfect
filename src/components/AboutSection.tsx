import { Card, CardContent } from "@/components/ui/card";
import { 
  Award, 
  MapPin, 
  Truck, 
  Shield, 
  DollarSign, 
  HeadphonesIcon, 
  Settings 
} from "lucide-react";

const advantages = [
  {
    icon: Award,
    title: "Более 10 лет на рынке",
    description: "Оснастили свыше 2000 автосервисов"
  },
  {
    icon: MapPin,
    title: "Офлайн-магазин",
    description: "Физический магазин для осмотра оборудования"
  },
  {
    icon: Truck,
    title: "Доставка и монтаж",
    description: "Включая регионы ЛНР/ДНР"
  },
  {
    icon: Shield,
    title: "Надёжные производители",
    description: "Работаем только с проверенными брендами"
  },
  {
    icon: DollarSign,
    title: "Конкурентные цены",
    description: "Лучшие предложения на рынке"
  },
  {
    icon: HeadphonesIcon,
    title: "Профессиональная консультация",
    description: "Помощь в выборе оборудования"
  },
  {
    icon: Settings,
    title: "Гарантия и сервисное обслуживание",
    description: "Полная поддержка после покупки"
  }
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Advantages */}
        <div className="mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <Card key={index} className="feature-card border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-2">
                          {advantage.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* About Company */}
        <div className="bg-background rounded-2xl p-8 md:p-12 shadow-sm">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            О компании
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed text-center">
              ООО Сервиспроект работает с 2011 года и передал более 2000 автомастерских современное оборудование. 
              Широкий ассортимент: подъемники, шиномонтажные и балансировочные станки, стенды сход-развал, 
              диагностическое, сварочное и компрессорное оборудование, инструмент и другое. Мы сотрудничаем с 
              проверенными производителями, обеспечиваем выгодные цены, профессиональные консультации, 
              гарантийное и сервисное обслуживание.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;