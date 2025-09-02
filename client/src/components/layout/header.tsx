import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const navigation = [
    { name: "Accueil", href: "accueil" },
    { name: "Prestations", href: "prestations" },
    { name: "À propos", href: "a-propos" },
    { name: "Contact", href: "contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleBooking = () => {
    // This will be handled by the parent component that manages booking modal state
    const event = new CustomEvent('openBooking');
    window.dispatchEvent(event);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-sage/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <button 
            onClick={() => scrollToSection('accueil')}
            className="text-xl font-semibold text-sage hover:text-sage/80 transition-colors" 
            data-testid="logo-button"
          >
            Wat su harmonie
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="transition-colors hover:text-sage text-charcoal"
                data-testid={`nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.name}
              </button>
            ))}
            <Button 
              onClick={handleBooking}
              className="bg-sage text-white hover:bg-sage/90 rounded-full px-6"
              data-testid="button-booking"
            >
              Réserver
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-sage"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-sage/10">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="transition-colors hover:text-sage text-charcoal text-left"
                  data-testid={`mobile-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.name}
                </button>
              ))}
              <Button 
                onClick={handleBooking}
                className="bg-sage text-white hover:bg-sage/90 rounded-full w-full"
                data-testid="mobile-button-booking"
              >
                Réserver
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
