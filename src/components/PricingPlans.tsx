import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import ServiceRequestDialog from "./ServiceRequestDialog";

const PricingPlans = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string; regime: string } | null>(null);

  const simplesNacionalPlans = [
    {
      name: "Light",
      description: "Ideal para faturamento até R$ 50 mil/mês",
      promoPrice: "R$ 99",
      regularPrice: "R$ 170",
      features: [
        "Contabilidade completa",
        "Certificado digital gratuito", 
        "Plataforma + aplicativo contábil",
        "15 notas/mês",
        "Atendimento por e-mail e WhatsApp",
        "Serviços adicionais sob demanda"
      ]
    },
    {
      name: "Flex",
      description: "Ideal para faturamento até R$ 100 mil/mês",
      promoPrice: "R$ 149",
      regularPrice: "R$ 280",
      popular: true,
      features: [
        "Contabilidade completa",
        "Certificado digital gratuito",
        "Plataforma + aplicativo contábil", 
        "200 notas/mês",
        "Emissão de notas em lote inclusa",
        "Gerente de conta dedicado",
        "Atendimento completo (e-mail, WhatsApp, ligação)",
        "01 reunião de consultoria/mês",
        "Abertura de CNPJ gratuita",
        "Alteração contratual (1/ano)"
      ]
    },
    {
      name: "Full",
      description: "Ideal para faturamento até R$ 200 mil/mês",
      promoPrice: "R$ 279", 
      regularPrice: "R$ 420",
      features: [
        "Contabilidade completa",
        "Certificado digital gratuito",
        "Plataforma + aplicativo contábil",
        "200 notas/mês (até 30 emitidas pela equipe)",
        "Emissão de notas em lote inclusa", 
        "Gerente de conta dedicado",
        "Atendimento completo (e-mail, WhatsApp, ligação)",
        "01 reunião de consultoria/mês",
        "Abertura de CNPJ gratuita",
        "Alteração contratual (1/ano)"
      ]
    }
  ];

  const lucroPresumidoPlans = [
    {
      name: "Light",
      description: "Ideal para faturamento até R$ 50 mil/mês",
      promoPrice: "R$ 240",
      regularPrice: "R$ 290",
      features: [
        "Contabilidade completa",
        "Certificado digital gratuito",
        "Plataforma + aplicativo contábil",
        "15 notas/mês", 
        "Atendimento por e-mail e WhatsApp",
        "Serviços adicionais sob demanda"
      ]
    },
    {
      name: "Flex", 
      description: "Ideal para faturamento até R$ 100 mil/mês",
      promoPrice: "R$ 430",
      regularPrice: "R$ 480", 
      popular: true,
      features: [
        "Contabilidade completa",
        "Certificado digital gratuito",
        "Plataforma + aplicativo contábil",
        "200 notas/mês",
        "Emissão de notas em lote inclusa",
        "Gerente de conta dedicado", 
        "Atendimento completo (e-mail, WhatsApp, ligação)",
        "01 reunião de consultoria/mês",
        "Abertura de CNPJ gratuita",
        "Alteração contratual (1/ano)"
      ]
    },
    {
      name: "Full",
      description: "Ideal para faturamento até R$ 200 mil/mês", 
      promoPrice: "R$ 580",
      regularPrice: "R$ 630",
      features: [
        "Contabilidade completa",
        "Certificado digital gratuito",
        "Plataforma + aplicativo contábil", 
        "200 notas/mês (até 30 emitidas pela equipe)",
        "Emissão de notas em lote inclusa",
        "Gerente de conta dedicado",
        "Atendimento completo (e-mail, WhatsApp, ligação)",
        "01 reunião de consultoria/mês",
        "Abertura de CNPJ gratuita", 
        "Alteração contratual (1/ano)"
      ]
    }
  ];

  const PlanCard = ({ plan, regime }: { plan: any, regime: string }) => (
    <Card className={`relative ${plan.popular ? 'border-2 border-primary shadow-primary' : 'border hover:border-primary/50'} transition-all duration-300`}>
      {plan.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary">
          Mais Popular
        </Badge>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-success">{plan.promoPrice}</span>
            <span className="text-muted-foreground">/mês</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Primeiros 3 meses • Depois <span className="line-through">{plan.regularPrice}/mês</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-start space-x-2">
              <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${plan.popular ? 'bg-gradient-primary' : ''}`}
          onClick={() => {
            setSelectedPlan({ name: plan.name, price: plan.promoPrice, regime });
            setDialogOpen(true);
          }}
        >
          Escolher {plan.name}
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <>
      <ServiceRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        planName={selectedPlan?.name || ""}
        planPrice={selectedPlan?.price || ""}
        regime={selectedPlan?.regime || ""}
      />
      
      <section id="planos" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Planos que cabem no seu bolso
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Escolha o plano ideal para seu negócio e aproveite nossos preços promocionais
          </p>
        </div>

        {/* Simples Nacional */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Simples Nacional</h3>
            <p className="text-muted-foreground">Para empresas enquadradas no Simples Nacional</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {simplesNacionalPlans.map((plan, index) => (
              <PlanCard key={index} plan={plan} regime="simples" />
            ))}
          </div>
        </div>

        {/* Lucro Presumido */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Lucro Presumido</h3>
            <p className="text-muted-foreground">Para empresas enquadradas no Lucro Presumido</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {lucroPresumidoPlans.map((plan, index) => (
              <PlanCard key={index} plan={plan} regime="presumido" />
            ))}
          </div>
        </div>

        {/* Lucro Real */}
        <div className="text-center">
          <Card className="max-w-md mx-auto border-2 border-accent">
            <CardHeader>
              <CardTitle className="text-xl">Lucro Real</CardTitle>
              <CardDescription>Para empresas com necessidades específicas</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">Entre em contato para uma proposta personalizada</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground" asChild>
                <a href="https://wa.me/5541920028428?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20plano%20para%20empresas%20do%20Lucro%20Real" target="_blank" rel="noopener noreferrer">
                  Solicitar Proposta
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
    </>
  );
};

export default PricingPlans;