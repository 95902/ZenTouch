import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Accueil", href: "/" },
    { name: "Prestations", href: "/services" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-charcoal text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-4" data-testid="text-footer-title">Marie Dubois</h3>
            <p className="text-white/70 leading-relaxed" data-testid="text-footer-description">
              Masseuse professionnelle certifiée, spécialisée dans le bien-être et la relaxation. 
              Votre équilibre est ma priorité.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4" data-testid="text-quick-links-title">Liens rapides</h3>
            <ul className="space-y-2 text-white/70">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="hover:text-white transition-colors"
                    data-testid={`link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-4" data-testid="text-social-title">Suivez-moi</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white/70 hover:text-white transition-colors"
                data-testid="link-facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-white/70 hover:text-white transition-colors"
                data-testid="link-instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-white/70 hover:text-white transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
          <p data-testid="text-copyright">&copy; 2024 Marie Dubois - Masseuse Professionnelle. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
