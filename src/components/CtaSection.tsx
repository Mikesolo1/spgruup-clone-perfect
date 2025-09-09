import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeadphonesIcon, Settings, Award } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center items-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <HeadphonesIcon className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Нужна помощь с подбором оборудования?
              </h2>
              
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                Оставьте заявку — наши специалисты подберут решение для вашего СТО
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90"
                >
                  Подобрать оборудование
                </Button>
                <div className="text-primary-foreground/90">
                  <div className="font-semibold text-lg">
                    +7 800 222-30-05
                  </div>
                  <div className="text-sm">
                    Бесплатная консультация
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">Индивидуальный подход</h3>
                  <p className="text-sm text-primary-foreground/80">Учитываем специфику вашего бизнеса</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">Гарантия качества</h3>
                  <p className="text-sm text-primary-foreground/80">Только проверенные производители</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <HeadphonesIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">Поддержка 24/7</h3>
                  <p className="text-sm text-primary-foreground/80">Всегда готовы помочь</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CtaSection;