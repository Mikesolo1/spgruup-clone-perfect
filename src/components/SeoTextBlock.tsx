const SeoTextBlock = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="prose prose-lg mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Профессиональное оборудование для автосервисов от СП-ГРУПП
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Почему выбирают нас?
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Более 15 000 позиций</strong> оборудования в каталоге</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>10+ лет</strong> успешной работы на рынке</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>2000+ оснащенных</strong> автосервисов по всей России</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Прямые поставки</strong> от производителей</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span><strong>Гарантия качества</strong> и сервисное обслуживание</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Наши услуги
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Консультации по подбору оборудования</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Доставка по всей России, включая ЛНР/ДНР</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Профессиональный монтаж и пуско-наладка</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Обучение персонала работе с оборудованием</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Гарантийное и сервисное обслуживание</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-muted/50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Оборудование для автосервиса - полный спектр решений
            </h3>
            <p className="text-muted-foreground mb-4">
              СП-ГРУПП специализируется на поставках профессионального оборудования для автосервисов, СТО и шиномонтажных мастерских. 
              В нашем каталоге представлены <strong>подъемники автомобильные</strong>, <strong>стенды сход-развал</strong>, 
              <strong>шиномонтажные станки</strong>, <strong>компрессоры</strong>, <strong>диагностическое оборудование</strong> и многое другое.
            </p>
            <p className="text-muted-foreground">
              Мы работаем напрямую с ведущими производителями оборудования, что позволяет предложить нашим клиентам 
              конкурентные цены и гарантию качества. Каждая единица оборудования сертифицирована в соответствии с 
              российскими и международными стандартами.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">15 000+</div>
              <div className="text-sm text-muted-foreground">позиций оборудования в каталоге</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">2 000+</div>
              <div className="text-sm text-muted-foreground">оснащенных автосервисов</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-muted-foreground">лет успешной работы</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Подберем оборудование под ваш бюджет и задачи
            </h3>
            <p className="text-muted-foreground mb-4">
              Наши эксперты помогут подобрать оптимальное оборудование для вашего автосервиса с учетом специфики работ, 
              планируемой загрузки и бюджета. Предоставляем комплексные решения "под ключ" - от проектирования до 
              полного запуска автосервиса.
            </p>
            <p className="text-muted-foreground">
              Обращайтесь к специалистам СП-ГРУПП за консультацией по телефону <strong>+7 800 222-30-05</strong> 
              или оставляйте заявку на сайте. Работаем по всей России с доставкой и монтажом.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeoTextBlock;