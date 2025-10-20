import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Users } from "lucide-react";
const Hero = () => {
  return <section className="pt-20 pb-16 bg-gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Contabilidade digital, 
            <span className="text-primary"> humanizada</span> e com 
            <span className="text-accent"> propósito</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">Na Logos Contábil unimos tecnologia e atendimento personalizado para oferecer uma experiência única em gestão contábil. Especialistas em profissionais da saúde, com foco total no seu crescimento.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="shadow-primary" asChild>
              <a href="#planos">Começar agora</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.open("https://wa.me/5541920028428?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista", "_blank")}
            >
              Falar com Especialista
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">100% Digital</h3>
              
            </div>
            
            <div className="flex flex-col items-center">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Especialistas em Saúde</h3>
              
            </div>
            
            <div className="flex flex-col items-center">
              <CheckCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold text-lg mb-2">Suporte Completo</h3>
              
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;