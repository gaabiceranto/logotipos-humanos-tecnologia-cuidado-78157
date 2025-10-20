import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-bold text-primary">Logos Contábil</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#sobre" className="text-muted-foreground hover:text-primary transition-colors">Sobre</a>
            <a href="#servicos" className="text-muted-foreground hover:text-primary transition-colors">Serviços</a>
            <a href="#planos" className="text-muted-foreground hover:text-primary transition-colors">Planos</a>
            <a href="#contato" className="text-muted-foreground hover:text-primary transition-colors">Contato</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild>
              <a href="#planos">Começar Agora</a>
            </Button>
          </div>
          
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;