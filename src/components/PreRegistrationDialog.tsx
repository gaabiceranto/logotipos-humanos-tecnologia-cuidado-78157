import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Telefone inválido").max(15, "Telefone inválido"),
});

const PreRegistrationDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Verifica se o usuário já viu o modal
    const hasSeenModal = localStorage.getItem("hasSeenPreRegistration");
    if (!hasSeenModal) {
      // Mostra o modal após 2 segundos
      const timer = setTimeout(() => {
        setOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.functions.invoke('save-lead-to-sheets', {
        body: {
          email: values.email,
          phone: values.phone,
        }
      });

      if (error) throw error;

      toast({
        title: "Cadastro realizado!",
        description: "Obrigado pelo seu interesse. Entraremos em contato em breve!",
      });

      localStorage.setItem("hasSeenPreRegistration", "true");
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error saving lead:", error);
      toast({
        title: "Erro ao cadastrar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const handleClose = () => {
    localStorage.setItem("hasSeenPreRegistration", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </button>
        
        <DialogHeader>
          <DialogTitle>Bem-vindo à Logos Contábil!</DialogTitle>
          <DialogDescription>
            Deixe seus dados e entraremos em contato com as melhores soluções para sua empresa
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
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
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(41) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Agora Não
              </Button>
              <Button type="submit" className="flex-1">
                Enviar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PreRegistrationDialog;
