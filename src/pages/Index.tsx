import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CatalogSection from "@/components/CatalogSection";
import AboutSection from "@/components/AboutSection";
import ContactForm from "@/components/ContactForm";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CatalogSection />
      <AboutSection />
      <ContactForm />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
