import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Свяжитесь с нами
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Получите профессиональную консультацию по выбору оборудования для вашего автосервиса.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Телефон</h3>
                  <p className="text-muted-foreground">+7 800 222-30-05</p>
                  <p className="text-muted-foreground">+7 (918) 583-08-03</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                  <p className="text-muted-foreground">zakazsaitsp@ya.ru</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <MessageCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Режим работы</h3>
                  <p className="text-muted-foreground">Пн–Пт 9:00–18:00</p>
                  <p className="text-muted-foreground">Сб–Вс по договорённости</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Оставить заявку</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Номер телефона"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email адрес"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12"
                  />
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Опишите ваши потребности в оборудовании"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[120px] resize-none"
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-lg">
                  Оставить заявку
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