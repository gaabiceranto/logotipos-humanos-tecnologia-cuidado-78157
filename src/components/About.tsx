import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, Calculator, Smartphone, HeadphonesIcon } from "lucide-react";

const About = () => {
  return (
    <section id="sobre" className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Por que escolher a Logos?</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tecnologia e humanização em perfeita sintonia
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Com nossa plataforma 100% digital e equipe especializada, você tem contabilidade completa, 
            suporte estratégico e acesso simplificado às suas obrigações fiscais - tudo em um só lugar.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover:shadow-card transition-all duration-300 border-2 hover:border-primary/20">
            <Stethoscope className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Especialistas em Saúde</h3>
            <p className="text-muted-foreground">Focamos em médicos, clínicas, fisioterapeutas e profissionais da área da saúde</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card transition-all duration-300 border-2 hover:border-primary/20">
            <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Contabilidade Completa</h3>
            <p className="text-muted-foreground">Todos os serviços contábeis que sua empresa precisa em uma única plataforma</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card transition-all duration-300 border-2 hover:border-primary/20">
            <Smartphone className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">100% Digital</h3>
            <p className="text-muted-foreground">Acesse sua contabilidade a qualquer hora pelo computador ou celular</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card transition-all duration-300 border-2 hover:border-primary/20">
            <HeadphonesIcon className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">Atendimento Humanizado</h3>
            <p className="text-muted-foreground">Suporte personalizado por e-mail, WhatsApp e telefone com especialistas</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;