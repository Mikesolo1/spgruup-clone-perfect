import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Award } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center bg-hero-bg"
      style={{
        backgroundImage: `linear-gradient(rgba(34, 39, 46, 0.8), rgba(34, 39, 46, 0.8)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Оборудование для <span className="text-primary">автосервисов</span> от СП-ГРУПП
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
            Продажа, доставка и установка профессионального оборудования
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="text-lg px-8 py-6">
              Получить консультацию
            </Button>
            <div className="flex flex-col sm:items-start">
              <div className="text-white font-semibold text-lg">
                +7 800 222-30-05, +7 (918) 583-08-03
              </div>
              <div className="text-white/70 text-sm">
                Пн–Пт 9:00–18:00, Сб–Вс по договорённости
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 feature-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Более 10 лет на рынке</h3>
                  <p className="text-white/80 text-sm">Оснастили свыше 2000 автосервисов</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 feature-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Офлайн-магазин</h3>
                  <p className="text-white/80 text-sm">Доставка и монтаж, включая регионы ЛНР/ДНР</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 feature-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Надёжные производители</h3>
                  <p className="text-white/80 text-sm">Конкурентные цены и профессиональная консультация</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;