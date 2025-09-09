import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CatalogSection from "@/components/CatalogSection";
import AboutSection from "@/components/AboutSection";
import SeoTextBlock from "@/components/SeoTextBlock";
import ContactForm from "@/components/ContactForm";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "СП-ГРУПП",
      "alternateName": "ООО Сервиспроект",
      "description": "Профессиональное оборудование для автосервисов, подъемники, стенды сход-развал, шиномонтажное оборудование",
      "url": "https://sp-gruup.ru",
      "telephone": "+7-800-222-30-05",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "пр-кт Шолохова 27/82",
        "addressLocality": "Ростов-на-Дону",
        "addressCountry": "RU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "47.2357",
        "longitude": "39.7015"
      },
      "openingHours": "Mo-Fr 09:00-18:00",
      "priceRange": "$$",
      "servesCuisine": "automotive equipment"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CatalogSection />
      <AboutSection />
      <SeoTextBlock />
      <ContactForm />
      <CtaSection />
      <Footer />
    </main>
  );
};

export default Index;
