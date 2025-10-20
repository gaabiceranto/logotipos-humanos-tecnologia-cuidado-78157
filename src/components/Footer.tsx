import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
const Footer = () => {
  return <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold">Logos Contábil</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              Contabilidade digital, humanizada e com propósito. Especialistas em profissionais da saúde 
              com atendimento personalizado e tecnologia de ponta.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-gradient-primary">Começar agora</Button>
              <Button variant="outline" className="border-background/30 hover:bg-background text-base text-zinc-900">
                Falar com Especialista
              </Button>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span className="text-background/80">WhatsApp</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-background/80">contato@logoscontabil.com.br</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-background/80">(41) 92002-8428</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Úteis</h3>
            <div className="space-y-2">
              <a href="#sobre" className="block text-background/80 hover:text-background transition-colors">Sobre Nós</a>
              <a href="#planos" className="block text-background/80 hover:text-background transition-colors">Planos</a>
              <a href="#contato" className="block text-background/80 hover:text-background transition-colors">Contato</a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors">Blog</a>
              <a href="#" className="block text-background/80 hover:text-background transition-colors">FAQ</a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">
            © 2024 Logos Contábil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;