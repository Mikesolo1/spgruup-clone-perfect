import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен для заполнения";
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Введите корректный номер телефона";
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Сообщение обязательно для заполнения";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время.",
        duration: 5000,
      });
      
      setFormData({
        name: "",
        phone: "",
        email: "",
        company: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте еще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Свяжитесь с нами</h2>
              <p className="text-muted-foreground text-lg">
                Получите профессиональную консультацию по подбору оборудования для вашего автосервиса. 
                Наши эксперты помогут выбрать оптимальное решение для вашего бизнеса.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Телефон</h3>
                  <p className="text-muted-foreground">+7 800 222-30-05 (бесплатно по РФ)</p>
                  <p className="text-muted-foreground">+7 (918) 583-08-03</p>
                  <p className="text-xs text-muted-foreground">Пн–Пт 9:00–18:00</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">zakazsaitsp@ya.ru</p>
                  <p className="text-xs text-muted-foreground">Ответим в течение часа</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Адрес</h3>
                  <p className="text-muted-foreground">г. Ростов-на-Дону,</p>
                  <p className="text-muted-foreground">пр-кт Шолохова 27/82</p>
                  <p className="text-xs text-muted-foreground">Офис и склад</p>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-semibold">Гарантии</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Бесплатная консультация</li>
                  <li>• Быстрый ответ в течение часа</li>
                  <li>• Персональный подход к каждому клиенту</li>
                  <li>• Помощь в выборе оборудования</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Получить консультацию</CardTitle>
              <p className="text-muted-foreground">Заполните форму и мы свяжемся с вами в течение 15 минут</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={errors.name ? "border-destructive" : ""}
                      required
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 999-99-99"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={errors.phone ? "border-destructive" : ""}
                      required
                    />
                    {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Компания</Label>
                  <Input
                    id="company"
                    placeholder="Название компании или автосервиса"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Описание задачи *</Label>
                  <Textarea
                    id="message"
                    placeholder="Какое оборудование вам нужно? Какие задачи планируете решать?"
                    className={`min-h-[100px] ${errors.message ? "border-destructive" : ""}`}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    required
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                </div>
                
                <Button 
                  type="submit"
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправляем..." : "Получить консультацию"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;