import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FileCheck } from "lucide-react";
import { useState } from "react";
import ServiceRequestDialog from "./ServiceRequestDialog";

const Services = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    type: string;
    title: string;
  }>({ type: "", title: "" });

  const handleServiceClick = (serviceType: string, title: string) => {
    setSelectedService({ type: serviceType, title });
    setDialogOpen(true);
  };

  return (
    <section id="servicos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluções completas para sua empresa
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Abertura de Empresa</CardTitle>
              <CardDescription>
                Abra sua empresa de forma rápida e descomplicada conosco
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => handleServiceClick("abertura", "Abertura de Empresa")}
              >
                Abrir CNPJ Conosco
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Certificado Digital</CardTitle>
              <CardDescription>
                Garanta seu certificado digital com segurança e praticidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => handleServiceClick("certificado", "Certificado Digital")}
              >
                Comprar Certificado Digital
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ServiceRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        planName={selectedService.title}
        planPrice="Consultar"
        regime="servico"
      />
    </section>
  );
};

export default Services;
