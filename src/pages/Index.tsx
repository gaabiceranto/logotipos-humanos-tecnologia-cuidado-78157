import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import PricingPlans from "@/components/PricingPlans";
import Footer from "@/components/Footer";
import PreRegistrationDialog from "@/components/PreRegistrationDialog";
import ContactDialog from "@/components/ContactDialog";
import { useState, useEffect } from "react";

const Index = () => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#contato") {
        setContactDialogOpen(true);
      }
    };

    // Verifica se já está na hash #contato ao carregar
    handleHashChange();

    // Escuta mudanças na hash
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <PricingPlans />
      </main>
      <Footer />
      <PreRegistrationDialog />
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </div>
  );
};

export default Index;
