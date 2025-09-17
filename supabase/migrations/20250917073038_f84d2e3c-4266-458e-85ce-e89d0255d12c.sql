-- Insert sample categories
INSERT INTO public.categories (name, slug, description, sort_order) VALUES
('Шиномонтажное оборудование', 'shinomontazhnoe-oborudovanie', 'Оборудование для шиномонтажа и балансировки колес', 1),
('Подъемное оборудование', 'podemnoe-oborudovanie', 'Подъемники и гидравлическое оборудование', 2),
('Стенды сход-развал', 'stendy-razval-shozhdeniya', 'Стенды для проверки и регулировки углов установки колес', 3),
('Компрессоры', 'kompressory', 'Воздушные компрессоры различных типов', 4),
('Диагностическое оборудование', 'diagnosticheskoe-oborudovanie', 'Оборудование для диагностики автомобилей', 5),
('Гидравлическое оборудование', 'gidravlicheskoe-oborudovanie', 'Гидравлические системы и инструменты', 6),
('Домкраты', 'domkraty', 'Домкраты различных типов и грузоподъемности', 7),
('Замена технических жидкостей', 'zamena-zhidkostej', 'Оборудование для замены масла и других жидкостей', 8),
('Мебель для автосервиса', 'mebel-avtoserwisa', 'Специализированная мебель и оборудование', 9),
('Сварочные аппараты', 'svarochnye-apparaty', 'Сварочное оборудование для автосервиса', 10),
('Промышленные пылесосы', 'promyshlennye-pylesosy', 'Промышленные пылесосы и системы очистки', 11),
('Инструмент для автосервиса', 'instrument-avtoserwisa', 'Специализированный инструмент', 12);

-- Get category IDs for subcategories
DO $$ 
DECLARE 
    shino_id UUID;
    podem_id UUID;
BEGIN
    SELECT id INTO shino_id FROM public.categories WHERE slug = 'shinomontazhnoe-oborudovanie';
    SELECT id INTO podem_id FROM public.categories WHERE slug = 'podemnoe-oborudovanie';
    
    -- Insert subcategories for shino equipment
    INSERT INTO public.categories (name, slug, description, parent_id, sort_order) VALUES
    ('Шиномонтажные станки', 'shinomontazhnye-stanki', 'Станки для монтажа и демонтажа шин', shino_id, 1),
    ('Балансировочные станки', 'balansirovochnye-stanki', 'Станки для балансировки колес', shino_id, 2),
    ('Вулканизаторы', 'vulkanizatory', 'Оборудование для ремонта шин', shino_id, 3),
    ('Пневматический инструмент', 'pnevmaticheskij-instrument', 'Пневматические инструменты для шиномонтажа', shino_id, 4);
    
    -- Insert subcategories for lifting equipment
    INSERT INTO public.categories (name, slug, description, parent_id, sort_order) VALUES
    ('Двухстоечные подъемники', 'dvuhstojechnye-podemniki', 'Двухстоечные автомобильные подъемники', podem_id, 1),
    ('Четырехстоечные подъемники', 'chetyrohstojechnye-podemniki', 'Четырехстоечные автомобильные подъемники', podem_id, 2),
    ('Ножничные подъемники', 'nozhnichnie-podemniki', 'Ножничные подъемники различных типов', podem_id, 3);
END $$;

-- Insert sample manufacturers
INSERT INTO public.manufacturers (name, slug, description, website_url) VALUES
('Bright', 'bright', 'Китайский производитель автосервисного оборудования', 'https://bright-equipment.com'),
('Nordberg', 'nordberg', 'Производитель подъемников и гаражного оборудования', 'https://nordberg-auto.ru'),
('Launch', 'launch', 'Китайский производитель диагностического оборудования', 'https://launch.eu'),
('Hunter', 'hunter', 'Американский производитель шиномонтажного оборудования', 'https://hunter.com'),
('Ravaglioli', 'ravaglioli', 'Итальянский производитель подъемного оборудования', 'https://ravaglioli.com'),
('Corghi', 'corghi', 'Итальянский производитель шиномонтажного оборудования', 'https://corghi.com'),
('Beissbarth', 'beissbarth', 'Немецкий производитель измерительного оборудования', 'https://beissbarth.com'),
('Bosch', 'bosch', 'Немецкий концерн, производитель автомобильного оборудования', 'https://bosch.com');