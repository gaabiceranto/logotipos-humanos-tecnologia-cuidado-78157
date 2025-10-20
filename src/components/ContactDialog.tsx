import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContactDialog = ({ open, onOpenChange }: ContactDialogProps) => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá, gostaria de falar com um especialista da Logos Contábil");
    window.open(`https://wa.me/5541920028428?text=${message}`, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Fechar</span>
        </button>
        
        <DialogHeader>
          <DialogTitle>Entre em Contato</DialogTitle>
          <DialogDescription className="pt-2">
            Estamos prontos para atender você! Nossa equipe de especialistas está disponível 
            para esclarecer suas dúvidas e apresentar as melhores soluções contábeis para seu negócio.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">
            Clique no botão abaixo para iniciar uma conversa no WhatsApp com nossos especialistas. 
            Responderemos o mais breve possível!
          </p>

          <div className="flex gap-3 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="flex-1"
            >
              Fechar
            </Button>
            <Button 
              onClick={handleWhatsAppClick}
              className="flex-1 bg-gradient-primary"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
