import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import PricingPlans from "@/components/PricingPlans";
import Footer from "@/components/Footer";
import PreRegistrationDialog from "@/components/PreRegistrationDialog";

const Index = () => {
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
    </div>
  );
};

export default Index;
