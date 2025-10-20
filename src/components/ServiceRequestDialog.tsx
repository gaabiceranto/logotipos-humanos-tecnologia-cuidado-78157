import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  serviceType: z.string().min(1, "Selecione o tipo de serviço"),
  cnpj: z.string().min(14, "CNPJ inválido").max(18, "CNPJ inválido"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido").max(15, "Telefone inválido"),
});

interface ServiceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  planPrice: string;
  regime: string;
}

const ServiceRequestDialog = ({ open, onOpenChange, planName, planPrice, regime }: ServiceRequestDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceType: "",
      cnpj: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const serviceTypeLabels: Record<string, string> = {
      abertura: "Abra sua empresa conosco",
      certificado: "Certificado digital",
      irpf: "Declaração de Imposto de Renda",
      consultoria: "Consultoria Tributária"
    };
    const serviceTypeLabel = serviceTypeLabels[values.serviceType] || values.serviceType;
    const message = `Olá, gostaria de contratar o plano *${planName}* - ${regime === "simples" ? "Simples Nacional" : "Lucro Presumido"}%0A%0A*Valor:* ${planPrice}/mês%0A*Tipo de Serviço:* ${serviceTypeLabel}%0A%0A*Dados da empresa:*%0ACNPJ: ${values.cnpj}%0AE-mail: ${values.email}%0ACelular: ${values.phone}`;
    window.open(`https://wa.me/5541920028428?text=${message}`, "_blank");
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Solicitação de Contratação</DialogTitle>
          <DialogDescription>
            Preencha os dados abaixo para contratar o serviço
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-muted rounded-md">
              <div>
                <p className="font-semibold">Plano: {planName}</p>
                <p className="text-sm text-muted-foreground">
                  {regime === "simples" ? "Simples Nacional" : "Lucro Presumido"}
                </p>
              </div>
              <p className="text-lg font-bold text-primary">{planPrice}/mês</p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Serviço</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de serviço" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="abertura">Abra sua empresa conosco</SelectItem>
                        <SelectItem value="certificado">Certificado digital</SelectItem>
                        <SelectItem value="irpf">Declaração de Imposto de Renda</SelectItem>
                        <SelectItem value="consultoria">Consultoria Tributária</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <Input placeholder="00.000.000/0000-00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input placeholder="(41) 99999-9999" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Enviar Solicitação via WhatsApp
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestDialog;
